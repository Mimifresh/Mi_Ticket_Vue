<template>

    <header class="navbar">
      <div class="container nav-content">
        <h1 class="logo">Mi Tickets</h1>

        <nav>
          <RouterLink to="/auth/login" class="btn-outline">Login</RouterLink>
          <RouterLink to="/auth/signup" class="btn-primary">Get Started</RouterLink>
          <!-- Protected route link; router guard will redirect to login when not authenticated -->
          <RouterLink to="/dashboard" class="btn-outline" style="margin-left:8px">Dashboard</RouterLink>
        </nav>
      </div>
    </header>

  <section class="hero">
    <div class="container hero-content">
      <h1 class="hero-title">Ticketing Made Simple.</h1>
      <p class="hero-subtitle">
        Create, track, and manage tickets effortlessly. Fast. Reliable. Secure.
      </p>

      <div class="hero-buttons">
        <RouterLink to="/auth/signup" class="btn-primary">Get Started</RouterLink>
        <RouterLink to="/auth/login" class="btn-outline">Login</RouterLink>
        <RouterLink to="/dashboard" class="btn-primary">Dashboard</RouterLink>
      </div>
    </div>

    <!-- Decorative Wavy SVG Background -->
  <div class="hero-wave">
         <svg viewBox="0 0 1440 320">
            <path
              fill="#bbcbbbff"
              fillOpacity="1"
              d="M0,224L60,213.3C120,203,240,181,360,165.3C480,149,600,139,720,154.7C840,171,960,213,1080,208C1200,203,1320,149,1380,122.7L1440,96V320H0Z"
            ></path>
          </svg>
      </div>
      <Footer />
  </section>
</template>

<script setup>
    import Footer from '@/components/Footer.vue';
</script>
