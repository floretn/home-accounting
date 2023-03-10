<template>
  <div>
    <div class="page-title">
      <h3>{{localizeFilter('CategoryTitle')}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategory"
        />
        <p v-else class="center">{{localizeFilter('NoCategories')}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue"
import CategoryEdit from "@/components/CategoryEdit.vue"
import Loader from "@/components/app/Loader.vue"
import localizeFilter from "@/filters/localize.filter"
import {useMeta} from "vue-meta";

export default {
  setup() {
    useMeta({
      // title: `${localizeFilter('CategoryTitle')}`
    })
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {Loader, CategoryEdit, CategoryCreate},
  methods: {
    localizeFilter,
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategory(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      //При изменении :key в КатегориЭдит перерисовывается селект. Меняется или длина или конкретная категория
      this.updateCount++
    }
  }
}
</script>