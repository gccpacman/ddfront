<template>
  <div class='container'>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>123</strong> posts
            </p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Find a post">
              </p>
              <p class="control">
                <button class="button">
                  Search
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
            <baidu-map id="allmap" class="bm-view" center="上海市" :zoom="zoom" @ready="handler">
              <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
              <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
              <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
              <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <bm-label :content="content" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
              </bm-marker>
              <bm-marker :position="position2" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <bm-label :content="content2" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
              </bm-marker>
            </baidu-map>
          </div>
        </div>
        <div class="level-right">
          <p class="content"><strong>Hello world</strong></p>
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
      center: {lng: 121.44906, lat: 31.219978},
      position: {lng: 121.44906, lat: 31.219978},
      content: '马路一',
      position2: {lng: 121.44106, lat: 31.216978},
      content2: '建筑二',
      zoom: 14
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      console.log(GPS.PI)
    }
  }
}
</script>

<style scoped>
  /* body, html,#allmap {width: 100%;height: 100%;} */
  .bm-view {
    width: 100%;
    height: 600px;
    overflow: hidden;
    margin:0;
    padding: 5 5 5 5;
    font-family:"微软雅黑";
  }
</style>
