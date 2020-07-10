<template>
  <q-page>
    <div id="content">
      <div class="projcard-container">
        <div class="projcard projcard-grey">
          <div class="projcard-innerbox">
            <img
              class="projcard-img"
              :src="
                '\\statics\\posts\\picture-' +
                  this.$route.params.id +
                  '-' +
                  this.$route.params.idUser +
                  '.jpg'
              "
              alt="This post contains no picture"
            />
            <div class="projcard-textbox">
              <div class="projcard-title">{{ this.$route.params.title }}</div>
              <div class="projcard-subtitle">
                This post belongs to the category
                {{ this.$route.params.category }}
              </div>
              <div class="projcard-bar"></div>
              <div class="projcard-description">
                {{ this.$route.params.content }}
              </div>
              <div class="projcard-tagbox">
                <span class="projcard-tag">{{
                  this.$route.params.category
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="addComment">
        <q-input square outlined v-model="text" label="Add comment" />
        <q-btn @click="addComment">
          Add
        </q-btn>
      </div>

      <div v-for="comment in comments" :key="comment.id" id="list-content">
        <q-card
          style="background-color:rgba(255,255,255,0.7);"
          class="card-request row"
        >
          <q-card-section class="col-6">
            <div class="text-subtitle1">Content: {{ comment.content }}</div>
            <div class="text-subtitle1">
              Date: {{ comment.publishedAt | filter }}
            </div>
          </q-card-section>
        </q-card>
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
      }
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
  flex-direction: column;
  align-items: center;
}

@media (min-width: 800px) {
  .q-card {
    width: 50%;
    padding: 2%;
    border-radius: 10px;
  }

  .q-input {
    width: 50%;
    border-radius: 10px;
  }

  .q-btn {
    width: 50%;
    border-radius: 10px;
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
