export const useCommentsStore = defineStore("comments", () => {
  const { $interceptor, $error_message } = useNuxtApp();
  const errorStore = useErrorStore();

  const data = ref<any[]>([]);
  const pagination = ref({
    page: 1,
    limit: 10,
    pages: 0,
  })

  const form = ref({
    name: null,
    email: null,
    body: null,
  });

  const error = ref({
    name: "",
    email: "",
    body: "",
  });

  const validationForm = reactive({
    name: false,
    email: false,
    body: false,
  });

  async function getCommentsByPostId(id: number) {
    const posts = usePostsStore();
    posts.getPost(id);
    return $interceptor.get(`posts/${id}/comments?page=${pagination.value.page}&per_page=${pagination.value.limit}`).then((result: any) => {
      data.value = [...data.value, ...result.data];
      pagination.value = result.meta.pagination;
      if (pagination.value.page < pagination.value.pages) {
        pagination.value.page += 1;
      }
    }).catch((error: any) => {
      errorStore.setError(error.data);
    })
  }

  const validationChecker = computed(() => {
    Object.keys(form.value).map((key: any) => {
      if (
        (form.value[key as keyof typeof form.value] === "" || form.value[key as keyof typeof form.value] === null || !form.value[key as keyof typeof form.value]) &&
        (key == "name" || "email" || key == "body")
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

  function setComment(id: number) {
    if(!validationChecker.value) return;
    $interceptor.post(`posts/${id}/comments`, form.value).then(() => {
      data.value = [];
      pagination.value.page = 1;
      getCommentsByPostId(id);
    }).catch((error: any) => {
      errorStore.setError(error.data);
    })
  }

  return {
    data,
    form,
    error,
    validationForm,
    getCommentsByPostId,
    setComment,
  }
})