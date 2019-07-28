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
              <b-select placeholder="选择行政区（徐汇区，静安区...）" icon="earth">
                <option
                  v-for="option in shanghai_distrit_names"
                  :value="option.id"
                  :key="option.id">
                  {{ option }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="level-item">
            <p class="subtitle is-5">
              <strong></strong> 搜索路名
            </p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="寻找特殊路名">
              </p>
              <p class="control">
                <button class="button">
                  搜索
                </button>
              </p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <p class="level-item"><strong>All</strong></p>
          <p class="level-item"><a>Published</a></p>
          <p class="level-item"><a>Drafts</a></p>
          <p class="level-item"><a>Deleted</a></p>
          <p class="level-item"><a class="button is-success">New</a></p>
        </div>
      </div>
      <div class="media">
        <div class="media-content">
          <div class="content">
            <baidu-map id="allmap" class="bm-view" :center="center" :zoom="zoom" @ready="handler">
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <!-- <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation> -->
              <bm-boundary name="兰州市" :strokeWeight="1" strokeColor="blue" fillColor="blue" @clink="handleClick"></bm-boundary>
              <bm-boundary name="北海市" :strokeWeight="1" strokeColor="blue" fillColor="blue" @clink="handleClick"></bm-boundary>
              <bm-boundary name="凉州区" :strokeWeight="1" strokeColor="blue" fillColor="blue" @clink="handleClick"></bm-boundary>
              <bm-boundary name="济南市" :strokeWeight="1" strokeColor="blue" fillColor="blue" @clink="handleClick"></bm-boundary>
              <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <bm-label :content="content" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
              </bm-marker>
              <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true" @lineupdate="updatePolylinePath"></bm-polyline>
            </baidu-map>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { GPS } from '../gps.js'

export default {
  name: 'BaiduMapDemo',
  // components: {
  //   BaiduMap
  // },
  data () {
    return {
      center: '上海市',
      position: {lng: 122.44906, lat: 37.219978},
      content: '马路一',
      position2: {lng: 121.44106, lat: 31.216978},
      content2: '建筑二',
      location: '上海',
      keyword: '马当路',
      zoom: 5,
      shanghai_distrit_names: ['普陀区', '静安区', '杨浦区', '黄浦区', '南汇区', '嘉定区', '徐汇区', '奉贤区', '闸北区', '卢湾区', '长宁区', '闵行区', '青浦区', '金山区', '宝山区', '虹口区', '浦东新区'],
      polylinePath: [
        {lng: 121.3785742, lat: 31.16873194},
        {lng: 121.3802783, lat: 31.16511556},
        {lng: 121.3796283, lat: 31.16649417},
        {lng: 121.3803486, lat: 31.16493833}
      ]
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      console.log(GPS.PI)
      console.log(this.shanghai_distrit_names)
    },
    handleClick () {
      global.alert('Well done.')
      console.log('it worked.')
    }
  }
}
</script>

<style scoped>
  /* body, html,#allmap {width: 100%;height: 100%;} */
  .bm-view {
    width: 100%;
    height: 500px;
    overflow: hidden;
    margin:0;
    padding: 5 5 5 5;
    font-family:"微软雅黑";
  }
</style>
