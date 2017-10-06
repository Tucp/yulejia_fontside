<template lang="html">
  <div class="index">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <y-footer></y-footer>
    <div id="allmap"></div>
  </div>
</template>
<script>
  import Footer from '@/components/Footer.vue'
  export default {
    components: {
      'y-footer': Footer
    },
    mounted() {

    },
    methods: {

    }
  }

</script>

<style lang="css" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter,
  .fade-leave-to
  {
    opacity: 0;
  }
</style>