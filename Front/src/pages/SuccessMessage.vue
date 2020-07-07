<template>
  <q-card class="q-card-mess">
    <div
      id="text"
      class="text-h6"
      style="margin-top: 10px;"
    >Your meeting has been added.</div>

    <q-separator />
    <div class="q-pa-md flex flex-center">
      <q-circular-progress indeterminate size="50px" color="primary" class="q-ma-md" />
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'SuccesMessage',
  props: {
    source: String
  },
  data: function() {
    return {}
  },
  methods: {
    timeout: function() {
      setTimeout(() => {
        this.$router.push('meetings')
      }, 3000)
    }
  },

  created: function() {
    this.timeout()
  }
}
</script>

<style scoped>
/* .q-card__actions{
  padding:0px;
} */

#title {
  color: white;
  text-align: center;
}

#text {
  background-color: white;
  font-size: calc(10px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
  text-align: center;
  text-decoration: none;
}

.q-card {
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  height: 20%;
  padding: 3%;
  border-radius: 5px;
}
</style>
