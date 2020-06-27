<template>
  <q-page>
    <div id="content">
      <h1>Meetings</h1>
      <div v-for=" request in totalRequests" :key="request.request.id" id="list-content">
        <q-card
          style="background-color: rgba(47,72,88,0.9);"
          @click="redirectToRequest(request)"
          class="row"
        >
          <q-card-section class="col-8">
            <div class="text-h6">{{request.request.title}}</div>
            <div class="text-subtitle1">{{request.request.date}}</div>
          </q-card-section>
          <q-card-section class="col">
            <div
              class="text-subtitle2"
            >{{request.userRequest.firstName}} {{request.userRequest.lastName}}</div>
            <div class="text-subtitle1">{{request.userRequest.departament}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>


<script>
export default {
  name: 'MyRequests',
  data: function() {
    return {
      totalRequests: ''
    }
  },
  methods: {
    redirectToRequest(request) {
      console.log(request)
      this.$store.dispatch('selectRequest', request)
      this.$router.push({
        name: 'request',
        params: { idRequest: request.request.id }
      })
    }
  },
  created: function() {
    this.$store
      .dispatch('allRequests')
      .then(res => {
        const category = this.$store.getters.getAllRequests
        console.log(category)
        this.totalRequests = category
        console.log(category)
      })
      .catch(error => {
        console.log(error.message)
      })
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
  color: #2f4858;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5em;

  text-shadow: 2px 2px #ffffff;
  font-weight: 500;
  width: fit-content;
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
</style>
