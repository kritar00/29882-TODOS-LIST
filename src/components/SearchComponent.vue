<template>
  <InputComponent
    class="flex gap-2"
    label="Search"
    v-model="keyword"
    placeholder="Search todos..."
  />
  <button
    class="btn bg-sky-400 hover:bg-sky-700 ease-in duration-200 text-white border"
    @click="searchHandler"
  >
    Search
  </button>
</template>

<script>
import InputComponent from "./InputComponent.vue";
export default {
  components: { InputComponent },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    searchHandler() {
      this.$emit("searchByKeyword", this.keyword);
    },
  },
  emits: ["searchByKeyword"],
};
</script>
