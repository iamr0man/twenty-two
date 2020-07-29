import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Manager from "../views/Manager.vue";
import NewTask from "../views/NewTask.vue";
import TaskDetails from "../views/TaskDetails.vue";
import Passion from "../views/Passion.vue";
import PassionDetails from "../views/PassionDetails.vue";
import PassionEdit from "../views/PassionEdit.vue";

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
    path: "/manager/:managerId/newTask",
    name: "NewTask",
    component: NewTask
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
  {
    path: "/passion/:profileId/note/:noteId",
    name: "PassionDetails",
    component: PassionDetails
  },
  {
    path: "/passion/:profileId/note/:noteId/edit",
    name: "PassionEdit",
    component: PassionEdit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
