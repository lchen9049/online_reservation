<template>
  <div class="appData">
    <table class="table mt-3">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Customer Type</th>
          <th scope="col">Monthly Revenue</th>
          <th scope="col">Parking Usuage</th>
          <th scope="col">Customer Distribution</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Member</th>
          <td>${{memberMonthlyRev()}}</td>
          <td>{{memberUsage()}} / {{application.spots.length}} Spots</td>
          <td>{{numMem()}} ({{(numMem()/totalCust())*100}}%)</td>
        </tr>
        <tr>
          <th scope="row">Nonmember</th>
          <td>${{nonMemberMonthlyRev()}}</td>
          <td>{{nonMemberUsage()}} / {{application.spots.length}} Spots</td>
          <td>{{numNon()}} ({{(numNon()/totalCust())*100}}%)</td>
        </tr>
        <tr>
          <th scope="row">WalkIn</th>
          <td>${{walkinMonthlyRev()}}</td>
          <td>{{walkInUsage()}} / {{application.spots.length}} Spots</td>
          <td>{{numWalkin()}} ({{(numWalkin()/totalCust())*100}}%)</td>
        </tr>
        <tr>
          <th scope="row">Total</th>
          <td>${{memberMonthlyRev() + nonMemberMonthlyRev() + walkinMonthlyRev()}}</td>
          <td>{{memberUsage() + nonMemberUsage() + walkInUsage()}} / {{application.spots.length}} Spots</td>
          <td>{{totalCust()}} (100%)</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "appData",
  props: ["application", "isAdmin"],
  data() {
    return {
      month: null
    };
  },
  methods: {
    memberMonthlyRev() {
      var sum = 0;
      var i;

      for (i = 0; i < this.application.users.length; i++) {
        if (this.application.users[i].member)
          sum += parseInt(this.application.users[i].monthly_fee);
      }
      return sum;
    },
    nonMemberMonthlyRev() {
      var sum = 0;
      var i;
      var today = new Date();

      for (i = 0; i < this.application.reservations.length; i++) {
        if (this.application.reservations[i].member != "walkin") {
          if (
            parseInt(
              this.application.reservations[i].reserve_date.substring(5, 7)
            ) ==
            today.getMonth() + 1
          ) {
            sum += parseInt(this.application.reservations[i].total);
          }
        }
      }
      return sum;
    },
    walkinMonthlyRev() {
      var sum = 0;
      var i;
      var today = new Date();

      for (i = 0; i < this.application.reservations.length; i++) {
        if (this.application.reservations[i].member == "walkin") {
          if (
            parseInt(
              this.application.reservations[i].reserve_date.substring(5, 7)
            ) ==
            today.getMonth() + 1
          ) {
            sum += parseInt(this.application.reservations[i].total);
          }
        }
      }
      return sum;
    },
    numMem() {
      var members = 0;
      var i;
      for (i = 0; i < this.application.users.length; i++) {
        if (this.application.users[i].member) members++;
      }
      return members;
    },
    numNon() {
      var nonmembers = 0;
      var i;
      for (i = 0; i < this.application.users.length; i++) {
        if (!this.application.users[i].member) nonmembers++;
      }
      return nonmembers;
    },
    numWalkin() {
      var walkin = 0;
      var i;
      for (i = 0; i < this.application.reservations.length; i++) {
        if (this.application.reservations[i].member == "walkin") walkin++;
      }
      return walkin;
    },
    totalCust() {
      return this.numMem() + this.numNon() + this.numWalkin();
    },
    memberUsage() {
      var arr = [];
      var i;
      for (i = 0; i < this.application.users.length; i++) {
        var user = this.application.users[i];
        if (user.member) {
          if (!arr.includes(user.spot_id)) {
            arr.push(user.spot_id);
          }
        }
      }
      return arr.length;
    },
    nonMemberUsage() {
      var arr = [];
      var i;
      var today = new Date();
      for (i = 0; i < this.application.reservations.length; i++) {
        var rev = this.application.reservations[i];
        if (
          rev.member != "walkin" &&
          parseInt(rev.reserve_date.substring(5, 7)) == today.getMonth() + 1
        ) {
          if (!arr.includes(rev.spot_id)) {
            arr.push(rev.spot_id);
          }
        }
      }
      return arr.length;
    },
    walkInUsage() {
      var arr = [];
      var i;
      var today = new Date();
      for (i = 0; i < this.application.reservations.length; i++) {
        var rev = this.application.reservations[i];
        if (
          rev.member == "walkin" &&
          parseInt(rev.reserve_date.substring(5, 7)) == today.getMonth() + 1
        ) {
          if (!arr.includes(rev.spot_id)) {
            arr.push(rev.spot_id);
          }
        }
      }
      return arr.length;
    }
  }
};
</script>

<style>
</style>