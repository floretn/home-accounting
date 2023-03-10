import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/msg.plugin'
import Loader from "@/components/app/Loader.vue"
import tooltipDirective from "@/directives/tooltip.directive"
import Paginate from 'vuejs-paginate-next'
import {createMetaManager} from "vue-meta"

import * as firebase from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
require('firebase/database')

firebase.initializeApp({
    apiKey: "AIzaSyDWaqSNsbZWEO6VNW1n6DYNwLSEtB-fkY0",
    authDomain: "vue-test-92026.firebaseapp.com",
    projectId: "vue-test-92026",
    storageBucket: "vue-test-92026.appspot.com",
    messagingSenderId: "1023457627697",
    appId: "1:1023457627697:web:45bef0f6ef59f5795ecf10",
    measurementId: "G-8JGTZDHXCP"
})

let app = false

onAuthStateChanged(getAuth(), async () => {
    if (!app) {
        const vueApp = createApp(App)
            .use(store)
            .use(router)
            .use(messagePlugin)
            .use(createMetaManager())
            .directive('tooltip', tooltipDirective.tooltip)
            .component('Loader', Loader)
            .component('Paginate', Paginate)
        await router.isReady()
        vueApp.mount('#app')
        app = true
    }
})
