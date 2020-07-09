<template>
  <q-page>
    <div id="content">
      <h1>Events</h1>
       <q-btn @click="addMeeting">Add Event</q-btn>
      <div v-for="meeting in totalMeetings" :key="meeting.id" id="list-content">
        <q-card
          style="background-color:#42455a"
          @click="redirectToMeeting(meeting)"
          class="row"
        >
          <q-card-section class="col-8">
            <div v-if= meeting.date class="text-subtitle1">Date: {{meeting.date | filter}}</div>
          </q-card-section>
          <q-card-section class="col">
            <div
              class="text-subtitle2"
            >Promotion: {{meeting.promotion}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>


<script>
export default {
  name: 'MyMeetings',
  data: function() {
    return {
      totalMeetings: ''
    }
  },
  methods: {
    redirectToMeeting(meeting) {
      console.log(meeting)
     // this.$store.dispatch('selectRequest', request)
      this.$router.push({
        name: 'meeting',
        params: { idMeeting: meeting.id }
      })
    },
    addMeeting() {
       this.$router.push({
        name: 'addMeeting',
      })
    }
  },
  created: function() {
    this.$store
      .dispatch("appUtils/retrieveAllMeetings")
      .then(res => {
        const category = this.$store.getters["appUtils/getAllMeetings"]
        this.totalMeetings = category
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  filters: {
  filter: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.substr(0,10)
  }
}
}
</script>


<style scoped>
.text-h6 {
  color: white;
  font-size: calc(20px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-subtitle1 {
  color: white;
  font-size: calc(10px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-subtitle2 {
  color: white;
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
  font-family: 'Raleway',sans-serif; 
  font-size: 62px; font-weight: 800; 
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

@media (max-width: 799px) {
  .q-card {
    width: 90%;
    padding: 2%;
    border-radius: 10px;
    margin-bottom: 1%;
  }
}
@media (min-width: 800px) {
  .q-card {
    width: 50%;
    padding: 2%;
    border-radius: 10px;
    margin-bottom: 1%;
  }
}

@media (min-width: 800px) {
  .q-btn {
    width: 50%;
    padding: 2%;
    border-radius: 10px;
    margin-bottom: 1%;
  }
}

@media (max-width: 799px) {
  .q-btn {
    width: 90%;
    padding: 2%;
    border-radius: 10px;
    margin-bottom: 1%;
  }
}

</style>
