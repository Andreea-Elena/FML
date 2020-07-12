<template>
  <q-page>
        <div id="content">
    <q-card
      style=" width:50%"
      class="absolute-center q-pa-md"
    >
      <q-item class="text-h5 q-ml-l">
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
            class="text-white"
            autogrow
            label="Write post..."
          />
          <div class="q-pa-md">
            <input
              type="file"
              filled
              style="max-width: 300px"
              accept=".jpg"
              @change="onFileSelected"
              v-if="validPic()"
            />
          </div>
          <q-btn
            icon="send"
            class="q-ml-auto"
            @click="createPost"
            style="margin-left: 39%; width:20%"
          />
        </div>
      </q-form>
    </q-card>
        </div>
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
      if(!this.$route.params.content){
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
          this.$router.push({name:"homepage"})
      }else{
        this.$store.dispatch(
          "appUtils/updatePost",
          {
            id:this.$route.params.id,
            visibility:this.category1,
            category:this.category2,
            title:this.title,
            content:this.editor
          }
        );
        this.$router.push({name:"homepage" })
      }
    },
      valid(){
      if(this.$store.getters["appUtils/getUserDetails"].promotion)
      return true
      return false
    },
    validPic(){
      if(!this.$route.params.content)
      return true
      return false
    }
  },
  created(){
    if(this.$route.params){
      this.category1=this.$route.params.visibility
      this.category2=this.$route.params.category
      this.title=this.$route.params.title
      this.editor=this.$route.params.content
    }
  }
};
</script>

<style scoped>
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

#content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  align-items: center;
}

</style>
