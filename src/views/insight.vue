<template>
  <div>
    <div v-if="isDataloaded" class="container">
      <h1 class="title">Insight Page</h1>
      <div class="brand_infos">
        <div class="logo">
          <img :src="data.profile_picture_url" alt="" />
        </div>
        <div class="brandInfo">
          <div class="name">
            <h2>{{ data.name }}</h2>
          </div>
          <div class="stat">
            <h3>{{ data.media_count }} Post</h3>
            <h3>{{ data.followers_count }} followers</h3>
            <h3>{{ data.follows_count }} following</h3>
          </div>
        </div>
      </div>
      <div class="brandMetrics">
        <select
          v-model="selected"
          v-on:change="newQueryData"
          class="selDropDown"
        >
          <option disabled value="">Select the period</option>
          <option>day</option>
          <option>week</option>
          <option>days_28</option>
        </select>

        <div class="impression">
          <h1 class="number">{{ data.insights.data[0].values[0].value }}</h1>
          <div class="period">period : {{ data.insights.data[0].period }}</div>
          <div class="metrics">Metrics : {{ data.insights.data[0].name }}</div>
        </div>
        <div class="reach">
          <h1 class="number">{{ data.insights.data[1].values[0].value }}</h1>
          <div class="period">period : {{ data.insights.data[1].period }}</div>
          <div class="metrics">Metrics : {{ data.insights.data[1].name }}</div>
        </div>
        <!-- <div>
        <h1 class="number">{{ data.insights.data[2].values[0].value }}</h1>
        <div class="period">period : {{ data.insights.data[2].period }}</div>
        <div class="metrics">Metrics : {{ data.insights.data[2].name }}</div>
      </div> -->
      </div>
      <div class="testMedia">
        <div class="grid">
          <ul v-for="doc in data.media.data" v-bind:key="doc.id">
            <div
              class="card"
              v-bind:id="doc.id"
              v-on:click="modalTransmit(doc)"
            >
              <!-- <router-link
              class="link"
              v-bind:to="{ name: 'detailInsight', params: { id: doc.id } }"
            > -->
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
                <div class="imp">
                  impressions : {{ doc.insights.data[1].values[0].value }}
                </div>
                <div class="reach">
                  reach : {{ doc.insights.data[2].values[0].value }}
                </div>
                <div class="eng">
                  engagement : {{ doc.insights.data[0].values[0].value }}
                </div>
                <div class="secondcolumn">
                  <span>{{ doc.timestamp }}</span>
                </div>
              </div>
              <!-- </router-link> -->
            </div>
          </ul>
        </div>
      </div>
    </div>
    <modal
      v-bind:revele="revele"
      v-bind:selectedElement="selectedElement"
      @close="revele = false"
    ></modal>
  </div>
</template>

<script>
import Modal from "../components/modalPost.vue";
import { db } from "../config/firebaseInit";
import firebase from "firebase";

export default {
  name: "insight",
  components: {
    modal: Modal,
  },
  data() {
    return {
      data: {},
      access_token: "",
      brandMetrics: "",
      uid: "",
      selected: "day",
      brandInfo: "",
      IgId: "",
      listMediaInsight: [],
      revele: false,
      selectedElement: {
        media_url: "",
        like_count: 0,
        comments_count: 0,
        id: "",
        timestamp: "",
        media_type: "",
        permalink: "",
        reach: "",
        impressions: "",
        saved: "",
        access_token: "",
      },
    };
  },

  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
      }
    });

    let url = new URL(`${this.url}/insight`);
    url.search = new URLSearchParams({
      uid: this.uid,
      insight: "impressions,reach",
      period: this.selected,
    });

    await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response => ", response);
        this.data = response;
      });
  },

  methods: {
    modalTransmit(post) {
      this.selectedElement.media_url = post.media_url;
      this.selectedElement.like_count = post.like_count;
      this.selectedElement.comments_count = post.comments_count;
      this.selectedElement.id = post.id;
      this.selectedElement.timestamp = post.timestamp;
      this.selectedElement.media_type = post.media_type;
      this.selectedElement.permalink = post.permalink;
      this.selectedElement.reach = post.reach;
      this.selectedElement.impressions = post.impressions;
      this.selectedElement.saved = post.saved;
      this.selectedElement.access_token = this.access_token;

      this.revele = !this.revele;
    },

    async newQueryData() {
      let url = new URL(`${this.url}/insight`);
      url.search = new URLSearchParams({
        uid: this.uid,
        insight: "impressions,reach",
        period: this.selected,
      });

      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response => ", response);
          this.data = response;
        });
    },
  },

  computed: {
    isDataloaded() {
      const nestedLoaded = Object.keys(this.data).map(
        (key) => this.data[key].length !== 0
      );
      return this.data && nestedLoaded.length !== 0;
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
  background: #dbc5d5;
  border-radius: 1rem;
}
.image {
  height: 15vh;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
video {
  /* height: 15vh; */
  width: 100%;
  height: 15vh;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  object-fit: cover;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 20vh; */
}
.likeComment,
.secondcolumn {
  margin: 10px 0 20px 0;
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

.title {
  padding: 30px 0 30px 0;
}

.brandMetrics {
  margin: 30px 0 30px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}

.selDropDown {
  width: 30%;
  height: 30%;
  grid-column-start: 3;
}

.selected {
  grid-column-start: 3;
}

.impression {
  grid-column-start: 1;
  grid-row-start: 1;
}

.reach {
  grid-column-start: 2;
  grid-row-start: 1;
}
</style>