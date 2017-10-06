<template lang="html">
  <div class="selectcity">
    <header-item title="申请协会"></header-item>
    <div class="city">
      <div class="city_zone" v-for="item in 18">
        <span class="name">江西省钓鱼协会</span>
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
  margin: 1.5rem .2rem 0 .4rem;
}
.city_zone {
  display: flex;
  justify-content: space-between;
  /*margin-bottom: .4rem;*/
  font-size: 14px;
  line-height: 1.2rem;
  border-bottom: 1px solid #F0F0F0;
}
</style>
