<template>
  <div class="sidebar">
    <logo></logo>
    <scroll-bar>
      <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse"
               background-color="#495060" text-color="#bfcbd9" active-text-color="#409EFF">
        <sidebar-item :menus="menus"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Logo from './Logo'
import ScrollBar from '@/components/scrollBar'

export default {
  components: {
    SidebarItem,
    Logo,
    ScrollBar
  },

  computed: {
    ...mapGetters([
      'menus',
      'sidebarOpened'
    ]),
    isCollapse() {
      return !this.sidebarOpened
    }
  }
}
</script>
