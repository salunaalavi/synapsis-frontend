<template>
  <div ref="targetObserver" />
</template>
<script setup>
const emit = defineEmits(["intersect"]);
const observer = ref(null);
const targetObserver = ref(null);

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit("intersect");
    }
  });
  observer.value.observe(targetObserver.value);
});

onUnmounted(() => {
  observer.value.disconnect();
});
</script>
