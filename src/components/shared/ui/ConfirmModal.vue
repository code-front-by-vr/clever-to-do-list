<script>
import Modal from '@/components/shared/ui/Modal.vue'
import Button from '@/components/shared/ui/Button.vue'

export default {
  name: 'ConfirmModal',
  emits: ['confirm', 'cancel'],
  props: {
    title: {
      type: String,
      default: 'Confirm Action',
    },
    message: {
      type: String,
      default: 'Are you sure you want to proceed?',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    isDestructive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpened: false,
    }
  },
  methods: {
    open() {
      this.isOpened = true
    },
    close() {
      this.isOpened = false
    },
    handleConfirm() {
      this.$emit('confirm')
    },
    handleCancel() {
      this.$emit('cancel')
      this.close()
    },
  },
  components: {
    Modal,
    Button,
  },
}
</script>

<template>
  <Modal v-if="isOpened" @close="handleCancel">
    <template #header>
      {{ title }}
    </template>

    <p class="confirm-message">{{ message }}</p>

    <template #footer>
      <div class="confirm-actions">
        <Button :variant="isDestructive ? 'danger' : 'primary'" @click="handleConfirm">
          {{ confirmText }}
        </Button>
        <Button variant="ghost" @click="handleCancel">
          {{ cancelText }}
        </Button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.confirm-message {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: 1.5;
  text-align: center;
  margin: 0;
}

.confirm-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  margin-top: var(--space-lg);
}
</style>
