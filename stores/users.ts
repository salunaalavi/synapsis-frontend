export const useUsersStore = defineStore("users", () => {
  const { $interceptor, $error_message } = useNuxtApp();
  const errorStore = useErrorStore();

  const data = ref<any[]>([]);
  const datum = ref(null);
  const keyword = ref("");
  const onEdit = ref(false);
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
      data.value = [...data.value, ...result.data];
      pagination.value = result.meta.pagination;
      if (pagination.value.page < pagination.value.pages) {
        pagination.value.page += 1;
      }
    }).catch((error: any) => {
      errorStore.setError(error.data);
    })
  }

  async function getUser(id: number) {
    return $interceptor.get(`users/${id}`).then((result: any) => {
      datum.value = result.data;
    }).catch((error: any) => {
      errorStore.setError(error.data);
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
    if(!validationChecker.value) return;
    $interceptor.post(`users`, form.value).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getUsers();
    }).catch((error: any) => {
      errorStore.setError(error.data);
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
    if(!validationChecker.value) return;
    $interceptor.put(`users/${id}`, form.value).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getUsers();
      resetForm();
    }).catch((error: any) => {
      errorStore.setError(error.data);
    })
  }

  function deleteUser(id: number) {
    $interceptor.delete(`users/${id}`).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getUsers();
    }).catch((error: any) => {
      errorStore.setError(error.data);
    })
  }

  return {
    data,
    datum,
    form,
    error,
    validationForm,
    onEdit,
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