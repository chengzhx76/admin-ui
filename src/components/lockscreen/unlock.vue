<template>
  <transition name="show-unlock">
    <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">

      <div @click="handleClickAvatar" class="unlock-avatar-con" :style="{marginLeft: avatarLeft}">
        <img class="unlock-avatar-img" :src="avatar">
        <div class="unlock-avatar-cover">
          <span>
            <i class="el-icon-view"></i>
          </span>
          <p>解锁</p>
        </div>
      </div>

      <div class="unlock-avatar-under-back" :style="{marginLeft: avatarLeft}"></div>
      <div class="unlock-input-con">
        <div class="unlock-input-overflow-con">
          <div class="unlock-overflow-body" :style="{right: inputLeft}">
            <input ref="inputEle" v-model="password" class="unlock-input" type="password" placeholder="密码同登录密码"/>
            <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock"
                    class="unlock-btn">
              <i class="el-icon-view"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="unlock-locking-tip-con">已锁定</div>
    </div>
  </transition>
</template>

<script>
  import Cookies from 'js-cookie';

  export default {
    name: 'Unlock',
    data() {
      return {
        avatarLeft: '150px',
        inputLeft: '400px',
        password: '',
        check: null
      };
    },
    props: {
      showUnlock: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      avatar() {
        return this.$store.getters.avatar
      }
    },
    methods: {
      validator() {
        return true; // 你可以在这里写密码验证方式，如发起ajax请求将用户输入的密码this.password与数据库用户密码对比
      },
      handleClickAvatar() {
        this.avatarLeft = '0';
        this.inputLeft = '0';
        this.$refs.inputEle.focus();
      },
      handleUnlock() {
        if (this.validator()) {
          this.avatarLeft = '0px';
          this.inputLeft = '400px';
          this.password = '';
          Cookies.set('locking', '0');
          this.$emit('on-unlock');
        } else {
//          $Message.error('密码错误,请重新输入。如果忘了密码，清除浏览器缓存重新登录即可，这里没有做后端验证');
          this.$notify({
            title: '警告',
            message: '密码错误,请重新输入。',
            type: 'warning'
          });
        }
      },
      unlockMousedown() {
        this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn';
      },
      unlockMouseup() {
        this.$refs.unlockBtn.className = 'unlock-btn';
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .unlock-body-con{
    position: absolute;
    width: 400px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -200px;
    transform-origin: center center;
    z-index: 10;

    .unlock-avatar-con {
      position: relative;
      float: left;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid white;
      cursor: pointer;
      transition: all .5s;
      box-shadow: 0 0 10px 2px rgba(255, 255, 255, .3);

      .unlock-avatar-img {
        width: 100%;
        height: 100%;
      }

      .unlock-avatar-cover {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
        opacity: 0;
        transition: opacity .2s;
        color: white;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;

        span{
          display: block;
          margin-top: 16px;
          text-align: center;
          font-size: 24px;
        }
        p{
          text-align: center;
          font-size: 16px;
          font-weight: 500;
        }
      }
      &:hover .unlock-avatar-cover{
        opacity: 1;
        transition: opacity .2s;
      }
    }

    .unlock-avatar-under-back {
      position: absolute;
      left: 5px;
      top: 0;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #667aa6;
      transition: all .5s;
      z-index: -10;
    }

    .unlock-input-con{
      z-index: -999;
      height: 70px;
      width: 310px;
      position: absolute;
      top: 15px;
      left: 90px;
      .unlock-input-overflow-con {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .unlock-overflow-body {
          width: 100%;
          height: 100%;
          transition: all .5s ease .5s;
          position: absolute;
          top: 0;
          right: 0;
          .unlock-input{
            float: left;
            display: block;
            box-sizing: content-box;
            height: 22px;
            width: 200px;
            font-size: 18px;
            outline: none;
            padding: 11px 10px 11px 20px;
            border: 2px solid #e2ddde;
            margin-top: 11px;
          }
          .unlock-btn{
            float: left;
            display: block;
            height: 48px;
            font-size: 20px;
            padding: 7px 26px;
            cursor: pointer;
            border-radius: 0 25px 25px 0;
            border: 2px solid #e2ddde;
            border-left: none;
            background: #2d8cf0;
            outline: none;
            transition: all .2s;
            margin-top: 11px;
            color: #ffffff;
            &:hover{
              background: #5cadff;
              box-shadow: 0 0 10px 3px rgba(255, 255, 255, .2);
            }
          }
          .click-unlock-btn{
            background: #2b85e4 !important;
          }
        }
      }
    }
    .unlock-locking-tip-con{
      width: 100px;
      height: 30px;
      text-align: center;
      position: absolute;
      left: 50%;
      margin-left: -50px;
      bottom: -80px;
      color: white;
      font-size: 18px;
    }
  }
  @keyframes unlock-in{
    0% {
      transform: scale(0);
    }
    80%{
      transform: scale(0);
    }
    88% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes unlock-out{
    0% {
      transform: scale(1);
    }
    60%{
      transform: scale(1.2);
    }
    100% {
      transform: scale(0);
    }
  }
  .show-unlock-enter-active{
    animation: unlock-in 1.4s ease;
  }
  .show-unlock-leave-to{
    opacity: 0;
  }
  .show-unlock-leave-active{
    transition: opacity .2s;
  }
</style>
