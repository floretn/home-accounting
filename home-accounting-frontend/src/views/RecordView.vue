<template>
  <div>
    <div class="page-title">
      <h3>{{localizeFilter('RecordTitle')}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
      {{localizeFilter('NoCategories')}}. <router-link to="/categories">{{localizeFilter('AddCategory')}}}...</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="categorySelect" v-model="category">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >
            {{ c.title }}
          </option>
        </select>
        <label>{{localizeFilter('ChooseCategory')}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{localizeFilter('Income')}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{localizeFilter('Outcome')}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: (v$.amount.$dirty && v$.amount.required.$invalid) || (v$.amount.$dirty && v$.amount.minValue.$invalid)}"
        >
        <label for="amount">{{localizeFilter('Sum')}}</label>
        <span
          v-if="v$.amount.$dirty && v$.amount.required.$invalid"
          class="helper-text invalid"
        >
          {{localizeFilter('Enter sum')}}!
        </span>
        <span
          v-else-if="v$.amount.$dirty && v$.amount.minValue.$invalid"
          class="helper-text invalid"
        >
          {{localizeFilter('MinValue')}}: {{ v$.amount.minValue.$params.min }}!
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: v$.description.$dirty && v$.description.required.$invalid}"
        >
        <label for="description">{{localizeFilter('Description')}}</label>
        <span
          v-if="v$.description.$dirty && v$.description.required.$invalid"
          class="helper-text invalid"
        >
          {{localizeFilter('Enter description')}}!
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{localizeFilter('Create')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader.vue"
import useVuelidate from "@vuelidate/core"
import {minValue, required} from "@vuelidate/validators"
import {mapGetters} from "vuex"
import localizeFilter from "@/filters/localize.filter"
import {useMeta} from "vue-meta";

export default {
  name: 'recordView',
  components: {Loader},
  setup() {
    useMeta({
      title: `${localizeFilter('RecordTitle')}`
    })
    return {v$: useVuelidate()}
  },
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: null,
    description: ''
  }),
  validations() {
    return {
      amount: {required, minValue: minValue(1)},
      description: {required}
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      //Из-за того, что выставляем ладинг, то форма перерисовывается и поэтому селект может не сформироваться
      //Поэтому делаем небольшую задержку
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.categorySelect, {}, {})
    }, 0)
  },
  beforeUnmount() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    localizeFilter,
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      try {
        if (this.canCreateRecord) {
          this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill: bill})
          this.$message(`${localizeFilter('SuccessRecordCreate')}!`)
          this.v$.reset()
          this.amount = null
          this.description = ''
        } else {
          this.$message(`${localizeFilter('NoEnoughMoney')} (${this.amount - this.info.bill})!`)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>