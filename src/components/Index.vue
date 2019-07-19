<template>
  <h1>
    hello VueJS!
  </h1>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    getPosts () {
      console.log('hello world')
      this.axios.get('http://127.0.0.1:8000/roads/1/').then((response) => {
        console.log(response)
      }).catch((response) => {
        console.log('error')
      })
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
