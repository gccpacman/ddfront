<template>
  <div class="container">
    <v-chart class="my-chart" :options="bar"/>
  </div>
</template>

<script>

export default {
  name: 'EChartsDemo',
  methods: {
  },
  created () {
  },
  data () {
    return {
      bar: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.my-chart {
  width: 100%;
  height: 500px;
}
</style>
