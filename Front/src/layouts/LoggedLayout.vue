<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white" style="background-color:#42455a">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          Keep in touch
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      bordered
      style="margin-top=100px"
      v-if="loggedIn"
    >
      <q-scroll-area class="fit" style="background-color:#42455a">
        <div class="q-pa-md">
          <q-item style="max-width: 300px">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <q-list
          v-for="(menuItem, index) in menuList"
          :key="index"
          class="q-pa-md"
        >
          <q-item clickable v-ripple :to="menuItem.to">
            <q-item-section avatar class="text-white">
              <div style="font-size: 2em">
                <q-icon :name="menuItem.icon" />
              </div>
            </q-item-section>
            <q-item-section class="text-h6 text-white">
              {{ menuItem.label }}
            </q-item-section>

            <q-menu
              v-if="menuItem.menu"
              transition-show="rotate"
              transition-hide="rotate"
              class="q-ml-xl"
            >
              <q-list style="min-width: 200px">
                <q-item clickable>
                  <q-item-section @click="profile">See your profile</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section @click="settings">Settings </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="right"
      side="right"
      bordered
      class="text-cyan"
    >
      <q-scroll-area
        class="fit"
        style="background-color:#42455a"
      ></q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-black" style="background-color:#42455a">
      <q-toolbar>
        <q-toolbar-title style="font-size:12px">
          Prin utilizarea serviciilor KIT, ești de acord cu Utilizarea modulelor
          cookie. Operăm la nivel global și utilizăm module cookie pentru
          analiză, personalizare și reclame.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: "home",
    label: "Home",
    to: "/logged"
  },
    {
    icon: "all_inbox",
    label: "Write Post",
    to: "/addpost"
  },
  {
    icon: "find_in_page",
    label: "Explore",
    to: "/logged"
  },
  {
    icon: "notifications",
    label: "Notifications",
    to: "/logged"
  },
  {
    icon: "group",
    label: "Groups",
    to: "/logged"
  },
  {
    icon: "exit_to_app",
    label: "Logout",
    to: "/logout"
  },
  {
    icon: "more_vert",
    label: "More",
    menu: true,
  }
];
export default {
  data() {
    return {
      left: false,
      right: false,
      menuList
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["appUtils/loggedIn"];
    },
    
  },
  methods:{
      profile(){
      this.$router.push({ name: "profile" })
    },
          settings(){
      this.$router.push({ name: "settings" })
    }
  },
  created() {
    this.$store
      .dispatch("appUtils/retrieveUserDetails")
      .then(result => {
        this.account = this.store.getters["appUtils/getUserDetails"];
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};
</script>
