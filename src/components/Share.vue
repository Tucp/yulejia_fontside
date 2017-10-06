<template>
    <div class="container">
        <div class="mask_div" v-show="mask" @click="hidden"></div>
        <transition name="slide-bottom">
            <div class="share" v-show="share">
                <div class="weixin sshare" @click="shareFriend"><img src="static/images/weixin.png" alt="" class="weixin picc"><span>微信</span></div>
                <div class="firend sshare" @click="shareTimeline"><img src="static/images/friendzone.png" alt="" class="friend picc"><span>朋友圈</span></div>
                <div class="weibo sshare" @click="shareB"><img src="static/images/weibo.png" alt="" class="weibo picc"><span>微博</span></div>
                <div class="qq sshare" @click="shareQ"><img src="static/images/qq.png" alt="" class="qq picc"><span class="qq_right">QQ</span></div>
                <div class="qqzone sshare" @click="shareZ"><img src="static/images/qqzone.png" alt="" class="qqz picc"><span class="zone">QQ空间</span></div>
            </div>
        </transition>
        <img src="static/images/share_2.png" alt="" class="find" @click="Share">
    </div>
</template>

<script>
    import apiurl from '../Globle.js'
    export default {
        data() {
            return {
                share: false,
                mask: false,
                list: '渔乐家',
                lists: '渔乐家' + window.location.href,
                url: apiurl.apiurl + '/' + window.location.hash
            }
        },
        methods: {
            shareFriend() {
                try {
                    /*Sharefriend   枚举 1 为好友  2为朋友圈
                      type：        枚举  1 为普通分享 
            
                      webpageUrl:   分享跳转链接 
                      title:        分享标题 
                      description： 分享描述
                    */
                    window.settings.friendsSharetypeUrlToptitleDescript(1, 1, this.url, this.news.title, this.news.description)
                } catch (e) {

                }
            },
            shareTimeline() {
                try {
                    /*Sharefriend   枚举 1 为好友  2为朋友圈
                      type：        枚举  1 为普通分享 
            
                      webpageUrl:   分享跳转链接 
                      title:        分享标题 
                      description： 分享描述
                    */
                    window.settings.friendsSharetypeUrlToptitleDescript(2, 1, this.url, this.news.title, this.news.description)

                } catch (e) {

                }
            },
            shareB() {
                var sharesinastring = 'http://service.weibo.com/share/share.php?title=' + this.lists + '&url=' + this.url + '&site="满艺网"';
                window.location.href = sharesinastring;
            },
            shareZ() {
                var sharesinastring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title= ' + this.list + '&url=' + this.url + '&site="满艺网"';
                window.location.href = sharesinastring;
            },
            shareQ() {
                //分享到新浪微博
                var sharesinastring = 'http://connect.qq.com/widget/shareqq/index.html?title=' + this.list + '&summary=' + this.url + '&url=' + this.url + '&site="满艺网"';
                window.location.href = sharesinastring;
                function shareQQweibo() {
                    var p = {
                        url: location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
                        title: '分享小月亮', /*分享标题(可选)*/
                        pic: '', /*分享图片(可选)*/
                        site: 'QQ分享' /*分享来源(可选) 如：QQ分享*/
                    }
                }
            },

            shareW() {
                let url = 'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js'
                let script = document.createElement('script')
                script.setAttribute('src', url)
                document.getElementsByTagName('head')[0].appendChild(script)
            },
            Share() {
                this.share = !this.share
                this.mask = !this.mask
            },
            hidden() {
                this.mask = false
                this.share = false
            }
        }
    }

</script>

<style lang="css" scoped>
    .content {
        margin: .15rem .4rem;
        word-wrap: break-word;
        font-size: 16px;
        color: #898989;
    }

    .img {
        width: 92%;
        margin: .4rem .4rem .5rem .4rem;
        margin-right: .4rem;
    }

    .time {
        margin: .4rem .4rem;
        color: #3e3a39;
    }

    .title {
        margin-top: 1.84074074rem;
        font-size: 18px;
        margin-left: .4rem;
        margin-right: .4rem;
        word-wrap: break-word;
        color: #3e3a39;
    }

    .find {
        position: fixed;
        right: .27rem;
        top: .46901rem;
        width: .5rem;
        height: .5rem;
        z-index: 10000;
    }

    .mask_div {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #808080;
        filter: alpha(Opacity=60);
        -moz-opacity: 0.6;
        opacity: 0.6;
        overflow-y: hidden;
        z-index: 99;
    }

    .share {
        padding-left: .2rem;
        padding-right: .2rem;
        padding-top: 1.55185185rem;
        padding-bottom: .2rem;
        position: fixed;
        width: 100%;
        background-color: white;
        z-index: 100;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
    }

    .sshare {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .picc {
        width: 1.2rem;
        height: 1.2rem;
        flex: 2;
    }

    span {
        flex: 1;
        margin-top: .1rem;
        padding-left: .15rem;
        letter-spacing: .03rem;
    }

    .qq_right {
        padding-left: .25rem;
    }

    .slide-bottom-enter-active {
        transition: all .3s ease;
    }

    .slide-bottom-leave-active {
        transition: all .25s ease-out;
    }

    .slide-bottom-enter,
    .slide-bottom-leave-active {
        transform: translateY(-180px);
        opacity: 0;
    }

    .star {
        width: .6rem;
        height: .5rem;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 999;
        top: .4rem;
        right: 1.4rem;
    }
</style>