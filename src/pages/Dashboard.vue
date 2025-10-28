<template>
  <section aria-labelledby="dashboard-heading" class="dashboard-overview container">
    <div class="dashboard-hero">
      <h2 id="dashboard-heading">Dashboard Overview</h2>
      <p>
        Welcome back, {{ userName }}! Here’s a quick summary of your tickets.
      </p>

    <RouterLink to="/tickets" class="btn-primary dashboard-view-tickets-btn">
      Manage Tickets
    </RouterLink>
    </div>

    <div class="stats-grid" role="group" aria-label="Ticket summary statistics">
      <div class="stat-card" tabindex="0" aria-describedby="total-desc">
        <div class="stat-value">{{ stats.total }}</div>
        <div class="stat-label">Total Tickets</div>
        <div id="total-desc" class="visually-hidden">
          Total number of tickets
        </div>
      </div>

      <div class="stat-card" tabindex="0" aria-describedby="open-desc">
        <div class="stat-value">{{ stats.open }}</div>
        <div class="stat-label">Open Tickets</div>
        <div id="open-desc" class="visually-hidden">
          Tickets currently open
        </div>
      </div>

      <div class="stat-card" tabindex="0" aria-describedby="resolved-desc">
        <div class="stat-value">{{ stats.closed }}</div>
        <div class="stat-label">Resolved Tickets</div>
        <div id="resolved-desc" class="visually-hidden">
          Tickets marked as closed
        </div>
      </div>

      <div class="stat-card" tabindex="0" aria-describedby="other-desc">
        <div class="stat-value">{{ stats.in_progress }}</div>
        <div class="stat-label">In Progress</div>
        <div id="other-desc" class="visually-hidden">
          Tickets being worked on
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, onMounted } from "vue"
import { useAuth } from "../Stores/AuthStore"
import * as ticketService from "../utils/TicketServices"

const auth = useAuth()
const userName = computed(() => auth.user?.value?.name || "User")

const stats = reactive({
  total: 0,
  open: 0,
  in_progress: 0,
  closed: 0
})

onMounted(() => {
  const tickets = ticketService.getTickets()
  stats.total = tickets.length
  stats.open = tickets.filter((t) => t.status === "open").length
  stats.in_progress = tickets.filter((t) => t.status === "in_progress").length
  stats.closed = tickets.filter((t) => t.status === "closed").length
})
</script>
