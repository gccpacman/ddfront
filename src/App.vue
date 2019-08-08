<template>
  <div id="app">
    <section class="hero is-bold">
      <!-- Hero header: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <!--
        Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
        -->
          <div class="navbar-menu" :class="{ 'is-active': showNav }">
            <div class="navbar-start">
              <!-- <a class="navbar-item" href="/form/">
                表格
              </a> -->
              <a class="navbar-item" href="/">
                主页
              </a>
              <a class="navbar-item" href="/relatedplacesmap/">
                关联地名
              </a>
              <a class="navbar-item" href="/relatedplacesankey/">
                桑基图
              </a>
              <a class="navbar-item" href="#">
                命名
              </a>
              <a class="navbar-item" href="#">
                历史
              </a>
              <a class="navbar-item" href="#">
                租界
              </a>
              <a class="navbar-item" href="#">
                大上海
              </a>
              <a class="navbar-item" href="#">
                H5
              </a>
              <!-- <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  More
                </a>
                <div class="navbar-dropdown">
                  <a class="navbar-item">
                    About
                  </a>
                  <a class="navbar-item">
                    Jobs
                  </a>
                  <a class="navbar-item">
                    Contact
                  </a>
                  <hr class="navbar-divider">
                  <a class="navbar-item">
                    Report an issue
                  </a>
                </div>
              </div> -->
            </div>
          </div>
          <div class="navbar-brand">
            <!-- <a class="navbar-item" href="/">
              <img src="http://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Logo">
            </a> -->
            <!--
        Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
        -->
            <div class="navbar-item search-button-container" >
              <div class="field has-addons">
                <p class="control">
                  <b-autocomplete field="name" v-show="showSearch" v-model="keyword_name" :data="filterdRoadData" :open-on-focus="true" placeholder="输入路名: e.g. 武康路" @focus="getAutocomplateData" @select="option => selected = option">
                    <template slot-scope="props">
                      <div class="media">
                        <div class="media-left">
                          <b-icon v-if="props.option.type==='architecture'" pack="fas" icon="building" size="is-small"></b-icon>
                          <b-icon v-else-if="props.option.type==='road'" pack="fas" icon="road" size="is-small"></b-icon>
                          <b-icon v-else-if="props.option.type==='place'" pack="fas" icon="map-marker" size="is-small"></b-icon>
                        </div>
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
            <div class="navbar-burger" @click="showNav = !showNav"  :class="{ 'is-active': showNav }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </div>
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container">
          <router-view/>
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
import Table from 'buefy/dist/components/table'
import Input from 'buefy/dist/components/input'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {bus} from './bus'

Vue.use(Buefy)
Vue.use(Table)
Vue.use(Input)

Vue.use(VueAxios, axios)

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
      sh_distrit_list: [],
      sh_road_list: [],
      sh_architecture_list: []
    }
  },
  methods: {
    getAutocomplateData () {
      if (this.sh_road_list.length === 0) {
        this.axios.get(process.env.ROOT_API + '/keyword/road').then((response) => {
          var roadList = response.data
          for (var i = 0; i < roadList.length; i++) {
            this.sh_road_list.push({
              'name': roadList[i],
              'type': 'road'
            })
          }
        })
        if (this.sh_architecture_list.length === 0) {
          this.axios.get(process.env.ROOT_API + '/keyword/architecture').then((response) => {
            var architectureList = response.data
            for (var i = 0; i < architectureList.length; i++) {
              this.sh_architecture_list.push({
                'name': architectureList[i],
                'type': 'architecture'
              })
            }
          })
        }
      }
    },
    search () {
      if (!this.showSearch) {
        this.showSearch = true
      } else if (!this.keyword_name) {
        console.log("keyword shouldn't be empty.")
        // this.showSearch = false
      } else if (this.$route.name !== 'Search') {
        console.log(this.keyword_name)
        console.log(this.$router)
        this.$router.push({'name': 'Search', 'query': {'keyword': this.keyword_name}})
      } else {
        console.log('hello emit.')
        bus.$emit('eventGreet')
      }
    },
    goArchMap () {
      this.$router.push({'name': 'ArchitecuteMap'})
    }
  },
  computed: {
    filterdRoadData () {
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
  display: block;
  position: relative;
  // height: 3.25rem;
  // width: 3rem;
  margin-left: auto;
  margin-right: 0px;
  // float: right;
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
</style>
