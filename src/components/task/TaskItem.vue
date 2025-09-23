<script>
import { Edit, Trash2 } from 'lucide-vue-next'
import Checkbox from '@/components/shared/ui/Checkbox.vue'
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
    Edit,
    Trash2,
    Checkbox,
  },
}
</script>

<template>
  <div class="task-item">
    <div class="task-item__content">
      <Checkbox v-model="task.done" @change="toggleTask()" />
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
  box-shadow: var(--shadow-surface);
  border: var(--border-thin-1) var(--color-border-muted);

  @media (max-width: 1200px) {
    padding: var(--space-sm) var(--space-lg);
  }
  @media (max-width: 1024px) {
    padding: var(--space-sm) var(--space-md);
  }
}

.task-item__content {
  display: flex;
  align-items: center;
  flex: 1;
  gap: var(--space-lg);
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

  @media (max-width: 768px) {
    gap: var(--space-md);
    margin-left: var(--space-sm);
  }
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
