<template lang="html">
  <div class="mycollection_nav">
    <div class="mycollection_nav-item" v-for="item in datas" :key="item.id">
      <router-link :to="item.path">
        <span>{{item.name}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: [
        { id: 0, name: '赛事', path: '/mycollection/race' },
        { id: 1, name: '公告', path: '/mycollection/' },
        { id: 2, name: '约钓', path: '/mycollection/aboutfish' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
.mycollection_nav {
  border-bottom: 1px solid #f0f0f0;
  height: .925925926rem;
  background-color: #fff;
}
.mycollection_nav-item {
  float: left;
  width: 33.33333333%;
  text-align: center;
  line-height: .925925926rem;
  font-size: 14px;
}
.mycollection_nav-item span {
  color: #898989;
  padding-bottom: .11111111rem;
}
.router-link-exact-active span {
  color: #000;
  border-bottom: .0648148148rem solid #119df8;
  border-radius: .0648148148rem;
}
</style>
