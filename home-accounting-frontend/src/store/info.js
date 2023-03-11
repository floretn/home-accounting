import {getDatabase, ref, get, update} from "firebase/database"
import * as rest from '@/utils/rest.utils'

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
                const info = await rest.getRequest(`http://localhost:8081/users/${await dispatch('getUid')}/info`
                    , await dispatch('getToken'))
                console.log(info.info)
                commit('setInfo', info.info)
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