<template>
  <article class="user-card">
    <section class="user-card__profile">
      <div class="user-card__profile--data">
        <img
          class="gravatar rounded-full"
          alt="Gravatar"
          src="https://gravatar.com/avatar/2516ab3fbabaf86e8477ae1cd52bf102?default=mm"
          width="125"
        />
        <div class="user-card__profile--data-hero">
          <h3>
            {{ user.name }}
          </h3>
          <a :href="`mailto:${user.email}`">
            {{ user.email }}
          </a>
          <p>
            {{ user.gender }}
          </p>
          <p>
            {{ user.status }}
          </p>
        </div>
      </div>
      <div class="user-card__profile--data-action">
        <GenericIcon
          name="tabler:edit"
          color="tertiary"
          @click="changeEditState(true)"
        />
        <GenericIcon
          name="tabler:trash"
          color="error"
          size="22"
          @click="deleteModal.isOpen = true"
        />
      </div>
    </section>
  </article>
  <GenericModal
    v-model:is-open="editModal.isOpen"
    :content-position="editModal.contentPosition"
    :is-full-height="editModal.isFullheight"
    :width="editModal.width"
    :max-width="editModal.maxWidth"
  >
    <UserEdit :id="user.id" @close="changeEditState(false)" />
  </GenericModal>
  <GenericModal
    v-model:is-open="deleteModal.isOpen"
    :content-position="deleteModal.contentPosition"
    :is-full-height="deleteModal.isFullheight"
    :width="deleteModal.width"
    :max-width="deleteModal.maxWidth"
  >
    <UserDelete :user="user" @close="deleteModal.isOpen = false"/>
  </GenericModal>
</template>
<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: {},
  },
});

const users = useUsersStore();
const editModal = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  width: 400,
  maxWidth: 600,
});
const deleteModal = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  width: 400,
  maxWidth: 600,
});

function changeEditState(value) {
  editModal.isOpen = value;
  if (value) {
    users.editForm(props.user);
  }
}
</script>
