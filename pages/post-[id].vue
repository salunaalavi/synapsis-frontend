<template>
  <main class="posts">
    <PostCard v-if="posts.datum" :post="posts.datum" />
    <CommentCreate :post-id="route.params.id"/>
    <template v-for="(comment, index) in comments.data" :key="index">
      <CommentCard :comment="comment" />
    </template>
  </main>
</template>
<script setup>
const posts = usePostsStore();
const comments = useCommentsStore();
const route = useRoute();

onMounted(() => {
  comments.getCommentsByPostId(route.params.id);
});
</script>
