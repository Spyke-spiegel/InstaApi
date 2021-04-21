<template>
  <div class="container">
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

    <div v-if="ispostsloaded" class="grid">
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
import firebase from "firebase";

export default {
  name: "brandPage",
  data() {
    return {
      posts: {},
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

  computed: {
    ispostsloaded() {
      const nestedLoaded = Object.keys(this.posts).map(
        (key) => this.posts[key].length !== 0
      );
      return this.posts && nestedLoaded.length !== 0;
    },
  },

  methods: {
    async queryInstaData() {
      await console.log("brand username:", this.$route.params.brand);
      var posts = "";
     
      let url = new URL(`${this.url}/businessdiscovery/${this.$route.params.brand}`);
      url.search = new URLSearchParams({
        uid: this.uid,
      });

      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          this.posts = response[0].business_discovery;
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
  border-radius: 50%;
}

.brand_infos {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: center;
  margin: 30px 0 30px 0;
}
.brandInfo {
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: center;
  justify-content: center;
  margin: 0 30px 0 30px;
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