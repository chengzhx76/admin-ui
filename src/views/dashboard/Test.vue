<template>
  <el-card class="box-card">
    <el-row class="height-100-ratio">
      <el-col :span=8 class="height-100-ratio" :style="{backgroundColor: color, color: 'white'}">
        <el-row class="height-100-ratio" type="flex" align="middle" justify="center">
          <svg-icon :icon-class="iconType" :style="{fontSize: iconSize + 'px'}"/>
        </el-row>
      </el-col>
      <el-col :span=8 class="height-100-ratio">
        <el-row class="height-100-ratio" type="flex" align="middle" justify="center">
          <count-up
            class="user-card-count"
            id-name="user_created_count"
            :end-val=endVal
            :color=color
            :countSize="countSize"
            :countWeight="countWeight">
            <p class="desc-text" slot="text">{{ content }}</p>
          </count-up>
        </el-row>
      </el-col>
      <el-col :span=8 class="height-100-ratio">
        <el-row class="height-100-ratio" type="flex" align="middle" justify="center">
          <count-up
            class="user-card-count"
            id-name="user_created_count"
            :end-val=endVal
            :color=color
            :countSize="countSize"
            :countWeight="countWeight">
            <p class="desc-text" slot="text">{{ content }}</p>
          </count-up>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

  import CountUp from '@/components/countUp'

  export default {
    name: 'Test',
    components: {
      CountUp
    },
    data() {
      return {
        color: '#2d8cf0',
        iconType: 'peoples',
        iconSize: 30,
        endVal: 20000,
        countSize: 30,
        countWeight: 700,
        content: "今日新增用户"
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-card__body {
    padding: 0 !important;
    height: 100%;
  }

  .box-card {
    height: 100px;
    .height-100-ratio {
      height: 100%;
    }
    .desc-text {
      font-size:12px;
      font-weight:500;
      color:#C8C8C8;
      margin-top: 8px;
    }
  }
</style>
