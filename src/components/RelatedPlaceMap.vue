<template>
  <div class='container'>
      <section class="container box">
        <h1 class="subtitle">
          上海市路名关联的全国城市
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
      <div class="media">
        <div class="media-content">
          <div class="content">
            <baidu-map id="allmap" class="bm-view" :center="center" :zoom="zoom" @ready="handler">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <template v-for="district in shanghaiDistrict">
                <template v-for="road in district.data_view">
                  <bm-boundary v-bind:item="road" v-bind:key="road.id" :name="road.related_place" clicking :strokeWeight="1" :fillOpacity="0.5" :strokeColor="district.color" :fillColor="district.color">
                  </bm-boundary>
                </template>
              </template>
            </baidu-map>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'RelatedPlaceMap',
  data () {
    return {
      center: '西安市',
      zoom: 5,
      place_name: '徐汇区',
      shanghaiDistrict: [
        {
          'name': '徐汇区',
          'color': 'blue',
          'data': [],
          'data_view': [],
          'clicked': true
        },
        {
          'name': '静安区',
          'color': 'green',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '普陀区',
          'color': 'Fuchsia',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '虹口区',
          'color': 'grey',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '长宁区',
          'color': 'lightblue',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '闵行区',
          'color': 'purple',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '杨浦区',
          'color': 'Maroon',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '黄浦区',
          'color': 'black',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '嘉定区',
          'color': 'orange',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '浦东新区',
          'color': 'teal',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '金山区',
          'color': 'aqua',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '奉贤区',
          'color': 'silver',
          'data': [],
          'clicked': false
        },
        {
          'name': '宝山区',
          'color': 'olive',
          'data': [],
          'data_view': [],
          'clicked': false
        },
        {
          'name': '松江区',
          'color': 'navy',
          'data': [],
          'data_view': [],
          'clicked': false
        }
      ]
    }
  },
  methods: {
    clickDistrict (district) {
      district.clicked = !district.clicked
      if (district.clicked) {
        district['data_view'] = district['data']
      } else {
        district['data_view'] = []
      }
    },
    loadDistrict (district) {
      this.$axios.get(process.env.ROOT_API + '/road/relatedplaces/', {
        params: {
          place_name: district['name']
        }
      }).then((response) => {
        district['data'] = response.data
        if (district['clicked']) {
          district['data_view'] = response.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    handler ({BMap, map}) {
      console.log(BMap, map)
      for (var i = 0; i < this.shanghaiDistrict.length; i++) {
        this.loadDistrict(this.shanghaiDistrict[i])
      }
    }
  },
  computed: {
    shanghaiDistrictNames () {
      return this.shanghaiDistrit.map(district => {
        return district.name
      })
    }
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
</style>
