import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import VuetifyToast from 'vuetify-toast-snackbar'
 
Vue.use(VuetifyToast, {
    x: 'right',
    y: 'bottom',
    color: 'info',
    icon: 'info',
    iconColor: '',
    classes: [
        'body-2'
    ],
    timeout: 3000,
    dismissable: true,
    multiLine: false,
    vertical: false,
    queueable: false,
    showClose: false,
    closeText: '',
    closeIcon: 'close',
    closeColor: '',
    slot: [], //default
    shorts: {
        custom: {
            color: 'purple'
        }
    },
    property: '$toast'
})
import App from './App.vue'
import axios from './plugins/axios'
import vuetify from './plugins/vuetify'
import router from './router';
import store from './store';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
