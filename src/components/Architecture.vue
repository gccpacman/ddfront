<template>
  <section>
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ name_chs }}
          </h1>
          <h2 class="subtitle">
            {{ road_name_chis }}  {{ place_name }}
          </h2>
        </div>
      </div>
    </section>
    <div>
        <img :src="first_image_path" />
    </div>
    <article class="message is-small is-warning">
      <div class="message-body">
        <p>{{ des2 }}</p>
      </div>
    </article>
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
  created () {
    console.log('hello architecture.')
    this.axios.get(process.env.ROOT_API + '/architecture/' + this.$route.params.id).then((response) => {
      this.name_chs = response.data.name_chs
      this.des2 = response.data.des2
      this.road_name_chis = response.data.road_name_chis
      this.place_name = response.data.place_name
      this.first_image_path = response.data.first_image_path
    }).catch(function (error) {
      console.log(error)
    })
  },
  data () {
    return {
      name_chs: '路名',
      des2: '描述',
      road_name_chis: '路名',
      place_name: '所在区',
      first_image_path: null
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
