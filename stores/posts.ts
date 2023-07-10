export const usePostsStore = defineStore("posts", () => {
  const { $interceptor, $error_message } = useNuxtApp();
  const errorStore = useErrorStore();

  const data = ref<any[]>([]);
  const datum = ref(null);
  const pagination = ref({
    page: 1,
    limit: 10,
    pages: 0,
  })

  const form = ref({
    name: null,
    email: null,
    title: null,
    body: null,
  });

  const error = ref({
    name: "",
    email: "",
    title: "",
    body: "",
  });

  const validationForm = reactive({
    name: false,
    email: false,
    title: false,
    body: false,
  });

  async function getPosts() {
    return $interceptor.get(`posts?page=${pagination.value.page}&per_page=${pagination.value.limit}`).then((result: any) => {
      data.value = [...data.value, ...result.data];
      pagination.value = result.meta.pagination;
      if (pagination.value.page < pagination.value.pages) {
        pagination.value.page += 1;
      }
    }).catch((error: any) => {
      errorStore.setError(error.data);
    })
  }

  async function getPost(id: number) {
    const users = useUsersStore();

    return $interceptor.get(`posts/${id}`).then((result: any) => {
      datum.value = result.data;
      users.getUser(result.data.user_id);
    }).catch((error: any) => {
      errorStore.setError(error.data);
    })
  }

  const validationChecker = computed(() => {
    Object.keys(form.value).map((key: any) => {
      if (
        (form.value[key as keyof typeof form.value] === "" || form.value[key as keyof typeof form.value] === null || !form.value[key as keyof typeof form.value]) &&
        (key == "name" || key == "email" || key == "title" || key == "body")
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

  function setPost() {
    if(!validationChecker.value) return;
    $interceptor.post(`posts`, form.value).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getPosts();
    }).catch((error: any) => {
      errorStore.setError(error.data);
    })
  }

  function resetForm() {
    Object.keys(form.value).map((key) => {
      form.value[key as keyof typeof form.value] = null;
    })
  }

  return {
    data,
    datum,
    form,
    error,
    validationForm,
    getPosts,
    getPost,
    setPost,
  }
})