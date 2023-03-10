import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {getDatabase, ref, set} from "firebase/database"

export default {
    actions: {
        // eslint-disable-next-line no-unused-vars
        async login({dispatch, commit}, {email, password}) {
            // eslint-disable-next-line no-useless-catch
            try {
                await signInWithEmailAndPassword(getAuth(), email, password)
                commit('clearInfo')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        // eslint-disable-next-line no-unused-vars
        async register({dispatch, commit}, {email, password, nameUser, locale = 'ru-RU'}) {
            // eslint-disable-next-line no-useless-catch
            try {
                await createUserWithEmailAndPassword(getAuth(), email, password)
                const uid = await dispatch('getUid')
                await set(ref(getDatabase(),`/users/${uid}/info`), {
                    bill: 0,
                    name: nameUser,
                    locale: locale
                })
                commit('clearInfo')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = getAuth().currentUser
            return user ? user.uid : null
        },
        async logout({commit}) {
            await signOut(getAuth())
            await commit('clearInfo')
        }
    }
}