<template lang="html">
  <div class="person allbg">
    <person-head></person-head>
    <person-nav></person-nav>
    <router-view></router-view>
    <person-footer></person-footer>
  </div>
</template>

<script>
import Head from './Head.vue'
import Nav from './Nav.vue'
import Footer from './Footer.vue'
export default {
  components: {
    'person-head': Head,
    'person-nav': Nav,
    'person-footer': Footer
  }
}
</script>

<style lang="css" scoped>
</style>
