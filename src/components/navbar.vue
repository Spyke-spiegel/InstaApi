<template>
  <div class="container">
    <div class="navbar">
      <div class="logo">
         <router-link to="/">
        <img src="../assets/insthappy.png" class="logo" alt="" />
        </router-link>
      </div>
      <div class="route">
        <router-link to="/">Home</router-link> |
        <router-link to="/insight">Insights</router-link>
        |
        <router-link to="/brandManager">Brand Manager</router-link>|
        <router-link to="/posting">Posting</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
      <div class="loginInfo">
        <img :src="photoURL" alt="" />
        <div v-if="loggedIn">Logged in {{ name }}</div>
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
      name: "",
    };
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.name = user.displayName;
        this.photoURL = user.photoURL;
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
  background: rgb(251,225,137);
background: linear-gradient(90deg, rgba(251,225,137,1) 0%, rgba(243,130,129,1) 100%);
}

a {
  font-weight: bold;
  color: #a7381d;
  
}

a.router-link-exact-active {
color: #6C1D09;
}

.loginInfo {
  color: #6C1D09;
  align-self: center;
  justify-self: right;
  padding: 20px;

}

.navbar {
  display: grid;
  grid-template-columns: 20% auto 20%;
  grid-template-rows: 115px;
}

.route {
  grid-column-start: 0;
  align-self: center;
  justify-self: center;
}

.route > a {
  padding: 10px;
  font-size: 23px;
  text-decoration: none;
}

.logo {
  grid-column-start: 1;
  grid-column-end: 1;
  height: 100%;
  justify-self: right;
    align-self: center;
}
</style>