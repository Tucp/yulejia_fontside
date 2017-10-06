<template lang="html">
  <div class="footer">
    <button @click="chat">私信TA</button>
    <button>关注TA</button>
  </div>
</template>

<script>
export default {
  methods: {
    chat () {
      this.$router.push('/chat')
    }
  }
}
</script>

<style lang="css" scoped>
.footer {
  height: 1.3888888889rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 .416666667rem;
  z-index: 999;
  background-color: #f0f0f0;
  padding-top: .277777778rem;
}
.footer button {
  width: 4.4444444rem;
  height: 1.11111111rem;
  font-size: .407407407rem;
  border: 1px solid #f39800;
  border-radius: 3px;
}
.footer button:first-child {
  float: left;
  background-color: #f39800;
  color: #fff;
}
.footer button:last-child {
  float: right;
  background-color: #f0f0f0;
  color: #f39800;
}
</style>
