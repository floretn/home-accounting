<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{localizeFilter('Currency account')}}</span>

        <p
          v-for="cur of currencies"
          :key="cur"
          class="currency-line"
        >
          <span>
            {{getCurrency(cur)}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import currencyFilter from "@/filters/currency.filter"
import localizeFilter from "@/filters/localize.filter"

export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    }
  },
  methods: {
    localizeFilter,
    getCurrency(currency) {
      return currencyFilter(Math.floor(this.base * this.rates[currency]), currency)
    }
  }
}
</script>