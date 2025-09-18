<script>
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import { formatDateToDisplayValue, toDate } from '@/lib/utils/date'
import Modal from '@/components/common/Modal.vue'

export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    taskId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      title: '',
      description: '',
      date: '',
      done: false,
    }
  },
  emits: ['close'],
  computed: {
    task() {
      return this.$store.getters['tasks/taskById'](this.taskId)
    },
  },
  methods: {
    resetForm() {
      Object.assign(this.$data, {
        title: '',
        description: '',
        date: '',
        done: false,
      })
    },
    handleClose() {
      this.resetForm()
      this.$emit('close')
    },
    async handleSubmit() {
      const taskData = {
        title: this.title.trim(),
        description: this.description.trim(),
        date: toDate(this.date),
        done: this.done,
      }

      if (this.isEditing) {
        if (!this.taskId) {
          console.error('TaskModal: there is no taskId to update')
          return
        }

        Object.assign(taskData, {
          id: this.taskId,
        })
      }

      const action = this.isEditing ? 'tasks/updateTask' : 'tasks/createTask'

      try {
        await this.$store.dispatch(action, taskData)
        this.handleClose()
      } catch (error) {
        console.error('TaskModal/handleSubmit error:', error)
      }
    },
  },

  mounted() {
    if (!this.isEditing && this.$store.state.tasks.selectedDate) {
      Object.assign(this.$data, {
        date: formatDateToDisplayValue(this.$store.state.tasks.selectedDate) || '',
      })
    }
    if (this.task) {
      Object.assign(this.$data, {
        ...this.task,
        date: formatDateToDisplayValue(this.task.date) || '',
      })
    }
  },
  components: {
    Input,
    Button,
    Modal,
  },
}
</script>

<template>
  <Modal @close="handleClose">
    <template #header>
      {{ isEditing ? 'Edit Task' : 'Add Task' }}
    </template>

    <form class="modal__form" @submit.prevent="handleSubmit">
      <Input v-model="title" type="text" label="Title" placeholder="Enter task title" required />
      <Input
        v-model="description"
        type="text"
        label="Description"
        placeholder="Enter task description"
        required
      />
      <Input v-model="date" type="date" label="Date" placeholder="Enter task date" required />
      <div class="modal__actions">
        <Button type="submit" class="modal__action modal__action--submit">
          {{ isEditing ? 'Update' : 'Save' }}
        </Button>
        <Button
          type="button"
          variant="ghost"
          class="modal__action modal__action--cancel"
          @click="handleClose"
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
