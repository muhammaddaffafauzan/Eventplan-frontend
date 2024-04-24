import { createWebHistory, createRouter } from "vue-router";
import LoginAdmin from "../views/auth/LoginAdmin.vue";
import LoginUser from "../views/auth/LoginUser.vue";
import RegisterGuest from "../views/auth/RegisterGuest.vue";
import VerificationEmail from "../views/auth/VerificationEmail.vue";
import DetailEventAdmin from "../views/admin/DetailEventAdmin.vue";
import AdminLayouts from "../layouts/AdminLayouts.vue";
import DashboardAdmin from "../views/admin/DashboardAdmin.vue";
import EventAdmin from "../views/admin/EventAdmin.vue";
import AddEventAdmin from "../views/admin/AddEventAdmin.vue";
import SettingsLayout from "../layouts/SettingsLayout.vue";
import PersonalInfo from "../views/settings/layer/PersonalInfo.vue";
import Security from "../views/settings/layer/Security.vue";
import NotificationSetting from "../views/settings/layer/NotificationSetting.vue";
import LanguageSetting from "../views/settings/layer/LanguageSetting.vue";
import PrivacySetting from "../views/settings/layer/PrivacySetting.vue";
import MainLayout from "../layouts/MainLayout.vue";
import HomeMain from "../views/main/HomeMain.vue";
import UserLayouts from "../layouts/UserLayouts.vue";
import DashboardUser from "../views/user/DashboardUser.vue";
import MyEvent from "../views/user/MyEvent.vue";
import CreateEvent from "../views/user/CreateEvent.vue";
import EventDetailUser from "../views/user/EventDetailUser.vue";
import EditEventUser from "../views/user/EditEventUser.vue";
import EditEventAdmin from "../views/admin/EditEventAdmin.vue";
import EventMoreMain from "../views/main/EventMoreMain.vue";
import EventDetailMain from "../views/main/EventDetailMain.vue";
import EventFavorite from "../views/main/EventFavorite.vue";
import UserListAdmin from "../views/admin/UserListAdmin.vue";
import DetailUserAdmin from "../views/admin/DetailUserAdmin.vue";
import AboutMain from "../views/main/AboutMain.vue";

import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/admin/login",
      name: "LoginAdmin",
      component: LoginAdmin,
      meta: {
        title: "Login Admin",
      },
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.getters["auth/isAuthenticated"];
        if (isAuthenticated) {
          // Redirect user to the appropriate page based on their role
          const role = localStorage.getItem("role");
          if (role === "admin" || role === "super admin") {
            next("/admin/dashboard");
          } else {
            next("/");
          }
        } else {
          // Show loading page for 1 second before entering the component
          setTimeout(() => {
            next();
          }, 1000);
        }
      },
    },

    {
      path: "/auth/login",
      name: "LoginUser",
      component: LoginUser,
      meta: {
        title: "Auth login",
      },
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.getters["auth/isAuthenticated"];
        if (isAuthenticated) {
          // Jika pengguna sudah login, arahkan ke halaman yang sesuai dengan rolenya
          const role = localStorage.getItem("role");
          if (role === "user") {
            next("/");
          } else {
            next("/");
          }
        } else {
          // Menampilkan halaman loading selama 1 detik sebelum masuk ke komponen
          setTimeout(() => {
            next();
          }, 1000);
        }
      },
    },

    {
      path: "/auth/register",
      name: "RegisterGuest",
      component: RegisterGuest,
      meta: {
        title: "Auth register",
      },
      beforeEnter: (to, from, next) => {
        const isAuthenticated = store.getters["auth/isAuthenticated"];
        if (isAuthenticated) {
          // Jika pengguna sudah login, arahkan ke halaman yang sesuai dengan rolenya
          const role = localStorage.getItem("role");
          if (role === "user") {
            next("/");
          } else {
            next("/");
          }
        } else {
          // Menampilkan halaman loading selama 1 detik sebelum masuk ke komponen
          setTimeout(() => {
            next();
          }, 1000);
        }
      },
    },
    {
      path: "/auth/verify",
      name: "VerificationEmail",
      component: VerificationEmail,
      meta: {
        title: "Auth verification",
      },
    },

    {
      path: "/",
      component: MainLayout,
      name: "MainLayout",
      meta: {
        title: "event planning",
      },
      children: [
        {
          path: "/",
          component: HomeMain,
          name: "HomeMain",
          meta: {
            title: "event planning",
          },
        },
        {
          path: "/event/:eventName/:uuid",
          component: EventDetailMain,
          name: "EventDetailMain",
          meta: {
            title: "Events",
          },
        },
        {
          path: "/event/favorite",
          component: EventFavorite,
          name: "EventFavorite",
          meta: {
            requiresLogin: true,
            title: "Favorite",
          },
        },
        {
          path: "/about",
          component: AboutMain,
          name: "AboutMain",
          meta: {
            title: "About eventplan",
          },
        },
      ],
    },

    {
      path: "/organizer/dashboard",
      component: UserLayouts,
      name: "UserLayouts",
      meta: {
        title: "Dashboard",
        requiresLogin: true,
        requiresUser: true,
      },
      children: [
        {
          path: "/organizer/dashboard",
          component: DashboardUser,
          name: "DashboardUser",
          meta: {
            title: "Home",
          },
        },
        {
          path: "/organizer/events",
          component: MyEvent,
          name: "MyEvent",
          meta: {
            title: "Events",
          },
        },
        {
          path: "/organizer/create-event",
          component: CreateEvent,
          name: "CreateEvent",
          meta: {
            title: "Create event",
          },
        },
        {
          path: "/organizer/event/:eventName/:uuid",
          component: EventDetailUser,
          name: "EventDetailUser",
          meta: {
            title: "Event detail",
          },
        },
        {
          path: "/organizer/edit/:eventName/:uuid",
          component: EditEventUser,
          name: "EditEventUser",
          meta: {
            title: "Event edit",
          },
        },
      ],
    },

    {
      path: "/admin/dashboard",
      component: AdminLayouts,
      name: "AdminLayouts",
      meta: {
        title: "Admin Dashboard",
        requiresLogin: true,
        requiresAdmin: true,
      },
      children: [
        {
          path: "/admin/dashboard",
          component: DashboardAdmin,
          name: "DashboardAdmin",
          meta: {
            title: "Dashboard",
          },
        },
        {
          path: "/admin/event",
          component: EventAdmin,
          name: "EventAdmin",
          meta: {
            title: "Event",
          },
        },
        {
          path: "/admin/event/:uuid",
          component: DetailEventAdmin,
          name: "DetailEventAdmin",
          meta: {
            title: "Event Detail",
          },
        },
        {
          path: "/admin/event/:uuid",
          component: DetailEventAdmin,
          name: "DetailEventAdmin",
          meta: {
            title: "Event Detail",
          },
        },
        {
          path: "/admin/edit/:uuid",
          component: EditEventAdmin,
          name: "EditEventAdmin",
          meta: {
            title: "Event Edit",
          },
        },
        {
          path: "/admin/event/create",
          component: AddEventAdmin,
          name: "AddEventAdmin",
          meta: {
            title: "Create Event",
          },
        },
        {
          path: "/admin/user",
          component: UserListAdmin,
          name: "UserListAdmin",
          meta: {
            title: "UserList",
          },
        },
        {
          path: "/admin/:userName/:uuid",
          component: DetailUserAdmin,
          name: "DetailUserAdmin",
          meta: {
            title: "UserList",
          },
        },
      ],
    },

    {
      path: "/settings/personal",
      component: SettingsLayout,
      name: "SettingsLayout",
      meta: {
        title: "settings",
        requiresLogin: true,
      },
      children: [
        {
          path: "/settings/personal",
          component: PersonalInfo,
          name: "PersonalInfo",
          meta: {
            title: "Personal Information",
          },
        },
        {
          path: "/settings/security",
          component: Security,
          name: "Security",
          meta: {
            title: "Security",
          },
        },
        {
          path: "/settings/notifications",
          component: NotificationSetting,
          name: "NotificationSetting",
          meta: {
            title: "Notification",
          },
        },
        {
          path: "/settings/language",
          component: LanguageSetting,
          name: "LanguageSetting",
          meta: {
            title: "Notification",
          },
        },
        {
          path: "/settings/privacy",
          component: PrivacySetting,
          name: "PrivacySetting",
          meta: {
            title: "Privacy",
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const role = localStorage.getItem("role");

  if (to.meta.requiresLogin && !isAuthenticated) {
    // Redirect to login page if login is required and user is not authenticated
    next("/auth/login");
  } else if (
    to.meta.requiresAdmin &&
    !(role === "admin" || role === "super admin")
  ) {
    // Redirect to admin dashboard page if admin access is required and user is not admin or super admin
    next("/admin/dashboard");
  } else if (to.meta.requiresUser && role !== "user") {
    // Redirect to home page if user access is required and user is not a user role
    if (role !== 'admin') {
      next("/admin/dashboard");
    } else {
      next("/");
    }
  } else {
    // Continue with navigation
    next();
  }

  // Set document title
  document.title = "EventPlan - " + (to.meta.title || "Default Text");
});


export default router;
