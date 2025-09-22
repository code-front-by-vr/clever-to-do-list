<script>
import { Circle, CircleCheck, Edit, Trash2 } from 'lucide-vue-next'
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
    },
  },
  methods: {
    handleEditTask() {
      this.$emit('edit', this.task.id)
    },
    handleDeleteTask() {
      this.$emit('delete', { date: this.task.date, taskId: this.task.id })
    },
    toggleTask() {
      this.$emit('toggle', this.task.id)
    },
  },
  components: {
    Circle,
    CircleCheck,
    Edit,
    Trash2,
  },
}
</script>

<template>
  <div class="task-item">
    <div class="task-item__content">
      <CircleCheck
        v-if="task.done"
        class="task-item__icon task-item__icon--done"
        @click="toggleTask()"
      />
      <Circle v-else class="task-item__icon" @click="toggleTask()" />
      <div class="task-item__content-text">
        <h4 :class="['task-item__title', { 'task-item__title--done': task.done }]">
          {{ task.title }}
        </h4>
        <p class="task-item__descriptions">{{ task.description }}</p>
      </div>
    </div>

    <div class="task-item__actions">
      <button @click="handleEditTask()" class="task-item__button task-item__button--edit">
        <Edit class="task-item__icon-action" />
      </button>
      <button @click="handleDeleteTask()" class="task-item__button task-item__button--delete">
        <Trash2 class="task-item__icon-action" />
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

.task-item__content {
  display: flex;
  align-items: center;
  flex: 1;
}

.task-item__icon {
  width: var(--space-2xl);
  height: var(--space-2xl);
  stroke-width: 2.2;
  color: var(--color-task-pending);
  vertical-align: middle;
  margin-right: var(--space-md);
}

.task-item__icon--done {
  color: var(--color-task-done);
}

.task-item__content-text {
  display: flex;
  flex-direction: column;
}

.task-item__title {
  font-size: var(--font-size-md);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
  margin: 0;
}

.task-item__title--done {
  text-decoration: line-through;
}

.task-item__descriptions {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.task-item__actions {
  display: flex;
  gap: var(--space-lg);
  margin-left: var(--space-md);
}

.task-item__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-xl);
  height: var(--space-xl);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;
}

.task-item__icon-action {
  width: var(--space-xl);
  height: var(--space-xl);
  stroke-width: 2;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.task-item__button--edit:hover .task-item__icon-action {
  color: var(--color-primary);
}

.task-item__button--delete:hover .task-item__icon-action {
  color: var(--color-accent-warning);
}
</style>
