<template lang="html">
  <div class="start">
    <div class="search_head">
      <i class="back" @click="goBack"></i>
      <div class="input">
        <input type="search" placeholder="龙琴" class="area" @keyup.enter="insertText" v-focus>
        <img src="static/images/search_details.jpg">
      </div>
        <p class="butn" @click="insertText">
          搜索
        </p>
    </div>
    <div class="search_sort">
      <div class="hot_search">
        <div class="title">
          热门搜索
        </div>
        <div class="text">
          <p v-for="item in datas1" @click="details(item)">{{item}}</p>
        </div>
      </div>
      <div class="history_search" ref="history">
        <div class="title">
          <p>历史搜索</p>
          <img src="static/images/trash.png" @click="del()">
        </div>
        <div class="text">
          <p v-for="(item, index) in list" @click="details(item)">{{item}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas1: [],
      list: []
    }
  },
  mounted () {
    var collectionList = localStorage.getItem("collectiondata").split(',')
    this.list = collectionList

    this.$http({
      method:'post',
      data:'type=get_hotword',
      url:global.url+'/api/search',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
      this.datas1 = res.data.data
      // console.log(res);
    })
  },
  methods: {
    insertText () {
      let tel = document.querySelector('.area').value
      this.$store.commit('obtain', tel )
      this.$store.commit('add', tel )
      //保存到localStorage
      localStorage.setItem('collectiondata', this.$store.getters.datas)

       this.$router.push('/search/announcement')
    },
    del () {
      this.$refs.history.remove()
      localStorage.setItem('collectiondata', '')
    },
    goBack () {
      this.$router.go(-1)
    },
    details (type) {
      this.$router.push('/search/announcement')
      this.$store.commit('obtain', type )
      this.$store.commit('add', type )
    }
  }
}
</script>

<style lang="css" scoped>
.search_head {
  height: 1.34259259rem;
  /*border-bottom: 1px solid #dcdddd;*/
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: -0px .4259259256rem;
  font-size: .33333333rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.search_head i {
  border-top: .0462962963rem solid #9b9b9c;
  border-left: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  float: left;
  /*margin-left: .4259259256rem;*/
  /*margin-top: .5rem;*/
  margin-right: .509259259rem;
}
.search_head .input {
  flex: 1;
  position: relative;
}
.search_head .input input {
  width: 100%;
  height: .833333333rem;
  background-color: #f0f0f0;
  border-radius: .833333333rem;
  padding-left: 1rem;
  position: relative;
  /*border: 1px solid #f0f0f0;*/
}
input[type=search]::-webkit-search-cancel-button {
  /*-webkit-appearance: none;*/
  position: relative;
  /*height: 14px;
  width: 14px;
  border-radius: 50%;
  background-color: #898989;*/
  opacity: .4;
  right: .2rem;
  color: #fff;
}
.search_head .input img {
  width: .425925926rem;
  height: .425925926rem;
  position: absolute;
  top: .185185185rem;
  left: .37037037rem;
}
.search_head .butn {
  margin-left: .4259259256rem;
  color: #898989;
  font-size: 14px;
}
.start:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: -999;
}
.search_sort {
  padding: 1.5rem .407407407rem 0 .407407407rem;
}
.search_sort .title {
  font-size: 16px;
  color: #898989;
}
.search_sort .text {
  padding: .425925926rem 0;
}
.search_sort .text p {
  display: inline-block;
  font-size: 14px;
  background-color: #f0f0f0;
  padding: .240740741rem;
  margin-bottom: .277777778rem;
  border-radius: 4px;
}
.search_sort .text p:not(:last-child) {
  margin-right: .277777778rem;
}
.history_search .title {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.history_search .title p {
  flex: 1;
}
.history_search img {
  width: 18px;
  height: 16px;
}
</style>
