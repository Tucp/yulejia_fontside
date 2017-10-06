<template lang="html">
  <div class="container">
    <div class="interactive">
      <router-link to="/attention">
        <div class="attention">
          <p class="num">{{focus}}</p>
          <p class="name">关注</p>
        </div>
      </router-link>
      <router-link to="/fans">
        <div class="fans">
          <p class="num">{{this.beFocused}}</p>
          <p class="name">粉丝</p>
        </div>
      </router-link>
    </div>
    <div class="blank">
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        focus: '0',
        beFocused: '0'
      }
    },
    mounted() {
      let weuserid = this.checkLogin(false)
      this.$http({
        method: 'post',
        url: global.url+'/api/user',
        data: 'weuserid=' + weuserid,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then(res => {
        if (res.data.code == 1) {
          this.focus = res.data.data.focus
          this.beFocused = res.data.data.befocus
        } else if (res.data.code == -1) {
          this.focus = 0
          this.beFocused = 0
        }
      })
        .catch(e => {
          console.log(e)
        })
    }
  }

</script>

<style lang="css" scoped>
  .interactive {
    width: 100%;
    height: 1.66666667rem;
    display: flex;
  }

  .attention p:first-child {
    margin-top: 10px;
    color: black;
  }
  .attention{
    height: 100%;
    border-right: 1px solid #f0f0f0;
  }
  .fans p:first-child{
    margin-top: 10px;
    color: black;
  }

  .interactive a {
    flex: 1;
    text-align: center;
    font-size: .37037037rem;
    color: #898989;
  }

  .blank {
    height: .3240740741rem;
    background-color: #f0f0f0;
  }
</style>