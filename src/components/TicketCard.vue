<template>
  <article
    class="ticket-card"
    role="article"
    tabindex="0"
    :aria-labelledby="`ticket-title-${ticket.id}`"
    :aria-describedby="`ticket-desc-${ticket.id} ticket-status-${ticket.id}`"
  >
    <div class="ticket-header">
      <h3 :id="`ticket-title-${ticket.id}`" class="ticket-title">
        {{ ticket.title }}
      </h3>
      <span
        :id="`ticket-status-${ticket.id}`"
        class="status-tag"
        :class="`status-${ticket.status?.toLowerCase()}`"
        :aria-label="`Status: ${ticket.status || 'Unknown'}`"
      >
        {{ ticket.status || "Unknown" }}
      </span>
    </div>

    <p
      v-if="ticket.description"
      :id="`ticket-desc-${ticket.id}`"
      class="ticket-description"
    >
      {{ ticket.description }}
    </p>

    <div class="ticket-meta">
      <small>Priority: {{ ticket.priority || "N/A" }}</small>
      <div class="ticket-actions">
        <button
          class="ticket-btn ticket-edit-btn"
          @click="$emit('edit', ticket)"
        >
          Edit
        </button>
        <button
          class="ticket-btn ticket-delete-btn"
          @click="$emit('delete', ticket)"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  ticket: { type: Object, required: true }
})

defineEmits(["edit", "delete"])
</script>
