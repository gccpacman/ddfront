<template>
  <section>
    <div class="search-result-container">
      <template v-for="(searchItem, idx) in searchItemList">
        <article class="media" v-bind:item="searchItem" v-bind:key="idx">
          <div class="media-left">
            <b-icon pack="fas" icon="road" size="is-small"></b-icon>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong><a :href="searchItem.link">{{ searchItem.name }}</a></strong> <small> {{ searchItem.place_name }}</small>
                <br>
                <small> {{ searchItem.des2 }} </small>
              </p>
            </div>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchResult',
  methods: {
  },
  created () {
    this.axios.get(process.env.ROOT_API + '/roads/', {
      params: {
        search: this.$route.query.keyword
      }
    }).then((response) => {
      console.log(response.data)
      var roadList = response.data.results
      for (var i = 0; i < roadList.length; i++) {
        var road = roadList[i]
        var des2 = road.des2
        if (des2) {
          des2 = des2.substring(0, 25)
        }
        this.searchItemList.push({
          'name': road.name_chs,
          'place_name': road.place_name,
          'des2': des2,
          'type': 'road',
          'link': 'road/' + road._id
        })
      }
    })
  },
  data () {
    return {
      rootApi: process.env.ROOT_API,
      searchItemList: []
    }
  }
}
</script>

<style scoped>
.search-result-container {
  text-align: left;

}
</style>
