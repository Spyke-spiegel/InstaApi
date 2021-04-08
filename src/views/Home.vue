<template>
  <div class="home">
    <div class="logo">
      <img alt="Vue logo" src="../assets/insthappy.png" />
      <h1>Welcome to InstaHappy</h1>
      <!-- <button class="login" v-on:click="login">login Facebook</button> -->
    </div>
    <h2>list of Brand that you watch</h2>
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
import { db } from "../config/firebaseInit";
import firebase from "firebase";

export default {
  name: "Home",
  data() {
    return {
      brand: [],
      listBrand: [],
      access_token: "",
      uid: "",
      IgId: "",
    };
  },

  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
      }
    });

    await db
      .collection("Users")
      .doc(this.uid)
      .collection("brand")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.brand.push(doc.data().brand);
          console.log(doc.id, " => ", doc.data());
        });
      });
    // .then(this.queryInstaData());

    await this.queryInstaData();
  },

  methods: {
    async queryInstaData() {
      // await console.log("Data 1 :", doc);
      var posts = "";
      await db
        .collection("Users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          console.log(doc.data());
          this.access_token = doc.data().access_token;
          this.IgId = doc.data().IgId;
        });
      await this.brand.forEach((i) => {
        // console.log("test brand : ", i);
        let url = new URL(`https://graph.facebook.com/v10.0/${this.IgId}/`);
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
  grid-gap: 2rem 1rem;
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
  border-radius: 50%;
}

a {
  text-decoration: none;
  color: black;
}

.logo {
  margin: 25px;
}
</style>
