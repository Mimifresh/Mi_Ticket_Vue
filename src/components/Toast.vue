<template>
  <transition name="fade">
    <div
      v-if="message"
      :class="['toast', type]"
      role="alert"
      aria-live="assertive"
      @click="close"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from 'vue'

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'success' // or 'error'
  },
  duration: {
    type: Number,
    default: 3500
  }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

onMounted(() => {
  if (props.message) {
    setTimeout(close, props.duration)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
