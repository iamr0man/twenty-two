import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Manager from "../views/Manager.vue";
import TaskDetails from "../views/TaskDetails.vue";
import Passion from "../views/Passion.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/manager",
    name: "Manager",
    component: Manager
  },
  {
    path: "/manager/:managerId/task/:taskId",
    name: "TaskDetails",
    component: TaskDetails
  },
  {
    path: "/passion",
    name: "Passion",
    component: Passion
  },
  // {
  //   path: "/manager/:managerId/task/:taskId",
  //   name: "TaskDetails",
  //   component: TaskDetails
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
