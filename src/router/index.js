import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Landing from "../views/LandingView.vue";
import Dashboard from "../views/pages/user/Dashboard.vue";
import Credits from "../views/pages/user/CreditsView.vue";
import Points from "../views/pages/user/PointsView.vue";
import ServicesView from "../views/pages/user/ProfileView.vue";
import authStore from "../stores/auth";
import Verification from "../views/auth/Verification.vue";

const routes = [
  {
    path: "/",
    component: Landing,
    meta: {
      title: "",
    },
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/auth/LoginView.vue"),
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
    name: "register",
    component: () => import("../views/auth/RegisterView.vue"),
  },
  {
    path: "/user/dashboard",
    name: "dashboard",
    component: () => import("../views/pages/user/Dashboard.vue"),
  },
  {
    path: "/register/merchant",
    name: "merchants",
    component: () => import("../views/auth/RegisterMerchantView.vue"),
  },
  {
    path: "/application/credit",
    name: "apply/credit",
    component: () => import("../components/Credits/ApplicationForm.vue"),
    meta: {
      title: "Apply",
      requiresAuth: true,
    },
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: () => import("../views/auth/ForgotPasswordView.vue"),
  },
  {
    path: "/forgotpassword/verification",
    name: "forgotpassword/otp",
    component: () =>
      import("../components/ForgotPassword/ForgotPasswordOtp.vue"),
  },
  {
    path: "/resetpassword",
    name: "resetpassword",
    component: () => import("../components/ForgotPassword/ChangePassword.vue"),
  },
  {
    path: "/confirm/password",
    name: "confirm/password",
    component: () => import("../components/ForgotPassword/ConfirmPassword.vue"),
  },
  {
    path: "/passcode",
    name: "passcode",
    component: () => import("../components/registration/RegisterPassword.vue"),
  },
  {
    path: "/confirmpasscode",
    name: "confirmpasscode",
    component: () =>
      import("../components/registration/RegisterConfirmPasscode.vue"),
  },
  {
    path: "/link/passcode",
    name: "link/passcode",
    component: () => import("../views/auth/PassCode.vue"),
  },
  {
    path: "/loan/status",
    name: "loan/status",
    component: () => import("../components/Credits/LoanStatusLanding.vue"),
    meta: {
      title: "Credit status",
      requiresAuth: true,
    },
  },
  {
    path: "/qr",
    name: "qr code",
    component: () => import("../views/pages/user/QrView.vue"),
    meta: {
      title: "Credit status",
      requiresAuth: true,
    },
  },
  {
    path: "/loan/monitor",
    name: "loan/monitor",
    component: () => import("../components/Credits/LoanStatus.vue"),
    meta: {
      title: "Credit monitor",
      requiresAuth: true,
    },
  },
  {
    path: "/choose/id",
    name: "choose/id",
    component: () => import("../views/pages/user/ChooseIdView.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/take/id",
    name: "take/id",
    component: () => import("../components/Verification/TakeIdPhoto.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/preview/id/:photo",
    name: "preview/id",
    component: () => import("../components/Verification/ModalPreview.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/take/selfie/id/",
    name: "take/selfie/id",
    component: () => import("../components/Verification/TakeSelfie.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/selfie/preview/:photo",
    name: "selfie/preview",
    component: () => import("../components/Verification/SelfiePreview.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/fill/information",
    name: "fill/information",
    component: () => import("../components/Verification/MoreInfo.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/fill/confirmation",
    name: "fill/confirmation",
    component: () => import("../components/Verification/Confirmation.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/selection/payment",
    name: "selection/payment",
    component: () => import("../components/Payment/ChooseLoanPayment.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/payment/method",
    name: "payment/method",
    component: () => import("../components/Payment/ChoosePaymentMethod.vue"),
    meta: {
      title: "",
      requiresAuth: true,
    },
  },
  {
    path: "/shop/product/list",
    name: "product/list",
    component: () => import("../components/Shop/ProductList.vue"),
    meta: {
      title: "Shop",
      requiresAuth: true,
    },
  },
  {
    path: "/shop/cart/",
    name: "cart",
    component: () => import("../components/Shop/Cart.vue"),
    meta: {
      title: "Cart",
      requiresAuth: true,
    },
  },
  {
    path: "/product/details/:id",
    name: "product/details",
    component: () => import("../components/Shop/ProductDetails.vue"),
    meta: {
      title: "Cart",
      requiresAuth: true,
    },
  },
  {
    path: "/check-out/:id",
    name: "check-out",
    component: () => import("../components/Shop/CheckOut.vue"),
    meta: {
      title: "check-out",
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  routes,
  // scrollBehavior(to, from, savePosition) {
  //   return savedPosition || { left: 0, top: 0 };
  // },
});

let timeoutId = null;
let inactivityTimeout = 600000; // 10 minutes in milliseconds
document.addEventListener("click", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);

function resetInactivityTimer() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    router.push({ path: "/link/passcode" });
  }, inactivityTimeout);
}
router.beforeEach((to, from, next) => {
  const authStoreInstance = authStore();
  const isAuthenticated = authStoreInstance.isAuthenticated;
  const token = localStorage.getItem("a_TOK");
  document.title = `Loyalty linx ${to.meta.title} | Your trust partner in businesss `;
  if (token && !isAuthenticated) {
    // If the user has a token, assume they are authenticated
    authStoreInstance.isAuthenticated = true;
    authStoreInstance.token = token;
    // Redirect to /home if the user has a valid token
    return next({ path: to.path });
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
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

  // if (isAuthenticated && to.path === "/") {
  //   return next({ path: "/link/passcode" });
  // }

  // if (isAuthenticated) {
  //   timeoutId = setTimeout(() => {
  //     router.push({ path: "/link/passcode" });
  //   }, inactivityTimeout);
  // }
  // Set the inactivity timer

  clearTimeout(timeoutId);

  // 600000
  next();
});

export default router;
