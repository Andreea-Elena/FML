<template>
  <q-card>
    <q-form>
      <h4 style="text-align: center">
        Find your KIT accound
      </h4>
      <p>
        Please enter your email address or username.
      </p>
      <q-input label="Email/username" type="text" name="email"> </q-input>
      <div class="buttons">
        <q-btn
          label="Recover password"
          color="primary"
          @click="persistent = true"
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
      <q-tabs class="text-center q-pa-none" style="max-width:135px; margin-left:31%">
        <q-route-tab to="/login" label="Back to login" />
      </q-tabs>
    </q-form>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      persistent: false
    };
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
