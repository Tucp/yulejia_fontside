<template lang="html">
  <div class="comment">
    <div class="titleb" v-if="comments.count !== 0 && cateid === 1">
      钓场鱼汛 ({{comments.count}})
    </div>
    <div class="titleb" v-if="comments.count !== 0 && cateid !== 1">
      钓友评价 ({{comments.count}})
    </div>
    <div style="text-align: center;font-size:14px;padding:.5rem 0;" v-if="comments.count === 0">暂无评论</div>
    <div class="talking_container" v-for="(item,index) in comments.data"
    :key="item.id" @click="displayDetail(item.id, cateid, objid, item.is_zan, comments.zan_part.id)">
      <div class="eveluate">
        <img src="static/images/top.png" v-if="item.is_tui === 1" class="settop">
        <div class="msg">
          <div class="avatars">
            <img v-lazy="item.headimg" class="avatar"
            v-if="(item.headimg).indexOf('http') !== -1">
            <img v-lazy="imgSrc+item.headimg"
            class="avatar" v-else>
          </div>
          <div class="msg_talk">
            <span class="name">{{item.nickname}}</span>
            <div class="position">
              <span class="time">{{item.create_time}}</span>
              <!--<div class="city">
                <img src="static/images/city.png" class="lab" v-if="item.address">
                <p class="posiCity">{{item.address}}</p>
              </div>-->
            </div>
          </div>
        </div>
        <div class="talk_content">
          <div class="content" v-html="item.content">
          </div>
          <div class="image">
            <img v-lazy="imgSrc+item"
            v-for="item in item.photo">
          </div>
          <div class="other">
            <div class="talking" @click.stop="goReply(item.id, cateid, objid, item.is_zan)">
              <img src="static/images/talk.png" class="talking_img">
              <span class="talking_content">评论 ({{item.replys}})</span>
            </div>
            <div class="like" @click.stop="praise(item, item.id)">
              <img :src="item.is_zan ? 'static/images/bzabed.png' : 'static/images/bzan.png' " class="like_img">
              <span class="like_content" :class="{active: item.is_zan}">
                点赞 ({{item.zan}})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="publish" v-if="isFishField === true">
      <div class="button_publish" @click="goComment(objid, cateid)" v-if="cateid === 1">发表鱼汛</div>
      <div class="button_publish" @click="goComment(objid, cateid)" v-else>发表评论</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      imgSrc: global.imgSrc
    }
  },
  props: ['comments', 'objid', 'cateid', 'isFishField'],
  methods: {
    displayDetail(id, cateid, objid, is_zan) {
      this.$store.state.isComment = false
      this.$router.push({
        name: 'commentdetail', params: { id: id, cateid: cateid, objid: objid, 
         is_zan: is_zan }
      })
    },
    goComment(objid, cateid) {
      if (this.checkLogin()) {
        this.$router.push({
          name: 'comment', params: { objid: objid, cateid: cateid }
        })
      }
      
    },
    goReply (id, cateid, objid, is_zan) {
      this.$store.state.isComment = true
      this.$router.push({
        name: 'commentdetail', params: { id: id, cateid: cateid, objid: objid,
        is_zan: is_zan }
      })
    },
    praise(item, objid) {
      let weuserid = this.checkLogin(false)
      this.$http({
        method:'post',
        data:'action=add&cate_id='+this.comments.zan_part.id+'&objid='+objid+'&weuserid='+weuserid,
        url:global.url+'/api/zan',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          if (res.data.code === 0) {
            this.$router.push('/login')
          }
          if (res.data.code === 1) {
            item.zan++
            item.is_zan = true
          }
          if (res.data.code === 2) {
            item.zan--
            item.is_zan = false
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="css" scoped>
.settop {
  position: absolute;
  right: .416666667rem;
  top: .342592593rem;
  height: 1.18518519rem;
  width: 1.5rem;
}

.eveluate {
  position: relative;
}

/* .comment {
  padding-bottom: 1.33333333rem;
  margin-bottom: 1.33333333rem;
} */

.publish {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.button_publish {
  background-color: #FCAC0D;
  /*width: 80%;*/
  width: 100%;
  height: 1.4rem;
  /*border-radius: .2rem;*/
  color: white;
  text-align: center;
  line-height: 1.4rem;
  font-size: 16px;
}

.like_content.active {
  color: #119df8;
}

.comment .talking_container {
  border-top: 1px solid #f0f0f0;
}

.comment .titleb {
  font-size: 16px;
  padding: .44444444rem;
}

.msg {
  height: 2rem;
  display: flex;
  align-items: center;
}

.avatars {
  flex: 1;
  text-align: center;
  margin-left: .3rem;
  margin-right: .1rem;
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

.comment .name {
  flex: 1;
  margin-bottom: .1rem;
  font-size: 14px;
}

.position {
  flex: 1;
  display: flex;
  align-items: center;
}

.comment .time {
  font-size: 13px;
  /*opacity: .6;*/
  color: #898989;
  margin-right: .2777777788rem;
}

.city {
  /*flex: 1;*/
  display: flex;
  align-items: center;
}

.posiCity {
  font-size: 14px;
  /*opacity: .6;*/
  color: #898989;
}

.talk_content {
  width: 100%;
  height: 100%;
}

.comment .content {
  word-wrap: break-word;
  /*width: 90%;*/
  padding: 0 .5rem;
  padding-bottom: .3rem;
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

.talking_img,
.like_img {
  width: .4rem;
  height: .4rem;
  /*flex: 1;*/
  /*padding-left: .4rem;*/
  margin-right: .2rem;
}

.talking,
.like {
  /*width: 2rem*/
  width: 2.5rem;
  height: .8rem;
  border: 1px solid #f0f0f0;
  /*line-height: .8rem;*/
  border-radius: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.talking {
  position: absolute;
  right: .4rem;
}

.like {
  position: absolute;
  right: 3rem;
}

.image {
  /*display: flex;*/
  width: 100%;
  padding-left: .5rem;
}

.image img {
  /*width: 3rem;*/
  height: 1.2rem;
  margin-right: .1rem;
  width: 1.2rem;
}


</style>
