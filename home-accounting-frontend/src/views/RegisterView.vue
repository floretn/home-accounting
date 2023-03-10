<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{localizeFilter('Home accounting')}}</span>
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
          {{localizeFilter('Enter')}} Email!
        </small>
        <small
          class="helper-text invalid"
          v-else-if="(v$.email.$dirty && v$.email.email.$invalid)"
        >
          {{localizeFilter('Enter correct')}} Email!
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)}"
        >
        <label for="password">{{localizeFilter('Password')}}</label>
        <small
          class="helper-text invalid"
          v-if="(v$.password.$dirty && v$.password.required.$invalid)"
        >
          {{localizeFilter('Enter password')}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="(v$.password.$dirty && v$.password.minLength.$invalid)"
        >
          {{localizeFilter('Min length')}}: {{v$.password.minLength.$params.min}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="passwordConfirmed"
          type="password"
          v-model="passwordConfirmed"
          :class="{invalid: password !== passwordConfirmed}"
        >
        <label for="passwordConfirmed">{{localizeFilter('Confirm password')}}</label>
        <small
          class="helper-text invalid"
          v-if="password !== passwordConfirmed"
        >
          {{localizeFilter('Passwords don\'t match')}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="nameUser"
          :class="{invalid: (v$.nameUser.$dirty && v$.nameUser.required.$invalid) || (v$.nameUser.$dirty && v$.nameUser.minLength.$invalid)}"
        >
        <label for="name">{{localizeFilter('NameUser')}}</label>
        <small
          class="helper-text invalid"
          v-if="(v$.nameUser.$dirty && v$.nameUser.required.$invalid)"
        >
          {{localizeFilter('MessageEnterName')}}!
        </small>
        <small
          class="helper-text invalid"
          v-else-if="(v$.nameUser.$dirty && v$.nameUser.minLength.$invalid)"
        >
          {{localizeFilter('Min length')}}: {{v$.nameUser.minLength.$params.min}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agreeBox"/>
          <span>{{localizeFilter('RulesAgree')}}</span>
        </label>
      </p>
      <small
        class="helper-text invalid"
        v-if="(v$.agreeBox.$dirty && v$.agreeBox.checked.$invalid)"
      >
        {{localizeFilter('NeedAgree')}}!
      </small>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :class="{disabled: !agreeBox}"
        >
          {{localizeFilter('Registration')}}
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{localizeFilter('AccountExists')}}?
        <router-link :to="'/login'">{{localizeFilter('Login')}}!</router-link>
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
import {required, email, minLength} from '@vuelidate/validators'
import localizeFilter from "@/filters/localize.filter"
import {get} from "firebase/database"
import {useCookies} from "vue3-cookies"
import messages from "@/utils/messages"
import {useMeta} from "vue-meta";

export default {
  name: 'registerView',
  setup () {
    useMeta({
      title: `${localizeFilter('Registration')}`
    })
    const {cookies} = useCookies()
    return {v$: useVuelidate(), cookies}
  },
  data: () => ({
    email: '',
    password: '',
    passwordConfirmed: '',
    nameUser: '',
    agreeBox: false,
    isRuLocale: true
  }),
  validations() {
    return {
      email: {email, required},
      password: {required, minLength: minLength(8)},
      nameUser: {required, minLength: minLength(2)},
      agreeBox: {checked: v => v}
    }
  },
  mounted() {
    let locale = this.cookies.get('locale')
    if (locale === null) {
      locale = 'ru-RU'
      alert(messages['usingCookie'])
    }
    this.isRuLocale = locale !== 'en-US'
    this.setLocale()
  },
  methods: {
    get,
    localizeFilter,
    async submitHandler() {
      if (this.v$.$invalid || this.password !== this.passwordConfirmed) {
        this.v$.$touch()
        return
      }
      try {
        await this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
          nameUser: this.nameUser,
          locale: this.getLocale()
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
    }
  }
}
</script>