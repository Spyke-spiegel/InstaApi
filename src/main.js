import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app';



let app; 

firebase.auth().onAuthStateChanged(user => {
    if (!app) {
        app = createApp(App)
        // app.config.globalProperties.url = 'http://localhost:5000';
        app.config.globalProperties.url = 'https://instahappy-backend.herokuapp.com';
        
        app.use(router).mount('#app')
    }
})



