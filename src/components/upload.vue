<template lang="html">
  <div class="membership">
    <div class="weui-cells weui-cells_form" id="uploader">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">图片上传</p>
              <div class="weui-uploader__info">
                <span id="uploadCount" ref="uploadCount">0</span>/5
              </div>
            </div>
            <input type="hidden" name="photo[]" v-for="photo in successImgList" :value="photo">
            <input type="hidden" name="remove[]" v-for="del in delImgList" :value="del">
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" ref="upload" id="uploaderFiles" @click="del"></ul>
              <div class="weui-uploader__input-box">
                <input name="file" id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadCount: 0,
      uploadList: [],
      successImgList: [],
      delImgList: []
    }
  },
  computed: {
    photo() {
      return this.$store.state.photo.photo
    },
    liList() {
      return this.$store.state.photo.liList
    },
    remove() {
      return this.$store.state.photo.remove
    }
  },
  mounted() {
    this.successImgList = this.photo
    this.delImgList = this.remove
    this.$refs.upload.innerHTML = this.liList
    console.log(this.liList)
    var hear = this
    weui.uploader('#uploader', {
     url: global.imgUpload,
     auto: true,
     type: 'file',
     fileVal: 'file',
     compress: {
       width: 1600,
       height: 1600,
       quality: .8
     },
   onBeforeQueued: function(files) {
       // `this` 是轮询到的文件, `files` 是所有文件

       if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
           alert('请上传图片');
           return false; // 阻止文件添加
       }
       if(files.size > 10 * 1024 * 1024){
           alert('请上传不超过10M的图片');
           return false;
       }
       // if (files.length > 8) { // 防止一下子选择过多文件
       //     alert('最多只能上传5张图片，请重新选择');
       //     return false;
       // }
       if (hear.uploadCount + 1 > 5) {
           alert('最多只能上传5张图片');
           return false;
       }

       ++hear.uploadCount;
       hear.$refs.uploadCount.innerHTML = hear.uploadCount

       // return true; // 阻止默认行为，不插入预览图的框架
   },
   onQueued: function(){
       // console.log(this);

       // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
       // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

       // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
       // this.stop(); // 中断上传

       // return true; // 阻止默认行为，不显示预览图的图像
   },
   onBeforeSend: function(data, headers){
       // console.log(this, data, headers);
       // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
       // $.extend(headers, { Origin: 'http://vue.com' }); // 可以扩展此对象来控制上传头部

       // return false; // 阻止文件上传
   },
   onProgress: function(procent){
        console.log('onProgress');
       console.log(this, procent);
       // return true; // 阻止默认行为，不使用默认的进度显示
   },
   onSuccess: function (ret) {
    console.log('onSuccess');
       console.log(ret);
       hear.successImgList.push(ret);
       hear.$store.commit('selectPhoto', hear.successImgList)
       // console.log(that.photo.push(ret));

      //  successImgList.push({id: this.id, key: ret.key})
      //  console.log(JSON.stringify(successImgList))
       // return true; // 阻止默认行为，不使用默认的成功态
   },
   onError: function(err){
    console.log('err');
       console.log(this, err);
        // return true; // 阻止默认行为，不使用默认的失败态
   }
});
  },
  methods: {
    del(e) {
      var that = this
      var target = e.target
      while(!target.classList.contains('weui-uploader__file')&& target) {
        target = target.parentNode
      }
      if(!target) return
      var url = target.getAttribute('style') || ''
      var id = target.getAttribute('data-id')
      if(url) {
        url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '')
      }
      if(confirm('确定删除该图片？')){
        --that.uploadCount
        that.$refs.uploadCount.innerHTML = that.uploadCount
        for(let i = 0, len = that.uploadList.length; i < len; ++i) {
          var file = that.uploadList[i]
          if(file.id + '' === id) {
            that.uploadList.splice(i, 1)
            file.stop()
            break
          }
        }
        for(let i = 0, len = that.successImgList.length; i < len; ++i) {
          var item = that.successImgList[i]
          if(item.id + '' === id) {
            that.successImgList.splice(i, 1)
            break
          }
        }
        let delkey = id-1;
        let del = that.successImgList[delkey]
        // console.log(delkey)
        // console.log(del)
        // console.log(that.successImgList)
        that.delImgList.push(del)
        target.remove()
        that.$store.commit('selectRemove', that.delImgList)
      }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
