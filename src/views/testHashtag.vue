<template>
  <div class="container">
    <h1>hashtag page</h1>
    <input type="text" name="" v-model="searchHash" id="" />
    <button v-on:click="addHash">add HashTag#</button>

    <ul v-for="hash in listHash">
      <div class="delBtn">
        <button v-on:click="searchHashtagID(hash.hash)">{{ hash.hash }}</button>
        <button v-on:click="deleteHash(hash.hash)">X</button>
      </div>
    </ul>

    <button v-on:click="testhash">test insight hash</button>

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
      uid: "",
      IgId: "",
      hashID: "",
      searchHash: "",
      user_id: "",
      listpostHash: [],
      listHash: [],
      hashcomputed: [],
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

    let listHashfollow = await db
      .collection("Users")
      .doc(this.uid)
      .collection("testHashTag")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.listHash.push(doc.data());
          // console.log(doc.id, " => ", doc.data());
        });
      });
  },

  methods: {
    async searchHashtagID(id) {
      let url = await new URL(
        `https://graph.facebook.com/v10.0/ig_hashtag_search`
      );
      url.search = new URLSearchParams({
        user_id: this.IgId,
        q: id,
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
        fields:
          "caption,children,comments_count,id,like_count,media_type,media_url,permalink,timestamp",
        access_token: this.access_token,
      });

      await fetch(url2, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response ", response);
          this.listpostHash = response.data;
        });
    },

    async addHash() {
      if (this.listHash.some((i) => i.hash === this.searchHash) == false) {
        console.log("test1");
        this.listHash.push({ hash: this.searchHash });
        db.collection("Users")
          .doc(this.uid)
          .collection("testHashTag")
          .doc(this.searchHash)
          .set({
            hash: this.searchHash,
          })
          .then(console.log("test"))
          .catch((err) => console.log(err));
      }
    },

    async deleteHash(id) {
      console.log(id);
      db.collection("Users")
        .doc(this.uid)
        .collection("testHashTag")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      let deleteId = this.listHash.findIndex((x) => x.hash === id);
      this.listHash.splice(deleteId, 1);
      console.log(this.listHash);
    },

    async testhash() {
      let url = await new URL(
        `https://graph.facebook.com/v10.0/${this.IgId}/media`
      );
      url.search = new URLSearchParams({
        fields: "like_count, comments_count,comments",
        filtering: "[{'field':'text','operator':'IN',value:['#']}]",
        access_token: this.access_token,
      });

      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())

        .then((response) => {
          console.log("response ", response);
          for (let x = 0; x < response.data.length; x++) {
            var tempHash = [];
            tempHash = response.data[x].comments.data[0].text
              .split("#")
              .filter(Boolean);
            for (let i = 0; i < tempHash.length; i++) {
              console.log(
                "log # before test if already in DB : ",
                tempHash[i].trim()
              );
              if (
                this.hashcomputed.find((x) => x.hash === tempHash[i].trim())
              ) {
                var index = this.hashcomputed.findIndex(
                  (a) => a.hash === tempHash[i].trim()
                );
                this.hashcomputed[index].occurence++;
                this.hashcomputed[index].posts.push({
                  id: response.data[x].id,
                  comments_count: response.data[x].comments_count,
                  like_count: response.data[x].like_count,
                });
                console.log("test IF = true for => ", tempHash[i]);
              } else {
                this.hashcomputed.push({
                  hash: tempHash[i].trim(),
                  occurence: 1,
                  posts: [{
                    id: response.data[x].id,
                    like_count: response.data[x].like_count,
                    comments_count: response.data[x].comments_count,
                  }],
                });
                console.log("test False for => ", tempHash[i]);
                console.log(
                  "log de la DB apres test = false : ",
                  this.hashcomputed
                );
              }
            }
          }
          console.log("test du stat hash :", this.hashcomputed);
        });
    },

    sortinghightolow() {
      this.listpostHash.comments_count.sort((a, b) => b - a);
      console.log(this.listpostHash);
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