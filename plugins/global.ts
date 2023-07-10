export default defineNuxtPlugin(() => {
  const App = {
    debounce(fn: any, time: number | undefined) {
      let timer: any;
      return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, time || 300);
      };
    },
    useClickOutside(elTargetRef: any, fn: any) {
      if (!elTargetRef) return;

      const listener = (e: any) => {
        if (
          e.target == elTargetRef.value ||
          e.composedPath().includes(elTargetRef.value)
        ) {
          return;
        }
        if (typeof fn == "function") {
          fn();
        }
      };

      onMounted(() => {
        window.addEventListener("click", listener);
      });
      onBeforeUnmount(() => {
        window.removeEventListener("click", listener);
      });
      return {
        listener,
      };
    },
    ruler: {
      email: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
    },
    interceptor: {
      get: async (url: string, opts: any = {}) => {
        if (process.client) {
          const config = await useRuntimeConfig();
          const layouts = useLayoutsStore();
          return new Promise(async (resolve, reject) => {
            try {
              if (!opts.disableLoader) layouts.setLoading(true);
              const data = await $fetch(url, {
                ...opts,
                method: "get",
                baseURL: config.app.gorestApi,
                headers: {
                  "Content-Type": "application/json",
                },
              });
              resolve(data);
              layouts.setLoading(false);
            } catch (error) {
              reject(error);
              layouts.setLoading(false);
            }
          });
        }
      },
      post: async (url: string, data = {}, opts: any = {}) => {
        if (process.client) {
          const config = await useRuntimeConfig();
          const layouts = useLayoutsStore();
          return new Promise(async (resolve, reject) => {
            try {
              if (!opts.disableLoader) layouts.setLoading(true);
              const res = await $fetch(url, {
                ...opts,
                body: data,
                method: "post",
                baseURL: config.app.gorestApi,
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + config.app.gorestToken,
                },
              });
              resolve(res);
              layouts.setLoading(false);
            } catch (error) {
              reject(error);
              layouts.setLoading(false);
            }
          });
        }
      },
      put: async (url: string, data = {}, opts: any = {}) => {
        if (process.client) {
          const config = await useRuntimeConfig();
          const layouts = useLayoutsStore();
          return new Promise(async (resolve, reject) => {
            try {
              if (!opts.disableLoader) layouts.setLoading(true);
              const res = await $fetch(url, {
                ...opts,
                body: data,
                method: "put",
                baseURL: config.app.gorestApi,
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + config.app.gorestToken,
                },
              });
              resolve(res);
              layouts.setLoading(false);
            } catch (error) {
              reject(error);
              layouts.setLoading(false);
            }
          });
        }
      },
      delete: async (url: string, data = {}, opts: any = {}) => {
        if (process.client) {
          const config = await useRuntimeConfig();
          const layouts = useLayoutsStore();
          return new Promise(async (resolve, reject) => {
            try {
              if (!opts.disableLoader) layouts.setLoading(true);
              const res = await $fetch(url, {
                ...opts,
                body: data,
                method: "DELETE",
                baseURL: config.app.gorestApi,
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + config.app.gorestToken,
                },
              });
              resolve(res);
              layouts.setLoading(false);
            } catch (error) {
              reject(error);
              layouts.setLoading(false);
            }
          });
        }
      },
    },
    error_message: {
      required: 'Field required',
      format: 'Format not matched',
    },
  };
  return {
    provide: App,
  };
})