<template>
  <section v-if="arch">
    <div class="container context-container">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">{{ arch.place_name }}</a></li>
          <li><a href="#">{{ arch.road_name_chs }}</a></li>
          <li class="is-active">
            <a href="#" aria-current="page"></a>
            <b-dropdown aria-role="list">
              <a
                slot="trigger"
                role="button">
                <span>{{ arch.name_chs}}</span>
                <b-icon icon="angle-down" pack="fas" ></b-icon>
              </a>
              <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
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
    }
  },
  mounted () {
    console.log('hello architecture.')
    this.$axios.get(process.env.ROOT_API + '/architecture/' + this.$route.params.id).then((response) => {
      this.arch = response.data
    }).catch(function (error) {
      console.log(error)
    })
  },
  data () {
    return {
      arch: null
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
  .context-container {
    max-width: 690px;
  }
  .message-p {
    text-align: left;
    font-size: 15px;
    color: black;
  }
</style>
