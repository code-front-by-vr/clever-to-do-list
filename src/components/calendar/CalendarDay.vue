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
    <span class="day-name">{{ day.weekday }}</span>
    <span class="day-number">{{ day.date }}</span>

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

.day-name {
  font-size: var(--font-size-sm);
  font-weight: var(--fw-medium);
}

.day-number {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--fw-medium);
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
