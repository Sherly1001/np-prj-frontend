import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import vueAxios from 'vue-axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSortDown, faUserPlus);

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store';
import router from './router';


createApp(App)
  .use(router)
  .use(store)
  .use(vueAxios, axios)
  .component('fa', FontAwesomeIcon)
  .mount('#app');
