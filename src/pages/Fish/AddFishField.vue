<template lang="html">
  <div class="addfishfield header-item">
    <header-item title="添加钓场"></header-item>
    <div class="fishfield_information">
        <div class="text">
          <div>
            <span>钓场名称</span>
            <input type="search" ref="name" class="name" @keyup.enter="save" v-model="name" required>
          </div>
          <div>
            <span class="yPlace" style="width:100%">钓场地点<span style="margin-left: 20px">{{cityName}}</span></span>
            <i class="spred" @click="getAddress"></i>
            <!-- <input type="search" class="location" v-model="location" required> -->
          </div>
          <div>
            <span>钓场负责人</span>
            <input type="search" ref="boss" class="boss" @keyup.enter="save" v-model="boss" required>
          </div>
          <div>
            <span>联系电话</span>
            <input type="search" ref="tel" class="tel" @keyup.enter="save" v-model="tel" required>
          </div>
          <div class="type">
            <div>
              <span>钓场类型</span>
            </div>
            <div>
              <button class="selected_type fishfield" v-for="(item, index) in fishfield"
              @click.stop.prevent="showFF">{{item}}
              <i class="delete" @click.stop.prevent="goDeleteFF($event)"></i></button>
              <button class="add fishfield" @click.prevent.stop="showFF"><span>+</span>添加</button>
            </div>
          </div>
          <div class="type">
            <div>
              <span>鱼种</span>
            </div>
            <div>
              <button class="selected_type fish" v-for="(item, index) in fish"
              @click.stop.prevent="showF">{{item}}
              <i class="delete" @click.stop.prevent="goDeleteF($event)"></i></button>
              <button class="add fish" @click.prevent.stop="showF"><span>+</span>添加</button>
            </div>
          </div>

          <div>
            <span>价格</span>
            <input type="number" ref="price" class="price" @keyup.enter="save" v-model="price" style="width:40px;" required> 元 /
            <select v-model="unit">
              <option value="小时"> 小时</option>
              <option value="天"> 天</option>
              <option value="斤"> 斤</option>
              <option value="不详"> 不详</option>
            </select>
          </div>

          <div>
            钓场简介<textarea cols="35" rows="15" ref="content"
            placeholder="请在此填写钓场简介、收费标准、垂钓规则等详细信息" v-model="content"></textarea>
          </div>

        </div>
        <div class="img">
          <!-- <span>钓场图片</span> -->
          <!-- <div class="tupian" v-for="imgSrc in imgSrcList">
            <img ref="chooseImg" :src="imgSrc" style="width:100%;height:100%" alt="">
          </div> -->
          <Vupload @data="data"></Vupload>
        </div>
        <div class="save">
          <button class="save-btn" @click="save">保存</button>
        </div>
        <span ref="point" v-show="showPoint" class="point"></span>
    </div>
    <div class="mask" @click="hidden" @touchmove.prevent v-show="isMask"></div>
    <div class="select" v-show="isShow">
      <div class="select-item select-fishfield" v-show="isFF">
        <div class="title">
          钓场类型
        </div>
        <div class="types clearfix">
          <div class="types-item" v-for="item in ffdatas">
            <button @click="selectType($event)" ref="fishfield">
              {{item.name}}
            </button>
          </div>
        </div>
        <div class="confirm-btn">
          <button @click="confirmFF">确定</button>
        </div>
      </div>
      <div class="select-item select-fish" v-show="isF">
        <div class="title">
          鱼种
        </div>
        <div class="types clearfix">
          <div class="types-item" v-for="item in fdatas">
            <button @click="selectType($event)" ref="fish">
              {{item.name}}
            </button>
          </div>
        </div>
        <div class="confirm-btn">
          <button @click="confirmF">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vupload from '../../components/upload.vue'
export default {
  components: {
    Vupload
  },
  data() {
    return {
      showPoint: false,
      fishfield: [],
      fish: [],
      imgSrcList: [],
      name: '',
      boss: '',
      location: '',
      tel: '',
      content: '',
      zuobiao: '',
      isFF: false,
      isF: false,
      isShow: false,
      isMask: false,
      ffdatas: ['黑下次', '速度', '啊说法', '是的的', '阿三', '但是', '是', '士大夫啊', '是想'],
      fdatas: ['草鱼', '鲫鱼', '鲤鱼'],
      cate_id: [],
      fishtype_id: [],
      price: '0.00',
      unit: '',
    }
  },
  beforeCreate() {
    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'city='+this.selectCity+'&action=add&weuserid='+weuserid,
        url:global.url+'/api/getfishing',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code == '0') {
          this.$router.push('/login')
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  watch: {
    name: function() {
      this.$store.commit('selectName', this.name)
    },
    boss: function() {
      this.$store.commit('selectP', this.boss)
    },
    tel: function() {
      this.$store.commit('selectTel', this.tel)
    },
    content: function() {
      this.$store.commit('selectContent', this.content)
    }
  },
  computed: {
    cityName() {
      return this.$store.state.selector.cityName
    },
    longitude() {
      return this.$store.state.selector.longitude
    },
    latitude() {
      return this.$store.state.selector.latitude
    },
    photo() {
      return this.$store.state.photo.photo
    },
    remove() {
      return this.$store.state.photo.remove
    }
  },
  mounted() {
    let weuserid = this.checkLogin()
    this.name = this.$store.state.fish.fieldName
    this.boss = this.$store.state.fish.fieldP
    this.tel = this.$store.state.fish.fieldTel
    this.content = this.$store.state.fish.fieldContent
    this.$store.commit('selectPhoto', [])
    this.$store.commit('selectRemove', [])
    this.$http({
        method:'post',
        data:'action=get_cate&weuserid='+weuserid,
        url:global.url+'/api/getfishing',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        console.log(res.data.data)
        this.ffdatas = res.data.data.cate
        this.fdatas = res.data.data.fishtype
      })
  },
  methods: {
    data(value) {
    },
    hidden() {
      this.isShow = false
      this.isMask = false
    },
    showFF() {
      this.isShow = true
      this.isMask = true
      this.isFF = true
      this.isF = false
    },
    showF() {
      this.isShow = true
      this.isMask = true
      this.isF = true
      this.isFF = false
    },
    selectType(e) {
      e.currentTarget.classList.toggle('active')
    },
    confirmFF() {
      let fishfields = this.$refs.fishfield
      this.fishfield = []
      fishfields.forEach(fishfield => {
        if (fishfield.classList.contains('active') &&
          this.fishfield.indexOf(fishfield.innerText.trim()) === -1) {
          this.fishfield.push(fishfield.innerText.trim())
        }
      })
      for (var i = 0; i < this.ffdatas.length; i++) {
        for (var j = 0; j < this.fishfield.length; j++) {
          if (this.ffdatas[i].name == this.fishfield[j]) {
            this.cate_id.push(this.ffdatas[i].id)
          }
        }
      }
      this.hidden()
    },
    confirmF() {
      let fishs = this.$refs.fish
      this.fish = []
      fishs.forEach(fish => {
        if (fish.classList.contains('active') &&
          this.fish.indexOf(fish.innerText.trim()) === -1) {
          this.fish.push(fish.innerText.trim())
        }
      })
      for (var i = 0; i < this.fdatas.length; i++) {
        for (var j = 0; j < this.fish.length; j++) {
          if (this.fdatas[i].name == this.fish[j]) {
            this.fishtype_id.push(this.fdatas[i].id)
          }
        }
      }
      this.hidden()
    },
    goDeleteFF(e) {
      let fishfields = this.$refs.fishfield
      for (let i = 0; i < this.fishfield.length; i++) {
        if (this.fishfield[i] === e.currentTarget.parentNode.innerText.trim()) {
          this.fishfield.splice(i, 1)
        }
      }
      fishfields.forEach(fishfield => {
        if (e.currentTarget.parentNode.innerText === fishfield.innerText.trim()) {
          fishfield.classList.remove('active')
        }
      })
    },
    goDeleteF(e) {
      let fishs = this.$refs.fish
      for (let i = 0; i < this.fish.length; i++) {
        if (this.fish[i] === e.currentTarget.parentNode.innerText.trim()) {
          this.fish.splice(i, 1)
        }
      }
      fishs.forEach(fish => {
        if (e.currentTarget.parentNode.innerText === fish.innerText.trim()) {
          fish.classList.remove('active')
        }
      })
    },
    showImg() {
      for (var i = 0; i < document.querySelector('#fileId1').files.length; i++) {
        this.imgSrcList.push(window.URL.createObjectURL(document.querySelector('#fileId1').files[i]))
      }
    },
    save() {
      let that = this
      if (this.name == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请填写你的名字！'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.name.focus()
        }, 1000)
      } else if (this.cityName == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请选择钓场地点！'
        setTimeout(() => {
          this.showPoint = false
          this.$router.push('/select')
        }, 1000)
      } else if (this.boss == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请填写钓场负责人电话'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.boss.focus()
        }, 1000)
      } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.tel))) {
        this.showPoint = true
        this.$refs.point.innerHTML = '请填写准确的手机号码'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.tel.focus()
        }, 1000)
      } else if (this.fishfield.length == 0) {
        this.showPoint = true
        this.$refs.point.innerHTML = '请选择钓场类型'
        setTimeout(() => {
          this.showPoint = false
        }, 1000)
      } else if (this.fish.length == 0) {
        this.showPoint = true
        this.$refs.point.innerHTML = '请选择鱼种'
        setTimeout(() => {
          this.showPoint = false
        }, 1000)
      } else if (this.content == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请填写钓场简介'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.content.focus()
        }, 1000)
      } else {
        this.zuobiao = this.longitude + ',' + this.latitude
        let weuserid = this.checkLogin()
        this.$http({
          method:'post',
          data:'action=add&title='+this.$store.state.fish.fieldName+'&zuobiao='+this.zuobiao+'&tel='+this.$store.state.fish.fieldTel+'&boss='+this.$store.state.fish.fieldP+'&photo='+this.photo+'&remove='+this.remove+'&cate_id='+Array.from(new Set(this.cate_id))+'&fishtype_id='+Array.from(new Set(this.fishtype_id))+'&content='+this.$store.state.fish.fieldContent+'&weuserid='+weuserid+'&price='+this.price+'&unit='+this.unit,
          url:global.url+'/api/getfishing',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
            if (res.data.code == '-1') {
              that.showPoint = true
              that.$refs.point.innerHTML = '添加钓场失败'
              setTimeout(() => {
                that.showPoint = false
              }, 1000)
            } else if (res.data.code == '1') {
              that.$store.commit('clear')
              that.showPoint = true
              that.$refs.point.innerHTML = '添加钓场成功'
              setTimeout(() => {
                that.showPoint = false
                that.$router.push('/fish')
              }, 1000)
            } else if (res.data.code == '0') {
              that.showPoint = true
              that.$refs.point.innerHTML = '登录失效'
              setTimeout(() => {
                that.showPoint = false
                that.$router.push('/login')
              }, 1000)
            }
          })
      }

    },
    getAddress() {
      this.$store.commit('selectLi',document.querySelector('.weui-uploader__files').innerHTML)
      this.$router.push('/select')
    }
  }
}
</script>

<style lang="css" scoped>
.fishfield_information .point {
  position: fixed;
  top: 70%;
  left: 50%;
  display: inline-block;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, .7);
  color: #fff;
  font-size: 0.373333rem;
  padding: 5px 10px;
  border-radius: 5px;
}

.type {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
}

.type div:first-child {
  width: 2.12962963rem;
}

.type div:last-child {
  flex: 1;
}

.delete {
  width: .4rem;
  height: .4rem;
  display: block;
  border-radius: 50%;
  position: absolute;
  border: 1px solid #FCAC0D;
  background-color: #fff;
  right: -.0925925926rem;
  top: -.0925925926rem;
}

.delete:before {
  position: absolute;
  left: 45%;
  top: 7%;
  width: 1px;
  height: .3rem;
  background-color: #FCAC0D;
  content: '';
  display: block;
  transform: rotate(45deg);
}

.delete:after {
  position: absolute;
  top: 45%;
  left: 7%;
  width: .3rem;
  height: 1px;
  background-color: #FCAC0D;
  content: '';
  display: block;
  transform: rotate(45deg);
}

.selected_type {
  position: relative;
  height: .833333333rem;
  width: 2.1148148rem;
  background-color: #FCAC0D;
  border: 0;
  color: #fff;
  line-height: .833333333rem;
  border-radius: 3px;
  margin-right: 7px;
}

.select-item .types-item .active {
  color: #FCAC0D;
  border: 1px solid #FCAC0D;
}

.clearfix {
  overflow: auto;
}

.select-item {
  /*position: fixed;
  background-color: #fff;
  width: 90%;
  background-color: #fff;
  top: 50%;
  margin-top: -30%;
  left: 5%;
  z-index: 9999;
  border-radius: 10px;
  text-align: center;*/
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
  height:300px; 
  position:fixed; 
  left: 5%;
  top:40%; 
  margin-top:-69px; 
  z-index:9999;
}

.select-item .title {
  margin-top: .540740741rem;
  font-size: 16px;
  margin-bottom: .462962963rem;
}

.select-item .types {
  padding: 0 .87962963rem;
}

.select-item .types-item {
  font-size: 14px;
  color: #898989;
  float: left;
  width: 33.33333333%;
  line-height: .833333333rem;
  margin-bottom: .462962963rem;
}

.select-item .types-item button {
  border: 1px solid rgb(220, 221, 221);
  border-radius: 1px;
  height: .833333333rem;
  line-height: .833333333rem;
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
  color: #898989;
}

.select-item .confirm-btn {
  margin-top: .277777778rem;
  padding: 0 .68185185rem;
  padding-bottom: .277777778rem;
}

.select-item .confirm-btn button {
  width: 100%;
  height: 1.11111111rem;
  background-color: #FCAC0D;
  border: 0;
  border-radius: 3px;
  color: #fff;
}

.mask {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  /*position: absolute;*/
  position: fixed;
  z-index: 999;
  content: '';
  opacity: .5;
}

input[type="file"] {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: relative;
}

.upload {
  width: 2.77777778rem;
  height: 2.77777778rem;
  border: 1px solid rgb(220, 221, 221);
  position: relative;
}

.upload:before {
  top: 50%;
  position: absolute;
  content: '';
  height: 5px;
  width: 80%;
  left: 10%;
  background-color: rgb(220, 221, 221);
  display: block;
  margin-top: -2.5px;
}

.upload:after {
  content: '';
  width: 5px;
  height: 80%;
  background-color: rgb(220, 221, 221);
  display: block;
  position: absolute;
  left: 50%;
  bottom: 10%;
  margin-left: -2.5px;
}


/*.addpic {
  width: 100%;
  margin-top: .5rem;
  margin-bottom: .6rem;
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
}*/

.img span {
  display: block;
}

.img .tupian {
  position: relative;
  width: 2.77777778rem;
  height: 2.77777778rem;
  text-align: center;
  line-height: 3rem;
  border: 2px solid #F0F0F0;
  margin-right: .2rem;
  overflow: hidden;
  display: inline-block;
}

.img .upload {
  display: inline-block;
}

.fishfield_information .text {
  padding: 0 .3888888889rem;
}

.fishfield_information div {
  position: relative;
  line-height: 1.2962963rem;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.fishfield_information .text div>span {
  width: 2.12962963rem;
  display: block;
  /*height: 100%;*/
  float: left;
}

.fishfield_information input {
  color: #898989;
}

.fishfield_information .add {
  width: 2.1148148rem;
  height: .833333333rem;
  /*垂直居中*/
  line-height: .833333333rem;
  color: #FCAC0D;
  border: 1px solid #FCAC0D;
  background-color: #fff;
  border-radius: 3px;
}

.fishfield_information .add span {
  font-size: 14px;
  font-weight: 700;
  margin-right: 5px;
}

.fishfield_information textarea {
  width: 100%;
  /*文本区域大小*/
  height: 1.540740741rem;
  border: 0;
  resize: none;
}

.yPlace {
  position: relative;
  width: 100%;
}

.spred {
  position: absolute;
  display: inline-block;
  top: 0;
  right: .4rem;
  width: .35rem;
  height: .35rem;
  -webkit-transform: rotate(225deg);
  transform: rotate(225deg);
  border-bottom: 1px solid #BBBBBB;
  border-left: 1px solid #BBBBBB;
  margin-right: .2rem;
  margin-top: .5rem;
}

.fishfield_information textarea::-webkit-input-placeholder {
  font-size: 12px;
  color: #898989;
}

.fishfield_information .text {
  border-bottom: .277777778rem solid #f0f0f0;
}

.fishfield_information .img {
  /*padding: 0 .3888888889rem;*/
  /*height: 4.53703704rem;*/
  border-bottom: .277777778rem solid #f0f0f0;
}

.fishfield_information .img input {
  width: 100%;
}

.fishfield_information .save {
  height: 2.03703704rem;
  background-color: #f0f0f0;
  padding: 0 .3888888889rem;
  width: 100%;
  line-height: 2.03703704rem;
}

.fishfield_information .save .save-btn {
  width: 9.166666667rem;
  height: 1.11111111rem;
  /*垂直居中*/
  line-height: 1.11111111rem;
  color: #fff;
  background-color: #FCAC0D;
  border: 0;
  border-radius: 5px;
  font-size: 18px;
  letter-spacing: 3px;
}
</style>
