<template>
  <div class="container">
      <h2 class="title">Please enter the name of the brand that you like to add</h2>
      <input type="text" v-model="brand" class="input" required>
      <button v-on:click="saveBrand" type="submit">Submit</button>
  </div>
</template>

<script>
import db from '../config/firebaseInit'
export default {
    name: "newBrand",
    data () {
        return {
            brand: null
        }
    },
    methods: {
        saveBrand () {
            db.collection("brand").doc(this.brand).set({
                brand: this.brand
            })
            .then(docRef => this.$router.push('/'))
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
</style>