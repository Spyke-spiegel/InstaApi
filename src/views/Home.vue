<template>
  <div class="home">
    <div class="logo">
      <h1>Welcome to Instametrics</h1>
      <!-- <button class="login" v-on:click="login">login Facebook</button> -->
    </div>
    <h2>list of Brand that you watch</h2>
    <div class="grid">
      <ul v-for="brand in listBrand" v-bind:key="brand.id">
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
import firebase from "firebase";

export default {
  name: "Home",
  data() {
    return {
      listBrand: [],
    };
  },

  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        console.log("problem with firebase Auth")
      }
    });

    await this.queryInstaData();
  },

  methods: {
    async queryInstaData() {
      // await console.log("Data 1 :", doc);
      let url = new URL(`${this.url}/home`);
      url.search = new URLSearchParams({
        uid: this.uid,
      });

      fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          this.listBrand = response;
        });
    },
  },
};
</script>

<style scoped>
.grid {
  padding-top: 50px;
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
