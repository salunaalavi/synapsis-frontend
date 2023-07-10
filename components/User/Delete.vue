<template>
  <section class="user-delete">
    <p class="user-delete__body">Delete User?</p>
    <article class="user-delete__view">
      <p>
        {{ user.name }}
      </p>
      <p>
        {{ user.email }}
      </p>
    </article>
    <GenericButton class="user-delete__button" color="error" @click="deleteUser(user.id)"
      >Confirm</GenericButton
    >
  </section>
</template>
<script setup>
defineProps({
  user: {
    type: Object,
    default: {},
  }
});
const emit = defineEmits(["close"])

const users = useUsersStore();

async function deleteUser(id) {
  await users.deleteUser(id);
  emit("close")
}
</script>
