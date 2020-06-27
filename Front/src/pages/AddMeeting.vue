<template>
  <q-page>
    <div id="content" v-if="!this.success">
      <h1>Add Meeting</h1>
      <q-card class="q-card-form">
        <q-form id="form" style="margin-top:5%;">
          <q-input
            ref="input1"
            v-model="request.title"
            label="Titlu"
            color="primary"
            type="text"
            :rules="inputRules"
          />

          <q-input
            ref="input2"
            v-model="request.message"
            label="Mesaj"
            type="textarea"
            color="primary"
            :rules="messageRules"
          />
          <q-input
            ref="input3"
            v-model="request.file"
            color="primary"
            hint="File - pdf"
            type="file"
            @input="val => { request.file = val[0] }"
          />
        </q-form>
        <div class="buttons">
          <q-btn color="primary" v-on:click="sendRequest" width="60%">Trimite cererea</q-btn>
        </div>
      </q-card>
    </div>
    <Success v-if="this.success" />
  </q-page>
</template>

<script>
import Success from 'pages/SuccessMessage'
import { Notify } from 'quasar'
export default {
  name: 'AddRequest',
  components: {
    Success
  },
  data: function() {
    return {
      request: {
        title: '',
        message: '',
        file: ''
      },
      success: false,
      inputRules: [
        value => value.length > 3 || 'Minimum length is 3 characters!',
        value => value.length < 20 || 'Maximum length is 20 characters!'
      ],
      messageRules: [
        value => value.length < 250 || 'Maximum length is 250 characters!'
      ]
    }
  },
  methods: {
    sendRequest: function() {
      if (
        this.$refs.input1.validate() &&
        this.$refs.input2.validate() &&
        this.$refs.input3.validate()
      ) {
        this.$store
          .dispatch('addRequest', this.request)
          .then(res => {
            this.success = true
          })
          .catch(error => {
            console.log(error)
            Notify.create({
              message: 'There was an error!',
              color: 'negative'
            })
          })
      }
    }
  }
}
</script>



<style  scoped>
.buttons {
  display: flex;
  margin-top: 10%;
  align-items: center;
  display: flex;
  flex-direction: column;
}

@media (min-width: 800px) {
  .q-card-form {
    width: 40%;
    padding: 3%;
    border-radius: 5px;
  }
}
@media (max-width: 799px) {
  .q-card-form {
    padding: 3%;
    border-radius: 5px;
  }
}

.q-form {
  background-color: white;
  color: #2f4858;
}

.text-h4 {
  font-size: calc(20px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-h6 {
  font-size: calc(15px + (15 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-h5 {
  font-size: calc(20px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-subtitle2 {
  font-size: calc(10px + (20 - 14) * ((100vw - 250px) / (1600 - 300)));
}

img {
  align-self: center;
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

a {
  text-decoration: none;
  color: black;
}

.image-div {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: row;
}

#image-div {
  display: flex;
  width: 50%;
  height: 100%;
  position: relative;
  justify-content: center;
  border-radius: 50%;
}

#image-text-div {
  display: flex;
  width: 50%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.div-center {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: row;
  justify-content: center;
}
.div-center-buttons {
  margin-top: 2%;
  display: flex;
  width: 20%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
