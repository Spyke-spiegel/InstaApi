<template>
  <div class="container">
    <h2 class="tittle">What would make you Insta-Happy</h2>
    <div class="choice">
      <router-link class="link" to="/posting/image">
        <i class="far fa-image"></i>
        <div>Post an image</div></router-link
      >
      <router-link class="link" to="/posting/Video"
        ><i class="fas fa-film"></i>
        <div>Post an video</div></router-link
      >
      <router-link class="link" to="/posting/schedule"
        ><i class="far fa-calendar-alt"></i>
        <div>Schedule a Post</div></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "posting",
  data() {
    return {};
  },
};
</script>

<style scoped>
.tittle {
  margin: 40px 0 10px 0;
}

.link {
  margin: 30px;
}

i {
  font-size: 60px;
  padding: 20px;
}

.choice {
    display: flex;
    flex-direction: row;
    justify-content: center;
}


</style>

