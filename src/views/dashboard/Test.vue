<template>
  <div>
    <div>
      <card
        id-name="card-1"
        color="#64D572"
        :end-val=user
        iconType="eye"
        content="今日浏览量"
      ></card>
    </div>
    <div>
      <card
        id-name="card-2"
        color="#64D572"
        :end-val=visit
        iconType="eye"
        content="今日浏览量-2"
      ></card>
    </div>
  </div>
</template>

<script>

  import Card from '@/components/card'

  export default {
    name: 'Test',
    components: {
      Card
    },
    data() {
      return {
        user: 496,
        visit: 3264
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
