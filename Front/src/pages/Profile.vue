<template>
  <q-page>
    <div class="container">
      <q-card class="card absolute-center">
        <div class="hero"></div>
        <q-card-section class="main">
          <div class="user">
            <q-img
              class="avatar"
              :src="imgSrc"
              style="width:200px; height:200px"
            />
            <div class="user-details">
              <q-item-label class="text-bold">
                {{ name }}
              </q-item-label>
              <q-item-label v-if="seria"> Series: {{ seria }} </q-item-label>
              <q-item-label v-if="group"> Group: {{ group }} </q-item-label>
              <q-item-label v-if="promotion">
                Promotion: {{ promotion }}
              </q-item-label>
              <q-item-label v-if="job && company">
                Job: {{ job }}, {{ company }}
              </q-item-label>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="stats"> </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: "",
      name: "",
      seria: "",
      group: "",
      promotion: "",
      job: "",
      company: "",
      users: [],
    };
  },
  methods: {
    settings() {
      this.$router.push({ name: "settings" });
    }     
  },created: function() {
      if(!this.$route.params.id){
        this.imgSrc = this.$store.getters["appUtils/getProfileImage"];
        this.name=this.$store.getters["appUtils/getUserDetails"].firstName+" "+this.$store.getters["appUtils/getUserDetails"].lastName;
        this.seria=this.$store.getters["appUtils/getUserDetails"].seria;
        this.group=this.$store.getters["appUtils/getUserDetails"].group;
        this.promotion=this.$store.getters["appUtils/getUserDetails"].promotion;
        this.job=this.$store.getters["appUtils/getUserDetails"].job;
        this.company=this.$store.getters["appUtils/getUserDetails"].company;
      }else{
        this.users=this.$store.getters["appUtils/getAllUsers"]
        const user=this.users.find(item => item.id===this.$route.params.id)

        this.imgSrc="/statics/users/picture-"+user.id+"-1.jpg"

        this.name=user.firstName+" "+user.lastName
        this.seria=user.seria
        this.group=user.group
        this.promotion=user.promotion
        this.job=user.job
        this.company=user.company
      }
    }
};
</script>

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
    width: 50%;
    height: 300px;
    border-radius: 5px;
    box-shadow: 2px 5px 10px #000;
    background: #fff;
    .hero {
      height: 150px;
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
          top: -100px;
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
