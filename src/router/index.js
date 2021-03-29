import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Calendar from "../pages/Calendar.vue";
import Profile from "../pages/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/Profile",
    name: "profile",
    component: Profile
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
