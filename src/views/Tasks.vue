<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
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
    handleDeleteTask({ date, taskId }) {
      if (!taskId) {
        console.error('Task ID is missing:', taskId)
        return
      }
      this.$store.dispatch('tasks/deleteTask', { date, taskId })
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

    scrollLeft() {
      const scroller = this.$refs.calendarScroller?.$el
      if (scroller) {
        scroller.scrollBy({ left: -300, behavior: 'smooth' })
      }
    },
    scrollRight() {
      const scroller = this.$refs.calendarScroller?.$el
      if (scroller) {
        scroller.scrollBy({ left: 300, behavior: 'smooth' })
      }
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
      this.$store.commit('tasks/setSelectedDate', today)
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
    ChevronLeft,
    ChevronRight,
  },
}
</script>

<template>
  <div class="tasks">
    <div class="calendar">
      <button class="calendar__nav calendar__nav-left" @click="scrollLeft">
        <ChevronLeft class="nav-icon" />
      </button>
      <RecycleScroller
        ref="calendarScroller"
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
      <button class="calendar__nav calendar__nav-right" @click="scrollRight">
        <ChevronRight class="nav-icon" />
      </button>
    </div>

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

.calendar {
  position: relative;
  display: flex;
  align-items: center;
}

.calendar__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-2xl);
  height: var(--space-2xl);
  border: none;
  border-radius: var(--radius-rounded);
  background: var(--color-gradient);
  opacity: 0.8;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
}

.calendar__nav:hover {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 var(--space-xs) var(--space-md) var(--shadow-primary-hover);
}

.calendar__nav-left {
  left: var(--space-md);
}
.calendar__nav-right {
  right: var(--space-md);
}

.task__calendar {
  height: 100px;
  overflow-x: auto;
  overflow-y: visible;
  scrollbar-width: thin;
  scrollbar-color: var(--color-text-muted) transparent;
}

.task__calendar::-webkit-scrollbar {
  height: var(--space-xs);
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
