<template>
  <div id="app">

        <b-navbar>
          <!--
        Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
        -->
          <template slot="brand">
            <b-navbar-item href="/">
              <img src="http://bulma.io/images/bulma-logo.png" width="80px" height="auto" alt="Logo">
            </b-navbar-item>
            <b-navbar-item tag="div">
              <div class="search-button-container" >
                <div class="field has-addons">
                  <p class="control">
                    <b-autocomplete field="name" v-show="showSearch" v-model="keyword_name" :data="filterdRoadData"
                                    :open-on-focus="true" placeholder="搜索: e.g. 武康路"
                                    @focus="getAutocomplateData" @select="option => selected = option" @keyup.enter.native="search">
                      <template slot-scope="props">
                        <div class="media">
                          <div class="media-content">
                            <b>{{ props.option.name }}</b>
                          </div>
                        </div>
                      </template>
                      <template slot="empty">没有结果...</template>
                    </b-autocomplete>
                  </p>
                  <p class="control">
                    <b-button @click="search">
                      <b-icon
                      pack="fas"
                      icon="search"
                      size="is-big">
                      </b-icon>
                    </b-button>
                  </p>
                  <p class="control">
                    <b-button @click="goArchMap">
                      <b-icon
                      pack="fas"
                      icon="map-marked-alt"
                      size="is-big">
                      </b-icon>
                    </b-button>
                  </p>
                </div>
              </div>
            </b-navbar-item>
          </template>

          <template slot="start">
            <!-- <a class="navbar-item" href="/form/">
              表格
            </a> -->
            <!-- <b-navbar-item tag="router-link" :to="{name: 'Index'}">
              <a>主页</a>
            </b-navbar-item> -->
            <b-navbar-item tag="router-link" :to="{name: 'RelatedPlaceMap'}">
              <a>马路相关城市地图</a>
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{name: 'ArchitecuteMap'}">
              <a>优秀历史建筑地图</a>
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{name: 'RelatedPlaceSankey'}">
              <a>马路相关省份桑基图</a>
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{name: 'DistrictChart'}">
              <a>各区马路命名来源饼图</a>
            </b-navbar-item>
            <b-navbar-item href="#">
              <a>命名</a>
            </b-navbar-item>
            <b-navbar-item href="#">
              <a>历史</a>
            </b-navbar-item>
            <b-navbar-item href="#">
              <a>租界</a>
            </b-navbar-item>
            <b-navbar-item href="#">
              <a>大上海</a>
            </b-navbar-item>
            <b-navbar-item href="#">
              <a>H5</a>
            </b-navbar-item>
          </template>
            <!-- <a class="navbar-item" href="/">
              <img src="http://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Logo">
            </a> -->
            <!--
        Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
        -->
          <template slot="end">
          </template>
        </b-navbar>
      <section class="hero is-bold">
      <!-- Hero header: will stick at the top -->
      <div class="hero-head">
      <!-- Hero content: will be in the middle -->
      </div>
      <div class="hero-body">
        <div class="container">
          <router-view ref='rview' />
        </div>
      </div>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>@2018-2019</strong>上海图书馆开放数据竞赛作品<br/>
            <small>ICP证：<a target="_blank" href="http://www.miitbeian.gov.cn">浙ICP备19022358号-1</a></small>
          </p>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content'
})

Vue.use(BaiduMap, {
  ak: 'bRrHftKV7wBPHYFSkp2GRZQCVGbz8nhy'
})

export default {
  name: 'App',
  components: {
    'baidu-map': BaiduMap
  },
  data () {
    return {
      showNav: false,
      showSearch: true,
      keyword_name: '',
      keyword_icon: '',
      suggestWordLoaded: false,
      sh_distrit_list: [],
      sh_road_list: [],
      sh_architecture_list: []
    }
  },
  methods: {
    getAutocomplateData () {
      if (!this.suggestWordLoaded) {
        this.$axios.get(process.env.ROOT_API + '/keyword/road').then((response) => {
          var roadList = response.data
          for (var i = 0; i < roadList.length; i++) {
            this.sh_road_list.push({
              'name': roadList[i],
              'type': 'road'
            })
          }
          this.$axios.get(process.env.ROOT_API + '/keyword/architecture').then((response) => {
            var architectureList = response.data
            for (var i = 0; i < architectureList.length; i++) {
              this.sh_architecture_list.push({
                'name': architectureList[i],
                'type': 'architecture'
              })
            }
            this.suggestWordLoaded = true
          })
        })
      }
    },
    search () {
      if (this.$route.name !== 'Search') {
        console.log(this.keyword_name)
        console.log(this.$router)
        this.$router.push({'name': 'Search'})
      } else {
        this.$refs['rview'].onSearch(this.keyword_name)
      }
    },
    goArchMap () {
      this.$router.push({'name': 'ArchitecuteMap'})
    }
  },
  computed: {
    filterdRoadData () {
      if (!this.keyword_name) {
        return [
          {
            'name': '武康路',
            'type': 'road'
          },
          {
            'name': '武康大楼',
            'type': 'architecture'
          },
          {
            'name': '淮海中路',
            'type': 'road'
          },
          {
            'name': '四川北路',
            'type': 'road'
          },
          {
            'name': '江西中路',
            'type': 'road'
          },
          {
            'name': '宋家老宅',
            'type': 'architecture'
          },
          {
            'name': '马可尼无线电公司',
            'type': 'architecture'
          }
        ]
      }
      var keywordItems = this.sh_distrit_list.concat(this.sh_road_list, this.sh_architecture_list)
      return keywordItems.filter((option) => {
        return option.name
          .toString()
          .indexOf(this.keyword_name) >= 0
      }).filter((option, idx) => {
        return idx < 10
      })
    },
    hideSearchNav () {
      if (this.$route.name === 'Search') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
// body {
//   background-image: url("./assets/bg_index.jpg");
// }

.search-button-container {
  width: 190px;
}
.search-button {
  border-width: 0px;
  background-color: #ffffff;
}
.navbar-burger-left {
  margin-left: 0px!important;
}
.navbar-item {
  color:#4a4a4a !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
.context-container-full {
  width: 100%;
}
.context-container {
  max-width: 690px!important;
}
.dropdown-content {
  width: 190px
}

</style>
