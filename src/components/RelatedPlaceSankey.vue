<template>
  <div class="container">
    <div ref="chart" id="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

var data = {
  'nodes': [
    {'name': "Agricultural 'waste'"},
    {'name': 'Bio-conversion'},
    {'name': 'Liquid'},
    {'name': 'Science'}
  ],
  'links': [
    {'source': "Agricultural 'waste'", 'target': 'Liquid', 'value': 124.729},
    {'source': 'Bio-conversion', 'target': 'Liquid', 'value': 44.597},
    {'source': 'Science', 'target': 'Liquid', 'value': 23.597}
  ]
}

var option = {
  title: {
    text: 'Sankey Diagram'
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'sankey',
      data: data.nodes,
      links: data.links,
      focusNodeAdjacency: 'allEdges',
      itemStyle: {
        normal: {
          borderWidth: 1,
          borderColor: '#aaa'
        }
      },
      lineStyle: {
        normal: {
          color: 'source',
          curveness: 0.5
        }
      }
    }
  ]
}

export default {
  name: 'RelatedPlaceSankey',
  methods: {
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption(option)
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
