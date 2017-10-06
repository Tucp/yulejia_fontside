<template lang="html">

</template>

<script>
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'waits'
    ])
  },
  methods: {
    show() {
      Toast({
        message: '开发中...',
        position: 'middle',
        duration: 1500
      })
    }
  }
}
</script>

<style lang="css" scoped>
.wait {
  padding: .27777777rem 0;
  border-bottom: 1px solid #f0f0f0;
  height: 1.8185185rem;
  overflow: hidden;
}

.wait-item {
  width: 25%;
  float: left;
  text-align: center;
  color: #727171;
}

.wait-item img {
  height: .648148148rem;
  width: .648148148rem;
  margin-bottom: .185185185rem;
}
</style>
