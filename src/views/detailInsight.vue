<template>
  <div class="container">
    <h1>Detail Insight</h1>
    <h2>{{ id }}</h2>
    <button v-on:click="QueryPostInsight">test</button>
  </div>
</template>

<script>
import { db } from "../config/firebaseInit";
import firebase from 'firebase'
export default {
  name: "detailInsight",
  data() {
    return {
      mediaId: "",
      access_token: "",
      uid: "",
    };
  },

  async created() {
   this.mediaId = await this.$route.params.id;
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
      }
    });

    let Id = await db
      .collection("Users")
      .doc(this.uid)
      .get()
      .then((doc) => {
        this.access_token = doc.data().access_token;
      });
  },

  methods: {
    async QueryPostInsight() {
      //query Pics and Info for each IG-Media

      let url = await new URL(
        `https://graph.facebook.com/v10.0/${this.mediaId}/insights`
      );
      url.search = new URLSearchParams({
        metric: "reach",
        // period: "day",
        since: "1617364800",
        until: "1617279765",
        access_token: this.access_token,
      });
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response2) => {
          console.log(response2);
        });

      await console.log(this.listMediaInsight);
    },
  },
};
</script>

<style>
</style>