<template>
  <article class="post-card">
    <nuxt-link
      v-if="hyperlinked"
      :to="{ name: 'post-id', params: { id: post.id } }"
    >
      <h3 class="post-card__header">
        {{ post.title }}
      </h3>
    </nuxt-link>
    <h3 v-else class="post-card__header">
      {{ post.title }}
    </h3>
    <p class="post-card__body">
      {{ post.body }}
    </p>
    <section v-if="user" class="post-card__footer">
      <p>
        by: {{ user.name }}
      </p>
      <p>
        email: <a :href="`mailto:${user.email}`">{{ user.email }}</a>
      </p>
    </section>
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
  user: {
    type: Object,
    default: null,
  }
});
</script>
