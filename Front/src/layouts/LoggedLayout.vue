<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered style="margin-top=100px" v-if="loggedIn">
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

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
const menuList = [
    {
    icon: 'inbox',
    label: 'Explore',
    separator: false,
    to:"/logged",
  },
      {
    icon: 'inbox',
    label: 'Notifications',
    separator: false,
    to:"/logged",
  },
    {
    icon: 'inbox',
    label: 'Messages',
    separator: false,
    to:"/logged",
  },
        {
    icon: 'inbox',
    label: 'Groups',
    separator: false,
    to:"/logged",
  },
    {
    icon: 'inbox',
    label: 'Logout',
    separator: false,
    to:"/logout",
  },
    {
    icon: 'inbox',
    label: 'More',
    separator: false,
    to:"/logged",
  },
]
export default {
  data () {
    return {
      left: false,
      right: false,
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