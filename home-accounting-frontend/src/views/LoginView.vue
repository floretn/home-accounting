<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{localizeFilter('Home accounting', getLocale())}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.email.$invalid)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="(v$.email.$dirty && v$.email.required.$invalid)"
        >
          {{localizeFilter('Enter', getLocale())}} Email!
        </small>
        <small
          class="helper-text invalid"
          v-else-if="(v$.email.$dirty && v$.email.email.$invalid)"
        >
          {{localizeFilter('Enter correct', getLocale())}} Email!
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)}"
        >
        <label for="password">{{localizeFilter('Password', getLocale())}}</label>
        <small
          class="helper-text invalid"
          v-if="(v$.password.$dirty && v$.password.required.$invalid)"
        >
          {{localizeFilter('Enter password', getLocale())}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="(v$.password.$dirty && v$.password.minLength.$invalid)"
        >
          {{localizeFilter('Min length', getLocale())}}: {{v$.password.minLength.$params.min}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{localizeFilter('Login', getLocale())}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{localizeFilter('No account', getLocale())}}?
        <router-link :to="'/register'">{{localizeFilter('Registration', getLocale())}}</router-link>
      </p>


      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" v-on:click="changeLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import messages from "@/utils/messages"
import localizeFilter from "@/filters/localize.filter"
import { useCookies } from "vue3-cookies"
import {useMeta} from "vue-meta";

export default {
  name: 'loginView',
  setup () {
    useMeta({
      title: `${localizeFilter('Login', document.cookie.includes('locale=en-US') ? 'en-US' : 'ru-RU')}`
    })
    const {cookies} = useCookies()
    return {v$: useVuelidate(), cookies}
  },
  data: () => ({
    email: '',
    password: '',
    isRuLocale: true
  }),
  validations() {
    return {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    }
  },
  created() {
    let locale = this.cookies.get('locale')
    if (locale === null) {
      locale = 'ru-RU'
      alert(messages['usingCookie'])
    }
    this.isRuLocale = locale !== 'en-US'
    this.setLocale()
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    localizeFilter,
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch (e) {
        // console.error(e)
      }
    },
    changeLocale() {
      this.isRuLocale = !this.isRuLocale
      this.setLocale()
    },
    setLocale() {
      this.$store.commit('clearInfo')
      this.$store.commit('setInfo', {locale: this.getLocale()})
      this.cookies.set('locale', this.getLocale())
    },
    getLocale() {
      return this.isRuLocale ? 'ru-RU' : 'en-US'
    },
    getLocaleFromCookie() {
      console.log('Tut')
      return this.cookies.get('locale')
    }
  }
}
</script>