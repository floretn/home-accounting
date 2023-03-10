import {getDatabase, ref, push, get, update} from "firebase/database"

export default {
    actions: {
        async fetchCategories({commit, dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await get(ref(getDatabase(),`/users/${uid}/categories`))).val() || {}
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById({commit, dispatch}, id) {
            try {
                const uid = await dispatch('getUid')
                const category = (await get(ref(getDatabase(),`/users/${uid}/categories/${id}`))).val()
                return {...category, id: id}
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({commit, dispatch}, categoryInfo) {
            try {
                const uid = await dispatch('getUid')
                await update(ref(getDatabase(),`/users/${uid}/categories/${categoryInfo.id}`), categoryInfo)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async createCategory({commit, dispatch}, categoryInfo) {
            try {
                const uid = await dispatch('getUid')
                const category = await push(ref(getDatabase(),`/users/${uid}/categories`), categoryInfo)
                categoryInfo.id = category.key
                return categoryInfo
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    }
}