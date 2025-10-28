<template>
  <div class="container ticket-list-page">
    <header class="ticket-list-header">
      <h1>Ticket Management</h1>
      <div>
        <button
          v-if="!creating && !editingTicket"
          class="ticket-action-btn btn-primary"
          @click="startCreating"
        >
          Create New Ticket
        </button>
      </div>
    </header>

    <!-- Create -->
    <section v-if="creating" class="ticket-form-section">
      <h2>Create New Ticket</h2>
      <TicketForm
        :initialData="{}"
        submitLabel="Create"
        @cancel="cancelCreate"
        @submit="handleCreate"
      />
    </section>

    <!-- Edit -->
    <section v-if="editingTicket" class="ticket-form-section">
      <h2>Edit Ticket</h2>
      <TicketForm
        :initialData="editingTicket"
        submitLabel="Update"
        @cancel="cancelEdit"
        @submit="handleUpdate"
      />
    </section>

    <!-- Ticket List -->
    <section class="ticket-list-section">
      <p v-if="tickets.length === 0">No tickets available.</p>

      <div v-else class="tickets-grid">
        <TicketCard
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
          @edit="startEdit"
          @delete="startDelete"
        />
      </div>
    </section>

    <!-- Confirm Delete Dialog -->
    <div v-if="confirm.open" class="confirm-overlay">
      <div class="confirm-box">
        <h3>Confirm Delete</h3>
        <p>
          Are you sure you want to delete
          <strong>"{{ confirm.ticket?.title }}"</strong>? This action cannot be
          undone.
        </p>
        <div class="form-buttons">
          <button class="ticket-btn ticket-delete-btn" @click="confirmDelete">
            Yes, Delete
          </button>
          <button class="ticket-btn ticket-cancel-btn" @click="cancelDelete">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="toast"
      class="toast"
      :class="toast.type"
      @click="toast = null"
      role="alert"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue"
import TicketForm from "../components/TicketForm.vue"
import TicketCard from "../components/TicketCard.vue"

// ✅ LocalStorage key
const STORAGE_KEY = "tickets"

// Reactive state
const tickets = ref([])
const creating = ref(false)
const editingTicket = ref(null)
const toast = ref(null)
const confirm = reactive({ open: false, ticket: null })

// 🧠 Load tickets from localStorage
function loadTickets() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    tickets.value = saved
  } catch {
    tickets.value = []
  }
}

// 💾 Save tickets
function saveTickets() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets.value))
}

// 📌 CRUD Logic
function startCreating() {
  creating.value = true
  editingTicket.value = null
}

function cancelCreate() {
  creating.value = false
}

function handleCreate(newTicket) {
  const ticket = {
    ...newTicket,
    id: Date.now()
  }
  tickets.value.unshift(ticket)
  saveTickets()
  creating.value = false
  toast.value = { message: "Ticket created successfully.", type: "success" }
}

function startEdit(ticket) {
  editingTicket.value = { ...ticket }
  creating.value = false
}

function cancelEdit() {
  editingTicket.value = null
}

function handleUpdate(updatedTicket) {
  tickets.value = tickets.value.map((t) =>
    t.id === editingTicket.value.id ? { ...t, ...updatedTicket } : t
  )
  saveTickets()
  editingTicket.value = null
  toast.value = { message: "Ticket updated successfully.", type: "success" }
}

function startDelete(ticket) {
  confirm.open = true
  confirm.ticket = ticket
}

function confirmDelete() {
  tickets.value = tickets.value.filter((t) => t.id !== confirm.ticket.id)
  saveTickets()
  confirm.open = false
  confirm.ticket = null
  toast.value = { message: "Ticket deleted successfully.", type: "success" }
}

function cancelDelete() {
  confirm.open = false
  confirm.ticket = null
}

// Auto-load tickets on mount
onMounted(() => {
  loadTickets()
})

// Watch and auto-save tickets
watch(tickets, saveTickets, { deep: true })
</script>

<style scoped>
.ticket-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.ticket-action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: var(--accent);
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.ticket-action-btn:hover {
  background-color: var(--accent-light);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 18px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.toast.success {
  background-color: var(--accent);
}
.toast.error {
  background-color: #dc2626;
}

/* Confirm Overlay */
.confirm-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 6, 23, 0.36);
  z-index: 2000;
}
.confirm-box {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.confirm-box h3 {
  margin-top: 0;
}
</style>
