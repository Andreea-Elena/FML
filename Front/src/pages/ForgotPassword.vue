<template>
  <q-card>
    <q-form>
      <h4 style="text-align: center">
        Find your KIT account
      </h4>
      <p>
        Please enter your email address.
      </p>
      <q-input label="Email" type="text" name="email" v-model="email">
      </q-input>
      <div class="buttons">
        <q-btn
          label="Recover password"
          color="primary"
          @click="persistent = true && sendEmail()"
        />
      </div>
      <q-dialog
        v-model="persistent"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="bg-teal text-white" style="width: 300px">
          <q-card-section>
            <div class="text-h6">An email has been sent</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Please check your email.
          </q-card-section>

          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-tabs
        class="text-center q-pa-none"
        style="max-width:135px; margin-left:31%"
      >
        <q-route-tab to="/login" label="Back to login" />
      </q-tabs>
    </q-form>
  </q-card>
</template>

<script>
import { Notify } from "quasar";
export default {
  data() {
    return {
      persistent: false,
      email: "",
      users: []
    };
  },
  methods: {
    sendEmail() {
      const user = this.users.filter(item => item.email == this.email);
      if (user.length == 1) {
        this.$store.dispatch("appUtils/sendEmail", this.email).then(res => {
          Notify.create({
            message: "Email sent!",
            color: "positive"
          });
          this.$router.push({
            name: "home"
          });
        });
      }else {
        Notify.create({
            message: "This email doesn't exist!",
            color: "negative"
          });
      }
    }
  },
  created: function() {
    this.$store
      .dispatch("appUtils/retrieveAllUsers")
      .then(res => {
        this.users = this.$store.getters["appUtils/getAllUsers"];
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.q-card {
  padding: 15px;
  width: 30%;
  margin-left: 35%;
  margin-top: 7%;
  margin-bottom: 2%;
}
.buttons {
  margin-top: 10%;
  margin-left: 27%;
}
.q-form {
  margin-left: 10%;
  margin-right: 10%;
}
</style>
