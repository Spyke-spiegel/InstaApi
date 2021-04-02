<template>
  <div class="container">
      <h1>Detail Insight</h1>
      <h2>{{id}}</h2>
  </div>
</template>

<script>
export default {
    name:"detailInsight",
    data() {
        return {
            id: "",
        }
    },

    created() {
        this.id = this.$route.params.id
    }
}
</script>

<style>

</style>