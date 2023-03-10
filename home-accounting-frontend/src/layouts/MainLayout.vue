<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>

      <Navbar @clickA="isOpen = !isOpen" />
      <Sidebar v-bind:isOpen="isOpen" :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="localizeFilter('CreateRecord')" :key="locale">
          <i class="large material-icons">add</i>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/NavbarView.vue"
import Sidebar from "@/components/app/SidebarView.vue"
import messages from "@/utils/messages"
import localizeFilter from "@/filters/localize.filter"
import {useCookies} from "vue3-cookies"

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  setup () {
    const {cookies} = useCookies()
    return {cookies}
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
      const locale = this.$store.getters.info.locale
      if (locale !== this.cookies.get('locale')) {
        this.cookies.set('locale', locale)
      }
    }
    this.loading = false
  },
  components: {
    Navbar, Sidebar
  },
  computed: {
    locale() {
      //Вообще, и без этого всё работает, но на версиях ниже 3-ей не меняется, по идее. Так что вот на всякий сделаю
      return this.$store.getters.info.locale
    },
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || `${localizeFilter("Internal error")}!`)
    }
  },
  methods: {
    localizeFilter
  }
}
</script>