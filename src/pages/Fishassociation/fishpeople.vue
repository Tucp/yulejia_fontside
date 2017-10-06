<template lang="html">
  <div class="fishpeople">
    <header-item title="江西省钓鱼协会会员列表"></header-item>
    <div class="group">
      <div class="person_msg" v-for="item in member" v-if="item.job_sort === 1">
        <img :src="imgSrc+ item.photo" alt="" class="imgs">
        <span class="name">{{item.title}}</span>
        <span class="identity">{{item.job}}</span>
      </div>
    </div>
    <div class="bar"></div>
    <div class="group">
      <div class="person_msg" v-for="item in member" v-if="item.job_sort === 2">
        <img :src="imgSrc+ item.photo" alt="" class="imgs">
        <span class="name">{{item.title}}</span>
        <span class="identity">{{item.job}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      member: [],
      imgSrc: global.imgSrc
    }
  },
  mounted () {
    this.$http({
        method:'post',
        data:'cate_id='+this.$route.params.id,
        url:global.url+'/api/diaoxie',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.member = res.data.data.numbers
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.fishpeople {
  margin-top: 1.5rem;
}
.group {
  width: 100%;
}

.imgs {
  width: 100%;
  height: 100%;
}
.name {
  /*padding-top: .1rem;*/
  font-size: 16px;
  display: block;
  text-align: center;
}
.identity {
  font-size: 14px;
  display: block;
  text-align: center;
  color: #A9D4FB;
}
.spread {
  margin-bottom: .4rem;
}
.person_msg {
  display: inline-block;
  margin-left: .4rem;
  width: 25%;
  padding: .2rem .12rem;
  border-radius: 14px;
  margin-top: .2rem;
}
.bar {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
}
</style>
