<template lang="html">
  <div class="container">
    <div class="comment">
      <div class="mask" v-show="mask" @click="hidden"></div>
      <div class="header_item">
        <span class="cancel" @click="back">取消</span>
        <span class="title">发表评论</span>
      </div>
      <div class="button" :class="{active: isActive}">提交</div>
      <textarea name="name" rows="8" cols="80" class="area" v-model="inputContent" ref="textarea" id="area" placeholder="说说水情,鱼情,鱼获情况..." @input="changeCheckBtnActive()"></textarea>
      <div class="local">
        <img src="static/images/city.png" alt="" class="imgs">
        <p class="posiCity">龙南县国际垂钓中心</p>
      </div>
      <div class="addpic">
        <div class="tupian" v-for="imgSrc in imgSrcList">
          <!-- <img src="static/images/list01.jpg" alt="" class="hhh">
          <span class="span" @click="hidden">X</span> -->
          <img ref="chooseImg" :src="imgSrc" style="width:100%;height:100%" alt="">
        </div>
        <div class="pic">
          <input id="fileId1" type="file" multiple="multiple" @change="showImg" accept="image/*" name="file" />
        </div>
      </div>
      <!-- <div class="bar"></div> -->
      <div class="banner"></div>

      <div class="show" v-show="show">
        <div class="sure">
          是否保存草稿
        </div>
        <div class="option">
          <div class="a" @click="cancel">取消</div>
          <div class="b" @click="conserver">保存</div>
        </div>
      </div>

<!--       <div class="choosepic" v-show="choosepic">
        <div class="photograph sec">拍照</div>
        <div class="album sec">从相册选择</div>
      </div> -->
      <transition name="slide-bottom">
        <div v-show="isShowEmoji" class="emoji-display">
          <ul>
            <li @click="insertText(item)" v-for="item of emojis">{{item}}</li>
          </ul>
        </div>
      </transition>
      <div class="talk">
        <img src="../../static/images/smile.png" alt="smile" @click="showEmoji">
      </div>
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
      emo: '',
      // choosepic: false,
      isShowEmoji: false,
      imgSrcList: [],
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳']
    }
  },
  methods: {
    // check () {
    //     this.isShowEmoji = false
    // },
    select (type) {
      this.Tab = type
    },
    showEmoji () {
      this.isShowEmoji=!this.isShowEmoji
      if(this.isShowEmoji == false) {
        this.$refs.textarea.focus()
      } else {
        this.$refs.textarea.blur()
      }
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
      // this.choosepic = true
      // this.mask = true
      this.isShowEmoji = false
    },
    hidden () {
      this.show = false
      this.mask = false
      // this.choosepic = false
    },
    insertText (str) {
      this.emo += str
      this.inputContent = this.emo
      if (this.inputContent == '') {
        this.isActive = false
      } else {
        this.isActive = true
      }
    },
    showImg() {
      for(var i = 0;i < document.querySelector('#fileId1').files.length;i++){
        this.imgSrcList.push(window.URL.createObjectURL(document.querySelector('#fileId1').files[i]))
      }
      // this.$refs.chooseImg.src = window.URL.createObjectURL(document.querySelector('#fileId1').files[0])
    }
  }
}
</script>
<style lang="css" scoped>
* {
  box-sizing: border-box;
}
input[type="file"]{
  opacity: 0;
  width: 100%;
  height: 2.5rem;
  margin-left: 0;
}
.tupian{
  margin-left: .5rem;
  position: relative;
  width: 26.5%;
  height: 2.5rem;
  text-align: center;
  line-height: 3rem;
  border: 2px solid #F0F0F0;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100vh;
  background-color: #F0F0F0;
}
.comment {
  position: relative;
  width: 100%;
  background-color: #fff;
}
.header_item {
  /*background-color: white;*/
  position: relative;
  width: 100%;
  height: 1.53rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #F0F0F0;
  font-size: 16px;
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
  top: .4rem;
  right: .3rem;
  border-radius: 3px;
  border: 1px solid #DCDDDD;
}
.area {
  width: 91.3%;
  word-wrap: break-word;
  border: none;
  height: 5.5rem;
  font-size: 14px;
  padding-top: .3rem;
  margin-left: .4rem;
  opacity: .5;
}
.local {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: .05rem;
  margin-left: .4rem;
  font-size: 17px;
  width: 6rem;
  height: 1.15rem;
  background-color: #fff;
}
img {
  width: .5rem;
  height: .5rem;
}
.posiCity {
  font-size: 12px;
  opacity: .5;
  padding-left: .2rem;
  white-space:nowrap;
}
.imgs {
  padding-left: .01rem;
}
.addpic {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.pic {
  position: relative;
  width: 26.5%;
  height: 2.5rem;
  text-align: center;
  line-height: 3rem;
  border: 2px solid #F0F0F0;
  opacity: .4;
  overflow: hidden;
  margin-left: .5rem;
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
  margin-top: .5rem;
  /*background-color: #F0F0F0;*/
}
.isSelect {
  background-color: #119DF8;
  border: none;
}
.active {
  background-color: #F39800;
  color: white;
  border: none;
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
  border-top: 1px solid #dcdddd;
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
  height: 4.8rem;
  bottom: 1.6rem;
  background-color: white;
  left: 0;
  overflow-y: auto;
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
</style>
