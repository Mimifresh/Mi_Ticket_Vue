<template>
  <div class="auth-layout">
    <!-- Optional heading or sub-brand -->
    <header class="auth-header">
      <div class="container">
        <RouterLink to="/" class="auth-brand">Mi Tickets</RouterLink>
      </div>
    </header>

    <!-- Auth content area -->
    <main class="auth-content" role="main" aria-labelledby="auth-heading">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
  import Footer from "../components/Footer.vue"
</script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--secondary);
}

.auth-header {
  padding: 1rem 0;
  text-align: center;
}

.auth-brand {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--accent);
  text-decoration: none;
}

.auth-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.auth-footer {
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-muted);
  padding: 1rem 0;
  background: var(--primary);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
