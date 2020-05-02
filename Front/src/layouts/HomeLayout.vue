<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Keep in touch
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="right">
        <q-route-tab v-if="!loggedIn" to="/" label="Home" />
        <q-route-tab v-if="!loggedIn" to="/register" label="Register" />
        <q-route-tab v-if="!loggedIn" to="/login" label="Login" />
        <q-route-tab v-if="loggedIn" to="/logout" label="Logout" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title style="font-size:12px">
          Prin utilizarea serviciilor KIT, ești de acord cu Utilizarea modulelor cookie. Operăm la nivel global și utilizăm module cookie pentru analiză, personalizare și reclame.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed:{
    loggedIn(){
      return this.$store.getters['appUtils/loggedIn']
    }
  }
}
</script>