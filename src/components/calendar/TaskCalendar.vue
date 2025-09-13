<script>
import CalendarDay from './CalendarDay.vue'

export default {
  name: 'TaskCalendar',
  components: {
    CalendarDay,
  },
  data() {
    return {
      days: [
        { id: 1, date: 15, weekday: 'Mon' },
        { id: 2, date: 16, weekday: 'Tue' },
        { id: 3, date: 17, weekday: 'Wed' },
        { id: 4, date: 18, weekday: 'Thu' },
        { id: 5, date: 19, weekday: 'Fri' },
        { id: 6, date: 20, weekday: 'Sat' },
        { id: 7, date: 21, weekday: 'Sun' },
      ],
    }
  },
}
</script>

<template>
  <div class="task-calendar">
    <CalendarDay v-for="day in days" :key="day.id" :day="day" />
  </div>
</template>

<style scoped>
.task-calendar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--space-lg);
}
</style>
