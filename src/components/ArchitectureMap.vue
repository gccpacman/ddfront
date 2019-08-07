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
                <bm-marker v-bind:item="arch" v-bind:key="arch.id" :position="arch.position" :dragging="false">
                  <bm-label :content="arch.name" :labelStyle="{color: 'black', fontSize : '7px', backgroundColor :'rgba(255,255,255,0.3)', border: '1px'}" :offset="{width: -20, height: 10}"/>
                </bm-marker>
              </template>
            </baidu-map>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'BaiduMapDemo',
  data () {
    return {
      zoom: 14,
      place_name: '徐汇',
      shanghai_distrit_names: ['普陀', '静安', '杨浦', '黄浦', '南汇', '嘉定', '徐汇', '奉贤', '闸北', '卢湾', '长宁', '闵行', '青浦', '金山', '宝山', '虹口', '浦东'],
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
      this.axios.get(process.env.ROOT_API + '/architecture/positions/', {
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
    center () {
      return '上海市' + this.place_name
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
