<template>
  <div class="border border-solid border-havelock-blue-300 py-1 rounded-lg">
    <select
      @click="onHandleSort"
      v-model="isSorted"
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
      isSorted: false,
    };
  },
  methods: {
    onHandleSort() {
      this.$emit("sort", this.isSorted);
    },
  },
};
</script>
