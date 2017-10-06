<template lang="html">
  <div class="banner">
    <mt-swipe :auto="8000" :speed="1000">
      <mt-swipe-item v-for="data in banners" key="data.id">
        <a :href="data.url"><img v-lazy="data.photo"></a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners: []
    }
  },
  mounted () {
      this.$http({
        method:'post',
        data:'type=banner',
        url:global.url+'/api/getinfo',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code === 1) {
          let head = global.imgSrc
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].photo = head + res.data.data[i].photo
          }
          this.banners = res.data.data
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
@import '../assets/style/banner.css';
</style>
