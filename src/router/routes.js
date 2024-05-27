const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageIndex.vue") },
      { path: "new", component: () => import("pages/New.vue") },
      { path: "note/:id", component: () => import("pages/PageNote.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/PageError404.vue"),
  },
];

export default routes;
