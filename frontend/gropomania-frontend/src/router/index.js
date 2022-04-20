import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/logIn.vue";
import Feed from "@/components/MyFeed.vue";
import SignUp from "@/views/signUp";
import Profile from "@/views/userProfile.vue";
import Journal from "@/views/JourNal.vue";
const routes = [
  {
    path: "/feed",
    name: "MyFeed",
    component: Feed,
  },
  {
    path: "/signup",
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
