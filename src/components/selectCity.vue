<template lang="html">
  <div class="selectcity">
    <header-item title="选择地区"></header-item>
    <div class="Scity">
      <div class="city_zone" v-for="item in 18">
        <span class="name">青山湖区</span>
        <!-- <div class="spread"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.selectcity {
  margin-top: 1.5rem;
  font-size: 15px;
  margin: 1.5rem .2rem 0 .4rem;
}
.city_zone {
  width: 100%;
  display: flex;
  font-size: 14px;
  line-height: 1.2rem;
  border-bottom: 1px solid #F0F0F0;
}
</style>
