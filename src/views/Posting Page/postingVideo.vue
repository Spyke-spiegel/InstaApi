<template>
  <div class="container">
    <h1>Video posting</h1>
    <h2>number of posts send : {{ quotaLimit }} of 25</h2>
    <div v-if="barValue == 100">
      <video :src="videoURL" width="320" height="240" id="preview" controls />
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
    <button v-on:click="createIGMedia">upload to IG</button>

    <h2 class="loadingMessage" v-if="message">{{ message }}</h2>

    <div v-if="posted">
      <a :href="postURL" target="_blank" rel="noopener noreferrer"
        >Link to the Instagram Post</a
      >
    </div>
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
      videoURL: "",
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
      postURL: "",
      posted: false,
      uid: "",
      IgId: "",
      tryCount: 0
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
    async upload(e) {
      this.message = await "";
      this.posted = await false;
      this.postURL = await "";
      var vm = this;
      var file = e.target.files[0];
      var storageRef = storage.ref("video/" + file.name);
      var task = storageRef.put(file);

      task.on(
        "state_changed",
        function progress(snapshot) {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          vm.barValue = percent;
        },

        function error(err) {
          alert(err);
        },

        function complete(snapshot) {
          var url = task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            vm.videoURL = downloadURL;
          });
        }
      );
    },

    async createIGMedia() {
      this.message = "loading";

      // API call for creating the IG Media
      let url = await new URL(
        `https://graph.facebook.com/v10.0/${this.IgId}/media`
      );
      url.search = new URLSearchParams({
        media_type: "VIDEO",
        video_url: this.videoURL,
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
        })
        // .catch((err) => {
        //   alert(err);
        // });
      this.message = await "The media have been created and is now posting";
      await this.publishIGMedia();

      //adding the hashtag in the first comment
      await this.postFirstComment();
      
      // Calling the posting quota limit for knowing the new number
      await this.quotaLimitCheck();
    },

    async quotaLimitCheck() {
      this.quotaLimit = "";
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
          this.quotaLimit = response.data[0].quota_usage;
        })
        // .catch((err) => {
        //   alert(err);
        // });
      await console.log("quota limit: ", this.quotaLimit);
    },

    async publishIGMedia(){
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
        .then(this.tryPublish)
        .then((res) => res.json()) /*  */
        .then((response) => {
          console.log("response ", response);
          this.postID = response.id;
        })
        // .catch((err) => {
        //   alert(err);
        // });

      // API Call fopr retrieving the URL of the Post created

      let url3 = await new URL(
        `https://graph.facebook.com/v10.0/${this.postID}`
      );
      url3.search = await new URLSearchParams({
        fields: "permalink",
        access_token: this.access_token,
      });

      await fetch(url3, {
        method: "GET",
      })
        
        .then((res) => res.json()) /*  */
        .then((response) => {
          console.log("response post URL : ", response.permalink);
          this.postURL = response.permalink;
        })
        // .catch((err) => {
        //   alert(err);
        // });
      this.message = await "The media has been posted, go check Instagram";
      this.posted = await true;

    },

    async postFirstComment() {
      if (this.firstComment != "") {
        let url2 = await new URL(
          `https://graph.facebook.com/v10.0/${this.postID}/comments`
        );
        url2.search = await new URLSearchParams({
          message: this.firstComment,
          access_token: this.access_token,
        });

        await fetch(url2, {
          method: "POST",
        })
          .then(this.status)
          .then((res) => res.json()) /*  */
          .then((response) => {
            console.log("response ", response);
            this.postID = response.id;
          });
      } else {
        console.log("No comment to add")
      }
    },

    status(res) {
      if (!res.ok) {
        console.log(res);
        throw new Error(res.statusText);
      }
      return res;
    },

    tryPublish(res) {
      
      if (!res.ok && this.tryCount <= 5) {
        this.tryCount ++
        console.log("count", this.tryCount)
        setTimeout(this.publishIGMedia, 2000)
      } else if (this.tryCount > 5) {
        alert("We were unable to post your video, please try again later")
      } else {this.tryCount = 0}
    }
  },
};
</script>

<style scoped>
#preview {
  width: 50%;
  height: auto;
}
</style>