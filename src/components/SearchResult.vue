<template>
  <section>
    <div class="search-result-container">
      <b-tabs expanded position="is-toggle" class="block">
        <b-tab-item :label="'马路(' + roadItemCount + ')'" icon="road" icon-pack="fas">
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
                    <b-tag v-else-if="roadItem.place_name" type="is-success">{{ roadItem.place_name }}</b-tag>
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
            <div class="container" style="padding-top: 60px">
              <b-pagination
                :total="roadItemCount"
                :current.sync="roadCurrent"
                range-before="1"
                range-after="1"
                per-page="10"
                order="is-centered"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
                @change="roadPageChange">
              </b-pagination>
            </div>
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
        <b-tab-item :label="'建筑(' + archItemCount + ')'" icon="building" icon-pack="fas">
          <div>
            <template v-for="archItem in archItemList">
              <article class="media" v-bind:item="archItem" v-bind:key="archItem.id">
                <div class="media-left">
                  <!--                <b-icon pack="fas" icon="building" size="is-small"></b-icon>-->
                  <img v-if="archItem.first_image_path" :src="archItem.first_image_path" style="height: 100px; width: 100px"/>
                  <img v-else src="../assets/archnopic.jpg" style="height: 100px; width: 100px"/>
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
            <div class="container" style="padding-top: 60px">
              <b-pagination
                :total="archItemCount"
                :current.sync="archCurrent"
                range-before="1"
                range-after="1"
                per-page="10"
                order="is-centered"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
                @change="archPageChange">
              </b-pagination>
            </div>
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
      this.roadCurrent = 1
      this.roadLoading = true
      this.$axios.get(process.env.ROOT_API + '/roads/?search=' + searchKeyword).then((response) => {
        console.log(response.data)
        this.roadItemList = response.data.results
        this.roadItemCount = response.data.count
        this.roadLoading = false
      }).catch(function (error) {
        console.log(error)
      })
      this.archItemList = []
      this.archCurrent = 1
      this.archLoading = true
      this.$axios.get(process.env.ROOT_API + '/architectures/?search=' + searchKeyword).then((response) => {
        console.log(response.data)
        this.archItemList = response.data.results
        this.archItemCount = response.data.count
        this.archLoading = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    roadPageChange (pageNumber) {
      this.roadCurrent = pageNumber
      this.roadItemList = []
      this.roadLoading = true
      this.$axios.get(process.env.ROOT_API + '/roads/?ordering=-road_architecture_count&search=' + this.$parent.keyword_name + '&page=' + this.roadCurrent).then((response) => {
        console.log(response.data)
        this.roadItemList = response.data.results
        this.roadItemCount = response.data.count
        this.roadLoading = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    archPageChange (pageNumber) {
      this.archCurrent = pageNumber
      this.archItemList = []
      this.archLoading = true
      this.$axios.get(process.env.ROOT_API + '/architectures/?search=' + this.$parent.keyword_name + '&page=' + this.archCurrent).then((response) => {
        console.log(response.data)
        this.archItemList = response.data.results
        this.archItemCount = response.data.count
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
      roadLoading: true,
      roadCurrent: 1,
      roadItemCount: 0,
      roadItemList: [],
      archCurrent: 1,
      archLoading: true,
      archItemCount: 0,
      archItemList: []
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
