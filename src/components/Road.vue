<template>
  <div class='container'>
    <div>Road {{ $route.params.id }}</div>
    <div>
      <baidu-map id="allmap" class="bm-view" :center="center" :zoom="zoom" @ready="handler">
        <template v-for="(polylinePath, index) in polylinePathList">
          <bm-polyline v-bind:item="polylinePath" v-bind:key="index" :path="polylinePath" stroke-color="blue" :stroke-opacity="1" :stroke-weight="5" :editing="false"></bm-polyline>
        </template>
      </baidu-map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.axios.get('http://127.0.0.1:8000/roads/' + this.$route.params.id).then((response) => {
        console.log(response)
        this.polylinePathList = response.data.polylines_bmap
        console.log(this.polylinePathList)
        console.log(this.polylinePathList[0])
        this.center = this.polylinePathList[27][0]
        console.log(this.center)
      })
    }
  },
  created () {
    console.log('hello road')
  },
  data () {
    return {
      center: null,
      zoom: 14,
      polylinePathList: []
    }
  }
}
</script>

<style scoped>
  .bm-view {
    width: 100%;
    height: 500px;
    overflow: hidden;
    margin:0;
    padding: 5 5 5 5;
    font-family:"微软雅黑";
  }
</style>
