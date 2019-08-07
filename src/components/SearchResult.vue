<template>
  <section>
    <div class="box">
      <b-field>
        <b-autocomplete field="name" v-model="keyword_name" :data="filterdRoadData" :open-on-focus="true" placeholder="输入路名: e.g. 武康路" @select="option => selected = option">
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
        <b-button @click="search">
          <b-icon
          pack="fas"
          icon="search"
          size="is-big">
          </b-icon>
        </b-button>
      </b-field>
      <b-field>
        <b-checkbox v-model="keyword_type_group"
            native-value="road" >
            马路
        </b-checkbox>
        <b-checkbox v-model="keyword_type_group"
            native-value="architecture">
            建筑
        </b-checkbox>
      </b-field>
    </div>
    <div class="search-result-container">
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
    </div>
  </section>
</template>

<script>
export default {
  name: 'SearchResult',
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
    clickLink (itemType, itemId) {
      this.$router.push('/' + itemType + '/' + itemId)
    },
    search () {
      this.searchItemList = []
      if (this.keyword_name) {
        if (this.keyword_type_group.includes('road')) {
          this.axios.get(process.env.ROOT_API + '/roads/', {
            params: {
              search: this.keyword_name
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
                'road_name': '',
                'place_name': roadItem.place_name,
                'des2': roadDescription,
                'type': 'road',
                'id': roadItem._id
              })
            }
          })
        }
        if (this.keyword_type_group.includes('architecture')) {
          this.axios.get(process.env.ROOT_API + '/architectures/', {
            params: {
              search: this.keyword_name
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
    }
  },
  created () {
    this.getAutocomplateData()
    this.keyword_name = this.$route.query.keyword
    this.search()
  },
  data () {
    return {
      rootApi: process.env.ROOT_API,
      keyword_type_group: ['road', 'architecture'],
      keyword_name: '',
      keyword_icon: '',
      keyword_selected: null,
      sh_distrit_list: [],
      sh_road_list: [],
      sh_architecture_list: [],
      roadItemList: [],
      archItemList: [],
      searchKeyword: null
    }
  },
  computed: {
    filterdRoadData () {
      var keywordItems = this.sh_distrit_list
      if (this.keyword_type_group.includes('road')) {
        keywordItems = keywordItems.concat(this.sh_road_list)
      }
      if (this.keyword_type_group.includes('architecture')) {
        keywordItems = keywordItems.concat(this.sh_architecture_list)
      }
      return keywordItems.filter((option) => {
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

<style scoped>
.search-result-container {
  text-align: left;

}
</style>
