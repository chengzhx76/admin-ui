<template>
  <div id="user-flow" style="width:100%; height:100%"></div>
</template>

<script>
  import echarts from 'echarts';

  const option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: '磁盘量',
        type: 'gauge',
        min: 0,
        max: 100,
        detail: {
          formatter: '{value}%',
          fontSize: 18,
          offsetCenter: [0, '50px']
        },
        data: [{value: 50, name: '磁盘占用量'}],
        center: ['25%', '50%'],
        radius: '80%',
        title: {
          offsetCenter: [0, '80px']
        },
        axisLine: {
          lineStyle: {
            // color: [],
            width: 20
          }
        },
        splitLine: {
          length: 20
        }
      },
      {
        name: '内存量',
        type: 'gauge',
        min: 0,
        max: 100,
        detail: {
          formatter: '{value}%',
          fontSize: 18,
          offsetCenter: [0, '50px']
        },
        data: [{value: 50, name: '内存占用量'}],
        center: ['75%', '50%'],
        radius: '80%',
        title: {
          offsetCenter: [0, '80px']
        },
        axisLine: {
          lineStyle: {
            // color: [],
            width: 20
          }
        },
        splitLine: {
          length: 20
        }
      }
    ]
  };

  export default {
    name: 'userFlow',
    data() {
      return {
        userFlow: null,
      }
    },
    methods: {
      drawView() {
//        setInterval(function (){
          this.userFlow = echarts.init(document.getElementById('user-flow'));
          option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
          option.series[1].data[0].value = (Math.random()*100).toFixed(2) - 0;
          this.userFlow.setOption(option, true)
//        }, 3000);
      }
    },
    mounted() {
      this.drawView();
      let _this = this
      window.addEventListener('resize', function () {
        _this.userFlow.resize();
      });
    },
    beforeDestroy() {
      if (!this.userFlow) {
        return
      }
      this.userFlow.dispose()
      this.userFlow = null
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
