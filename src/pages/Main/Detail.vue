<template lang="html">
  <div class="aboutfishingdetail header-item">
    <div class="mask_div" v-show="mask" @click="hidden"></div>
    <header-item title="约钓详情"></header-item>
    <div class="point">
      <div class="point-item">
      </div>
    </div>
    <transition name="slide-bottom">
      <div class="share" v-show="share">
        <div v-if="share_show" class="weixin sshare" @click="shareFriend"><img src="static/images/weixin.png" alt="" class="weixin picc"><span>微信</span></div>
        <div v-if="share_show" class="firend sshare" @click="shareTimeline"><img src="static/images/friendzone.png" alt="" class="friend picc"><span>朋友圈</span></div>
        <div class="qq sshare" @click.stop="star" ><img :src="collected ? 'static/images/collB.png' : 'static/images/collA.png' " class="qq picc"><span class="qq_right">收藏</span></div>
        <div class="qqzone sshare" @click="goReport(detail.id, detail.ureport.id)"><img src="static/images/jubao.png" class="qqz picc"><span class="zone">举报</span></div>
      </div>
    </transition>
    <img src="static/images/more.png" @click="Share" class="startA">
    <div class="main">
      <div class="title">
        <img v-lazy="this.img_url+detail.headimg"
        v-if="(detail.headimg).indexOf('http') === -1">
        <img v-lazy="detail.headimg" v-else>
        <div>
          <p class="nick">{{detail.nickname}}</p>
          <!-- <img src="static/images/money.png"> -->
          <p class="time">{{detail.update_time}}</p>
        </div>
        <img @click="applyUser"
        :src="this.isFocus ? 'static/images/myattention.png' : 'static/images/attentionme.jpg'">
      </div>
      <div class="intro" v-html="detail.content">
      </div>

      <div class="img" v-for="(item, index) in detail.photo">
        <img v-lazy="'http://ylj.tscce.cn/uploads/images/'+item" @click="open(index)">
      </div>

      <div class="information">
        <div class="tel">
          <img src="static/images/telephone.jpg">
          <p @click="callphone(detail)"><span>电话：</span>{{detail.tel}}</p>
        </div>
        <div class="time">
          <img src="static/images/time.jpg">
          <p><span>时间：</span>{{detail.fishing_time}} {{detail.week}}</p>
        </div>
        <div class="location">
          <img src="static/images/location.jpg">
          <a @click.prevent.stop='goMap(detail.address, detail.address, detail.latitude, detail.longitude)'>
            <p><span>地点：</span>{{detail.diaochang}}</p>
          </a>
        </div>
      </div>
    </div>
    <div class="apply">
      <div class="text" id="text" :class="{active: isActive}" @click="applyAboutFish" ref="sign" v-if="this.$store.getters.sign === false">
        报名
      </div>
      <div class="text" id="text" :class="{active: isActive}" ref="sign" v-else>
        已报
      </div>
      <div class="simg">
        <img v-lazy="item.photo"  v-for="item in detail.sign" class="imag">
      </div>
      <p @click="displayDetail(detail.id)" v-if="length !== 0">{{length}}人已报名</p>
      <p v-else>暂无人报名</p>
      <i></i>
    </div>
    <div class="comment_list">
      <mu-list>
        <comment-item :comments="comments" :objid="objid" :cateid="cateid"></comment-item>
      </mu-list>     
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>  
    <div class="footer" @click="goComment(objid, cateid)">
      <div>
        发表评论
      </div>
    </div>
    <div class="showImg" v-show="isShowImg" @click="gb">
      <img :src="showImg" class="sfImg">
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      share_show: false,
      img_url: global.imgSrc,
      detail: {},
      length: 0,
      comments: [],
      isActive: false,
      status: null,
      isAttened: false,
      userid: null,
      cateid: null,
      objid: null,
      isClicked: false,
      share: false,
      mask: false,
      Clicked: true,
      isLogin: '',
      isFocus: '',
      collected: null,
      collectCateid: null,
      scroller: null,
      loading: false,
      page: 1,
      pagesize: 10,
      list: '渔乐家',
      lists: '渔乐家' + window.location.href,
      url: window.location.href,
      showImg: '',
      isShowImg: false
    }
  },
  methods: {
    goMap(name, addr, lat, lng) {
      this.$router.push({
        name: 'navMap', params: { name: name, addr: addr, lat: lat, lng: lng }
      })
    },
    gb(ev) {
      this.isShowImg = false
    },
    open (index) {
      this.showImg = `http://yulejia.pnnnc.com/uploads/images/${this.detail.photo[index]}`
      this.isShowImg = true
      var oBox=document.querySelector('.sfImg');
      oBox.style.transform= 'scale(1)';
    },
    shareFriend(){
      try{
          /*Sharefriend   枚举 1 为好友  2为朋友圈
            type：        枚举  1 为普通分享 

            webpageUrl:   分享跳转链接 
            title:        分享标题 
            description： 分享描述
          */
          window.settings.friendsSharetypeUrlToptitleDescript(1, 1, this.url, this.news.title, this.news.description)
       }catch(e){
               
      }
    },
    shareTimeline(){
      try{
          /*Sharefriend   枚举 1 为好友  2为朋友圈
            type：        枚举  1 为普通分享 

            webpageUrl:   分享跳转链接 
            title:        分享标题 
            description： 分享描述
          */
          window.settings.friendsSharetypeUrlToptitleDescript(2, 1, this.url, this.news.title, this.news.description)
       
       }catch(e){
               
      }
    },
    loadMore () {
      const totalNum = this.comments.count
      const pageNum = Math.floor(totalNum / this.pagesize) + 1
      if (this.page < pageNum) {
        this.loading = true
        setTimeout(() => {
          this.page++
          let weuserid = this.checkLogin(false)
          this.$http({
            method:'post',
            data:'objid='+this.objid+'&cate_id='+this.cateid+'&page='+this.page+'&pagesize='+this.pagesize+'&weuserid='+weuserid,
            url:global.url+'/api/comments',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res => {
              if (res.data.code === 1) {
                res.data.data.data.forEach(data => {
                  this.comments.data.push(data)
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
    goReport (objid, cateid) {
        let weuserid = this.checkLogin(false)
        this.$http({
          method:'post',
          data: 'weuserid='+weuserid,
          url:global.url+'/api/user',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code === 1) {
            this.$router.push({
              name: 'report', params: { objid: objid, cateid: cateid }
            })
          } else {
            this.$router.push('/login')
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    callphone(item) {
      window.location.href = 'tel:' + item.tel
    },
    star() {
        let weuserid = this.checkLogin(false)
        this.$http({
          method:'post',
          data:'objid='+this.objid+'&cate_id='+this.collectCateid+'&action=add&weuserid='+weuserid,
          url:global.url+'/api/focus',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code === 0) {
            this.$router.push('/login')
          }
          if (res.data.code === 1) {
            this.collected = true
          }
          if (res.data.code === 2) {
            this.collected = false
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    Share() {
      this.share = !this.share
      this.mask = !this.mask
      document.removeEventListener("touchmove", function (e) {
        e.preventDefault()
      }, false)
    },
    displayDetail(id) {
      this.$router.push({
        name: 'applyed', params: { id: id }
      })
    },
    goComment(objid, cateid) {
      if (this.isLogin === 1) {
        this.$router.push({
          name: 'comment', params: { objid: objid, cateid: cateid }
        })
      } else if (this.isLogin === 0) {
        this.$router.push({
          name: '/login',
          query: { redirect: '/comment' + '/' + objid + '/' + cateid }
        })
      }
      // }

    },
    applyUser() {
      let id = this.$route.params.id
      let weuserid = this.checkLogin(false)
        this.$http({
          method:'post',
          data:'objid='+this.userid+'&cate_id='+this.usercateid+'&action=add&weuserid='+weuserid,
          url:global.url+'/api/focus',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code === 0) {
            Toast({
              message: '登录已失效',
              position: 'middle',
              duration: 1000
            });
            var that = this
            setTimeout(function () {
              that.$router.push('/login')
            }, 1100);
          }
          if (this.isFocus == true) {
            this.isFocus = false
          }
          else if (this.isFocus == false) {
            this.isFocus = true
          }
        })
    },
    applyAboutFish() {
      this.isActive = true
      this.$nextTick(function () {
        let id = this.$route.params.id
          let weuserid = this.checkLogin(false)
          this.$http({
            method:'post',
            data:'id='+this.$route.params.id+'&weuserid='+weuserid,
            url:global.url+'/api/yuediao',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res => {
            this.$store.commit('sign', res.data.data.is_sign)
            if (res.data.data.is_sign === true) {
              this.isActive = true
            }
            if (res.data.code === 1) {
              // console.log(res.data.data)
              this.detail = res.data.data
              this.objid = res.data.data.id
              this.content = res.data.data.content.replace(/<\[^>]*>/g, "")
              this.length = res.data.data.sign.length
              this.userid = res.data.data.userid
              this.usercateid = res.data.data.focus.id
              this.cateid = res.data.data.comments.id
            }
          })
          .then(res => {
              let weuserid = this.checkLogin(false)
              this.$http({
                method:'post',
                data:'objid='+this.objid+'&cate_id='+this.cateid+'&weuserid='+weuserid,
                url:global.url+'/api/comments',
                header: {  
                  "Content-Type": "application/x-www-form-urlencoded"  
                },  
              }).then(res => {
                if (res.data.code === -1) {
                  this.comments = []
                }
                if (res.data.code === 1) {
                  this.comments = res.data.data
                }
              })
          })
          .catch(e => {
            console.log(e)
          })
      });
      let id = this.$route.params.id
      let weuserid = this.checkLogin(false)
      this.$http({
          method:'post',
          data:'objid='+id+'&action=sign&weuserid='+weuserid,
          url:global.url+'/api/yuediao',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code === 1) {
            this.$refs.sign.innerText = '已报'
            this.isActive = true
          }
          if (res.data.code === 0) {
            this.$router.push('/login')
          }
        })
    },
    hidden() {
      this.share = false
      this.mask = false
    }
  },
  computed: {
    isApplyed() {
      this.$store.state.isApplyed
    }
  },
  mounted() {
    if (window.settings) {
      // app内的分享按钮
      this.share_show = true
    }

    this.scroller = this.$el
    let id = this.$route.params.id
    let weuserid = this.checkLogin(false)
    this.$http({
        method:'post',
        data:'id='+this.$route.params.id+'&weuserid='+weuserid,
        url:global.url+'/api/yuediao',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        this.isFocus = res.data.data.focus.status
        this.isLogin = res.data.code
        this.$store.commit('sign', res.data.data.is_sign)
        if (res.data.data.is_sign === true) {
          this.isActive = true
        }
        if (res.data.code === 1) {
          this.detail = res.data.data
          this.objid = res.data.data.id
          this.collected = res.data.data.collect.collect
          this.collectCateid = res.data.data.collect.id
          this.length = res.data.data.sign.length
          this.userid = res.data.data.userid
          this.usercateid = res.data.data.focus.id
          this.cateid = res.data.data.comments.id
        }
      })
      .then(res => {
        let weuserid = this.checkLogin(false)
        this.$http({
          method:'post',
          data:'objid='+this.objid+'&cate_id='+this.cateid+'&weuserid='+weuserid,
          url:global.url+'/api/comments',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
            if (res.data.code === -1) {
              this.comments = []
            }
            if (res.data.code === 1) {
              this.comments = res.data.data
            }
          })
      })
      .catch(e => {
        console.log(e)
      })
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


    // var that = this
    // var c=1;//先定义一个初始值
    // var oBox=document.querySelector('.sfImg');
    // var oImg = document.querySelector('.showImg');
    // console.log(oImg)
    // console.log(oBox)
    // oImg.addEventListener('touchstart',function (ev) {//手指点下
    //  var oldC=c;//把初始值放到oldC里面
    //  function getC(ev) {
    //   var x1=ev.targetTouches[0].pageX;
    //   var y1=ev.targetTouches[0].pageY;//两根手指缩放肯定需要两根手指，【0】第一根手指的Xy的坐标

    //   var x2=ev.targetTouches[1].pageX;//第二根手指的坐标
    //   var y2=ev.targetTouches[1].pageY;

    //   var a=x1-x2;//第一根手指的pageX-第二根手指的pageX，这样正好是一个之间三角形 得到两个直角边；
    //   var b=y1-y2;//同上
    //   return Math.sqrt(a*a+b*b)//已知两个直角边开平方得出 斜角边
    //  }
    //  if(ev.targetTouches.length==2){//判断是否是两根手指 是的话 把两根手指点上去的时候的 斜脚边的初始值 放到 downC里面
    //   var downC=getC(ev);
    //  }
    //  oImg.addEventListener('touchmove',function (ev) { //手指移动的时候
    //   if(ev.targetTouches.length==2){//判断移动的时候是否是两根手指
    //    c=getC(ev)/downC+oldC;//这个时候的getC(ev)是move时候的，用移动后的斜脚边的值除没移动的值加上他的初始值，
    //    oBox.style.transform='scale('+c+')';//通过scale----2D缩放转换
    //   }

    //  },false)
    // },false)
  }
}
</script>

<style lang="css" scoped>
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
.comment_list {
  margin-bottom: 1.2rem;
}
.aboutfishingdetail .footer div {
  height: 1.33333333rem;
  background-color: rgb(243, 152, 0);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  line-height: 1.33333333rem;
  font-size: 14px;
  color: #fff;
}

.aboutfishingdetail .main {
  padding: 0 .416666667rem;
}

.aboutfishingdetail .title {
  padding-top: .44444444rem;
  /*height: 1.2962963rem;*/
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  font-size: 14px;
  align-items: center;
}

.aboutfishingdetail .title img:first-child {
  width: 1.2962963rem;
  height: 1.2962963rem;
  border-radius: 50%;
  margin-right: .268518519rem;
}

.aboutfishingdetail .title div {
  flex: 1;
  overflow: hidden;
}

.aboutfishingdetail .title .nick img {
  margin-left: .5rem;
  width: 60px;
  height: 25px;
  margin-top: 10px;
}

.aboutfishingdetail .title div p {
  line-height: .601851852rem;
}

.aboutfishingdetail .title div p:last-child {
  color: #898989;
}

.aboutfishingdetail .title img:last-child {
  width: .674074074rem;
  height: .674074074rem;
}

.aboutfishingdetail .intro {
  margin-top: .462962963rem;
  margin-bottom: .462962963rem;
  font-size: 14px;
  line-height: 25px;
}

.aboutfishingdetail .img {
  /*height: 4.62962963rem;*/
  overflow: hidden;
  margin-bottom: .44444444rem;
}

.aboutfishingdetail .img img {
  width: 100%;
  height: 100%;
}

.aboutfishingdetail .information div {
  /*display: -webkit-flex;
  display: -ms-flex;
  display: flex;*/
  /*align-items: center;*/
  margin-bottom: .462962963rem;
  font-size: 14px;
}

.aboutfishingdetail .information div p span {
  color: #898989;
}

.aboutfishingdetail .information .tel p {
  color: #f6b567;
}

.aboutfishingdetail .information img {
  width: .37037037rem;
  height: .37037037rem;
  float: left;
  margin-right: .185185185rem;
  margin-top: .1rem;
}

.aboutfishingdetail .apply {
  border-top: 1px solid #f0f0f0;
  border-bottom: .277777778rem solid #f0f0f0;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  /*height: 1.2962963rem;*/
  height: 1.6rem;
  padding: 0 .416666667rem;
}

.aboutfishingdetail .apply .simg {
  width: 5.2rem;
  overflow: hidden;
  height: .925925926rem;
}

.aboutfishingdetail .apply img {
  width: .925925926rem;
  height: .925925926rem;
  border-radius: 50%;
  margin-right: .1rem;
}

.aboutfishingdetail .apply .text {
  width: .925925926rem;
  height: .925925926rem;
  border: 1px solid rgb(243, 152, 0);
  border-radius: 50%;
  text-align: center;
  line-height: .925925926rem;
  color: rgb(243, 152, 0);
  margin-right: .5rem;
  overflow: hidden;
}

.aboutfishingdetail .apply .text.active {
  background-color: #808080;
  border: 1px solid #808080;
  color: #fff;
}

.aboutfishingdetail .apply p {
  color: #898989;
  margin-left: .2rem;
}

.aboutfishingdetail .apply i {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
  margin-left: .1rem;
}

.slide-bottom-enter-active {
  transition: all .3s ease;
}

.slide-bottom-leave-active {
  transition: all .25s ease-out;
}

.slide-bottom-enter,
.slide-bottom-leave-active {
  transform: translateY(-180px);
  opacity: 0;
}

.share {
  padding-left: .2rem;
  padding-right: .2rem;
  padding-top: 1.55185185rem;
  padding-bottom: .2rem;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.sshare {
  width: 20%;
  margin-bottom: .3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.picc {
  width: 1.2rem;
  height: 1.2rem;
  flex: 2;
}

span {
  flex: 1;
  margin-top: .1rem;
  padding-left: .15rem;
  letter-spacing: .03rem;
}

.qq_right {
  padding-left: .25rem;
}

.startA {
  width: .5rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .4rem;
  right: .4rem;
}

.mask_div {
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

a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
