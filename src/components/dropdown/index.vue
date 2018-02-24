<template>
  <div id="dropdown-menu" class="dropdown">
    <a href="javascript:;" :class="[{'hover' : show}, 'title']" @click="show = !show">
      标签选项
      <i :class="show ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
    </a>
    <transition name="fade">
      <ul class="menu" v-show="show">
        <li><a href="javascript:;" @click="closeOthersTags">关闭其他</a></li>
        <li><a href="javascript:;" @click="closeAllTags">关闭全部</a></li>
      </ul>
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'dropdown',
    data() {
      return {
        show: false
      }
    },
    watch: {
      show(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    methods: {
      closeMenu() {
        this.show = false
      },
      closeOthersTags() {
        this.$emit("closeOthers")
      },
      closeAllTags() {
        this.$emit("closeAll")
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  a {
    text-decoration: none;
    color: #2d2f33;
  }
  a:hover {
    color: #2d2f33;
  }
  .dropdown {
    height: 24px;
    width: 80px;
    margin-top: 8px;
    margin-left: 4px;
    .title {
      height: 100%;
      width: 100%;
      background: #2D8CF0;
      display: block;
      text-align: center;
      line-height: 26px;
      margin-left: 10px;
      color: #ffffff;
      border-radius: 3px;
      font-size: 13px;
    }
    .title:hover {
      color: #ffffff;
      background-color: #57A3F3;
    }
    .hover {
      background-color: #57A3F3;
    }
    .menu {
      width: 95px;
      text-align: center;
      background: #ffffff;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      border-radius: 4px;
      overflow: auto;
      margin: 5px 0;
      padding: 5px 0;
      li {
        height: 28px;
        line-height: 28px;
        list-style: none;
        font-size: 14px;
        a {
          height: 100%;
          display: block;
        }
        a:hover {
          background: #F3F3F3;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
