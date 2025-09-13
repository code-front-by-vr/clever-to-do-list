<script>
export default {
  name: 'CalendarDay',
  props: {
    day: {
      type: Object,
    },
  },
}
</script>

<template>
  <div class="day-info">
    <div class="day-label" :data-weekday="day.weekday" :data-date="day.date"></div>

    <div class="status-dots">
      <div class="status-dot"></div>
      <div class="status-dot"></div>
    </div>
  </div>
</template>

<style scoped>
.day-info {
  padding: var(--space-md) var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  gap: var(--space-xs);
  background-color: var(--color-surface);
  color: var(--color-text-muted);
  border-radius: var(--radius-md);
}

.day-label {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-label::before {
  content: attr(data-weekday);
  font-size: var(--font-size-sm);
  font-weight: var(--fw-medium);
  color: var(--color-text-muted);
}

.day-label::after {
  content: attr(data-date);
  font-size: var(--font-size-lg);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
}
.status-dots {
  display: flex;
  gap: var(--space-xs);
}
.status-dot {
  width: var(--space-sm);
  height: var(--space-sm);
  border-radius: var(--radius-full);
  background-color: var(--color-task-pending);
  border: 1px solid var(--color-surface);
}
</style>
