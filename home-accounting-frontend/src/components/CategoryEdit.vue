<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{localizeFilter('Edit')}}</h4>
      </div>

      <div class="input-field" >
        <select ref="categorySelect" v-model="currentCategory">
          <option
            v-for="c of categories"
            :key="c.id"
            :value="c.id"
          >
            {{c.title}}
          </option>
        </select>
        <label>{{localizeFilter('ChooseCategory')}}</label>
      </div>

      <CategoryInputs
        @upsert="submitHandler"
        :currentCategory="{title, limit}"
        :key="currentCategory"
        :ButtonType="'Update'"
      />

    </div>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter"
import CategoryInputs from "@/components/CategoryInputs.vue";

export default {
  components: {CategoryInputs},
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    currentCategory: null,
    title: '',
    limit: 1
  }),
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.categorySelect, {}, {})
  },
  beforeUnmount() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.currentCategory = id
    this.title = title
    this.limit = limit
  },
  watch: {
    currentCategory(categoryId) {
      const {title, limit} = this.categories.find(c => c.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    localizeFilter,
    async submitHandler(title, limit) {
      try {
        const categoryData = {
          title: title,
          limit: limit,
          id: this.currentCategory
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(`${localizeFilter('Category')} ${categoryData.title} ${localizeFilter('SuccessEdited')}!`)
        this.$emit('updated', categoryData)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>