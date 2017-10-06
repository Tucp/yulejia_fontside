<template lang="html">
  <div class="recommend">
    <y-banner></y-banner>
      <div class="related">
        <div v-for="item in datas" :key="item.id">
          <router-link :to="item.path">
            <img :src="item.src">
            <p>{{item.name}}</p>
          </router-link>
        </div>
      </div>
      <div class="headlines">
        <img src="static/images/headlines.png">
        <i class="point"></i>
        <div class="topper">
          <div class="film_focus">
            <div class="film_focus_desc" style="display: none;">
              <ul class="film_focus_nav">
                <li v-for="(item, index) in top" :class="{ cur: !index }"></li>
              </ul>
            </div>
            <div class="film_focus_imgs_wrap">
              <ul class="film_focus_imgs">
                <li v-for="item in top"><a target="_blank" :href="item.url">{{item.content}}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="list-head">
        <img src="static/images/where.png">
      </div>
    <!-- </v-touch> -->
    <y-list></y-list>
    <div class="more" @click="showmore">
      <p>查看更多 ></p>
    </div>
    <!--</mt-loadmore>-->
  </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  import List from '@/components/List.vue'
  export default {
    data() {
      return {
        datas: [
          { id: 0, name: '通知公告', src: 'static/images/annonce.png', path: '/fishannouncement/?cate_id=4'},
          { id: 1, name: '会员中心', src: 'static/images/members.png', path: '/fishassociation' },
          { id: 2, name: '活动赛事', src: 'static/images/race-index.png', path: '/raceindex' }
        ],
        getScoreLog: [],
        pageNo: 1,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        totalCount: '',
        cur: 'cur',
        top: ''
      }
    },
    components: {
      'y-banner': Banner,
      'y-list': List
    },
    methods: {
      getData() {
        this.$http.post(commonUrl + "/restful/", {
          typeFlag: '1'
        }).then(response => {
          if (response.data.errcode == 0) {
            this.getScoreLog = response.data.scoreLog;
            this.totalGetCount = (response.data.recordCount + 9) / 10;
          }
        }, response => {
        });
      },
      showmore(){
        this.$router.push('/fish')
      },
    },
    created() {
      this.$store.dispatch('changeNavbarActive', 0)
    },
    mounted() {
      $(function(){
        $(".film_focus").th_video_focus({
          navContainerClass:".film_focus_nav",
          focusContainerClass:".film_focus_imgs",
          delayTime:3000
        });
      });
      let param = new URLSearchParams()
        
        this.$http({
          method:'post',
          data:'type=top',
          url:global.url+'/api/getinfo',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          this.top = res.data.data
        })
    }
  }

</script>

<style lang="css" scoped>
  .slide-top-enter-active {
    transition: all .3s ease;
  }

  .slide-top-leave-active {
    transition: all .25s ease-out;
  }

  .slide-top-enter,
  .slide-top-leave-active {
    transform: translateX(-180px);
    opacity: 0;
  }

  .related {
    height: 2.6518519rem;
  }

  .related div {
    text-align: center;
    width: 33.33333333%;
    float: left;
    padding-top: .312962963rem;
  }

  .related img {
    width: 1.38888889rem;
    height: 1.38888889rem;
  }

  .related p {
    line-height: 0.51111111rem;
    font-size: .388888889rem;
    color: #3e3a39;
  }

  .headlines {
    border-top: 1px solid #f0f0f0;
    height: .925925926rem;
    padding-left: .407407407rem;
    font-size: 14px;
    color: #ababab;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
  }

  .headlines img {
    width: 1.03703704rem;
    height: .37962963rem;
    vertical-align: top;
  }

  .headlines i {
    margin: 0 .185185185rem;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: #dcdddd;
    vertical-align: top;
  }
  .headlines .topper{
    flex: 1;
    height: 0.88rem;
    line-height: 0.88rem;
    color: rgb(0,0,0);
  }
  .list-head img {
    height: .825925926rem;
    width: 100%;
  }

  .more {
    background: #f0f0f0;
    color: #999;
    font-size: 28px;
    position: relative;
    width: 100%;
    height: .8rem;
    line-height: .6rem;
    bottom: 1.40740741rem;
    text-align: center;
  }

  .more p {
    font-size: 12px;
  }
  .film_focus {
  width:100%;
  height:100%;
  overflow:hidden;
  position:relative;
  /*margin:20px auto;*/
}
.film_focus .film_focus_imgs_wrap {
  width: 100%;
  height: 100%;
  /*background:url(.images/load.gif) no-repeat center center;*/
}
.film_focus ul.film_focus_imgs {
  width: 100%;
  position:absolute;
  right:0;
  top:0;
  overflow:hidden;
}
.film_focus ul.film_focus_imgs li {
  width: 100%;
  height: 0.88rem;
  overflow:hidden;
  padding: 0;
  font-size: 14px;
}
.film_focus ul.film_focus_imgs li img {
  height:340px;
  width:626px;
}
.film_focus ul.film_focus_imgs li a{
  display: block;
  line-height: 0.88rem;
  color: #000 !important;
}
.film_focus .film_focus_desc h3 {
  height:45px;
  line-height:45px;
  overflow:hidden;
  position:absolute;
  left:232px;
  bottom:0;
  background:rgba(0, 0, 0, .5);
  color:#fff;
  width:100%;
  padding-left:20px;
  z-index:99;
  font-size:16px;
 /*filter:progid:DXImageTransform.Microsoft.gradient(enabled='true', startColorstr='#7F000000', endColorstr='#7F000000');*/
}
.film_focus ul.film_focus_nav {
  width:232px;
  height:340px;
  position:absolute;
  left:0;
  top:0;
  z-index:100;
}
.film_focus ul.film_focus_nav li {
  height:47px;
  background:#d7d7dc;
  margin:0px 0px 5px 0;
  padding:0px 18px 0 19px;
  position:relative;
  width:190px;
  cursor: pointer;
  cursor: hand;
  color:#333;
  font-weight:bold;
  font-size:14px;
  overflow:hidden;
  line-height:47px;
}
.film_focus ul.film_focus_nav li.cur {
  /*background:url(.images/hd_on.png) no-repeat;*/
  width:190px;
  height:132px;
  left:0px;
  padding:0px 33px 0 25px;
  /*_background:url(.images/hd_on.png) no-repeat 0 0;*/
  word-break:break-all;
  color:#fff;
  font-weight:bold;
  font-size:22px;
  overflow:hidden;
  line-height:30px;
}
.film_focus ul.film_focus_nav li b {
  display:none
}
.film_focus ul.film_focus_nav li b span {
  display:block
}
.film_focus ul.film_focus_nav li.cur b {
  display:block;
  vertical-align: middle;
  display: table-cell;
  height:132px;
}
.film_focus ul.film_focus_nav li.cur span {
  display:none
}
</style>
