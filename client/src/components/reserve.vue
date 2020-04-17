<template>
  <div id="reserve">
    <div class="row mt-4 ml-2">
      <div class="col-6">
        <div class="float-right">
          <b-calendar v-model="selection.date" :min="minDate" locale="en"></b-calendar>
        </div>
      </div>
      <div class="col-6">
        <div class="row mt-5">
          <div class="col-7">
            Start Time
            <b-form-select :options="time" @click="filterSpots()" v-model="selection.start"></b-form-select>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-7">
            End Time
            <b-form-select :options="time" @click="filterSpots()" v-model="selection.end"></b-form-select>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">Duration: {{duration}}</div>
        </div>
      </div>
    </div>
    <b-modal id="reservePopUp" hide-footer title="Reserve">
      <div v-if="warning">Invalid Time Frame</div>
      <div v-else>
        <div v-if="isAdmin">
          <div class="row mt-1">
            <div class="col">
              Date:
              <b-form-input :disabled="true" v-model="selection.date"></b-form-input>
            </div>
            <div class="col">
              Spot ID
              <b-form-input :disabled="true" v-model="selection.spotID"></b-form-input>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col">
              Start Time
              <b-form-input :disabled="true" v-model="startTime"></b-form-input>
            </div>
            <div class="col">
              End Time
              <b-form-input :disabled="true" v-model="endTime"></b-form-input>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col">
              Duration
              <b-form-input :disabled="true" v-model="duration"></b-form-input>
            </div>
            <div class="col">
              Price
              <b-form-input :disabled="true" v-model="price"></b-form-input>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col">
            </div>
            <div class="col">
              Total
              <b-form-input :disabled="true" v-model="total"></b-form-input>
            </div>
          </div>
          <hr/>
          <div class="row mt-1">
            <div class="col">
              First Name
              <b-form-input v-model="selection.firstname"></b-form-input>
            </div>
            <div class="col">
              Last Name
              <b-form-input v-model="selection.lastname"></b-form-input>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col">
              Car Plate
              <b-form-input v-model="selection.carPlate"></b-form-input>
            </div>
            <div class="col">
              Phone
              <b-form-input v-model="selection.phone"></b-form-input>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <b-button @click="$bvModal.hide('reservePopUp')">Cancel</b-button>
            </div>
            <div class="col">
              <b-button @click="confirmReservation()">Confirm</b-button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row mt-1">
            <div class="col">
              Date:
              <b-form-input :disabled="true" v-model="selection.date"></b-form-input>
            </div>
            <div class="col">
              Spot ID
              <b-form-input :disabled="true" v-model="selection.spotID"></b-form-input>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col">
              Start Time
              <b-form-input :disabled="true" v-model="startTime"></b-form-input>
            </div>
            <div class="col">
              End Time
              <b-form-input :disabled="true" v-model="endTime"></b-form-input>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col">
              Duration
              <b-form-input :disabled="true" v-model="duration"></b-form-input>
            </div>
            <div class="col">
              Price
              <b-form-input :disabled="true" v-model="price"></b-form-input>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col">
              Car Plate
              <b-form-input :disabled="true" v-model="application.userInfo.carPlate"></b-form-input>
            </div>
            <div class="col">
              Total
              <b-form-input :disabled="true" v-model="total"></b-form-input>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <b-button @click="$bvModal.hide('reservePopUp')">Cancel</b-button>
            </div>
            <div class="col">
              <b-button @click="confirmReservation()">Confirm</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <table class="table mt-3">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Spot ID</th>
          <th scope="col">Amount</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="spot in filterSpots" :key="spot.spot_id">
          <th scope="row">Spot {{spot.spot_id}}</th>
          <td>${{spot.price}}/hr</td>
          <td></td>
          <td>
            <b-button @click="reserve(spot)">Reserve</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "reserve",
  props: ["application", "isAdmin"],
  data() {
    return {
      address: null,
      minDate: new Date(),
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
      ],
      selection: {
        date: null,
        start: null,
        end: null,
        spotID: null,
        price: null,
        total: null,
        firstname: null,
        lastname: null,
        carPlate: null,
        phone: null,
      }
    };
  },
  methods: {
    reserve(spot) {
      if (!this.application.userInfo.authenticated) {
        this.$parent.login();
      } else {
        this.selection.spotID = spot.spot_id;
        this.selection.price = spot.price;
        this.$bvModal.show("reservePopUp");
      }
    },
    async confirmReservation() {
      var d;
      var type;
      if (this.application.userInfo.isMember) type = "member";
      else if (this.application.userInfo.isAdmin) type = "walkin";
      else type = "nonmember";
      if (this.selection.start < 0) {
        if (this.selection.end < 0)
          d = this.selection.start - this.selection.end;
        else d = 12 + this.selection.start + this.selection.end;
      } else d = this.selection.end - this.selection.start;

      const response = await AuthenticationService.confirmReservation({
        username: this.application.userInfo.userName,
        spotID: this.selection.spotID,
        start: this.selection.start,
        end: this.selection.end,
        date: this.selection.date,
        total: d * this.selection.price,
        carPlate: this.application.userInfo.isAdmin ? this.selection.carPlate:this.application.userInfo.carPlate,
        member: type,
        firstname: this.selection.firstname,
        lastname: this.selection.lastname,
        phone: this.selection.phone,
      });

      if (response) {
        this.selection.firstname = null;
        this.selection.lastname = null;
        this.selection.phone = null;
        this.selection.carPlate = null;
        this.$parent.openReservation();
      }
    },
    filterR(rev) {
      if (rev.reserve_date != this.selection.date) return false;

      var revStart = this.map(rev.time_start);
      var revEnd = this.map(rev.time_end);
      var sStart = this.map(this.selection.start);
      var sEnd = this.map(this.selection.end);

      if (revStart == sStart) {
        return true;
      } else {
        if (revStart > sStart) {
          if (revStart >= sEnd) {
            return false;
          } else return true;
        } else {
          if (revEnd <= sStart) return false;
          else return true;
        }
      }
    },
    filterU(user){

      var userStart = this.map(user.start_time);
      var userEnd = this.map(user.start_time);
      var sStart = this.map(this.selection.start);
      var sEnd = this.map(this.selection.end);

      if (userStart == sStart) {
        return true;
      } else {
        if (userStart > sStart) {
          if (userStart >= sEnd) {
            return false;
          } else return true;
        } else {
          if (userEnd <= sStart) return false;
          else return true;
        }
      }
    },
    availableSpots() {
      var revs = this.application.reservations.filter(rev => this.filterR(rev));

      var members = this.application.users.filter(
        user =>
          user.member && this.filterU(user)
      );

      return this.application.spots.filter(
        spot => this.notInR(spot, revs) && this.notInM(spot, members)
      );
    },
    notInR(spot, revs) {
      var i;
      for (i = 0; i < revs.length; i++) {
        if (revs[i].spot_id == spot.spot_id) {
          return false;
        }
      }
      return true;
    },
    notInM(spot, members) {
      var i;
      for (i = 0; i < members.length; i++) {
        if (members[i].spot_id == spot.spot_id) return false;
      }
      return true;
    },
    map(n) {
      switch (n) {
        case -7:
          return 1;
        case -8:
          return 2;

        case -9:
          return 3;

        case -10:
          return 4;

        case -11:
          return 5;

        case -12:
          return 6;

        case 1:
          return 7;

        case 2:
          return 8;

        case 3:
          return 9;

        case 4:
          return 10;

        case 5:
          return 11;

        case 6:
          return 12;

        case 7:
          return 13;

        case 8:
          return 14;

        case 9:
          return 15;

        case 10:
          return 16;

        case 11:
          return 17;
      }
    }
  },
  computed: {
    duration: function() {
      if (this.selection.start == null) return "Please Select Start Time";
      else if (this.selection.end == null) return "Please Select End Time";
      else if (this.selection.end == this.selection.start)
        return "Invalid: Same Start and End";
      else {
        if (this.selection.start < 0) {
          if (this.selection.end < 0) {
            if (this.selection.end > this.selection.start)
              return "Invalid: End Before Start";
            else return this.selection.start - this.selection.end + " hours";
          } else {
            return 12 + this.selection.start + this.selection.end + " hours";
          }
        } else {
          if (this.selection.end < 0) {
            return "Invalid: End Before Start";
          } else {
            if (this.selection.end < this.selection.start)
              return "Invalid: End Before Start";
            else return this.selection.end - this.selection.start + " hours";
          }
        }
      }
    },
    warning: function() {
      if (this.selection.date == null) return true;
      else if (this.selection.start == null || this.selection.end == null)
        return true;
      else if (this.selection.end == this.selection.start) return true;
      else {
        if (this.selection.start < 0) {
          if (this.selection.end < 0) {
            if (this.selection.end > this.selection.start) return true;
            else return false;
          } else {
            return false;
          }
        } else {
          if (this.selection.end < 0) {
            return true;
          } else {
            if (this.selection.end < this.selection.start) true;
            else return false;
          }
        }
      }
      return false;
    },
    total: function() {
      var d;

      if (this.selection.start < 0) {
        if (this.selection.end < 0)
          d = this.selection.start - this.selection.end;
        else d = 12 + this.selection.start + this.selection.end;
      } else d = this.selection.end - this.selection.start;

      return "$" + d * this.selection.price;
    },
    price: function() {
      return "$" + this.selection.price;
    },
    startTime: function() {
      if (this.selection.start < 0) return this.selection.start * -1 + ":00 AM";
      else return this.selection.start + ":00 PM";
    },
    endTime: function() {
      if (this.selection.end < 0) return this.selection.end * -1 + ":00 AM";
      else return this.selection.end + ":00 PM";
    },
    filterSpots: function() {
      if (
        this.selection.date == null ||
        this.selection.start == null ||
        this.selection.end == null
      ) {
        return this.application.spots;
      } else {
        return this.availableSpots();
      }
    }
  }
};
</script>

<style>
</style>