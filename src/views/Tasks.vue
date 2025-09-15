<script>
import TaskList from '@/components/task/TaskList.vue'
import TaskCalendar from '@/components/calendar/TaskCalendar.vue'
import Button from '@/components/common/Button.vue'
import TaskModal from '@/components/task/TaskModal.vue'

export default {
  components: {
    TaskList,
    TaskCalendar,
    Button,
    TaskModal,
  },
  computed: {
    tasks() {
      return this.$store.getters['tasks/allTasks']
    },
  },
  methods: {
    handleCloseModal() {
      this.isShowModal = false
    },
    handleAddTask() {
      this.task = null
      this.isShowModal = true
    },
    handleEditTask(task) {
      this.task = task
      this.isShowModal = true
    },
    handleDeleteTask(task) {
      if (!task.id) {
        console.error('Task ID is missing:', task)
        return
      }
      this.$store.dispatch('tasks/deleteTask', task.id)
    },
  },
  data() {
    return {
      isShowModal: false,
      task: null,
    }
  },

  async mounted() {
    try {
      await this.$store.dispatch('tasks/fetchTasks')
    } catch (err) {
      console.error('Tasks mounted error:', err)
    }
  },
}
</script>

<template>
  <div class="tasks-wrapper">
    <!-- !TODO: TaskCalendar component -->
    <TaskCalendar />

    <h2 class="tasks-title">Tasks today: {{ tasks.length }}</h2>

    <!-- !TODO: TasksList component -->
    <TaskList :tasks="tasks" @edit="handleEditTask" @delete="handleDeleteTask" />
    <!-- !TODO AddTaskButton component -->

    <Button class="add-task-btn" @click="handleAddTask">Add Task</Button>
    <TaskModal :isShowModal="isShowModal" :task="task" @close="handleCloseModal" />
  </div>
</template>

<style scoped>
.tasks-wrapper {
  padding: var(--space-3xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.tasks-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
  margin-top: var(--space-xl);
}

.add-task-btn {
  width: 50%;
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-lg);
}
</style>
