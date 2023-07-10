<template>
  <main class="posts">
    <section class="posts__content">
      <PostCard v-if="posts.datum" :post="posts.datum" :user="users.datum" />
      <section class="posts__content--actions">
        <div class="posts__content--actions-right">
          <GenericIcon
            name="ic:outline-comment"
            color="primary"
            title="Add Your Comment"
            @click="modalData.isOpen = true"
          />
        </div>
      </section>
      <template v-for="(comment, index) in comments.data" :key="index">
        <CommentCard :comment="comment" />
      </template>
    </section>
    <GenericModal
      v-model:is-open="modalData.isOpen"
      :content-position="modalData.contentPosition"
      :is-full-height="modalData.isFullheight"
      :width="modalData.width"
      :max-width="modalData.maxWidth"
    >
      <CommentCreate :post-id="route.params.id" />
    </GenericModal>
  </main>
</template>
<script setup>
const posts = usePostsStore();
const comments = useCommentsStore();
const users = useUsersStore();
const route = useRoute();
const modalData = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  width: 400,
  maxWidth: 600,
});

onMounted(() => {
  comments.resetPagination();
  comments.getCommentsByPostId(route.params.id);
});

useSeoMeta({
  title: () => `${posts.datum?.title ? posts.datum?.title : 'Post'} - by ${users.datum?.name ? users.datum?.name : 'Username'}`,
  description: () => `${posts.datum?.body}`,
  ogDescription: () => `${posts.datum?.body}`,
});
</script>
