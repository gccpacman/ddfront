<template>
  <div class='container'>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong></strong> 筛选地区
          </p>
        </div>
        <div class="level-item">
          <b-field>
            <b-select v-model="place_name" placeholder="选择行政区（徐汇区，静安区...）" icon="earth" @input="selectChanged">
              <option
                v-for="(option, idx) in shanghai_distrit_names"
                :value="option"
                :key="idx">
                {{ option }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
    </div>
    <div class="container">
      <div ref="map" class="map"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap'

var bmapOptions = {
  // backgroundColor: '#404a59',
  animation: false,
  title: {
    text: '',
    subtext: '',
    sublink: '',
    left: 'center',
    textStyle: {
      color: '#000'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return params.name
    }
  },
  bmap: {
    center: [121.459493, 31.229147],
    zoom: 14,
    roam: true
  },
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: [],
      hoverAnimation: true,
      symbolSize: 8,
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
          color: 'purple'
        }
      }
    }
  ]
}

export default {
  name: 'ArchitectureMap',
  data () {
    return {
      chart: echarts.ECharts,
      bmap: {},
      zoom: 13,
      place_name: '徐汇',
      shanghai_distrit_names: ['普陀', '静安', '杨浦', '黄浦', '南汇', '嘉定', '徐汇', '奉贤', '闸北', '卢湾', '长宁', '闵行', '青浦', '金山', '宝山', '虹口', '浦东'],
      archList: []
    }
  },
  methods: {
    initMap () {
      this.reloadArch()
    },
    selectChanged () {
      this.reloadArch()
    },
    reloadArch () {
      this.axios.get(process.env.ROOT_API + '/architecture/positions/', {
        params: {
          place_name: this.place_name
        }
      }).then((response) => {
        bmapOptions['series'][0]['data'] = response.data
        console.log(bmapOptions)
        this.chart = echarts.init(this.$refs.map)
        this.chart.setOption(bmapOptions)
        this.bmap = this.chart.getModel().getComponent('bmap').getBMap()
        this.bmap.setMinZoom(13) // 设置地图最小缩放比例
        this.bmap.setMaxZoom(16) // 设置地图最大缩放比例
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    this.initMap()
  },
  computed: {
  }
}
</script>

<style scoped>
  /* body, html,#allmap {width: 100%;height: 100%;} */
  .bm-view {
    width: 100%;
    height: 400px;
    overflow: hidden;
    margin:0;
    padding: 5 5 5 5;
    font-family:"微软雅黑";
  }
  .map {
  width: 100%;
  height: 500px;
}
</style>
