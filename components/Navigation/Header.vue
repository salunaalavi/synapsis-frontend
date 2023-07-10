<template>
  <header class="main__header">
    <nav class="main__header--nav">
      <nuxt-link :to="{ name: 'index' }">Dashboard</nuxt-link>
      <nuxt-link :to="{ name: 'users' }">Users</nuxt-link>
    </nav>
    <nav class="main__header--nav mobile">
      <GenericButton color="tertiary" @click="modalData.isOpen = true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0
      011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0
      01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Menu
      </GenericButton>
    </nav>
    <GenericModal
      v-model:is-open="modalData.isOpen"
      :content-position="modalData.contentPosition"
      :is-full-height="modalData.isFullheight"
      :max-width="modalData.maxWitdh"
      @update:isOpen="(val) => modalData.isOpen = val"
    >
      <aside class="main__header--aside">
        <nuxt-link :to="{ name: 'index' }">Dashboard</nuxt-link>
        <nuxt-link :to="{ name: 'users' }">Users</nuxt-link>
      </aside>
    </GenericModal>
  </header>
</template>
<script setup>

const modalData = reactive({
  isOpen: false,
  contentPosition: "right",
  isFullheight: true,
  maxWitdh: 400,
  title: "",
});
</script>
