<template>
  <div class='container'>
    <section class="container box" columns>
      <h1 class="subtitle">
        上海市优秀历史建筑
      </h1>
      <b-field class='column'>
        <template v-for="district in shanghaiDistrict" class="column"   >
          <span @click="clickDistrict(district)" v-bind:key="district.name" style="padding-right: 3px; " v-bind:style="{'color': district.color}" >
            <big>
              <p v-if="district.clicked">▣</p>
              <p v-else>▢</p>
            </big>
            <small>
              {{ district.name }}
            </small>
          </span>
        </template>
      </b-field>
    </section>
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
    map: 'china',
    zoom: 13,
    roam: true
  },
  series: [
  ]
}

export default {
  name: 'ArchitectureMap',
  data () {
    return {
      chart: echarts.ECharts,
      bmap: {},
      zoom: 14,
      shanghaiDistrict: [
        {
          'name': '徐汇区',
          'color': 'blue',
          'data': [],
          'clicked': true,
          'idx': null
        },
        {
          'name': '静安区',
          'color': 'green',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '普陀区',
          'color': 'Fuchsia',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '杨浦区',
          'color': 'Maroon',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '黄浦区',
          'color': 'black',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '嘉定区',
          'color': 'orange',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '虹口区',
          'color': 'grey',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '长宁区',
          'color': 'lightblue',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '闵行区',
          'color': 'purple',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '浦东新区',
          'color': 'teal',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '金山区',
          'color': 'aqua',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '奉贤区',
          'color': 'silver',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '宝山区',
          'color': 'olive',
          'data': [],
          'clicked': false,
          'idx': null
        },
        {
          'name': '松江区',
          'color': 'navy',
          'data': [],
          'clicked': false,
          'idx': null
        }
      ]
    }
  },
  methods: {
    // initMap () {
    //   this.loadArchitecture()
    // },
    // selectChanged () {
    //   this.reloadArch()
    // },
    clickDistrict (district) {
      district.clicked = !district.clicked
      if (!district.clicked) {
        bmapOptions['series'][district.idx]['data'] = []
      } else {
        bmapOptions['series'][district.idx]['data'] = district['data']
      }
      this.chart.setOption(bmapOptions)
    },
    loadArchitecture () {
      this.$axios.get(process.env.ROOT_API + '/architecture/positions/').then((response) => {
        var res = response.data
        for (var i = 0; i < res.length; i++) {
          for (var ii = 0; ii < this.shanghaiDistrict.length; ii++) {
            if (this.shanghaiDistrict[ii]['name'].substring(0, 2) === res[i]['place_name']) {
              this.shanghaiDistrict[ii]['data'].push(res[i])
              continue
            }
          }
        }
        this.chart = echarts.init(this.$refs.map)
        for (var j = 0; j < this.shanghaiDistrict.length; j++) {
          this.shanghaiDistrict[j]['idx'] = j
          var districtData = []
          if (this.shanghaiDistrict[j]['clicked']) {
            districtData = this.shanghaiDistrict[j]['data']
          }
          bmapOptions['series'].push({
            name: this.shanghaiDistrict[j]['name'],
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: districtData,
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
                color: this.shanghaiDistrict[j]['color'],
                borderColor: '#fff',
                borderWidth: 1,
                borderType: 'solid',
                shadowBlur: 10,
                shadowColor: this.shanghaiDistrict[j]['color']
              }
            }
          })
        }
        this.chart.setOption(bmapOptions)
        this.bmap = this.chart.getModel().getComponent('bmap').getBMap()
        this.bmap.setMinZoom(1) // 设置地图最小缩放比例
        this.bmap.setMaxZoom(20) // 设置地图最大缩放比例
        console.log(bmapOptions)
        this.chart.on('click', this.clickScatter)
        this.reloadMap()
      }).catch(function (error) {
        console.log(error)
      })
    },
    reloadMap () {
    },
    clickScatter (params) {
      console.log(params)
      this.$router.push({name: 'Architecture', params: { id: params.data.id }})
    }
  },
  mounted () {
    this.loadArchitecture()
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
