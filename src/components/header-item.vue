<template lang="html">
  <header>
    <i @click="goBack" class="back"></i>
    <p>{{title}}</p>
  </header>
</template>

<script>
export default {
  props: ['title', 'path'],
  methods: {
    goBack () {
      this.$store.commit('changeShowX', true)
      if (this.path) {
          this.$router.push({ path: this.path })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="css" scoped>
header {
  height: 1.35185185rem;
  border-bottom: 1px solid #dcdddd;
  /*font-size: .462962963rem;*/
  font-size: 16px;
  background-color: #232323;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  overflow: hidden;
}
header p {
  text-align: center;
  line-height: 1.35185185rem;
  color:#FBAB0B;
}
header i {
  border-top: .0462962963rem solid #FBAB0B;
  border-left: .0462962963rem solid #FBAB0B;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  position: absolute;
  left: .4259259256rem;
  top: .5rem;
}
</style>
