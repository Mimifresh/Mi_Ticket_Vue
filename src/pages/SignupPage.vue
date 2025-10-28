<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Create Account</h2>
      <p class="auth-subtitle">Sign up to start managing your tickets</p>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <label for="name">Full Name:</label>
          <input id="name" v-model.trim="name" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model.trim="email" />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model.trim="password" />
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model.trim="confirmPassword"
          />
          <span v-if="errors.confirmPassword" class="error">
            {{ errors.confirmPassword }}
          </span>
        </div>

        <button class="btn-primary auth-btn" type="submit" :disabled="auth.loading">
          {{ auth.loading ? "Creating Account..." : "Create Account" }}
        </button>
      </form>

      <p class="auth-switch">
        Already have an account?
        <RouterLink to="/auth/login">Login</RouterLink>
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

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const errors = reactive({})
const toast = reactive({ message: "", type: "success" })

function validate() {
  errors.name = !name.value ? "Full name is required" : ""
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
  errors.confirmPassword =
    confirmPassword.value !== password.value
      ? "Passwords do not match"
      : ""

  return Object.values(errors).every((e) => !e)
}

async function handleSubmit() {
  if (!validate()) return
  try {
    await auth.signup({
      name: name.value,
      email: email.value,
      password: password.value
    })
    toast.message = "Account created successfully"
    toast.type = "success"
    setTimeout(() => router.push("/dashboard"), 600)
  } catch (err) {
    toast.message = err.message || "Signup failed"
    toast.type = "error"
  }
}
</script>
