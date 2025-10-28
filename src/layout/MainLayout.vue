<template>
  <div>
    <header class="app-header">
      <div class="container header-inner">
        <div class="brand">
          <h1 class="brand-title">Mi Tickets</h1>
        </div>

        <nav class="main-nav" aria-label="Main Navigation">
          <RouterLink to="/" class="nav-link" exact>Home</RouterLink>
          <RouterLink to="/dashboard" exact-active-class="nav-link active" class="nav-link">
            Dashboard
            </RouterLink>
          <RouterLink to="/auth/login" class="nav-link">Login</RouterLink>
          <RouterLink to="/auth/signup" class="nav-link btn-primary">Get Started</RouterLink>
        </nav>
      </div>
    </header>

    <main id="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
    import Footer from "../components/Footer.vue"
</script>
