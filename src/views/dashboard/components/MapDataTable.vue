<template>
  <el-table
    :data="nodes"
    height="250"
    border
    stripe
    :header-cell-style="{background: '#F8F8F9', color: '#495060'}"
    style="width: 100%">
    <el-table-column
      prop="city"
      label="城市"
      width="auto">
    </el-table-column>
    <el-table-column
      prop="number"
      label="节点数"
      width="auto">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'MapDataTable',
    props: {
      nodes: Array
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
