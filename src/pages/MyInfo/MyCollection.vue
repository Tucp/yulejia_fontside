<template lang="html">
  <div class="mycollection header-item allbg">
    <header-item title="我的收藏" path="/my"></header-item>
    <my-nav></my-nav>
    <router-view></router-view>
  </div>
</template>


<script>
import Nav from '../MyCollection/Nav'
export default {
  components: {
    'my-nav': Nav
  }
}
</script>

<style lang="css">
</style>
