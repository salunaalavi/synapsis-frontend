<template>
  <article class="bg-slate-400 mb-4">
    <div class="flex gap-2">
      <p>
        {{ comment.name }}
      </p>
      <p>
        {{ comment.email }}
      </p>
    </div>
    <p>
      {{ comment.body }}
    </p>
  </article>
</template>
<script setup>
defineProps({
  comment: {
    type: Object,
    default: {},
  },
});
</script>
