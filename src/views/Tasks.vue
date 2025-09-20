<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import Button from '@/components/common/Button.vue'
import TaskModal from '@/components/task/TaskModal.vue'
import TaskItem from '@/components/task/TaskItem.vue'
import CalendarDay from '@/components/calendar/CalendarDay.vue'
import { generateCalendarDays } from '@/lib/utils/date'

export default {
  data() {
    return {
      days: [],
      isShowModal: false,
      taskId: null,
      loadingDays: false,
    }
  },
  computed: {
    tasksByDate() {
      return this.$store.getters['tasks/tasksByDate'](this.$store.state.tasks.selectedDate) || []
    },
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

    async fetchMoreDays() {
      if (this.loadingDays) return
      this.loadingDays = true

      const lastDay = this.days[this.days.length - 1].date
      const startNextMonth = new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, 1)
      const endNextMonth = new Date(lastDay.getFullYear(), lastDay.getMonth() + 2, 0)

      const newDays = generateCalendarDays(startNextMonth, endNextMonth)
      this.days.push(...newDays)

      try {
        await this.$store.dispatch('tasks/fetchTasksForTheMonth', {
          year: startNextMonth.getFullYear(),
          month: startNextMonth.getMonth(),
        })
      } catch (error) {
        console.error('Tasks fetchMoreDays error:', error)
      } finally {
        this.loadingDays = false
      }
    },

    handleScrollEnd() {
      this.fetchMoreDays()
    },
  },
  async mounted() {
    try {
      const today = new Date()
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      this.days = generateCalendarDays(today, endOfMonth)

      await this.$store.dispatch('tasks/fetchTasksForTheMonth', {
        year: today.getFullYear(),
        month: today.getMonth(),
      })
      await this.$store.commit('tasks/setSelectedDate', today)
    } catch (error) {
      console.error('Tasks mounted error:', error)
    }
  },
  components: {
    Button,
    TaskModal,
    TaskItem,
    CalendarDay,
    RecycleScroller,
  },
}
</script>

<template>
  <div class="tasks">
    <RecycleScroller
      class="task__calendar"
      :items="days"
      key-field="id"
      :item-size="100"
      direction="horizontal"
      @scroll-end="handleScrollEnd"
      v-slot="{ item }"
      :buffer="1000"
    >
      <CalendarDay :day="item" :key="item.id" />
    </RecycleScroller>

    <div class="tasks__container">
      <h2 v-if="tasksByDate.length > 0" class="tasks__title">
        Tasks today: {{ tasksByDate.length }}
      </h2>
      <h2 v-else class="tasks__title">No tasks for this day</h2>
      <div class="task__list">
        <TaskItem
          v-for="task in tasksByDate"
          :key="task.id"
          :task="task"
          @edit="handleEditTask"
          @delete="handleDeleteTask"
          @toggle="handleToggleTask"
        />
      </div>
    </div>
    <Button class="tasks__button" @click="handleAddTask()">Add Task</Button>
    <TaskModal
      v-if="isShowModal"
      :taskId="taskId"
      @close="handleCloseModal()"
      :isEditing="!!taskId"
    />
  </div>
</template>

<style scoped>
.tasks {
  max-width: var(--container-wide);
  height: 100%;
  padding: var(--space-3xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}
.task__calendar {
  height: 110px;
  overflow-x: auto;
  overflow-y: visible;
  padding: var(--space-sm) 0;
  scrollbar-width: thin;
  scrollbar-color: var(--color-text-muted) transparent;
}

.task__calendar::-webkit-scrollbar {
  height: 6px;
}

.task__calendar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: var(--radius-sm);
}

.task__calendar::-webkit-scrollbar-thumb {
  background: var(--color-text-muted);
  border-radius: var(--radius-sm);
}

.task__calendar::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-secondary);
}
.tasks__container {
  padding: 0 var(--space-4xl);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--space-xl);
}

.tasks__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
}

.task__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: var(--container-normal);
  margin: 0 auto;
}

.tasks__button {
  width: auto;
  margin: 0 auto;
  padding: var(--space-md) var(--space-6xl);
  font-size: var(--font-size-lg);
}
</style>
