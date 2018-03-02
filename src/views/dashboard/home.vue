<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="8"> <!-- 用户、特点 -->
        <el-row style="margin-bottom: 10px">
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
        </el-row>
        <el-row>
          <el-card :bodyStyle="{padding: 0, marginLeft: '20px', height: '230px'}">
            <div slot="header">
              <i class="el-icon-info"></i>
              <span>特点</span>
            </div>
            <ul class="feature">
              <li>1. 去中心化（Decentralized）</li>
              <li>2. 去信任（Trustless）</li>
              <li>3. 集体维护（Collectively Maintain）</li>
              <li>4. 可靠数据库（Reliable Database）</li>
            </ul>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="16"> <!-- 卡片、分布图 -->
        <el-row :gutter="15" style="margin-bottom: 10px">
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
        <el-row>
          <el-card>
            <div slot="header">
              <i class="el-icon-info"></i>
              <span>节点地理分布</span>
            </div>
            <el-row :gutter="20">
              <el-col :span="10">
                <map-data-table :nodes=nodes></map-data-table>
              </el-col>
              <el-col :span="14">
                <node-map :cityData=nodes></node-map>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="15" style="margin-top: 10px">
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <i class="el-icon-info"></i>
            <span>接口调用量</span>
          </div>
          <div class="data-source-row">
            <visiter-volume :visiter-volume=visiterVolume></visiter-volume>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <i class="el-icon-info"></i>
            <span>不同链交易占比</span>
          </div>
          <div class="data-source-row">
            <data-source-pie></data-source-pie>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <i class="el-icon-info"></i>
            <span>物理占用量</span>
          </div>
          <div class="data-source-row">
            <user-flow></user-flow>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <i class="el-icon-info"></i>
            <span>请求量</span>
          </div>
          <div class="data-source-row">
            <service-request></service-request>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CountUp from '@/components/countUp'
  import Card from '@/components/card'
  import MapDataTable from './components/MapDataTable'
  import NodeMap from './components/NodeMap'
  import VisiterVolume from './components/visiterVolume'
  import DataSourcePie from './components/DataSourcePie'
  import UserFlow from './components/UserFlow'
  import ServiceRequest from './components/ServiceRequest'

  export default {
    name: 'home',
    components: {
      CountUp,
      Card,
      MapDataTable,
      NodeMap,
      VisiterVolume,
      DataSourcePie,
      UserFlow,
      ServiceRequest
    },
    computed: {
      ...mapGetters([
        'username',
        'name',
        'avatar'
      ])
    },
    data() {
      return {
        nodes: [{
          city: '北京',
          number: '5',
        }, {
          city: '厦门',
          number: '1',
        }, {
          city: '上海',
          number: '2',
        }],
        visiterVolume: [
          {value: 453682, name: '周一'},
          {value: 879545, name: '周二'},
          {value: 2354678, name: '周三'},
          {value: 1598403, name: '周四'},
          {value: 543250, name: '周五'},
          {value: 1305923, name: '周六'},
          {value: 1103456, name: '周日'}
        ]
      }
    }
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

  .feature {
    height: 100%;
    overflow:auto;
    font-size: 14px;
    li {
      height: 30px;
      line-height: 30px;
    }
  }
  .data-source-row {
    height: 200px;
  }

</style>
