<template>
  <div class="container">
    <h1>hashtag page</h1>
    <input type="text" name="" v-model="searchHash" id="" />
    <button v-on:click="searchHashtagID">test Hash</button>


    <div class="grid">
      <ul v-for="doc in listpostHash">
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
              <!-- <div class="secondcolumn">
                <span>{{ moment(doc.timestamp).format("MMM Do YY") }}</span>
              </div> -->
            </div>
          </a>
        </div>
      </ul>
    </div>


  </div>
</template>

<script>
import { db } from "../config/firebaseInit";
import { storage } from "../config/firebaseInit";
import firebase from "firebase";
export default {
  name: "hashtag",
  data() {
    return {
      access_token: "",
      IgId: "",
      hashID: "",
      searchHash: "",
      user_id: "",
      listpostHash: [],
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
  },

  methods: {
    async searchHashtagID() {
      let url = await new URL(
        `https://graph.facebook.com/v10.0/ig_hashtag_search`
      );
      url.search = new URLSearchParams({
        user_id: this.IgId,
        q: this.searchHash,
        access_token: this.access_token,
      });

      await fetch(url, {
        method: "GET",
      })
        .then(this.status)
        .then((res) => res.json())
        .then((response) => {
          console.log("response ", response.data[0].id);
          this.hashID = response.data[0].id;
        });



      let url2 = await new URL(
        `https://graph.facebook.com/v10.0/${this.hashID}/top_media`
      );
      url2.search = new URLSearchParams({
        user_id: this.IgId,
        fields: "caption,children,comments_count,id,like_count,media_type,media_url,permalink,timestamp",
        access_token: this.access_token,
      });

      await fetch(url2, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response ", response);
          this.listpostHash = response.data
        });
    },
  },
};
</script>

<style scoped>
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
  background: #e7c28a;
  padding: 1.5rem;
  border-radius: 1rem;
}

.grid > ul > div > i {
  color: white;
}

.image {
  height: 15vh;
}
video {
  /* height: 15vh; */
  width: 100%;
  height: 15vh;
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
</style>