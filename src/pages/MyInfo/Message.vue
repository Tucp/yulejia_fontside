<template lang="html">
  <div class="message allbg header-item">
    <header-item title="消息" path="/my"></header-item>
    <div class="message_list">
      <div class="message_list-item">
        <!-- <router-link to="/message/messagelist">
          <div>
            <p>我的私信</p>
            <i v-show=""></i>
          </div>
        </router-link> -->
        <router-link to="/message/reply">
          <div>
            <p>回复我的</p>
            <i v-show="comments !== 0"></i>
          </div>
        </router-link>
        <router-link to="/message/parise">
          <div>
            <p>我获得的赞</p>
            <i v-show="zan !== 0"></i>
          </div>
        </router-link>
        <router-link to="/message/aboutfish">
          <div>
            <p>约钓通知</p>
            <i v-show=""></i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: 0,
      zan: 0
    }
  },
  mounted () {
    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'type=message&weuserid='+weuserid,
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          this.comments = res.data.data.comments
          this.zan = res.data.data.zan
        }
      })
  }
}
</script>

<style lang="css" scoped>
.message_list-item div {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .37037037rem;
  font-size: .425925926rem;
  height: 1.25925926rem;
  background-color: #fff;
  /*border-bottom: 1px solid #f0f0f0;*/
}
.message_list-item p {
  flex: 1;
}
.message_list-item i {
  display: block;
  width: .203703704rem;
  height: .203703704rem;
  background-color: #e60012;
  border-radius: 50%;
}
</style>
