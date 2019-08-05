<template>
  <section>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ title }}
          </h1>
          <h2 class="subtitle">
            {{ place_name }}
          </h2>
        </div>
      </div>
    </section>
    <div class="bmap-container is-gapless">
      <baidu-map id="allmap" class="bm-view" :center="center" :zoom="zoom" @ready="handler">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <template v-for="(polylinePath, index) in polylinePathList">
          <bm-polyline v-bind:item="polylinePath" v-bind:key="index" :path="polylinePath" stroke-color="blue" :stroke-opacity="1" :stroke-weight="2" :editing="false"></bm-polyline>
        </template>
        <template v-for="arch in archList">
          <bm-marker v-bind:item="arch" v-bind:key="arch.id" :position="arch.position" :dragging="false">
            <bm-label :content="arch.name" :labelStyle="{color: 'black', fontSize : '10px', backgroundColor :'rgba(255,255,255,0.3)', border: '1px'}" :offset="{width: -20, height: 10}"/>
          </bm-marker>
        </template>
      </baidu-map>
    </div>
    <article class="message is-small is-dark">
      <div class="message-body">
        <p>{{ des }}</p>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Road',
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.axios.get(process.env.ROOT_API + '/road/' + this.$route.params.id).then((response) => {
        this.title = response.data.name_chs
        this.des = response.data.des2
        this.place_name = response.data.place_name
        this.polylinePathList = response.data.polylines_bmap
        this.center = response.data.center_bmap
        var archItems = response.data.road_architecture
        if (archItems && archItems.length > 0) {
          for (var i = 0; i < archItems.length; i++) {
            this.archList.push({
              'id': archItems._id,
              'name': archItems[i].name_chs,
              'position': {
                'lng': archItems[i].longitude,
                'lat': archItems[i].latitude
              }
            })
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created () {
    console.log('hello road')
  },
  data () {
    return {
      center: null,
      zoom: 15,
      polylinePathList: [],
      archList: [],
      title: '路名',
      des: '描述',
      place_name: '所在区'
    }
  }
}
</script>

<style scoped>
  .bmap-container {
    flex: none;
    width: 100%;
  }
  .bm-view {
    width: 100%;
    height: 330px;
    overflow: hidden;
    margin:0;
    padding: 0 0 0 0;
    font-family:"微软雅黑";
  }
</style>
