<template lang="html">
  <div class="editavatar">
    <header>
      <i class="back" onclick="history.go(-1)"></i>
      <button class="button" @click="setAvatar">使用</button>
    </header>
    <div class="main">
      <div class="img">
        <img :src="imgSrc + avatar" v-if="avatar.indexOf('http') == -1">
        <img :src="avatar" v-else>
      </div>
    </div>
    <div class="rotate">
      <el-upload
          class="avatar-uploader"
          action="http://yulejia.pnnnc.com/admin/upload/upload.html"
          accept="image/*"
          :show-file-list="false"
          :on-preview="getUrl"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <!-- <img v-if="photo" :src="photo" class="avatar" style="width:1.5rem;height:1.5rem;border-radius:50%"> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <p class="tip">选择你的头像</p>
  </div>
</template>

<script src="../../../avatar.js"></script>
<script>
export default {
  data () {
    return {
      phonto: '',
      imgSrc: global.imgSrc
    }
  },
  computed: {
    avatar() {
      return this.$store.state.touImg.avatar
    }
  },
  mounted() {
    console.log(this.avatar)
  },
  methods: {
    setAvatar () {
      console.log(this.avatar)
      // var crop = new Crop('../../../static/images/list01.jpg')
      // window.open(crop.result)
      this.$router.back(-1)
      this.$http({
            method:'post',
            data:'type=edit&headimg='+this.photo,
            url:'http://yulejia.pnnnc.com/api/user',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          })
    },
    handleAvatarSuccess(res, file) {
        this.photo = res
        // this.avatar = URL.createObjectURL(file.raw);
        this.$store.commit('selectAvatar', URL.createObjectURL(file.raw))
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/*';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        // console.log(this.photo)
      },
      getUrl(file) {
        this.photo = file.response
      }
  }
}
</script>

<style lang="css" scoped>
.editavatar {
  background-color: #000;
  width: 100%;
  height: 100vh;
}
header {
  height: 1.35185185rem;
  font-size: .462962963rem;
  background-color: #3e3a39;
  border: 0;
}
header p {
  text-align: center;
  line-height: 1.35185185rem;
  margin-right: .7407407496rem;
}
header i {
  border-top: .0462962963rem solid #fff;
  border-left: .0462962963rem solid #fff;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  float: left;
  margin-left: .4259259256rem;
  margin-top: .5rem;
}
header button {
  margin-top: .25rem;
  width: 1.55555556rem;
  height: .907407407rem;
  background-color: #00b0ff;
  color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: .388888889rem;
  float: right;
  margin-right: .416666667rem;
}
.main {
  padding: 0 .259259259rem;
}
.img {
  margin-top: 2.35185185rem;
  height: 9.49074074rem;
  width: 9.49074074rem;
  position: relative;
  overflow: hidden;
}
.img:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.img:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  border-radius: 50%;
  border: 3px solid #7d7d7d;
}
.img img {
  width: 100%;
  height: 100%;
}
.rotate {
  width: 1.85185185rem;
  height: 1.85185185rem;
  background-color: rgb(62,58,57);
  border-radius: 50%;
  /*text-align: center;*/
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: .962962963rem;
}
.rotate img {
  width: 1.11111111rem;
  height: 1.1111111rem;
}
p.tip {
  color: rgb(113,113,113);
  text-align: center;
  margin-top: .277777778rem;
}
</style>
