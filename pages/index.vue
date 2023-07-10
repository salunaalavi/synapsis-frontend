<template>
  <main class="posts">
    <section class="posts__content">
      <PostCreate />
      <template v-for="(post, index) in posts.data" :key="index">
        <PostCard :post="post" :hyperlinked="true" />
      </template>
      <GenericObserver @intersect="posts.getPosts" />
    </section>
  </main>
</template>
<script setup>
const posts = usePostsStore();

useServerSeoMeta({
  title: "All Posts",
});

useHead({
  title: "All Posts",
});
</script>
