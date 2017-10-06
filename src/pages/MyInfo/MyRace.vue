<template lang="html">
  <div class="myrace header-item allbg">
    <header-item title="我的赛事"></header-item>
    <race-item :race="race"></race-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      race: []
    }
  },
  mounted () {
    let weuserid = this.checkLogin()
    this.$http({
      method:'post',
      data:'type=race&weuserid='+weuserid,
      url:global.url+'/api/user',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
      this.race = res.data.data.data
    })
  }
}
</script>

<style lang="css">
</style>