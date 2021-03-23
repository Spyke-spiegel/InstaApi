<template>
  <div class="container">
    <div class="brand_infos">
      {{ posts.name }}
    </div>

    <div class="grid">
      <ul v-for="doc in posts.media.data">
        <div class="card">
          <!-- <router-link
            class="bigdoc"
            v-bind:to="{
              name: 'doc',
              params: { id: doc.id, brand: doc.brandId },
            }"
          > -->
            <div class="imgCard">
              <img :src="doc.media_url" class="image" />
              <div class="likeComment">
                <!-- <i class="far fa-heart">
                  <div class="txt">{{ doc.like_count }}</div>
                </i> -->
                <!-- <i class="far fa-comment"
                  ><div class="txt">{{ doc.comments_count }}</div></i
                > -->
              </div>
              <!-- <div class="secondcolumn">
                <span>{{ moment(doc.timestamp).format("MMM Do YY") }}</span>
              </div> -->
            </div>
          <!-- </router-link> -->
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import db from "../config/firebaseInit";

export default {
  name: "brandPage",
  data() {
    return {
      posts: {},
      access_token: "",
    };
  },

  created() {
    db.collection("brand")
      .doc("belkin")
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          var data1 = doc.data().brand;
          this.queryInstaData(data1);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },

  methods: {
    async queryInstaData(doc) {
      //   await console.log("Data 1 :", doc);
      var posts = "";
      await db
        .collection("Users")
        .doc("105818491592653")
        .get()
        .then((doc) => {
          this.access_token = doc.data().access_token;
        });
      //   await console.log("test access token : ", this.access_token);
      let url = new URL("https://graph.facebook.com/v10.0/17841446016764337/");
      url.search = new URLSearchParams({
        fields: `business_discovery.username(${doc}){ig_id,name,followers_count,media_count,profile_picture_url,media{media_url,comments_count,like_count,timestamp}}`,
        access_token: this.access_token,
      });

      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          // console.log("response ", response.business_discovery);
          this.posts = response.business_discovery;
          //   this.Igdata.followers_count = response.business_discovery.followers_count,
          //   this.Igdata.id = response.business_discovery.id
          //   this.Igdata.ig_id = response.business_discovery.ig_id
          //   this.Igdata.media = response.business_discovery.media
          //   this.Igdata.media_count = response.business_discovery.media_count
          //   this.Igdata.name = response.business_discovery.name
          //   this.Igdata.profile_picture_url = response.business_discovery.profile_picture_url
        });
      // console.log("Test before DB : " + response.authResponse.accessToken);
      // router.push("/home");
      await console.log("verif push Igdata = ", this.posts.media.data[0].like_count);
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
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20vh;
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
</style>