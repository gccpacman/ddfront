<template>
  <section>
    <div class="container context-container">
      <nav class="breadcrumb bread-nav" aria-label="breadcrumbs" v-if="road">
        <ul>
          <li>
            <a href="#">
              <b-icon size="is-small" icon="map-marker" pack="fas" ></b-icon>
              <span v-if="road.place_name2">{{ road.place_name2 }}</span>
              <span v-else-if="road.place_name">{{ road.place_name }}</span>
            </a>
          </li>
          <li class="is-active">
            <a href="#">
              <b-icon size="is-small" icon="road" pack="fas" ></b-icon>
              {{ road.name_chs }}
            </a>
          </li>
          <li>
            <b-dropdown aria-role="list">
              <a
                slot="trigger"
                role="button">
                <b-icon size="is-small" icon="building" pack="fas" ></b-icon>
                ...
                <b-icon icon="angle-down" pack="fas" ></b-icon>
              </a>
              <template v-for="archItem in road.road_architecture">
                <b-dropdown-item has-link v-bind:key="archItem._id" v-bind:item="archItem" aria-role="listitem" @click="clickArchItem(archItem._id)">
                  <b-icon size="is-small" icon="building" pack="fas" ></b-icon>
                  {{ archItem.name_chs }}
                </b-dropdown-item>
              </template>
              <!-- <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item> -->
            </b-dropdown>
          </li>
        </ul>
      </nav>
      <section class="hero is-info is-small" v-if="road">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ road.name_chs }}
            </h1>
            <h2 class="subtitle">
              {{ road.place_name2 }}
            </h2>
          </div>
        </div>
      </section>
      <div class="container">
        <div ref="map" class="map"></div>
      </div>
      <article v-if="road && road.des_html" class="message is-info">
        <div class="message-body">
          <p class="message-p" v-html=road.des_html></p>
        </div>
      </article>
    </div>
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
    },
    clickArchItem (archId) {
      this.$router.push({name: 'Architecture', params: { id: archId }})
    }
  },
  mounted () {
    console.log('hello road')
    this.$axios.get(process.env.ROOT_API + '/road/' + this.$route.params.id).then((response) => {
      this.road = response.data
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
              'des2': archItems[k].des_html,
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
      road: null
    }
  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 300px;
  }
  .message-p {
    text-align: left;
    font-size: 15px;
    color: black;
  }
  .bread-nav a{
    color: black!important;
  }
</style>
