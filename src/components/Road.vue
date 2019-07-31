<template>
  <div class='container'>
    <div>
      <p>Road {{ $route.params.id }}</p>
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ title }}
            </h1>
            <h2 class="subtitle">
              {{ des2 }}
            </h2>
          </div>
        </div>
      </section>
    </div>
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
      this.axios.get(process.env.ROOT_API + '/road/' + this.$route.params.id).then((response) => {
        this.polylinePathList = response.data.polylines_bmap
        this.center = response.data.center_bmap
        this.title = response.data.name_chs
        this.des2 = response.data.des2
        console.log(response)
        console.log(this.polylinePathList)
        console.log(this.polylinePathList[0])
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
      zoom: 13,
      polylinePathList: [],
      title: '路名',
      des2: '描述'
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
