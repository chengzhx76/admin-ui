<template>
  <div class="user">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card class="user-box">
          <el-row class="user-info">
            <el-col :span="8" class="avatar">
              <img class="avatar-img" :src="avatar" />
            </el-col>
            <el-col :span="16" class="name">
              <strong class="real-name">{{ name }}</strong>
              <p class="username">{{ username }}</p>
            </el-col>
          </el-row>
          <div class="line-gray"></div>
          <div class="last-login-time">
            <span class="text">上次登录时间：</span>
            <em class="time">2018.2.27-15:12:02</em>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="15">
          <el-col :span=6>
            <card
              id-name="card-1"
              color="#64D572"
              iconType="eye"
              :iconSize=30
              :endVal=20000
              :countSize=30
              :countWeight=700
              content="今日浏览量"
            ></card>
          </el-col>
          <el-col :span=6>
            <card
              id-name="card-2"
              color="#2d8cf0"
              iconType="peoples"
              :iconSize=30
              :endVal=300000
              :countSize=30
              :countWeight=700
              content="今日新增用户"
            ></card>
          </el-col>
          <el-col :span=6>
            <card
              id-name="card-3"
              color="#FFD572"
              iconType="chart"
              :iconSize=30
              :endVal=20000
              :countSize=30
              :countWeight=700
              content="今日数据采集量"
            ></card>
          </el-col>
          <el-col :span=6>
            <card
              id-name="card-4"
              color="#F25E43"
              iconType="example"
              :iconSize=30
              :endVal=20000
              :countSize=30
              :countWeight=700
              content="今日服务调用量"
            ></card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CountUp from '@/components/countUp'
  import Card from '@/components/card'

  export default {
    name: 'home',
    components: {
      CountUp,
      Card
    },
    computed: {
      ...mapGetters([
        'username',
        'name',
        'avatar'
      ])
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .user-info {
    display:flex;
    align-items:center;
    .avatar {
      .avatar-img {
        width: 100%;
        max-width: 100px;
        height: auto;
        border-radius: 3px;
      }
    }
    .name {
      padding-left: 10px;
      .real-name {
        height: 30px;
        line-height: 30px;
        display: block;
        font-size: 20px;
        color: #2F8DF0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .username {
        height: 20px;
        line-height: 20px;
        margin: 0;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .last-login-time {
    font-size: 15px;
    color: #909399;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .time {
      font-style: normal;
    }
  }

  .line-gray{
    height: 0;
    border-bottom: 2px solid #dcdcdc;
    margin: 10px 0;
  }
</style>
