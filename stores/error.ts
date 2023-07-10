export const useErrorStore = defineStore("error", () => {
  const data = ref(null);

  function setError(value: any) {
    data.value = value;
  }

  return {
    data,
    setError,
  }
})