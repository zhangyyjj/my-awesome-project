import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    age: 18
  }),
  getters: { getUserInfo: (state) => state.userInfo },
  actions: {
    setUserInfo(info) {
      this.userInfo = info
    }
  },
  // 开启数据缓存 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key。
  // persist: {
  //   enabled: true
  // }

  //默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['userInfo']
      }
    ]
  }
})
