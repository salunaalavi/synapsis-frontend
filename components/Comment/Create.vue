<template>
  <article>
    <GenericInput
      v-model:value="comments.form.name"
      v-model:show-validation="comments.validationForm.name"
      x-class="w-full"
      label="Name"
      placeholder="Subadra Subadri"
      :error-message="comments.error.name"
      :required="true"
      :validator="/.+/g"
    />
    <GenericInput
      v-model:value="comments.form.email"
      v-model:show-validation="comments.validationForm.email"
      x-class="w-full"
      label="Email"
      placeholder="Subadra Subadri"
      :error-message="comments.error.email"
      :required="true"
      :validator="$ruler.email"
      @update:show-validation="check"
    />
    <GenericTextArea
      v-model:value="comments.form.body"
      v-model:show-validation="comments.validationForm.body"
      label="Comment"
      width="w-full"
      placeholder="Your Comment"
      :error-message="comments.error.body"
      :rows="5"
      :required="true"
    />
    <GenericButton @click="comments.setComment(postId)"
      >Post Comment</GenericButton
    >
  </article>
</template>
<script setup>
defineProps({
  postId: {
    type: String,
    default: "",
  },
});

const { $ruler, $error_message } = useNuxtApp();
const comments = useCommentsStore();

function check(value) {
  if (value) {
    comments.error.email = $error_message.format
  }
}
</script>
