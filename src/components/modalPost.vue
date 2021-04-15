<template>
  <div class="container">
    <div class="overlay"></div>
    <div class="modal">
      <h2>Je suis un modal</h2>
      <button class="btnCls">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
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
  background: palevioletred;
  position: fixed;
  padding: 50px;
}

.btnCls {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>