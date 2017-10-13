<template lang="html">
  <div class="myfishfield header-item allbg">
    <header-item title="我的钓场"></header-item>
    <div class="myfishfield_list">
      <div class="myfishfield_list-item" v-for="item,index in fishFieldInfo">
        <img :src="imgSrc+item.photo[0]">
        <div class="info" @click="turnTo(item.id)">
          <p class="name">{{item.title}}
            <img v-if="item.is_renzheng=='1'" src="static/images/icon02.jpg">
          </p>
          <p class="price">{{item.price}}/{{item.unit}}</p>
          <button>
            <a :href="item.url" @click.stop>导航去</a>
          </button>
        </div>
        <transition name="fade">
          <div class="new" v-if="item.message>0" @click="point(item.id)">
            新消息 {{item.message}}<i></i>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      fishFieldInfo: '',
      show: true,
      changeId: '',
      message: '',
      imgSrc: global.imgSrc
    }
  },
  methods: {
    turnTo(id) {
      this.$router.push({
        name: 'detail', params: { id: id }
      })
    },
    display(index) {
      this.changeId = index;
    },
    point(id) {
      let weuserid = this.checkLogin()
      this.$http({
        method:'post',
        data:'reed=1&id='+id+'&weuserid='+weuserid,
        url:global.url+'/api/getfishing',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          if (res.data.code == 0) {
            Toast({
              message: '登录已失效',
              position: 'middle',
              duration: 800
            });
            let that = this;
            console.log(that)
            setTimeout(function () {
               that.$router.push({
                path: '/login',
                query: { redirect: '/myfishfield' }
              })
            }, 900);

          }
          else if (res.data.code == 1) {
            this.$router.push({
              name: 'detail', params: { id: id }
            })
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error)
        })
        .catch()

    }
  },
  mounted() {
    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'type=fishing&weuserid='+weuserid,
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code == '1') {
          this.fishFieldInfo = res.data.data
        } else if (res.data.code == '0') {
          Toast({
            message: '请登录后再进行操作',
            position: 'middle',
            duration: 800
          });
          let that = this
          setTimeout(function () {
            that.$router.push('/login')
          }, 900);
        } else {
          Toast({
            message: '暂无数据',
            position: 'middle',
            duration: 900
          });
        }
      }).catch(error => {
        console.log(error);
      })
  }
}

</script>

<style lang="css" scoped>
.myfishfield_list-item {
  /*height: 2.40740741rem;*/
  position: relative;
  padding: .277777778rem .425925925926rem;
  border-bottom: .277777778rem solid #f0f0f0;
  background-color: #fff;
}

.myfishfield_list-item img {
  width: 2.46296296rem;
  height: 1.87037037rem;
}

.myfishfield_list-item .info {
  float: right;
  width: 6.2962963rem;
  height: 1.85185185rem;
  font-size: 14px;
}

.myfishfield_list-item .info .name img {
  /*width: .314814814815rem;
  height: .314814814815rem;*/
  width: 14px;
  height: 14px;
  margin-left: 5px;
}

.myfishfield_list-item .info .price {
  color: #898989;
  margin-top: .211111119rem;
  font-size: 12px;
}

.myfishfield_list-item .info button {
  height: .55555556rem;
  width: 1.85185185rem;

  background-color: #119df8;
  border: 0;
  border-radius: 2px;
  position: absolute;
  bottom: .277777778rem;
}

.myfishfield_list-item .info button a {
  color: #fff;
}

.myfishfield_list-item .new {
  height: .833333333rem;
  background-color: #f64648;
  border-radius: .833333333rem 0 0 .833333333rem;
  padding-left: .314814815rem;
  line-height: .833333333rem;
  color: #fff;
  position: absolute;
  right: 0;
  top: .833333333rem;
}

.myfishfield_list-item .new i {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: .12962963rem solid transparent;
  border-left: .148148148rem solid #fff;
  border-right: .148148148rem solid transparent;
  border-bottom: .12962963rem solid transparent;
  margin-left: .166666667rem;
}

.hide {
  display: none;
}
</style>
