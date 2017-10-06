<template lang="html">
  <div class="talk">
    <div class="count" v-show="comments.length !== 0">
      钓友评价
      <span class="num">({{comments.length}})</span>
    </div>
    <div class="select" v-show="comments.length !== 0">
      <div class="button" @click="changeTab('selct')" :class="{isSelect: Tab==='selct'}">全部</div>
      <div class="button" @click="changeTab('nselct')" :class="{isSelect: Tab==='nselct'}">有图</div>
    </div>
    <div class="talking_container" v-for="item in comments" v-show="">
      <div class="eveluate">
        <div class="msg">
          <div class="avatars">
            <img v-lazy="item.headimg" class="avatar"></div>
          <div class="msg_talk">
            <span class="name">{{item.username}}</span>
            <div class="position">
              <span class="time">{{item.create_time}}</span>
              <div class="city" v-if="item.address !== ''">
                <img src="static/images/city.png" alt="" class="lab">
                <p class="posiCity">{{item.address}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="talk_content">
          <div class="content">
            {{item.content}}
          </div>
          <div class="image" v-for="photo in item.photo">
            <img v-lazy="imgSrc + photo" class="imgs">
          </div>
          <div class="other">
            <div class="talking">
              <img src="static/images/talk.png" alt="" class="talking_img">
              <span class="talking_content">评论</span>
            </div>
            <div class="like">
              <img src="static/images/like.png" alt="" class="like_img">
              <span class="like_content">点赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="publish">
      <router-link to="/comment"><div class="button_publish">发表评论</div></router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Tab: 'selct',
      comments: [],
      imgSrc: global.imgSrc
    }
  },
  methods: {
    changeTab (type) {
      this.Tab = type

    }
  },
  mounted () {
    let id = this.$route.params.id
      
    this.$http({
        method:'post',
        data:'id='+id,
        url:global.url+'/api/getfishing',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          let datas = res.data.data.comments.diaoyoupingjia
          for (let i = 0; i < datas.length; i++) {
            datas[i].headimg = this.imgSrc + datas[i].headimg
          }
          this.comments = res.data.data.comments.diaoyoupingjia
        }
        console.log(this.comments)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.count {
  font-size: 17px;
  padding-left: .5rem;
}
.select  {
  width: 100%;
  height: 1.8rem;
  line-height: 1.8rem;
  padding-left: .5rem;
  border-bottom: 1px solid #F0F0F0;
}
.button {
  display: inline-block;
  width: 2.2rem;
  height: .9rem;
  margin-right: .3rem;
  background-color: #DCDDDD;
  text-align: center;
  line-height: .9rem;
  border-radius: .1rem;
}
.isSelect {
  background-color: #F39800;
  color: white;
}
.eveluate {
  width: 100%;
  height: 100%;
}
.msg {
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatars {
  flex: 1;
  text-align: center;
  margin-left: .5rem;
  margin-right: .3rem;
}
.msg_talk {
  flex: 4;
  display: flex;
  flex-direction: column;
}
.avatar {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.lab {
  width: .5rem;
  height: .5rem;
  opacity: .6;
}
.name {
  flex: 1;
  margin-bottom: .2rem;
  font-size: 16px;
}
.position {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.time {
  flex: 1;
  font-size: 14px;
  opacity: .6;
}
.city {
  flex: 1;
  display: flex;
  align-items: center;
}
.posiCity {
  font-size: 14px;
  opacity: .6;
}
.talk_content {
  width: 100%;
  height: 100%;
}
.content {
  word-wrap: break-word;
  width: 90%;
  padding: 0 .5rem;
  letter-spacing: .03rem;
  font-size: 14px;
}
.other {
  position: relative;
  margin-top: .5rem;
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #F4F5F5;
}
.talking_img, .like_img {
  width: .5rem;
  height: .5rem;
  padding-top: .15rem;
  flex: 1;
  padding-left: .4rem;
}
.talking, .like {
  width: 2rem;
  height: .8rem;
  border: 1px solid #F4F5F5;
  text-align: center;
  line-height: .8rem;
  border-radius: .6rem;
  display: flex;
}
.talking {
  position: absolute;
  right: .4rem;
}
.like {
  position: absolute;
  right: 2.7rem;
}
.publish {
  width: 100%;
  height: 1.6rem;
  padding: .2rem 10%;
}
.button_publish {
  background-color: #119DF8;
  width: 80%;
  height: 1.4rem;
  border-radius: .2rem;
  color: white;
  text-align: center;
  line-height: 1.4rem;
  font-size: 16px;
}
.image {
  /*display: flex;*/
  width: 100%;
  margin: .2rem  .3rem;
  overflow-x: auto;
  white-space: nowrap;
}
.imgs {
  width: 30.8%;
  height: 2.8rem;
}
.like_content, .talking_content {
  padding-right: .3rem;
  flex: 3;
}
</style>
