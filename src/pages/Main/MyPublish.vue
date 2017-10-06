<template lang="html">
  <div class="mypublish">
    <mu-list>
      <aboutfish-item :datas="datas"></aboutfish-item>
    </mu-list>             
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: [],
      scroller: null,
      loading: false,
      page: 1,
      pagesize: 10
    }
  },
  methods: {
    loadMore () {
      const totalNum = this.datas.length
      const pageNum = Math.floor(totalNum / this.pagesize) + 1
      if (this.page < pageNum) {
        this.loading = true
        setTimeout(() => {
          this.page++
          let weuserid  = this.checkLogin(false)
          this.$http({
                method:'post',
                data:'page='+this.page+'&user=self&pagesize='+this.pagesize+'&weuserid='+weuserid,
                url:global.url+'/api/yuediao',
                header: {  
                  "Content-Type": "application/x-www-form-urlencoded"  
                },  
              }).then(res=>{
                if (res.data.code === 1) {
                  res.data.data.forEach(data => {
                    this.datas.push(data)
                  })
                }
              })
              .catch(e => {
                console.log(e)
              })

          this.loading = false
        }, 2000)        
      }
    }
  },
  mounted () {
    this.scroller = this.$el
    let weuserid  = this.checkLogin(false)
    this.$http({
        method:'post',
        data:'&user=self&weuserid='+weuserid,
        url:global.url+'/api/yuediao',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code === 0) {
          this.$router.push('/login')
        }
        if (res.data.code === 1) {
          this.datas = res.data.data
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.mypublish {
  margin-top: 4.2rem;
  margin-bottom: 1.4rem;
}
</style>
