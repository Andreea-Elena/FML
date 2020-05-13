<template>
<q-page style="background-color:#42455a" class="vertical-middle">
  <q-card class="absolute-center">
    <q-form ref="form" @submit="$refs.form.validate()" onsubmit="return false">
      <h4 style="text-align: center">
        Connect to your KIT account
      </h4>
      <q-input
        filled
        label="Username"
        type="text"
        name="username"
        v-model="username"
        :rules="[
          val => !!val || 'Field is required',
          val => val.length > 5 || 'Username must have at least 5 characters'
        ]"
        autocomplete="off"
      >
      </q-input>
      <q-input
        filled
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => !!val || 'Field is required',
          val => val.length >= 8 || 'Password must have at least 8 characters'
        ]"
        label="Password"
        v-model="password"
        autocomplete="off"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div v-html="error" class="error" />

      <div class="buttons">
        <q-btn type="submit" color="primary" @click="submit" label="Sign up" />
      </div>

      <q-tabs
        class="text-center q-pa-none"
        style="max-width:250px; margin-left:17%"
      >
        <q-route-tab to="/forgotpassword" label="Forgot password? Click here" />
      </q-tabs>
    </q-form>
  </q-card>
</q-page>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      isPwd: true,
      username: null,
      password: null,
      error: null
    };
  },
  methods: {
    async submit() {
      this.error = "";
      if(this.$refs.form.validate())
      this.$store
        .dispatch("appUtils/retrieveToken", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          if (this.error == "") this.$router.push({ name: "homepage" });
        })
        .catch(error => {
          this.error = error.message;
        });
    }
  },
  mounted(){
    this.username="",
    this.password=""
  }
};
</script>

<style scoped>
.q-card {
  padding: 15px;
  width: 30%;
  align-items: center;
}
.buttons {
  margin-top: 10%;
  margin-left: 37%;
}
.q-form {
  margin-left: 10%;
  margin-right: 10%;
}
.error {
  color: red;
}
</style>
