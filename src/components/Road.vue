<template>
  <div>Road {{ $route.params.id }}</div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
  },
  created () {
    console.log('hello road')
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
