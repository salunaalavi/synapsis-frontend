<template>
  <main class="users">
    <aside class="users__aside">
      <div class="flex flex-col">
        <GenericInput
          v-model:value="keyword"
          label="Search User"
          placeholder="Use prefix '@' to search by email"
        />
        <GenericButton
          class="flex justify-center gap-2 items-center"
          color="secondary"
          @click="searchUser(keyword)"
        >
          <Icon name="carbon:search" size="20" />Search User</GenericButton
        >
      </div>
      <GenericButton
        class="flex justify-center gap-2 items-center"
        @click="openModal"
      >
        <Icon name="ph:plus-bold" size="20" />Add User</GenericButton
      >
    </aside>
    <section class="users__content">
      <template v-for="(user, index) in users.data" :key="index">
        <UserCard :user="user" />
      </template>
      <p v-if="users.data.length === 0" class="text-center">No Data...</p>
      <GenericObserver
        v-if="!onSearch"
        class="pb-1"
        @intersect="users.getUsers"
      />
    </section>
    <GenericModal
      v-model:is-open="modalData.isOpen"
      :content-position="modalData.contentPosition"
      :is-full-height="modalData.isFullheight"
      :width="modalData.width"
      :max-width="modalData.maxWidth"
    >
      <UserCreate />
    </GenericModal>
  </main>
</template>
<script setup>
const users = useUsersStore();
const onSearch = ref(false);
const keyword = ref("");
const modalData = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  width: 400,
  maxWidth: 600,
});

function openModal() {
  users.resetForm();
  users.onEdit = false;
  modalData.isOpen = true;
}

async function searchUser(value) {
  onSearch.value = true;
  users.searchUser(value);
  await users.getUsers();
  if (users.data.length > 0) onSearch.value = false;
}

onBeforeRouteLeave(() => {
  users.onEdit = false;
});

useServerSeoMeta({
  title: "All Users",
});

useHead({
  title: "All Users",
});
</script>
