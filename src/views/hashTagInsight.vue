<template>
  <div class="container">
    <h1 class="title">Account hashtag insight page</h1>
 
<modal/>
    <div class="grid">
      <ul v-for="doc in hashcomputed">
        <div class="card">
          <div class="statHash">
            <h1>#{{ doc.hash }}</h1>
            <div class="occu">Occurence : {{ doc.occurence }}</div>
            <div class="totalcomments">
              Total Comments : {{ doc.totalComments }}
            </div>
            <div class="totallikes">
              Total Tag : {{ doc.totalLikes }}
            </div>
          </div>
          <div class="lastPost">
            <ul v-for="post in doc.posts">
              <div class="post">
                <img class="postImage" :src="post.media_url" alt="" />
              </div>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  </div>


  <div class="modal"></div>
</template>

<script>
import Modal from '../components/modalPost'
import { db } from "../config/firebaseInit";
import { storage } from "../config/firebaseInit";
import firebase from "firebase";
export default {
  name: "hashtag",
  components: {
    'modal': Modal
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
        "like_count, comments_count,comments,timestamp,media_url,media_type,permalink",
      filtering: "[{'field':'text','operator':'IN',value:['#']}]",
      access_token: this.access_token,
    });

    await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("query at created")
        this.computedData(response);
        if (response.paging.next) {
          this.nextPageQuery(response.paging.next);
        }
      });
  },

  methods: {
    async computedData(response) {
      console.log("start the compute")
      for (let x = 0; x < response.data.length; x++) {
        if (response.data[x].comments) {
          var tempHash = [];
          tempHash = response.data[x].comments.data[0].text
            .split("#")
            .filter(Boolean);
          for (let i = 0; i < tempHash.length; i++) {
            if (this.hashcomputed.find((x) => x.hash === tempHash[i].trim())) {
              var index = this.hashcomputed.findIndex(
                (a) => a.hash === tempHash[i].trim()
              );
              this.hashcomputed[index].occurence++;
              this.hashcomputed[index].posts.push({
                id: response.data[x].id,
                like_count: response.data[x].like_count,
                comments_count: response.data[x].comments_count,
                timestamp: response.data[x].timestamp,
                media_url: response.data[x].media_url,
                media_type: response.data[x].media_type,
                permalink: response.data[x].permalink,
              });
            } else {
              this.hashcomputed.push({
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
        this.hashcomputed[x].totalComments = 0;
        this.hashcomputed[x].totalLikes = 0;

        for (var y = 0; y < this.hashcomputed[x].posts.length; y++) {
          arrComments.push(this.hashcomputed[x].posts[y].comments_count);
          arrLikes.push(this.hashcomputed[x].posts[y].like_count);
        }
        // this.hashcomputed[x].totalComments
        // this.hashcomputed[x].totalLikes

        this.hashcomputed[x].totalComments = arrComments.reduce(
          (a, b) => a + b,
          0
        );
        this.hashcomputed[x].totalLikes = arrLikes.reduce((a, b) => a + b, 0);
      }
    },

    async nextPageQuery(next) {
      console.log("start new query")
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
        })
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
  grid-template-rows: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  grid-gap: 1rem;
  /* This is the standardized property now, but has slightly less support */
  /* gap: 1rem */
  margin: 50px 100px 0 100px
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
  margin: 50px
}
</style>