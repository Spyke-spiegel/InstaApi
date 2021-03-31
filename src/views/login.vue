
<template>
  <div class="container">
    <button v-on:click="login">login</button>
    <button v-on:click="logout">logout</button>
  </div>
</template>

<script>
import { db } from "../config/firebaseInit";
import firebase from "firebase";
import "firebase/auth";
export default {
  name: "login",
  data() {
    return {
      fbData: "",
      expires_in: "",
    };
  },

  methods: {
    async login() {
      var provider = await new firebase.auth.FacebookAuthProvider();
      await provider.addScope("read_insights");
      await provider.addScope("ads_management");
      await provider.addScope("business_management");
      await provider.addScope("instagram_basic");
      await provider.addScope("instagram_manage_comments");
      await provider.addScope("instagram_manage_insights");
      await provider.addScope("instagram_content_publish");
      await provider.addScope("pages_read_engagement");
      await provider.addScope("public_profile");

      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // let credential = result.credential;
          // var user = result.user;
          // var accessToken = credential.accessToken;

          this.fbData = result;
          // this.$router.replace({name: 'login'})
        })
        .catch((error) => {
          alert(error)
        });
      await console.log(this.fbData.user.uid);
      let url = await new URL(
        "https://graph.facebook.com/v10.0/oauth/access_token"
      );
      url.search = new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: "273708304202650",
        client_secret: "daa2c101a805d31265963875c8912402",
        fb_exchange_token: this.fbData.credential.accessToken,
      });
      fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response2) => {
          if (response2.expires_in) {
          this.expires_in = response2.expires_in}
          console.log("response 2 ", response2);
          db.collection("Users").doc(this.fbData.user.uid).set({
            access_token: response2.access_token,
            expires_in: this.expires_in,
            name: this.fbData.user.displayName,
            photoURL: this.fbData.user.photoURL,
            email: this.fbData.user.email,
          });
        });
    },

    logout() {
      firebase.auth().signOut().then(alert("you are logged out"));
    },
  },
};
</script>