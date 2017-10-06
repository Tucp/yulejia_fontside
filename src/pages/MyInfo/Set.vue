<template lang="html">
  <div class="set allbg header-item">
    <header-item title="设置"></header-item>
    <div class="set_list">
      <div class="set_list-item" v-for="item in sets" key="item.id">
        <router-link :to="item.path">
          <div>
            <p>{{item.name}}</p>
            <i></i>
          </div>
        </router-link>
      </div>
    </div>
    <div class="button">
      <button @click="logout">退出账号</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      sets: [
        { id: 0, path: '/set/bind', name: '绑定手机' },
        // { id: 1, path: '/set/check', name: '检查新版本' },
        { id: 2, path: '/set/contact', name: '联系客服' }
      ]
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('weuserid')
      Toast({
              message: '退出成功',
              position: 'middle',
              duration: 500
            });
            let that = this
            setTimeout(function () {
              that.$router.push('/main')
            }, 800)
        
        // this.$http({
        //   method:'post',
        //   data:'type=logout',
        //   url:'http://yulejia.pnnnc.com/api/user',
        //   header: {  
        //     "Content-Type": "application/x-www-form-urlencoded"  
        //   },  
        // }).then(res => {
        //   if (res.data.code === 1) {
        //     Toast({
        //       message: '退出成功',
        //       position: 'middle',
        //       duration: 500
        //     });
        //     let that = this
        //     setTimeout(function () {
        //       that.$router.push('/login')
        //     }, 800);
        //   }
        // })
    }
  }
}
</script>

<style lang="css" scoped>
.set_list-item div {
  height: 1.27777778rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .37037037rem;
}

.set_list-item p {
  font-size: .407407407rem;
  flex: 1;
}

.set_list-item i {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
}

.button {
  padding: 0 .37037037rem;
  padding-top: .740740741rem;
  background-color: #f0f0f0;
}

button {
  height: 1.11111111rem;
  width: 100%;
  background-color: #FCAC0D;
  border: 0;
  color: white;
  font-size: .407407407rem;
  border-radius: 5px;
}
</style>
