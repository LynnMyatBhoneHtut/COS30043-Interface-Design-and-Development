<template>
  <main class="container py-4">
    <h1 class="h3 mb-3">Units</h1>

    <UnitTable />
  </main>
</template>

<script>
import UnitTable from './components/UnitTable.vue'

export default {
  name: 'App',
  components: {
    UnitTable
  }
}
</script>
