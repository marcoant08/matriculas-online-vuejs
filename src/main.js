import * as Vue from "vue";
import Home from "./pages/Home.vue";
import Students from "./pages/Students.vue";
import ManageStudents from "./pages/ManageStudents.vue";
import Enrollments from "./pages/Enrollments.vue";
import "./index.css";

const { createApp, h } = Vue;

const NotFoundComponent = { template: "<p>Page not found</p>" };

const routes = {
  "/": Home,
  "/add-student": Students,
  "/manage-students": ManageStudents,
  "/enrollments": Enrollments,
};

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname,
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFoundComponent;
    },
  },

  render() {
    return h(this.CurrentComponent);
  },
};

createApp(SimpleRouter).mount("#app");
