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
    text: '上海各区路名和省份地名桑基图'
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
    this.$axios.get(process.env.ROOT_API + '/place/relatedprovinces/').then((response) => {
      var links = response.data
      var nodes = []
      var nameSet = []
      for (var i = 0; i < links.length; i++) {
        var source = links[i].source
        var target = links[i].target
        if (nameSet.indexOf(source) === -1) {
          nameSet.push(source)
        }
        if (nameSet.indexOf(target) === -1) {
          nameSet.push(target)
        }
      }
      for (var j = 0; j < nameSet.length; j++) {
        nodes.push({
          'name': nameSet[j]
        })
      }
      option['series'][0]['data'] = nodes
      option['series'][0]['links'] = links
      console.log(option)
      this.chart.setOption(option)
    })
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
  height: 660px;
}
</style>
