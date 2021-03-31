<template>
  <div class="container">
    <h2 class="title">
      Please enter the name of the brand that you like to watch
    </h2>
    <input type="text" v-model="brand" class="input" required />
    <button v-on:click="addBrand" type="submit" style="margin-left: 15px">add</button>
    <div>
      <div class="text2">List of already watched brand</div>
      <ul class="list" v-for="brand in listBrand">
        <div class="delBtn">
          <h2>{{ brand.brand }}</h2>
          <button v-on:click="deleteBrand(brand.brand)">X</button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from "../config/firebaseInit";
import firebase from 'firebase';

export default {
  name: "newBrand",
  data() {
    return {
      brand: null,
      listBrand: [],
      uid: ""
    };
  },

  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
      }
    });

    await db
      .collection("Users")
      .doc(this.uid)
      .collection("brand")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.listBrand.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      });
    // .then(this.queryInstaData());

  },

  methods: {
    addBrand() {
      if (this.listBrand.some((i) => i.brand === this.brand) == false) {
        this.listBrand.push({ brand: this.brand });
        db.collection("Users")
          .doc(this.uid)
          .collection("brand")
          .doc(this.brand)
          .set({
            brand: this.brand,
          })
          .catch((err) => console.log(err));
      }
    },
    deleteBrand(id) {
      console.log(id);
      db.collection("Users")
        .doc(this.uid)
        .collection('brand')
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      let deleteId = this.listBrand.findIndex((x) => x.brand === id);
      this.listBrand.splice(deleteId, 1);
      console.log(this.listBrand);
    },
  },
};
</script>

<style scoped>
.delBtn{
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: center;
  align-items: center;
}

.delBtn > button {
  margin: 10px;
}

.title {
  margin: 20px;
}

.text2 {
  padding: 20px 0 10px 0;
}

</style>