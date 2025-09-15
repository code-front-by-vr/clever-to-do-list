import { addTask, getTasks, deleteTask, updateTask } from '@/api/task'
import { toTimestamp } from '@/utils/date'

export default {
  namespaced: true,
  state: () => ({
    tasks: [],
  }),
  getters: {
    allTasks: state => state.tasks,
    taskById: state => id => state.tasks.find(task => task.id === id),
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTask(state, task) {
      const index = state.tasks.findIndex(t => t.id === task.id)
      if (index !== -1) state.tasks[index] = task
    },
  },
  actions: {
    async fetchTasks({ commit, rootState }) {
      try {
        const userId = rootState.auth.user.uid
        if (!userId) throw new Error('User not authenticated')

        const tasks = await getTasks(userId)
        commit('setTasks', tasks)
      } catch (err) {
        console.log('Tasks/fetchTasks error: ', err.message)
        throw err
      }
    },
    async createTask({ commit, rootState }, task) {
      try {
        const userId = rootState.auth.user.uid
        if (!userId) throw new Error('User not authenticated')

        const taskData = {
          ...task,
          date: toTimestamp(task.date),
        }

        const taskId = await addTask(userId, taskData)
        const newTask = { id: taskId, ...task }
        commit('addTask', newTask)
      } catch (err) {
        console.error('Tasks/createTask error:', err)
        throw err
      }
    },
    async deleteTask({ commit, rootState }, id) {
      try {
        const userId = rootState.auth.user.uid

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
        const userId = rootState.auth.user.uid
        if (!userId) throw new Error('User not authenticated')

        const taskData = {
          ...task,
          date: task.date instanceof Date ? toTimestamp(task.date) : task.date,
        }

        await updateTask(userId, taskData)
        commit('updateTask', taskData)
      } catch (err) {
        console.error('Tasks/updateTask error:', err)
        throw err
      }
    },
  },
}
