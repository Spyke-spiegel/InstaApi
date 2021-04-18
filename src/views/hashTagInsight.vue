<template>
  <div class="container">
    <h1 class="title">Account hashtag insight page</h1>

    <div class="listSort">
      <button v-bind:click="sortOccurence">sort by occurence</button>
      <button v-bind:click="sortComments">sort by comments</button>
      <button v-bind:click="sortLike">sort by like</button>
    </div>

    <div class="grid">
      <ul v-for="(doc, index) in hashcomputed">
        <div class="card">
          <div class="statHash">
            <h1>#{{ doc.hash }}</h1>
            <div class="occu">Occurence : {{ doc.occurence }}</div>
            <div class="totalcomments">
              Total Comments : {{ doc.totalComments }}
            </div>
            <div class="totallikes">Total Tag : {{ doc.totalLikes }}</div>
            <div class="totalReach">Total Reach : {{ doc.totalReach }}</div>
            <div class="totallImpr">
              Total Imptressions : {{ doc.totalImpr }}
            </div>
            <div class="totalSaved">Total Saved : {{ doc.totalSaved }}</div>
          </div>
          <div class="lastPost">
            <ul v-for="post in doc.posts" :key="post.id">
              <button v-on:click="doSomething(post)" v-bind:id="post.id">
                <modal
                  v-bind:revele="revele"
                  v-bind:selectedElement="selectedElement"
                ></modal>
                <div class="post" >
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
      revele: false,
      selectedElement: {
        media_url: "",
        like_count: 0,
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
    let Id = await db
      .collection("Users")
      .doc(this.uid)
      .get()
      .then((doc) => {
        this.access_token = doc.data().access_token;
        this.IgId = doc.data().IgId;
      });

    let url = await new URL(
      `https://graph.facebook.com/v10.0/${this.IgId}/media`
    );
    url.search = new URLSearchParams({
      fields:
        "like_count, comments_count,comments,timestamp,media_url,media_type,permalink,insights.metric(reach,impressions,saved)",
      filtering: "[{'field':'text','operator':'IN',value:['#']}]",
      access_token: this.access_token,
    });

    await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("query at created");
        this.computedData(response);
        if (response.paging.next) {
          this.nextPageQuery(response.paging.next);
        }
      });
  },

  methods: {
    doSomething(post) {
      this.selectedElement.media_url = post.media_url;
      this.selectedElement.like_count = post.like_count;
      this.revele = !this.revele;
    },

    async computedData(response) {
      await console.log("start the compute");
      for (let x = 0; x < response.data.length; x++) {
        await console.log("test insight = ", response.data[x]);
        if (response.data[x].comments) {
          var tempHash = [];
          tempHash = await response.data[x].comments.data[0].text
            .split("#")
            .filter(Boolean);
          for (let i = 0; i < tempHash.length; i++) {
            if (this.hashcomputed.find((x) => x.hash === tempHash[i].trim())) {
              var index = await this.hashcomputed.findIndex(
                (a) => a.hash === tempHash[i].trim()
              );
              await this.hashcomputed[index].occurence++;
              await this.hashcomputed[index].posts.push({
                id: response.data[x].id,
                like_count: response.data[x].like_count,
                comments_count: response.data[x].comments_count,
                timestamp: response.data[x].timestamp,
                media_url: response.data[x].media_url,
                media_type: response.data[x].media_type,
                permalink: response.data[x].permalink,
                reach: response.data[x].insights.data[0].values[0].value,
                impressions: response.data[x].insights.data[1].values[0].value,
                saved: response.data[x].insights.data[2].values[0].value,
              });
            } else {
              await this.hashcomputed.push({
                hash: tempHash[i].trim(),
                occurence: 1,
                posts: [
                  {
                    id: response.data[x].id,
                    like_count: response.data[x].like_count,
                    comments_count: response.data[x].comments_count,
                    timestamp: response.data[x].timestamp,
                    media_url: response.data[x].media_url,
                    media_type: response.data[x].media_type,
                    permalink: response.data[x].permalink,
                    reach: response.data[x].insights.data[0].values[0].value,
                    impressions:
                      response.data[x].insights.data[1].values[0].value,
                    saved: response.data[x].insights.data[2].values[0].value,
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
      await console.log("log final data design = ", this.hashcomputed);
    },

    async nextPageQuery(next) {
      console.log("start new query");
      await fetch(next, {
        method: "GET",
      })
        .then((res) => res.json())

        .then((response) => {
          console.log("log de la funct next page", response);
          this.computedData(response);
          if (response.paging.next) {
            this.nextPageQuery(response.paging.next);
            return;
          }
        });
    },

    // sortinghightolow() {
    //   this.listpostHash.comments_count.sort((a, b) => b - a);
    //   console.log(this.listpostHash);
    // },

    sortOccurence() {
      console.log("sort Occurence");
    },

    sortComments() {
      console.log("sort comments");
    },

    sortLike() {
      console.log("sort like");
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