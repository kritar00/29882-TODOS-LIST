<template>
  <div class="border border-solid border-havelock-blue-300 py-1 rounded-lg">
    <select
      name="filter"
      @click="onHandleFilter"
      v-model="filter"
      id="filter-selection"
    >
      <option :value="null">All</option>
      <option :value="true">Finished</option>
      <option :value="false">Unfinished</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: null,
    };
  },
  methods: {
    onHandleFilter() {
      this.$emit("filter", this.filter);
    },
  },
};
</script>
