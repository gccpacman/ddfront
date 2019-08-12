<template>
  <div class='container'>
    <div ref='chart' id='chart'></div>
  </div>
</template>

<script>
import echarts from 'echarts'

var option = {
  legend: {},
  tooltip: {
    trigger: 'axis',
    showContent: false
  },
  dataset: {
    source: [
      [
        '城区',
        '浦东新区',
        '黄浦区',
        '徐汇区',
        '普陀区',
        '长宁区',
        '闵行区',
        '虹口区',
        '静安区'
      ],
      ['人名', 15, 3, 0, 0, 0, 0, 1, 0],
      ['建筑物', 1, 16, 2, 0, 1, 0, 0, 0],
      ['山川湖海', 7, 14, 5, 7, 3, 0, 7, 4],
      ['植物', 5, 2, 1, 1, 0, 2, 0, 0]
    ]
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      interval: 0,
      formatter: function (value) {
        var ret = ''
        var maxLength = 2
        var valLength = value.length
        var rowN = Math.ceil(valLength / maxLength)
        if (rowN > 1) {
          for (var i = 0; i < rowN; i++) {
            var temp = ''
            var start = i * maxLength
            var end = start + maxLength
            temp = value.substring(start, end) + '\n'
            ret += temp
          }
          return ret
        } else {
          return value
        }
      }
    }
  },
  yAxis: { gridIndex: 0 },
  grid: { top: '45%' },
  series: [
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    { type: 'line', smooth: true, seriesLayoutBy: 'row' },
    {
      type: 'pie',
      id: 'pie',
      radius: '30%',
      center: ['50%', '25%'],
      label: {
        formatter: '{b}: {@2012} ({d}%)'
      },
      encode: {
        itemName: '城区',
        value: '2012',
        tooltip: '2012'
      }
    }
  ]
}

export default {
  name: 'RelatedPlaceSankey',
  methods: {
    updateAxisPointer (event) {
      var xAxisInfo = event.axesInfo[0]
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1
        this.chart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        })
      }
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption(option)
    this.chart.on('updateAxisPointer', this.updateAxisPointer)
  },
  data () {
    return {
      chart: echarts.ECharts
    }
  }
}
</script>

<style scoped>
#chart {
  width: 100%;
  height: 500px;
}
</style>
