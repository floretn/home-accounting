<template>
  <div>
    <div class="page-title">
      <h3>{{localizeFilter('PlanningTitle')}}</h3>
      <h4>{{currencyFilter(info.bill)}}</h4>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      {{localizeFilter('NoCategories')}}. <router-link to="/categories">{{localizeFilter('AddCategory')}}...</router-link>
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p style="font-size: 16px">
          <strong>{{category.title}}:</strong>
          {{currencyFilter(category.spend)}} {{localizeFilter('from')}} {{currencyFilter(category.limit)}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader.vue"
import {mapGetters} from "vuex"
import currencyFilter from "@/filters/currency.filter"
import localizeFilter from "@/filters/localize.filter"
import {useMeta} from "vue-meta";

export default {
  name: 'planingView',
  components: {Loader},
  setup() {
    useMeta({
      title: `${localizeFilter('PlanningTitle')}`
    })
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(category => {
      const spend = records
        .filter(record => record.categoryId === category.id && record.type === 'outcome')
        .reduce((total, record) => total + +record.amount, 0)
      const percent = 100 * spend / category.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      const tooltipValue = category.limit - spend
      const tooltip = `${tooltipValue < 0 ? localizeFilter('Exceeding by') : localizeFilter('Left')} ${this.currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...category,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  },
  methods: {
    localizeFilter,
    currencyFilter
  }
}
</script>