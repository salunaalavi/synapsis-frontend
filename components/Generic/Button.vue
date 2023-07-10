<template>
  <button :class="color">
    <slot />
  </button>
</template>
<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
});
</script>
<style scoped lang="scss">
@import "../../assets/scss/libs/_variables";
@import "../../assets/scss/libs/_mixins";

button {
  padding: $spacer-1 $spacer-2;
  border-radius: $spacer-1;
  transition: 0.5s;
  @include p-regular;
  &.primary {
    background-color: $primary;
    color: white;
    &:hover {
      background-color: $primary;
    }
  }
  &.secondary {
    background-color: $secondary;
    color: white;
    &:hover {
      background-color: $primary;
    }
  }
  &.tertiary {
    background-color: $tertiary;
    color: black;
    &:hover {
      background-color: $primary;
    }
  }
  &.white {
    background-color: white;
    border: rgb(0, 0, 0, 0.3) solid 1px;
    color: black;
    &:hover {
      background-color: $primary;
    }
  }
}
</style>