<template>
  <section>
    <div>
      <img src="@/assets/main.png">
    </div>
    <!-- <div class="columns is-mobile">
      <div class="column is-half">
      </div>
      <div class="column is-half">
        图片一
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-half">
        图片二
      </div>
      <div class="column is-half">
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column is-half">
      </div>
      <div class="column is-half">
        图片三
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    getPosts () {
      console.log('hello world')
    }
  },
  created () {
    this.getPosts()
  },
  data () {
    return {
      showNav: true
    }
  }
}
</script>

<style scoped>

</style>
