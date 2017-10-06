<template lang="html">
  <div class="aboutfish">
    <aboutfish-item :datas="datas"></aboutfish-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: []
    }
  },
  mounted () {
  let weuserid = this.checkLogin(false)
  this.$http({
      method:'post',
      data:'type=collect_yuediao&weuserid='+weuserid,
      url:global.url+'/api/user',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
      console.log(res.data.data.data)
      this.datas = res.data.data.data
    })
  }
}
</script>

<style lang="css">
</style>
