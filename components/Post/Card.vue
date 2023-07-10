<template>
  <article class="bg-slate-400 mb-4">
    <nuxt-link
      v-if="hyperlinked"
      class=""
      :to="{ name: 'post-id', params: { id: post.id } }"
    >
      {{ post.title }}
    </nuxt-link>
    <p v-else>
      {{ post.title }}
    </p>
    <p>
      {{ post.body }}
    </p>
  </article>
</template>
<script setup>
defineProps({
  post: {
    type: Object,
    default: {},
  },
  hyperlinked: {
    type: Boolean,
    default: false,
  },
});
</script>
