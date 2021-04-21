<template>
  <div class="container">
    <h2 class="title">
      Please enter the name of the brand that you like to watch
    </h2>
    <input type="text" v-model="brand" class="input" required />
    <button v-on:click="addBrand" type="submit" style="margin-left: 15px">
      add
    </button>
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
import firebase from "firebase";

export default {
  name: "newBrand",
  data() {
    return {
      brand: null,
      listBrand: [],
      uid: "",
    };
  },

  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
      }
    });

    let url = await new URL(`${this.url}/brandmanager`);
    url.search = await new URLSearchParams({
      uid: this.uid,
    });

    await fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        this.listBrand = response
      });
    // .then(this.queryInstaData());
        await console.log("list brand => ", this.listBrand);
  },

  methods: {
    async addBrand() {
      if (this.listBrand.some((i) => i.brand === this.brand) == false) {
        this.listBrand.push({ brand: this.brand });

        let url = new URL(`${this.url}/brandmanager`);
        url.search = new URLSearchParams({
          uid: this.uid,
          brand: this.brand,
        });

        await fetch(url, {
          method: "POST",
        })
          .then((res) => res.json())
          .then((response) => {
            console.log("response => ", response);
          });
      }
    },

    //to change
    async deleteBrand(id) {
      console.log(id);
      let url = new URL(`${this.url}/brandmanager`);
      url.search = new URLSearchParams({
        uid: this.uid,
        id: id,
      });

      await fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response => ", response);
        });

      let deleteId = this.listBrand.findIndex((x) => x.brand === id);
      this.listBrand.splice(deleteId, 1);
      console.log(this.listBrand);
    },
  },
};
</script>

<style scoped>
.delBtn {
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