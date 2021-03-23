<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>HelloWorld</h1>
    <button class="login" v-on:click="login">instagram</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { initFbsdk } from "@/config/fb.js";

export default {
  name: "Home",
  components: {},
  mounted() {
    initFbsdk();
  },
  methods: {
    login() {
      // FB.login(function (response) {
      //   if (response.authResponse) {
      //     console.log("Welcome!  Fetching your information.... ");
      //     FB.api("/me", function (response) {
      //       console.log("Good to see you, " + response.name + ".");
      //     });
      //   } else {
      //     console.log("User cancelled login or did not fully authorize.");
      //   }
      // });
      FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          // The user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token
          // and signed request each expire.
          console.log(response)
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
        } else if (response.status === "not_authorized") {
          // The user hasn't authorized your application.  They
          // must click the Login button, or you must call FB.login
          // in response to a user gesture, to launch a login dialog.
        } else {
          // The user isn't logged in to Facebook. You can launch a
          // login dialog with a user gesture, but the user may have
          // to log in to Facebook before authorizing your application.
        }
      });
    },
  },
};
</script>
