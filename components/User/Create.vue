<template>
  <article>
    <GenericInput
      v-model:value="users.form.name"
      v-model:show-validation="users.validationForm.name"
      x-class="w-full"
      label="Name"
      placeholder="Subadra Subadri"
      :error-message="users.error.name"
      :required="true"
      :validator="/.+/g"
    />
    <GenericInput
      v-model:value="users.form.email"
      v-model:show-validation="users.validationForm.email"
      x-class="w-full"
      label="Email"
      placeholder="subadra@subadri.com"
      :error-message="users.error.email"
      :required="true"
      :validator="$ruler.email"
      @update:show-validation="check"
    />
    <GenericButton @click="users.setUser">Add User</GenericButton>
  </article>
</template>
<script setup>
const { $ruler, $error_message } = useNuxtApp();
const users = useUsersStore();

function check(value) {
  if (value) {
    users.error.email = $error_message.format
  }
}
</script>
