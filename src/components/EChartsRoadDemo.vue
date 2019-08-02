<template>
  <div class="container">
    <div ref="map" class="map"></div>
  </div>
</template>

<script>

import echarts from 'echarts'
import 'echarts/extension/bmap/bmap'

var polylinePathList = []

var bmapOptions = {
  // backgroundColor: '#404a59',
  animation: false,
  title: {
    text: '上海马路',
    subtext: '',
    sublink: '',
    left: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  bmap: {
    center: [121.444337, 31.210335],
    zoom: 10,
    roam: true,
    mapStyle: {
      styleJson: [
        {
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#044161'
          }
        },
        {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'geometry',
          stylers: {
            color: '#064f85'
          }
        },
        {
          featureType: 'railway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry.fill',
          stylers: {
            color: '#005b96',
            lightness: 1
          }
        },
        {
          featureType: 'highway',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry',
          stylers: {
            color: '#004981'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#00508b'
          }
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'green',
          elementType: 'all',
          stylers: {
            color: '#056197',
            visibility: 'off'
          }
        },
        {
          featureType: 'subway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'manmade',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'local',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'geometry.fill',
          stylers: {
            color: '#029fd4'
          }
        },
        {
          featureType: 'building',
          elementType: 'all',
          stylers: {
            color: '#1a5787'
          }
        },
        {
          featureType: 'label',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        }
      ]
    }
  },
  series: [
    {
      name: 'road_lines',
      type: 'lines',
      coordinateSystem: 'bmap',
      lineStyle: {
        normal: {
          color: 'yellow',
          opacity: 0.6,
          width: 3
        }
      },
      polyline: true,
      data: polylinePathList
    }
  ]
}

export default {
  name: 'EChartsRoadDemo',
  components: {
  },
  methods: {
    initMap () {
      this.axios.get(process.env.ROOT_API + '/roads/polylines/').then((response) => {
        var roadPolylineList = response.data
        for (var k = 0; k < roadPolylineList.length; k++) {
          var resPolylineList = roadPolylineList[k].polylines
          for (var i = 0; i < resPolylineList.length; i++) {
            var polyline = []
            for (var j = 0; j < resPolylineList[i].length; j++) {
              polyline.push([resPolylineList[i][j].lng, resPolylineList[i][j].lat])
            }
            polylinePathList.push({
              'name': roadPolylineList[k].road_name,
              'coords': polyline
            })
          }
        }
        this.chart = echarts.init(this.$refs.map)
        this.chart.setOption(bmapOptions)
        this.bmap = this.chart.getModel().getComponent('bmap').getBMap()
        // this.bmap.setMinZoom(6) // 设置地图最小缩放比例
        // this.bmap.setMaxZoom(12) // 设置地图最大缩放比例
      })
    }
  },
  mounted () {
    this.initMap()
  },
  data () {
    return {
      chart: echarts.ECharts,
      bmap: {}
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>
