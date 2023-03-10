<template>
  <h1>{{localizeFilter('Oops')}}......</h1>
  <h3>{{localizeFilter('PageNotFound')}}:(</h3>
</template>

<script>
import localizeFilter from "@/filters/localize.filter"
import {useMeta} from "vue-meta";

export default {
  setup() {
    useMeta({
      title: `${localizeFilter('Page not found')}`
    })
  },
  methods: {localizeFilter}
}
</script>