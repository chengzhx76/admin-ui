<template>
  <div class="sidebar-logo">
    <img v-show="sidebarOpened" class="max-logo" src="../../../../assets/logo.jpg" key="max-logo"/>
    <img v-show="!sidebarOpened" class="min-logo" src="../../../../assets/logo-min.jpg" key="min-logo"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'logo',
    computed: {
      ...mapGetters([
        'sidebarOpened'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/variables.scss";
  .sidebar-logo {
    text-align: center;
    padding: 8px 0;
    background-color: $menuBg;
    overflow: hidden;
    .max-logo {
      height: 44px;
      width: 160px;
    }
    .min-logo {
      height: 30px;
      width: 30px;
    }
  }
</style>
