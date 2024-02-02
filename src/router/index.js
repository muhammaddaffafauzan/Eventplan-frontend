import { createWebHistory, createRouter } from "vue-router";
import AdminLayouts from "../layouts/AdminLayouts.vue";
import DashboardAdmin from "../views/admin/DashboardAdmin.vue";
import EventAdmin from "../views/admin/EventAdmin.vue";
import MainLayout from "../layouts/MainLayout.vue";
// import store from "../store";

const routes = [
  //   {
  //     path: "/",
  //     name: "Login",
  //     component: Login,
  //     meta: {
  //       title: "login",
  //     },
  //     beforeEnter: (to, from, next) => {
  //       const isAuthenticated = store.getters["auth/isAuthenticated"];
  //       if (isAuthenticated) {
  //         // Jika pengguna sudah login, arahkan ke halaman yang sesuai dengan rolenya
  //         const role = localStorage.getItem("role");
  //         if (role === "admin") {
  //           next("/admin/home");
  //         } else if (role === "user") {
  //           next("/karyawan/home");
  //         } else {
  //           next("/");
  //         }
  //       } else {
  //         // Menampilkan halaman loading selama 1 detik sebelum masuk ke komponen
  //         setTimeout(() => {
  //           next();
  //         }, 1000);
  //       }
  //     },
  //   },

  {
    path: "/",
    component: MainLayout,
    name: "MainLayout",
    meta: {
      title: "home",
      //   requiresLogin: true,
      //   requiresAdmin: true,
    },
  },

  {
    path: "/admin",
    component: AdminLayouts,
    name: "AdminLayouts",
    meta: {
      title: "Admin Dashboard",
      //   requiresLogin: true,
      //   requiresAdmin: true,
    },
    children: [
      {
        path: "/admin/dashboard",
        component: DashboardAdmin,
        name: "DashboardAdmin",
        meta: {
          title: "Admin Dashboard",
        },
      },
      {
        path: "/admin/event",
        component: EventAdmin,
        name: "EventAdmin",
        meta: {
          title: "Admin Event",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = store.getters["auth/isAuthenticated"];

//   if (!isAuthenticated) {
//     await store.dispatch("auth/checkTokenExpiration");
//   }

//   const role = localStorage.getItem("role");

//   if (to.meta.requiresLogin && !isAuthenticated) {
//     // Redirect to login if the route requires login and the user is not authenticated
//     next("/");
//   } else if (to.meta.requiresAdmin && role !== "admin") {
//     // Redirect to home if the route requires admin but the user is not an admin
//     next("/");
//   } else if (to.meta.requiresUser && role !== "user") {
//     // Redirect to home if the route requires user but the user is not a user
//     next("/");
//   } else {
//     // Continue with navigation
//     next();
//   }
// });

export default router;
