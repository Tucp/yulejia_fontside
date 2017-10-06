<template lang="html">
  <div class="racereport header-item">
    <header-item title="赛事报道"></header-item>
    <img src="static/images/share.png">
    <div class="title">
      {{data.report_title}}
    </div>
    <div class="time">
      {{data.report_time}}
    </div>
      <div class="content" v-html="data.report">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      share: false,
      mask: false,
      isClicked: false,
      data: []
    }
  },
  mounted () {
    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'id='+this.$route.params.id+'&action=get_report&weuserid='+weuserid,
        url:global.url+'/api/race',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.data = res.data.data.data
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    shareW () {
      let url = 'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js'
        let script = document.createElement('script')
        script.setAttribute('src', url)
        document.getElementsByTagName('head')[0].appendChild(script)
    },
    Share () {
      this.share = !this.share
      this.mask = !this.mask
    },
    hidden () {
      this.mask = false
      this.share = false
    },
    star () {
      this.isClicked = !this.isClicked
      if (this.isClicked === true) {
        console.log('已关注')
      } else {
        console.log('取消关注')
      }
    }
  }
}
</script>

<style lang="css" scoped>
.racereport {
  padding: .462962963rem .425925926rem 0 .425925926rem;
}
.racereport > img {
  width: .5rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .4rem;
  right: .4rem;
}
.racereport .title {
  font-size: 16px;
  line-height: 30px;
  margin-bottom: .2777777778rem;
}
.racereport .cover {
  margin-top: .7rem;
  height: 5.5555556rem;
  width: 100%;
  overflow: hidden;
}
.racereport .cover img {
  height: 100%;
  width: 100%;
}
.racereport .content {
  margin-top: .44444444rem;
  font-size: 14px;
  line-height: 30px;
}
</style>
