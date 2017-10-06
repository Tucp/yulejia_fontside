<template lang="html">
  <div class="attentedfish">
    <div class="attentedfish_list">
      <div class="attentedfish_list-item" v-for="item in attentedfishInfo" @click="turnTo(item.id)">
      <img :src="imgSrc+item.photo[0]" class="img">
        <div class="intro">
          <div class="name">
            <p>{{item.title}}<img src="static/images/icon02.jpg"></p>
            <button @click.stop.prevent="follow(item.id,item.focus_part.id,item.focus,$event)" v-if="item.focus=true">已关注</button>
            <button @click.stop.prevent="follow(item.id,item.focus_part.id,item.focus,$event)" v-else-if="item.focus=false">+关注</button>
          </div>
          <div class="type">
            <p v-for="item in item.type">{{item.name}}</p>
          </div>
          <div class="distance">
            <p>{{item.price}}/{{item.unit}}</p>
            <a :href="item.url"><button>导航去</button></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      attentedfishInfo: '',
      cate_id: '',
      isFocus: true,
      imgSrc: global.imgSrc
    }
  },
  mounted() {
    let id = this.$route.params.id
      
    this.$http({
        method:'post',
        data:'userid='+id+'&type=fishing',
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          this.attentedfishInfo = res.data.data
        } else if (res.data.code === 0) {
          Toast({
            message: '请登陆后进行操作',
            position: 'middle',
            duration: 1500
          })
          var that = this
          setTimeout(function () {
            that.$router.push('/login')
          }, 2000);
        } else if (res.data.code === '-1') {
          Toast({
            message: '网络出错了QAQ',
            position: 'middle',
            duration: 1500
          })
        }
      })
  },
  methods: {
    follow(objid, focus_id, focus, e) {
      let btn = e.currentTarget;
      btn.classList.toggle('active');
      if (this.isFocus === focus) {
        btn.innerHTML = '+关注'
      } else {
        btn.innerHTML = '已关注'
      }
      this.isFocus = !this.isFocus;
        
      this.$http({
        method:'post',
        data:'action=add&objid='+objid+'&cate_id='+focus_id,
        url:global.url+'/api/focus',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          if (res.data.code === 0) {
            Toast({
              message: '请登陆后进行操作',
              position: 'middle',
              duration: 1500
            })
            var that = this
            setTimeout(function () {
              that.$router.push('/login')
            }, 2000);
          } else {
            console.log('发送成功')
          }
        })
    },
    turnTo(id) {
      this.$router.push({
        name: 'detail', params: { id: id }
      })
    }
  }
}

</script>


<style lang="css" scoped>
  .attentedfish {
    padding-bottom: 1.3888888rem;
  }
  .attentedfish_list-item {
    padding: .425925926rem;
    background-color: #fff;
  }

  .attentedfish_list-item .img {
    width: 3.7222222rem;
    height: 2.7962963rem;
  }

  .attentedfish_list-item .intro {
    width: 5.05555556rem;
    float: right;
    padding-top: .2777777778rem;
  }

  .intro div {
    height: .933333333rem;
  }

  .intro p {
    /*font-size: .314814815rem;*/
    font-size: .37037037rem;
    float: left;
    /*padding-top: .277777778rem;*/
  }

  .intro .name img {
    margin-left: .11111111rem;
    width: .314814815rem;
    height: .314814815rem;
  }

  .intro button {
    float: right;
    width: 1.60185185rem;
    height: .55555556rem;
    font-size: .37037037rem;
    border-radius: 3px;
    border: 1px solid #119df8;
  }

  .intro .name button {
    background-color: #fff;
    color: #119df8;
  }

  .intro .distance button {
    background-color: #119df8;
    color: #fff;
  }

  .more {
    text-align: center;
    margin-top: .277777778rem;
    font-size: .277777778rem;
    color: #898989;
  }
  .attentedfish_list-item .type {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
  }
  .attentedfish_list-item .type p {
    background-color: #fffcd8;
    border: 1px solid #f39800;
    color: #f39800;
    text-align: center;
    height: .55555556rem;
    font-size: 12px;
    border-radius: .55555556rem;
    margin-right: .1rem;
    width: 26%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name p {
    width: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
