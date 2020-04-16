<template>
  <v-card
    flat
    color="grey lighten-4"
    height="200px"
    tile
  >
    <v-toolbar dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      prominent>    

      <v-toolbar-title>Keep in touch</v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <router-link to="/">
        <v-btn text >Home</v-btn>
        </router-link>
        <router-link to="/register">
        <v-btn text >Register</v-btn>
        </router-link>
        <router-link to="/login">
        <v-btn text >Login</v-btn>
        </router-link>
      </div>
    
    </v-toolbar>
  </v-card>
</template>

