<template>
  <q-card>
    <q-form
      ref="form"
      @submit="$refs.form.validate()"
      onsubmit="return false">
      <h4 style="text-align: center">
        Connect to your KIT account
      </h4>
      <q-input
        filled
        label="Username"
        type="text"
        name="username"
        v-model="username"
        :rules="[val => !!val || 'Field is required',
         val => val.length > 5 || 'Username must have at least 5 characters']"
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isPwd: true,
      username: null,
      password: null,
      error:null
    };
  },
  methods: {
    async submit() {
      this.error="";
      await axios
          .get("http://localhost:8080/api/getuserlogin/" + this.username)
          .then(response => (this.flag = response.data.password));
          if(this.flag){
            if(this.flag===this.password){

            }else{
              this.error="Password isn't correct!"
            }            
          }else{
            this.error="User doesn't exist";
          }

    }
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
.error{
  color: red;
}
</style>
