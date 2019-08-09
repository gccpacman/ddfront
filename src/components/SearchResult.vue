<template>
  <section>
    <div class="search-result-container">
      <b-tabs expanded position="is-toggle" class="block">
        <b-tab-item :label="road_result_count" icon="road" icon-pack="fas">
          <div class="container">
            <template v-for="roadItem in roadItemList">
              <article class="media" v-bind:item="roadItem" v-bind:key="roadItem.id">
                <div class="media-left">
                  <!--                <b-icon pack="fas" icon="road" size="is-small"></b-icon>-->
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
          </div>
          <b-loading :is-full-page="false" :active.sync="roadLoading" :can-cancel="false">
            <b-icon
              pack="fas"
              icon="sync-alt"
              size="is-large"
              custom-class="fa-spin">
            </b-icon>
          </b-loading>
        </b-tab-item>
        <b-tab-item :label="arch_result_count" icon="building" icon-pack="fas">
          <div>
            <template v-for="archItem in archItemList">
              <article class="media" v-bind:item="archItem" v-bind:key="archItem.id">
                <div class="media-left">
                  <!--                <b-icon pack="fas" icon="building" size="is-small"></b-icon>-->
                </div>
                <div class="media-content">
                  <div class="content">
                    <p @click='clickLink(archItem.type, archItem.id)'>
                      <strong>{{ archItem.name }}</strong> <small> {{ archItem.road_name}}  {{ archItem.place_name }}</small>
                      <br>
                      <small> {{ archItem.des2 }} </small>
                    </p>
                  </div>
                </div>
              </article>
            </template>
          </div>
          <b-loading :is-full-page="false" :active.sync="archLoading" :can-cancel="false">
            <b-icon
              pack="fas"
              icon="sync-alt"
              size="is-large"
              custom-class="fa-spin">
            </b-icon>
          </b-loading>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchResult',
  methods: {
    clickLink (itemType, itemId) {
      if (itemType === 'road') {
        this.$router.push({name: 'Road', params: { id: itemId }})
      } else if (itemType === 'architecture') {
        this.$router.push({name: 'Architecture', params: { id: itemId }})
      }
    },
    onSearch () {
      if (this.$parent.keyword_name) {
        this.roadItemList = []
        this.archItemList = []
        this.roadLoading = true
        this.archLoading = true
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
              roadDescription = roadItem.des2.substring(0, 40) + ' ...'
            } else if (roadItem.des) {
              roadDescription = roadItem.des.substring(0, 40) + ' ...'
            }
            this.roadItemList.push({
              'name': roadItem.name_chs,
              'place_name': roadItem.place_name2,
              'des2': roadDescription,
              'type': 'road',
              'id': roadItem._id
            })
          }
          this.roadLoading = false
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
              architectureDescription = architectureItem.des2.substring(0, 40) + ' ...'
            } else if (architectureItem.des) {
              architectureDescription = architectureItem.des.substring(0, 40) + ' ...'
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
          this.archLoading = false
        })
      }
    }
  },
  mounted () {
    this.$parent.keyword_name = this.$route.query.keyword
    this.$parent.showSearch = true
    this.$parent.getAutocomplateData()
    this.onSearch()
  },
  data () {
    return {
      rootApi: process.env.ROOT_API,
      roadLoading: true,
      archLoading: true,
      roadItemList: [],
      archItemList: [],
      searchKeyword: null
    }
  },
  computed: {
    road_result_count () {
      return '马路(' + this.roadItemList.length + ')'
    },
    arch_result_count () {
      return '建筑(' + this.archItemList.length + ')'
    }
  }
}
</script>

<style scoped>
.search-result-container {
  text-align: left;

}
</style>
