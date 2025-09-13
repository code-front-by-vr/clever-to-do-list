<script>
import TaskList from '@/components/task/TaskList.vue'
import TaskCalendar from '@/components/calendar/TaskCalendar.vue'

export default {
  components: {
    TaskList,
    TaskCalendar,
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          done: false,
        },
        {
          id: 2,
          title: 'Task 2',
          done: true,
        },
        {
          id: 3,
          title: 'Task 3',
          done: false,
        },
      ],
    }
  },
}
</script>

<template>
  <div class="tasks-wrapper">
    <!-- !TODO: TaskCalendar component -->
    <TaskCalendar />

    <h2 class="tasks-title">Tasks today: {{ tasks.length }}</h2>

    <!-- !TODO: TasksList component -->
    <TaskList :tasks />
    <!-- !TODO AddTaskButton component -->
  </div>
</template>

<style scoped>
.tasks-wrapper {
  padding: var(--space-3xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.tasks-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
  margin-top: var(--space-xl);
}
</style>
