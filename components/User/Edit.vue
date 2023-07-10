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
      @update:show-validation="users.validationForm.name"
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
    <div class="flex justify-between">
      <GenericButton @click="users.editUser(id)">Edit User</GenericButton>
      <GenericButton color="secondary" @click="$emit('close')">Cancel</GenericButton>
    </div>
  </article>
</template>
<script setup>
defineProps({
  id: {
    type: Number,
    default: 0,
  },
});

defineEmits(["close"])

const { $ruler, $error_message } = useNuxtApp();
const users = useUsersStore();

function check(value) {
  if (value) {
    users.error.email = $error_message.format
  }
}
</script>
