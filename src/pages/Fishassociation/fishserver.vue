<template lang="html">
  <div class="fishserver">
    <header-item title="江西省钓协服务站"></header-item>
    <div class="server">
      <div class="fish"v-for="item in server">
        <div class="padd">
          <img src="static/images/list01.jpg" alt="" class="pic">
          <div class="fishname">{{item.name 

}}</div>
          <div class="tel" @click="callphone(item.tel 

)"> <img src="static/images/telephone.jpg" alt="" class="telpic"> {{item.tel 

}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      server: []
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
        this.server = res.data.data.server
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    callphone (type) {
      window.location.href = 'tel:' + type
    },
  }
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.fishserver {
  margin-top: 1.5rem;
  font-size: 15px;
  margin: 1.5rem .4rem 0 .4rem;
}
.server {
  margin-right: .4rem;
  margin-left: .4rem;
  margin-top: .4rem;
  margin-bottom: .8rem;
}
.fish:nth-child(2n-1) {
  margin-right: .8rem;
}
.fish {
  padding-bottom: .5rem;
  width: 45%;
  display: inline-block;
  position: relative;
}
.padd {
  border: 1px solid #EDEEEE;

}
.pic {
  width: 100%;
}
.fishname, .tel {
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  font-size: 14px;
}
.tel {
  margin-bottom: .4rem;
}
.phone {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  background-color: #119DF8;
  bottom: .225rem;
  left: .7rem;
  border-radius: 16px;
}
.images {
  line-height: .5rem;
  display: flex;
  align-items: center;
}
.telpic {
  margin-right: .2rem;
  width: .4rem;
  color: white;
}
.dianhua {
  line-height: .65rem;
  color: white;
}
</style>
