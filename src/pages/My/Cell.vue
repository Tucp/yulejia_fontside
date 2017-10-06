<template lang="html">
  <div class="cell">
    <div class="cell-item">
      <router-link to="/myfishfield">
        <div>
          <img src="static/images/fish.png">
          <p>我的钓场<span v-show="isShow">有最新的鱼讯啦！</span></p>
          <i :class="{myfishfield: isShow}"></i>
        </div>
      </router-link>
    </div>
    <div class="cell-item" v-for="item in cells" :key="item.id">
      <router-link :to="item.path">
        <div>
          <img :src="item.src">
          <p>{{item.name}}</p>
          <i></i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      cells: [
        { id: 0, src: 'static/images/race.png', name: '我的赛事', path: '/myrace' },
        { id: 1, src: 'static/images/collection.png', name: '我的收藏', path: '/mycollection' },
        // { id: 2, src: 'static/images/draft.png', name: '草稿箱', path: '/draft' },
        { id: 3, src: 'static/images/sets.png', name: '设置', path: '/set' }
      ],
      isShow: false
    }
  },
  methods: {
    show () {
      Toast({
        message: '开发中...',
        position: 'middle',
        duration: 1500
      })
    }
  },
  mounted () {
    let weuserid = this.checkLogin(false)
    this.$http({
        method:'post',
        url:global.url+'/api/user',
        data:'weuserid='+weuserid,
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code === 0) {
          // Toast({
          //   message: '请登录',
          //   position: 'middle',
          //   duration: 1500
          // })
        }
        if (res.data.code === 1) {
          this.isShow = res.data.data.message
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.cell-item div {
  height: 1.296296296rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.cell-item img {
  width: .56296296rem;
  height: .56296296rem;
  margin: 0 .277777778rem 0 .4259259259rem;
}
.cell-item p {
  flex: 1;
  font-size: 14px;
}
.cell-item span {
  font-size: 12px;
  color: #898989;
  margin-left: .5rem;
}
.cell-item i {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
  margin-right: .3977777778rem;
}
.cell-item i.myfishfield {
  border: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: red;
}
.cell-item:nth-child(odd) {
  border-bottom: 1px solid #f0f0f0;
}
.cell-item:nth-child(even) {
  border-bottom: .3240740741rem solid #f0f0f0;
}
.cell {
  margin-bottom: 1.4rem;
  border-bottom: .3240740741rem solid #f0f0f0;
}
</style>
