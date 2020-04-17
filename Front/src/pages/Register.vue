<template>
  <q-card>
    <h4 style="text-align: center">
      Register
    </h4>
    <q-form>
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
        :rules="[val => !!val || 'Field is required']"
      >
      </q-input>
      <q-input
        v-model="phone"
        label="Phone"
        type="text"
        name="phone"
        mask="(###) ### - ####"
        :rules="[val => !!val || 'Field is required',
        val => val.length>=16 || 'Must have 10 digits']"
      >
      </q-input>
      <q-input
      label="Email"
        type="email"
        v-model="email"
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
        :rules="[val => !!val || 'Field is required']"
      >
      </q-input>
      <q-input
        filled
        :type="isPwd ? 'password' : 'text'"
        :rules="[val => !!val || 'Field is required',
        val => val.length >= 8 || 'Password must have at least 8 characters']"
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
        :rules="[val => !!val || 'Field is required',
        val=> val== this.password || 'Passwords don t match']"
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
          :options="options"
          label="Role"
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="buttons">
        <q-btn color="primary" label="Register" />
      </div>

      <q-checkbox
        v-model="customModel"
        color="secondary"
        label="Do you agree with the terms & conditions?"
        true-value="Yes"
        false-value="No"
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
      email: null
    };
  },
  methods: {
  isValidEmail () {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(this.email) || 'Invalid email';
  },
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
</style>
