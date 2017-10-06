<template lang="html">
  <div class="selectcity">
    <header-item title="地图导航"></header-item>
    <div id="mapContainer" ></div>
  </div>
</template>

<script>
import Vupload from './upload.vue'
import { Toast } from 'mint-ui';
export default {
  components: {
    Vupload
  },
  created() {
      window.getlocationinfo = this.getlocationinfo
  },
  data() {
    return {
      now_lng: '',
      now_lat: '',
      p_lng: 116.026070,
      p_lat: 28.765740,
      p_name: "蒋巷福寿堂南侧回湾塘",
      p_fuzheren: '',
      p_dizhi: "南昌县福寿堂(蒋巷中大道北130米)",
    }
  },
  mounted() {
    if (window.settings) {
        try{
            // alert('app')
            // 开启定位  type 1 连续定位     2 定位1次（三秒内精度最高一次）
            var locationinfo = window.settings.startlocation('2');
            alert(this.now_lng+'/'+this.now_lat);
        }catch(e){
            alert(e);
        }
    }else{
        // alert('web')
    }
    
    this.queryPosition();
  },
  computed: {
    
  },
  methods: {
    queryPosition()
    {
        if(!this.p_lng || !this.p_lat)
        {
            window.location.href = 'fishing_court.php';
            return;
        }

        this.createRoute(this.p_lng, this.p_lat, this.p_name, this.p_fuzheren, this.p_dizhi);
    },
    createRoute(p_lng, p_lat, p_name, p_fuzheren, p_dizhi)
    {
        var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

        map = new AMap.Map("mapContainer", {
            zoom: 14,
            center:[this.p_lng, this.p_lat]
        });

        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: false,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                panToLocation: false,
                buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });

        marker = new AMap.Marker({
            map:map,
            position:[p_lng, p_lat],
            icon: new AMap.Icon({
                // image: "images/tidulogo.png",
            })
        });

        var str_daohang = '<div class="dt_tanchc"><p style="color: #1076bb;">';
            str_daohang += '<strong>'+p_name+'</strong></p>'+p_fuzheren+'</p><p>地址：'+p_dizhi+'</p>' +
            '<br /><button type="button" onclick="goThere(\''+p_lng +"\', \'"+p_lat +"\', \'"+p_name +'\')"  class="btn btn-primary">去这里</button></div><br/>';

        marker.content = str_daohang;

        marker.on('click',function(e){
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
        });
        marker.emit('click', {target: marker});
    },
    getlocationinfo(locationinfo){
        locationinfo = JSON.parse(locationinfo)
        latitude = locationinfo.latitude
        longitude = locationinfo.longitude
        alert(longitude+'/'+latitude)
    }
  }
}
</script>

<style type="text/css">
    body,html,#container{
        height: 100%;
        margin: 0px;
        font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
    }
    .info-title{
        color: white;
        font-size: 14px;
        background-color: rgba(0,155,255,0.8);
        line-height: 26px;
        padding: 0px 0 0 6px;
        font-weight: lighter;
        letter-spacing: 1px
    }
    .info-content{
        padding: 4px;
        color: #666666;
        line-height: 23px;
    }
    .info-content img{
        float: left;
        margin: 3px;
    }
</style>
