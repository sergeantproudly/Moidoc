import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Calendar from './components/Calendar.vue';
import Profile from './components/Profile.vue';

Vue.component('Calendar', Calendar);
Vue.component('Profile', Profile);

new Vue({
  router,
  data: {
    text: 'text'
  },
  render: (h) => h(App),
}).$mount("#app");
