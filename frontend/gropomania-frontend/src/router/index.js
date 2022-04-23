import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/logIn.vue";
import Myfeed from "@/components/MyFeed.vue";
import SignUp from "@/views/signUp";
import Profile from "@/views/userProfile.vue";
import Journal from "@/views/JourNal.vue";
import Feed from "@/views/Feed.vue";
const routes = [
  {
    path: "/Myfeed",
    name: "MyFeed",
    component: Myfeed,
  },
  {
    path: "/",
    name: "signUp",
    component: SignUp,
  },
  {
    path: "/logIn",
    name: "logIn",
    component: Login,
  },
  {
    path: "/userprofile",
    name: "userProfile",
    component: Profile,
  },
  {
    path: "/Journal",
    name: "Journal",
    component: Journal,
  },
  {
    path: "/Feed",
    name: "Feed",
    component: Feed,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
