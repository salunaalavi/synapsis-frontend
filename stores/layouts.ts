export const useLayoutsStore = defineStore("layouts", () => {
  const loading = ref(true);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  return {
    setLoading,
    loading,
  };
});
