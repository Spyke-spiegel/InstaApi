<template>

  <navbar/>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar.vue";
import { onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import firebase from "firebase";

export default {
  name: 'app',
  components: {
    navbar
  },

  // setup () {
  //   const router = useRouter();
  //   const route = useRoute(); 

  //   onBeforeMount(() => {
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (!user) {
  //         router.replace('/login');
  //       } else if ( route.path == "/login") {
  //         router.replace('/');
  //       }
  //     })
  //   })
    
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
}
</style>
