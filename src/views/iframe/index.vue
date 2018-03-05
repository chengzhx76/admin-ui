<template>
  <iframe :src='$route.query.src' class="iframe" ref="iframe" v-loading.fullscreen.lock="fullscreenLoading"></iframe>
</template>

<script>
  export default {
    name: 'iframe',
    data() {
      return {
        fullscreenLoading: false,
      }
    },
    created() {
      this.fullscreenLoading = true
    },
    mounted() {
      this.iframeInit()
      window.onresize = () => {
        this.iframeInit()
      }
    },
    methods: {
      iframeInit() {
        const iframe = this.$refs.iframe
        const clientHeight = document.documentElement.clientHeight - 130
        iframe.style.height = `${clientHeight}px`
        if (iframe.attachEvent) {
          iframe.attachEvent('onload', () => {
            this.fullscreenLoading = false
          })
        } else {
          iframe.onload = () => {
            this.fullscreenLoading = false
          }
        }
      }
    }
  }
</script>

<style>
  .iframe {
    width: 100%;
    height: 100%;
    border: 0;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
