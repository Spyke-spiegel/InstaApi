<template>
  <div class="container">
    <h1>HELLO </h1>
    <button v-on-click="test"></button>
  </div>
</template>

<script>
import access_token from "../config/facebooktoken"
export default {
    name: "postView",
    data() {
        return {
            data: {}
        }
    },

    methods: {
        test() {
            console.log(access_token)
        }
    }

}
</script>

<style>

</style>