<template>
  <div class="container">
    <h1>Test Back End</h1>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "brandPage",
  data() {
    return {
      data: {},
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
      let url = new URL(`${this.url}/hashtaginsight`);
      url.search = new URLSearchParams({
        uid: this.uid,
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