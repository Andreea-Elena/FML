<template>
  <q-page>
    <div id="content">
      <h1>Search for posts</h1>
      <div id="searching">
        <q-select
          v-model="option"
          :options="options"
          label="Options"
          class="select"
          @input="onToggleOption"
        >
          <template v-slot:prepend>
            <q-icon
              name="category"
              class="cursor-pointer"
              style="margin-left:5px;"
            />
          </template>
        </q-select>
      </div>

      <div v-for="post in filtered" :key="post.id" id="list-content">
        <div
          class="projcard-container"
          @click="redirectToPost(post)"
          v-if="check(post)"
        >
          <div class="projcard projcard-grey">
            <div class="projcard-innerbox">
              <img class="projcard-img" :src="getImage(post.id)" alt="" />
              <div class="projcard-textbox">
                <div class="projcard-title">{{ post.title }}</div>
                <a
                  class="projcard-subtitle"
                  @click="redirectToProfile(post.idUser)"
                >
                  by {{ getUser(post.idUser) }}
                </a>
                <div class="projcard-bar"></div>
                <div class="projcard-description">
                  {{ post.content }}
                </div>
                <div class="projcard-tagbox">
                  <span class="projcard-tag">{{ post.category }}</span>
                  <span class="projcard-tag">{{ post.visibility }}</span>
                  <span class="projcard-tag">{{
                    post.publishedAt | filter
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data: function() {
    return {
      filtered: [],
      option: "General",
      filteredPosts: [],
      options: ["Out of topic", "Jobs", "Academic", "Hobbies"],
      posts: [],
      images: [],
      image: null,
      users: []
    };
  },
  methods: {
    redirectToPost(user) {
      const image1 = this.images.filter(item => item.idPost === user.id);
      if (image1.length > 0) {
        this.image = image1[0].photo;
      } else this.image = "..\\statics\\posts\\default-post.jpg";
      this.$router.push({
        name: "post",
        params: {
          id: user.id,
          content: user.content,
          date: user.publishedAt,
          category: user.category,
          idUser: user.idUser,
          title: user.title,
          photo: this.image,
          visibility: user.visibility
        }
      });
    },
    redirectToProfile(idUser) {
      this.$router.push({
        name: "profile",
        params: { id: idUser }
      });
    },
    onToggleOption() {
      this.filtered = this.posts.filter(item => item.category === this.option);
      this.filteredUsers = this.filtered;
    },
    onFilter() {
      if (this.search !== "") {
        this.filtered = this.filteredUsers
          .filter(item =>
            `${item.firstName} ${item.lastName}`
              .toLowerCase()
              .includes(this.search.toLowerCase())
          )
          .sort((a, b) => {
            if (a.publishedAt.localeCompare(b.publishedAt) < 0) {
              return b;
            } else return a;
          });
      } else this.filtered = this.filteredUsers;
    },
    getImage(id) {
      const image = this.images.filter(item => item.idPost === id);
      if (image.length > 0) {
        return image[0].photo;
      } else return "..\\statics\\posts\\default-post.jpg";
    },
    getUser(id) {
      const user = this.users.filter(item => item.id === id);
      if (user[0]) return user[0].firstName + " " + user[0].lastName;
    },
    check(post) {
      const user = this.users.filter(item => item.id === post.idUser);
      if (user[0]) {
        if(post.visibility==='General')
        return true;
        if ((user[0].promotion === this.$store.getters["appUtils/getUserDetails"].promotion))
        if((post.visibility.includes('Series') && user[0].seria.split(" ") == this.$store.getters["appUtils/getUserDetails"].seria)
        || ((post.visibility.includes('Group') && user[0].group.split(" ") == this.$store.getters["appUtils/getUserDetails"].group)))
          return true;
      }
      return false;
    }
  },
  created: function() {
    this.$store
      .dispatch("appUtils/retrieveAllPosts")
      .then(res => {
        this.posts = this.$store.getters["appUtils/getAllPosts"];
        this.filtered = this.posts;
      })
      .catch(err => {
        console.log(err);
      });

    this.$store
      .dispatch("appUtils/retrieveAllPostImages")
      .then(res => {
        this.images = this.$store.getters["appUtils/getAllPostImages"];
      })
      .catch(err => {
        console.log(err);
      });

    this.$store
      .dispatch("appUtils/retrieveAllUsers")
      .then(res => {
        this.users = this.$store.getters["appUtils/getAllUsers"];
      })
      .catch(err => {
        console.log(err);
      });
  },
  filters: {
    filter: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.substr(0, 10);
    }
  }
};
</script>

<style scoped>
.text-h6 {
  font-size: calc(20px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-subtitle1 {
  font-size: calc(10px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-subtitle2 {
  font-size: calc(13px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
}

#list-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  align-items: center;
}
h1 {
  position: relative;
  font-size: calc(
    14px + (26 - 14) * ((100vw - 300px) / (1600 - 300))
  ) !important;
  line-height: calc(3.5em + (1.5 - 1.2) * ((100vw - 300px) / (1600 - 300)));
  text-align: center;
  letter-spacing: 0.5em;
  width: fit-content;
  color: #ffffff;
  font-family: "Raleway", sans-serif;
  font-size: 62px;
  font-weight: 800;
  line-height: 72px;
  margin: 0 0 24px;
  text-align: center;
  text-transform: uppercase;
}
.q-page {
  justify-content: center;
  display: flex;
  margin: 0 auto;
  direction: column;
  width: 100%;
  height: 100%;
}

@media (min-width: 800px) {
  .q-card {
    width: 50%;
    padding: 2%;
    border-radius: 10px;
    margin-bottom: 2%;
  }
  .select {
    width: 40%;
    margin-bottom: 1%;
    background-color: rgba(250, 250, 250, 0.5);
    border-radius: 5px;
  }

  .search {
    width: 60%;
    margin-bottom: 1%;
    background-color: rgba(250, 250, 250, 0.5);
    border-radius: 5px;
    margin-right: 2%;
  }
  #searching {
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: center;
    margin-bottom: 2%;
  }
  .avatar {
    border-radius: 50%;
    position: relative;
  }
}

.projcard-container {
  margin-top: 50px;
}

/* Actual Code: */
.projcard-container,
.projcard-container * {
  box-sizing: border-box;
}
.projcard-container {
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
}
.projcard {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
  border: 2px solid #ddd;
  font-size: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.projcard:hover {
  box-shadow: 0 34px 32px -33px rgba(0, 0, 0, 0.18);
  transform: translate(0px, -3px);
}
.projcard::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(-70deg, #424242, transparent 50%);
  opacity: 0.07;
}
.projcard:nth-child(2n)::before {
  background-image: linear-gradient(-250deg, #424242, transparent 50%);
}
.projcard-innerbox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.projcard-img {
  position: absolute;
  height: 300px;
  width: 400px;
  top: 0;
  left: 0;
  transition: transform 0.2s ease;
}
.projcard:nth-child(2n) .projcard-img {
  left: initial;
  right: 0;
}
.projcard:hover .projcard-img {
  transform: scale(1.05) rotate(1deg);
}
.projcard:hover .projcard-bar {
  width: 70px;
}
.projcard-textbox {
  position: absolute;
  top: 7%;
  bottom: 7%;
  left: 430px;
  width: calc(100% - 470px);
  font-size: 17px;
}
.projcard:nth-child(2n) .projcard-textbox {
  left: initial;
  right: 430px;
}
.projcard-textbox::before,
.projcard-textbox::after {
  content: "";
  position: absolute;
  display: block;
  background: #ff0000bb;
  background: #fff;
  top: -20%;
  left: -55px;
  height: 140%;
  width: 60px;
  transform: rotate(8deg);
}
.projcard:nth-child(2n) .projcard-textbox::before {
  display: none;
}
.projcard-textbox::after {
  display: none;
  left: initial;
  right: -55px;
}
.projcard:nth-child(2n) .projcard-textbox::after {
  display: block;
}
.projcard-textbox * {
  position: relative;
}
.projcard-title {
  font-family: "Voces", "Open Sans", arial, sans-serif;
  font-size: 24px;
}
.projcard-subtitle {
  font-family: "Voces", "Open Sans", arial, sans-serif;
  color: #888;
}
.projcard-bar {
  left: -2px;
  width: 50px;
  height: 5px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #424242;
  transition: width 0.2s ease;
}

.projcard-yellow .projcard-bar {
  background-color: #f5af41;
}
.projcard-yellow::before {
  background-image: linear-gradient(-70deg, #f5af41, transparent 50%);
}
.projcard-yellow:nth-child(2n)::before {
  background-image: linear-gradient(-250deg, #f5af41, transparent 50%);
}
.projcard-grey .projcard-bar {
  background-color: #424242;
}
.projcard-grey::before {
  background-image: linear-gradient(-70deg, #424242, transparent 50%);
}
.projcard-grey:nth-child(2n)::before {
  background-image: linear-gradient(-250deg, #424242, transparent 50%);
}
.projcard-customcolor .projcard-bar {
  background-color: var(--projcard-color);
}
.projcard-customcolor::before {
  background-image: linear-gradient(
    -70deg,
    var(--projcard-color),
    transparent 50%
  );
}
.projcard-customcolor:nth-child(2n)::before {
  background-image: linear-gradient(
    -250deg,
    var(--projcard-color),
    transparent 50%
  );
}
.projcard-description {
  font-size: 15px;
  color: #424242;
  height: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.projcard-tagbox {
  position: absolute;
  bottom: 3%;
  font-size: 14px;
  cursor: default;
  user-select: none;
  pointer-events: none;
}
.projcard-tag {
  display: inline-block;
  background: #e0e0e0;
  color: #777;
  border-radius: 3px 0 0 3px;
  line-height: 26px;
  padding: 0 10px 0 23px;
  position: relative;
  margin-right: 20px;
  cursor: default;
  user-select: none;
  transition: color 0.2s;
}
.projcard-tag::before {
  content: "";
  position: absolute;
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  height: 6px;
  left: 10px;
  width: 6px;
  top: 10px;
}
.projcard-tag::after {
  content: "";
  position: absolute;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #e0e0e0;
  border-top: 13px solid transparent;
  right: -10px;
  top: 0;
}
</style>
