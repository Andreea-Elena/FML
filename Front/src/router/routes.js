const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/Index.vue"),
        meta: {
          requiresVisitor: true
        }
      },
      {
        path: "/login",
        name: "login",
        component: () => import("pages/Login.vue"),
        meta: {
          requiresVisitor: true
        }
      },
      {
        path: "/forgotpassword",
        component: () => import("pages/ForgotPassword.vue"),
        meta: {
          requiresVisitor: true
        }
      },
      {
        path: "/register",
        component: () => import("pages/Register.vue"),
        meta: {
          requiresVisitor: true
        }
      }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/LoggedLayout.vue"),
    children: [
      {
        path: "/logged",
        name: "homepage",
        component: () => import("pages/Homepage.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/logout",
        name: "logout",
        component: () => import("pages/Logout.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("pages/Profile.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/addpost",
        name: "addpost",
        component: () => import("pages/AddPost.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("pages/Settings.vue"),
        meta: {
          requiresAuth: true
        }
      },
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
