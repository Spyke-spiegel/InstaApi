<template>
  <div class="container">
    <div class="navbar">
      <div id="navbarButton" @click="navbarVisible = !navbarVisible">
        <i class="fas fa-bars"></i>
      </div>
      <div class="logo">
        <router-link to="/" id="logoText"> INSTAMETRICS </router-link>
      </div>
      <div class="route"></div>
      <div class="loginInfo">
        <img :src="photoURL" alt="" class="profilePics" />
        <div v-if="loggedIn">Logged in {{ name }}</div>
        <div v-else>Logged in : NO</div>
        <button @click="signOut">Sign Out</button>
      </div>
    </div>
    <div id="navbarContainer">
      <div v-if="navbarVisible" id="navbarDrawer">
        <router-link to="/" @click="navbarVisible = !navbarVisible"
          >Home</router-link
        >
        <router-link to="/insight" @click="navbarVisible = !navbarVisible"
          >Insights</router-link
        >

        <router-link to="/brandManager" @click="navbarVisible = !navbarVisible"
          >Brand Manager</router-link
        >
        <router-link to="/posting" @click="navbarVisible = !navbarVisible"
          >Posting</router-link
        >
        <router-link to="/hashtag" @click="navbarVisible = !navbarVisible"
          >hashtag</router-link
        >
        <router-link
          to="/hashTagInsight"
          @click="navbarVisible = !navbarVisible"
          >Hashtag Insights</router-link
        >
        <router-link to="/account" @click="navbarVisible = !navbarVisible"
          >My Account</router-link
        >
      </div>
      <div id="navbarOverlay" @click="navbarVisible = !navbarVisible"></div>
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
      navbarVisible: false,
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
  background: linear-gradient(90deg, #f3b2b4 0%, #c6d6f3 100%);
}

/* a {
  font-weight: bold;
  color: #a7381d;
}

a.router-link-exact-active {
  color: #6c1d09;
} */

.loginInfo {
  color: black;
  align-self: center;
  justify-self: right;
  padding: 20px;
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
}

.navbar {
  display: grid;
  grid-template-columns: 20% auto 20%;
  grid-template-rows: 115px;
}

.logo {
  grid-column-start: 2;
  grid-column-end: 2;
  justify-self: center;
  align-self: center;
}

#logoText {
  font-size: 35px;
  font-weight: 900;
  color: black;
}

#navbarButton {
  align-self: center;
  justify-self: left;
  padding-left: 40px;
  font-size: 30px;
  color: black;
}

#navbarDrawer {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 10%;
  left: 0px;
  background: linear-gradient(0deg, #f3b2b4 0%, #c6d6f3 100%);
  height: 100vh;
}

#navbarDrawer > a {
  padding: 20px;
}

.profilePics {
  border-radius: 50%;
}

#navbarContainer {
  width: 100vw;
  height: 100vh;
}

#navbarOverlay {
  height: 100%;
  width: 100%;
}
</style>