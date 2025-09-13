<script>
import { Circle, CircleCheck } from 'lucide-vue-next'
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
    },
  },
  components: {
    Circle,
    CircleCheck,
  },
}
</script>

<template>
  <div class="task-item">
    <CircleCheck v-if="task.done" class="task-item-icon task-done" />
    <Circle v-else class="task-item-icon" />
    <h4>{{ task.title }}</h4>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-primary);
}

.task-item-icon {
  width: var(--space-xl);
  height: var(--space-xl);
  stroke-width: 2.2;
  color: var(--color-task-pending);
  vertical-align: middle;
  margin-right: var(--space-md);
}

.task-done {
  color: var(--color-task-done);
}

h4 {
  font-size: var(--font-size-md);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
}
</style>
