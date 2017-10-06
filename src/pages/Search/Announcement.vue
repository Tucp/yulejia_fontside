<template lang="html">
  <div class="container">
      <div class="normal" v-for="(item, index) in lists" :key="item" @click="displayDetail(item.id)">
        <div class="title">
          <div class="top" v-show="item.is_tui == 1">
            头条
          </div>
          <h1>{{item.title}}</h1>
        </div>
        <div class="content">
          {{item.description}}
        </div>
        <div class="time">
          {{item.create_time}}
        </div>
        <div class="mask"></div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Top: true,
      lists: []
    }
  },
  methods: {
    displayDetail (id) {
      this.$router.push({
        name: 'AnnouncementDetail', params: { id: id }
      })
    }
  },
  mounted () {
    this.$http({
      method:'post',
      data:'type=announce&keyword='+this.$store.getters.search,
      url:global.url+'/api/search',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
    console.log(res.data.data.data)
      this.lists = res.data.data.data
    })
  },
  created () {
    this.lists.forEach(list => {
      list.isClicked = false
    })
  },
}
</script>

<style lang="css" scoped>
.container {
  padding-top: 1rem;
}
.normal {
  background-color: white;
  padding-top: .2rem;
  padding-left: .5rem;
  padding-right: .4rem;
  word-wrap: break-word;
}
.title {
  height: .6rem;
  display: flex;
  margin-bottom: .3rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.top {
  width: 1rem;
  height: .6rem;
  background-color: #f39800;
  color: white;
  margin-right: .25rem;
  border-radius: 5px;
  text-align: center;
  line-height: .6rem;
}
h1 {
  font-size: 14px;
  color: #3e3a39;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  margin: 0;
}
.content {
  font-size: 12px;
  font-family:Helvetica;
  color: #898989;
  text-overflow:
  -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: .2rem;
}
.time {
  text-align: right;
  opacity: .65;
}
.mask {
  border-bottom: 1px solid #F0F0F0;
  width: 100%;
  height: .2rem;
}
</style>
