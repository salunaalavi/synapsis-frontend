<template>
  <article class="bg-slate-400 mb-4">
    <UserEdit :id="user.id" v-if="onEdit" @close="onEdit = false" />
    <template v-else>
      <div class="flex justify-between">
        <p>
          {{ user.name }}
        </p>
        <div class="flex gap-2">
          <GenericIcon name="tabler:edit" @click="changeEditState(true)" />
          <GenericIcon name="tabler:backspace" size="22" @click="users.deleteUser(user.id)" />
        </div>
      </div>
      <p>
        {{ user.email }}
      </p>
    </template>
  </article>
</template>
<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: {},
  },
});

const onEdit = ref(false);

function changeEditState(value) {
  users.onEdit = value;
  onEdit.value = users.onEdit;
  if (value) {
    users.editForm(props.user)
  }
}

const users = useUsersStore();

watch(() => users.onEdit, (value) => {
  if (!value) onEdit.value = value;
})

onMounted(() => {
  onEdit.value = users.onEdit;
})
</script>
