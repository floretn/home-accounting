<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
      :router-link-exact-active="link.url"
      exact-active-class="active"
    >
      <li>
        <a href="#" class="waves-effect waves-orange pointer">{{localizeFilter(link.title)}}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter"
export default {
  props: ['isOpen'],
  data: () => ({
    links: [
      {title: 'AccountTitle', url: '/', exact: false},
      {title: 'HistoryTitle', url: '/history'},
      {title: 'PlanningTitle', url: '/planning'},
      {title: 'RecordTitle', url: '/record'},
      {title: 'CategoryTitle', url: '/categories'}
    ]
  }),
  methods: {
    localizeFilter
  }
}
</script>