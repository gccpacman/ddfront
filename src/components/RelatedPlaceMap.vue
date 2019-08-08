<template>
  <div class='container'>
<!--      <div class="level">-->
<!--        <div class="level-left">-->
<!--          <div class="level-item">-->
<!--            <p class="subtitle is-5">-->
<!--              <strong></strong> 筛选地区-->
<!--            </p>-->
<!--          </div>-->
<!--          <div class="level-item">-->
<!--            <b-field>-->
<!--              <b-select v-model="place_name" placeholder="选择行政区（徐汇区，静安区...）" icon="earth" @input="selectChanged">-->
<!--                <option-->
<!--                  v-for="(option, idx) in shanghaiDistrictNames"-->
<!--                  :value="option"-->
<!--                  :key="idx">-->
<!--                  {{ option }}-->
<!--                </option>-->
<!--              </b-select>-->
<!--            </b-field>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <section class="container">
        <h1 class="subtitle">
          上海市路名关联的全国城市
        </h1>
        <template v-for="district in districtList">
          <span v-bind:key="district.name"  style="white-space: nowrap; padding-right: 5px; font-size: 14px">
            <span class="is-small" v-bind:style="{'color': district.color}">▨</span><small>{{ district.name }}</small>
          </span>
        </template>
      </section>
      <div class="media">
        <div class="media-content">
          <div class="content">
            <baidu-map id="allmap" class="bm-view" :center="center" :zoom="zoom" @ready="handler">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <template v-for="district in districtList">
                <template v-for="road in district.data">
                  <bm-boundary v-bind:item="road" v-bind:key="road.id" :name="road.related_place" :strokeWeight="1" :fillOpacity="0.2" :strokeColor="district.color" :fillColor="district.color">
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
          'color': 'blue'
        },
        {
          'name': '普陀区',
          'color': 'yellow'
        },
        {
          'name': '静安区',
          'color': 'green'
        },
        {
          'name': '杨浦区',
          'color': 'lightgreen'
        },
        {
          'name': '黄浦区',
          'color': 'black'
        },
        {
          'name': '嘉定区',
          'color': 'orange'
        },
        {
          'name': '虹口区',
          'color': 'grey'
        },
        {
          'name': '长宁区',
          'color': 'lightblue'
        },
        {
          'name': '闵行区',
          'color': 'purple'
        },
        {
          'name': '浦东新区',
          'color': 'teal'
        },
        {
          'name': '金山区',
          'color': 'aqua'
        },
        {
          'name': '奉贤区',
          'color': 'silver'
        },
        {
          'name': '宝山区',
          'color': 'olive'
        },
        {
          'name': '松江区',
          'color': 'navy'
        }
      ],
      districtList: []
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      for (var i = 0; i < this.shanghaiDistrict.length; i++) {
        this.loadRelatedPlace(this.shanghaiDistrict[i])
      }
    },
    loadRelatedPlace (place) {
      this.axios.get(process.env.ROOT_API + '/road/relatedplaces/', {
        params: {
          place_name: place.name
        }
      }).then((response) => {
        this.districtList.push({
          'name': place['name'],
          'color': place['color'],
          'data': response.data
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    selectChanged () {
      // this.reloadArch()
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
