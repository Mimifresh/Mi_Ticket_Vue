import { ref, computed } from "vue"

const token = ref(localStorage.getItem("ticketapp_session"))
const user = ref(JSON.parse(localStorage.getItem("auth_user")))

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)

  function login({ email, name }) {
    const newToken = Math.random().toString(36).slice(2)
    const newUser = { name, email }

    token.value = newToken
    user.value = newUser
    localStorage.setItem("ticketapp_session", newToken)
    localStorage.setItem("auth_user", JSON.stringify(newUser))
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem("ticketapp_session")
    localStorage.removeItem("auth_user")
  }

  return { token, user, isAuthenticated, login, logout }
}

