<template lang="html">
  <div class="search_nav">
    <div class="search_nav-item" v-for="item in navs" :key="item.id">
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
      navs: [
        { id: 0, name: '钓场', path: '/search/' },
        { id: 1, name: '赛事', path: '/search/race' },
        { id: 2, name: '公告', path: '/search/announcement' },
        { id: 3, name: '约钓', path: '/search/aboutfish' }
      ],
      Tab: '钓场'
    }
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>
.search_nav {
  position: fixed;
  top: 1.34259259rem;
  width: 100%;
  left: 0;
  z-index: 100;
  /*height: .925925925926rem;*/
  border-top: 1px solid #dcdddd;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
.search_nav-item {
  float: left;
  width: 25%;
  font-size: 14px;
  text-align: center;
  line-height: .925925925926rem;
  overflow: hidden;
}
.search_nav-item span {
  color: #898989;
  padding-bottom: .11111111rem;
}
.router-link-exact-active span {
  border-bottom: .0648148148rem solid #119df8;
  border-radius: .0648148148rem;
  color: #000;
}
</style>
