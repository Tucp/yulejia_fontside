<template lang="html">
  <div class="search_details allbg header-item">
    <search-head></search-head>
    <search-nav></search-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Head from './Head'
import Nav from './Nav'
export default {
  data () {
    return {
      isShow: false
    }
  },
  components: {
    'search-head': Head,
    'search-nav': Nav
  }
}
</script>

<style lang="css" scoped>
</style>
