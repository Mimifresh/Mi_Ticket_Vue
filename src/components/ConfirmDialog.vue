<template>
  <div v-if="open" class="confirm-overlay" role="dialog" aria-modal="true">
    <div class="confirm-box">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="confirm-actions">
        <button class="ticket-btn ticket-delete-btn" @click="$emit('confirm')">
          Confirm
        </button>
        <button class="ticket-btn ticket-cancel-btn" @click="$emit('cancel')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
  title: String,
  message: String
})
defineEmits(['confirm', 'cancel'])
</script>
