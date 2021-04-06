import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app';
import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

let app; 

firebase.auth().onAuthStateChanged(user => {
    if (!app) {
        app = createApp(App).use(router, Datetime).mount('#app')
    }
})


