<template>
  <BaseInput
    class="flex gap-2"
    label="Search"
    v-model="keyword"
    placeholder="Search todos..."
  />
  <button
    class="btn bg-havelock-blue-300 hover:bg-havelock-blue-500 text-white border border-havelock-blue-500 hover:text-white-50 mr-3"
    @click="searchHandler"
  >
    Search
  </button>
</template>

<script>
import BaseInput from "./BaseInput.vue";
export default {
  components: { BaseInput },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    searchHandler() {
      if (!this.keyword.trim()) {
        alert("Enter search keywords");
        return;
      }
      this.$emit("searchByKeyword", this.keyword);
    },
  },
  emits: ["searchByKeyword"],
};
</script>
