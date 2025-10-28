import { createRouter, createWebHistory } from "vue-router"
import LandingPage from "../pages/LandingPage.vue"
import LoginPage from "../pages/LoginPage.vue"
import SignupPage from "../pages/SignupPage.vue"
import DashboardLayout from "../layout/DashboardLayout.vue"
import Dashboard from "../pages/Dashboard.vue"
import TicketList from "../pages/TicketList.vue"
import { useAuth } from "../Stores/AuthStore"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: LandingPage },
    { path: "/auth/login", name: "login", component: LoginPage },
    { path: "/auth/signup", name: "signup", component: SignupPage },
    {
      path: "/dashboard",
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        { path: "", name: "dashboard", component: Dashboard },
        { path: "tickets", name: "tickets", component: TicketList }
      ]
    },
    // 🟢 Redirect fallback
    { path: "/tickets", redirect: "/dashboard/tickets" }
  ]
})

// Auth guard logic
router.beforeEach((to, from, next) => {
  const auth = useAuth()
  const isLoggedIn = auth.isAuthenticated.value

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "login", query: { redirect: to.fullPath } })
  } else if ((to.name === "login" || to.name === "signup") && isLoggedIn) {
    next({ name: "dashboard" })
  } else {
    next()
  }
})

export default router
