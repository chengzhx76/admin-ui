<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' :class="['tags-view-item', {'active' : isActive(tag)}]" v-for="tag in Array.from(visitedViews)"
        :to="tag.path" :key="tag.path">
        {{tag.title}}
        <span v-if="isNotHome(tag)" class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu'>
      <dropdown @closeOthers="closeOthersTags" @closeAll="closeAllTags"></dropdown>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/scrollPane'
import Dropdown from '@/components/dropdown'

export default {
  components: {
    ScrollPane,
    Dropdown
  },
  data() {
    return {
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.app.visitedViews
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    isNotHome(route) {
      return route.name !== 'dashboard_home'
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      const selectedTag = this.generateRoute()
      if (!selectedTag) {
        return false
      }
      this.$store.dispatch('delOthersViews', selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  position: relative;
  .tags-view-wrapper {
    background: #F0F0F0;
    height: 40px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 30px;
      line-height: 30px;
      border: 1px solid #e9eaec;
      border-radius: 3px;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin: 5px 3px;
      &:first-of-type {
        margin-left: 10px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        border-radius: 2px;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    z-index: 999;
  }

  .contextmenu {
    margin: 0;
    padding: 0;
    height: 39px;
    width: 110px;
    background: #ffffff;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  }

}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
