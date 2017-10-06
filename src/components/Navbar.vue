<template lang="html">
  <div class="navbar">
    <div v-for="item in navbars" :key="item.id">
      <router-link :to="item.path">
        <span :class="{active: item.isActive}" @click="changeActive(item.id)">
          {{item.name}}
        </span>
      </router-link>
        <div class="loading">
            <i v-show="isLoading" class="icon-loading"></i>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
  // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'navbars'
    ])
  },
  methods: {
    changeActive (id) {
      this.isLoading = true
      this.$store.dispatch('changeNavbarActive', id)
      this.isLoading = false
    }
  }
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.navbar {
  height: 1.14814815rem;
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  top: 1.31481481rem;
  background-color: #343434;
  z-index: 999;
  overflow: hidden;
}
.navbar div {
  width: 33.33333333%;
  height: 1.14814815rem;
  float: left;
  text-align: center;
  line-height: 1.14814815rem;
  overflow: hidden;
}
.navbar div span {
  overflow: hidden;
  height: 100%;
  display: block;
  width: 2.6rem;
  color: #898989;
  font-size: 16px;
  margin: 0 auto;
}
.navbar span.active {
  color: #FBAB0B;
  border-bottom: 3px solid #FBAB0B;
}
.loading {
  display: flex;
  justify-content: center;
}
.icon-loading {
  display: inline-block;
  position: absolute;
  text-align: center;
  top: 3rem;
  width: 40px;
  height: 40px;
  background: url('../../static/images/loading.svg') no-repeat;
  animation: loading .4s linear infinite;
  background-size: contain;
}
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>