<template>
  <div class="container">
    <h1 class="title">Account hashtag insight page</h1>

    <div class="listSort">
      <button v-on:click="sortOccurence">sort by occurence</button>
      <button v-on:click="sortComments">sort by comments</button>
      <button v-on:click="sortLike">sort by like</button>
      <button v-on:click="sortByAlphabet">sort by Name</button>
      <button v-on:click="score">test Score</button>
    </div>

    <div class="grid">
      <ul v-for="(doc, index) in sortedData">
        <div class="card">
          <div class="statHash">
            <h1>#{{ doc.hash }}</h1>
            <div class="occu">Occurence : {{ doc.occurence }}</div>
            <div class="like">Total Likes : {{ doc.totalLikes }}</div>
            <div class="totalcomments">
              Total Comments : {{ doc.totalComments }}
            </div>
            <div class="totalReach">Total Reach : {{ doc.totalReach }}</div>
            <div class="totallImpr">
              Total Imptressions : {{ doc.totalImpr }}
            </div>
            <div class="totalSaved">Total Saved : {{ doc.totalSaved }}</div>
          </div>
          <div class="lastPost">
            <ul v-for="post in doc.posts" :key="post.id">
              <button v-on:click="modalTransmit(post)" v-bind:id="post.id">
                <modal
                  v-bind:revele="revele"
                  v-bind:selectedElement="selectedElement"
                ></modal>
                <div class="post">
                  <img class="postImage" :src="post.media_url" alt="" />
                </div>
              </button>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import Modal from "../components/modalPost";
import { db } from "../config/firebaseInit";
import { storage } from "../config/firebaseInit";
import firebase from "firebase";
export default {
  name: "hashtag",
  components: {
    modal: Modal,
  },
  data() {
    return {
      access_token: "",
      uid: "",
      IgId: "",
      hashID: "",
      searchHash: "",
      user_id: "",
      hashcomputed: [],
      sortedData: [],
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

    let url = new URL(`${this.url}/hashtaginsight`);
    url.search = new URLSearchParams({
      uid: this.uid,
    });

    await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        this.computedData(response);
      });
  },

  methods: {
    modalTransmit(post) {
      this.selectedElement.media_url = post.media_url;
      this.selectedElement.like_count = post.like_count;
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

    async computedData(response) {
      await console.log("start the compute");
      for (let x = 0; x < response.length; x++) {
        // await console.log("test insight = ", response[x]);
        if (response[x].comments) {
          var tempHash = [];
          tempHash = await response[x].comments.data[0].text
            .split("#")
            .filter(Boolean);
          for (let i = 0; i < tempHash.length; i++) {
            if (this.hashcomputed.find((x) => x.hash === tempHash[i].trim())) {
              var index = await this.hashcomputed.findIndex(
                (a) => a.hash === tempHash[i].trim()
              );
              await this.hashcomputed[index].occurence++;
              await this.hashcomputed[index].posts.push({
                id: response[x].id,
                like_count: response[x].like_count,
                comments_count: response[x].comments_count,
                timestamp: response[x].timestamp,
                media_url: response[x].media_url,
                media_type: response[x].media_type,
                permalink: response[x].permalink,
                reach: response[x].insights.data[0].values[0].value,
                impressions: response[x].insights.data[1].values[0].value,
                saved: response[x].insights.data[2].values[0].value,
              });
            } else {
              await this.hashcomputed.push({
                hash: tempHash[i].trim(),
                occurence: 1,
                posts: [
                  {
                    id: response[x].id,
                    like_count: response[x].like_count,
                    comments_count: response[x].comments_count,
                    timestamp: response[x].timestamp,
                    media_url: response[x].media_url,
                    media_type: response[x].media_type,
                    permalink: response[x].permalink,
                    reach: response[x].insights.data[0].values[0].value,
                    impressions:
                      response[x].insights.data[1].values[0].value,
                    saved: response[x].insights.data[2].values[0].value,
                  },
                ],
              });
            }
          }
        }
      }
      for (var x = 0; x < this.hashcomputed.length; x++) {
        var arrComments = [];
        var arrLikes = [];
        var arrReach = [];
        var arrImpr = [];
        var arrSaved = [];
        this.hashcomputed[x].totalComments = 0;
        this.hashcomputed[x].totalLikes = 0;
        this.hashcomputed[x].totalReach = 0;
        this.hashcomputed[x].totalImpr = 0;
        this.hashcomputed[x].totalSaved = 0;

        for (var y = 0; y < this.hashcomputed[x].posts.length; y++) {
          await arrComments.push(this.hashcomputed[x].posts[y].comments_count);
          await arrLikes.push(this.hashcomputed[x].posts[y].like_count);
          await arrReach.push(this.hashcomputed[x].posts[y].reach);
          await arrImpr.push(this.hashcomputed[x].posts[y].impressions);
          await arrSaved.push(this.hashcomputed[x].posts[y].saved);
        }
        this.hashcomputed[x].totalComments = await arrComments.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalLikes = await arrLikes.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalReach = await arrReach.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalImpr = await arrImpr.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalSaved = await arrSaved.reduce(
          (a, b) => a + b,
          0
        );
      }
      this.sortedData = this.hashcomputed;
      // await console.log("log final data design = ", this.hashcomputed);
    },

    sortByAlphabet() {
      this.sortedData = [];
      var byName = this.hashcomputed.slice(0);
      byName.sort(function (a, b) {
        var x = a.hash.toLowerCase();
        var y = b.hash.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });

      console.log("by name:");
      console.log(byName);
      this.sortedData = byName;
    },

    sortOccurence() {
      this.sortedData = [];
      var byOccurence = this.hashcomputed.slice(0);
      byOccurence.sort(function (a, b) {
        return b.occurence - a.occurence;
      });
      console.log("by occurence:");
      console.log(byOccurence);
      console.log(this.hashcomputed);
      this.sortedData = byOccurence;
    },

    sortComments() {
      this.sortedData = [];
      var bycomment = this.hashcomputed.slice(0);
      bycomment.sort(function (a, b) {
        return b.totalComments - a.totalComments;
      });
      console.log("by comment:");
      console.log(bycomment);
      console.log(this.hashcomputed);
      this.sortedData = bycomment;
    },

    sortLike() {
      this.sortedData = [];
      var byLike = this.hashcomputed.slice(0);
      byLike.sort(function (a, b) {
        return b.totalLikes - a.totalLikes;
      });
      console.log("by comment:");
      console.log(byLike);
      console.log(this.hashcomputed);
      this.sortedData = byLike;
    },

    score() {
      var weightedReach = 2;
      var weightedImpression = 1;
      var weightedSaved = 4;
      var weightedlike = 3;
      var weightedComments = 1;
      var ponderationTime = 4;
      var ponderationOccurence = 2;

      for (var x = 0; x < this.hashcomputed.length; x++) {
        var calculreach = this.hashcomputed[x].totalReach * weightedReach;
        var calculImpression =
          this.hashcomputed[x].totalImpr * weightedImpression;
        var calculSaved = this.hashcomputed[x].totalSaved * weightedSaved;
        var calculLike = this.hashcomputed[x].totalLikes * weightedlike;
        var calculComments =
          this.hashcomputed[x].totalComments * weightedComments;
        var score =
          (calculreach +
            calculImpression +
            calculSaved +
            calculLike +
            calculComments) /
          (weightedReach +
            weightedImpression +
            weightedSaved +
            weightedlike +
            weightedComments);
        console.log(
          "test du score ===========> ",
          this.hashcomputed[x].hash,
          " = ",
          score
        );
        console.log("Reach Point : ", calculreach);
        console.log("Impression Point : ", calculImpression);
        console.log("Saved Point : ", calculSaved);
        console.log("Like Point : ", calculLike);
        console.log("Comments Point : ", calculComments);
      }
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
  /* This is better for small screens, once min() is better supported */
  grid-template-rows: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  grid-gap: 1rem;
  /* This is the standardized property now, but has slightly less support */
  /* gap: 1rem */
  margin: 50px 100px 0 100px;
}
.grid > ul > div {
  background: #e7c28a;
  padding: 1.5rem;
  border-radius: 1rem;
}

.grid > ul > div > i {
  color: white;
}

.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* height: 20vh; */
}

.postImage {
  height: 60px;
}

.lastPost {
  display: flex;
  flex-direction: row;
}

.title {
  margin: 50px;
}
</style>