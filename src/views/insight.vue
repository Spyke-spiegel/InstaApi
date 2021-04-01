<template>
  <div class="container">
    <h1>Insight Page</h1>
    <div v-if="isbrandInfosloaded" class="brand_infos">
      <div class="logo"><img :src="brandInfo.profile_picture_url" alt="" /></div>
      <div class="brandInfo">
        <div class="name">
          <h2>{{ brandInfo.name }}</h2>
        </div>
        <div class="stat">
          <h3>{{ brandInfo.media_count }} Post |</h3>
          <h3>{{ brandInfo.followers_count }} followers |</h3>
          <h3>{{ brandInfo.follows_count }} following</h3>
        </div>
        <div class="bio">{{ brandInfo.biography }}</div>
      </div>
    </div>
    <div v-if="isInsightInfosloaded" class="brandMetrics">
      <select v-model="selected" v-on:change="queryInsight">
        <option disabled value="">Select the period</option>
        <option>day</option>
        <option>week</option>
        <option>days_28</option>
      </select>
      <span>Sélectionné : {{ selected }}</span>
      <div class="metrtic">
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
        <!-- <div>
        <h1 class="number">{{ brandMetrics[2].values[0].value }}</h1>
        <div class="period">period : {{ brandMetrics[2].period }}</div>
        <div class="metrics">Metrics : {{ brandMetrics[2].name }}</div>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../config/firebaseInit";
import firebase from "firebase";

export default {
  name: "insight",
  data() {
    return {
      access_token: "",
      brandMetrics: "",
      uid: "",
      selected: "day",
      brandInfo: "",
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
    await this.brandInfos();
  },

  computed: {
    isbrandInfosloaded () {
    const nestedLoaded = Object.keys(this.brandInfo).map(key => this.brandInfo[key].length !== 0)
    return this.brandInfo && nestedLoaded.length !== 0
    },

    isInsightInfosloaded () {
    const nestedLoaded = Object.keys(this.brandMetrics).map(key => this.brandMetrics[key].length !== 0)
    return this.brandMetrics && nestedLoaded.length !== 0
    }
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
        metric: "impressions,reach",
        period: this.selected,
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

    async brandInfos() {
      let Id = await db
        .collection("Users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.access_token = doc.data().access_token;
        });

      let url = await new URL(
        "https://graph.facebook.com/v10.0/17841446016764337"
      );
      url.search = new URLSearchParams({
        fields: 'ig_id,name,biography,follows_count,followers_count,media_count,profile_picture_url',
        access_token: this.access_token,
      });
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response ", response);
          this.brandInfo = response;
        });
    }
  },
};
</script>

<style>
</style>