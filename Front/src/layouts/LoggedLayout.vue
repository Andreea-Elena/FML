<template>
  <q-layout view="hHh lpR fFf">
    <div class="background-image" />
    <q-header elevated class="text-white" style="background-color:#42455a">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          Keep in touch
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      style="margin-top=100px"
      v-if="loggedIn"
    >
      <q-scroll-area class="fit" style="background-color:#42455a">
        <div class="q-pa-md" style="align-items: center">
          <div class="container">
            <q-card class="card">
              <div class="hero"></div>
              <q-card-section class="main" @click="editProfile">
                <div class="user">
                  <q-img class="avatar" :src="imgSrc" style="width:100px; height:100px"/>
                  <div class="user-details">
                    <q-item-label class="text-bold">
                      {{name}}
                    </q-item-label>
                    <q-item-label v-if="seria">
                      Series: {{seria}}
                    </q-item-label>
                    <q-item-label v-if="group">
                      Group: {{group}}
                    </q-item-label>
                    <q-item-label v-if="promotion">
                      Promotion: {{promotion}}
                    </q-item-label>
                    <q-item-label v-if="job && company">
                      Job: {{job}}, {{company}}
                    </q-item-label>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="stats">
              </q-card-section>
            </q-card>
          </div>
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
                  <q-item-section @click="profile"
                    >See your profile</q-item-section
                  >
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

    <q-page-container>
      <router-view />
    </q-page-container>
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
    menu: true
  }
];
export default {
  data() {
    return {
      left: false,
      right: false,
      menuList,
      imgSrc: "",
      name: null,
      seria: null,
      group: null,
      promotion: null,
      job:null,
      company:null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters["appUtils/loggedIn"];
    }
  },
  methods: {
    profile() {
      this.$router.push({ name: "profile" });
    },
    settings() {
      this.$router.push({ name: "settings" });
    },
    editProfile(){
      this.$router.push({ name: "settings" });
    }
  },
  async created() {
    await this.$store
      .dispatch("appUtils/retrieveUserDetails")
      .then(async result => {
        await this.$store
          .dispatch(
            "appUtils/retrieveProfileImage",
            this.$store.getters["appUtils/getUserDetails"].id
          )
          .catch(error => {
            console.log(error.message);
          });
        this.imgSrc = this.$store.getters["appUtils/getProfileImage"];
        this.name=this.$store.getters["appUtils/getUserDetails"].firstName+" "+this.$store.getters["appUtils/getUserDetails"].lastName;
        this.seria=this.$store.getters["appUtils/getUserDetails"].seria;
        this.group=this.$store.getters["appUtils/getUserDetails"].group;
        this.promotion=this.$store.getters["appUtils/getUserDetails"].promotion;
        this.job=this.$store.getters["appUtils/getUserDetails"].job;
        this.company=this.$store.getters["appUtils/getUserDetails"].company;
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};
</script>

<style scoped>
.background-image {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;
  display: block;
  background: url("../assets/Graduation.jpg");
  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}

.imag {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>

<style lang="scss" scoped>
body {
  font-family: "Arimo", sans-serif;
  background: #efefef;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  .dim {
    color: #999;
    a {
      color: #999;
      &:hover {
        background: rgb(73, 144, 226);
        color: white;
      }
    }
  }

  .card {
    width: 280px;
    border-radius: 5px;
    box-shadow: 2px 5px 10px #000;
    background: #fff;
    .hero {
      height: 100px;
      background: url("../assets/background.jpg");
      background-size: cover;
      border-radius: 5px 5px 0px 0px;
    }

    .main {
      padding: 0 10px;
      .user {
        display: flex;
        height: 100px;
        .avatar {
          border-radius: 50%;
          border: 3px solid #fff;
          position: relative;
          top: -50px;
        }
        .user-details {
          margin-left: 10px;
          margin-top: 10px;
          h3 {
            margin: 0;
          }
        }
      }
      
    }
  }
}
</style>
