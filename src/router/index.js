import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/Pure",
  },
  {
    path: "/Pure",
    name: "Pure",
    component: () => import(/* webpackChunkName: "Pure" */ "../views/Pure.vue"),
    children: [
      {
        path: "choose",
        name: "pureChoose",
        component: () =>
          import(/* webpackChunkName: "choose" */ "../views/Choose.vue"),
      },
      {
        path: "menu",
        name: "pureMenu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
      },
    ],
  },
  {
    path: "/Root",
    name: "Root",
    component: () => import(/* webpackChunkName: "Root" */ "../views/Root.vue"),
    children: [
      {
        path: "choose",
        name: "rootChoose",
        component: () =>
          import(/* webpackChunkName: "choose" */ "../views/Choose.vue"),
      },
      {
        path: "menu",
        name: "rootMenu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
      },
      {
        path: "menuTb",
        name: "rootMenuTb",
        component: () =>
          import(/* webpackChunkName: "MenuTb" */ "../views/MenuTb.vue"),
      },
    ],
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
