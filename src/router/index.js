import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: require('@/pages/Index/Index.vue'),
      redirect: '/main/',
      children: [
        {
          path: '/main',
          component: require('@/pages/Index/Main.vue'),
          children: [
            {
              path: '/main/',
              component: require('@/pages/Main/Recommend.vue')
            },
            {
              path: '/main/recommend',
              component: require('@/pages/Main/Recommend.vue')
            },
            {
              path: '/main/AboutFishing',
              component: require('@/pages/Main/AboutFishing.vue'),
              children: [
                {
                  path: '/aboutfishing/newpublish',
                  component: require('@/pages/Main/NewPublish.vue')
                },
                {
                  path: '/',
                  component: require('@/pages/Main/NewPublish.vue')
                },
                {
                  path: '/aboutfishing/mypublish',
                  component: require('@/pages/Main/MyPublish.vue')
                }
              ]
            },
            {
              path: '/main/video',
              component: require('@/pages/Main/Video.vue')
            }
          ]
        },
        {
          path: '/store',
          component: require('@/pages/Index/Store.vue')
        },
        {
          path: '/fish',
          component: require('@/pages/Index/Fish.vue')
        },
        {
          path: '/my',
          component: require('@/pages/Index/My.vue')
        }
      ]
    },
    {
      path: '/search',
      component: require('@/pages/Search/Index.vue'),
      children: [
        {
          path: '/search/fishfield',
          name: 'search',
          component: require('@/pages/Search/FishField.vue')
        },
        {
          path: '/',
          name: 'search',
          component: require('@/pages/Search/FishField.vue')
        },
        {
          path: '/search/race',
          component: require('@/pages/Search/Race.vue')
        },
        {
          path: '/search/announcement',
          name: 'announcement',
          component: require('@/pages/Search/Announcement.vue')
        },
        {
          path: '/search/aboutfish',
          component: require('@/pages/Search/AboutFish.vue')
        }
      ]
    },
    {
      path: '/person/:id/:focus/:befocus/:headimg/:nickname',
      name: 'person',
      component: require('@/pages/Person/Index.vue'),
      children: [
        {
          path: '/person/:id/:focus/:befocus/:headimg/:nickname/attentedfish',
          component: require('@/pages/Person/AttentedFish.vue')
        },
        {
          path: '/',
          name: 'attentedfish',
          component: require('@/pages/Person/AttentedFish.vue')
        },
        {
          path: '/person/:id/:focus/:befocus/:headimg/:nickname/sendfish',
          name: 'sendfish',
          component: require('@/pages/Person/SendFish.vue')
        }
      ]
    },
    {
      path: '/myinfo',
      component: require('@/pages/MyInfo/Index.vue')
    },
    {
      path: '/myfishfield',
      component: require('@/pages/MyInfo/MyFishField.vue')
    },
    {
      path: '/myrace',
      component: require('@/pages/MyInfo/MyRace.vue')
    },
    {
      path: '/mycollection',
      component: require('@/pages/MyInfo/MyCollection.vue'),
      children: [
        {
          path: '/mycollection/race',
          component: require('@/pages/MyCollection/Race.vue')
        },
        {
          path: '/mycollection/announcement',
          component: require('@/pages/MyCollection/Announcement.vue')
        },
        {
          path: '/',
          component: require('@/pages/MyCollection/Announcement.vue')
        },
        {
          path: '/mycollection/aboutfish',
          component: require('@/pages/MyCollection/AboutFish.vue')
        }
      ]
    },
    {
      path: '/draft',
      component: require('@/pages/MyInfo/Draft.vue')
    },
    {
      path: '/message',
      component: require('@/pages/MyInfo/Message.vue')
    },
    {
      path: '/message/messagelist',
      component: require('@/pages/Message/MessageList.vue')
    },
    {
      path: '/message/parise',
      component: require('@/pages/Message/Parise.vue')
    },
    {
      path: '/message/reply',
      component: require('@/pages/Message/Reply.vue')
    },
    {
      path: '/message/aboutfish',
      component: require('@/pages/Message/AboutFish.vue'),
      children: [
        {
          path: '/notice',
          component: require('@/pages/Message/Notice.vue')
        },
        {
          path: '/',
          component: require('@/pages/Message/Notice.vue')
        },
        {
          path: '/apply',
          component: require('@/pages/Message/Apply.vue')
        }
      ]
    },
    {
      path: '/chat',
      component: require('@/pages/Message/Chat.vue')
    },
    {
      path: '/editnick',
      component: require('@/pages/MyInfo/EditNick.vue')
    },
    {
      path: '/editavatar',
      component: require('@/pages/MyInfo/EditAvatar.vue')
    },
    {
      path: '/attention',
      component: require('@/pages/MyInfo/Attention.vue')
    },
    {
      path: '/Fans',
      component: require('@/pages/MyInfo/Fans.vue')
    },
    {
      path: '/set',
      component: require('@/pages/MyInfo/Set.vue')
    },
    {
      path: '/set/bind',
      component: require('@/pages/Set/Bind.vue')
    },
    {
      path: '/set/check',
      component: require('@/pages/Set/Check.vue')
    },
    {
      path: '/set/bindok',
      component: require('@/pages/Set/BindOK.vue')
    },
    {
      path: '/set/modifybind',
      component: require('@/pages/Set/ModifyBind.vue')
    },
    {
      path: '/set/contact',
      component: require('@/pages/Set/Contact.vue')
    },
    {
      path: '/date',
      component: require('@/components/Date.vue')
    },
    {
      path: '/addfishfield',
      component: require('@/pages/Fish/AddFishField.vue')
    },
    {
      path: '/fishannouncement',
      component: require('@/pages/FishAnnouncement/Index.vue'),
      children: [
        {
          path: '/fishannouncement/referee',
          component: require('@/pages/FishAnnouncement/Referee.vue')
        },
        {
          path: '/',
          component: require('@/pages/FishAnnouncement/Referee.vue')
        },
        {
          path: '/fishannouncement/other',
          component: require('@/pages/FishAnnouncement/Other.vue')
        }
      ]
    },
    {
      path: '/city',
      component: require('@/components/City.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: require('@/components/Detail.vue'),
      children: [
        {
          path: '/detail/:id/brief',
          // name: 'brief',
          component: require('@/components/Brief.vue')
        },
        {
          path: '/',
          name: 'brief',
          component: require('@/components/Brief.vue')
        },
        {
          path: '/detail/:id/showComment/:objid/:cateid',
          name: 'showComment',
          component: require('@/components/showComment.vue')
        }
      ]
    },
    {
      path: '/commentA',
      component: require('@/components/CommentA.vue')
    },
    {
      path: '/announcementdetail/:id',
      name: "AnnouncementDetail",
      component: require('@/pages/FishAnnouncement/detail.vue')
    },
    {
      path: '/raceindex',
      component: require('@/pages/Race/Index.vue'),
      children: [
        // {
        //   path: '/raceindex/all',
        //   component: require('@/pages/Race/All.vue')
        // },
        {
          path: '/raceindex/apply',
          component: require('@/pages/Race/Apply.vue')
        },
        {
          path: '/',
          component: require('@/pages/Race/Apply.vue')
        },
        {
          path: '/raceindex/score',
          component: require('@/pages/Race/Score.vue')
        }
      ]
    },
    {
      path: '/description',
      component: require('@/pages/Race/Description.vue')
    },
    {
      path: '/teamapply',
      component: require('@/pages/Race/TeamApply.vue')
    },
    {
      path: '/personapply',
      name: 'personapply',
      component: require('@/pages/Race/PersonApply.vue')
    },
    {
      path: '/racereport/:id',
      name: 'racereport',
      component: require('@/pages/Race/RaceReport.vue')
    },
    {
      path: '/racedetail/:id',
      name: 'racedetail',
      component: require('@/pages/Race/RaceDetail.vue')
    },
    {
      path: '/scorereport/:id',
      name: 'scorereport',
      component: require('@/pages/Race/ScoreReport.vue')
    },
    {
      path: '/fishassociation',
      component: require('@/pages/Fishassociation/fishassociation.vue')
    },
    {
      path: '/fishpeople',
      name: 'fishpeople',
      component: require('@/pages/Fishassociation/fishpeople.vue')
    },
    {
      path: '/organization',
      name: 'Organization',
      component: require('@/pages/Fishassociation/organization.vue')
    },
    {
      path: '/fishserver',
      name: 'fishserver',
      component: require('@/pages/Fishassociation/fishserver.vue')
    },
    {
      path: '/selectCity',
      component: require('@/components/selectCity.vue')
    },
    {
      path: '/pay',
      name: 'pay',
      component: require('@/pages/Race/pay.vue')
    },
    {
      path: '/aboutfishingdetail',
      component: require('@/pages/Main/Detail.vue')
    },
    {
      path: '/applyed',
      component: require('@/pages/Main/Applyed.vue')
    },
    {
      path: '/select',
      name: 'select',
      component: require('@/pages/Main/Select.vue')
    },
    {
      path: '/report/:objid/:cateid',
      name: 'report',
      component: require('@/pages/Main/Report.vue')
    },
    {
      path: '/startFish',
      component: require('@/pages/Main/startFish.vue')
    },
    {
      path: '/Membership',
      component: require('@/pages/Fishassociation/membership.vue')
    },
    {
      path: '/Adress',
      component: require('@/components/adress.vue')
    },
    {
      path: '/good',
      component: require('@/pages/Video/Good.vue')
    },
    {
      path: '/videodetail',
      component: require('@/pages/Video/Detail.vue')
    },
    {
      path: '/hotvideo',
      component: require('@/pages/Video/Hot.vue')
    },
    {
      path: '/videoshare',
      component: require('@/pages/Video/Share.vue')
    },
    {
      path: '/live',
      component: require('@/pages/Video/Live.vue'),
      children: [
        {
          path: '/cuntrylive',
          component: require('@/pages/Video/CuntryLive.vue')
        },
        {
          path: '/',
          component: require('@/pages/Video/CuntryLive.vue')
        },
        {
          path: '/otherlive',
          component: require('@/pages/Video/OtherLive.vue')
        }
      ]
    },
    {
      path: '/sharedetail',
      component: require('@/pages/Video/ShareDetail.vue')
    },
    {
      path: '/Report',
      component: require('@/pages/Main/Report.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login.vue')
    },
    {
      path: '/start',
      component: require('@/pages/Search/Start.vue')
    },
    {
      path: '/startA',
      component: require('@/pages/Search/StartA.vue')
    },
    {
      path: '/startR',
      component: require('@/pages/Search/StartR.vue')
    },
    {
      path: '/aboutfishingdetail/:id',
      name: 'aboutfishingdetail',
      component: require('@/pages/Main/Detail.vue')
    },
    {
      path: '/applyed/:id',
      name: 'applyed',
      component: require('@/pages/Main/Applyed.vue')
    },
    {
      path: '/commentdetail/:objid/:id/:cateid/:is_zan',
      name: 'commentdetail',
      component: require('@/components/commentdetail.vue')
    },
    {
      path: '/publishvideo',
      name: 'publishvideo',
      component: require('@/components/publishvideo.vue')
    },
    {
      path: '/comment/:objid/:cateid',
      name: 'comment',
      component: require('@/components/comment.vue')
    },
    {
      path: '/navMap/:name/:addr/:lat/:lng',
      name: 'navMap',
      component: require('@/components/navMap.vue')
    },
    {
      path: '/readInfo',
      name: 'userAgreement',
      component: require('@/components/userAgreement.vue')
    },
    {
      path: '/reply/:objid/:cateid/:userid/:pid',
      name: 'reply',
      component: require('@/components/Reply.vue')
    },
    {
      path: '/cityFishAssociation/:id',
      name: 'cityFishAssociation',
      component: require('@/pages/Fishassociation/cityFishAssociation.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: require('@/components/weather.vue')
    }

  ]
})
