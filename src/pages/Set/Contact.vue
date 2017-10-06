<template lang="html">
  <div class="contact" style="background: url(static/images/fish-logo.jpg);
    background-size: cover;">
    <!-- <header-item title="联系客服"></header-item> -->
    <div class="contact_head">
      <i onclick="history.go(-1)" class="back"></i>
      <p>联系客服</p>
    </div>
    <div class="content">
      <p class="tip">
        如您有任何问题想要沟通咨询
      </p>
      <p class="icon"></p>
      <button>请备注 “遛鱼用户”</button>
      <div class="contact_list">
        <div class="wechat">
          <p>加客服微信</p>
          <p class="num">w13007212962</p>
        </div>
        <div class="tel">
          <p>或致电</p>
          <p class="num" @click="callphone('0791-88202393')">0791-88202393</p>
        </div>
      </div>
      <p class="tips">我们将第一时间与您沟通解决问题</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
  },
  methods: {
    callphone (tel) {
      window.location.href = 'tel:' + tel
    }
  }
}
</script>

<style lang="css" scoped>
.contact {
  width: 100%;
  height: 100vh;
}
.contact_head {
  height: 1.35185185rem;
  /*border-bottom: 1px solid #dcdddd;*/
  font-size: .462962963rem;
  color: #fff;
}
.contact_head p {
  text-align: center;
  line-height: 1.35185185rem;
  margin-right: .7407407496rem;
  color: #252525;
}
.contact_head i {
  border-top: .0462962963rem solid #252525;
  border-left: .0462962963rem solid #252525;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  float: left;
  margin-left: .4259259256rem;
  margin-top: .5rem;
}
.content {
  text-align: center;
  margin-top: 5.64814815rem;
  color: #898989;
  position: relative;
  font-size: .407407407rem;
}
.content .tip{
  color: rgb(247, 214, 9);
}
.icon {
  width: .944444444rem;
  height: .0740740741rem;
  background-color: rgb(247, 214, 9);
  border-radius: .0740740741rem;
  margin: 0 auto;
  margin-top: .407407407rem;
}
button {
  margin-top: .518518519rem;
  width: 90%;
  height: 1.11111111rem;
  background-color: rgb(247, 214, 9);
  border: 0;
  color: #272825;
  font-size: .407407407rem;
  border-radius: 5px 5px 0 0;
  margin-bottom: .925925926rem;
}
.num {
  font-size: .518518519rem;
  color: rgb(247, 214, 9);
  margin-top: .314814815rem;
}
.wechat, .tel {
  margin-bottom: .833333333rem;
}
</style>
