<template>
  <div class="container">
    <h1 class="title">Image Posting</h1>
    <h2>number of posts send : {{ quotaLimit }} of 25</h2>
    <div v-if="barValue == 100">
      <img :src="picURL" id="preview" />
    </div>
    <div v-else>
      <progress class="loadingBar" :value="barValue" max="100" :ref="uploader">
        0%
      </progress>
    </div>
    <input type="file" name="image" v-on:change="publishIGMedia" id="fileButton" />
    />
    <button v-on:click="test">test</button>
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
    // async upload(e) {
    //   this.message = await "";
    //   this.posted = await false;
    //   this.postURL = await "";
    //   var vm = this;
    //   var file = e.target.files[0];
    //   var storageRef = storage.ref("picture/" + file.name);
    //   var task = storageRef.put(file);

    //   task.on(
    //     "state_changed",
    //     function progress(snapshot) {
    //       var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log(percent);
    //       vm.barValue = percent;
    //     },

    //     function error(err) {
    //       alert(err);
    //     },

    //     function complete(snapshot) {
    //       var url = task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //         console.log("File available at", downloadURL);
    //         vm.picURL = downloadURL;
    //       });
    //     }
    //   );
    // },

    async test(){
      let url = new URL(`https://instahappy-backend.herokuapp.com/test`);
      url.search = new URLSearchParams({
        uid: this.uid,
      });

      await fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response)
        });

    },


    async publishIGMedia(e) {

      // API call for creating the IG Media
      let url = await new URL(`https://instahappy-backend.herokuapp.com/test`);
      url.search = new URLSearchParams({
        uid: this.uid,
      });

      const data = new FormData();
      data.append('image', e.target.files[0])

      await fetch(url, {
        method: "POST",
        body: data
      })












      // .catch((err) => {
      //   alert(err);
      // });
      // this.message = await "The media have been created and is now posting";

      // API Call for publishing the IG Media previously created

      // let url2 = await new URL(
      //   `https://graph.facebook.com/v10.0/${this.IgId}/media_publish`
      // );
      // url2.search = await new URLSearchParams({
      //   creation_id: this.idMedia,
      //   access_token: this.access_token,
      // });

      // await fetch(url2, {
      //   method: "POST",
      // })
      //   .then(this.status)
      //   .then((res) => res.json()) /*  */
      //   .then((response) => {
      //     console.log("response ", response);
      //     this.postID = response.id;
      //   });
      // .catch((err) => {
      //   alert(err);
      // });

      // API Call fopr retrieving the URL of the Post created

      // let url3 = await new URL(
      //   `https://graph.facebook.com/v10.0/${this.postID}`
      // );
      // url3.search = await new URLSearchParams({
      //   fields: "permalink",
      //   access_token: this.access_token,
      // });

      // await fetch(url3, {
      //   method: "GET",
      // })
      //   .then(this.status)
      //   .then((res) => res.json()) /*  */
      //   .then((response) => {
      //     console.log("response post URL : ", response.permalink);
      //     this.postURL = response.permalink;
      //   });
      // .catch((err) => {
      //   alert(err);
      // });
      // this.message = await "The media has been posted, go check Instagram";
      // this.posted = await true;

      //Method for adding hashtag fvor the first comment
      // await this.postFirstComment();

      // Calling the posting quota limit for knowing the new number
      // await this.quotaLimitCheck();
    },

    // async postFirstComment() {
    //   if (this.firstComment != "") {
    //     let url2 = await new URL(
    //       `https://graph.facebook.com/v10.0/${this.postID}/comments`
    //     );
    //     url2.search = await new URLSearchParams({
    //       message: this.firstComment,
    //       access_token: this.access_token,
    //     });

    //     await fetch(url2, {
    //       method: "POST",
    //     })
    //       .then((res) => res.json()) /*  */
    //       .then((response) => {
    //         console.log("response ", response);
    //       });
    //   } else {
    //     console.log("No comment to add")
    //   }
    // },

    // async quotaLimitCheck() {
    //   this.quotaLimit = "";
    //   let url = await new URL(
    //     `https://graph.facebook.com/v10.0/${this.IgId}/content_publishing_limit`
    //   );
    //   url.search = new URLSearchParams({
    //     access_token: this.access_token,
    //   });
    //   await fetch(url, {
    //     method: "GET",
    //   })
    //     .then((res) => res.json())
    //     .then((response) => {
    //       this.quotaLimit = response.data[0].quota_usage;
    //     });
    //   // .catch((err) => {
    //   //   alert(err);
    //   // });
    //   await console.log("quota limit: ", this.quotaLimit);
    // },

    status(res) {
      if (!res.ok) {
        console.log(res);
        throw new Error(res.statusText);
      }
      return res;
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