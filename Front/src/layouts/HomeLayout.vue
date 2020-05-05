<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="text-white" height-hint="50" style="background-color:#42455a">
      <q-toolbar>
        <q-toolbar-title style="margin-left:2%">
          <i class="fab fa-connectdevelop"></i>
        Keep in touch
        </q-toolbar-title>
        <q-tabs align="right" class="gt-sm">
        <q-route-tab v-if="!loggedIn" to="/" label="Home" />
        <q-route-tab v-if="!loggedIn" to="/register" label="Register" />
        <q-route-tab v-if="!loggedIn" to="/login" label="Login" />
      </q-tabs>
       <q-tabs align="right" class="lt-md" v-if=!loggedIn>
        <q-btn
        flat
        dense
        round
        @click="leftDrawerOpen =!leftDrawerOpen"
        icon="menu"
        aria-label="Menu"/>
        <q-drawer
        v-model="leftDrawerOpen"
        bordered
        :width="200"
        content-class="bg-blue-3">
        <q-scroll-area class="fit">
          <q-list v-for="(menuItem, index) in menuList" :key="index">

            <q-item clickable v-ripple :to=menuItem.to>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>

           <q-separator v-if="menuItem.separator" />

          </q-list>
        </q-scroll-area>
        </q-drawer>
      </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-10 text-white" style="background-color:#42455a">
      <q-toolbar>
        <q-toolbar-title style="font-size:12px">
          Prin utilizarea serviciilor KIT, ești de acord cu Utilizarea modulelor cookie. Operăm la nivel global și utilizăm module cookie pentru analiză, personalizare și reclame.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: 'inbox',
    label: 'Home',
    separator: false,
    to:"/",
  },
  {
    icon: 'inbox',
    label: 'Login',
    separator: false,
    to: "/login",
  },
  {
    icon: 'delete',
    label: 'Register',
    separator: false,
    to: "/register",
  },
]



export default {
  data () {
    return {
      leftDrawerOpen: false,
      menuList
    }
  },
  computed:{
    loggedIn(){
      return this.$store.getters['appUtils/loggedIn']
    }
  }
}
</script>