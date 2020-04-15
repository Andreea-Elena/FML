<template>
  <v-layout column>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <v-toolbar flat dense class="cyan" dark>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>
      <v-text-field type="username" name="username" label="Username" v-model="username"/>
      <br>
      <v-text-field type="password" name="password" label="Password" v-model="password"/>
      <br>
      <div v-html="error" class="error"/>
      <br>
      <v-btn class="cyan" @click="register">Register</v-btn>
  </div>
  </v-layout>
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
