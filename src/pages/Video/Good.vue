<template lang="html">
  <div class="parise header-item">
    <header-item title="点赞列表"></header-item>
    <div>
      <div class="item" v-for="item in attentions_list"
       :key="item.id" @click="displayDetail(item.id)">
        <div class="avatar">
          <img :src="item.src" class="avatarimg">
          <img :src="item.sex_src" class="sex">
        </div>
        <div class="info">
          <p>{{item.nick}}</p>
          <p><span>关注 {{item.attentions}}</span><span>粉丝 {{item.fans}}</span></p>
        </div>
        <div class="relationship">
          <img src="static/images/attentionme.jpg">
        </div>
      </div>
    </div>
    <div class="nomore">
      没有更多了 ...
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'attentions_list'
    ])
  },
  methods: {
    displayDetail (id) {
      this.$router.push({
        name: 'person', params: { id: id }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.item {
  height: 1.85185185rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .407407407rem;
  border-bottom: 1px solid #f0f0f0;
}
.item .avatar {
  position: relative;
  height: 1.2962963rem;
  width: 1.2962963rem;
  overflow: hidden;
}
.item .avatar .avatarimg {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.item .avatar .sex {
  position: absolute;
  width: .37037037rem;
  height: .37037037rem;
  right: 0;
  bottom: 0;
  border-radius: 50%;
}
.item .info {
  flex: 1;
  margin-left: .259259259rem;
}
.item .info p {
  line-height: .574074074rem;
}
.item .info p:first-child {
  font-size: .407407407rem;
}
.item .info span {
  color: #898989;
  margin-right: .462962963rem;
  font-size: .351851852rem;
}
.item .relationship img {
  height: .574074074rem;
  width: .574074074rem;
}
.nomore {
  height: 1.2962963rem;
  width: 100%;
  background-color: #f0f0f0;
  text-align: center;
  line-height: 1.2962963rem;
  color: #898989;
  font-size: .296296296rem;
}
</style>
