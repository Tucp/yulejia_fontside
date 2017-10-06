const state = {
  cells: [
    { id: 0, src: 'static/images/coupon.png', name: '优惠券', path: '/set' },
    { id: 1, src: 'static/images/address.png', name: '收货管理', path: '/set' },
    { id: 2, src: 'static/images/fish.png', name: '我的钓场', path: '/myfishfield' },
    { id: 3, src: 'static/images/race.png', name: '我的赛事', path: '/myrace' },
    { id: 4, src: 'static/images/collection.png', name: '我的收藏', path: '/mycollection' },
    { id: 5, src: 'static/images/draft.png', name: '草稿箱', path: '/draft' },
    { id: 6, src: 'static/images/sets.png', name: '设置', path: '/set' }
  ]
}

const getters = {
  cells: state => state.cells
}

export default {
  state,
  getters
}
