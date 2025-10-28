<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Login</h2>
      <p class="auth-subtitle">Access your ticket management dashboard</p>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            type="email"
            v-model.trim="email"
            autocomplete="email"
            :aria-invalid="!!errors.email"
          />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            id="password"
            type="password"
            v-model.trim="password"
            autocomplete="current-password"
            :aria-invalid="!!errors.password"
          />
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
        </div>

        <button class="btn-primary auth-btn" type="submit" :disabled="auth.loading">
          {{ auth.loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <p class="auth-switch">
        Don't have an account?
        <RouterLink to="/auth/signup">Create one</RouterLink>
      </p>
    </div>

    <Toast
      v-if="toast.message"
      :message="toast.message"
      :type="toast.type"
      @close="toast.message = ''"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "../Stores/AuthStore"
import Toast from "../components/Toast.vue"

const auth = useAuth()
const router = useRouter()

const email = ref("")
const password = ref("")
const errors = reactive({})
const toast = reactive({ message: "", type: "success" })

function validate() {
  errors.email = !email.value
    ? "Email is required"
    : !/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email.value)
    ? "Invalid email format"
    : ""
  errors.password = !password.value
    ? "Password is required"
    : password.value.length < 6
    ? "Password must be at least 6 characters"
    : ""
  return !errors.email && !errors.password
}

async function handleSubmit() {
  if (!validate()) return
  try {
  // Pass a display name derived from the email if not present in the auth implementation
  const displayName = email.value ? email.value.split("@")[0] : "User"
  await auth.login({ email: email.value, name: displayName })
    toast.message = "Login successful"
    toast.type = "success"
    setTimeout(() => router.push("/dashboard"), 600)
  } catch (err) {
    toast.message = err.message || "Login failed"
    toast.type = "error"
  }
}
</script>
