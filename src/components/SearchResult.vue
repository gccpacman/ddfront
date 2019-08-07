<template>
  <section>
    <div class="search-result-container">
      <b-tabs position="is-centered" class="block">
        <b-tab-item label="马路">
          <template v-for="roadItem in roadItemList">
            <article class="media" v-bind:item="roadItem" v-bind:key="roadItem.id">
              <div class="media-left">
                <b-icon pack="fas" icon="road" size="is-small"></b-icon>
              </div>
              <div class="media-content">
                <div class="content">
                  <p @click='clickLink(roadItem.type, roadItem.id)'>
                    <strong>{{ roadItem.name }}</strong> <small> {{ roadItem.place_name }}</small>
                    <br>
                    <small> {{ roadItem.des2 }} </small>
                  </p>
                </div>
              </div>
            </article>
          </template>
        </b-tab-item>
        <b-tab-item label="建筑">
          <template v-for="archItem in archItemList">
            <article class="media" v-bind:item="archItem" v-bind:key="archItem.id">
              <div class="media-left">
                <b-icon pack="fas" icon="building" size="is-small"></b-icon>
              </div>
              <div class="media-content">
                <div class="content">
                  <p @click='clickLink(archItem.type, archItem.id)'>
                    <strong>{{ archItem.name }}</strong> <small> {{ archItem.place_name }}</small>
                    <br>
                    <small> {{ archItem.des2 }} </small>
                  </p>
                </div>
              </div>
            </article>
          </template>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import {bus} from '../bus'

export default {
  name: 'SearchResult',
  methods: {
    clickLink (itemType, itemId) {
      this.$router.push('/' + itemType + '/' + itemId)
    },
    search () {
      if (this.$parent.keyword_name) {
        this.roadItemList = []
        this.archItemList = []
        this.axios.get(process.env.ROOT_API + '/roads/', {
          params: {
            search: this.$parent.keyword_name
          }
        }).then((response) => {
          console.log(response.data)
          var roadList = response.data.results
          for (var i = 0; i < roadList.length; i++) {
            var roadItem = roadList[i]
            var roadDescription = ''
            if (roadItem.des2 && roadItem.des2.length > 0) {
              roadDescription = roadItem.des2.substring(0, 25) + ' ...'
            } else if (roadItem.des) {
              roadDescription = roadItem.des.substring(0, 25) + ' ...'
            }
            this.roadItemList.push({
              'name': roadItem.name_chs,
              'place_name': roadItem.place_name,
              'des2': roadDescription,
              'type': 'road',
              'id': roadItem._id
            })
          }
        })
        this.axios.get(process.env.ROOT_API + '/architectures/', {
          params: {
            search: this.$parent.keyword_name
          }
        }).then((response) => {
          console.log(response.data)
          var architectureList = response.data.results
          for (var i = 0; i < architectureList.length; i++) {
            var architectureItem = architectureList[i]
            var architectureDescription = ''
            if (architectureItem.des2 && architectureItem.des2.length > 0) {
              architectureDescription = architectureItem.des2.substring(0, 25) + ' ...'
            } else if (architectureItem.des) {
              architectureDescription = architectureItem.des.substring(0, 25) + ' ...'
            }
            this.archItemList.push({
              'name': architectureItem.name_chs,
              'road_name': architectureItem.road_name_chs,
              'place_name': architectureItem.place_name,
              'des2': architectureDescription,
              'type': 'architecture',
              'id': architectureItem._id
            })
          }
        })
      }
    }
  },
  created () {
    this.$parent.keyword_name = this.$route.query.keyword
    this.$parent.showSearch = true
    this.$parent.getAutocomplateData()
    this.search()
    bus.$on('eventGreet', () => {
      this.search()
    })
  },
  data () {
    return {
      rootApi: process.env.ROOT_API,
      roadItemList: [],
      archItemList: [],
      searchKeyword: null
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.search-result-container {
  text-align: left;

}
</style>
