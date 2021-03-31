<template>
  <div class="container">
    <div class="navbar">
      <div class="logo"></div>
      <div class="route">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
         |
        <router-link to="/brandManager">Brand Manager</router-link>|
        <router-link to="/posting">Posting</router-link>

      </div>
      <div class="loginInfo"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

.container {
    height: 10vh;
    width: 100vw;
    background-color: #2c3e50;
}




a {
  font-weight: bold;
  color: #318861;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>