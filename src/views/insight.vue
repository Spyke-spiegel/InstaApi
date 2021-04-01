<template>
  <div class="container">
    <h1>Insight Page</h1>
    <div v-if="isbrandInfosloaded" class="brand_infos">
      <div class="logo">
        <img :src="brandInfo.profile_picture_url" alt="" />
      </div>
      <div class="brandInfo">
        <div class="name">
          <h2>{{ brandInfo.name }}</h2>
        </div>
        <div class="stat">
          <h3>{{ brandInfo.media_count }} Post</h3>
          <h3>{{ brandInfo.followers_count }} followers</h3>
          <h3>{{ brandInfo.follows_count }} following</h3>
        </div>
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
    <div class="testMedia">
      <button v-on:click="QueryPostInsight">test Post</button>
     <div class="grid">
      <ul v-for="doc in listMediaInsight">
        <div class="card">
          <a :href="doc.permalink" target="blank">
            <div class="imgCard">
              <div
                class="test"
                v-if="
                  doc.media_type == 'IMAGE' ||
                  doc.media_type == 'CAROUSEL_ALBUM'
                "
              >
                <img :src="doc.media_url" class="image" />
              </div>
              <div class="test" v-else>
                <video controls muted poster :src="doc.media_url"></video>
              </div>
              <div class="likeComment">
                <i class="far fa-heart">
                  <div class="txt">{{ doc.like_count }}</div>
                </i>
                <i class="far fa-comment"
                  ><div class="txt">{{ doc.comments_count }}</div></i
                >
                
              </div>
              <div class="imp">impressions : {{doc.impressions}}</div>
                <div class="reach">reach : {{doc.reach}}</div>
                <div class="eng">engagement : {{doc.engagement}}</div>
              <div class="secondcolumn">
                <span>{{doc.timestamp}}</span>
              </div>
            </div>
          </a>
        </div>
      </ul>
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
      IgId: "",
      listMediaInsight: [],
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
    isbrandInfosloaded() {
      const nestedLoaded = Object.keys(this.brandInfo).map(
        (key) => this.brandInfo[key].length !== 0
      );
      return this.brandInfo && nestedLoaded.length !== 0;
    },

    isInsightInfosloaded() {
      const nestedLoaded = Object.keys(this.brandMetrics).map(
        (key) => this.brandMetrics[key].length !== 0
      );
      return this.brandMetrics && nestedLoaded.length !== 0;
    },
  },

  methods: {
    async queryInsight() {
      let Id = await db
        .collection("Users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.access_token = doc.data().access_token;
          this.IgId = doc.data().IgId;
        });

      let url = await new URL(
        `https://graph.facebook.com/v10.0/${this.IgId}/insights`
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
          // console.log("response ", response);
          this.brandMetrics = response.data;
        });

      url.search = new URLSearchParams({
        metric:
          "audience_city,audience_country,audience_gender_age,audience_locale",
        period: "lifetime",
        access_token: this.access_token,
      });
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          // console.log("response 2", response);
          // this.brandMetrics = response.data;
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

      let url = await new URL(`https://graph.facebook.com/v10.0/${this.IgId}`);
      url.search = new URLSearchParams({
        fields:
          "name,biography,follows_count,followers_count,media_count,profile_picture_url",
        access_token: this.access_token,
      });
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          // console.log("response ", response);
          this.brandInfo = response;
        });
    },

    async QueryPostInsight() {
      let res1 = {}
      let res2 = {}
      let tempId = []
      let test = []
      let listMedia = [];
      let url = await new URL(
        `https://graph.facebook.com/v10.0/${this.IgId}/media`
      );
      url.search = new URLSearchParams({
        access_token: this.access_token,
      });
      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          for (const i of response.data) {
            listMedia.push(i.id);
          }
        });
      for (const x of listMedia) {

        //Querry the insight for each IG-Media
        let url = await new URL(
          `https://graph.facebook.com/v10.0/${x}/insights`
        );
        url.search = new URLSearchParams({
          metric: "engagement,impressions,reach,saved",
          access_token: this.access_token,
        });
        await fetch(url, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((response) => {
            tempId = response.data[0].id.split("/");
              res1 = response
          });


          //query Pics and Info for each IG-Media
          
          let url2 = await new URL(
          `https://graph.facebook.com/v10.0/${x}`
        );
        url2.search = new URLSearchParams({
          fields: "media_url,timestamp,media_product_type,media_type,like_count,comments_count",
          access_token: this.access_token,
        });
        await fetch(url2, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((response2) => {
            res2 = response2
          });
            test.push({
              media_url: res2.media_url,
              timestamp: res2.timestamp,
              media_product_type: res2.media_product_type,
              media_type: res2.media_type,
              like_count: res2.like_count,
              comments_count: res2.comments_count,
              id: tempId[0],
              engagement: res1.data[0].values[0].value,
              impressions: res1.data[1].values[0].value,
              reach: res1.data[2].values[0].value,
              saved: res1.data[3].values[0].value,
            });
      }
      this.listMediaInsight = await test 
      await console.log(this.listMediaInsight);
      return test
    },
  },
};
</script>

<style scoped>
.brand_infos {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 15px;
}

.brandInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 25px 0 25px;
}

.stat > h3 {
  margin: 10px;
}

.logo > img {
  width: 150px;
  border-radius: 75px;
}

.grid {
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
.image {
  height: 15vh;
}
video {
  /* height: 15vh; */
  width: 100%;
  height: 100%;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 20vh; */
}
.likeComment,
.secondcolumn {
  margin-top: 10px;
}
.likeComment,
.far,
.secondcolumn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.txt {
  font-family: "Montserrat", sans-serif;
  margin-left: 10px;
}
a {
  text-decoration: none;
  color: black;
}

/* .logo > img {
  height: 10vh;
} */
</style>