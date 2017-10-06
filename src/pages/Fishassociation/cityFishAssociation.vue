<template lang="html">
  <div class="fishassociation">
      <div class="addfishfield" @click="sign" v-show="isShowAdd">
        <p class="a">
          +
          <p class="text">申请会员</p>
        </p>
      </div>
    <header-item title="江西省钓鱼协会会员中心" path="/fishassociation"></header-item>
    <h1>{{name}}钓协信息</h1>
    <div class="title" v-html="message">
        {{message}}
    </div>
    <div class="bar" v-if="member.length != 0"></div>
    <div class="group" v-if="member.length != 0">
      <div class="member">
        <span class="member_msg">{{name}}钓协成员</span>
        <router-link to="/fishpeople"><span class="member_other" @click="FdisplayDetail(num)">查看更多<div class="other"></div></span></router-link>
      </div>
      <div class="member_pic">
        <div class="person_msg" v-for="item in member">
          <img :src="imgSrc+ item.photo" class="imgs" alt="暂无图片">
          <span class="name">{{item.title}}</span>
          <span class="identity">{{item.job}}</span>
        </div>
      </div>
    </div>
    <div class="bar" v-show="showX"  v-if="child.length != 0"></div>
    <div class="group"  v-if="child.length != 0">
      <div class="member" v-show="showX">
        <span class="member_msg">{{name}}地方钓鱼协会</span>
        <router-link to="/organization"><span class="member_other" @click="OdisplayDetail(num)">查看更多 <div class="other"></div></span></router-link>
      </div>
      <div class="spread">
        <div class="spread_item" v-for="item in child" @click.stop.prevent="replace(item.id)">{{item.name}}</div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="group">
      <div class="member">
        <span class="member_msg">{{name}}钓协服务站</span>
        <router-link to="/fishserver"><span class="member_other" @click="SdisplayDetail(num)">查看更多 <div class="other"></div></span></router-link>
      </div>
      <div class="server">
        <div class="fish" v-for="item in server">
          <div class="padd">
            <img src="static/images/list01.jpg" alt="" class="pic">
            <div class="fishname">{{item.name}}</div>
            <div class="tel" @click="callphone(item.tel)"> <img src="../../../static/images/telephone.jpg" alt="" class="telpic">{{item.tel}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: [],
      member: [],
      child: [],
      server: [],
      name: '',
      num: this.$route.params.id,
      isShowAdd: true,
      isLogin: '',
      imgSrc: global.imgSrc
    }
  },
  mounted() {
    let p = 0,
      t = 0
    window.addEventListener('scroll', () => {
      // 默认相对滚动条顶部的偏移
      p = document.body.scrollTop
      // 上滚
      if (t <= p) {
        this.isShowAdd = false
      }
      // 下滚
      else {
        this.isShowAdd = true
      }

      setTimeout(() => {
        t = p
      }, 0)
    })

    this.$http({
        method:'post',
        data:'cate_id='+this.$route.params.id,
        url:global.url+'/api/diaoxie',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.message = res.data.data.diaoxie.description
        this.name = res.data.data.diaoxie.name
        this.member = res.data.data.numbers
        this.child = res.data.data.child
        this.server = res.data.data.server
        this.tel = res.data.data.server
        this.isLogin = res.data.code
      })
      .catch(e => {
        console.log(e)
      })
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    showX() {
      return this.$store.state.selectCity.showX
    }
  },
  watch: {
    id: function(val,newVal) {

      this.$http({
        method:'post',
        data:'cate_id='+this.$route.params.id,
        url:global.url+'/api/diaoxie',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.message = res.data.data.diaoxie.description
        this.name = res.data.data.diaoxie.name
        this.member = res.data.data.numbers
        this.child = res.data.data.child
        this.server = res.data.data.server
        this.tel = res.data.data.server
      })
      .catch(e => {
        console.log(e)
      })
    },
    name: function(val,newVal) {
      if(val.indexOf('县') > -1) {
        this.$store.commit('changeShowX', false)
      }
    }
  },
  methods: {
    sign() {
      alert(1)
      this.checkLogin()
      if (this.isLogin == 1) {
        this.$router.push('/membership')
      } else if (this.isLogin == 0) {
        this.$router.push({
          path: '/login',
          query: { redirect: '/membership' }
        })
      }
    },
    callphone(type) {
      window.location.href = 'tel:' + type
    },
    replace(type) {
      this.$router.push({name: 'cityFishAssociation',params: {'id': type}})

      this.$http({
        method:'post',
        data:'cate_id='+this.$route.params.id,
        url:global.url+'/api/diaoxie',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.message = res.data.data.diaoxie.description
          this.name = res.data.data.diaoxie.name
          this.member = res.data.data.numbers
          this.child = res.data.data.child
          this.server = res.data.data.server
          this.tel = res.data.data.server
      })
      .catch(e => {
        console.log(e)
      })
    },
    OdisplayDetail(type) {
      this.$router.push({
        name: 'Organization', params: { id: type }
      })
    },
    FdisplayDetail(type) {
      this.$router.push({
        name: 'fishpeople', params: { id: type }
      })
    },
    SdisplayDetail(type) {
      this.$router.push({
        name: 'fishserver', params: { id: type }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.addfishfield {
  width: 1.8rem;
  height: 1.8rem;
  position: fixed;
  z-index: 999;
  right: .45rem;
  bottom: 1.6rem;
  color: #fff;
  background-color: #119df8;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 15px 5px rgb(99, 191, 250);
  box-shadow: 0 0 15px 5px rgb(99, 191, 250);
  overflow: hidden;
}

.addfishfield>p {
  font-size: 25px;
  text-align: left;
  height: .8rem;
  text-align: center;
  overflow: hidden;
  /*line-height: .7rem;*/
}

.addfishfield .text {
  font-size: 14px;
  /*transform: scale(.8);*/
  text-align: center;
}

h1 {
  margin: 1.8rem .4rem .4rem .4rem;
  font-size: 16px;
}

.title {
  margin: .3rem .4rem;
  font-size: 14px;
  opacity: .5;
}

.bar {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
}

.member {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0 .4rem;
  font-size: 16px;
  line-height: 1.2rem;
  border-bottom: 1px solid #F0F0F0;
}

.other {
  position: absolute;
  right: .3rem;
  top: .45rem;
  width: .3rem;
  height: .3rem;
  border-top: 1px solid #808080;
  transform: rotate(45deg);
  border-right: 1px solid #808080;
}

.member_other {
  padding-right: .8rem;
  opacity: .5;
  font-size: 14px;
}

.group {
  width: 100%;
}

.member_pic {
  width: auto;
  white-space: nowrap;
  overflow-x: auto;
}

.person_msg {
  margin: .3rem .3rem;
  width: 100px;
  height: 5.333333rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: inline-block;
}

.imgs {
  display: block;
  width: 100%;
  height: 3.413333rem;
}

.name {
  display: block;
  text-align: center;
  padding-top: .4rem;
  font-size: 15px;
}

.identity {
  display: block;
  color: #119df8;
  font-size: 14px;
  text-align: center;
}

.spread {
  margin-bottom: .4rem;
  padding: 0 .3rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.spread_item {
  width: 18%;
  margin-right: .33rem;
  border: 1px solid #EDEEEE;
  padding: .2rem .12rem;
  border-radius: 14px;
  margin-top: .4rem;
  color: #119df8;
  text-align: center;
}

.server {
  margin-right: .4rem;
  margin-left: .4rem;
  margin-top: .4rem;
  margin-bottom: .8rem;
}
.fish:nth-child(2n-1) {
  margin-right: .8rem;
}
.fish {
  padding-bottom: .5rem;
  width: 45%;
  display: inline-block;
  position: relative;
}
.padd {
  border: 1px solid #EDEEEE;

}
.pic {
  width: 100%;
}
.fishname, .tel {
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  font-size: 14px;
}
.tel {
  margin-bottom: .4rem;
}
.phone {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  background-color: #119DF8;
  bottom: .225rem;
  left: .7rem;
  border-radius: 16px;
}
.images {
  line-height: .5rem;
  display: flex;
  align-items: center;
}
.telpic {
  margin-right: .2rem;
  width: .4rem;
  color: white;
}
.dianhua {
  line-height: .65rem;
  color: white;
}
.member_msg {
  font-size: 15px;
}
</style>
