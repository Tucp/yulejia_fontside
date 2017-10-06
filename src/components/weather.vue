<template lang="html">
  <div class="weather">
    <div class="mask"></div>
    <div class="weather_img" style="background-image: url('static/images/duoyun.png');background-size: cover;" v-if="wether[0].type === '多云'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/yu.png');background-size: cover;" v-else-if="wether[0].type === '雷阵雨'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/yu.png');background-size: cover;" v-else-if="wether[0].type === '中雨'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/qing.png');background-size: cover;" v-else-if="wether[0].type === '晴'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/yin.png');background-size: cover;" v-else-if="wether[0].type === '阴'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/yu.png');background-size: cover;" v-else-if="wether[0].type === '阵雨'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/xue.png');background-size: cover;" v-else-if="wether[0].type === '大雪'||'小雪'||'中雪'||'暴雪'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/wu.png');background-size: cover;" v-else-if="wether[0].type === '雾'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/wumai.png');background-size: cover;" v-else-if="wether[0].type === '雾霾'">
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather_img" style="background-image: url('static/images/yin.png');background-size: cover;" v-else>
      <div @click="goBack" class="back"></div>
      <div class="posiT">
        <img src="static/images/dingwei.png" alt="" class="dingwei">
        <span v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</span>
        <span v-else-if="this.$store.state.selectCity.localCity !== ''">{{localCity}}</span>
        <span v-else>定位失败</span>
      </div>
      <div class="content_circle">
        <div class="circle">
          <label>钓鱼指数</label>
          <span v-if="wether[0].type == '多云'">适合</span>
          <span v-else-if="wether[0].type == '晴'">适合</span>
          <span v-else-if="wether[0].type == '阴'">适合</span>
          <span v-else>不适合</span>
        </div>
      </div>
      <div class="wendu">
        {{wether[0].high.substring(2)}}
      </div>
      <div class="tianqi">
        <div class="type">{{wether[0].type}}</div>
        <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
        <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
        <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
        <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
        <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
        <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
        <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
        <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
        <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
        <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
        <i v-else class="iconfont icon-dayu">&#xe607;</i>
      </div>
      <div class="weather_data">
        <label><img src="static/images/shidu.png" alt="">湿度: {{wData.wendu}}</span></label>
        <label><img src="static/images/pm.png" alt="">风向: {{wether[0].fengxiang}}</span></label>
        <label><img src="static/images/fengli.png" alt="">风力: {{wether[0].fengli.substring(9,12)}}</span></label>
      </div>
      <div class="air">
        <div class="kongqi"><img src="static/images/yezi.png" alt=""></div>
        <label v-if="wData.aqi < 50">空气：优</label>
        <label v-else-if="wData.aqi < 100">空气：优良</label>
        <label v-else-if="wData.aqi < 150">空气：一般</label>
        <label v-else-if="wData.aqi < 200">空气：差</label>
        <label v-else>空气：良</label>
      </div>
      <div class="data">
        <div class="today">
          <div class="today_left">
            <div>今天</div>
            <div>{{wether[0].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[0].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[0].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[0].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[0].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[0].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[0].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[0].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[0].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[0].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[0].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[0].high.substring(2)}}/{{wether[0].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>明天</div>
            <div>{{wether[1].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[1].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[1].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[1].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[1].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[1].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[1].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[1].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[1].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[1].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[1].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[1].high.substring(2)}}/{{wether[1].low.substring(2)}}
            </div>
          </div>
        </div>
        <div class="today">
          <div class="today_left">
            <div>后天</div>
            <div>{{wether[2].type}}</div>
          </div>
          <div class="today_right">
            <div>
              <i v-if="wether[2].type == '多云'" class="iconfont icon-duoyun">&#xe62a;</i>
              <i v-else-if="wether[2].type == '晴转多云'" class="iconfont icon-qingzhuanduoyun">&#xe6e2;</i>
              <i v-else-if="wether[2].type == '中雨'" class="iconfont icon-zhongyu">&#xe635;</i>
              <i v-else-if="wether[2].type == '小雨'" class="iconfont icon-xiaoyu">&#xe632;</i>
              <i v-else-if="wether[2].type == '晴'" class="iconfont icon-qing">&#xe631;</i>
              <i v-else-if="wether[2].type == '雷阵雨'" class="iconfont icon-leizhenyu">&#xe600;</i>
              <i v-else-if="wether[2].type == '小雪'" class="iconfont icon-xiaoxue">&#xe62e;</i>
              <i v-else-if="wether[2].type == '中雪'" class="iconfont icon-weather23">&#xe601;</i>
              <i v-else-if="wether[2].type == '大雪'" class="iconfont icon-daxue">&#xe62b;</i>
              <i v-else-if="wether[2].type == '阴'" class="iconfont icon-yintian">&#xe624;</i>
              <i v-else class="iconfont icon-dayu">&#xe607;</i>
            </div>
            <div>
              {{wether[2].high.substring(2)}}/{{wether[2].low.substring(2)}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wether: [],
      wData: ''
    }
  },
  computed: {
    localCity() {
      return this.$store.state.selectCity.localCity
    },
    selectCity() {
      return this.$store.state.selectCity.selectCity
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  },
  mounted () {
    this.$http({
      method:'post',
      data:'is_tui=true&city='+this.selectCity,
      url:global.url+'/api/getfishing',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
      this.wether = JSON.parse(res.data.data.wether).data.forecast
      this.wData = JSON.parse(res.data.data.wether).data
      console.log(this.wData);
    })
  }
}
</script>

<style lang="css" scoped>
.iconfont {
  font-family: 'iconfont';
  font-size: 20px;
}
.weather_img {
  color: white;
  width: 100%;
  height: 100vh;
  padding: 0 .15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
}
.back {
  border-top: .0462962963rem solid #fff;
  border-left: .0462962963rem solid #fff;
  height: .377777778rem;
  width: .377777778rem;
  transform: rotate(-45deg);
  position: absolute;
  left: .4259259256rem;
  top: .6rem;
}
.weather_img .dingwei {
  margin-right: .2rem;
  height: .577777778rem;
  width: .577777778rem;

}
.posiT {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: .6rem;
  left: 40%;
}
.posiT span {
  color: #fff;
  font-size: 18px;
}
.content_circle {
  flex: 1.8;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: .6rem;
  font-size: 16px;
}
.wendu {
  flex: .6;
  font-size: 46px;
}
.circle {
  height: 4rem;
  width: 4rem;
  border: 15px solid #C5D2E4;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}
.circle span {
  font-size: 26px;
}
.tianqi {
  display: flex;
  flex: .5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.weather_data {
  display: flex;
  flex: .5;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.weather_data label img {
  width: .6rem;
  height: .6rem;
}
.weather_data label {
  display: flex;
  justify-content: center;
  align-items: center;
}
.weather_data label img {
  margin-right: .2rem;
}
.weather_data label:nth-child(2) {
  margin: 0 .2rem;
}
.air {
  height: .8rem;
  padding: 0 .25rem;
  background-color: #2C71B3;
  /*opacity: .15;*/
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 15px;
}
.air img {
  flex: 1;
  width: .6rem;
  height: .6rem;
  margin-right: .1rem;
}
.kongqi {
  width: .6rem;
  height: .6rem;
  background-color: #6FBA2C;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: .2rem;
}
.data {
  font-size: 12px;
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding-bottom: .25rem;
  z-index: 100;
}
.data .today {
  width: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

}
.data .today .today_left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: .25rem;
}
.data .today .today_left div:nth-child(2) {
  margin-top: .25rem;
}
.data div:nth-child(2) {
  /*margin: 0 .1rem;*/
}
.data .today .today_right div:nth-child(1) {
  text-align: center;
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 1.4rem;
  bottom: 0;
  border: none;
  background-image: linear-gradient(
  to top,
  rgba(0,0,0,.6) 0%,
  rgba(0,0,0,.5) 20%,
  rgba(0,0,0,0.4) 40%,
  rgba(0,0,0,0.3) 60%,
  rgba(0,0,0,0.2) 80%,
  rgba(0,0,0,0) 100%);
}
</style>
