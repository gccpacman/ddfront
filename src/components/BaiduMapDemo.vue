<template>
  <baidu-map id="allmap" class="bm-view" :center="center" :zoom="zoom" @ready="handler">
    <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
    <bm-marker :position="position" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label :content="content" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
    </bm-marker>
  </baidu-map>
</template>

<script>
// import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

export default {
  name: 'BaiduMapDemo',
  // components: {
  //   BaiduMap
  // },
  data () {
    return {
      center: {lng: 0, lat: 0},
      position: {lng: 0, lat: 0},
      content: 'hello world',
      zoom: 3
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 121.44906
      this.center.lat = 31.219978
      this.position.lng = 121.44906
      this.position.lat = 31.219978
      this.zoom = 15
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
    font-family:"微软雅黑";
  }
</style>
