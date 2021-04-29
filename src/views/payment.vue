<template>
  <div class="container">
      <h1>Payment Page</h1>
      <button v-on:click="startCheckout">Subscribe</button>
  </div>
</template>

<script>
let stripe = Stripe('pk_test_51Ifh75C2soJIwEUbvUaT2bpziuHDp9vDOHPA47IFiw4shsNXthKFnoSTem9DD3eg2gCiDVb3F3pO3iaBQpyhywPD00CoLwfMCl')
export default {
  data() {
    return {
        amount: "20",
        name: "Premium Plan",
        SKU: "test1"
    };
  },

  methods: {
     async startCheckout() {

          const error = await stripe.redirectToCheckout({
              items: [{plan: "price_1IlE8JC2soJIwEUbH6n8o7i5" ,quantity: 1}],

              successUrl: 'https://insthapy.netlify.app/#/',
                cancelUrl: 'https://insthapy.netlify.app/#/login'
          })
          if (error) {
              console.log("Problem with Stripe")
          }
          
      }
  },
};
</script>

<style scoped>
</style>