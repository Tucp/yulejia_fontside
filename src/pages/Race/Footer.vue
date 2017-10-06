<template lang="html">
  <footer class="footer">
    <div class="item" v-for="item in tabbars" key="item.id">
      <router-link :to="item.path" >
        <div :class="{active: item.isActive}" @click="changeActive(item.id)">
          <img :src="item.isActive ? item.src_active : item.src">
          <p>{{item.name}}</p>
        </div>
      </router-link>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
  // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'tabbars'
    ])
  },
  methods: {
    changeActive (id) {
      this.$store.dispatch('changeTabbarActive', id)
    }
  }
}
</script>

<style lang="css" scoped>
footer {
  border-top: 1px solid #dcdddd;
  z-index: 999;
  position: fixed;
  height: 1.40740741rem;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
}
footer .item {
  float: left;
  width: 25%;
  padding: .148148148rem 0px;
}
footer div a {
  color: #9b9b9b;
}
footer div img {
  width: .648148148rem;
  height: .648148148rem;
}
.active {
  color: #119df8;
}
</style>
