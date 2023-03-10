import {getDatabase, ref, get, update} from "firebase/database"

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async updateInfo({dispatch, commit, getters}, toUpdateInfo) {
            try {
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdateInfo}
                await update(ref(getDatabase(), `/users/${uid}/info/`), updateData)
                commit('setInfo', updateData)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await get(ref(getDatabase(), `/users/${uid}/info`))).val()
                commit('setInfo', info)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}