<template lang="html">
  <div class="teamapply header-item">
    <header-item title="团队赛事报名"></header-item>
    <div class="title">
      <div class="img">
        <img src="static/images/list01.jpg">
      </div>
      <div class="text">
        <p>围观iwbojdskkqasfksdkk但是vgkdsklnvdkdskvnskd</p>
        <p><span>比赛时间：</span>2017-06-03 - 06-20</p>
      </div>
    </div>
    <div class="information">
      <div class="name block">
        <div class="item">
          <span>团 队 名 称</span>
          <input type="text">
        </div>
      </div>
      <div class="user" v-for="item in datas">
        <div class="desc">
          {{item}}
        </div>
        <div class="block">
          <div class="item">
            <span>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名</span>
            <input type="text">
          </div>
          <div class="item">
            <span>电&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp话</span>
            <input type="text">
          </div>
          <div class="item">
            <span>身份证号码</span>
            <input type="text">
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>
        <span>共 1 人</span>
        <span>费用合计：</span>
        ￥600263
      </p>
      <button>结算</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: ['创建人', '团员1', '团员2']
    }
  }
}
</script>

<style lang="css" scoped>
.teamapply {
  margin-bottom: 1.6rem;
}
.teamapply .title {
  padding: .277777778rem .44444444rem;
  position: relative;
  border-bottom: .277777778rem solid #f0f0f0;
}
.teamapply .title div {
  float: left;
}
.teamapply .title .img {
  width: 2.73148148rem;
  height: 2.08333333rem;
  overflow: hidden;
  margin-right: .44444444rem;
}
.teamapply .title img {
  width: 100%;
  height: 100%;
}
.teamapply .text {
  width: 5.5rem;
  padding-top: .277777778rem;
  height: 1.8rem;
  position: relative;
}
.teamapply .text p:first-child {
  font-size: 14px
}
.teamapply .text p:last-child {
  position: absolute;
  bottom: 0;
}
.teamapply .text p:last-child span {
  color: #898989;
}
.teamapply .item {
  height: 1.277777778rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.teamapply .block {
  border-bottom: .277777778rem solid #f0f0f0;
  padding: 0 .44444444rem;
}
.teamapply .user div:not(:first-child) {
  border-top: 1px solid #f0f0f0;
}
.teamapply .item span {
  width: 2.277777778rem;
}
.teamapply .item input {
  color: #898989;
}
.teamapply .user .desc {
  height: .833333333rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding-left: .44444444rem;
  color: #898989;
  font-size: 14px;
}
.teamapply .footer {
  background-color: #fff;
  z-index: 999;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: .537037037rem .44444444rem;
}
.teamapply .footer p {
  font-size: 14px;
  color: rgb(243,152,0);
}
.teamapply .footer span {
  color: #000;
}
.teamapply .footer span:first-child {
  margin-right: .6rem;
}
.teamapply .footer button {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 110%;
  width: 2.96296296rem;
  background-color: rgb(243,152,0);
  border: 0;
  font-size: 16px;
  color: #fff;
}
</style>
