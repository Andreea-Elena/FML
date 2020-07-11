<template>
  <q-page>
    <q-card
      style="background-color:#42455a; width:50%"
      class="absolute-center q-pa-md"
    >
      <q-item class="text-h5 text-white q-ml-l">
        Write a post
      </q-item>
      <q-form>
        <div class="q-pa-md">
          <q-select v-model="category1" style="max-width: 200px" label="Choose visibility" v-if="valid()" :options="categories1"></q-select>
          <q-select v-model="category1" style="max-width: 200px" label="Choose visibility" v-if="!valid()" :options="['General']"></q-select>
          <q-select v-model="category2" style="max-width: 200px" label="Choose category" :options="categories2"></q-select>
          <q-input v-model="title" label="Post Title"></q-input>
          <q-input
            v-model="editor"
            filled
            style="background-color:#42455a"
            class="text-white"
            autogrow
          />
          <div class="q-pa-md">
            <input
              type="file"
              filled
              style="max-width: 300px"
              accept=".jpg"
              @change="onFileSelected"
            />
          </div>
          <q-btn
            color="white-3"
            text-color="white"
            icon="send"
            class="q-ml-auto"
            @click="createPost"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import PostService from "../services/PostService";
import axios from "axios";
export default {
  data() {
    return {
      editor: "",
      title: null,
      selectedFile: null,
      category1: null,
      category2: null,
      categories1: [
        "General",
       (this.$store.getters["appUtils/getUserDetails"].seria+" Series")|| null,
       (this.$store.getters["appUtils/getUserDetails"].group+" Group")|| null,
        (this.$store.getters["appUtils/getUserDetails"].promotion+" Promotion")|| null
      ],
        categories2: [
        "Academic",
        "Jobs",
        "Hobbies",
        "Out of topic"
      ],
    };
  },
  methods: {
    counterLabelFn({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`;
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile)
    },
    async createPost(){
        await PostService.add({
          title: this.title,
          content: this.editor,
          idUser: this.$store.getters["appUtils/getIdUserAuth"],
          visibility: this.category1,
          category: this.category2,
          publishedAt: Date.now()
        }).then(async response=> {
          if (this.selectedFile) {
            const fd = new FormData();
            fd.append("image", this.selectedFile);
            fd.append(
              "idPost",
              response.data.result.id
            );

            await PostService.uploadImage(fd);
          }
          alert("Post successfully added!")
          });
    },
      valid(){
      if(this.$store.getters["appUtils/getUserDetails"].promotion)
      return false
    }
  }
};
</script>
