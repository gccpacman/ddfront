<template>
  <div class='container'>
<!--    <div class="level">-->
<!--      <div class="level-left">-->
<!--        <div class="level-item">-->
<!--          <p class="subtitle is-5">-->
<!--            <strong></strong> 筛选地区-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="level-item">-->
<!--          <b-field>-->
<!--            <b-select v-model="place_name" placeholder="选择行政区（徐汇区，静安区...）" icon="earth" @input="selectChanged">-->
<!--              <option-->
<!--                v-for="(option, idx) in shanghai_distrit_names"-->
<!--                :value="option"-->
<!--                :key="idx">-->
<!--                {{ option }}-->
<!--              </option>-->
<!--            </b-select>-->
<!--          </b-field>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <section class="container box">
      <h1 class="subtitle">
        上海市优秀历史建筑
      </h1>
      <div class="columns">
        <template v-for="district in shanghaiDistrict" class="column"   >
          <span v-bind:key="district.name" style="padding-right: 2px; font-size: 14px" class="is-small">
            <small v-bind:style="{'color': district.color}">▨</small>
            <small>{{ district.name }}</small>
          </span>
        </template>
      </div>
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
    zoom: 14,
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
      place_name: '徐汇',
      shanghai_distrit_names: ['普陀', '静安', '杨浦', '黄浦', '南汇', '嘉定', '徐汇', '奉贤', '闸北', '卢湾', '长宁', '闵行', '青浦', '金山', '宝山', '虹口', '浦东'],
      shanghaiDistrict: [
        {
          'name': '徐汇区',
          'color': 'blue',
          'data': []
        },
        {
          'name': '普陀区',
          'color': 'yellow',
          'data': []
        },
        {
          'name': '静安区',
          'color': 'green',
          'data': []
        },
        {
          'name': '杨浦区',
          'color': 'lightgreen',
          'data': []
        },
        {
          'name': '黄浦区',
          'color': 'black',
          'data': []
        },
        {
          'name': '嘉定区',
          'color': 'orange',
          'data': []
        },
        {
          'name': '虹口区',
          'color': 'grey',
          'data': []
        },
        {
          'name': '长宁区',
          'color': 'lightblue',
          'data': []
        },
        {
          'name': '闵行区',
          'color': 'purple',
          'data': []
        },
        {
          'name': '浦东新区',
          'color': 'teal',
          'data': []
        },
        {
          'name': '金山区',
          'color': 'aqua',
          'data': []
        },
        {
          'name': '奉贤区',
          'color': 'silver',
          'data': []
        },
        {
          'name': '宝山区',
          'color': 'olive',
          'data': []
        },
        {
          'name': '松江区',
          'color': 'navy',
          'data': []
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
    loadArchitecture () {
      this.axios.get(process.env.ROOT_API + '/architecture/positions/').then((response) => {
        var res = response.data
        for (var i = 0; i < res.length; i++) {
          for (var ii = 0; ii < this.shanghaiDistrict.length; ii++) {
            if (this.shanghaiDistrict[ii]['name'].substring(0, 2) === res[i]['place_name']) {
              this.shanghaiDistrict[ii]['data'].push(res[i])
              continue
            }
          }
        }
        for (var j = 0; j < this.shanghaiDistrict.length; j++) {
          bmapOptions['series'].push({
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: this.shanghaiDistrict[j]['data'],
            hoverAnimation: true,
            symbolSize: 7,
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
        this.chart = echarts.init(this.$refs.map)
        this.chart.setOption(bmapOptions)
        this.bmap = this.chart.getModel().getComponent('bmap').getBMap()
        this.bmap.setMinZoom(12) // 设置地图最小缩放比例
        this.bmap.setMaxZoom(16) // 设置地图最大缩放比例
        console.log(bmapOptions)
      }).catch(function (error) {
        console.log(error)
      })
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
