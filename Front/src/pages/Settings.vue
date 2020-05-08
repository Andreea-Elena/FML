<template>
  <q-page style="background-color:#42455a">
    <div class="q-pa-md">
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
                <q-input
                  label="Link to facebook"
                  type="text"
                  v-model="facebook"
                  validate-on-blur
                  :rules="[isValidFacebook]"
                >
                </q-input>
                <q-file
                  v-model="picture"
                  filled
                  label="Choose a profile picture"
                  accept=".jpg, image/*"
                  style="max-width: 300px"
                />
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
      tab: "mails",
      splitterModel: 20,
      model: null,
      customModel: "No",
      fixed: false,
      basic: false,
      firstName: null,
      lastName: null,
      phone: null,
      email: null,
      flag: null,
      error: null,
      profile: null,
      facebook: null,
      picture: null
    };
  },
  methods: {
    isValidEmail() {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.email) || "Invalid email";
    },
    async editProfile() {
      this.error = "";
      try {
        await RegisterService.editUserDet(
          this.$store.getters["appUtils/getIdUserDet"],
          {
            FirstName: this.firstName,
            LastName: this.lastName,
            email: this.email,
            phone: this.phone,
            profile: this.profile,
            facebook: this.facebook
          }
        );
        if (this.$refs.form.validate()) {
          alert("Profile updated succesfuly");
          this.$store
            .dispatch("appUtils/retrieveUserDetails")
            .then(result => {
              this.account = this.store.getters["appUtils/getUserDetails"];
            })
            .catch(error => {
              console.log(error.message);
            });
        }
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    isValidFacebook() {
      const facebookPattern = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/;
      return facebookPattern.test(this.facebook) || "Invalid link";
    }
  }
};
</script>
