<script>
import { Circle, CircleCheck, Edit, Trash2 } from 'lucide-vue-next'
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
    Edit,
    Trash2,
  },
  methods: {
    handleEditTask() {
      this.$emit('edit', this.task)
    },
    handleDeleteTask() {
      this.$emit('delete', this.task)
    },
    toggleTask() {
      this.$emit('toggle', this.task)
    },
  },
}
</script>

<template>
  <div class="task-item">
    <div class="task-content">
      <CircleCheck v-if="task.done" class="task-item-icon task-done" @click="toggleTask" />
      <Circle v-else class="task-item-icon" @click="toggleTask" />
      <h4 :class="{ 'text-done': task.done }">{{ task.title }}</h4>
    </div>

    <div class="task-actions">
      <button @click="handleEditTask" class="action-button edit-button">
        <Edit class="action-icon" />
      </button>
      <button @click="handleDeleteTask" class="action-button delete-button">
        <Trash2 class="action-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-primary);
}

.task-content {
  display: flex;
  align-items: center;
  flex: 1;
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

.text-done {
  text-decoration: line-through;
}

h4 {
  font-size: var(--font-size-md);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
  margin: 0;
}

.task-actions {
  display: flex;
  gap: var(--space-lg);
  margin-left: var(--space-md);
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-lg);
  height: var(--space-lg);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
}

.action-icon {
  width: var(--space-lg);
  height: var(--space-lg);
  stroke-width: 2;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.edit-button:hover .action-icon {
  color: var(--color-primary);
}

.delete-button:hover .action-icon {
  color: var(--color-accent-warning);
}
</style>
