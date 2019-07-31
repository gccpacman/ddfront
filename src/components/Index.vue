<template>
  <section>
    <h1>
      hello VueJS!
    </h1>
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
