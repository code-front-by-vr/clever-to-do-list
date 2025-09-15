<script>
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import { formatForInput, toDate } from '@/utils/date'

export default {
  props: {
    isShowModal: {
      type: Boolean,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
    },
  },
  emits: ['close'],
  methods: {
    handleClose() {
      this.resetForm()
      this.$emit('close')
    },
    resetForm() {
      this.title = ''
      this.description = ''
      this.date = ''
      this.done = false
    },
    async handleSubmit() {
      const taskData = {
        title: this.title.trim(),
        description: this.description.trim(),
        date: toDate(this.date),
        done: this.done,
      }
      try {
        if (this.isEdit) {
          taskData.id = this.task.id
          await this.$store.dispatch('tasks/updateTask', taskData)
        } else {
          await this.$store.dispatch('tasks/createTask', taskData)
        }
        this.handleClose()
      } catch (error) {
        console.error('TaskModal/handleSubmit error:', error)
      }
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
  watch: {
    isShowModal(newVal) {
      if (newVal) {
        if (this.task) {
          this.title = this.task.title
          this.description = this.task.description
          this.date = formatForInput(this.task.date) || ''
          this.done = this.task.done
        } else {
          this.resetForm()
        }
      } else {
        this.resetForm()
      }
    },
  },
  components: {
    Input,
    Button,
  },
}
</script>

<template>
  <div v-if="isShowModal" class="modal-backdrop" @click.self="handleClose">
    <div class="modal">
      <div class="modal__title">{{ isEdit ? 'Edit Task' : 'Add Task' }}</div>
      <div class="modal__content">
        <form @submit.prevent="handleSubmit">
          <Input v-model="title" type="text" label="Title" placeholder="Enter task title" />
          <Input
            v-model="description"
            type="text"
            label="Description"
            placeholder="Enter task description"
          />
          <Input v-model="date" type="date" label="Date" placeholder="Enter task date" />
          <div class="modal__actions">
            <Button type="submit" variant="main" class="modal__action modal__action-submit">
              {{ isEdit ? 'Update' : 'Save' }}
            </Button>
            <Button
              type="button"
              variant="light"
              class="modal__action modal__action-cancel"
              @click="handleClose"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: var(--container-narrow);
  padding: var(--space-3xl);
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.modal__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--fw-semibold);
  color: var(--color-primary);
  margin-bottom: var(--space-md);
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.modal__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.modal__content form {
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
