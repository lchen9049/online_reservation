<template>
  <div id="app">
    <div class="row mt-5 justify-content-md-center">
      <div class="col-10">
        <h1>
          <center>ONLINE RESERVATION</center>
        </h1>
      </div>
    </div>
    <div class="row mt-5 justify-content-md-center">
      <div class="col-10">
        <b-navbar toggleable="sm" type="light" variant="light">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item class="ml-5" @click="openReserve()">Reserve</b-nav-item>
              <b-nav-item class="ml-5" @click="openReservation()" v-if="authenticated">Reservations</b-nav-item>
              <b-nav-item
                class="ml-5"
                @click="openCustomer()"
                v-if="authenticated && isAdmin"
              >Customers</b-nav-item>
              <b-nav-item class="ml-5" @click="openData()" v-if="authenticated && isAdmin">Data</b-nav-item>
              <b-nav-item></b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <font-awesome-icon class="mr-1" size="2x" @click="login()" icon="user-circle" />
              <div class="mt-1" v-if="authenticated">
                <span
                  @click="openProfile()"
                >{{application.userInfo.firstName}} {{application.userInfo.lastName}}</span>
              </div>
              <div class="mt-1" v-else>
                <span @click="login()">Login/Sign Up</span>
              </div>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <div class="row mt-5 justify-content-md-center">
      <div class="col-9" v-if="onReserve">
        <Reserve :application.sync="application" :isAdmin.sync="isAdmin"></Reserve>
      </div>
      <div class="col-9" v-else-if="onProfile">
        <Profile :application.sync="application"></Profile>
      </div>
      <div class="col-9" v-else-if="onReservations">
        <CurrentRevs :application.sync="application"></CurrentRevs>
      </div>
      <div class="col-9" v-else-if="onCustomer">
        <Customers :application.sync="application"></Customers>
      </div>
      <div class="col-9" v-else-if="onData">
        <Data :application.sync="application"></Data>
      </div>
    </div>

    <b-modal
      id="userLogin"
      hide-footer
      @hidden="needRegistration = false"
      :title="!needRegistration ? 'Login' : 'Register'"
    >
      <div v-if="!needRegistration">
        <div class="row">
          <div class="col">UserName</div>
          <div class="col">
            <b-form-input id="userName" v-model="application.userInfo.userName"></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">PassWord</div>
          <div class="col">
            <b-form-input id="passWord" v-model="application.userInfo.passWord"></b-form-input>
          </div>
        </div>
        <div class="row mt-2" v-if="error">
          <div class="col"></div>
          <div class="col">
            <div class="text-danger">Invalid Input</div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-6">
            <b-button class="mr-1" @click="$bvModal.hide('userLogin')">Cancel</b-button>
            <b-button @click="authenticate()">Login</b-button>
          </div>
          <div class="col">
            <span @click="needRegistration=true">Register</span>
          </div>
          <div class="col">
            <b-form-checkbox
              v-model="isAdmin"
              name="staff"
              value="true"
              unchecked-value="false"
            >Staff</b-form-checkbox>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col">
            <span>UserName</span>
            <b-form-input id="userName" v-model="application.userInfo.userName"></b-form-input>
          </div>
          <div class="col">
            <span>Password</span>
            <b-form-input id="passWord" v-model="application.userInfo.passWord"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>First Name</span>
            <b-form-input id="firstName" v-model="application.userInfo.firstName"></b-form-input>
          </div>
          <div class="col">
            <span>Last Name</span>
            <b-form-input id="lastName" v-model="application.userInfo.lastName"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Car Plate</span>
            <b-form-input id="carPlate" v-model="application.userInfo.carPlate"></b-form-input>
          </div>
          <div class="col">
            <span>Phone Number</span>
            <b-form-input id="phone" v-model="application.userInfo.phoneNumber"></b-form-input>
          </div>
        </div>

        <div class="row mt-2 ml-1">
          <b-form-checkbox
            v-model="isMember"
            name="member"
            value="true"
            unchecked-value="false"
          >Membership</b-form-checkbox>
        </div>
        <div v-if="isMember == 'true'">
          <div class="row">
            <div class="col">
              <span>Start Time</span>
              <b-form-select
                id="startTime"
                :options="time"
                v-model="application.userInfo.startTime"
              ></b-form-select>
            </div>
            <div class="col">
              <span>End Time</span>
              <b-form-select id="endTime" :options="time" v-model="application.userInfo.endTime"></b-form-select>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <b-button
                @click="application.userInfo.startTime==null || application.userInfo.endTime==null ? '':$bvModal.show('spotSearch')"
              >Search Spot</b-button>
            </div>
            <div class="col ml-5">
              <div class="row">Spot ID: {{application.userInfo.spotID}}</div>
              <div class="row">Monthly Fee: ${{application.userInfo.monthlyFee}}</div>
            </div>
          </div>
        </div>
        <div class="row mt-4 ml-1">
          <h4>Payment</h4>
        </div>
        <hr />
        <div class="row">
          <div class="col">
            <span>Card Number</span>
            <b-form-input
              id="paymentCardNumber"
              v-model="application.userInfo.creditCard.cardNumber"
            ></b-form-input>
          </div>
          <div class="col">
            <span>Card Pin</span>
            <b-form-input id="cardPin" v-model="application.userInfo.creditCard.cardPin"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Billing Address</span>
            <b-form-input
              id="billingAddress"
              v-model="application.userInfo.creditCard.billingAddress"
            ></b-form-input>
          </div>
          <div class="col">
            <span>City</span>
            <b-form-input id="billingCity" v-model="application.userInfo.creditCard.city"></b-form-input>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>Zip Code</span>
            <b-form-input id="billingZipCode" v-model="application.userInfo.creditCard.zipCode"></b-form-input>
          </div>
          <div class="col">
            <span>State</span>
            <b-form-input id="billingState" v-model="application.userInfo.creditCard.state"></b-form-input>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col">
            <b-button class="mr-1" @click="$bvModal.hide('userLogin')">Cancel</b-button>
            <b-button @click="register()">Register</b-button>
          </div>
          <div class="col">
            <span @click="needRegistration=false">Login</span>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal id="spotSearch" hide-footer title="Spot Search">
      <div class="row">
        <div class="col">
          <table class="table mt-3">
            <thead class="thead-light">
              <tr>
                <th scope="col">Spot ID</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="spot in application.spots" :key="spot.spot_id">
                <th scope="row">Spot {{spot.spot_id}}</th>
                <td>${{spot.price}}/hr</td>
                <td>
                  <b-button @click="confirmSpot(spot)">Select</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import NewCard from "./models/creditCard";
import Reserve from "./components/reserve";
import Profile from "./components/profile";
import CurrentRevs from "./components/currentRev";
import Customers from "./components/customers";
import Data from "./components/appData";
import AuthenticationService from "./services/AuthenticationService";
import axios from "axios";

export default {
  name: "App",
  components: { Reserve, Profile, CurrentRevs, Customers, Data },
  data() {
    return {
      needRegistration: false,
      authenticated: false,
      isMember: false,
      isAdmin: false,
      onReserve: true,
      onProfile: false,
      onReservations: false,
      onCustomer: false,
      onDate: false,
      error: false,
      application: {
        userInfo: {
          isAdmin: false,
          isMember: false,
          userName: null,
          passWord: null,
          authenticated: false,
          firstName: null,
          lastName: null,
          phoneNumber: null,
          carPlate: null,
          startTime: null,
          endTime: null,
          monthlyFee: null,
          spotID: null,
          tempPlate: null,
          creditCard: new NewCard()
        },
        spots: [],
        reservations: [],
        users: []
      },
      time: [
        { value: null, text: "Please Select Time" },
        { value: -7, text: "07:00 AM" },
        { value: -8, text: "08:00 AM" },
        { value: -9, text: "09:00 AM" },
        { value: -10, text: "10:00 AM" },
        { value: -11, text: "11:00 AM" },
        { value: -12, text: "12:00 PM" },
        { value: 1, text: "01:00 PM" },
        { value: 2, text: "02:00 PM" },
        { value: 3, text: "03:00 PM" },
        { value: 4, text: "04:00 PM" },
        { value: 5, text: "05:00 PM" },
        { value: 6, text: "06:00 PM" },
        { value: 7, text: "07:00 PM" },
        { value: 8, text: "08:00 PM" },
        { value: 9, text: "09:00 PM" },
        { value: 10, text: "10:00 PM" },
        { value: 11, text: "11:00 PM" }
      ]
    };
  },
  methods: {
    login() {
      if (this.authenticated) {
        this.openProfile();
      } else {
        this.$bvModal.show("userLogin");
      }
    },
    authenticate() {
      if (this.isAdmin == "true") this.isAdmin = true;
      else this.isAdmin = false;
      if (this.isAdmin) {
        axios
          .get(
            `http://localhost:3000/adminLogin/${this.application.userInfo.userName}/${this.application.userInfo.passWord}`
          )
          .then(response => {
            if (response.data[0] == null) {
              this.error = true;
            } else {
              this.$bvModal.hide("userLogin");
              this.authenticated = true;
              this.application.userInfo.authenticated = true;
              this.application.userInfo.firstName =
                response.data[0][0].firstname;
              this.application.userInfo.lastName = response.data[0][0].lastname;
              this.application.userInfo.isAdmin = true;
              this.getAllUsers();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      axios
        .get(
          `http://localhost:3000/userLogin/${this.application.userInfo.userName}/${this.application.userInfo.passWord}`
        )
        .then(response => {
          if (response.data[0] == null || response.data[0][0] == null) {
            this.error = true;
          } else {
            this.$bvModal.hide("userLogin");
            this.authenticated = true;
            this.application.userInfo.authenticated = true;
            this.application.userInfo.firstName =
              response.data[0][0].first_name;
            this.application.userInfo.lastName = response.data[0][0].last_name;
            this.application.userInfo.phoneNumber =
              response.data[0][0].phone_number;
            this.application.userInfo.carPlate = response.data[0][0].car_plate;
            this.application.userInfo.isMember = response.data[0][0].member;

            this.application.userInfo.creditCard.billingAddress =
              response.data[1][0].billing_address;
            this.application.userInfo.creditCard.cardNumber =
              response.data[1][0].card_number;
            this.application.userInfo.creditCard.cardPin =
              response.data[1][0].card_pin;
            this.application.userInfo.creditCard.city =
              response.data[1][0].city;
            this.application.userInfo.creditCard.state =
              response.data[1][0].state;
            this.application.userInfo.creditCard.zipCode =
              response.data[1][0].zip_code;

            if (this.application.userInfo.isMember) {
              this.application.userInfo.spotID = response.data[0][0].spot_id;
              this.application.userInfo.startTime =
                response.data[0][0].start_time;
              this.application.userInfo.endTime = response.data[0][0].end_time;
              this.application.userInfo.monthlyFee =
                response.data[0][0].monthly_fee;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async register() {
      var response;
      if (
        this.application.userInfo.userName == null ||
        this.application.userInfo.passWord == null ||
        this.application.userInfo.firstName == null ||
        this.application.userInfo.lastName == null ||
        this.application.userInfo.carPlate == null ||
        this.application.userInfo.phoneNumber == null ||
        this.application.userInfo.creditCard.cardNumber == null ||
        this.application.userInfo.creditCard.cardPin == null ||
        this.application.userInfo.creditCard.billingAddress == null ||
        this.application.userInfo.creditCard.city == null ||
        this.application.userInfo.creditCard.state == null ||
        this.application.userInfo.creditCard.zipCode == null
      ) {
        return;
      }
      if (
        this.isMember &&
        (this.application.userInfo.spotID == null ||
          this.application.userInfo.monthlyFee == null)
      ) {
        return;
      }
      if (this.isMember == "true") {
        this.application.userInfo.isMember = true;
        response = await AuthenticationService.register({
          username: this.application.userInfo.userName,
          pword: this.application.userInfo.passWord,
          first_name: this.application.userInfo.firstName,
          last_name: this.application.userInfo.lastName,
          car_plate: this.application.userInfo.carPlate,
          member: true,
          phone_number: this.application.userInfo.phoneNumber,
          card_number: this.application.userInfo.creditCard.cardNumber,
          card_pin: this.application.userInfo.creditCard.cardPin,
          billing_address: this.application.userInfo.creditCard.billingAddress,
          city: this.application.userInfo.creditCard.city,
          state: this.application.userInfo.creditCard.state,
          zipCode: this.application.userInfo.creditCard.zipCode,
          spotID: this.application.userInfo.spotID,
          monthlyFee: this.application.userInfo.monthlyFee,
          start: this.application.userInfo.startTime,
          end: this.application.userInfo.endTime
        });
      } else {
        response = await AuthenticationService.register({
          username: this.application.userInfo.userName,
          pword: this.application.userInfo.passWord,
          first_name: this.application.userInfo.firstName,
          last_name: this.application.userInfo.lastName,
          car_plate: this.application.userInfo.carPlate,
          member: false,
          phone_number: this.application.userInfo.phoneNumber,
          card_number: this.application.userInfo.creditCard.cardNumber,
          card_pin: this.application.userInfo.creditCard.cardPin,
          billing_address: this.application.userInfo.creditCard.billingAddress,
          city: this.application.userInfo.creditCard.city,
          state: this.application.userInfo.creditCard.state,
          zipCode: this.application.userInfo.creditCard.zipCode
        });
      }
      if (response) console.log(response);
      this.$bvModal.hide("userLogin");

      this.application.userInfo.authenticated = true;
      this.authenticated = true;
    },
    openProfile() {
      this.onReserve = false;
      this.onProfile = true;
      this.onReservations = false;
      this.onCustomer = false;
      this.onData = false;
    },
    openReserve() {
      this.onReserve = true;
      this.onProfile = false;
      this.onReservations = false;
      this.onCustomer = false;
      this.onData = false;
    },
    openCustomer() {
      this.onReserve = false;
      this.onProfile = false;
      this.onReservations = false;
      this.onCustomer = true;
      this.onData = false;
    },
    openData() {
      this.onReserve = false;
      this.onProfile = false;
      this.onReservations = false;
      this.onCustomer = false;
      this.onData = true;
    },
    logout() {
      this.application.userInfo.isAdmin = false;
      this.application.userInfo.userName = null;
      this.application.userInfo.passWord = null;
      this.isAdmin = false;
      this.authenticated = false;
      this.openReserve();
      this.needRegistration = false;
      this.application.userInfo = {
        isAdmin: false,
        isMember: false,
        userName: null,
        passWord: null,
        authenticated: false,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        carPlate: null,
        startTime: null,
        endTime: null,
        spotID: null,
        tempPlate: null,
        creditCard: new NewCard()
      };
    },
    openReservation() {
      this.onReserve = false;
      this.onProfile = false;
      this.onReservations = true;
      this.onCustomer = false;
      this.onData = false;

      this.getAllReservations();
    },
    getAllReservations() {
      axios
        .get("http://localhost:3000/getAllReservation")
        .then(response => {
          this.application.reservations = [];
          response.data.forEach(rev => {
            this.application.reservations.push(rev);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    confirmSpot(spot) {
      var d;

      if (this.application.userInfo.startTime < 0) {
        if (this.application.userInfo.endTime < 0)
          d =
            this.application.userInfo.startTime -
            this.application.userInfo.endTime;
        else
          d =
            12 +
            this.application.userInfo.startTime +
            this.application.userInfo.endTime;
      } else
        d =
          this.application.userInfo.endTime -
          this.application.userInfo.startTime;

      this.application.userInfo.spotID = spot.spot_id;
      this.application.userInfo.monthlyFee = spot.price * d * 20;
      this.$bvModal.hide("spotSearch");
    },
    getAllUsers() {
      axios
        .get("http://localhost:3000/getAllUsers")
        .then(response => {
          this.application.users = [];
          response.data.forEach(user => {
            this.application.users.push(user);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getAllReservations();
    this.getAllUsers();
    axios
      .get("http://localhost:3000/getAllSpots")
      .then(response => {
        this.application.spots = [];
        response.data.forEach(spot => {
          this.application.spots.push(spot);
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  watch: {
    isMember: function() {
      if (this.isMember == "false") {
        this.application.userInfo.startTime = null;
        this.application.userInfo.endTime = null;
        this.application.userInfo.spotID = null;
        this.application.userInfo.monthlyFee = null;
      }
    }
  }
};
</script>

<style>
</style>
