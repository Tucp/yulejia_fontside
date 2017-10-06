<template lang="html">
  <div class="videoshare header-item">
    <header-item title="视频分享"></header-item>
    <div class="main">
      <router-link to="/sharedetail">
        <div class="item" v-for="item in datas">
          <div class="img">
            <img src="static/images/list01.jpg" class="">
            <div class="time">1小时前</div>
          </div>
          <div class="text">
            <div class="title">
              {{item.text}}
            </div>
            <div class="time">
              <img src="static/images/list01.jpg">
              <p class="name">肖申克</p>
              <div class="praise">
                <img @click="togglePraise"
                :src="isPraise ? 'static/images/bpraised.png' : 'static/images/bnopraise.png'">
                <span>{{num}}</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPraise: false,
      num: 65,
      datas: [
        { id: 0, text: '发布反动地方' },
        { id: 1, text: '发布反动地方发发发发的' },
        { id: 2, text: '' },
        { id: 3, text: '发布反动地方' },
        { id: 4, text: '发布反动地方发发发的' },
        { id: 5, text: '发布反动地方发发发发的发发发' },
        { id: 6, text: '发布反动地方发发发发的' },
        { id: 7, text: '发布反发发发发的' },
        { id: 8, text: '' },
        { id: 9, text: '布反动地方发发发发' },
      ]
    }
  },
  methods: {
    togglePraise () {
      this.isPraise = !this.isPraise
      if (this.isPraise === true) {
        this.num++
      } else {
        this.num--
      }
    }
  }
}
</script>

<style lang="css" scoped>
.videoshare .main {
  column-count: 2;
}
@media (min-width: 768px) {
  .videoshare .main  {
    column-count: 3;
  }
}
@media (min-width: 1024px) {
  .videoshare .main  {
    column-count: 4;
  }
}
.videoshare .main {
  padding: .277777778rem .416666667rem 0 .416666667rem;
  background-color: #f0f0f0;
  /*column-count: 2;*/
}
.videoshare .item {
  /*width: 100%;*/
  /*float: left;*/
  background-color: #fff;
  margin-bottom: .44444444rem;
  break-inside: avoid;
  /*box-sizing: border-box;*/
}
.videoshare .item .img {
  width: 100%;
  height: 2.833333333rem;
  overflow: hidden;
  position: relative;
}
.videoshare .item .img img {
  height: 100%;
  width: 100%;
}
.videoshare .item .img .time {
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: .5rem;
  background-color: rgb(120,120,120);
  opacity: .8;
  color: #fff;
  line-height: .5rem;
  padding-left: .1rem;
}
.videoshare .item .text {
  padding: .314814815rem .22222222rem;
}
.videoshare .item .text .title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 20px;
}
.videoshare .item .time {
  margin-top: .277777778rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  color: #898989;
}
.videoshare .item .time img {
  width: .611111111rem;
  height: .611111111rem;
  border-radius: 50%;
}
.videoshare .item .time p {
  flex: 1;
  margin-left: .277777778rem;
}
.videoshare .item .time div {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.videoshare .item .time .praise img {
  width: 14px;
  height: 14px;
  margin-right: .2rem;
}
</style>
