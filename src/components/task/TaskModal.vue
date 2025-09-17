<!-- <script>
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import { formatDateToDisplayValue, toDate } from '@/lib/utils/date'

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
  emits: ['close'],
  computed: {
    task() {
      return this.$store.getters['tasks/taskById'](this.taskId)
    },
  },
  methods: {
    resetForm() {
      this.title = ''
      this.description = ''
      this.date = ''
      this.done = false
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
      try {
        if (this.isEditing) {
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
  mounted() {
    if (this.task) {
      this.title = this.task.title
      this.description = this.task.description
      this.date = formatDateToDisplayValue(this.task.date) || ''
      this.done = this.task.done
    }
  },
  components: {
    Input,
    Button,
  },
}
</script>

<template>
  <div class="modal-backdrop" @click.self="handleClose">
    <div class="modal">
      <div class="modal__title">{{ isEditing ? 'Edit Task' : 'Add Task' }}</div>
      <div class="modal__content">
        <form class="modal__form" @submit.prevent="handleSubmit">
          <Input
            v-model="title"
            type="text"
            label="Title"
            placeholder="Enter task title"
            required
          />
          <Input
            v-model="description"
            type="text"
            label="Description"
            placeholder="Enter task description"
            required
          />
          <Input v-model="date" type="date" label="Date" placeholder="Enter task date" required />
          <div class="modal__actions">
            <Button type="submit" variant="primary" class="modal__action modal__action--submit">
              {{ isEditing ? 'Update' : 'Save' }}
            </Button>
            <Button
              type="button"
              variant="ghost"
              class="modal__action modal__action--cancel"
              @click="handleClose()"
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
</style> -->

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
