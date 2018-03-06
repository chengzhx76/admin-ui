<template>
  <div id="visiter-volume" style="width:100%; height:100%"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: 'visiterVolume',
    data() {
      return {
        visiterVolumeView: null,
      }
    },
    props: {
      visiterVolume: Array
    },
    methods: {
      drawView() {

        this.visiterVolumeView = echarts.init(document.getElementById('visiter-volume'))

        let xAxisData = [];
        let data1 = [];
        let data2 = [];
        for (let i = 0; i < 20; i++) {
          xAxisData.push('类目' + i);
          data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
          data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }

        this.visiterVolumeView.setOption(
          {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              top: 0,
              left: '2%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              nameTextStyle: {
                color: '#c3c3c3'
              }
            },
            series: [
              {
                name: '访问量',
                type: 'bar',
                data: this.visiterVolume
              }
            ]
          }
        )
      }
    },
    mounted() {
      this.drawView();
      let _this = this
      window.addEventListener('resize', function () {
        _this.visiterVolumeView.resize();
      });
    },
    beforeDestroy() {
      if (!this.visiterVolumeView) {
        return
      }
      this.visiterVolumeView.dispose()
      this.visiterVolumeView = null
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
