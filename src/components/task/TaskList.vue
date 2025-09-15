<script>
import TaskItem from '@/components/task/TaskItem.vue'

export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
    },
  },
  components: {
    TaskItem,
  },
  methods: {
    handleEditTask(task) {
      this.$emit('edit', task)
    },
    handleDeleteTask(task) {
      this.$emit('delete', task)
    },
    handleToggleTask(task) {
      this.$emit('toggle', task)
    },
  },
}
</script>
<template>
  <div class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit="handleEditTask"
      @delete="handleDeleteTask"
      @toggle="handleToggleTask"
    />
  </div>
</template>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: var(--container-normal);
  margin: 0 auto;
}
</style>
