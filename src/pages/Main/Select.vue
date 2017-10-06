<template>
  <div class="selector">
    <iframe id="iframe" width="100%" frameborder="0" scrolling="no" src="http://apis.map.qq.com/tools/locpicker?search=1&amp;type=1&amp;key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&amp;referer=myapp" height="627">
    </iframe>
    <div class="complete" @click="turnBack">
      <span>√</span>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      poiname: '',
      longitude: '',
      latitude: ''
    }
  },
  methods: {
    turnBack() {
      this.$router.go(-1);
      // this.$store.commit('getCityInfo', {name: this.poiname,lon: this.longitude,lat: this.latitude})
      // console.log(this.$store.state.selector.cityName)
      // console.log(this.$store.state.selector.longitude)
      // console.log(this.$store.state.selector.latitude)
    }

  },
  mounted() {
    var that = this;
    $(function () {

      adaptHeight();//动态适配高度

      window.onresize = function () { //横屏、QQ浏览器变全屏模式下的时候，需要重新计算高度
        adaptHeight();
      }

      window.addEventListener('message', function (event) {
        var loc = event.data;
        that.$store.commit('getCityInfo', { name: loc.poiaddress, lon: loc.latlng.lat, lat: loc.latlng.lng })
        // that.poiname = loc.poiname;
        // that.longitude = loc.latlng.lat;
        // that.latitude = loc.latlng.lng;
      }, false);

      function adaptHeight() {
        var winH = $(window).height();
        var bodyH = document.documentElement.clientHeight;
        if (winH > bodyH) {
          window.parent.document.getElementById("iframe").height = winH;
        } else {
          window.parent.document.getElementById("iframe").height = bodyH;
        }
      }

    });
  }
}

</script>

<style lang="css" scoped>
.complete {
  position: absolute;
  bottom: 1rem;
  right: 45%;
  width: .98rem;
  height: .98rem;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: #FFFFFF;
  text-align: center;
}

.complete span {
  font-size: 22px;
  font-weight: 600;
  color: #3796FF;
}
</style>
