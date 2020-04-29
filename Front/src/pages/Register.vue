<template>
  <q-card>
    <h4 style="text-align: center">
      Register
    </h4>
    <q-form
      ref="form"
      @submit="$refs.form.validate()"
      onsubmit="return false"
    >
      <q-input
        v-model="firstName"
        label="First Name"
        type="text"
        name="firstName"
        :rules="[val => !!val || 'Field is required']"
      >
      </q-input>
      <q-input
        v-model="lastName"
        label="Last Name"
        type="text"
        name="lastName"
        validate-on-blur
        :rules="[val => !!val || 'Field is required']"
      >
      </q-input>
      <q-input
        v-model="phone"
        label="Phone"
        type="text"
        name="phone"
        validate-on-blur
        mask="(###) ### - ####"
        :rules="[
          val => !!val || 'Field is required',
          val => val.length >= 16 || 'Must have 10 digits'
        ]"
      >
      </q-input>
      <q-input
        label="Email"
        type="email"
        v-model="email"
        validate-on-blur
        :rules="[val => !!val || 'Field is required', isValidEmail]"
      >
        <template v-slot:before>
          <q-icon name="mail" />
        </template>
      </q-input>
      <q-input
        label="Username"
        type="text"
        name="username"
        v-model="username"
        validate-on-blur
        :rules="[
          val => !!val || 'Field is required',
          val => val.length > 5 || 'Username must have at least 5 characters'
        ]"
      >
      </q-input>
      <q-input
        filled
        validate-on-blur
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
      <q-input
        filled
        :type="isPwd ? 'password' : 'text'"
        validate-on-blur
        :rules="[
          val => !!val || 'Field is required',
          val => val == this.password || 'Passwords don t match'
        ]"
        label="Confirm Password"
        v-model="confpassword"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="q-md" style="max-width: 250px">
        <q-select
          v-model="model"
          validate-on-blur
          :options="options"
          label="Role"
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div v-html="error" class="error" />
      <div class="buttons">
        <q-btn
          type="submit"
          color="primary"
          label="Register"
          @click="register"
        />
      </div>

      <q-checkbox
        v-model="customModel"
        validate-on-blur
        color="secondary"
        label="Do you agree with the terms & conditions?"
        true-value="Yes"
        false-value="No"
        :rules="[customModel == true || 'You must accept Terms & conditions']"
      />
      <strong> {{ customModel }}</strong>

      <a @click="fixed = true" style="margin-left: 33%">
        Terms & conditions
      </a>
      <q-dialog
        v-model="basic"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">Terms of Agreement</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p v-for="n in 15" :key="n">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
              perferendis totam, ea at omnis vel numquam exercitationem aut,
              natus minima, porro labore.
            </p>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="fixed">
        <q-card>
          <q-card-section>
            <div class="text-h6">Terms of Agreement</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <p v-for="n in 15" :key="n">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
              perferendis totam, ea at omnis vel numquam exercitationem aut,
              natus minima, porro labore.
            </p>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </q-card>
</template>

<script>
import RegisterService from "../services/RegisterService";
import axios from "axios";
export default {
  data() {
    return {
      options: ["Student", "Profesor"],
      model: null,
      customModel: "No",
      fixed: false,
      basic: false,
      isPwd: true,
      username: null,
      password: null,
      confpassword: null,
      firstName: null,
      lastName: null,
      phone: null,
      email: null,
      flag: null,
      error: null
    };
  },
  methods: {
    isValidEmail() {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.email) || "Invalid email";
    },
    async register() {
      this.error = "";
      this.flag = null;
      let role=this.model==="Student" ? 2:1;
      try {
        await RegisterService.register({
          username: this.username,
          password: this.password,
          idRole: role
        });
        await axios
          .get("http://localhost:8080/api/getuserlogin/" + this.username)
          .then(response => (this.flag = response.data.id));
        console.log(this.flag);
        await RegisterService.addUserDet({
          FirstName: this.firstName,
          LastName: this.lastName,
          email: this.email,
          phone: this.phone,
          idUserAuth: this.flag
        });
        if(this.$refs.form.validate()){
          alert("User created successfully");
        }
      } catch (error) {
        this.error = error.response.data.message;
        if (this.flag != null) await RegisterService.deleteUserAuth(this.flag);
        console.log(error);
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
  margin-top: 2%;
  margin-bottom: 2%;
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
