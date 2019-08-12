<template>
  <section v-if="arch">
    <div class="container context-container">
      <nav class="breadcrumb bread-nav" aria-label="breadcrumbs" v-if='road'>
        <ul>
          <li><a href="#"><b-icon size="is-small" icon="map-marker" pack="fas" ></b-icon> {{ arch.place_name_str }}</a></li>
          <li>
            <router-link :to="{name: 'Road', params: { id: road._id }}">
              <a href="#"><b-icon size="is-small" icon="road" pack="fas" ></b-icon>{{ road.name_chs }}</a>
            </router-link>
          </li>
          <li class="is-active">
            <b-dropdown aria-role="list">
              <a
                slot="trigger"
                role="button">
                <b-icon size="is-small" icon="building" pack="fas" ></b-icon>
                <span>{{ arch.name_chs}}</span>
                <b-icon icon="angle-down" pack="fas" ></b-icon>
              </a>
              <template v-for="archItem in road.road_architecture">
                <b-dropdown-item has-link v-bind:key="archItem._id" v-bind:item="archItem" aria-role="listitem" @click="clickArchItem(archItem._id)">
                  <b-icon size="is-small" icon="building" pack="fas" ></b-icon>
                  {{ archItem.name_chs }}
                </b-dropdown-item>
              </template>
              <!-- <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item> -->
            </b-dropdown>
          </li>
        </ul>
      </nav>
      <section class="hero is-warning is-small">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ arch.name_chs}}
            </h1>
            <h2 class="subtitle">
              <small>{{ arch.road_name_chs }}</small>
            </h2>
          </div>
        </div>
      </section>
      <img :src="arch.first_image_path" />
      <article class="message is-warning">
        <div class="message-body">
          <p class="message-p"  v-html='arch.des_html'></p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Architecture',
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
    },
    clickArchItem (archId) {
      this.$router.push('/architecture/' + archId)
      var archList = this.road.road_architecture
      for (var i = 0; i < archList.length; i++) {
        if (archList[i]._id === archId) {
          this.arch = archList[i]
          console.log(this.arch)
          return
        }
      }
    }
  },
  mounted () {
    console.log('hello architecture.')
    this.$axios.get(process.env.ROOT_API + '/architecture/' + this.$route.params.id).then((response) => {
      this.arch = response.data
      this.$axios.get(this.arch.road).then((responseRoad) => {
        this.road = responseRoad.data
      }).catch(function (errorRoad) {
        console.log(errorRoad)
      })
    }).catch(function (error) {
      console.log(error)
    })
  },
  data () {
    return {
      arch: null,
      road: null
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
  .message-p {
    text-align: left;
    font-size: 15px;
    color: black;
  }
  .bread-nav a{
    color: black!important;
  }
</style>
