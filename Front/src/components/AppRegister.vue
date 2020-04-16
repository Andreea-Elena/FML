<template>
<v-container>

<v-col cols="12" sm="6" md="3">
     <v-form
    ref="form"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="username"
      :counter="10"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-btn
      color="grey lighten-4"
      class="mr-4"
      type="submit"
    >
      Login
    </v-btn>

  </v-form>
 </v-col>
</v-container>
 
</template>

<script>
export default {
    data(){
        return{
            username: null,
            password: null,
        }
    },
    methods:{
        submit(){
            console.log("Hello!");
        }
    }
}
</script>