<template>
  <article class="comment-create">
    <GenericInput
      v-model:value="users.form.name"
      v-model:show-validation="users.validationForm.name"
      custom-class="w-full"
      label="Name"
      placeholder="Subadra Subadri"
      :error-message="users.error.name"
      :required="true"
      :validator="/.+/g"
    />
    <GenericInput
      v-model:value="users.form.email"
      v-model:show-validation="users.validationForm.email"
      custom-class="w-full"
      label="Email"
      placeholder="subadra@subadri.com"
      :error-message="users.error.email"
      :required="true"
      :validator="$ruler.email"
      @update:show-validation="check"
    />
    <div class="mb-2">
      <p class="mb-2">Gender <span class="text-red-500">*</span></p>
      <GenericRadio
        :value="users.form.gender"
        :options="[
          { value: 'male', label: 'male' },
          { value: 'female', label: 'female' },
        ]"
        @update:value="(e) => (users.form.gender = e)"
      />
    </div>
    <div class="mb-2">
      <p class="mb-2">Status <span class="text-red-500">*</span></p>
      <GenericRadio
        :value="users.form.status"
        :options="[
          { value: 'active', label: 'active' },
          { value: 'inactive', label: 'inactive' },
        ]"
        @update:value="(e) => (users.form.status = e)"
      />
    </div>
    <GenericButton @click="users.setUser">Add User</GenericButton>
  </article>
</template>
<script setup>
const { $ruler, $error_message } = useNuxtApp();
const users = useUsersStore();

function check(value) {
  if (value) {
    users.error.email = $error_message.format;
  }
}
</script>
