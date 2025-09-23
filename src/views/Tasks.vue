<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Button from '@/components/shared/ui/Button.vue'
import TaskModal from '@/components/task/TaskModal.vue'
import TaskItem from '@/components/task/TaskItem.vue'
import CalendarDay from '@/components/calendar/CalendarDay.vue'
import ConfirmModal from '@/components/shared/ui/ConfirmModal.vue'
import {
  generateCalendarDays,
  formatMonthYear,
  formatDateToDisplayValue,
  isSameDay,
} from '@/lib/utils'

export default {
  data() {
    return {
      today: new Date(),
      days: [],
      itemSize: 100,
      taskId: null,
      loadingDays: false,
      currentMonthYear: '',
      isShowConfirmModal: false,
      taskToDelete: null,
    }
  },
  computed: {
    tasksByDate() {
      return this.$store.getters['tasks/tasksByDate'](this.$store.state.tasks.selectedDate) || []
    },
  },
  methods: {
    handleAddTask() {
      this.$refs.taskModalRef?.open()
    },
    handleEditTask(taskId) {
      this.$refs.taskModalRef?.open(taskId)
    },
    handleDeleteTask({ date, taskId }) {
      if (!taskId) {
        console.error('Task ID is missing:', taskId)
        return
      }
      this.taskToDelete = { date, taskId }
      this.isShowConfirmModal = true
    },
    handleConfirmDelete() {
      if (this.taskToDelete) {
        this.$store.dispatch('tasks/deleteTask', this.taskToDelete)
        this.taskToDelete = null
      }
      this.isShowConfirmModal = false
    },
    handleCancelDelete() {
      this.taskToDelete = null
      this.isShowConfirmModal = false
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

    updateCurrentMonthYear() {
      const scrollerEl = this.$refs.calendarScroller?.$el
      if (!scrollerEl) return

      const scrollLeft = scrollerEl.scrollLeft
      const index = Math.floor(scrollLeft / this.itemSize)
      const day = this.days[index]
      if (day) this.currentMonthYear = formatMonthYear(day.date)
    },

    handleDayClick(date) {
      this.$store.commit('tasks/SET_SELECTED_DATE', date)

      const scroller = this.$refs.calendarScroller
      const index = this.days.findIndex(day => isSameDay(day.date, date))
      if (index === -1) return

      scroller.scrollToItem(index, { align: 'start' })
    },

    handleScrollEnd() {
      this.fetchMoreDays()
      this.updateCurrentMonthYear()
    },

    scrollLeft() {
      const scroller = this.$refs.calendarScroller?.$el
      if (!scroller) return

      scroller.scrollBy({ left: -300 })
    },
    scrollRight() {
      const scroller = this.$refs.calendarScroller?.$el
      if (!scroller) return

      scroller.scrollBy({ left: 300 })
    },

    scrollToToday() {
      this.$nextTick(() => {
        const container = this.$refs.calendarScroller?.$el
        if (!container) return

        const index = this.days.findIndex(day => isSameDay(day.date, this.today))
        if (index === -1) return

        const offset = index * this.itemSize

        container.scrollTo({ left: offset })
      })

      this.$store.commit('tasks/SET_SELECTED_DATE', this.today)
    },
  },
  async mounted() {
    try {
      const endOfMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0)
      this.days = generateCalendarDays(this.today, endOfMonth)

      await this.$store.dispatch('tasks/fetchTasksForTheMonth', {
        year: this.today.getFullYear(),
        month: this.today.getMonth(),
      })
      this.$store.commit('tasks/SET_SELECTED_DATE', this.today)

      this.currentMonthYear = formatMonthYear(this.today)

      const scrollerEl = this.$refs.calendarScroller?.$el
      if (scrollerEl) scrollerEl.addEventListener('scroll', this.updateCurrentMonthYear)
    } catch (error) {
      console.error('Tasks mounted error:', error)
    }
  },
  beforeUnmount() {
    const scrollerEl = this.$refs.calendarScroller?.$el
    if (scrollerEl) scrollerEl.removeEventListener('scroll', this.updateCurrentMonthYear)
  },
  components: {
    Button,
    TaskModal,
    TaskItem,
    CalendarDay,
    ConfirmModal,
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
      <div class="calendar__header">
        <Button variant="ghost" @click="scrollToToday" class="calendar__today-button">Today</Button>
        <h3 class="calendar__month-year">{{ currentMonthYear }}</h3>
      </div>
      <RecycleScroller
        ref="calendarScroller"
        class="task__calendar"
        :items="days"
        key-field="id"
        :item-size="itemSize"
        direction="horizontal"
        @scroll-end="handleScrollEnd"
        v-slot="{ item }"
        :buffer="1000"
      >
        <CalendarDay :day="item" :key="item.id" @select="handleDayClick" />
      </RecycleScroller>
      <button class="calendar__nav calendar__nav-right" @click="scrollRight">
        <ChevronRight class="nav-icon" />
      </button>
    </div>

    <div class="tasks__container" ref="tasksContainer">
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
    <TaskModal ref="taskModalRef" />
    <ConfirmModal
      v-if="isShowConfirmModal"
      title="Delete Task"
      message="Are you sure you want to delete this task? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      :is-destructive="true"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>
</template>

<style scoped>
.tasks {
  max-width: var(--container-wide);
  height: 100%;
  padding: var(--space-5xl) var(--space-lg) var(--space-3xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.calendar {
  position: relative;
  display: flex;
  align-items: center;
}
.calendar__header {
  position: absolute;
  top: calc(-1 * var(--space-4xl));
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  width: 100%;
  max-width: var(--container-wide);
  justify-content: center;
  gap: var(--space-lg);
  z-index: 1;
}
.calendar__today-button {
  position: absolute;
  top: auto;
  left: 0;
  padding: var(--space-sm) var(--space-md);
}
.calendar__today-button {
  top: auto;
  cursor: pointer;
}

.calendar__month-year {
  font-size: var(--font-size-xl);
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
  text-align: center;
  margin: 0 auto;
}

.calendar__nav {
  position: absolute;
  top: calc(50% - var(--space-md) / 2);
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
  left: calc(-1 * var(--space-2xl) - var(--space-sm));
}
.calendar__nav-right {
  right: calc(-1 * var(--space-2xl) - var(--space-sm));
}

.task__calendar {
  /* For correct work of vue-virtual-scroller*/
  height: 100px;
  overflow-x: auto;
  overflow-y: visible;
  scrollbar-width: thin;
  scrollbar-color: var(--color-text-muted) transparent;
  scroll-behavior: smooth;
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
