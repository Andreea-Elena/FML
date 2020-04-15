<template>
  <div>
      <h1>Register</h1>
      <input type="email" name="email" placeholder="email" v-model="username"/>
      <br>
      <input type="password" name="password" placeholder="password" v-model="password"/>
      <br>
      <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        username: this.username,
        password: this.password
      })
      console.log(response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
