<template lang="html">
  <div class="comment">
    <div class="mask" v-show="mask" @click="hidden"></div>
    <div class="header">
      <span class="cancel" @click="back">取消</span>
      <span class="title">发表评论</span>
    </div>
    <div class="button" :class="{active: isActive}" @click="submit">提交</div>
    <textarea name="area" rows="8" cols="80" @change="oI" @keyup.8="del" @focus="oF" @blur="oB" style="font-size:14px" class="area" id="area"
    placeholder="说说水情,鱼情,鱼获情况..." @input="changeCheckBtnActive()"
    v-model="inputContent" ref="text"></textarea>
    <div class="jInput" v-html="`${inputContent}<div style=width:1px;height:20px;background-color:#000;animation-name:ss;animation-duration:1.3s;animation-iteration-count:infinite;display:none;vertical-align:text-bottom class=ss></div>`"></div>
    <div class="addpic">
      <Vupload></Vupload>
    </div>
    <div class="bar"></div>
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

    <transition name="slide-bottom">
      <div v-show="isShowEmoji" class="emoji-display">
        <ul>
          <li @click="insertText(item.code)" v-for="(item,index) of emojis">
            <img :src="'static/emoji/'+item.file" :data="item.code">
          </li>
        </ul>
      </div>
    </transition>
    <div class="talk">
      <img src="static/images/smile.png" alt="smile" @click="showEmoji">
    </div>


    <div ref="point" v-show="showPoint" class="point"></div>
  </div>
</template>

<script>
import Vupload from './upload.vue'
import { Toast } from 'mint-ui';
export default {
  components: {
    Vupload
  },
  data() {
    return {
      inputContent: '',
      yes: true,
      Tab: '',
      isActive: false,
      show: false,
      mask: false,
      comment: '',
      showPoint: false,
      isShowEmoji: false,
      inputT: '',
      wz: '',
       emojis: [
        { file: '100.gif', code: '/::)', title: '微笑',reg:/\/::\)/g },
        { file: '101.gif', code: '/::~', title: '伤心',reg:/\/::~/g },
        { file: '102.gif', code: '/::B', title: '美女',reg:/\/::B/g },
        { file: '103.gif', code: '/::|', title: '发呆',reg:/\/::\|/g },
        { file: '104.gif', code: '/:8-)', title: '墨镜',reg:/\/:8-\)/g },
        { file: '105.gif', code: '/::<', title: '哭',reg:/\/::</g },
        { file: '106.gif', code: '/::$', title: '羞',reg:/\/::\$/g },
        { file: '107.gif', code: '/::X', title: '哑',reg:/\/::X/g },
        { file: '108.gif', code: '/::Z', title: '睡',reg:/\/::Z/g },
        { file: '109.gif', code: '/::\'(', title: '哭',reg:/\/::'\(/g },
        { file: '110.gif', code: '/::-|', title: '囧',reg:/\/::-\|/g },
        { file: '111.gif', code: '/::@', title: '怒',reg:/\/::@/g },
        { file: '112.gif', code: '/::P', title: '调皮',reg:/\/::P/g },
        { file: '113.gif', code: '/::D', title: '笑',reg:/\/::D/g },
        { file: '114.gif', code: '/::O', title: '惊讶',reg:/\/::O/g },
        { file: '115.gif', code: '/::(', title: '难过',reg:/\/::\(/g },
        { file: '116.gif', code: '/::+', title: '酷',reg:/\/::\+/g },
        { file: '117.gif', code: '/:--b', title: '汗',reg:/\/:--b/g },
        { file: '118.gif', code: '/::Q', title: '抓狂',reg:/\/::Q/g },
        { file: '119.gif', code: '/::T', title: '吐',reg:/\/::T/g },
        { file: '120.gif', code: '/:,@P', title: '笑',reg:/\/:,@P/g },
        { file: '121.gif', code: '/:,@-D', title: '快乐',reg:/\/:,@-D/g },
        { file: '122.gif', code: '/::d', title: '奇',reg:/\/::d/g },
        { file: '123.gif', code: '/:,@o', title: '傲' ,reg:/\/:,@o/g},
        { file: '124.gif', code: '/::g', title: '饿',reg:/\/::g/g },
        { file: '125.gif', code: '/:|-)', title: '累' ,reg:/\/:\|-\)/g},
        { file: '126.gif', code: '/::!', title: '吓',reg:/\/::!/g },
        { file: '127.gif', code: '/::L', title: '汗',reg:/\/::L/g },
        { file: '128.gif', code: '/::>', title: '高兴',reg:/\/::>/g },
        { file: '129.gif', code: '/::,@', title: '闲',reg:/\/::,@/g },
        { file: '130.gif', code: '/:,@f', title: '努力',reg:/\/:,@f/g },
        { file: '131.gif', code: '/::-S', title: '骂',reg:/\/::-S/g },
        { file: '133.gif', code: '/:,@x', title: '秘密',reg:/\/:,@x/g },
        { file: '134.gif', code: '/:,@@', title: '乱',reg:/\/:,@@/g },
        { file: '135.gif', code: '/::8', title: '疯',reg:/\/::8/g },
        { file: '136.gif', code: '/:,@!', title: '哀',reg:/\/:,@!/g },
        { file: '137.gif', code: '/:!!!', title: '鬼',reg:/\/:!!!/g },
        { file: '138.gif', code: '/:xx', title: '打击',reg:/\/:xx/g },
        { file: '139.gif', code: '/:bye', title: 'bye',reg:/\/:bye/g },
        { file: '142.gif', code: '/:handclap', title: '鼓掌',reg:/\/:handclap/g },
        { file: '145.gif', code: '/:<@', title: '什么',reg:/\/:<@/g },
        { file: '147.gif', code: '/::-O', title: '累',reg:/\/::-O/g },
        { file: '153.gif', code: '/:@x', title: '吓',reg:/\/:@x/g },
        { file: '155.gif', code: '/:pd', title: '刀',reg:/\/:pd/g },
        { file: '156.gif', code: '/:<W>', title: '水果',reg:/\/:<W>/g },
        { file: '157.gif', code: '/:beer', title: '酒',reg:/\/:beer/g },
        { file: '158.gif', code: '/:basketb', title: '篮球',reg:/\/:basketb/g },
        { file: '159.gif', code: '/:oo', title: '乒乓',reg:/\/:oo/g },
        { file: '195.gif', code: '/:circle', title: '跳舞',reg:/\/:circle/g },
        { file: '160.gif', code: '/:coffee', title: '咖啡',reg:/\/:coffee/g }
     ]
    }
  },
  mounted() {
    this.checkLogin()
    this.$store.commit('selectLi', '')
    this.$store.commit('selectPhoto', [])
    this.$store.commit('selectRemove', [])
  },
  computed: {
    cityName() {
      return this.$store.state.selector.cityName
    },
    longitude() {
      return this.$store.state.selector.longitude
    },
    latitude() {
      return this.$store.state.selector.latitude
    },
    photo() {
      return this.$store.state.photo.photo
    },
    remove() {
      return this.$store.state.photo.remove
    }
  },
  methods: {
    del() {
      if(this.inputContent.lastIndexOf('/') + 1 == this.inputContent.length) {
        if(this.inputContent.includes('<')) {
          this.inputContent = this.inputContent.substring(0,this.inputContent.lastIndexOf('<')) 
        }
      }
      document.querySelector('.ss').style.display = 'inline-block';
    },
    oF() {
      document.querySelector('.ss').style.display = 'inline-block';
      this.isShowEmoji = false
    },
    oB() {
      document.querySelector('.ss').style.display = 'none';
    },
    oI() {
      document.querySelector('.ss').style.display = 'inline-block';
    },
    getFocus() {
      setTimeout(() => {
        document.querySelector('.area').focus()
      },0)
      console.log(document.activeElement.className)
    },
    insertText (str) {
      this.inputContent += str
      console.log(this.inputContent )
      if (this.inputContent == '') {
        this.isActive = false
      } else {
        this.isActive = true
      }
      if (this.inputContent !== '') {
        if(this.inputContent.includes('/:')) {
          for(var i=0;i<this.emojis.length;i++){            
            this.inputContent = this.inputContent.replace(this.emojis[i].reg, '<img src="static/emoji/' + this.emojis[i].file +'"  alt="" style="vertical-align: middle; width: 24px; height: 24px" />');
          }   
      }
      } 
    },
    showEmoji () {
      this.isShowEmoji=!this.isShowEmoji
      if(this.isShowEmoji == false) {
        this.$refs.text.focus()
      } else {
        this.$refs.text.blur()
      }
    },
    toDiao() {
      this.$router.push('/select')
    },
    submit() {
      this.getData()
    },
    getData() {
      let weuserid = this.checkLogin()
      let objid = this.$route.params.objid
      let cateid = this.$route.params.cateid
      this.comment = this.inputContent
      this.$http({
        method:'post',
        data:'action=add&address='+this.city+'&objid='+objid+'&cate_id='+cateid+'&content='+this.comment+'&photo='+this.photo+'&remove='+this.remove+'&weuserid='+weuserid,
        url:global.url+'/api/comments',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          this.$store.commit('clear')
          if (res.data.code == 1) {
            this.showPoint = true
            this.$refs.point.innerHTML = '发布成功'
            setTimeout(() => {
              this.showPoint = false
            }, 500)
            setTimeout(() => {
              this.$router.go(-1)
            }, 600)
          } else if (res.data.code == 0) {
            Toast({
              message: '请登录',
              position: 'middle',
              duration: 1000
            })
            var that = this
            setTimeout(() => {
              that.$router.push('/login')
            }, 1100)
          }else{
            Toast({
              message: '评论内容不能为空',
              position: 'middle',
              duration: 1000
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    select(type) {
      this.Tab = type
    },
    changeCheckBtnActive() {
      if(this.inputContent.length >= 1) {
        document.querySelector('.area').style.fontSize = '0px'
      } else {
        document.querySelector('.area').style.fontSize = '14px'
      }
      document.querySelector('.ss').style.display = 'inline-block';
      this.wz = this.inputContent.lastIndexOf('>')
      let tel = document.querySelector('.area').value
      if (tel != '') {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    back() {
      let tel = document.querySelector('.area').value
      if (tel != '') {
        this.show = true
        this.mask = true
        this.isShowEmoji = false
      } else {
        this.show = false
        this.mask = false
        this.$router.go(-1)
      }
    },
    cancel() {
      this.show = false
      this.mask = false
      this.$router.go(-1)
    },
    conserver() {
      this.show = false
      this.mask = false
      this.$router.go(-1)
    },
    hidden() {
      this.show = false
      this.mask = false
      this.choosepic = false
    }
  }
}
</script>

<style lang="css" scoped>
.jInput{
  display: block;
  width: 100%;
  height: 5.333333rem;
  padding: 0 0.266667rem;
  font-size: 16px;
  vertical-align: middle;
  overflow-y: scroll;
}
.jInput .ss{
  width: 1px;
  height: 20px;
  background-color: #000;
  animation: ss 1.3s infinite;
}
@keyframes ss {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.msg {
  font-size: 14px;
}

.comment {
  position: relative;
  width: 100%;
  height: 100%;
}

.header {
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
  font-size: 14px;
}

.title {
  flex: 1.7;
}

.button {
  text-align: center;
  line-height: 1rem;
  font-size: 14px;
  position: absolute;
  width: 2rem;
  height: 1rem;
  top: .3rem;
  right: .3rem;
  border-radius: 3px;
  /*opacity: .6;*/
  border: 1px solid #DCDDDD;
  overflow: hidden;
  color: #898989;
}

.area {
  position: absolute;
  top: 1.53rem;
  width: 100%;
  word-wrap: break-word;
  border: none;
  height: 5rem;
  /*font-size: 0;*/
  /*padding-top: .3rem;*/
  /*margin-left: .4rem;*/
  padding: 0 0.2666667rem;
  text-indent: -999999999px;
  opacity: 0;
  resize: none;
}

.local {
  width: 100%;
  display: flex;
  /*justify-content: center;*/
  align-items: center;
  margin-top: .05rem;
  /*margin-left: .5rem;*/
  font-size: 17px;
  /*width: 3.1rem;*/
  height: 1.15rem;
  background-color: #fff;
  padding-left: .4rem;
}

img {
  width: .5rem;
  height: .5rem;
}

.posiCity {
  /*opacity: .5;*/
  font-size: 14px;
  color: #898989;
  padding-left: .2rem;
  white-space: nowrap;
}

.addpic {
  width: 100%;
}

.pic {
  position: relative;
  width: 30%;
  height: 3rem;
  margin-left: .5rem;
  text-align: center;
  line-height: 3rem;
  border: 2px solid #F0F0F0;
  opacity: .8;
}

.pic::after {
  content: '';
  position: absolute;
  top: 1.35rem;
  right: 10%;
  width: 80%;
  height: .1rem;
  background-color: #DCDDDD;
}

.pic::before {
  content: '';
  position: absolute;
  left: 1.45rem;
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

.subfish,
.subtalk {
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
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
  margin-right: .2rem;
  border: 1px solid #898989;
}

.gou {
  width: .2rem;
  height: .1rem;
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
  border: 1px solid #119df8;
}

.active {
  background-color: #F39800;
  color: #fff;
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
  filter: alpha(Opacity=60);
  -moz-opacity: 0.6;
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

.a,
.b {
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

.point {
  position: fixed;
  width: 3rem;
  height: 2rem;
  top: 35%;
  left: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #808080;
  color: #fff;
  font-size: 0.373333rem;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
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
.talk {
  bottom: 0;
  height: 1.6rem;
  padding: .3rem .4rem;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  left: 0;
  z-index: 999999;
  background-color: white;
  border-top: 1px solid #F0F0F0;

}
.talk > img {
  width: 1rem;
  height: 100%;
}
</style>
