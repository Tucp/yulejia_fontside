<template lang="html">
  <div class="bindok allbg header-item">
    <header-item title="绑定手机"></header-item>
    <div class="tel">
      <span>手机号</span>
      <span>135****0936</span>
    </div>
    <div class="button">
      <button>修改手机号</button>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
* {
  overflow: hidden;
}
.bindok {
  font-size: .407407407rem;
}
.tel {
  padding: 0 .425925926rem;
  margin-top: .759259259rem;
  height: 1.31481481rem;
  background-color: #fff;
  line-height: 1.31481481rem;
}
.tel span:last-child {
  float: right;
  color: #898989;
}
.button {
  margin-top: .740740741rem;
  padding: 0 .425925926rem;
}
button {
  height: 1.11111111rem;
  width: 100%;
  background-color: #f0f0f0;
  border: 0;
  color: #119df8;
  font-size: .407407407rem;
  border-radius: 5px;
  border: 1px solid #119df8;
}
</style>
