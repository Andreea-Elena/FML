<template>
  <div>
      <h1>Register</h1>
      <input type="email" name="email" placeholder="email" v-model="username"/>
      <br>
      <input type="password" name="password" placeholder="password" v-model="password"/>
      <br>
      <div v-html="error" class="error"/>
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
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          username: this.username,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.message
        console.log(this.error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: red;
}
</style>
