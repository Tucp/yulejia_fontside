<template lang="html">
  <div class="apply">
    <race-item tip="截止报名" bgc="rgb(246,70,72)" :race="race"></race-item>
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
    this.$http({
        method:'post',
        url:global.url+'/api/race',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code === 1) {
            this.race = res.data.data.data
          }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.apply {
  margin-top: 1.31481481rem;
}
</style>
