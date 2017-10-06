<template lang="html">
  <div class="aboutfish header-item">
    <header-item title="约钓通知" path="/message"></header-item>
    <div class="aboutfish_nav">
      <div>
        <router-link to="/message/aboutfish/">
          <span>我发起的</span>
        </router-link>
      </div>
      <div>
        <router-link to="/apply">
          <span>我报名的</span>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.aboutfish_nav {
  line-height: 1.24074074rem;
  border-bottom: .277777778rem solid #f0f0f0;
  position: fixed;
  left: 0;
  right: 0;
  top: 1.35185185rem;
  background-color: #fff;
}
.aboutfish_nav div {
  float: left;
  width: 50%;
  text-align: center;
}
.aboutfish_nav div span {
  font-size: 14px;
  padding-bottom: .2rem;
}
.router-link-exact-active span {
  border-bottom: 3px solid #119df8;
  border-radius: 3px;
}
</style>
