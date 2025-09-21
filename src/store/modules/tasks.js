import { addTask, deleteTask, updateTask, getTasksByDateRange } from '@/api/task'
import { formatDateToDisplayValue } from '@/lib/utils/date'

export default {
  namespaced: true,
  state: () => ({
    // TODO: remove notes before task check
    monthToDay: {}, // {['2025-09']: ['2025-09-21', '2025-09-22', ...], ['2025-10']: ['2025-10-21', '2025-10-22', ...]...}
    dayToTasks: {}, // {['2025-09-21']: [TaskId, TaskId, ...], ['2025-09-22']: [TaskId, TaskId, ...]...}
    tasks: {}, // {taskId: Task, taskId: Task, ...}
    selectedDate: '',
    loadedMonths: new Map(),
  }),
  getters: {
    taskById: state => id => {
      return state.tasks[id] || null
    },
    tasksByDate: state => date => {
      const dayKey = formatDateToDisplayValue(date)
      const taskIds = state.dayToTasks[dayKey] || []
      return taskIds.map(taskId => state.tasks[taskId])
    },
  },
  mutations: {
    setTasksForMonth(state, tasks) {
      tasks.forEach(task => {
        const dateObj = new Date(task.date)
        const year = dateObj.getFullYear()
        const month = String(dateObj.getMonth() + 1).padStart(2, '0')

        const monthKey = `${year}-${month}`
        const dayKey = formatDateToDisplayValue(task.date)

        if (!state.monthToDay[monthKey]) state.monthToDay[monthKey] = []
        if (!state.monthToDay[monthKey].includes(dayKey)) {
          state.monthToDay[monthKey].push(dayKey)
        }

        if (!state.dayToTasks[dayKey]) state.dayToTasks[dayKey] = []
        if (!state.dayToTasks[dayKey].includes(task.id)) {
          state.dayToTasks[dayKey].push(task.id)
        }

        state.tasks[task.id] = task
      })
    },
    setSelectedDate(state, date) {
      state.selectedDate = date
    },
    addTask(state, task) {
      const dayKey = formatDateToDisplayValue(task.date)

      if (!state.dayToTasks[dayKey]) state.dayToTasks[dayKey] = []
      state.dayToTasks[dayKey].push(task.id)
      state.tasks[task.id] = task
    },

    deleteTask(state, { date, taskId }) {
      const dayKey = formatDateToDisplayValue(date)

      state.dayToTasks[dayKey] = state.dayToTasks[dayKey].filter(id => id !== taskId)

      if (state.dayToTasks[dayKey].length === 0) {
        delete state.dayToTasks[dayKey]
      }

      delete state.tasks[taskId]
    },
    updateTask(state, updatedTask) {
      const prevTask = state.tasks[updatedTask.id]

      const oldDayKey = formatDateToDisplayValue(prevTask.date)
      const newDayKey = formatDateToDisplayValue(updatedTask.date)

      if (oldDayKey !== newDayKey) {
        state.dayToTasks[oldDayKey] = state.dayToTasks[oldDayKey].filter(
          id => id !== updatedTask.id
        )
        if (state.dayToTasks[oldDayKey].length === 0) {
          delete state.dayToTasks[oldDayKey]
        }

        if (!state.dayToTasks[newDayKey]) state.dayToTasks[newDayKey] = []
        if (!state.dayToTasks[newDayKey].includes(updatedTask.id)) {
          state.dayToTasks[newDayKey].push(updatedTask.id)
        }
      }
      state.tasks[updatedTask.id] = updatedTask
    },
    addLoadedMonth(state, monthKey) {
      state.loadedMonths.set(monthKey, true)
    },
  },
  actions: {
    async fetchTasksForTheMonth({ state, commit, rootState }, { year, month }) {
      try {
        const userId = rootState.auth.user?.uid
        if (!userId) throw new Error('User not authenticated')

        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`
        if (state.loadedMonths.get(monthKey)) return

        // TODO: remove this console.log before task check
        console.log('fetching tasks for the month: ', monthKey)

        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, month + 1, 0)
        endDate.setHours(23, 59, 59, 999)

        const tasks = await getTasksByDateRange(userId, startDate, endDate)

        commit('setTasksForMonth', tasks)
        commit('addLoadedMonth', monthKey)
      } catch (err) {
        console.log('Tasks/fetchTasksForTheMonth error: ', err.message)
        throw err
      }
    },
    async createTask({ commit, rootState }, task) {
      try {
        const userId = rootState.auth.user?.uid
        if (!userId) throw new Error('User not authenticated')

        const taskData = await addTask(userId, task)
        commit('addTask', taskData)
      } catch (err) {
        console.error('Tasks/createTask error:', err)
        throw err
      }
    },
    async deleteTask({ commit, rootState }, { date, taskId }) {
      try {
        const userId = rootState.auth.user?.uid

        if (!userId) throw new Error('User not authenticated')

        await deleteTask(userId, taskId)

        commit('deleteTask', { date, taskId })
      } catch (err) {
        console.error('Tasks/deleteTask error:', err)
        throw err
      }
    },
    async updateTask({ commit, rootState }, task) {
      try {
        const userId = rootState.auth.user?.uid
        if (!userId) throw new Error('User not authenticated')

        const updatedTask = await updateTask(userId, task)
        commit('updateTask', updatedTask)
      } catch (err) {
        console.error('Tasks/updateTask error:', err)
        throw err
      }
    },
  },
}
