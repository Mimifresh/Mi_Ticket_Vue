<template>
  <div class="dashboard-root">
    <header class="dashboard-header" role="banner">
      <div class="container">
        <div class="dashboard-header-inner">
          <div class="dashboard-brand">
            <h1 class="brand-title">Mi Tickets</h1>
            <p class="visually-hidden">Dashboard Navigation</p>
          </div>

          <nav aria-label="Dashboard Navigation" class="dashboard-nav" role="navigation">
            <RouterLink
              to="/dashboard"
              exact-active-class="nav-link active"
              class="nav-link"
            >
              Overview
            </RouterLink>
            <RouterLink
              to="/dashboard/tickets"
              exact-active-class="nav-link active"
              class="nav-link"
            >
              Tickets
            </RouterLink>
          </nav>

          <div class="dashboard-actions">
            <button
              @click="handleLogout"
              class="logout-button"
              aria-label="Logout from your account"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="dashboard-main" role="main" id="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useAuth } from "../Stores/AuthStore"
import Footer from "../components/Footer.vue"

const { user, logout } = useAuth()
const router = useRouter()

function handleLogout() {
  logout()
  router.replace("/") // Redirect to landing page
}
</script>

<style scoped>
.dashboard-header {
  background: var(--color-surface);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 12px 0;
}

.dashboard-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-nav {
  display: flex;
  gap: 12px;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
}

.nav-link.active {
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
}

.dashboard-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-greeting {
  color: var(--color-text);
  font-weight: 500;
}

.logout-button {
  background: var(--accent-lighter);
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--accent);
  transition: background 0.2s ease;
}

.logout-button:hover {
  background: var(--accent-light);
  color: white;
}
</style>
