<template>
  <q-page>
    <div class="q-pa-md" style="width:60%">
      <q-splitter v-model="splitterModel" style="height: 850px">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-white">
            <q-tab name="edit" label="Edit Profile" />
            <q-tab name="change" label="Change Password" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            style="border-radius: 10px"
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel
              name="edit"
              class="text-white"
              style="background-color:#42455a"
            >
              <q-form
                class="q-pa-md"
                ref="form"
                @submit="$refs.form.validate()"
                onsubmit="return false"
                style="width: 50%"
              >
                <q-input
                  v-model="firstName"
                  label="First Name"
                  type="text"
                  name="firstName"
                >
                </q-input>
                <q-input
                  v-model="lastName"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  validate-on-blur
                >
                </q-input>
                <q-input
                  v-model="phone"
                  label="Phone"
                  type="text"
                  name="phone"
                  validate-on-blur
                  mask="(###) ### - ####"
                  :rules="[val => val.length >= 16 || 'Must have 10 digits']"
                >
                </q-input>
                <q-input
                  label="Email"
                  type="email"
                  v-model="email"
                  validate-on-blur
                  :rules="[isValidEmail]"
                >
                  <template v-slot:before>
                    <q-icon name="mail" />
                  </template>
                </q-input>
                <q-input
                  v-model="profile"
                  label="Enter description"
                  type="text"
                  name="profile"
                  validate-on-blur
                >
                </q-input>
                <q-input v-model="job" label="Job" type="text" name="job">
                </q-input>
                <q-input
                  v-model="company"
                  label="Company"
                  type="text"
                  name="company"
                >
                </q-input>
                <q-input
                  label="Link to facebook"
                  type="text"
                  v-model="facebook"
                  validate-on-blur
                  :rules="[isValidFacebook]"
                >
                </q-input>
                <q-input filled v-model="group" label="Group" />

                <div class="q-md" style="max-width: 250px">
                  <q-select
                    v-model="seria"
                    validate-on-blur
                    :options="serii"
                    label="Series"
                  />
                </div>
                <div class="q-md" style="max-width: 250px">
                  <q-select
                    v-model="specialisation"
                    validate-on-blur
                    :options="specialisations"
                    label="Specialisation"
                  />
                </div>
                <div class="q-md" style="max-width: 250px">
                  <q-select
                    v-model="promotion"
                    validate-on-blur
                    :options="promotions"
                    label="Promotion"
                  />
                </div>

                <div id="app">
                    <p class="q-mt-xl text-black">Select a profile picture</p>
                      <div class="q-pa-md">
                      <input
                        type="file"
                        filled
                        style="max-width: 300px"
                        accept=".jpg, image/*"
                        @change="onFileSelected"
                      />
                    </div>
                </div>
                <div v-html="error" class="error" />
                <div class="buttons">
                  <q-btn
                    type="submit"
                    color="white"
                    label="Edit Profile"
                    @click="editProfile"
                    class="text-black q-mt-xl"
                  />
                </div>
              </q-form>
            </q-tab-panel>

            <q-tab-panel
              name="change"
              class="text-white"
              style="background-color:#42455a"
            >
              <q-form>
                <q-input
                  filled
                  validate-on-blur
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    val => !!val || 'Field is required',
                    val =>
                      val.length >= 8 ||
                      'Password must have at least 8 characters'
                  ]"
                  label="Old Password"
                  v-model="oldPassword"
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
                  validate-on-blur
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    val => !!val || 'Field is required',
                    val =>
                      val.length >= 8 ||
                      'Password must have at least 8 characters'
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
                <div v-html="error1" class="error" />
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
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import RegisterService from "../services/RegisterService";
import axios from "axios";
export default {
  data() {
    return {
      firstName: this.$store.getters["appUtils/getUserDetails"].firstName,
      lastName: this.$store.getters["appUtils/getUserDetails"].lastName,
      phone: this.$store.getters["appUtils/getUserDetails"].phone,
      email: this.$store.getters["appUtils/getUserDetails"].email,
      profile: this.$store.getters["appUtils/getUserDetails"].profile,
      facebook: this.$store.getters["appUtils/getUserDetails"].facebook,
      picture: this.$store.getters["appUtils/getUserDetails"].picture,
      group: this.$store.getters["appUtils/getUserDetails"].group,
      promotion: this.$store.getters["appUtils/getUserDetails"].promotion,
      specialisation: this.$store.getters["appUtils/getUserDetails"].specialisation,
      seria: this.$store.getters["appUtils/getUserDetails"].seria,
      job: this.$store.getters["appUtils/getUserDetails"].job,
      company: this.$store.getters["appUtils/getUserDetails"].company,
      oldPassword: null,
      password: null,
      selectedFile: null,

      serii: ["A", "B", "C", "D", "E"],
      promotions: ["2017", "2018", "2019", "2020"],
      specialisations: [
        "Cybernetics",
        "Statistics",
        "Economic Informatics",
        "Economic Informatics in English"
      ],

      isPwd: true,
      tab: "mails",
      splitterModel: 20,
      model: null,
      customModel: "No",
      fixed: false,
      basic: false,
      flag: null,
      error: null,
      error1: null
    };
  },
  methods: {
    async editProfile() {
      this.error = "";
    if (this.$refs.form.validate()) {
      await RegisterService.editUserDet(
        this.$store.getters["appUtils/getUserDetails"].id,
        {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          profile: this.profile,
          facebook: this.facebook,
          seria: this.seria,
          group: this.group,
          promotion: this.promotion,
          specialisation: this.specialisation,
          job: this.job,
          company: this.company, 
        }
      );
      if(this.selectedFile){
        const fd=new FormData();
        fd.append('image', this.selectedFile)
        fd.append('idUser',this.$store.getters["appUtils/getUserDetails"].id)
      await RegisterService.uploadImage(fd)
      }
        alert("Profile updated succesfuly");
        this.$store.dispatch("appUtils/retrieveUserDetails").catch(error => {
          console.log(error.message);
        });
      }
    },

    async changePassword() {
      this.error1 = "";
      await RegisterService.validatePass(
        this.$store.getters["appUtils/getIdUserAuth"],
        this.oldPassword
      )
        .then(async response => {
          if (response.data.message === "Valid password!") {
            if (this.password !== this.oldPassword) {
              await RegisterService.changePassword(
                this.$store.getters["appUtils/getIdUserAuth"],
                this.password
              );
              alert("Password changed!");
            } else {
              this.error1 = "Old password cannot be new password";
            }
          } else {
            this.error1 = "Incorrect old password";
          }
        })
        .catch(error => console.log(error));
    },

    isValidFacebook() {
      const facebookPattern = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/;
      return facebookPattern.test(this.facebook) || "Invalid link";
    },

    isValidEmail() {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.email) || "Invalid email";
    },
    onFileSelected(event){
        this.selectedFile=event.target.files[0];
        //console.log(this.selectedFile)
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
