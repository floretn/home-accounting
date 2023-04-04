import {getAuth, createUserWithEmailAndPassword, signOut} from "firebase/auth"
import {getDatabase, ref, set} from "firebase/database"

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                const response = await fetch(`http://localhost:8081/login`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                if (response.status === 401) {
                    const e = new Error('')
                    e.code = 'auth/wrong-email-or-password'
                    throw e
                } else if (!response.ok)
                    throw new Error(response.status + '')

                const loginInfoResp = await response.json()
                localStorage.setItem("user", JSON.stringify(loginInfoResp))
                commit('clearInfo')
            } catch (e) {
                console.error(e)
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, nameUser, locale = 'ru-RU'}) {
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
            const uid = JSON.parse(localStorage.getItem("user")).userId
            console.log(uid)
            return uid ? uid : null
        },
        getToken() {
            const token = JSON.parse(localStorage.getItem("user")).token
            return token ? token : null
        },
        async logout({commit}) {
            await signOut(getAuth())
            await commit('clearInfo')
        }
    }
}