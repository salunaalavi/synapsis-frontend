<template>
  <GenericLoader v-if="layouts.loading" />
  <div class="main">
    <NavigationHeader />
    <slot />
  </div>
  <GenericModal
    v-model:is-open="modalData.isOpen"
    :content-position="modalData.contentPosition"
    :is-full-height="modalData.isFullheight"
    :width="modalData.width"
    :max-width="modalData.maxWidth"
    @update:is-open="closeError"
  >
    <GenericError>
      {{ error.data?.data.message }}
    </GenericError>
  </GenericModal>
</template>
<script setup>
const layouts = useLayoutsStore();
const error = useErrorStore();

const modalData = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  width: 400,
  maxWidth: 600,
});

function closeError(value) {
  if (!value) {
    error.setError(null);
  }
  modalData.isOpen = value;
}

watch(
  () => error.data,
  (value) => {
    if (value) {
      modalData.isOpen = true;
    } else {
      modalData.isOpen = false;
    }
  }
);
</script>
