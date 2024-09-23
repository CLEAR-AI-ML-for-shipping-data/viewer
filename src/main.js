import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Open layers lib
import "vue3-openlayers/styles.css";

import OpenLayersMap from "vue3-openlayers";

import { Layers } from "vue3-openlayers";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Layers)

const options = {
    debug: true,
};

app.use(OpenLayersMap,options);

app.mount('#app')
