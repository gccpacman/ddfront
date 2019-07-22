<template>
  <div id="app">
    <section class="hero is-fullheight is-bold">
      <!-- Hero header: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <img src="http://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Logo">
            </a>
            <!--
        Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
        -->
            <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <!--
        Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
        -->
          <div class="navbar-menu" :class="{ 'is-active': showNav }">
            <div class="navbar-start">
              <a class="navbar-item" href="/form/">
                表格
              </a>
              <a class="navbar-item" href="/baidumap/">
                百度地图
              </a>
              <div class="navbar-item has-dropdown is-hoverable">
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
              </div>
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
      showNav: true
    }
  }
}
</script>

<style lang="scss">

// .navbar-item {
//   color:#4a4a4a !important;
// }
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
