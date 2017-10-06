const state = {
  waits: [
    { id: 0, src: 'static/images/payment.jpg', name: '待付款' },
    { id: 1, src: 'static/images/ship.jpg', name: '待发货' },
    { id: 2, src: 'static/images/receipt.jpg', name: '待收货' },
    { id: 3, src: 'static/images/evaluation.jpg', name: '待评价' }
  ]
}

const getters = {
  waits: state => state.waits
}

export default {
  state,
  getters
}
