<template>
  <div class="customers">
    <div class="row">
      <div class="col-4">
        <h2>Customers</h2>
      </div>
      <div class="col">
        <div class="float right">
          <div class="row">
            <div class="col-8">
              <b-form-input></b-form-input>
            </div>
            <div class="col">
              <b-button>Search</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <table class="table mt-3">
      <thead class="thead-light">
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Car Plate</th>
          <th scope="col">Name</th>
          <th scope="col">Membership</th>
          <th scope="col">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in application.users" :key="user.username">
          <th scope="row">{{user.username}}</th>
          <td>{{user.car_plate}}</td>
          <td>{{user.first_name}} {{user.last_name}}</td>
          <td>{{formatMember(user.member)}}</td>
          <td>{{user.phone_number}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "customers",
  props: ["application", "isAdmin"],
  methods: {
    formatMember(member) {
      if (member) return "Member";
      else return "Non-Member";
    }
  }
};
</script>

<style>
</style>