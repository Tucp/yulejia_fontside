<template lang="html">
  <div class="search_head">
    <i class="back" @click="goBack"></i>
    <div class="input">
      <input type="search" class="area" @keyup.enter="insertText" v-focus>
      <img src="static/images/search_details.jpg">
    </div>
    <p class="butn" @click="insertText">
      搜索
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    insertText () {
      let a = document.querySelector('.area').value
      this.$store.commit('add', a )
      //保存到localStorage
      localStorage.setItem('collectiondata', this.$store.getters.datas)
      this.$router.push('/search')
      this.$store.commit('obtain', a )
    },
    goBack () {
      this.$router.go(-2);
    }
  },
  mounted () {
    document.querySelector('.area').value = this.$store.getters.search
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
  z-index: 100;
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
</style>
