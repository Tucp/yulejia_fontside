<template lang="html">
  <div class="my">
    <my-head></my-head>
    <my-interactive></my-interactive>
    <my-order></my-order>
    <my-wait></my-wait>
    <my-cell></my-cell>
  </div>
</template>

<script>
import Head from '../My/Head'
import Interactive from '../My/Interactive'
import Wait from '../My/Wait'
import Order from '@/components/order'
import Cell from '../My/Cell'

export default {
  created () {
    this.$store.dispatch('changeTabbarActive', 3)
  },
  components: {
    'my-head': Head,
    'my-interactive': Interactive,
    'my-wait': Wait,
    'my-order': Order,
    'my-cell': Cell
  }
}
</script>

<style lang="css" scoped>
.my {
  overflow: hidden;
}
</style>
