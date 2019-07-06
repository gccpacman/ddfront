<template>
  <section class="level">
    <div class="level-left is-fullwidth has-text-left">
      <form
        id="app"
        @submit="checkForm"
        action="https://vuejs.org/"
        method="post"
      >
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </p>
        <b-field label="Name">
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="Age">
          <b-input v-model="age" type="number" min="0"></b-input>
        </b-field>
        <b-field label="Email">
          <b-input v-model="email" type="email"></b-input>
        </b-field>
        <b-field label="Favorite Movie">
          <b-select
            id="movie"
            v-model="movie"
            name="movie"
          >
            <option>Star Wars</option>
            <option>Vanilla Sky</option>
            <option>Atomic Blonde</option>
          </b-select>
        </b-field>
        <b-button type="submit" value="Submit">
          Submit
        </b-button>
      </form>
    </div>
    <div class="level-right">

    </div>
  </section>
</template>

<script>
export default {
  name: 'FormCheck',
  data () {
    return {
      errors: [],
      name: null,
      age: null,
      email: null,
      movie: null
    }
  },
  methods: {
    checkForm: function (e) {
      this.errors = []

      if (!this.name) {
        this.errors.push('Name required.')
      }
      if (!this.age) {
        this.errors.push('Age required.')
      }
      if (!this.email) {
        this.errors.push('Email required.')
      } else if (!this.validateEmail(this.email)) {
        this.errors.push('Email not validate.')
      }

      if (!this.errors.length) {
        return true
      }

      e.preventDefault()
    },
    validateEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>

<style scoped>

</style>
