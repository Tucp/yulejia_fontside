<template lang="html">
  <div class="selectcity">
    <header-item title="地图导航"></header-item>
    <div class="navgation">
        <iframe id="markPage" width="100%" height="100%" frameborder="0" scrolling="no" :src='markUrl'></iframe>
    </div>
    
    <div @click="navigation()" style="z-index:9999999999; width:100%; height:50px; background:#FCAC0D; text-align:center; position:fixed; bottom:0px; line-height:50px;">导航</div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                name: this.$route.params.name,
                city: this.$route.params.city,
                addr: this.$route.params.addr,
                lat: this.$route.params.lat,
                lng: this.$route.params.lng,
                markUrl: ''
            }
        },
        mounted() {
            var markUrl = 'http://apis.map.qq.com/tools/poimarker?&marker=coord:' + this.$route.params.lat + ',' + this.$route.params.lng + ';title:位置：'+this.$route.params.name+';addr:' + (this.$route.params.addr || this.$route.params.city) + '&referer=myapp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&streetview=1'

            // var markUrl = 'http://apis.map.qq.com/tools/poimarker?type=1&keyword=钓场&center=39.908491,116.374328&radius=1000&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&tonav=0&referer=鱼乐家'
            this.markUrl = markUrl

        },
        methods: {
            navigation(){
                try{
                    let data = '{"ismylocation": true,"maptype": "1","latitudeA": "","longitudeA": "","latitudeB": "'+this.lat+'","longitudeB": "'+this.lng+'","sname": "起点","dname": "'+this.name+'"}'
                    window.settings.invokingMap(data)
                }catch(e){
                    
                }
            }
        }
    }

</script>

<style lang="css" scoped>
    body {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    #map-info {
        display: none;
    }

    .navgation {
        width: 100%;
        height: 18rem;
    }
</style>
