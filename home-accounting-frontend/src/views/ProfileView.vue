<template>
  <div>
    <div class="page-title">
      <h3>{{localizeFilter("ProfileTitle")}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          v-model.trim="nameUser"
          id="description"
          type="text"
          :class="{invalid: v$.nameUser.$dirty && v$.nameUser.required.$invalid}"
        >
        <label for="description">{{localizeFilter("NameUser")}}</label>
        <span
          class="helper-text invalid"
          v-if="v$.nameUser.$dirty && v$.nameUser.required.$invalid"
        >
          {{localizeFilter("MessageEnterName")}}
        </span>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{localizeFilter("Update")}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import {required} from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import localizeFilter from "@/filters/localize.filter"
import {useCookies} from "vue3-cookies"
import {useMeta} from 'vue-meta'

export default {
  name: 'profileView',
  setup () {
    useMeta({
      title: `${localizeFilter('ProfileTitle')}`
    })
    const {cookies} = useCookies()
    return {v$: useVuelidate(), cookies}
  },
  data: () => ({
    nameUser: '',
    isRuLocale: true
  }),
  validations() {
    return {
      nameUser: {required}
    }
  },
  mounted() {
    this.nameUser = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    // eslint-disable-next-line no-undef
    setTimeout(() => M.updateTextFields(), 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    localizeFilter,
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        const locale = this.isRuLocale ? 'ru-RU' : 'en-US'
        await this.updateInfo({
          name: this.nameUser,
          locale: locale
        })
        if (locale !== this.cookies.get('locale')) {
          this.cookies.set('locale', locale)
        }
        document.title = `${localizeFilter('ProfileTitle')} | ${localizeFilter('Home accounting')}`
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>