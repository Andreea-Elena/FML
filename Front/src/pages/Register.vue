<template>
  <q-card>
    <h4 style="text-align: center">
      Register
    </h4>
    <q-form>
      <q-input label="First Name" type="text" name="firstName"> </q-input>
      <q-input label="Last Name" type="text" name="lastName"> </q-input>
      <q-input label="Phone" type="text" name="phone"> </q-input>
      <q-input label="Email" type="text" name="email"> </q-input>
      <q-input label="Username" type="text" name="username"> </q-input>
      <q-input label="Password" type="password" name="password"> </q-input>
      <q-input label="Confirm password" type="password" name="confirmPassword">
      </q-input>
      <div class="q-md" style="max-width: 250px">
        <q-select v-model="model" :options="options" label="Role" />
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
       <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
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
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
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
       fixed: false
    };
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
