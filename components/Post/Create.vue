<template>
  <article class="post-create">
    <section class="post-create__multi">
      <GenericInput
        v-model:value="posts.form.name"
        v-model:show-validation="posts.validationForm.name"
        custom-class="w-2/3"
        label="Name"
        placeholder="Subadra Subadri"
        :error-message="posts.error.name"
        :required="true"
        :validator="/.+/g"
      />
      <GenericInput
        v-model:value="posts.form.user_id"
        v-model:show-validation="posts.validationForm.user_id"
        custom-class="w-1/3"
        type="number"
        label="User ID"
        :error-message="posts.error.user_id"
        :required="true"
        :validator="/.+/g"
      />
    </section>
    <GenericInput
      v-model:value="posts.form.email"
      v-model:show-validation="posts.validationForm.email"
      custom-class="w-full"
      label="Email"
      placeholder="subadra@subadri.com"
      :error-message="posts.error.email"
      :required="true"
      :validator="$ruler.email"
      @update:show-validation="check"
    />
    <GenericInput
      v-model:value="posts.form.title"
      v-model:show-validation="posts.validationForm.title"
      custom-class="w-full"
      label=""
      placeholder="What on Your Mind?"
      :error-message="posts.error.title"
      :required="false"
      :validator="/.+/g"
      @update:show-validation="posts.validationForm.title"
    />
    <GenericTextArea
      v-model:value="posts.form.body"
      v-model:show-validation="posts.validationForm.body"
      label=""
      width="w-full"
      placeholder="Your Comment"
      :error-message="posts.error.body"
      :rows="5"
      :required="true"
    />
    <GenericButton @click="posts.setPost">Post</GenericButton>
  </article>
</template>
<script setup>
const { $ruler, $error_message } = useNuxtApp();
const posts = usePostsStore();

function check(value) {
  if (value) {
    posts.error.email = $error_message.format;
  }
}
</script>
