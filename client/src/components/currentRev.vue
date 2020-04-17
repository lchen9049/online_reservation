<template>
  <div class="reservation">
    <div v-if="application.userInfo.isMember">
      <h2>Membership Spot</h2>
      <table class="table mt-3">
        <thead class="thead-light">
          <tr>
            <th scope="col">Spot ID</th>
            <th scope="col">Car Plate</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Monthly Fee</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <th scope="row">Spot {{application.userInfo.spotID}}</th>
          <td>{{application.userInfo.carPlate}}</td>
          <td>{{formatTime(application.userInfo.startTime)}}</td>
          <td>{{formatTime(application.userInfo.endTime)}}</td>
          <td>${{application.userInfo.monthlyFee}}</td>
          <td>
            <b-button>Cancel</b-button>
          </td>
        </tbody>
      </table>
    </div>
    <div v-if="application.userInfo.isAdmin">
      <h2>Membership Spot</h2>
      <table class="table mt-3">
        <thead class="thead-light">
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Spot ID</th>
            <th scope="col">Car Plate</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Monthly Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.username">
            <th scope="row">{{member.username}}</th>
            <td>{{member.spot_id}}</td>
            <td>{{member.car_plate}}</td>
            <td>{{formatTime(member.start_time)}}</td>
            <td>{{formatTime(member.end_time)}}</td>
            <td>${{member.monthly_fee}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>Today</h2>
      <table class="table mt-3">
        <thead class="thead-light">
          <tr>
            <th scope="col">Spot ID</th>
            <th scope="col">Car Plate</th>
            <th scope="col">Date</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rev in todayRev" :key="rev.spot_id + rev.time_start">
            <th scope="row">Spot {{rev.spot_id}}</th>
            <td>{{rev.car_plate}}</td>
            <td>{{rev.reserve_date}}</td>
            <td>{{formatTime(rev.time_start)}}</td>
            <td>{{formatTime(rev.time_end)}}</td>
            <td>${{rev.total}}</td>
          </tr>
        </tbody>
      </table>

      <h2>Upcoming</h2>
      <table class="table mt-3">
        <thead class="thead-light">
          <tr>
            <th scope="col">Spot ID</th>
            <th scope="col">Car Plate</th>
            <th scope="col">Date</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rev in upcomingRevs" :key="rev.spot_id + rev.time_start">
            <th scope="row">Spot {{rev.spot_id}}</th>
            <td>{{rev.car_plate}}</td>
            <td>{{rev.reserve_date}}</td>
            <td>{{formatTime(rev.time_start)}}</td>
            <td>{{formatTime(rev.time_end)}}</td>
            <td>${{rev.total}}</td>
          </tr>
        </tbody>
      </table>

      <h2>History</h2>
      <table class="table mt-3">
        <thead class="thead-light">
          <tr>
            <th scope="col">Spot ID</th>
            <th scope="col">Car Plate</th>
            <th scope="col">Date</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rev in prevRevs" :key="rev.spot_id + rev.time_start">
            <th scope="row">Spot {{rev.spot_id}}</th>
            <td>{{rev.car_plate}}</td>
            <td>{{rev.reserve_date}}</td>
            <td>{{formatTime(rev.time_start)}}</td>
            <td>{{formatTime(rev.time_end)}}</td>
            <td>${{rev.total}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
//import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "reservations",
  props: ["application", "isAdmin"],
  data() {
    return {};
  },
  methods: {
    upRev(rev) {
      var today = new Date();
      if (parseInt(rev.reserve_date.substring(0, 4)) > today.getYear() + 1900) {
        return true;
      } else if (
        parseInt(rev.reserve_date.substring(0, 4)) ==
        today.getYear() + 1900
      ) {
        if (parseInt(rev.reserve_date.substring(5, 7)) > today.getMonth() + 1)
          return true;
        else {
          if (parseInt(rev.reserve_date.substring(8)) >= today.getDate())
            return true;
          else return false;
        }
      } else return false;
    },
    today(rev) {
      var today = new Date();
      if (
        parseInt(rev.reserve_date.substring(0, 4)) == today.getYear() + 1900 &&
        parseInt(rev.reserve_date.substring(5, 7)) == today.getMonth() + 1 &&
        parseInt(rev.reserve_date.substring(8)) == today.getDate()
      ) {
        return true;
      } else return false;
    },
    formatTime(s) {
      if (s < 0) s = s * -1;
      switch (s) {
        case -7:
        case -8:
        case -9:
          return "0" + s + ":00 AM";
        case -10:
        case -11:
          return s + ":00 AM";
        case -12:
          return s + ":00 PM";
        case 10:
        case 11:
          return s + ":00 PM";
        default:
          return "0" + s + ":00 PM";
      }
    }
  },
  computed: {
    upcomingRevs: function() {
      if (this.application.userInfo.isAdmin)
        return this.application.reservations.filter(
          rev => !this.today(rev) && this.upRev(rev)
        );
      else
        return this.application.reservations.filter(
          rev =>
            rev.username == this.application.userInfo.userName &&
            !this.today(rev) &&
            this.upRev(rev)
        );
    },
    prevRevs: function() {
      if (this.application.userInfo.isAdmin)
        return this.application.reservations.filter(
          rev => !this.today(rev) && !this.upRev(rev)
        );
      else
        return this.application.reservations.filter(
          rev =>
            rev.username == this.application.userInfo.userName &&
            !this.today(rev) &&
            !this.upRev(rev)
        );
    },
    todayRev: function() {
      if (this.application.userInfo.isAdmin)
        return this.application.reservations.filter(rev => this.today(rev));
      else
        return this.application.reservations.filter(
          rev =>
            rev.username == this.application.userInfo.userName &&
            this.today(rev)
        );
    },
    members: function() {
      return this.application.users.filter(user => user.member);
    }
  }
};
</script>

<style>
</style>