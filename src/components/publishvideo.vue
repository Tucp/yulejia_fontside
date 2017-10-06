<template lang="html">
  <div class="comment">
    <div class="mask" v-show="mask" @click="hidden"></div>
    <div class="header_item">
      <span class="cancel" @click="back">取消</span>
      <span class="title">发布视频</span>
    </div>
    <div class="button" :class="{active: isActive}">发布</div>
    <div class="content">
      <textarea name="name" rows="8" cols="80" class="area" id="area" placeholder="谈谈这一刻的想法..." ref="textarea" v-model="inputContent" @input="changeCheckBtnActive()"></textarea>
      <div class="addpic" @click="choose">
        <div class="pic"></div>
      </div>
    </div>

    <div class="local">
      <img src="static/images/city.png" alt="" class="imgs">
      <p class="posiCity">所在位置</p>
      <div class="spread"></div>
    </div>

    <div class="show" v-show="show">
      <div class="sure">
        是否保存草稿
      </div>
      <div class="option">
        <div class="a" @click="cancel">取消</div>
        <div class="b" @click="conserver">保存</div>
      </div>
    </div>

    <transition name="slide-bottom">
      <div v-show="isShowEmoji" class="emoji-display">
        <ul>
          <li @click="insertText(item)" v-for="item of emojis">{{item}}</li>
        </ul>
      </div>
    </transition>

    <div class="talk">
      <img src="static/images/smile.png" alt="smile" @click="showEmoji">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputContent: '',
      yes: true,
      Tab: 'nselct',
      isActive: false,
      show: false,
      mask: false,
      isShowEmoji: false,
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳']
    }
  },
  methods: {
    insertText (str) {
      str = str + ``
      const oTextarea = this.$refs.textarea
      oTextarea.value += str
      if (oTextarea.value != '') {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    showEmoji () {
      this.isShowEmoji=!this.isShowEmoji
    },
    select (type) {
      this.Tab = type
    },
    changeCheckBtnActive () {
      let tel = document.querySelector('.area').value.trim()
      if (tel != '') {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    back () {
      let tel = document.querySelector('.area').value
      if (tel != '') {
        this.show = true
        this.mask = true
      } else {
        this.show = false
        this.mask = false
        this.$router.go(-1)
      }
    },
    cancel () {
      this.show = false
      this.mask = false
      this.$router.go(-1)
    },
    conserver () {
      this.show = false
      this.mask = false
      this.$router.go(-1)
    },
    choose () {
      this.choosepic = true
      this.mask = true
    },
    hidden () {
      this.show = false
      this.mask = false
      this.choosepic = false
    }
  }
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.comment {
  position: relative;
  height: 100vh;
  background-color: #F0F0F0;
  width: 100%;
}
.header_item {
  position: relative;
  width: 100%;
  height: 1.53rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #F0F0F0;
  font-size: 16px;
  color: #3e3a39;
}
.cancel {
  flex: 1;
  padding-left: .5rem;
}
.title {
  flex: 1.7;
}
.button {
  text-align: center;
  line-height: .8rem;
  font-size: 16px;
  position: absolute;
  width: 1.8rem;
  color: #808080;
  top: .4rem;
  right: .3rem;
  border-radius: 3px;
  border: 1px solid #DCDDDD;
}
.content {
  background-color: white;
}
.area {
  background-color: white;
  width: 100%;
  word-wrap: break-word;
  height: 6rem;
  border: none;
  font-size: 14px;
  padding: .3rem .3rem;
  color: #BABABB;
}

.addpic {
  border: none;
  width: 100%;
  height: 3rem;
  background-color: white;
}
.pic {
  position: relative;
  margin-top: .1rem;
  width: 25%;
  height: 2.5rem;
  margin-left: .5rem;
  text-align: center;
  line-height: 3rem;
  border: 2px solid #F0F0F0;
}
.pic::after {
  content: '';
  position: absolute;
  top: 1.2rem;
  right: 10%;
  width: 80%;
  height: .1rem;
  background-color: #DCDDDD;
}
.pic::before {
  content: '';
  position: absolute;
  left: 1.2rem;
  top: 10%;
  width: .1rem;
  height: 80%;
  background-color: #DCDDDD;
}
.bar {
  margin-top: .4rem;
  width: 100%;
  height: .4rem;
  background-color: #F0F0F0;
}
.submit {
  width: 100%;
  height: 1rem;
  /*background-color: green;*/
  display: flex;
  align-items: center;
}
.subfish, .subtalk {
  flex: 1;
  font-size: 16px;
  display: flex;
}
.subtalk {
  padding-left: .4rem;
}
.subfish {
  margin-left: .4rem;
}
.other {
  flex: 2;
}
.select {
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  margin-right: .2rem;
  border: 1px solid #EFEFEF;
}
.gou {
  width: .35rem;
  height: .2rem;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  margin-top: .1rem;
  margin-left: .08rem;
}
.banner {
  width: 100%;
  height: 100%;
  background-color: #F0F0F0;
}
.isSelect {
  background-color: #119DF8;
  border: none;
}
.active {
  background-color: #F39800;
  color: white;
}
.show {
  position: fixed;
  width: 8rem;
  height: 5rem;
  top: 6.3rem;
  left: 1rem;
  border-radius: 10px;
  background-color: white;
  z-index: 100;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #808080;
  filter:alpha(Opacity=60);
  -moz-opacity:0.6;
  opacity: 0.6;
  overflow-y: hidden;
  z-index: 99;
}
.sure {
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid #F0F0F0;
}
.option {
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.a, .b{
  flex: 1;
  text-align: center;
  font-size: 20px;
}
.b {
  color: #47ABF9;
  border-left: 1px solid #F0F0F0;
}
.choosepic {
  position: fixed;
  width: 8rem;
  height: 3.3rem;
  top: 7.5rem;
  left: 1rem;
  border-radius: 10px;
  background-color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sec {
  width: 100%;
  flex: 1;
  font-size: 20px;
  line-height: 1.65rem;
  text-align: center;
}
.album {
  border-top: 1px solid #F0F0F0;
}
.talk {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.6rem;
  border-top: 2px solid #dcdddd;
  padding: .3rem .4rem;
  display: flex;
  align-items: center;
  background-color: #F0F0F0;
  z-index: 9999;
}
.talk > img {
  width: 1rem;
  height: 100%;
}

.slide-bottom-enter-active {
  transition: all .3s ease;
}
.slide-bottom-leave-active {
  transition: all .2s ease;
}
.slide-bottom-enter, .slide-bottom-leave-active {
  transform: translateX(-130px);
  opacity: 0;
}
.emoji-display {
  position: fixed;
  width: 100%;
  height: 6.5rem;
  bottom: 1.6rem;
  background-color: white;
  left: 0;
  z-index: 9999;
  border-top: 1px solid #F0F0F0;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
li {
  padding: .1rem .15rem;
  font-size: 22.5px;
}
.local {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: .3rem;
  padding-left: .4rem;
  font-size: 17px;
  height: 1.3rem;
  background-color: #fff;
  /*padding-left: .4rem;*/
}
img {
  width: .5rem;
  height: .5rem;
}
.posiCity {
  font-size: 12px;
  padding-left: .2rem;
  white-space:nowrap;
}
.imgs {
  padding-left: .01rem;
}
.spread {
  position: absolute;
  right: .4rem;
  width: .4rem;
  height: .4rem;
  border-left: 1px solid #808080;
  border-bottom: 1px solid #808080;
  transform: rotate(225deg);
}
</style>
