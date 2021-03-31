<template>
  <div class="container">
    <router-link to="/"><i class="fas fa-arrow-circle-left"></i></router-link>
    <div class="brand_infos">
      <div class="logo"><img :src="posts.profile_picture_url" alt="" /></div>
      <div class="brandInfo">
        <div class="name">
          <h2>{{ posts.name }}</h2>
        </div>
        <div class="stat">
          <h3>{{ posts.media_count }} Posts |</h3>
          <h3>{{ posts.followers_count }} followers |</h3>
          <h3>{{ posts.follows_count }} following</h3>
        </div>
        <div class="bio">{{ posts.biography }}</div>
      </div>
    </div>

    <div class="grid">
      <ul v-for="doc in posts.media.data">
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
                <video
                  controls
                  muted
                  poster
                  :src="doc.media_url"

                ></video>
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
import firebase from 'firebase'

export default {
  name: "brandPage",
  data() {
    return {
      posts: {},
      access_token: "",
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

      await this.queryInstaData();
  },



  methods: {
    async queryInstaData() {
      await console.log("brand username:", this.$route.params.brand);
      var posts = "";
      await db
        .collection("Users")
        .doc(this.uid)
        .get()
        .then((doc) => {
          this.access_token = doc.data().access_token;
          console.log("access token : ", doc.data().access_token)
        });
      //   await console.log("test access token : ", this.access_token);
      let url = new URL("https://graph.facebook.com/v10.0/17841446016764337/");
      url.search = new URLSearchParams({
        fields: `business_discovery.username(${this.$route.params.brand}){ig_id,name,biography,follows_count,followers_count,media_count,profile_picture_url,media{media_url,comments_count,like_count,timestamp,media_type,permalink}}`,
        access_token: this.access_token,
      });

      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response ", response.business_discovery);
          this.posts = response.business_discovery;
        });
      // console.log("Test before DB : " + response.authResponse.accessToken);
      // await console.log("verif push Igdata = ", this.posts.media.data);
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

.logo > img {
  height: 10vh;
}

.brand_infos {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: center;
}
.brandInfo {
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: center;
  justify-content: center;
}

.stat {
  display: flex;
  flex-direction: row;
}

.stat > h3 {
  padding: 10px;
}

.bio {
  width: 100%;
}
</style>