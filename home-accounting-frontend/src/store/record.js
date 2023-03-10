import {getDatabase, ref, push, get} from "firebase/database"

export default {
    actions: {
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                return await push(ref(getDatabase(),`/users/${uid}/records`), record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const records = (await get(ref(getDatabase(),`/users/${uid}/records`))).val() || []
                return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecordById({dispatch, commit}, id) {
            try {
                const uid = await dispatch('getUid')
                const record = (await get(ref(getDatabase(),`/users/${uid}/records/${id}`))).val()
                return {...record, id: id}
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}