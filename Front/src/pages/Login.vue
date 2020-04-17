<template>
  <q-card>
    <q-form>
      <h4 style="text-align: center">
        Connect to your KIT account
      </h4>
      <q-input label="Username" type="text" name="username"> </q-input>
      <q-input label="Password" type="password" name="password"> </q-input>

      <div class="buttons">
        <q-btn color="primary" label="Sign up" />
      </div>

      <q-tabs class="text-center q-pa-none" style="max-width:250px; margin-left:17%">
        <q-route-tab to="/forgotpassword" label="Forgot password? Click here" />
      </q-tabs>
    </q-form>
  </q-card>
</template>

<script>
export default {};
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
</style>
