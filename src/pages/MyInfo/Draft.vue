<template lang="html">
  <div class="draft header-item allbg">
    <header-item title="草稿箱"></header-item>
    <div class="fishname" @click="touch">
      <div class="fishname_top">
        <div class="fishname-left">
          <span>添加钓场</span>
          <span>2017-4-20 14:17</span>
        </div>
        <div class="fishname-right">
          <div class="fishname_button">重发</div>
        </div>
      </div>
      <div class="fishname_bottom">
        <img src="static/images/person3.jpg" alt="">
      </div>
    </div>
    <div class="bar"></div>
    <div class="fishname" @click="touch">
      <div class="fishname_top">
        <div class="fishname-left">
          <span>评论</span>
          <span>2017-7-20 18:47</span>
        </div>
        <div class="fishname-right">
          <div class="fishname_button">重发</div>
        </div>
      </div>
      <div class="fishname_bottom sec">
        添加钓场信息添加钓场信息添加钓场信息添加钓场信息添加钓场信息添加钓场信息添加钓场信息
        钓场信息添加钓场信息添加钓场信息

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    touch () {
      var timeOutEvent=0;//定时器
//开始按
      function gtouchstart(){
        timeOutEvent = setTimeout("longPress()",500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
        return false;
      };
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      function gtouchend(){
        clearTimeout(timeOutEvent);//清除定时器
        if(timeOutEvent!=0){
      //这里写要执行的内容（尤如onclick事件）
          alert("你这是点击，不是长按");
        }
        return false;
      };
      //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      function gtouchmove(){
        clearTimeout(timeOutEvent);//清除定时器
        timeOutEvent = 0;
      };

      //真正长按后应该执行的内容
      function longPress(){
        timeOutEvent = 0;
      //执行长按要执行的内容，如弹出菜单
      alert("手机长按事件")
          }
    }
  },
  mounted () {

  }
}
</script>

<style lang="css" scoped>
.fishname {
  background-color: white;
  height: 5rem;
  width: 100%;
  padding: .2rem .4rem;
  display: flex;
  flex-direction: column;
  padding-bottom: .3rem;
}
.fishname_top {
  flex: 1;
  display: flex;
}
.fishname-left {
  flex:2;
  display: flex;
  flex-direction: column;
}
.fishname-left span {
  flex: 1;
}
.fishname-left span:nth-child(1) {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #3e3a39;
}
.fishname-left span:nth-child(2) {
  font-size: 12px;
  color: #898989;
}
.fishname-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fishname_button {
  width: 1.4rem;
  text-align: center;
  line-height: .8rem;
  border: 1px solid #EAEBEB;
  color: #898989;
  font-size: 15px;
}
.fishname_bottom {
  flex: 1.8;
  display: flex;
}
.sec {
  width: 92%;
  font-size: 16px;
  line-height: .7rem;
  color: #3e3a39;
}
.fishname_bottom img {
  width: 3rem;
  background-size: cover;
}
.bar {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
  /*margin-top: .2rem;*/
}
</style>
