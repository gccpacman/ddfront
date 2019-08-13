<template>
  <section>
    <div class="search-result-container">
      <b-tabs v-model="activeTab" expanded position="is-toggle" class="block">
        <b-tab-item :label="road_result_count" icon="road" icon-pack="fas">
          <div class="container">
            <template v-for="roadItem in roadItemList">
              <article class="media" v-bind:item="roadItem" v-bind:key="roadItem.id">
                <div class="media-left">
                  <!--                <b-icon pack="fas" icon="road" size="is-small"></b-icon>-->

                </div>
                <div class="media-content">
                  <div class="content">
                    <router-link :to="{name: 'Road', params: { id: roadItem._id }}">
                      <big><strong>{{ roadItem.name_chs }}</strong></big>
                    </router-link>
                    <b-tag v-if="roadItem.road_architecture && roadItem.road_architecture.length > 0" type="is-warning" ><b-icon pack="fas" icon="building" size="is-small"></b-icon> x {{roadItem.road_architecture.length }}</b-tag>
                    <b-tag v-if="roadItem.place_name2" type="is-success">{{ roadItem.place_name2 }}</b-tag>
                    <p>
                      <span v-if="roadItem.des2">
                        <small v-if="roadItem.des2.length < 150"> {{ roadItem.des2 }} </small>
                        <small v-else> {{ roadItem.des2.substring(0,148)+".." }} </small>
                      </span>
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
                  <img :src="archItem.first_image_path" style="height: 100px; width: 100px"/>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <router-link :to="{name: 'Architecture', params: { id: archItem._id }}">
                        <strong>{{ archItem.name_chs }}</strong>
                      </router-link>
                      <br>
                      <b-tag v-if="archItem.road_name_chs" type="is-primary">{{ archItem.road_name_chs }}</b-tag>
                      <b-tag v-if="archItem.place_name_str" type="is-success">{{ archItem.place_name_str }}</b-tag>
                      <br>
                      <span v-if="archItem.des2">
                        <small v-if="archItem.des2.length < 40"> {{ archItem.des2 }} </small>
                        <small v-else> {{ archItem.des2.substring(0,38)+".." }} </small>
                      </span>
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
      this.$axios.get(process.env.ROOT_API + '/roads/?ordering=-road_architecture_count&search=' + searchKeyword).then((response) => {
        console.log(response.data)
        this.roadItemList = response.data.results
        this.roadLoading = false
      }).catch(function (error) {
        console.log(error)
      })
      this.$axios.get(process.env.ROOT_API + '/architectures/?search=' + searchKeyword).then((response) => {
        console.log(response.data)
        this.archItemList = response.data.results
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
    activeTab () {
      if (this.roadItemList.length === 0 && this.archItemList.length > 0) {
        return 1
      }
      return 0
    },
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
