<template>
  <button>
    <Icon :name="name" :size="size" />
  </button>
</template>
<script setup>
defineProps({
  name: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "20",
  }
})
</script>
