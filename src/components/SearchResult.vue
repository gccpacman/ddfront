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
    search () {
      if (this.keyword_name) {
        if (this.keyword_type_group.includes('road')) {
          this.axios.get(process.env.ROOT_API + '/roads/', {
            params: {
              search: this.keyword_name
            }
          }).then((response) => {
            console.log(response.data)
            var roadList = response.data.results
            this.searchItemList = []
            for (var i = 0; i < roadList.length; i++) {
              var roadItem = roadList[i]
              var roadDescription = ''
              if (roadItem.des2 && roadItem.des2.length > 0) {
                roadDescription = roadItem.des2.substring(0, 25) + ' ...'
              } else if (roadItem.des) {
                roadDescription = roadItem.des.substring(0, 25) + ' ...'
              }
              this.searchItemList.push({
                'name': roadItem.name_chs,
                'road_name': '',
                'place_name': roadItem.place_name,
                'des2': roadDescription,
                'type': 'road',
                'link': 'road/' + roadItem._id
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
            this.searchItemList = []
            for (var i = 0; i < architectureList.length; i++) {
              var architectureItem = architectureList[i]
              var architectureDescription = ''
              if (architectureItem.des2 && architectureItem.des2.length > 0) {
                architectureDescription = architectureItem.des2.substring(0, 25) + ' ...'
              } else if (architectureItem.des) {
                architectureDescription = architectureItem.des.substring(0, 25) + ' ...'
              }
              this.searchItemList.push({
                'name': architectureItem.name_chs,
                'road_name': architectureItem.road_name_chs,
                'place_name': architectureItem.place_name,
                'des2': architectureDescription,
                'type': 'architecture',
                'link': 'architecture/' + architectureItem._id
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
      searchItemList: [],
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
