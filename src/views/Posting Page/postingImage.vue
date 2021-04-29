<template>
  <div class="container">
    <h1 class="title">Image Posting</h1>
    <h2>number of posts send : {{ quotaLimit }} of 25</h2>

    <input type="file" v-on:change="getImage" id="fileButton" />
    <input
      type="text"
      v-model="postMessage"
      placeholder="add your the content of your post"
      id="postText"
    />
    <input
      type="text"
      v-model="firstComment"
      placeholder="add the hashtag that you wisxh to add as the first comment"
      id="postText"
    />
    <div>{{ firstComment }}</div>
    <button v-on:click="publishIGMedia">Publish to IG</button>
    <h2 class="loadingMessage" v-if="message">{{ message }}</h2>

    <div v-if="posted">
      <a :href="postURL" target="_blank" rel="noopener noreferrer"
        >Link to the Instagram Post</a
      >
    </div>

    <button v-on:click="postFirstComment">test comment</button>
  </div>
</template>

<script>
import { storage } from "@/config/firebaseInit";
import { db } from "@/config/firebaseInit";
import firebase from "firebase";
export default {
  name: "posting",
  data() {
    return {
      message: "",
      barValue: 0,
      uploader: "",
      picURL: "",
      access_token: "",
      idMedia: "",
      postMessage: "",
      caption: "",
      quotaLimit: "",
      mediaCreated: false,
      mediaPosted: false,
      errorIgMsg: "",
      loading: false,
      postID: "",
      postURL: "",
      posted: false,
      uid: "",
      IgId: "",
      firstComment: "",
      file: "",
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
      `https://graph.facebook.com/v10.0/${this.IgId}/content_publishing_limit`
    );
    url.search = new URLSearchParams({
      access_token: this.access_token,
    });
    await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response ", response);
        this.quotaLimit = response.data[0].quota_usage;
      });
    await console.log("quota limit: ", this.quotaLimit);
  },

  methods: {
    getImage(e) {
      this.file = e.target.files[0];
    },

    async publishIGMedia(e) {
      console.log(this.file);
      let url = await new URL(
        `https://instahappy-backend.herokuapp.com/imageposting`
      );
      url.search = new URLSearchParams({
        uid: this.uid,
        caption: this.postMessage,
      });

      const data = new FormData();
      data.append("image", this.file);

      await fetch(url, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json()) /*  */
        .then((response) => {
          console.log("response ", response);
          this.quotaLimit = response.quotaLimit;
          this.postURL = response.postURL;
        });
    },
  },
};
</script>

<style scoped>
#preview {
  width: 50%;
  height: auto;
}

.loadingBar {
  margin: 150px;
}

.title {
}
</style>