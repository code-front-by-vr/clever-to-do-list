<script>
import TaskCalendar from '@/components/calendar/TaskCalendar.vue'
import Button from '@/components/common/Button.vue'
import TaskModal from '@/components/task/TaskModal.vue'
import TaskItem from '@/components/task/TaskItem.vue'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isShowModal: false,
      taskId: null,
    }
  },
  computed: {
    // TODO: mutations - updateTaskById
    ...mapState('tasks', ['tasks']),
  },
  methods: {
    handleCloseModal() {
      this.isShowModal = false
    },
    handleAddTask() {
      this.taskId = null
      this.isShowModal = true
    },
    handleEditTask(taskId) {
      this.taskId = taskId
      this.isShowModal = true
    },
    handleDeleteTask(taskId) {
      if (!taskId) {
        console.error('Task ID is missing:', taskId)
        return
      }
      this.$store.dispatch('tasks/deleteTask', taskId)
    },
    handleToggleTask(taskId) {
      const task = this.$store.getters['tasks/taskById'](taskId)
      const updatedTask = { ...task, done: !task.done }
      this.$store.dispatch('tasks/updateTask', updatedTask)
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('tasks/fetchTasks')
    } catch (err) {
      console.error('Tasks mounted error:', err)
    }
  },
  components: {
    TaskCalendar,
    Button,
    TaskModal,
    TaskItem,
  },
}
</script>

<template>
  <div class="tasks">
    <TaskCalendar class="tasks__calendar" />

    <div class="tasks__container">
      <h2 class="tasks__title">Tasks today: {{ tasks.length }}</h2>

      <div class="task__list">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @edit="handleEditTask"
          @delete="handleDeleteTask"
          @toggle="handleToggleTask"
        />
      </div>
    </div>
    <Button class="tasks__button" @click="handleAddTask">Add Task</Button>
    <TaskModal
      v-if="isShowModal"
      :taskId="taskId"
      @close="handleCloseModal"
      :isEditing="!!taskId"
    />
  </div>
</template>

<style scoped>
.tasks {
  height: 100%;
  padding: var(--space-3xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.tasks__container {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--space-xl);
}

.tasks__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
  margin-top: var(--space-xl);
}

.task__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: var(--container-normal);
  margin: 0 auto;
}

.tasks__button {
  width: 50%;
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-lg);
}
</style>
