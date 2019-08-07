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
      <div class="media">
        <div class="media-content">
          <div class="content">
            <baidu-map id="allmap" class="bm-view" :center="center" :zoom="zoom" @ready="handler">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <template v-for="arch in archList">
                <bm-boundary v-bind:item="arch" v-bind:key="arch.id" :name="arch.related_place" :strokeWeight="1" strokeColor="blue" fillColor="blue">
                </bm-boundary>
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
      shanghai_distrit_names: ['普陀区', '静安区', '杨浦区', '黄浦区', '南汇区', '嘉定区', '徐汇区', '奉贤区', '闸北区', '卢湾区', '长宁区', '闵行区', '青浦区', '金山区', '宝山区', '虹口区', '浦东新区'],
      archList: []
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      console.log(this.shanghai_distrit_names)
      this.reloadArch()
    },
    selectChanged () {
      this.reloadArch()
    },
    reloadArch () {
      this.axios.get(process.env.ROOT_API + '/road/relatedplaces/', {
        params: {
          place_name: this.place_name
        }
      }).then((response) => {
        this.archList = response.data
        console.log(this.archList)
      }).catch(function (error) {
        console.log(error)
      })
    }
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
</style>
