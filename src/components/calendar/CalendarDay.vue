<script>
import { isSameDay } from '@/lib/utils/date'

export default {
  name: 'CalendarDay',
  props: {
    day: {
      type: Object,
      required: true,
    },
  },
  computed: {
    taskStats() {
      return this.$store.getters['tasks/taskStatsByDate'](this.day.date)
    },
    hasPending() {
      return this.taskStats.hasPending
    },
    hasDone() {
      return this.taskStats.hasDone
    },
    isSelected() {
      const selectedDate = this.$store.state.tasks.selectedDate
      return selectedDate && isSameDay(this.day.date, selectedDate)
    },
  },
  methods: {
    handleSelectDay() {
      this.$store.commit('tasks/SET_SELECTED_DATE', this.day.date)
    },
  },
}
</script>

<template>
  <div
    :class="['calendar__day', { 'calendar__day--selected': isSelected }]"
    @click="handleSelectDay"
  >
    <div class="calendar__label">
      <span class="calendar__weekday">{{ day.weekday }}</span>
      <span class="calendar__date">{{ day.formattedDate }}</span>
    </div>
    <div
      class="calendar__status"
      :class="{ 'calendar__status--pending': hasPending, 'calendar__status--done': hasDone }"
    ></div>
  </div>
</template>

<style scoped>
.calendar__day {
  --_border-color: var(--border-color, transparent);

  width: 84px;
  padding: var(--space-md) var(--space-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--color-surface);
  border: var(--border-thin-2) var(--_border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
}

.calendar__day:hover {
  background: var(--color-gradient);
  --border-color: var(--color-text-muted);
  box-shadow: 0 4px 12px var(--shadow-primary);
}

.calendar__day--selected {
  --border-color: var(--color-primary);
}

.calendar__label {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar__weekday {
  font-size: var(--font-size-sm);
  font-weight: var(--fw-medium);
  color: var(--color-text-secondary);
}

.calendar__date {
  font-size: var(--font-size-lg);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
}

.calendar__status {
  display: flex;
  gap: var(--space-xs);
}

.calendar__status::before,
.calendar__status::after {
  content: '';
  width: var(--space-sm);
  height: var(--space-sm);
  border-radius: var(--radius-rounded);
  background-color: transparent;
}

.calendar__status--pending::before {
  background-color: var(--color-task-pending);
}

.calendar__status--done::after {
  background-color: var(--color-task-done);
}
</style>
