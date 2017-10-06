<template lang="html">
  <div class="attention header-item">
    <header-item title="关注列表" path="/my"></header-item>
    <div>
      <div class="item" v-for="item in attentionLists" :key="item.id" @click="displayDetail(item.userid, item.focus ,item.befocus, item.headimg, item.nickname)">
        <div class="avatar">
          <img :src="item.headimg" class="avatarimg" v-if="item.headimg.indexOf('http')>=0">
          <img :src="imgSrc+item.headimg" class="avatarimg" v-else>
          <img src="static/images/male.jpg" class="sex" v-if="item.sex === 1">
          <img src="static/images/female.jpg" class="sex" v-else-if="item.sex===2">
        </div>
        <div class="info">
          <p>{{item.nickname}}</p>
          <p><span>关注 {{item.focus}}</span><span>粉丝 {{item.befocus}}</span></p>
        </div>
        <div class="relationship" @click.prevent.stop="unfollow(item.userid)">
          <img src="static/images/myattention.png">
        </div>
      </div>
      <div class="confirm-box" v-if="display == true" @click="register()">
      </div>
      <transition name="fade">
        <div class="alert" v-if="display == true">
          <div class="headerT">
            <p class="title">提示</p>
          </div>
          <div class="tips">
            <p class="question">确定不再关注吗?</p>
          </div>
          <div class="alert_options">
            <span class="return" @click="register()">取消</span>
            <span class="confirm" @click="reduce(delid)">确定</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="nomore">
      没有更多了 ...
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        attentionLists: '',
        cate_id: '',
        display: false,
        delid: '',
        imgSrc: global.imgSrc
      }
    },
    methods: {
      displayDetail(id, focus, befocus, headimg, nickname) {
        this.$router.push({
          name: 'person', params: { id: id, focus: focus, befocus:befocus, headimg:headimg, nickname:nickname }
        })
      },
      register() {
        this.display = false;
      },
      reduce(id) {
        let weuserid = this.checkLogin()
        this.$http({
            method:'post',
            data:'action=add&cate_id='+this.cate_id+'&objid='+id+'&weuserid='+weuserid,
            url:global.url+'/api/focus',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res => {
            if (res.data.code == '-1') {
              MessageBox('提示', '取消失败');
            } else if (res.data.code == '2') {
              var arr = this.attentionLists;
              console.log(arr[0].userid);
              let delId = id;
              for (let i = arr.length - 1; i >= 0; i--) {
                if (arr[i].userid == delId) {
                  arr.splice(i, 1);
                  this.attentionLists = arr;
                }
              }
            }
          })
        this.display = false;
      },
      unfollow(id) {
        this.display = true;
        this.delid = id;
      }
    },
    mounted() {
      let weuserid = this.checkLogin()
      this.$http({
          method:'post',
          data:'type=focus&weuserid='+weuserid,
          url:global.url+'/api/user',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code == '1') {
            this.attentionLists = res.data.data.data;
            this.cate_id = res.data.data.focus_cate_id;
          } else if (res.data.code == '0') {
             this.$router.push({
            path: '/login',
            query: { redirect: '/attention' }
          })
          } else {
            console.log('error')
          }
        }).catch(error => {
          console.log(errorss)
        })
    }
  }

</script>

<style lang="css" scoped>
  .item {
    height: 1.85185185rem;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    padding: 0 .407407407rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .item .avatar {
    position: relative;
    height: 1.2962963rem;
    width: 1.2962963rem;
    overflow: hidden;
  }

  .item .avatar .avatarimg {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }

  .item .avatar .sex {
    position: absolute;
    width: .37037037rem;
    height: .37037037rem;
    right: 0;
    bottom: 0;
    border-radius: 50%;
  }

  .item .info {
    flex: 1;
    margin-left: .259259259rem;
  }

  .item .info p {
    line-height: .574074074rem;
  }

  .item .info p:first-child {
    font-size: .407407407rem;
  }

  .item .info span {
    color: #898989;
    margin-right: .462962963rem;
    font-size: .351851852rem;
  }

  .item .relationship img {
    height: .574074074rem;
    width: .574074074rem;
  }

  .nomore {
    height: 1.2962963rem;
    width: 100%;
    background-color: #f0f0f0;
    text-align: center;
    line-height: 1.2962963rem;
    color: #898989;
    font-size: .296296296rem;
  }

  .confirm-box {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #000;
    opacity: .5;
    left: 0;
    top: 0;
    z-index: 999;
  }

  .alert {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 80%;
    height: 24%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .headerT {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-weight: bold;
  }
  .tips {
    flex: 1;
  }
  .alert_options {
    flex: 1;
    width: 100%;
    border-top: 1px solid #CCCCCC;
    display: flex;
  }
  .return, .confirm {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .return {
    border-right: 1px solid #CCCCCC;
  }
  .confirm {
    color: #119df8;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: transform .4s
  }

  .fade-enter,
  .fade-leave-active {
    transform: translate3d(100%,0,0);
  }
</style>
