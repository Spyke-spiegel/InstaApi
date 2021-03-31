<template>
  <div class="container">
    <div class="navbar">
      <div class="logo"></div>
      <div class="route">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
        |
        <router-link to="/brandManager">Brand Manager</router-link>|
        <router-link to="/posting">Posting</router-link> |
        <router-link to="/insight">Insights</router-link>
      </div>
      <div class="loginInfo">
        <img :src="photoURL" alt="">
        <div v-if="loggedIn">Logged in {{name}}</div>
        <div v-else>Logged in : NO</div>
        <button @click="signOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      loggedIn: false,
      photoURL: "",
      name: ""
    };
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.name = user.displayName;
        this.photoURL = user.photoURL
      } else {
        this.loggedIn = false;
      }
    });
  },

  methods: {
    async signOut() {
      try {
        const data = await firebase.auth().signOut().then();
        console.log(data);
        this.$router.replace({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 10vh;
  width: 100vw;
  background-color: #2c3e50;
}

a {
  font-weight: bold;
  color: #318861;
}

a.router-link-exact-active {
  color: #42b983;
}

.loginInfo {
  color: white;
}

</style>