<template>
  <div class="container">
    <h1>hashtag page</h1>
  </div>
</template>

<script>
import { db } from "../config/firebaseInit";
import { storage } from "../config/firebaseInit";
import firebase from "firebase";
export default {
    name: "hashtag",
    data() {
        return {
        access_token: "",
        IgId: "",
    }},



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
  },
}
</script>

<style>
</style>