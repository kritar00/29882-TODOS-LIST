<template>
  <div>
    <select
      @click="handleSort"
      v-model="sorted"
      name="sort"
      id="sort-selection"
    >
      <option :value="true">Date Ascending</option>
      <option :value="false">Date Descending</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sorted: false,
    };
  },
  methods: {
    handleSort() {
      this.$emit("sort", this.sorted);
    },
  },
};
</script>
