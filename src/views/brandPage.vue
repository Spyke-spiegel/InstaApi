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
      <ul v-for="doc in posts.media.data" v-bind:key="doc.timestamp">
        <div class="card">
          <!-- <a :href="doc.permalink" target="blank"> -->
          <div
            class="imgCard"
            v-bind:id="doc.id"
            v-on:click="modalTransmit(doc)"
          >
            <div
              class="test"
              v-if="
                doc.media_type == 'IMAGE' || doc.media_type == 'CAROUSEL_ALBUM'
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

          <!-- </a> -->
        </div>
      </ul>
    </div>
    <modal
      v-bind:revele="revele"
      v-bind:selectedElement="selectedElement"
      @close="revele = false"
    ></modal>
  </div>
</template>

<script>
import Modal from "../components/modalPost";
import firebase from "firebase";

export default {
  name: "brandPage",
  components: {
    modal: Modal,
  },
  data() {
    return {
      posts: {},
      uid: "",
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

      let url = new URL(
        `${this.url}/businessdiscovery/${this.$route.params.brand}`
      );
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
  background: #dbc5d5;
  /* padding: 1.5rem; */
  border-radius: 1rem;
}

.grid > ul > div > i {
  color: white;
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
  margin: 20px 0 20px 0;
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