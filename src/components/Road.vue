<template>
  <section>
    <div class="container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">{{ place_name }}</a></li>
          <li class="is-active"><a href="#">{{ name_chs }}</a></li>
        </ul>
      </nav>
    </div>
    <section class="hero is-info is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ name_chs }}
          </h1>
          <h2 class="subtitle">
            {{ place_name }}
          </h2>
        </div>
      </div>
    </section>
    <div class="container">
      <div ref="map" class="map"></div>
    </div>
    <article v-if="des" class="message is-small is-dark">
      <div class="message-body">
        <p>{{ des }}</p>
      </div>
    </article>
  </section>
</template>

<script>

import echarts from 'echarts'
import 'echarts/extension/bmap/bmap'

var bmapOptions = {
  // backgroundColor: '#404a59',
  animation: false,
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return params.name
    }
  },
  bmap: {
    center: [121.444337, 31.210335],
    zoom: 16,
    roam: true
  },
  series: []
}

export default {
  name: 'Road',
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
    },
    clickScatter (params) {
      this.$router.push({name: 'Architecture', params: { id: params.data.id }})
    }
  },
  mounted () {
    console.log('hello road')
    this.$axios.get(process.env.ROOT_API + '/road/' + this.$route.params.id).then((response) => {
      this.name_chs = response.data.name_chs
      this.des = response.data.des2
      this.place_name = response.data.place_name2
      if (Object.entries(response.data.center_bmap).length !== 0 || response.data.center_bmap.constructor !== Object) {
        this.has_map = true
        bmapOptions['bmap']['center'] = [response.data.center_bmap.lng, response.data.center_bmap.lat]
        var roadPolylineList = response.data.polylines_bmap
        for (var i = 0; i < roadPolylineList.length; i++) {
          var polyline = []
          for (var j = 0; j < roadPolylineList[i].length; j++) {
            polyline.push([roadPolylineList[i][j].lng, roadPolylineList[i][j].lat])
          }
          bmapOptions['series'].push({
            name: 'road_lines',
            type: 'lines',
            coordinateSystem: 'bmap',
            lineStyle: {
              normal: {
                color: 'blue',
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)',
                shadowBlur: 5,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                opacity: 0.7,
                width: 2
              }
            },
            polyline: true,
            data: [{
              'name': this.name_chs,
              'coords': polyline
            }]
          })
        }
        var archItems = response.data.road_architecture
        var archList = []
        if (archItems && archItems.length > 0) {
          for (var k = 0; k < archItems.length; k++) {
            archList.push({
              'id': archItems[k]._id,
              'name': archItems[k].name_chs,
              'des2': archItems[k].des2,
              'value': [archItems[k].longitude, archItems[k].latitude]
            })
          }
        }
        bmapOptions['series'].push({
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: archList,
          hoverAnimation: true,
          symbolSize: 10,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: 'yellow',
              borderColor: '#000',
              borderWidth: 1,
              borderType: 'solid',
              shadowBlur: 10,
              shadowColor: 'yellow'
            }
          }
        })
        console.log(bmapOptions)
        this.chart = echarts.init(this.$refs.map)
        this.chart.setOption(bmapOptions)
        this.bmap = this.chart.getModel().getComponent('bmap').getBMap()
        this.bmap.setMinZoom(14) // 设置地图最小缩放比例
        this.bmap.setMaxZoom(20) // 设置地图最大缩放比例
        this.chart.on('click', this.clickScatter)
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  data () {
    return {
      chart: echarts.ECharts,
      bmap: {},
      has_map: false,
      name_chs: '',
      des: '',
      place_name: ''
    }
  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 350px;
  }
</style>
