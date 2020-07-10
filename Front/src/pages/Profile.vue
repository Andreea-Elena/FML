<template>
  <q-page>
    <body class="profile-page sidebar-collapse">
      <div class="wrapper">
        <div class="page-header clear-filter" filter-color="orange">
          <div class="page-header-image" data-parallax="true"></div>
          <div class="container">
            <div class="photo-container">
              <img :src="user.imgSrc" alt="" />
            </div>
            <h3 class="title">{{ user.name }}</h3>
            <p class="category" v-if="user.job">
              {{ user.job }} @ {{ user.company }}
            </p>
            <div class="content">
              <div class="social-description">
                <h2>{{ user.seria }}</h2>
                <p>Series</p>
              </div>
              <div class="social-description">
                <h2>{{ user.group }}</h2>
                <p>Group</p>
              </div>
              <div class="social-description">
                <h2>{{ user.promotion }}</h2>
                <p>Promition</p>
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="container">
            <h3 class="title" v-if="user.email">Contact</h3>
            <div class="description">
              <h5>Email: {{ user.email }}</h5>
              <h5>Tel: {{ user.phone }}</h5>
              <a v-if="user.facebook" :href="user.facebook">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="container">
            <h3 class="title" v-if="user.profile">About me</h3>
            <h5 class="description">
              {{ user.profile }}
            </h5>
          </div>
        </div>
      </div>
    </body>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      user: {
        imgSrc: "",
        name: "",
        seria: "",
        group: "",
        promotion: "",
        job: "",
        company: "",
        profile: "",
        email: "",
        phone: "",
        facebook: ""
      },
      users: [],
      images: []
    };
  },
  methods: {
    settings() {
      this.$router.push({ name: "settings" });
    },
  },
  created: async function() {
    await this.$store
      .dispatch("appUtils/retrieveAllUserImages")
      .then(res => {
        this.images = this.$store.getters["appUtils/getAllUserImages"];
      })
      .catch(err => {
        console.log(err);
      });
    if (!this.$route.params.id) {
      this.user.imgSrc = this.$store.getters["appUtils/getProfileImage"];
      this.user.name =
        this.$store.getters["appUtils/getUserDetails"].firstName +
        " " +
        this.$store.getters["appUtils/getUserDetails"].lastName;
      this.user.seria = this.$store.getters["appUtils/getUserDetails"].seria;
      this.user.group = this.$store.getters["appUtils/getUserDetails"].group;
      this.user.promotion = this.$store.getters[
        "appUtils/getUserDetails"
      ].promotion;
      this.user.job = this.$store.getters["appUtils/getUserDetails"].job;
      this.user.company = this.$store.getters[
        "appUtils/getUserDetails"
      ].company;
      this.user.profile = this.$store.getters[
        "appUtils/getUserDetails"
      ].profile;
      this.user.email = this.$store.getters["appUtils/getUserDetails"].email;
      this.user.phone = this.$store.getters["appUtils/getUserDetails"].phone;
      this.user.facebook = this.$store.getters[
        "appUtils/getUserDetails"
      ].facebook;
    } else {
      this.users = this.$store.getters["appUtils/getAllUsers"];
      const user = this.users.find(item => item.id === this.$route.params.id);

      const image = this.images.filter(item => item.idUser === user.id);
      if (image.length > 0){
      this.user.imgSrc = image[0].photo;
      }else this.user.imgSrc="..\\statics\\users\\default-profile.jpg"

      this.user.name = user.firstName + " " + user.lastName;
      this.user.seria = user.seria;
      this.user.group = user.group;
      this.user.promotion = user.promotion;
      this.user.job = user.job;
      this.user.company = user.company;
      this.user.profile = user.profile;
      this.user.phone = user.phone;
      this.user.email = user.email;
      this.user.facebook = user.facebook;
    }
  }
};
</script>

<style scoped>
h2,
h3,
h4,
h5 {
  font-weight: 400;
}

a {
  color: #f96332;
}

a:hover,
a:focus {
  color: #f96332;
}

h2,
.h2 {
  font-size: 2.5em;
  margin-bottom: 30px;
}

h3,
.h3 {
  font-size: 1.825em;
  margin-bottom: 30px;
  line-height: 1.4em;
}

h4,
.h4 {
  font-size: 1.5em;
  line-height: 1.45em;
  margin-top: 30px;
  margin-bottom: 15px;
}

h4 + .category,
h4.title + .category,
.h4 + .category,
.h4.title + .category {
  margin-top: -5px;
}

h5,
.h5 {
  font-size: 1.3em;
  line-height: 1.4em;
  margin-bottom: 15px;
}

h5.category,
.h5.category {
  font-weight: 400;
}

p {
  line-height: 1.61em;
  font-weight: 300;
  font-size: 1.2em;
}

.title {
  font-weight: 700;
  padding-top: 30px;
}

.title + .category {
  margin-top: -25px;
}

.description {
  color: #9a9a9a;
  font-weight: 300;
}

.category {
  text-transform: capitalize;
  font-weight: 700;
  color: #9a9a9a;
}

body {
  color: #2c2c2c;
  font-size: 14px;
  font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  border-radius: 1px;
}

.img-raised {
  box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.3);
}

.profile-page .page-header {
  min-height: 550px;
}

.profile-page .photo-container {
  width: 123px;
  height: 123px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.3);
}

.profile-page .title {
  text-align: center;
  margin-top: 30px;
}

.profile-page .description,
.profile-page .category {
  text-align: center;
}

.profile-page h5.description {
  max-width: 700px;
  margin: 20px auto 75px;
}

.profile-page .content {
  max-width: 450px;
  margin: 0 auto;
}

.profile-page .content .social-description {
  display: inline-block;
  max-width: 150px;
  width: 145px;
  text-align: center;
  margin: 15px 0 0px;
}

.profile-page .content .social-description h2 {
  margin-bottom: 15px;
}

.profile-page .button-container {
  text-align: center;
  margin-top: -106px;
}

.profile-page .collections img {
  margin-bottom: 30px;
}

.profile-page .page-header:before {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  content: "";
  background-color: rgba(0, 0, 0, 0.5);
}

.section {
  padding: 50px 0;
  position: relative;
  background: #ffffff;
}

.page-header {
  min-height: 100vh;
  max-height: 999px;
  padding: 0;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.page-header > .content {
  margin-top: 12%;
  text-align: center;
  margin-bottom: 50px;
}

.page-header > .container {
  z-index: 2;
  padding-top: 9vh;
}

.page-header .page-header-image {
  position: absolute;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.page-header .container {
  height: 100%;
  z-index: 1;
  text-align: center;
  position: relative;
}

.page-header .category,
.page-header .description {
  color: rgba(255, 255, 255, 0.8);
}

.page-header:after,
.page-header:before {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  content: "";
}

.clear-filter:after,
.clear-filter:before {
  display: none;
}

[data-background-color="orange"] {
  background-color: #e95e38;
}

[data-background-color="black"] {
  background-color: #2c2c2c;
}

[data-background-color]:not([data-background-color="gray"]) {
  color: #ffffff;
}

[data-background-color]:not([data-background-color="gray"]) .title,
[data-background-color]:not([data-background-color="gray"])
  .social-description
  h2,
[data-background-color]:not([data-background-color="gray"]) p {
  color: #ffffff;
}

[data-background-color]:not([data-background-color="gray"]) h2,
[data-background-color]:not([data-background-color="gray"]) h3,
[data-background-color]:not([data-background-color="gray"]) h4,
[data-background-color]:not([data-background-color="gray"]) h5,
[data-background-color]:not([data-background-color="gray"])
  a:not(.btn):not(.dropdown-item) {
  color: #ffffff;
}

[data-background-color]:not([data-background-color="gray"]) .description,
[data-background-color]:not([data-background-color="gray"])
  .social-description
  p {
  color: rgba(255, 255, 255, 0.8);
}
</style>
