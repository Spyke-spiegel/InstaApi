<template>
  <div v-if="revele" class="container">
    <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modal">
      <button class="btnCls" v-on:click="toggleModale">X</button>
      <h2>Post detail</h2>
      <div class="card">
        <div class="image"><img :src="selectedElement.media_url" alt="" /></div>
        <div class="info">
          <div class="like">Like : {{ selectedElement.like_count }}</div>
          <div class="comment">
            comment : {{ selectedElement.comments_count }}
          </div>
          <div class="comments">{{selectedElement.comment}}</div>
          <div class="insight">
            <div class="reach">Reach : {{ selectedElement.reach }}</div>
            <div class="impressions">
              Impressions : {{ selectedElement.impressions }}
            </div>
            <div class="saved">Saved : {{ selectedElement.saved }}</div>
          </div>
        </div>
      </div>
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
  data: function () {
    return {
      comments: [],
    };
  },

  created() {
    console.log("test modal props id", this.id); //undefined;
  },

  methods: {
    modalTransmit(post) {
      console.log(post);
     
    },

    querycomment() {
      console.log("hello world")
      //  let url = new URL(`https://graph.facebook.com/v10.0/${this.selectedElement.id}/comments`);
      // url.search = new URLSearchParams({
      //   access_token: this.selectedElement.access_token,
      // });

      // fetch(url, {
      //   method: "GET",
      // })
      //   .then((res) => res.json())
      //   .then((response) => {
      //     console.log("reponse du comment modal query : ", response);
      //     response.data.forEach((comment) => {
      //       this.comments.push(comment);
      //       console.log(comment)
      //     });
      //   });
    }
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
  background: rgba(0, 0, 0, 0.05);
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

.image > img {
  height: 30vh;
}
</style>