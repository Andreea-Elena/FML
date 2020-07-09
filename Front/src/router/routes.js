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
        path: "/explore",
        name: "homepage",
        component: () => import("pages/Explore.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/groups",
        name: "groups",
        component: () => import("pages/Groups.vue"),
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
      {
        path: "/meetings",
        name: "meetings",
        component: () => import("pages/Meetings.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profile/:id',
        name: 'profile',
        component: () => import('../pages/Profile.vue')
      },
      {
        path: "/meeting",
        name: "meeting",
        component: () => import("pages/Meeting.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/addmeeting",
        name: "addMeeting",
        component: () => import("pages/AddMeeting.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/post",
        name: "post",
        component: () => import("pages/Post.vue"),
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
