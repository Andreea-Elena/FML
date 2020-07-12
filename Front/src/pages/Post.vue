<template>
  <q-page>
    <div id="content">
      <div class="container">
        <h1 class="text-center">{{ this.$route.params.title }}</h1>
        <h5 class="text-center" @click="redirectToProfile()" style="margin-left:50%">
          by {{ getUser(this.$route.params.idUser) }}
        </h5>
        <div class="row">
          <div class="col-sm-offset-2" id="picture-container">
            <img
              v-if="
                this.$route.params.photo !=
                  '..\\statics\\posts\\default-post.jpg'
              "
              :src="this.$route.params.photo"
              alt=""
            />
          </div>
          <div class=" col-sm-offset-2" id="timeline-container">
            <p>
              {{ this.$route.params.content }}
            </p>
          </div>
          <a v-if="validAuthor()" @click="deletePost()" style="margin-left: 80%; width:20%">
          Delete Post
          </a>
          <a v-if="validAuthor()" @click="editPost()" style="margin-left: 80%; width:20%">
          Edit Post
          </a>
        </div>
      </div>
      <div class="comments-container">
        <h1>Comments</h1>

        <div id="addComment">
          <q-input square outlined v-model="text" label="Add comment" />
          <q-btn @click="addComment">
            Add
          </q-btn>
        </div>

        <ul
          class="comments-list"
          v-for="comment in comments.slice().reverse()"
          :key="comment.id"
          id="list-content"
        >
          <li>
            <div class="comment-main-level">
              <div class="comment-box">
                <div class="comment-head">
                  <h6 class="comment-name">
                    <a>User</a>
                  </h6>
                  <span>{{ comment.publishedAt | filter }}</span>
                  <i class="fa fa-reply"></i>
                  <i class="fa fa-heart"></i>
                </div>
                <div class="comment-content">
                  {{ comment.content }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
export default {
  data: function() {
    return {
      comments: [],
      text: null,
      comment: {
        content: null,
        title: null,
        idPost: null,
        publishedAt: null
      },
      users: []
    };
  },
  methods: {
    addComment() {
      this.comment.publishedAt = Date.now();
      this.comment.content = this.text;
      this.comment.title = this.$route.params.title;
      this.comment.idPost = this.$route.params.id;
      this.$store
        .dispatch("appUtils/addPostComment", this.comment)
        .then(res => {
          Notify.create({
            message: "Comment added!",
            color: "positive"
          });

          this.$store
            .dispatch("appUtils/retrievePostComments", this.$route.params.id)
            .then(res => {
              this.comments = this.$store.getters[
                "appUtils/getAllPostComments"
              ];
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(error => {
          console.log(error);
          Notify.create({
            message: "Comment cannot be blank!",
            color: "negative"
          });
        });
    },
    getUser(id) {
      const user = this.users.filter(item => item.id === id);
      if (user[0]) return user[0].firstName + " " + user[0].lastName;
    },
    redirectToProfile() {
      this.$router.push({
        name: "profile",
        params: { id: this.$route.params.idUser }
      });
    },
    deletePost(){
     this.$store.dispatch(
          "appUtils/deletePost",
          this.$route.params.id
        );
        this.$router.push({name:"homepage"})
    },
    editPost(){
      this.$router.push({name:"addpost",
      params: this.$route.params}
      )
    },
    validAuthor(){
      if(this.$route.params.idUser == this.$store.getters["appUtils/getIdUserAuth"])
      return true
      return false
    }
  },
  created: function() {
    this.$store
      .dispatch("appUtils/retrievePostComments", this.$route.params.id)
      .then(res => {
        this.comments = this.$store.getters["appUtils/getAllPostComments"];
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
.container {
  margin-top: 40px;
  margin-bottom: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: rgb(240, 240, 240);
  border-radius: 5px;
  width: 50%;
  padding: 2%;
  border-radius: 10px;
}

h1 {
  font-size: 60px;
}

h2 {
  padding-bottom: 20px;
  padding-right: 50px;
  padding-left: 50px;
}

#picture-container {
  margin-top: 30px;
  background-color: white;
  border-radius: 1px;
}

#picture-description-container {
  padding-top: 5px;
}

#timeline-container {
  padding-top: 20px;
}

img {
  width: 100%;
}
.text-h6 {
  font-size: calc(20px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-subtitle1 {
  font-size: calc(10px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
}

.q-page {
  justify-content: center;
  margin: 0 auto;
  direction: column;
  width: 100%;
  height: 100%;
}

#content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  align-items: center;
}

#list-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#addComment {
  width: 100%;
  height: 100%;
  display: flex;

  align-items: center;
}

@media (min-width: 800px) {
  .q-card {
    width: 50%;
    padding: 2%;
    border-radius: 10px;
  }

  .q-input {
    width: 79%;
    border-radius: 10px;
  }

  .q-btn {
    width: 15%;
    border-radius: 10px;
  }
}

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

a {
  color: #03658c;
  text-decoration: none;
}

ul {
  list-style-type: none;
}

body {
  font-family: "Roboto", Arial, Helvetica, Sans-serif, Verdana;
  background: #dee1e3;
}

/** ====================
 * Lista de Comentarii
 =======================*/
.comments-container {
  width: 800px;
  margin-bottom: 100px;
}

.comments-container h1 {
  font-size: 36px;
  color: #283035;
  font-weight: 400;
}

.comments-container h1 a {
  font-size: 18px;
  font-weight: 700;
}

.comments-list {
  margin-top: 10px;
  position: relative;
}

.comments-list li {
  margin-bottom: 10px;
  display: block;
  position: relative;
}

.comments-list li:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  width: 0;
}

.comment-main-level:after {
  content: "";
  width: 0;
  height: 0;
  display: block;
  clear: both;
}

.comments-list .comment-box {
  width: 680px;
  float: right;
  position: relative;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}

.comments-list .comment-box:before,
.comments-list .comment-box:after {
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  display: block;
  border-width: 10px 12px 10px 0;
  border-style: solid;
  border-color: transparent #fcfcfc;
  top: 8px;
  left: -11px;
}

.comments-list .comment-box:before {
  border-width: 11px 13px 11px 0;
  border-color: transparent rgba(0, 0, 0, 0.05);
  left: -12px;
}

.comment-box .comment-head {
  background: #fcfcfc;
  padding: 10px 12px;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
}

.comment-box .comment-head i {
  float: right;
  margin-left: 14px;
  position: relative;
  top: 2px;
  color: #a6a6a6;
  cursor: pointer;
  -webkit-transition: color 0.3s ease;
  -o-transition: color 0.3s ease;
  transition: color 0.3s ease;
}

.comment-box .comment-head i:hover {
  color: #03658c;
}

.comment-box .comment-name {
  color: #283035;
  font-size: 14px;
  font-weight: 700;
  float: left;
  margin-right: 10px;
}

.comment-box .comment-name a {
  color: #283035;
}

.comment-box .comment-head span {
  float: left;
  color: #999;
  font-size: 13px;
  position: relative;
  top: 1px;
}

.comment-box .comment-content {
  background: #fff;
  padding: 12px;
  font-size: 15px;
  color: #595959;
  -webkit-border-radius: 0 0 4px 4px;
  -moz-border-radius: 0 0 4px 4px;
  border-radius: 0 0 4px 4px;
}

.comment-box .comment-name.by-author,
.comment-box .comment-name.by-author a {
  color: #03658c;
}
.comment-box .comment-name.by-author:after {
  content: "autor";
  background: #03658c;
  color: #fff;
  font-size: 12px;
  padding: 3px 5px;
  font-weight: 700;
  margin-left: 10px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
@media only screen and (max-width: 766px) {
  .comments-container {
    width: 480px;
  }

  .comments-list .comment-box {
    width: 390px;
  }
}
</style>
