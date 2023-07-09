export default defineNuxtPlugin(() => {
  const App = {
    interceptor: {
      get: async (url: string, opts: any = {}) => {
        if (process.client) {
          const config = await useRuntimeConfig();
          return new Promise(async (resolve, reject) => {
            try {
              const data = await $fetch(url, {
                ...opts,
                method: "get",
                baseURL: config.app.redcommApi,
                headers: {
                  "Content-Type": "application/json",
                },
              });
              resolve(data);
            } catch (error) {
              reject(error);
            }
          });
        }
      },
      post: async (url: string, data = {}, opts = {}) => {
        if (process.client) {
          const config = await useRuntimeConfig();
          return new Promise(async (resolve, reject) => {
            try {
              const res = await $fetch(url, {
                ...opts,
                body: data,
                method: "post",
                baseURL: config.app.redcommApi,
                headers: {
                  "Content-Type": "application/json",
                },
              });
              resolve(res);
            } catch (error) {
              reject(error);
            }
          });
        }
      },
      put: async (url: string, data = {}, opts = {}) => {
        if (process.client) {
          const config = await useRuntimeConfig();
          return new Promise(async (resolve, reject) => {
            try {
              const res = await $fetch(url, {
                ...opts,
                body: data,
                method: "put",
                baseURL: config.app.redcommApi,
                headers: {
                  "Content-Type": "application/json",
                },
              });
              resolve(res);
            } catch (error) {
              reject(error);
            }
          });
        }
      },
      delete: async (url: string, data = {}, opts = {}) => {
        if (process.client) {
          const config = await useRuntimeConfig();
          return new Promise(async (resolve, reject) => {
            try {
              const res = await $fetch(url, {
                ...opts,
                body: data,
                method: "DELETE",
                baseURL: config.app.redcommApi,
                headers: {
                  "Content-Type": "application/json",
                },
              });
              resolve(res);
            } catch (error) {
              reject(error);
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