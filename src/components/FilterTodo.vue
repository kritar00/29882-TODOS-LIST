<template>
  <div class="border border-solid border-havelock-blue-300 py-1 rounded-lg">
    <select
      name="filter"
      @click="handleFilter"
      v-model="filter"
      id="filter-selection"
    >
      <option>All</option>
      <option :value="true">Finished</option>
      <option :value="false">Unfinished</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: "All",
    };
  },
  methods: {
    handleFilter() {
      this.$emit("filter", this.filter);
    },
  },
};
</script>
