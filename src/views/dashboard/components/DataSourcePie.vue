<template>
  <div id="data-source" style="width:100%; height:100%"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: 'dataSourcePie',
    data() {
      return {
        dataSourcePie: null,
      }
    },
    methods: {
      drawView() {

        this.dataSourcePie = echarts.init(document.getElementById('data-source'));

        this.dataSourcePie.setOption(
          {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'right',
              data: ['ios', 'android', 'pc', 'web', 'others']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '66%',
                center: ['50%', '60%'],
                data: [
                  {value: 2103456, name: 'ios', itemStyle: {normal: {color: '#9bd598'}}},
                  {value: 1305923, name: 'android', itemStyle: {normal: {color: '#ffd58f'}}},
                  {value: 543250, name: 'pc', itemStyle: {normal: {color: '#abd5f2'}}},
                  {value: 798403, name: 'web', itemStyle: {normal: {color: '#ab8df2'}}},
                  {value: 302340, name: 'others', itemStyle: {normal: {color: '#e14f60'}}}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        )
      }
    },
    mounted() {
      this.drawView();
      window.addEventListener('resize', function () {
        this.dataSourcePie.resize();
      });
    },
    beforeDestroy() {
      if (!this.dataSourcePie) {
        return
      }
      this.dataSourcePie.dispose()
      this.dataSourcePie = null
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
