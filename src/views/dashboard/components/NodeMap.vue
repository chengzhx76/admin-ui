<template>
  <div id="nodes-map" style="width:100%; height: 250px;"></div>
</template>

<script>
  import echarts from 'echarts';
  import 'echarts/map/js/china'
  import geoData from './coordinate';

  export default {
    name: 'NodeMap',
    data() {
      return {
        nodesChartMap: null
      }
    },
    props: {
      cityData: Array
    },
    methods: {
      drawNodesChartMap() {

        var convertData = function (data) {
          let res = [];
          let len = data.length;
          for (var i = 0; i < len; i++) {
            var geoCoord = geoData[data[i].city];
            if (geoCoord) {
              res.push({
                name: data[i].city,
                value: geoCoord.concat(data[i].number)
              });
            }
          }
          return res;
        };

        this.nodesChartMap = echarts.init(document.getElementById('nodes-map'))
        this.nodesChartMap.setOption(
          {
            backgroundColor: '#FFF',
            title: {
              text: '节点分布图',
              subtext: '全国节点分布图',
              left: 'left',
              textStyle: {
                color: '#409EFF'
              }
            },
            geo: {
              map: 'china',
              label: {
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  areaColor: '#EFEFEF',
                  borderColor: '#CCC'
                },
                emphasis: {
                  areaColor: '#E5E5E5'
                }
              }
            },
            grid: {
              top: 0,
              left: '2%',
              right: '2%',
              bottom: '0',
              containLabel: true
            },
            series: [{
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(this.cityData),
              symbolSize: function (val) {
//                return val[2] / 10;
                return val[2] * 3;
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#0099CC'
                }
              }
            }]
          }
        )
      }
    },
    mounted() {
      this.drawNodesChartMap();
      let _this = this
      window.addEventListener('resize', function () {
        _this.nodesChartMap.resize();
      });
    },
    beforeDestroy() {
      if (!this.nodesChartMap) {
        return
      }
      this.nodesChartMap.dispose()
      this.nodesChartMap = null
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
