<template lang="html">
  <div class="chat header-item allbg">
    <header>
      <i onclick="history.go(-1)" class="back"></i>
      <p>邱哥</p>
      <img src="static/images/trash1.png" class=".trash">
    </header>
    <div class="chatting">
        <div v-for="(item, index) in messageList" class="message">
          <div class="group" v-if="item.type === 2">
              <div class="center">
                  <div class="jiqi">
                    <img class="avatar" src="static/images/0.gif" alt="">
                  </div>

                  <div class="text1"><p class="time">2017-7-21 16:40</p><span class="horn1">{{item.msg}}</span></div>
              </div>
              <br style="clear: both;"/>
          </div>
          <div class="sending" v-if="item.type === 3">
              <div class="right">
                  <div class="text2"><p class="time">2017-7-21 16:40</p><span class="horn2">{{item.msg}}</span></div>
                  <div class="person">
                    <img class="avatar" src="static/images/0.gif" alt="">
                  </div>
              </div>
              <br style="clear: both;"/>
          </div>
      </div>
    </div>
    <div class="send">
      <input type="text" @keyup.enter="send" v-model="value" class="input" @input="changeCheckBtnActive()">
      <div class="yuyin">
        <img src="static/images/smile.png" alt="">
      </div>
      <div  @click="send" class="button" :class="{isbg: Tab==='brief'}">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      messageList: [{
       type: 2 ,
       msg: '鹏创科技有限公司欢迎您的加入！',
       Tab: ''
     }]
    }
  },
  mounted () {
  socket.on('receiveGroupMsg', (value) => {
      this.messageList.push(
        {type: 2, msg: value}
      );
  })
},
  methods: {
    send () {
      if (this.value === '') {
        return;
      } else {
        socket.emit('sendGroupMsg', this.value.trim());
        this.messageList.push({
          type: 3,
          msg: this.value.trim()
        })
        this.value = ''
      }
    },
    changeCheckBtnActive () {
      let tel = document.querySelector('.input').value.trim()
      if (tel != '') {
        this.Tab = 'brief'
      } else {
        this.Tab = ''
      }
    },
    scroll () {
    this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
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
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  overflow: hidden;
  background-color: #FFFFFF;
}
header p {
  text-align: center;
  line-height: 1.35185185rem;
}
header i {
  border-top: .0462962963rem solid #A5A5A5;
  border-left: .0462962963rem solid #A5A5A5;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  position: absolute;
  left: .4259259256rem;
  top: .5rem;
}
header img {
  position: absolute;
  right: .4259259256rem;
  top: .5rem;
  /*height: .462962963rem;
  width: .462962963rem;*/
  height: 16px;
  width: 16px;
  z-index: 100000;
}
.center {
  width: 100%;
}
.chatting img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.sending{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  /*padding-right: 6px;*/
}
.right, .center{
  display: flex;
  align-items: center;
}
.chatting {
  padding: .3rem .3rem 1.2rem .3rem;
  background-color: #F0F0F0;
}
.text1, .text2 {
  display: flex;
  align-items: center;
  font-size: 15px;
  display: flex;
  flex-direction: column;
}
.text1 {
  margin-left: .22rem;
  margin-right: 2rem;
}
.text2 {
  margin-right: .15rem;
  margin-left: 2rem;
}
.horn1 {
  background-color: white;
  padding: .15rem .4rem;
  border-radius: .32rem;
}
.horn2 {
  background-color: #119CF7;
  padding: .15rem .4rem;
  border-radius: .32rem;
  color: white;
}
.send {
  background-color: #F0F0F0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: .2rem .2rem;
}
.input {
  flex:6;
  font-size: 16px;
  padding-left: .2rem;
}
.yuyin {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.yuyin img {
  width: 35px;
  height: 35px;
}
.button {
  flex: 1.2;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #CDCDCD;
  border-radius: 5px;
  font-size: 16px;
  color: white;
}
.isbg {
  background-color: #119df8;
}
.time {
  font-size: 12px;
  color: #A0A0A0;

  padding-bottom: .1rem;
}

</style>
