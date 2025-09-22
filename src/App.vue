<script>
import Header from '@/components/shared/layout/Header.vue'
import Main from '@/components/shared/layout/Main.vue'
import ToastContainer from '@/plugins/toast/ToastContainer.vue'

export default {
  components: {
    Header,
    Main,
    ToastContainer,
  },
}
</script>

<template>
  <Header />
  <Main />
  <ToastContainer />
</template>
