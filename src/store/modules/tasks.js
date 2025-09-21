import { addTask, deleteTask, updateTask, getTasksByDateRange } from '@/api/task'
import { formatDateToDisplayValue, toDate } from '@/lib/utils/date'

export default {
  namespaced: true,
  state: () => ({
    tasksByDate: {}, // {['2025-09-21']: Task[], ['2025-09-22']: Task[]...}
    selectedDate: '',
    loadedMonths: [], // ['2025-09', '2025-10', '2025-11'...']
  }),
  getters: {
    taskById: state => id => {
      for (const dayTasks of Object.values(state.tasksByDate)) {
        const task = dayTasks.find(task => task.id === id)
        if (task) return task
      }
      return null
    },
    tasksByDate: state => date => {
      if (!date) return []

      const key = formatDateToDisplayValue(date)
      return state.tasksByDate[key] || []
    },
  },
  mutations: {
    setTasksForMonth(state, tasks) {
      const newTasksByDate = {}

      tasks.forEach(task => {
        const key = formatDateToDisplayValue(task.date)

        if (!newTasksByDate[key]) newTasksByDate[key] = []

        newTasksByDate[key].push(task)
      })
      state.tasksByDate = {
        ...state.tasksByDate,
        ...newTasksByDate,
      }
    },
    setSelectedDate(state, date) {
      state.selectedDate = date
    },
    addTask(state, task) {
      const key = formatDateToDisplayValue(task.date)

      if (!state.tasksByDate[key]) state.tasksByDate[key] = []
      state.tasksByDate[key].push(task)
    },
    deleteTask(state, id) {
      for (const key in state.tasksByDate) {
        state.tasksByDate[key] = state.tasksByDate[key].filter(task => task.id !== id)
      }
    },
    updateTask(state, updatedTask) {
      const key = formatDateToDisplayValue(updatedTask.date)

      state.tasksByDate[key] = state.tasksByDate[key].map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    },
    addLoadedMonth(state, monthKey) {
      state.loadedMonths.push(monthKey)
    },
  },
  actions: {
    async fetchTasksForTheMonth({ state, commit, rootState }, { year, month }) {
      try {
        const userId = rootState.auth.user?.uid
        if (!userId) throw new Error('User not authenticated')

        const monthKey = `${year}-${month}`
        if (state.loadedMonths.includes(monthKey)) return
        // TODO: remove this console.log
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
    async deleteTask({ commit, rootState }, id) {
      try {
        const userId = rootState.auth.user?.uid

        if (!userId) throw new Error('User not authenticated')

        await deleteTask(userId, id)

        commit('deleteTask', id)
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
