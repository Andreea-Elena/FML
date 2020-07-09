<template>
  <q-page>
    <div id="content" class="q-pa-md">
      <div>
        <h1>Event photos</h1>
        <div class="q-pa-md">
          <input
            type="file"
            filled
            style="max-width: 300px"
            accept=".jpg, image/*"
            @change="onFileSelected"
            multiple
          />
        </div>
        <q-btn @click="addImages">Add images</q-btn>
      </div>

      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="meetingImage in allMeetingImages"
          :key="meetingImage.id"
          id="list-content"
        >
          <q-card
            style="position: relative; width: 300px; height: 300px; overflow: hidden; background-color:black"
          >
            <img
              :src="meetingImage.photo"
              style="position: absolute; max-width: 100%; width: 100%; height: auto; top: 50%; left: 50%; transform: translate( -50%, -50%);"
            />
          </q-card>
        </q-intersection>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      slide: 1,
      selectedFile: [],
      allMeetingImages: [],
      all: [],
      meetingImage: {
        photo: null,
        idMeeting: null
      }
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files;
    },
    addImages() {
      for (var i = 0; i < this.selectedFile.length; i++) {
        const fd = new FormData();
        this.meetingImage.photo = this.selectedFile[i];
        this.meetingImage.idMeeting = this.$route.params.idMeeting;
        this.$store.dispatch("appUtils/addMeetingImage", this.meetingImage);
      }
      this.$store
        .dispatch(
          "appUtils/retrieveMeetingImages",
          this.$route.params.idMeeting
        )
        .then(res => {
          const meetingImages = this.$store.getters[
            "appUtils/getAllMeetingImages"
          ];
          this.all = meetingImages;
        })
        .catch(err => {
          console.log(err);
        });
      this.allMeetingImages = this.all;
    }
  },
  created: function() {
    this.$store
      .dispatch("appUtils/retrieveMeetingImages", this.$route.params.idMeeting)
      .then(res => {
        const meetingImages = this.$store.getters[
          "appUtils/getAllMeetingImages"
        ];
        this.all = meetingImages;
        this.allMeetingImages = this.all;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
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

.example-item {
  height: 290px;
  width: 290px;
  max-height: 290px;
  max-width: 290px;
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
