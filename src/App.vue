<template>
  <div id="app">
    <section class="hero is-fullheight is-bold">
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
              <a class="navbar-item" href="/baidumap/">
                行政区域
              </a>
              <a class="navbar-item" href="/road/1312/">
                马路地图
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
            <div class="navbar-item search-bar-container" v-show="showSearch">
              <b-autocomplete class="search-field-container" field="name" v-model="keyword_name" :data="filterdRoadData" :open-on-focus="true" placeholder="输入路名: e.g. 武康路" @select="option => selected = option">
                <template slot-scope="props">
                  <div class="media">
                    <!-- <div class="media-left">
                        <img width="32" :src="`{{ props.option.img }}`">
                    </div> -->
                    <div class="media-content">
                      <b-icon v-if="props.option.type==='architecture'" pack="fas" icon="building" size="is-small"></b-icon>
                      <b-icon v-else-if="props.option.type==='road'" pack="fas" icon="road" size="is-small"></b-icon>
                      <b-icon v-else-if="props.option.type==='place'" pack="fas" icon="map-marker" size="is-small"></b-icon>
                      <b>{{ props.option.name }}</b>
                    </div>
                  </div>
                </template>
                <template slot="empty">没有结果...</template>
              </b-autocomplete>
              <b-button>
                <b-icon
                pack="fas"
                icon="search"
                size="is-big">
                </b-icon>
              </b-button>
              <b-button @click="showSearch = false">
                <b-icon
                pack="fas"
                icon="window-close"
                size="is-big">
                </b-icon>
              </b-button>
            </div>
            <div class="navbar-item search-button-container">
              <b-button @click="clickSearch" class="search-button" v-show="!showSearch" >
                <b-icon
                pack="fas"
                icon="search"
                size="is-big">
                </b-icon>
              </b-button>
            </div>
            <div class="navbar-burger navbar-burger-left" @click="showNav = !showNav"  :class="{ 'is-active': showNav }">
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
            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
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
// import 'bulma/css/bulma.css'

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
      showSearch: false,
      keyword_items: [],
      keyword_name: '',
      keyword_selected: null,
      shanghai_distrit_names: ['普陀区', '静安区', '杨浦区', '黄浦区', '南汇区', '嘉定区', '徐汇区', '奉贤区', '闸北区', '卢湾区', '长宁区', '闵行区', '青浦区', '金山区', '宝山区', '虹口区', '浦东新区']
    }
  },
  methods: {
    clickSearch () {
      this.showSearch = true
      if (this.keyword_items.length === 0) {
        for (var i = 0; i < this.shanghai_distrit_names.length; i++) {
          this.keyword_items.push({
            'name': this.shanghai_distrit_names[i],
            'type': 'place'
          })
        }
        this.axios.get(process.env.ROOT_API + '/keyword/road').then((response) => {
          var roadList = response.data
          for (var i = 0; i < roadList.length; i++) {
            this.keyword_items.push({
              'name': roadList[i],
              'type': 'road'
            })
          }
        })
        this.axios.get(process.env.ROOT_API + '/keyword/architecture').then((response) => {
          var architectureList = response.data
          for (var i = 0; i < architectureList.length; i++) {
            this.keyword_items.push({
              'name': architectureList[i],
              'type': 'architecture'
            })
          }
        })
      }
      console.log('search ok.' + this.keyword_name)
      console.log(process.env.ROOT_API)
    }
  },
  computed: {
    filterdRoadData () {
      return this.keyword_items.filter((option) => {
        return option.name
          .toString()
          .indexOf(this.keyword_name) >= 0
      }).filter((option, idx) => {
        return idx < 20
      })
    }
  }
}
</script>

<style lang="scss">
// body {
//   background-image: url("./assets/bg_index.jpg");
// }
.search-bar-container {
  width: 100%;
  margin-right: 0px;
}
.search-field-container {
  width: 80%
}
.search-button-container {
  display: block;
  height: 3.25rem;
  position: relative;
  width: 3rem;
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
