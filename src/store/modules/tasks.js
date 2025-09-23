import { addTask, deleteTask, updateTask, getTasksByDateRange } from '@/services/task'
import { formatDateToDisplayValue } from '@/lib/utils'
import { requireUserId } from '@/services/auth'

function getTaskToDayInitialState(date) {
  return { date, taskIds: [] }
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
      if (!day) {return []}

      return day.taskIds.map(taskId => state.tasks[taskId]).filter(task => !!task)
    },

    daysInMonth: state => monthKey => {
      const month = state.months[monthKey]
      return month ? month.dayKeys : []
    },

    hasTasksOnDate: state => date => {
      const dayKey = formatDateToDisplayValue(date)
      const day = state.days[dayKey]
      return day && day.taskIds.length > 0
    },

    taskStatsByDate: (state, getters) => date => {
      const tasks = getters.tasksByDate(date)
      const uncompletedTasks = tasks.filter(task => !task.done)

      const uncompletedTasksCount = uncompletedTasks.length
      const completedTasksCount = tasks.length - uncompletedTasksCount
      const hasPending = uncompletedTasksCount > 0
      const hasDone = completedTasksCount > 0
      const total = tasks.length

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
      if (!state.days[dayKey]) {state.days[dayKey] = getTaskToDayInitialState(dayKey)}
      if (!state.days[dayKey].taskIds.includes(taskId)) {
        state.days[dayKey].taskIds.push(taskId)
      }
    },
    REMOVE_TASK_FROM_DAY(state, { dayKey, taskId }) {
      const day = state.days[dayKey]

      if (!day) {return}

      day.taskIds = day.taskIds.filter(id => id !== taskId)
      if (day.taskIds.length === 0) {delete state.days[dayKey]}
    },

    ADD_DAY_TO_MONTH(state, { monthKey, dayKey }) {
      if (!state.months[monthKey]) {
        const [year, month] = dayKey.split('-')
        state.months[monthKey] = { year: parseInt(year), month: parseInt(month), dayKeys: [] }
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
      const dayKeys = new Set()
      tasks.forEach(task => {
        const dayKey = formatDateToDisplayValue(task.date)
        dayKeys.add(dayKey)

        state.tasks[task.id] = task

        if (!state.days[dayKey]) {
          state.days[dayKey] = getTaskToDayInitialState(dayKey)
        }
        if (!state.days[dayKey].taskIds.includes(task.id)) {
          state.days[dayKey].taskIds.push(task.id)
        }
      })

      const [year, month] = monthKey.split('-')

      state.months[monthKey] = {
        year: parseInt(year),
        month: parseInt(month),
        dayKeys: Array.from(dayKeys),
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
        const userId = requireUserId(rootState.auth.user)

        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`
        if (state.loadedMonths.has(monthKey)) {return}

        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, month + 1, 0)
        endDate.setHours(23, 59, 59, 999)

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
        const userId = requireUserId(rootState.auth.user)

        const taskData = await addTask(userId, task)
        const dayKey = formatDateToDisplayValue(taskData.date)

        commit('SET_TASK', taskData)
        commit('ADD_TASK_TO_DATE', { dayKey, taskId: taskData.id })

        const dateObj = new Date(taskData.date)
        const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`

        commit('ADD_DAY_TO_MONTH', { monthKey, dayKey })
      } catch (err) {
        console.error('Tasks/createTask error:', err)
        throw err
      }
    },
    async deleteTask({ commit, rootState }, { date, taskId }) {
      try {
        const userId = requireUserId(rootState.auth.user)

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
        const userId = requireUserId(rootState.auth.user)

        const updatedTask = await updateTask(userId, task)
        const oldTask = state.tasks[task.id]

        if (oldTask) {
          const oldDayKey = formatDateToDisplayValue(oldTask.date)
          const newDayKey = formatDateToDisplayValue(updatedTask.date)

          if (oldDayKey === newDayKey) {return}

          commit('REMOVE_TASK_FROM_DAY', { dayKey: oldDayKey, taskId: task.id })
          commit('ADD_TASK_TO_DATE', { dayKey: newDayKey, taskId: task.id })
        }
        commit('SET_TASK', updatedTask)
      } catch (err) {
        console.error('Tasks/updateTask error:', err)
        throw err
      }
    },
    clearAllTasks({ state, commit }) {
      commit('CLEAR_LOADED_MONTHS')
      state.tasks = {}
      state.days = {}
      state.months = {}
    },
    async movePendingTasksToNextDay({ dispatch, getters }, date) {
      const tasks = getters.tasksByDate(date)
      const pendingTasks = tasks.filter(task => !task.done)

      if (pendingTasks.length === 0) {return}

      const nextDayDate = new Date(date)
      nextDayDate.setDate(nextDayDate.getDate() + 1)

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (nextDayDate < today) {return}

      for (let task of pendingTasks) {
        await dispatch('updateTask', {
          ...task,
          date: nextDayDate,
        })
      }
    },
  },
}
