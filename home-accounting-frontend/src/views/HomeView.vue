<template>
  <div>
    <div class="page-title">
      <h3>{{localizeFilter('AccountTitle')}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div v-else class="row">
      <HomeBill
        :rates="currency.rates"
      />
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue"
import HomeCurrency from "@/components/HomeCurrency.vue"
import Loader from "@/components/app/Loader.vue"
import dateFormatter from "@/filters/date.filter"
import localizeFilter from "@/filters/localize.filter"
import {useMeta} from "vue-meta";

export default {
  name: 'homeView',
  setup() {
    useMeta({
      title: `${localizeFilter('Bill')}`
    })
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    // Сорян, но эти чуваки из fixer-а теперь дают только 100 запросов / месяц по бесплатному тарифу.
    // Идут лесом, fetch я делать и без них умею, а валюты пусть примерные будут.
    // this.currency = await this.$store.dispatch('fetchCurrency')
    // Если кто не понял, то здесь я делаю задержку, чтобы сэмулировать задержку времени из-за запроса к сайту fixer.io.
    // fixer - сайт, для получения курса валют (в currency кладу объект, который пришёл бы с этого сайта).
    // TODO: сделать это под конец, когда останется 100 запросов чисто потестить приложуху целиком:))))
    setTimeout(() => this.loading = false, 1500)
    this.currency = {rates: {EUR: 1, USD: 1.2, RUB: 75}, date: dateFormatter(new Date())}
  },
  methods: {
    localizeFilter,
    async refresh() {
      this.loading = true
      // this.currency = await this.$store.dispatch('fetchCurrency')
      setTimeout(() => this.loading = false, 1500)
      this.currency = {rates: {EUR: 1, USD: 1.2, RUB: 75}, date: dateFormatter(new Date())}
    }
  },
  components: {
    Loader,
    HomeBill, HomeCurrency
  }
}
</script>
