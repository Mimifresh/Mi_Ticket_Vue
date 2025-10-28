<template>
  <form class="ticket-form" @submit.prevent="handleSubmit" novalidate>
    <!-- Title -->
    <label for="ticket-title">Title:</label>
    <input
      id="ticket-title"
      type="text"
      v-model.trim="form.title"
      :aria-invalid="errors.title ? 'true' : 'false'"
      :aria-describedby="errors.title ? 'ticket-title-error' : undefined"
    />
    <div v-if="errors.title" id="ticket-title-error" class="error-message">
      {{ errors.title }}
    </div>

    <!-- Status -->
    <label for="ticket-status">Status:</label>
    <select
      id="ticket-status"
      v-model="form.status"
      :aria-invalid="errors.status ? 'true' : 'false'"
      :aria-describedby="errors.status ? 'ticket-status-error' : undefined"
    >
      <option v-for="status in ALLOWED_STATUSES" :key="status" :value="status">
        {{ status }}
      </option>
    </select>
    <div v-if="errors.status" id="ticket-status-error" class="error-message">
      {{ errors.status }}
    </div>

    <!-- Description -->
    <label for="ticket-description">Description:</label>
    <textarea
      id="ticket-description"
      v-model.trim="form.description"
      :aria-invalid="errors.description ? 'true' : 'false'"
      :aria-describedby="errors.description ? 'ticket-description-error' : undefined"
    ></textarea>
    <div v-if="errors.description" id="ticket-description-error" class="error-message">
      {{ errors.description }}
    </div>

    <!-- Priority -->
    <label for="ticket-priority">Priority (1–5):</label>
    <input
      id="ticket-priority"
      type="number"
      v-model.number="form.priority"
      :aria-invalid="errors.priority ? 'true' : 'false'"
      :aria-describedby="errors.priority ? 'ticket-priority-error' : undefined"
    />
    <div v-if="errors.priority" id="ticket-priority-error" class="error-message">
      {{ errors.priority }}
    </div>

    <!-- Buttons -->
    <div class="form-buttons">
      <button
        type="submit"
        class="ticket-btn ticket-submit-btn"
        :disabled="!isValid"
      >
        {{ submitLabel }}
      </button>
      <button
        type="button"
        class="ticket-btn ticket-cancel-btn"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue"
import {
  validateTicketForm,
  ALLOWED_STATUSES,
  isFormValid
} from "../utils/TicketValidators"

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: "Save" }
})

const emit = defineEmits(["submit", "cancel"])

const form = reactive({
  title: props.initialData.title || "",
  description: props.initialData.description || "",
  status: props.initialData.status || "open",
  priority: props.initialData.priority || ""
})

const errors = reactive({})

// Auto-validate on change
watch(form, (newForm) => {
  const e = validateTicketForm(newForm)
  Object.assign(errors, e)
}, { deep: true })

// Computed overall validity
const isValid = computed(() => isFormValid(form))

// Handle submit
function handleSubmit() {
  const eObj = validateTicketForm(form)
  Object.assign(errors, eObj)
  if (!isFormValid(form)) return
  emit("submit", { ...form })
}
</script>

<style scoped>
.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--color-surface);
  padding: 20px;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
}

.ticket-form label {
  font-weight: 500;
  margin-bottom: 2px;
}

.ticket-form input,
.ticket-form select,
.ticket-form textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.ticket-form input:focus,
.ticket-form select:focus,
.ticket-form textarea:focus {
  outline: 2px solid var(--accent-light);
  border-color: var(--accent-light);
}

.error-message {
  color: red;
  font-size: 0.85rem;
  min-height: 1.2em;
}

.form-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;
}

.ticket-btn {
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.ticket-submit-btn {
  background-color: var(--accent);
  color: white;
}

.ticket-submit-btn:hover:not(:disabled) {
  background-color: var(--accent-light);
}

.ticket-cancel-btn {
  background-color: #f3f4f6;
  color: #333;
}

.ticket-cancel-btn:hover {
  background-color: #e5e7eb;
}

.ticket-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
