<template lang="html">
  <div class="fishing">
    <div class="talking_container" v-for="item in comments">
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
          <div class="image">
            <img v-lazy="imgSrc + photo" class="imgs" v-for="(photo, index) in item.photo" >
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      imgSrc: global.imgSrc
    }
  },
  methods: {
  },
  mounted () {
    let id = this.$route.params.id
      
    this.$http({
        method:'post',
        data:'id='+id,
        url:'http://yulejia.pnnnc.com/api/getfishing',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          let datas = res.data.data.comments.fishing
          for (let i = 0; i < datas.length; i++) {
            datas[i].headimg = imgSrc + datas[i].headimg
          }
          this.comments = res.data.data.comments.fishing
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
  width: 100%;
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
.imgs:nth-child(3n-1) {
  margin: 0 .2rem;
}
.like_content, .talking_content {
  padding-right: .3rem;
  flex: 3;
}
* {
  box-sizing: border-box;
}
</style>
