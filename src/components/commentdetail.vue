<template>
  <div class="container header-item">
    <div class="det-comments">
      <header-item title="评价详情"></header-item>
      <div class="c-Info">
        <div class="userAvatar avatar">
          <img v-lazy="imgSrc+obj.headimg"
          v-if="obj.headimg.indexOf('http') === -1" >
          <img v-lazy="obj.headimg" v-else>
        </div>
        <div class="userInfo">
          <p class="userName">{{obj.nickname}}</p>
          <div class="position">
            <span class="time">{{obj.create_time}}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="words">
          <span v-html="obj.content"></span>
        </div>
        <div class="list pic" v-for="(n, index) in obj.photo" :data-index="index" :key="n.id">
          <img v-if="n.indexOf('http') === -1" @click="open(index)" v-lazy="imgSrc+n">
           <img v-lazy="item" v-else>
        </div>
      </div>
    </div>
    <div class="black"></div>
    <div class="all-assess">
      <div class="title" v-if="replys.length !== 0">
        <img src="static/images/evaluation.jpg">
        <p>全部评论 ({{replys.length}})</p>
      </div>
      <div class="title" v-else>
        暂无人回复
      </div>
      <mu-list>
         <div class="assess" v-for="(item, index) in replys" :key="item.id">
        <div class="avatar assess-avatar">
          <img v-if="item.headimg.indexOf('http') === -1" v-lazy="imgSrc+item.headimg">
          <img v-lazy="item.headimg" v-else>
        </div>
        <div class="wrapper">
          <p class="name">{{item.nickname}}</p>
          <div class="position">
            <span class="time">{{item.create_time}}</span>
            <div class="city">
              <img src="static/images/city.png" class="lab" v-if="item.address">
              <p class="posiCity">{{item.address}}</p>
            </div>
          </div>
          <p class="content" v-html="item.content"></p>
          <div class="options" @click="praiseP(item, index)">
            <img :src="praise[index].is_zan ? 'static/images/bzabed.png' : 'static/images/bzan.png' " class="like_img">
            <span class="like_content" :class="{active: praise[index].is_zan}">
              点赞({{item.zan}})</span>
          </div>
        </div>
      </div>
      </mu-list>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
    <div class="btn" v-show="!isComment">
      <div @click="showComment">
        <img src="static/images/btalk.png" class="bcomment">
        评论
      </div>
      <div @click="praiseLZ" :class="{active: isPraise}">
        <img :src="isPraise ? 'static/images/bzaned.png' :
        'static/images/bzan.png'" class="praise">
        点赞
      </div>
    </div>
    <transition name="slide-bottom">
      <div v-show="isShowEmoji" class="emoji-display">
        <ul>
          <li @click="insertText(item.code)" v-for="(item,index) of emojis" :key="item.id">
            <img :src="'static/emoji/'+item.file" :data="item.code">
          </li>
        </ul>
      </div>
    </transition>
    <div class="comment_btn" v-show="isComment">
      <input type="search" placeholder="回复楼主" ref="text" v-model="comment" @keyup.enter="send(obj.userid, obj.id)" @input="log" v-focus>
      <img src="static/images/smile.png" @click="showEmoji">
      <button :disabled="!isActive" :class="{active: isActive}"
      @click="send(obj.userid, obj.id)">发送</button>
    </div>
    <div class="showImg" v-show="isShowImg" @click="gb">
      <img :src="showImg" class="sfImg">
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      imgSrc: global.imgSrc,
      praise: [],
      praiseCateid: null,
      count: 0,
      scroller: null,
      loading: false,
      comment: '',
      isPraise: false,
      isActive: false,
      num: 12,
      obj: {},
      replys: [],
      cateid: null,
      objid: null,
      imageList: [],
      isComment: this.$store.state.isComment,
      isShowEmoji: false,
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
     ],
     showImg: '',
     isShowImg: false,
     isPraise: this.$route.params.is_zan
    }
  },
  methods: {
    loadMore () {
      const totalNum = this.count
      const pageNum = Math.floor(totalNum / this.pagesize) + 1
      if (this.page < pageNum) {
        this.loading = true
        setTimeout(() => {
          this.page++
            
          this.$http({
              method:'post',
              data:'id='+this.$route.params.id+'&page='+this.page+'&pagesize='+this.pagesize,
              url:global.url+'/api/comments',
              header: {  
                "Content-Type": "application/x-www-form-urlencoded"  
              },  
            }).then(res => {
              if (res.data.code === 1) {
                res.data.data.replys(data => {
                  this.replys.push(data)
                })
              }
            })
            .catch(e => {
              console.log(e)
            })
          this.loading = false
        }, 2000)
      }
    },
    gb(ev) {
      this.isShowImg = false
    },
    showEmoji () {
      this.isShowEmoji=!this.isShowEmoji
      if(this.isShowEmoji == false) {
        this.$refs.text.focus()
      } else {
        this.$refs.text.blur()
      }
    },
    insertText (str) {
      this.comment += str
      console.log(this.inputContent )
      if (this.inputContent == '') {
        this.isActive = false
      } else {
        this.isActive = true
      }
    },
    praiseP (item, index) {
      let weuserid = this.checkLogin(false)

      this.$http({
        method:'post',
        data:'action=add&cate_id='+this.praiseCateid+'&objid='+item.id+'&weuserid='+weuserid,
        url:global.url+'/api/zan',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          if (res.data.code === 0) {
            Toast({
              message: '请登录',
              position: 'middle',
              duration: '1500'
            })
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000)          
          }
          if (res.data.code === 1) {
            item.zan++
            this.praise[index].is_zan = true
          }
          if (res.data.code === 2) {
            item.zan--
            this.praise[index].is_zan = false
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    praiseLZ () {
      let weuserid = this.checkLogin(false)
      this.$http({
        method:'post',
        data:'action=add&objid='+this.obj.id+'&cate_id='+this.praiseCateid+'&weuserid='+weuserid,
        url:global.url+'/api/zan',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.$router.push('/login')
          }
          if (res.data.code === 1) {
            this.isPraise = true
          }
          if (res.data.code === 2) {
            this.isPraise = false
          }
        })
    },
    showComment () {
      this.isComment = !this.isComment
      this.log()
    },
    log () {
      // let text = this.$refs.text.value
      if (this.comment !== '') {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    send (userid, pid) {
      // this.comment = this.$refs.text.value
      if(this.comment.includes('/:')) {
          for(var i=0;i<this.emojis.length;i++){
              this.comment = this.comment.replace(this.emojis[i].reg, '<img src="static/emoji/' + this.emojis[i].file +'"  alt="" style="vertical-align: middle; width: 24px; height: 24px" />');
          }   
      }
      this.isShowEmoji = false
      let weuserid = this.checkLogin(false)
      this.$http({
        method:'post',
        data:'action=add&objid='+this.objid+'&cate_id='+this.cateid+'&touserid='+userid+'&pid='+pid+'&content='+this.comment+'&weuserid='+weuserid,
        url:global.url+'/api/comments',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          if (res.data.code === 0) {
            Toast({
              message: '登陆已失效',
              position: 'middle',
              duration: 1500
            });
            this.$router.push('/login')
          }
          if (res.data.code === 1) {
            this.getData()
            this.isComment = false
            this.$refs.text.value = ''
          }
        })
        .catch(e => {
          console.log(e)
        })
        this.comment = ''
    },
    getData () {
      let weuserid = this.checkLogin(false)
      let id = this.$route.params.id
      this.cateid = this.$route.params.cateid
      this.objid = this.$route.params.objid
        
      this.$http({
            method:'post',
            data:'id='+id+'&weuserid='+weuserid,
            url:global.url+'/api/comments',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res => {
          if (res.data.code === 1) {
            this.praise = res.data.data.data
            this.count = res.data.data.count
            this.obj = res.data.data.obj
            this.replys = res.data.data.replys
            this.praiseCateid = res.data.data.zan_part.id
            let allurl = res.data.data.obj.photo
            this.imageList = []
            for (var i = 0; i < allurl.length; i++) {
              this.imageList[i] = {
                url: this.imgSrc+allurl[i]
              }
            }
         }
        })
        .catch(e => {
          console.log(e)
        })
    },
    open (index) {
      this.showImg = `${this.imgSrc}${this.obj.photo[index]}`
      this.isShowImg = true
      var oBox=document.querySelector('.sfImg');
      oBox.style.transform= 'scale(1)';
    }
  },
  updated() {
   var that = this
   var startX = ''
   var startY = ''
   var endX = ''
   var endY = ''
   var oBox=document.querySelector('.sfImg');
   var oImg = document.querySelector('.showImg');
    var c=1;//先定义一个初始值
    oImg.addEventListener('touchstart',function (ev) {//手指点下
      startX = ev.touches[0].pageX
      startY = ev.touches[0].pageY
      var oldC=c;//把初始值放到oldC里面
     function getC(ev) {
      var x1=ev.targetTouches[0].pageX;
      var y1=ev.targetTouches[0].pageY;//两根手指缩放肯定需要两根手指，【0】第一根手指的Xy的坐标

      var x2=ev.targetTouches[1].pageX;//第二根手指的坐标
      var y2=ev.targetTouches[1].pageY;

      var a=x1-x2;//第一根手指的pageX-第二根手指的pageX，这样正好是一个之间三角形 得到两个直角边；
      var b=y1-y2;//同上
      return Math.sqrt(a*a+b*b)//已知两个直角边开平方得出 斜角边
     }
     if(ev.targetTouches.length==2){//判断是否是两根手指 是的话 把两根手指点上去的时候的 斜脚边的初始值 放到 downC里面
      var downC=getC(ev);
     }
     oImg.addEventListener('touchmove',function (ev) { //手指移动的时候
        endX = ev.touches[0].pageX
        endY = ev.touches[0].pageY
        if(Math.abs(startX - endX) > 0 && Math.abs(startY - endY) > 0) {
          console.log('hj')
          if(ev.targetTouches.length==2){//判断移动的时候是否是两根手指
         c=getC(ev)/downC + 0;//这个时候的getC(ev)是move时候的，用移动后的斜脚边的值除没移动的值加上他的初始值，
         oBox.style.transform='scale('+c+')';//通过scale----2D缩放转换
         oBox.style.transformOrigin = '50% 50%'
      }
        }

     })
    })
  },
  mounted () {
    this.scroller = this.$el
    this.getData()
  }
}
</script>

<style>
span.active {
  color: #119df8;    
}
.showImg{
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0,0,0);
  z-index: 999;
  overflow: scroll;
}
.showImg img{
  display: block;
  /*position: absolute;*/
  /*top: 50%;*/
  width: 100%;
  /*height: 5.333333rem;*/
  /*margin-top: -2.666667rem;*/
  max-height: 100%;
  /*transform: translate(-50%,-50%);*/
  background-size: cover;
}

.emoji-display {
  position: fixed;
  width: 100%;
  height: 4.8rem;
  bottom: 1.40740741rem;
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

/*图片预览样式 beginging*/
.view-wrapper ul{padding:0;display:-webkit-box;display:-ms-flexbox;display:flex;list-style-type:none;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.view-wrapper ul a{color:#000;text-decoration:none}.imageList{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}
.list[data-v-f90d8f86]{width:60px}.list img[data-v-f90d8f86]{width:100%}
.fancy-box-image-wrapper{top:0;right:0;left:0;position:fixed;width:100%;height:100%;z-index:33}.fancy-box-image-wrapper div{top:0;right:0;left:0;position:absolute;width:100%;height:100%;-webkit-transform-origin:left top 0;transform-origin:left top 0;-webkit-transition:-webkit-transform .3s cubic-bezier(0.4,0,0.22,1);transition:-webkit-transform .3s cubic-bezier(0.4,0,0.22,1);transition:transform .3s cubic-bezier(0.4,0,0.22,1);transition:transform .3s cubic-bezier(0.4,0,0.22,1),-webkit-transform .3s cubic-bezier(0.4,0,0.22,1)}.fancy-box-image-wrapper img{max-width:100%;max-height:100%;position: relative;top:50%;transform: translateY(-50%) translateX(-50%);left: 50%;}.fancy-box-mask{top:0;right:0;left:0;position:fixed;width:100%;height:100%;background-color:#333;z-index:22}.fancy-enter,.fancy-leave-active{opacity:0}.fancy-enter-active,.fancy-leave-active{-webkit-transition:.2s;transition:.2s}
.list[data-v-e4a994d2]{overflow:hidden;height:60px;width:60px;margin:30px 10px 0 0}
/*图片预览样式 ending*/

.comment_btn {
  padding-left: .44444444rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.comment_btn input {
  height: .833333333rem;
  width: 6.3rem;
  border: 1px solid #dcdddd;
  padding-left: .277777778rem;
}
.comment_btn img {
  width: .648148148rem;
  height: .648148148rem;
  margin-right: .277777778rem;
  margin-left: .277777778rem;
}
.comment_btn button {
  width: 1.53703704rem;
  height: .88888889rem;
  background-color: #dcdddd;
  border: 0;
  color: #fff;
  font-size: 14px;
  border-radius: 3px;
}
.comment_btn button.active {
  background-color: #119df8;
}
.btn, .comment_btn {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1.40740741rem;
  background-color: #f0f0f0;
}
.btn div {
  float: left;
  width: 50%;
  /*text-align: center;*/
  line-height: 1.40740741rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.btn .active {
  color: rgb(243,152,0);
}
.btn .bcomment {
  width: .44444444rem;
  height: .37037037rem;
  margin-right: .2rem;
}
.btn .praise {
  width: .33333333rem;
  height: .388888889rem;
  margin-right: .2rem;
}
.position {
  flex: 1;
  display: flex;
  align-items: center;
}
.city {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.time {
  margin-right: .277777778rem;
  font-size: 14px;
}
.posiCity {
  font-size: 14px;
  color: #898989;
}
.lab {
  width: .6rem;
  height: .5rem;
  opacity: .6;
}
.det-comments {
  /*width: 9.16666667rem;
  margin: 0 auto;*/
  padding: .37037037rem;
  background-color: #fff;
}
.c-Info {
  width: 100%;
  display: flex;
  font-size: 14px;
  overflow: hidden;
  align-items: center;
}
.avatar {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  height: 100%;
  width: 100%;
}
.c-Info .userInfo {
  margin-left: .27777778rem
}
.c-Info .userInfo p {
  line-height: 25px;
  font-size: 14px;
}
.c-Info .userInfo span {
  color: #898989;
  font-size: 14px;
}
.content .words {
  padding: .4rem 0;
  font-size: 14px;
  line-height: 25px;
}
.content .pic img {
  width: 100%;
  margin-bottom: .37037037rem;
}
.black {
  width: 100%;
  height: .27777778rem;
  background-color: #F0F0F0;
}
.all-assess {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1.8rem;
}
.all-assess .title {
  height: 1.2962963rem;
  line-height: 1.2962963rem;
  width: 10rem;
  /*border-bottom: 1px solid #F0F0F0;*/
  font-size: 14px;
  padding-left: .4rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.all-assess .title img {
  width: .6rem;
  height: .5rem;
  float: left;
  margin-right: .4rem;
}
.all-assess .assess {
  margin: 0 auto;
  padding: .4rem;
  /*border-bottom: 1px solid #F0F0F0;*/
  border-top: 1px solid #f0f0f0;
  display: flex;
}
.assess .wrapper {
  margin: 0 auto;
  margin-left: .27777778rem;
  font-size: 14px;
}
.assess .wrapper .time {
  color: #898989;
  /*margin-top: .2rem;*/
}
.assess .name {
  margin-bottom: .15rem;
}
.assess .wrapper .content {
  margin-top: .4rem;
  line-height: .60185185rem;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.options {
  /*width: 1.85185185rem;*/
  /*padding: .2rem;
  height: .64814815rem;
  border-radius: .5rem;
  border: 1px solid #F0F0F0;
  color:#898989;
  text-align: center;
  margin-left: 5.58rem;
  margin-top: .46296296rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;*/
  /*padding-left: .2rem;*/
  margin-top: .3rem;
  height: .8rem;
  /*width: 1.8rem;*/
  padding: 0 .3rem;
  border-radius: 1.2rem;
  border: 1px solid #f0f0f0;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  margin-left: 5rem;
}
.like_img {
  width: .3rem;
  height: .4rem;
  margin-right: .1rem;
}
</style>
