
<template>
  <div class="container">
    <div class="text">
      <h1>Welcome to InstHappy</h1>
      <h2>the happiest Instagram place</h2>
      <div>
        For beginning, please Login to your Facebook account using the link
        below
      </div>
    </div>
    <button class="login" v-on:click="login">
      <i class="fab fa-facebook"></i>Connect with Facebook
    </button>
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
      access_token: "",
      fbId: "",
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
          console.log(result)
          this.fbData = result;
          // this.$router.replace({name: 'login'})
        })
        .catch((error) => {
          alert(error);
        });
      let url = await new URL(
        "https://graph.facebook.com/v10.0/oauth/access_token"
      );
      url.search = await new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: "273708304202650",
        client_secret: "daa2c101a805d31265963875c8912402",
        fb_exchange_token: this.fbData.credential.accessToken,
      });
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response2) => {
          if (response2.expires_in) {
            this.expires_in = response2.expires_in;
          };
          console.log(response2)
          this.access_token = response2.access_token;
          db.collection("Users").doc(this.fbData.user.uid).set({
            access_token: response2.access_token,
            expires_in: this.expires_in,
            name: this.fbData.user.displayName,
            photoURL: this.fbData.user.photoURL,
            email: this.fbData.user.email,
          });
        });

        await this.InstagramID();
    },

    logout() {
      firebase.auth().signOut().then(alert("you are logged out"));
    },

   async InstagramID() {
     console.log("accessToken : ", this.access_token)
     let url = await new URL(
        "https://graph.facebook.com/v10.0/me/accounts"
      );
      url.search = await new URLSearchParams({
        access_token: this.access_token,
      });
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response.data[0].id)
          this.fbId = response.data[0].id
        });

        let url1 = await new URL(
        `https://graph.facebook.com/v10.0/${this.fbId}`
      );
      url1.search = await new URLSearchParams({
        fields: "instagram_business_account",
        access_token: this.access_token,
      });
      await fetch(url1, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response2) => {
        db.collection("Users").doc(this.fbData.user.uid).update({
            IgId: response2.instagram_business_account.id})
        });
    }
  },
};
</script>

<style scoped>
.login {
  margin: 20px;
  padding: 7px;
  background-color: #1877f2;
  border: 0;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 10px;
  color: #fff;
  font-size: 25px;
}

.fab {
  padding: 10px;
}

.text {
  margin: 20px;
}

.text > * {
  margin: 20px;
}
</style>