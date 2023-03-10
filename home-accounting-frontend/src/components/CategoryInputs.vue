<template>
  <form @submit.prevent="submitHandler">

    <div class="input-field">
      <input
        id="name"
        type="text"
        v-model="title"
        :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
      />
      <label for="name">{{localizeFilter('Name')}}</label>
      <span
        v-if="v$.title.$dirty && v$.title.required.$invalid"
        class="helper-text invalid"
      >
        {{localizeFilter('EnterCategoryName')}}!
      </span>
    </div>

    <div class="input-field">
      <input
        id="limit"
        type="number"
        v-model.number="limit"
        :class="{invalid: v$.limit.$dirty && v$.limit.required.$invalid || v$.limit.$dirty && v$.limit.minValue.$invalid}"
      />
      <label for="limit">{{localizeFilter('Limit')}}</label>
      <span
        v-if="v$.limit.$dirty && v$.limit.required.$invalid"
        class="helper-text invalid"
      >
        {{localizeFilter('EnterLimit')}}!
      </span>
      <span
        v-else-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
        class="helper-text invalid"
      >
        {{localizeFilter('MinValue')}}: {{v$.limit.minValue.$params.min}}
      </span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{localizeFilter(ButtonType)}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {minValue, required} from "@vuelidate/validators";
import localizeFilter from "@/filters/localize.filter";

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  props: {
    currentCategory: {
      type: Object,
      required: false
    },
    ButtonType: {
      type: String,
      required: true
    }
  },
  data: () => ({
    title: '',
    limit: 100,
  }),
  validations() {
    return {
      title: {required},
      limit: {required, minValue: minValue(100)}
    }
  },
  mounted() {
    if (this.currentCategory) {
      this.title = this.currentCategory.title
      this.limit = this.currentCategory.limit
    }
    // eslint-disable-next-line no-undef
    setTimeout(() => M.updateTextFields(),0)
  },
  methods: {
    localizeFilter,
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      this.v$.$reset()
      this.$emit('upsert', this.title, this.limit)
    }
  }
}
</script>