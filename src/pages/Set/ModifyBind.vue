<template lang="html">
  <div class="bind allbg header-item">
    <header-item title="修改绑定手机"></header-item>
    <div class="input">
      <div class="tel">
        <img src="static/images/tel.jpg">
        <input type="tel" placeholder="请输入您的新手机号">
      </div>
      <div class="vertify">
        <img src="static/images/vertify.jpg">
        <input type="check" placeholder="请输入验证码">
        <button>获取验证码</button>
      </div>
    </div>
    <div class="confirm-btn">
      <button>确定</button>
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
.input {
  margin-top: .759259259rem;
}
.input div {
  width: 100%;
  height: 1.31481481rem;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
}
.input input {
  width: 100%;
  height: 100%;
  font-size: .407407407rem;
  padding-left: 1.2037037rem;
}
.input img {
  position: absolute;
  left: .425925926rem;
}
.input .tel img {
  width: .296296296rem;
  height: .462962963rem;
  top: .44444444rem;
}
.input .vertify img {
  height: .37037037rem;
  width: .37037037rem;
  top: .481481481rem;
}
.input button {
  position: absolute;
  right: .425925926rem;
  top: 0.314814815rem;
  width: 1.85185185rem;
  height: .759259259rem;
  font-size: .314814815rem;
  background-color: #f39800;
  border: 0;
  color: #fff;
  text-align: center;
  border-radius: 4px;
}
.confirm-btn {
  margin-top: .740740741rem;
  padding: 0 .425925926rem;
}
.confirm-btn button {
  height: 1.11111111rem;
  width: 100%;
  background-color: #119df8;
  border: 0;
  color: #fff;
  font-size: .407407407rem;
  border-radius: 5px;
}
</style>
