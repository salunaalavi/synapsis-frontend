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
    user: {},
    user_id: null,
  });

  const error = ref({
    name: "",
    email: "",
    title: "",
    body: "",
    user: "",
    user_id: "",
  });

  const validationForm = reactive({
    name: false,
    email: false,
    title: false,
    body: false,
    user: false,
    user_id: false,
  });

  async function getPosts() {
    return $interceptor.get(`posts?page=${pagination.value.page}&per_page=${pagination.value.limit}`).then((result: any) => {
      data.value = [...data.value, ...result];
      pagination.value.page += 1;
    }).catch((error: any) => {
      errorStore.setError({ ...error, ...error.data });
    })
  }

  async function getPost(id: number) {
    const users = useUsersStore();

    return $interceptor.get(`posts/${id}`).then((result: any) => {
      datum.value = result;
      users.getUser(result.user_id);
    }).catch((error: any) => {
      errorStore.setError({ ...error, ...error.data });
    })
  }

  const validationChecker = computed(() => {
    Object.keys(form.value).map((key: any) => {
      if (
        (form.value[key as keyof typeof form.value] === "" || form.value[key as keyof typeof form.value] === null || !form.value[key as keyof typeof form.value]) &&
        (key == "name" || key == "email" || key == "title" || key == "body" || key == "user_id")
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
    if (!validationChecker.value) return;
    $interceptor.post(`posts`, form.value).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getPosts();
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
    getPosts,
    getPost,
    setPost,
  }
})