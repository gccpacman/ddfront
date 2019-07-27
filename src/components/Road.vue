<template>
  <div class='container'>
    <div>Road {{ $route.params.id }}</div>
    <div>
      <baidu-map id="allmap" class="bm-view" :center="center" :zoom="zoom" @ready="handler">
<!--        <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true" @lineupdate="updatePolylinePath"></bm-polyline>-->
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
    }
  },
  created () {
    console.log('hello road')
    this.axios.get('http://127.0.0.1:8000/roads/' + this.$route.params.id).then((response) => {
      console.log(response)
      this.polylinePath = response.polylines_bmap[0].split(';')
      console.log(this.polylinePath)
    }).catch((response) => {
      console.log('error')
    })
  },
  data () {
    return {
      center: '上海市',
      zoom: 13,
      polylinePath: []
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
