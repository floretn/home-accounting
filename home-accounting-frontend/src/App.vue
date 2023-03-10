<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | ${localizeFilter('Home accounting')}`
      : `${localizeFilter('Home accounting')}` }}</template>
  </metainfo>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout.vue"
import MainLayout from "@/layouts/MainLayout.vue"
import { useMeta } from 'vue-meta'
import localizeFilter from "@/filters/localize.filter"

export default {
  setup () {
    useMeta({
      title: ''
    })
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    EmptyLayout, MainLayout
  },
  methods: {localizeFilter}
}
</script>

<style lang="scss">
  @import "~materialize-css/dist/css/materialize.min.css";
  @import "assets/index.css";
</style>
