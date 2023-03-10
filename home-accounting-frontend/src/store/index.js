import { createStore } from 'vuex'
import auth from './auth'
import info from "@/store/info"
import category from "@/store/category"
import record from "@/store/record"

export default createStore({
  state: {
    error: null,
    locale: 'ru-RU'
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
  },
  modules: {
    auth, info, category, record
  }
})
