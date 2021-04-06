<template>
  <div class="container">
    <h1>Schedule Posting</h1>
    <div class="container">
      <h1>Posting Page</h1>
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

      <datetime type="datetime" v-model="postDate" use24-hour class="theme-orange"></datetime>
      <div>{{ hashtags }}</div>
      <button v-on:click="CreateSchedule">Create a schedule</button>
    </div>
  </div>
</template>

<script>
import { db } from "../../config/firebaseInit";
import { storage } from "@/config/firebaseInit";
import firebase from "firebase";
import {Datetime}  from 'vue-datetime';
export default {
  name: "schedulePost",
  data() {
    return {
      uid: "",
      IgId: "",
      access_token: "",
      listSchedule: [],
      picURL: "",
      postURL: "",
      posted: "",
      message: "",
      barValue: 0,
      postDate: "",
      hashtags: "",
      uploader: "",
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

    let sheduleList = await db
      .collection("Users")
      .doc(this.uid)
      .collection("schedule")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.listSchedule.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      });
  },

  methods: {
    async upload(e) {
      var vm = this;
      var file = e.target.files[0];
      var storageRef = storage.ref("schedulePost/picture/" + file.name);
      var task = storageRef.put(file);

      task.on(
        "state_changed",
        function progress(snapshot) {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent);
          vm.barValue = percent;
        },

        function error(err) {
          alert(err);
        },

        function complete(snapshot) {
          var url = task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            vm.picURL = downloadURL;
          });
        }
      );
    },

    async CreateSchedule() {
      // this.message = await "";
      // this.posted = await false;
      // this.postURL = await "";

      let saveDb = await db
        .collection("Users")
        .doc(this.uid)
        .collection("schedule")
        .add({
          picURL: this.picURL,
          message: this.message,
          postdate: this.postDate,
          hashtags: this.hashtags,
        });
    },

    async deleteSchedule() {},

    async updateSchedule() {},
  },
};
</script>

<style scoped>
#preview {
  width: 50%;
  height: auto;
}

.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #FF9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
}
</style>