
<template>
  <div class="container">
    <button v-on:click="login">login</button>
    <button v-on:click="logout">logout</button>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
export default {
  name: "login",
  data() {
    return {
      };
  },

  methods: {
    login() {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope("read_insights")
      provider.addScope("ads_management")
      provider.addScope("business_management")
      provider.addScope("instagram_basic")
      provider.addScope("instagram_manage_comments")
      provider.addScope("instagram_manage_insights")
      provider.addScope("instagram_content_publish")
      provider.addScope("pages_read_engagement")
      provider.addScope("public_profile")

     
      
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // let credential = result.credential;
          // var user = result.user;
          // var accessToken = credential.accessToken;
          console.log(result)
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          // ...
        });
    },

    logout() {
      firebase.auth().signOut().then(alert("you are logged out"))
    }
  },
};
</script>