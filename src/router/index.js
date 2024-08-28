import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Landing from "../views/Landing.vue";
import Dashboard from "../views/pages/user/Dashboard.vue";
import Credits from "../views/pages/user/CreditsView.vue";
import Points from "../views/pages/user/PointsView.vue";
import ServicesView from "../views/pages/user/ProfileView.vue";
import authStore from "../stores/auth";
import Verification from "../views/auth/Verification.vue";

const routes = [
  {
    path: "/",
    component: () => import("../views/auth/Login.vue"),
    meta: {
      title: "Sign In",
    },
  },
  {
    path: "/signin",
    component: () => import("../views/auth/Login.vue"),
    meta: {
      title: "Sign In",
    },
  },
  {
    path: "/verification/:gen?",
    component: Verification,
    name: "verification",
    meta: {
      title: "Verification",
      // requiresAuth: true,
    },
  },
  // {
  //   path: "/",
  //   name: "Landing",
  //   component: Landing,
  // },
  {
    path: "/home",
    name: "home",
    component: Dashboard,
    meta: {
      title: "Home",
      requiresAuth: true,
    },
  },
  {
    path: "/credits",
    name: "credits",
    component: Credits,
    meta: {
      title: "Credits",
      requiresAuth: true,
    },
  },
  {
    path: "/points",
    name: "points",
    component: Points,
    meta: {
      title: "Points",
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ServicesView,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/user/dashboard",
    component: () => import("../views/pages/user/Dashboard.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // scrollBehavior(to, from, savePosition) {
  //   return savedPosition || { left: 0, top: 0 };
  // },
});

router.beforeEach((to, from, next) => {
  const authStoreInstance = authStore();
  const isAuthenticated = authStoreInstance.isAuthenticated;
  const token = localStorage.getItem("a_TOK");
  document.title = `Loyalty linx ${to.meta.title} | your trust partner in businesss `;

  if (to.meta.requiresAuth && !isAuthenticated && !token) {
    // If the route requires authentication and the user is not authenticated, redirect to signin
    return next({ path: "/signin", query: { redirect: to.fullPath } });
  }

  if (isAuthenticated && to.path === "/signin") {
    // If the user is already authenticated and tries to access signin, redirect to home
    return next({ path: "/home" });
  }

  if (isAuthenticated && to.path === "/register") {
    // If the user is already authenticated and tries to access register, redirect to current page
    return next({ path: "/home" });
  }

  if (token && !isAuthenticated) {
    // If the user has a token, assume they are authenticated
    authStoreInstance.isAuthenticated = true;
    authStoreInstance.token = token;
    // Redirect to /home if the user has a valid token
    return next({ path: to.path });
  }

  next();
});

export default router;
