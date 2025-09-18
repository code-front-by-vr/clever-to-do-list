import { addTask, deleteTask, updateTask, getTasksByDateRange } from '@/api/task'
import { isSameDay } from '@/lib/utils/date'

export default {
  namespaced: true,
  state: () => ({
    tasks: [],
    selectedDate: '',
  }),
  getters: {
    taskById: state => id => state.tasks.find(task => task.id === id),
    tasksByDate: state => date => {
      const targetDate = new Date(date)

      return state.tasks.filter(task => {
        const taskDate = new Date(task.date)

        return isSameDay(taskDate, targetDate)
      })
    },
  },
  mutations: {
    setTasksForMonth(state, tasks) {
      state.tasks = tasks
    },
    setSelectedDate(state, date) {
      state.selectedDate = date
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTask(state, updatedTask) {
      const task = state.tasks.find(t => t.id === updatedTask.id)
      if (task) Object.assign(task, updatedTask)
    },
  },
  actions: {
    async fetchTasksForTheMonth({ commit, rootState }, { year, month }) {
      try {
        const userId = rootState.auth.user?.uid
        if (!userId) throw new Error('User not authenticated')

        const startDate = new Date(year, month, 1)
        const endDate = new Date(year, month + 1, 0)
        endDate.setHours(23, 59, 59, 999)

        const tasks = await getTasksByDateRange(userId, startDate, endDate)
        commit('setTasksForMonth', tasks)
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
