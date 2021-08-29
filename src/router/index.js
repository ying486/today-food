import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/Choose",
  },
  {
    path: "/Choose",
    name: "Choose",
    component: () =>
      import(/* webpackChunkName: "choose" */ "../views/Choose.vue"),
  },
  {
    path: "/Menu",
    name: "Menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
  },
  {
    path: "/Material",
    name: "Material",
    component: () =>
      import(/* webpackChunkName: "material" */ "../views/Material.vue"),
  },
  {
    path: "/Condiment",
    name: "Condiment",
    component: () =>
      import(/* webpackChunkName: "condiment" */ "../views/Condiment.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
