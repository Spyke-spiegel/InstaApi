<template>
  <div v-if="revele" class="container">
    <div class="overlay" @click="$emit('close')"></div>
    <div class="modal">
      <button class="btnCls" @click="$emit('close')">X</button>
      <div class="card">
        <div class="image">
          <img id="pics" :src="selectedElement.media_url" alt="" />
        </div>
        <div class="info">
          <div id="firstRow">
            <img src="../assets/placebo.jpg" alt="" id="placeboImg" />
            <div>Placebo IG Account</div>
          </div>
          <div id="secondRow">
            <div id="infoFirstrow">
              <div class="like center">
                Like : {{ selectedElement.like_count }}
              </div>
              <div class="comment center Bleft">
                comment : {{ selectedElement.comments_count }}
              </div>
            </div>
            <div id="infoSecondrow">
              <div class="reach center">
                Reach : {{ selectedElement.reach }}
              </div>
              <div class="impressions center Bleft">
                Impressions : {{ selectedElement.impressions }}
              </div>
              <div class="saved center Bleft">
                Saved : {{ selectedElement.saved }}
              </div>
            </div>
            <div class="comments">{{ selectedElement.comment }}</div>
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

  methods: {
    modalTransmit(post) {
      console.log(post);
    },

    querycomment() {
      console.log("hello world");
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
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.card {
  height: 100%;
  width: 100%;
}

.modal {
  background: rgb(255, 237, 240);
  position: fixed;
  border-radius: 15px;
  height: 50vh;
  width: 70vw;
}

.btnCls {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
}

.image {
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#pics {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.card {
  display: flex;
  flex-direction: row;
}

.info {
  width: 40%;
  height: 100%;
}

#firstRow {
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#placeboImg {
  padding: 10px;
  border-radius: 50px;
  width: 50px;
  height: 50px;
}

#infoFirstrow {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
}

#infoFirstrow > * {
  border-top: solid;
  border-bottom: solid;
  width: 100%;
  height: 100%;
}

.Bleft {
  border-left: solid;
}

#infoSecondrow {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  padding-top: 1%;
}

#infoSecondrow > * {
  border-bottom: solid;
  width: 100%;
  height: 100%;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>