<script>
import Input from '@/components/shared/ui/Input.vue'
import Button from '@/components/shared/ui/Button.vue'
import { formatDateToDisplayValue } from '@/lib/utils'
import { formToTaskData } from '@/lib'
import Modal from '@/components/shared/ui/Modal.vue'

export default {
  data() {
    return {
      isOpened: false,
      taskId: null,
      title: '',
      description: '',
      date: '',
      done: false,
    }
  },
  emits: ['close'],
  computed: {
    isEditing() {
      return this.taskId !== null
    },
    task() {
      return this.$store.getters['tasks/taskById'](this.taskId)
    },
    modalTitle() {
      return this.isEditing ? 'Edit Task' : 'Add Task'
    },
    submitButtonText() {
      return this.isEditing ? 'Update' : 'Save'
    },
  },
  methods: {
    open(taskId = null) {
      this.taskId = taskId
      if (this.task) {
        Object.assign(this.$data, {
          ...this.task,
          date: formatDateToDisplayValue(this.task.date) || '',
        })
      } else if (this.$store.state.tasks.selectedDate) {
        this.date = formatDateToDisplayValue(this.$store.state.tasks.selectedDate)
      }
      this.isOpened = true
    },
    resetForm() {
      Object.assign(this.$data, {
        title: '',
        description: '',
        date: '',
        done: false,
      })
    },
    close() {
      this.resetForm()
      this.isOpened = false
    },
    async handleSubmit() {
      const taskData = formToTaskData(this.$data, this.isEditing ? this.taskId : null)

      const action = this.isEditing ? 'tasks/updateTask' : 'tasks/createTask'

      try {
        await this.$store.dispatch(action, taskData)
        this.close()
      } catch (error) {
        console.error('TaskModal/handleSubmit error:', error)
      }
    },
  },
  components: {
    Input,
    Button,
    Modal,
  },
}
</script>

<template>
  <Modal v-if="isOpened" @close="close()">
    <template #header>
      {{ modalTitle }}
    </template>

    <form class="modal__form" @submit.prevent="handleSubmit">
      <Input
        v-model="title"
        type="text"
        name="title"
        label="Title"
        placeholder="Enter task title"
        required
      />
      <Input
        v-model="description"
        type="text"
        name="description"
        label="Description"
        placeholder="Enter task description"
        required
      />
      <Input
        v-model="date"
        type="date"
        name="date"
        label="Date"
        placeholder="Enter task date"
        required
      />
      <div class="modal__actions">
        <Button type="submit" class="modal__action modal__action--submit">
          {{ submitButtonText }}
        </Button>
        <Button
          type="button"
          variant="ghost"
          class="modal__action modal__action--cancel"
          @click="close()"
        >
          Cancel
        </Button>
      </div>
    </form>
  </Modal>
</template>

<style scoped>
.modal__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--space-2xl);
}

.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-xl);
}

.modal__action {
  width: 50%;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);
}
</style>
