<template>
  <article class="comment-card">
    <section class="comment-card__header">
      <h3>
        {{ comment.name }}
      </h3>
      <a :href="`mailto:${comment.email}`">
        {{ comment.email }}
      </a>
    </section>
    <section class="comment-card__body">
      <p>
        {{ comment.body }}
      </p>
    </section>
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
