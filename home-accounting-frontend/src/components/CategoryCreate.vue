<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{localizeFilter('Create')}}</h4>
      </div>

      <CategoryInputs
        @upsert="submitHandler"
        :ButtonType="'Create'"
        :current-category="{title: 'title', limit: 100}"
      />

    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import localizeFilter from "@/filters/localize.filter"
import CategoryInputs from "@/components/CategoryInputs.vue"

export default {
  components: {CategoryInputs},
  setup () {
    return { v$: useVuelidate() }
  },
  methods: {
    localizeFilter,
    async submitHandler(title, limit) {
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: title,
          limit: limit
        })
        this.$message(`${localizeFilter('Category')} ${category.title} ${localizeFilter('WasCreated')}!`)
        this.$emit('created', category)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>