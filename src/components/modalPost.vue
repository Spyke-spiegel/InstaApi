<template>
  <div v-if="revele" class="container">
    <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modal">
      <button class="btnCls" v-on:click="toggleModale">X</button>
      <h2>Je suis un modal</h2>
      <div class="image"><img :src="selectedElement.media_url" alt="" /></div>
      <div class="text">{{ selectedElement.like_count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    selectedElement: {
      type: Object,
      default: () => {},
    },
    revele: {
      type: Boolean,
      default: false,
    },
  },

  // created() {
  //   console.log("test modal props id", this.id); //undefined;
  // },

  methods: {
    doSomething(post) {
      console.log(post);
      //your code here, "post" is the clicked element
    },
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal {
  background: pink;
  position: fixed;
  padding: 50px;
}

.btnCls {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>