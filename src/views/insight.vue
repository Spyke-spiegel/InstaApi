<template>
  <div class="container">
    <h1>Insight Page</h1>
    <div class="brandMetrics">
      <div>
        <h1 class="number">{{ brandMetrics[0].values[0].value }}</h1>
        <div class="period">period : {{ brandMetrics[0].period }}</div>
        <div class="metrics">Metrics : {{ brandMetrics[0].name }}</div>
      </div>
      <div>
        <h1 class="number">{{ brandMetrics[1].values[0].value }}</h1>
        <div class="period">period : {{ brandMetrics[1].period }}</div>
        <div class="metrics">Metrics : {{ brandMetrics[1].name }}</div>
      </div>
      <div>
        <h1 class="number">{{ brandMetrics[2].values[0].value }}</h1>
        <div class="period">period : {{ brandMetrics[2].period }}</div>
        <div class="metrics">Metrics : {{ brandMetrics[2].name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../config/firebaseInit";
import firebase from 'firebase';

export default {
  name: "insight",
  data() {
    return {
      access_token: "",
      brandMetrics: "",
      uid: "",
    };
  },

  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
      }
    });

      await this.queryInsight();
  },


  methods: {
    async queryInsight() {
      let Id = await db
        .collection("Users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.access_token = doc.data().access_token;
        });

      let url = await new URL(
        "https://graph.facebook.com/v10.0/17841446016764337/insights"
      );
      url.search = new URLSearchParams({
        metric: "impressions,reach,profile_views",
        period: "day",
        access_token: this.access_token,
      });
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response ", response);
          this.brandMetrics = response.data;
        });
    },
  },
};
</script>

<style>
</style>