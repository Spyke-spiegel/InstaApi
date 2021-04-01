<template>
  <div class="container">
    <h1>Posting Page</h1>
    <h2>number of posts send : {{ quotaLimit }} of 25</h2>
    <div v-if="barValue == 100">
      <img :src="picURL" id="preview" />
    </div>
    <div v-else>
      <progress :value="barValue" max="100" :ref="uploader">0%</progress>
    </div>
    <input type="file" v-on:change="upload" id="fileButton" />
    <input
      type="text"
      v-model="hashtags"
      placeholder="add your hashtags"
      id="postText"
    />
    <input
      type="text"
      v-model="caption"
      placeholder="add your caption"
      id="postText"
    />
    <div>{{ hashtags }}</div>
    <button v-on:click="publishIGMedia">Publish to IG</button>
    <div v-if="mediaCreated == true && mediaPosted == false">
      <h2>The media have been created and is now posting</h2>
    </div>
    <div v-else-if="mediaPosted == true && mediaCreated == false">
      <h2>The media has been posted, go check Instagram</h2>
    </div>
    <div
      v-else-if="
        loading == true && mediaCreated == false && mediaPosted == false
      "
    >
      <h2>Loading ...</h2>
      <div v-if="posted == true">
        <a :href="postURL" target="_blank" rel="noopener noreferrer">Link to the Instagram Post</a>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from "../config/firebaseInit";
import { db } from "../config/firebaseInit";
import firebase from 'firebase'
export default {
  name: "posting",
  data() {
    return {
      barValue: 0,
      uploader: "",
      picURL: "",
      access_token: "",
      idMedia: "",
      hashtags: "",
      caption: "",
      quotaLimit: "",
      mediaCreated: false,
      mediaPosted: false,
      errorIgMsg: "",
      loading: false,
      postID: "",
      postURL:"",
      posted: false,
      uid:"",
      IgId:"",
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
        this.IgId = doc.data().IgId
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
    async upload(e) {
      var vm = this;
      var file = e.target.files[0];
      var storageRef = storage.ref("picture/" + file.name);
      var task = storageRef.put(file);

      task.on(
        "state_changed",
        function progress(snapshot) {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent);
          vm.barValue = percent;
        },

        function error(err) {
          console.log("an errror ocurred: ", err);
        },

        function complete(snapshot) {
          var url = task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            vm.picURL = downloadURL;
          });
        }
      );
    },

    async publishIGMedia() {
      (this.mediaCreated = await false),
        (this.mediaPosted = await false),
        (this.loading = await true);

        // API call for creating the IG Media
      let url = await new URL(
        `https://graph.facebook.com/v10.0/${this.IgId}/media`
      );
      url.search = new URLSearchParams({
        image_url: this.picURL,
        caption: this.hashtags,
        access_token: this.access_token,
      });

      await fetch(url, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response ", response);
          this.idMedia = response.id;
        });
      (this.mediaCreated = await true), (this.loading = await false);


      // API Call for publishing the IG Media previously created

      let url2 = await new URL(
        `https://graph.facebook.com/v10.0/${this.IgId}/media_publish`
      );
      url2.search = await new URLSearchParams({
        creation_id: this.idMedia,
        access_token: this.access_token,
      });

      await fetch(url2, {
        method: "POST",
      })
        .then((res) => res.json()) /*  */
        .then((response) => {
          console.log("response ", response);
          this.postID = response.id
        });

        // API Call fopr retrieving the URL of the Post created

        let url3 = await new URL(
        `https://graph.facebook.com/v10.0/${this.postID}`
      );
      url3.search = await new URLSearchParams({
        fields:"permalink",
        access_token: this.access_token,
      });

      await fetch(url3, {
        method: "GET",
      })
        .then((res) => res.json()) /*  */
        .then((response) => {
          console.log("response post URL : ", response.permalink);
          this.postURL = response.permalink
          
        });
      (this.mediaPosted = await true), (this.mediaCreated = await false), (this.posted = true);


      // Calling the posting quota limit for knowing the new number
      await this.quotaLimitCheck()
    },

    async quotaLimitCheck() {
      this.quotaLimit = ""
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
  },
};
</script>

<style scoped>
#preview {
  width: 50%;
  height: auto;
}
</style>