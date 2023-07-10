export const useUsersStore = defineStore("users", () => {
  const { $interceptor, $error_message } = useNuxtApp();
  const errorStore = useErrorStore();

  const data = ref<any[]>([]);
  const datum = ref(null);
  const keyword = ref("");
  const pagination = ref({
    page: 1,
    limit: 10,
    pages: 0,
  });

  const form = ref({
    name: null,
    email: null,
    gender: null,
    status: null,
  });

  const error = ref({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const validationForm = reactive({
    name: false,
    email: false,
    gender: false,
    status: false,
  });

  async function getUsers() {
    return $interceptor.get(`users?page=${pagination.value.page}&per_page=${pagination.value.limit}${keyword.value !== "" && keyword.value.charAt(0) != "@" ? "&name=" + keyword.value : keyword.value.charAt(0) === "@" && keyword.value.substring(1) !== "" ? "&email=" + keyword.value.substring(1) : ""}`, { disableLoader: keyword.value !== "", }).then((result: any) => {
      data.value = [...data.value, ...result];
      pagination.value.page += 1;
    }).catch((error: any) => {
      errorStore.setError({ ...error, ...error.data });
    })
  }

  async function getUser(id: number) {
    return $interceptor.get(`users/${id}`).then((result: any) => {
      datum.value = result;
    }).catch((error: any) => {
      errorStore.setError({ ...error, ...error.data });
    })
  }

  function searchUser(string: string) {
    keyword.value = string;
    data.value = [];
    pagination.value.page = 1;
  }

  const validationChecker = computed(() => {
    Object.keys(form.value).map((key: any) => {
      if (
        (form.value[key as keyof typeof form.value] === "" || form.value[key as keyof typeof form.value] === null || !form.value[key as keyof typeof form.value]) &&
        (key == "name" || key == "email")
      ) {
        error.value[key as keyof typeof form.value] = $error_message.required;
        validationForm[key as keyof typeof form.value] = true;
        return false;
      }
    });
    if (Object.values(validationForm).some((val) => val)) {
      return false;
    }
    return true;
  })

  function setUser() {
    if (!validationChecker.value) return;
    $interceptor.post(`users`, form.value).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getUsers();
      errorStore.setSuccess(true);
    }).catch((error: any) => {
      errorStore.setError({ ...error, ...error.data });
    })
  }

  function resetForm() {
    Object.keys(form.value).map((key) => {
      form.value[key as keyof typeof form.value] = null;
    })
  }

  function editForm(value: any) {
    form.value = {
      ...form.value,
      ...value,
    }
  }

  function editUser(id: number) {
    if (!validationChecker.value) return;
    $interceptor.put(`users/${id}`, form.value).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getUsers();
      resetForm();
      errorStore.setSuccess(true);
    }).catch((error: any) => {
      errorStore.setError({ ...error, ...error.data });
    })
  }

  async function deleteUser(id: number) {
    return $interceptor.delete(`users/${id}`).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getUsers();
      errorStore.setSuccess(true);
    }).catch((error: any) => {
      errorStore.setError({ ...error, ...error.data });
    })
  }

  return {
    data,
    datum,
    form,
    error,
    validationForm,
    getUsers,
    getUser,
    searchUser,
    setUser,
    editForm,
    editUser,
    resetForm,
    deleteUser,
  }
})