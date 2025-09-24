<script>
import { isSameDay } from '@/lib/utils'

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
      this.$emit('select', this.day.date)
    },
  },
}
</script>

<template>
  <button
    type="button"
    :class="[
      'calendar__day',
      {
        'calendar__day--selected': isSelected,
        'calendar__day--pending': hasPending,
        'calendar__day--done': hasDone,
      },
    ]"
    @click="handleSelectDay"
  >
    <span class="calendar__label">
      <span class="calendar__weekday">{{ day.weekday }}</span>
      <span class="calendar__date">{{ day.formattedDate }}</span>
    </span>
  </button>
</template>

<style scoped>
.calendar__day {
  --_border-color: var(--border-color);

  /* Fixed width needs for virtual scroller*/
  width: 84px;
  padding: var(--space-md) var(--space-sm);

  background-color: var(--color-surface);
  border: var(--border-thin-2) var(--_border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-surface);

  --calendar-day-outline-color: var(--color-primary);
  outline-color: var(--calendar-day-outline-color) !important;
  cursor: pointer;

  transition: background 0.3s ease;
}

.calendar__day:hover,
.calendar__day--selected,
.calendar__day--selected:hover {
  box-shadow: var(--shadow-surface);
  --border-color: var(--color-primary);
}

.calendar__day:hover {
  background: var(--color-gradient);
}

.calendar__day--selected:hover {
  background: var(--color-surface);
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
  --calendar__date-status-color: var(--color-text-primary);
  padding-bottom: var(--space-md);
}

.calendar__day::before,
.calendar__day::after {
  content: '';
  position: absolute;
  bottom: var(--space-sm);
  transform: translateY(-100%);
  height: var(--space-sm);
  width: var(--space-sm);
  border-radius: var(--radius-rounded);
  background-color: var(--calendar__date-status-color);
}

.calendar__day::before {
  left: calc(50% - var(--space-md));
}
.calendar__day::after {
  left: calc(50% + var(--space-xs));
}

.calendar__day--pending::before {
  --calendar__date-status-color: var(--color-task-pending);
}

.calendar__day--done::after {
  --calendar__date-status-color: var(--color-task-done);
}
</style>
