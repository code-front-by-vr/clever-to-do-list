import { addTask, deleteTask, updateTask, getTasksByDateRange } from '@/services/task'
import { formatDateToDisplayValue, formatDateToMonthKey } from '@/lib/utils'
import { requiresUserId } from '@/services/auth'

function createDayInitialState(date) {
  return { date, taskIds: [] }
}

function createMonthInitialState(monthKey) {
  const [year, month] = monthKey.split('-')
  return {
    year: parseInt(year),
    month: parseInt(month),
    dayKeys: [],
  }
}

export default {
  namespaced: true,
  state: () => ({
    // Normalized tasks
    tasks: {}, // {taskId: Task, ...}
    days: {}, // { dayKey: { date, taskIds: [taskId1, taskId2] } }
    months: {}, // { monthKey: { year, month, dayKeys: [dayKey1, dayKey2] } }

    selectedDate: '',
    loadedMonths: new Set(),
  }),
  getters: {
    taskById: state => id => {
      return state.tasks[id] || null
    },
    tasksByDate: state => date => {
      const displayDate = formatDateToDisplayValue(date)
      const day = state.days[displayDate]
      if (!day) {
        return []
      }

      return day.taskIds.map(taskId => state.tasks[taskId]).filter(Boolean)
    },

    daysInMonth: state => monthKey => {
      const month = state.months[monthKey]
      return month ? month.dayKeys : []
    },

    hasTasksForSpecifiedDate: state => date => {
      const dayKey = formatDateToDisplayValue(date)
      const day = state.days[dayKey]
      return day && day.taskIds.length > 0
    },

    completedTasksByDate: (state, getters) => date => {
      const tasks = getters.tasksByDate(date)
      return tasks.filter(task => task.done)
    },

    uncompletedTasksByDate: (state, getters) => date => {
      const tasks = getters.tasksByDate(date)
      return tasks.filter(task => !task.done)
    },

    taskStatsByDate: (state, getters) => date => {
      const completedTasks = getters.completedTasksByDate(date)
      const uncompletedTasks = getters.uncompletedTasksByDate(date)

      const uncompletedTasksCount = uncompletedTasks.length
      const completedTasksCount = completedTasks.length
      const hasPending = uncompletedTasksCount > 0
      const hasDone = completedTasksCount > 0
      const total = completedTasksCount + uncompletedTasksCount

      return {
        total,
        pending: uncompletedTasksCount,
        done: completedTasksCount,
        hasPending,
        hasDone,
      }
    },

    isMonthLoaded: state => monthKey => state.loadedMonths.has(monthKey),
  },
  mutations: {
    SET_TASK(state, task) {
      state.tasks[task.id] = task
    },
    REMOVE_TASK(state, taskId) {
      delete state.tasks[taskId]
    },

    ADD_TASK_TO_DATE(state, { dayKey, taskId }) {
      if (!state.days[dayKey]) {
        state.days[dayKey] = createDayInitialState(dayKey)
      }

      if (!state.days[dayKey].taskIds.includes(taskId)) {
        state.days[dayKey].taskIds.push(taskId)
      }
    },
    REMOVE_TASK_FROM_DAY(state, { dayKey, taskId }) {
      const day = state.days[dayKey]

      if (!day) {
        return
      }

      day.taskIds = day.taskIds.filter(id => id !== taskId)
      if (day.taskIds.length === 0) {
        delete state.days[dayKey]
      }
    },

    ADD_DAY_TO_MONTH(state, { monthKey, dayKey }) {
      if (!state.months[monthKey]) {
        state.months[monthKey] = createMonthInitialState(monthKey)
      }
      if (!state.months[monthKey].dayKeys.includes(dayKey)) {
        state.months[monthKey].dayKeys.push(dayKey)
      }
    },

    // Operations
    SET_TASKS_FOR_MONTH(state, { monthKey, tasks }) {
      // Clear existing month data
      const existingMonth = state.months[monthKey]
      if (existingMonth) {
        existingMonth.dayKeys.forEach(dayKey => {
          delete state.days[dayKey]
        })
      }
      const dayKeys = []
      tasks.forEach(task => {
        const dayKey = formatDateToDisplayValue(task.date)
        if (!dayKeys.includes(dayKey)) {
          dayKeys.push(dayKey)
        }

        state.tasks[task.id] = task

        if (!state.days[dayKey]) {
          state.days[dayKey] = createDayInitialState(dayKey)
        }
        if (!state.days[dayKey].taskIds.includes(task.id)) {
          state.days[dayKey].taskIds.push(task.id)
        }
      })

      state.months[monthKey] = {
        ...createMonthInitialState(monthKey),
        dayKeys,
      }
    },

    SET_SELECTED_DATE(state, date) {
      state.selectedDate = date
    },
    ADD_LOADED_MONTH(state, monthKey) {
      state.loadedMonths.add(monthKey)
    },
    CLEAR_LOADED_MONTH(state) {
      state.loadedMonths.clear()
    },
  },
  actions: {
    async fetchTasksForTheMonth({ state, commit, rootState }, { year, month }) {
      try {
        const userId = requiresUserId(rootState.auth.user)

        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, month + 1, 0)
        endDate.setHours(23, 59, 59, 999)

        const monthKey = formatDateToMonthKey(startDate)

        if (state.loadedMonths.has(monthKey)) return

        const tasks = await getTasksByDateRange(userId, startDate, endDate)

        commit('SET_TASKS_FOR_MONTH', { monthKey, tasks })
        commit('ADD_LOADED_MONTH', monthKey)
      } catch (err) {
        console.log('Tasks/fetchTasksForTheMonth error: ', err.message)
        throw err
      }
    },
    async createTask({ commit, rootState }, task) {
      try {
        const userId = requiresUserId(rootState.auth.user)

        const taskData = await addTask(userId, task)
        const dayKey = formatDateToDisplayValue(taskData.date)
        const monthKey = formatDateToMonthKey(taskData.date)

        commit('SET_TASK', taskData)
        commit('ADD_TASK_TO_DATE', { dayKey, taskId: taskData.id })
        commit('ADD_DAY_TO_MONTH', { monthKey, dayKey })
      } catch (err) {
        console.error('Tasks/createTask error:', err)
        throw err
      }
    },
    async deleteTask({ commit, rootState }, { date, taskId }) {
      try {
        const userId = requiresUserId(rootState.auth.user)

        await deleteTask(userId, taskId)

        const dayKey = formatDateToDisplayValue(date)
        commit('REMOVE_TASK_FROM_DAY', { dayKey, taskId })
        commit('REMOVE_TASK', taskId)
      } catch (err) {
        console.error('Tasks/deleteTask error:', err)
        throw err
      }
    },
    async updateTask({ commit, rootState, state }, task) {
      try {
        const userId = requiresUserId(rootState.auth.user)

        const updatedTask = await updateTask(userId, task)
        const oldTask = state.tasks[task.id]

        if (oldTask) {
          const oldDayKey = formatDateToDisplayValue(oldTask.date)
          const newDayKey = formatDateToDisplayValue(updatedTask.date)

          if (oldDayKey !== newDayKey) {
            commit('REMOVE_TASK_FROM_DAY', { dayKey: oldDayKey, taskId: task.id })
            commit('ADD_TASK_TO_DATE', { dayKey: newDayKey, taskId: task.id })
          }
        }

        commit('SET_TASK', updatedTask)
      } catch (err) {
        console.error('Tasks/updateTask error:', err)
        throw err
      }
    },
    async movePendingTasksToNextDay({ dispatch, getters }, date) {
      const tasks = getters.tasksByDate(date)
      const pendingTasks = tasks.filter(task => !task.done)

      if (pendingTasks.length === 0) {
        return
      }

      const nextDayDate = new Date(date)
      nextDayDate.setDate(nextDayDate.getDate() + 1)

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (nextDayDate < today) {
        return
      }

      for (const task of pendingTasks) {
        await dispatch('updateTask', {
          ...task,
          date: nextDayDate,
        })
      }
    },
  },
}
