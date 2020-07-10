<template>
  <q-page style="background-color:#42455a" class="vertical-middle">
      <q-card class="absolute-center">
    <q-form ref="form" onsubmit="return false" @submit="$refs.form.validate()">
              <h4 style="text-align: center">
        Please enter a new password
      </h4>
      <q-input
        ref=input1
        filled
        validate-on-blur
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => !!val || 'Field is required',
          val => val.length >= 8 || 'Password must have at least 8 characters'
        ]"
        label="New Password"
        v-model="newPassword"
        style="margin-top:20%"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
      ref=input2
        filled
        validate-on-blur
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          val => !!val || 'Field is required',
          val => val.length >= 8 || 'Password must have at least 8 characters',
          val => val===this.newPassword || 'Passwords must match'
        ]"
        label="Confirm password"
        v-model="password"
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
        <q-btn
          type="submit"
          color="white"
          label="Change password"
          @click="changePassword"
          class="text-black q-mt-xl"
        />
      </div>
    </q-form>
      </q-card>
  </q-page>
</template>

<script>
import RegisterService from "../services/RegisterService";
import { Notify } from "quasar";
import axios from "axios";
export default {
  data() {
    return {
      newPassword: "",
      password: "",
      error: "",
      isPwd: true
    };
  },
  methods: {
    async changePassword() {
    if(this.$refs.input1.validate() && this.$refs.input2.validate() ){
      const user = await this.$store.dispatch(
        "appUtils/retrieveUserDetails2",
        this.$route.params.email
      );
      await RegisterService.changePassword(user.idUserAuth, this.newPassword).then(response=>{
                    Notify.create({
            message: "Password successfully changed!",
            color: "positive"
          });
            this.$router.push({ name: "login" });
      })
    }
    }
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
  margin-left: 30%;
  margin-bottom: 10%;
}
.q-form {
  margin-left: 10%;
  margin-right: 10%;
}
.error {
  color: red;
}
</style>
