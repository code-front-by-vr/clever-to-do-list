<script>
import { Header, Main } from '@/components/shared/layout'
import { ToastContainer } from '@/plugins/toast'

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
