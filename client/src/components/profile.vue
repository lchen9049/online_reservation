<template>
  <div class="profile">
    <div v-if="!application.userInfo.isAdmin">
      <div class="row ml-1">
        <h2>Profile</h2>
      </div>
      <div class="row">
        <div class="col-4">
          First Name
          <b-form-input :disabled="true" v-model="application.userInfo.firstName" />
        </div>
        <div class="col-4">
          Last Name
          <b-form-input :disabled="true" v-model="application.userInfo.lastName" />
        </div>
        <div class="col-4">
          Username
          <b-form-input :disabled="true" v-model="application.userInfo.userName" />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          Car Plate
          <b-form-input :disabled="true" v-model="application.userInfo.carPlate" />
        </div>
        <div class="col">
          Phone Number
          <b-form-input :disabled="true" v-model="application.userInfo.phoneNumber" />
        </div>
      </div>
      <div v-if="application.userInfo.tempPlate != null">
        <div class="row mt-4">
          <div class="col">
            Temporary Car Plate <i>(Will be deleted tomorrow)</i>
        <b-form-input :disabled="true" v-model="application.userInfo.tempPlate"></b-form-input>
          </div>
          <div class="col"></div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col">
          <b-button>Edit Information</b-button>
        </div>
        <div class="col">
          <b-button @click="addTempPlate()">Add Temp Plate</b-button>
        </div>
        <div class="col">
          <div class="float-right">
            <b-button @click="logout()">Log Out</b-button>
          </div>
        </div>
      </div>

      <b-modal id="tempPlatePop" @hidden="temp = null" hide-footer title="Temporary Plate">
        <div class="row">
          <div class="col">
            Plate Number
            <b-form-input v-model="temp"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <div class="float-right">
              <b-button @click="addTemp()">Add</b-button>
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <div v-else>
      <div class="row ml-1">
        <h2>Profile</h2>
      </div>
      <div class="row">
        <div class="col-4">
          First Name
          <b-form-input :disabled="true" v-model="application.userInfo.firstName" />
        </div>
        <div class="col-4">
          Last Name
          <b-form-input :disabled="true" v-model="application.userInfo.lastName" />
        </div>
        <div class="col-4">
          Username
          <b-form-input :disabled="true" v-model="application.userInfo.userName" />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <b-button>Edit Information</b-button>
        </div>
        <div class="col">
          <div class="float-right">
            <b-button @click="logout()">Log Out</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
//import axios from "axios";

export default {
  name: "profile",
  components: {},
  props: ["application"],
  data() {
    return {
      temp: null
    };
  },
  methods: {
    logout() {
      this.$parent.logout();
    },
    addTempPlate() {
      this.$bvModal.show("tempPlatePop");
    },
    async addTemp() {
      var response;
      this.application.userInfo.tempPlate = this.temp;
      response = await AuthenticationService.addTemp({
        username: this.application.userInfo.userName,
        plate: this.application.userInfo.tempPlate,
      });
      this.$bvModal.hide("tempPlatePop");
      if(response) console.log('success');
    }
  }
};
</script>

<style>
</style>