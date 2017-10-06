<template lang="html">
  <div class="nav">
    <div class="attentedfish">
      <router-link :to="{ name: 'attentedfish', params: { id: this.$route.params.id } }">
        关注的钓场
      </router-link>
    </div>
    <div class="sendfish">
      <router-link :to="{ name: 'sendfish', params: { id: this.$route.params.id } }">
        发起的钓约
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.nav {
  height: 1.25925926rem;
  font-size: .407407407rem;
  background-color: #fff;
  margin-bottom: .277777778rem;
}
.nav div {
  float: left;
  width: 50%;
  text-align: center;
  line-height: 1.25925926rem;
}
.nav div a {
  padding-bottom: .203703704rem;
}
.router-link-exact-active {
  border-bottom: .0648148148rem solid #119df8;
  border-radius: .0648148148rem;
}
</style>
