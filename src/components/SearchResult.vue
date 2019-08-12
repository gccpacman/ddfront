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
                    <p>
                      <router-link :to="{name: 'Road', params: { id: roadItem.id }}">
                        <strong>{{ roadItem.name }}</strong>
                      </router-link>
                      <small> {{ roadItem.place_name }}</small>
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
                    <p>
                      <router-link :to="{name: 'Architecture', params: { id: archItem.id }}">
                        <strong>{{ archItem.name }}</strong>
                      </router-link>
                      <small> {{ archItem.road_name}} - {{ archItem.place_name_str }}</small>
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
    onSearch (searchKeyword) {
      this.roadItemList = []
      this.archItemList = []
      this.roadLoading = true
      this.archLoading = true
      this.$axios.get(process.env.ROOT_API + '/roads/?search=' + searchKeyword).then((response) => {
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
      }).catch(function (error) {
        console.log(error)
      })
      this.$axios.get(process.env.ROOT_API + '/architectures/?search=' + searchKeyword).then((response) => {
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
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    this.onSearch(this.$parent.keyword_name)
  },
  data () {
    return {
      rootApi: process.env.ROOT_API,
      roadLoading: false,
      archLoading: false,
      roadItemList: [],
      archItemList: []
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
