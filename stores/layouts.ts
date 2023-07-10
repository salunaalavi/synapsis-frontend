export const useLayoutsStore = defineStore("layouts", () => {
  const loading = ref(false);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  return {
    setLoading,
    loading,
  };
});
