<template>
  <div class="container">
    <h1>Schedule Posting</h1>
    <div class="postingBlock">
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
      <input type="date" v-model="postDate" />
      <input type="time" v-model="postTime" />
      <div>{{ timetest }}</div>
      <div>{{ hashtags }}</div>
      <button v-on:click="CreateSchedule">Create a schedule</button>
    </div>
    <div class="listSchedule">
      <ul class="list" v-for="doc in listSchedule">
        <div class="date">{{ new Date(doc.postdate.seconds) }}</div>
        <div class="hashtag">{{ doc.hashtags }}</div>
        <img class="imgSchedule" :src="doc.picURL" />
        <button v-on:click="deleteSchedule(doc.id)">X</button>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from "../../config/firebaseInit";
import { storage } from "@/config/firebaseInit";
import firebase from "firebase";
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
      postTime: "",
      hashtags: "",
      uploader: "",
      timetest: "",
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
      .collection("schedulePost")
      .where("user", "==", this.uid)
      .get();
    if (sheduleList.empty) {
      console.log("No matching documents.");
      return;
    }

    sheduleList.forEach((doc) => {
      console.log(doc.data());
      var tempData = doc.data();
      tempData.id = doc.id;
      this.listSchedule.push(tempData);
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
      this.timetest = this.postDate.concat(" ", this.postTime);
      var dateMs = Date.parse(this.timetest);
      var date = new Date(dateMs);
      let saveDb = await db.collection("schedulePost").add({
        user: this.uid,
        picURL: this.picURL,
        message: this.message,
        postdate: date,
        hashtags: this.hashtags,
      });
    },

    async deleteSchedule(id) {
      console.log(id);
      db.collection("schedulePost")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      let deleteId = this.listSchedule.findIndex((x) => x.id === id);
      this.listSchedule.splice(deleteId, 1);
      console.log(this.listSchedule);
    },

    async updateSchedule() {},
  },
};
</script>

<style scoped>
#preview {
  width: 50%;
  height: auto;
}

.imgSchedule {
  height: 10vh;
  width: auto;
}

.list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-template-rows: 1fr;
}
</style>