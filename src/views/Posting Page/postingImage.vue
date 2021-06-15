<template>
  <div class="container">
    <h1 class="title">Image Posting</h1>
    <h2>number of post left for the next 24h: {{ quotaLimit }} of 25</h2>

    <div id="previewInsta">
      <div id="leftClm" @mouseover="hover = true" @mouseleave="hover = false">
        <input
          v-show="!previewfile"
          type="file"
          v-on:change="getImage"
          id="fileButton"
          accept=".jpg, .jpeg"
          ref="fileInput"
        />
        <div id="hoverText" v-if="hover && previewfile" @click="test">
          <div>Click for changing the picture</div>
        </div>
        <img
          id="previewImage"
          v-if="previewfile"
          :src="previewfile"
          @click="trigger"
        />
      </div>
      <div id="rightClm">
        <div class="inline" id="caption">
          <img src="../../assets/placebo.jpg" id="profilePics" alt="" />
          <textarea
            type="text"
            v-model="postMessage"
            placeholder="Write a Caption"
            id="postText"
          />
        </div>
        <div class="inline" id="comment">
          <img src="../../assets/placebo.jpg" id="profilePics" alt="" />
          <textarea
            type="text"
            v-model="firstComment"
            placeholder="add Hashtags in comment"
            id="postText"
          />
        </div>
      </div>
    </div>

    <button :disabled="isDisabled" v-on:click="publishIGMedia" id="btn">
      Publish to IG
    </button>
    <h2 class="loadingMessage" v-if="message">Publishing ...</h2>

    <div v-if="posted">
      <a :href="postURL" target="_blank" rel="noopener noreferrer" id="linkURL"
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
      isDisabled: false,
      hover: false,
      message: false,
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
      loading: true,
      postID: "",
      postURL: "",
      posted: false,
      uid: "",
      IgId: "",
      firstComment: "",
      file: "",
      previewfile: null,
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
      this.previewfile = URL.createObjectURL(this.file);
    },

    test() {
      console.log(this.$refs.fileInput.click());
    },

    trigger() {
      document.getElementById("fileButton").click();
      console.log("click");
    },

    async publishIGMedia(e) {
      console.log(this.file);
      this.posted = await false;
      this.isDisabled = await true;
      this.message = await true;
      let url = await new URL(
        `https://instahappy-backend.herokuapp.com/imageposting`
      );
      url.search = new URLSearchParams({
        uid: this.uid,
        caption: this.postMessage,
        hashtag: this.firstComment,
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
      this.posted = await true;
      this.message = await false;
      this.isDisabled = await false;
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

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  padding: 30px;
}

.loadingMessage {
  margin: 30px;
  color: black;
}

#previewInsta {
  border: 1px solid rgba(133, 133, 133, 0.6);
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin: 30px;
  width: 935px;
  height: 452px;
}

#leftClm {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 65%;
  justify-content: center;
  align-items: center;
  position: relative;
}

#rightClm {
  border-left: 1px solid rgba(133, 133, 133, 0.6);

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 35%;
}

.inline {
  display: flex;
  flex-direction: row;
  padding: 20px;
}

#profilePics {
  border-radius: 50%;
  height: 50px;
  width: 50px;
}

.userInfos {
  display: flex;
  flex-direction: row;
}

#previewImage {
  width: 100%;
  height: 100%;
  z-index: -99;
}

#postText {
  border: none;
  border-bottom: 2px solid rgba(113, 113, 113, 0.557);
  margin-left: 15px;
  height: 100%;
}

#caption {
  height: 30%;
}

#comment {
  height: 50%;
}

#btn {
  height: 40px;
  width: 230px;
  font-family: "Montserrat";
  font-size: 25px;
  border-radius: 10px;
  background-color: #c7d5f2;
}

textarea {
  resize: none;
  height: 100%;
}

#hoverText {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 99;
  background-color: rgba(65, 65, 65, 0.351);
  top: 0;
  color: white;
  font-size: 25px;
}

#linkURL {
  margin: 30px;
  font-family: "Montserrat";
  font-size: 35px;
  font-weight: bold;
  text-decoration: underline;
}
</style>