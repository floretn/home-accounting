<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{localizeFilter('Sum')}}</th>
        <th>{{localizeFilter('Date')}}</th>
        <th>{{localizeFilter('Category')}}</th>
        <th>{{localizeFilter('Type')}}</th>
        <th>{{localizeFilter('Open')}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{idx + 1}}</td>
        <td>{{currencyFilter(record.amount)}}</td>
        <td>{{dateFormatter(Date.parse(record.date), 'datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span
            :class="[record.typeClass]"
            class="white-text badge"
          >
            {{record.typeText}}
          </span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail-record/${record.id}`)"
            v-tooltip="localizeFilter('Open record')"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import currencyFilter from "@/filters/currency.filter"
import dateFormatter from "@/filters/date.filter"
import localizeFilter from "@/filters/localize.filter"

export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    currencyFilter, dateFormatter, localizeFilter
  }
}
</script>