<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>InstaHAPI</h1>
    <!-- <button class="login" v-on:click="login">login Facebook</button> -->
    <div class="grid">
      <ul v-for="brand in listBrand">
        <router-link
         
          class="link"
          v-bind:to="{ name: 'brandPage', params: { brand: brand.username } }"
        >
          <div class="card">
            <div class="image">
              <img :src="brand.profile_picture_url" alt="" />
            </div>
            <div class="stat">
              <div>
                <h2>{{ brand.name }}</h2>
              </div>
              <div>
                <div>Follower : {{ brand.followers_count }}</div>
                <div>nb Posts : {{ brand.media_count }}</div>
              </div>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { initFbsdk } from "@/config/fb.js";
import db from "../config/firebaseInit";

export default {
  name: "Home",
  data() {
    return {
      brand: [],
      listBrand: [],
      access_token: "",
    };
  },

  created() {
    db.collection("brand")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.brand.push(doc.data().brand);
          // console.log(doc.id, " => ", doc.data());
        });
      })
      .then(this.queryInstaData());
  },

  methods: {
    async queryInstaData() {
      //   await console.log("Data 1 :", doc);
      var posts = "";
      await db
        .collection("Users")
        .doc("105818491592653")
        .get()
        .then((doc) => {
          this.access_token = doc.data().access_token;
        });
      await this.brand.forEach((i) => {
        // console.log("test brand : ", i);
        let url = new URL(
          "https://graph.facebook.com/v10.0/17841446016764337/"
        );
        url.search = new URLSearchParams({
          fields: `business_discovery.username(${i}){ig_id,name,username,followers_count,media_count,profile_picture_url}`,
          access_token: this.access_token,
        });

        fetch(url, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((response) => {
            console.log("response facebook API ", response.business_discovery);
            this.listBrand.push(response.business_discovery);
          });
      });
      // await console.log("final Array : " + this.listBrand);
      // await console.log("verif push Igdata = ", this.posts.media.data);
    },
    login() {
      FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          // The user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token
          // and signed request each expire.
          console.log(response);
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

<style scoped>
.grid {
  padding-top: 20px;
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
  /* This is better for small screens, once min() is better supported */
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  grid-gap: 1rem;
  /* This is the standardized property now, but has slightly less support */
  /* gap: 1rem */
}

.grid > ul > div {
  background: #a8afac;
  padding: 1.5rem;
  border-radius: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
}

img {
  height: 10vh;
}
</style>
