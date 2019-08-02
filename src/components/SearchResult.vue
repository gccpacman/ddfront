<template>
  <section>
   
  </section>
</template>

<script>
export default {
  name: 'SearchResult',
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
