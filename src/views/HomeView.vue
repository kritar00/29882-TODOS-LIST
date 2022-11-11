<template>
  <section>
    <h1 class="text-5xl p-4 underline text-orange-500 text-center">
      My todo-s!
    </h1>
    <InputComponent :postData="postData" />
  </section>
  <section class="py-9">
    <div class="flex w-fit ml-auto p-8">
      <FilterComponent />
      <SortComponent />
    </div>
    <div class="cards">
      <TodoCard
        v-for="item in data"
        :key="item.id"
        :item="item"
        :deleteData="deleteData"
        :putData="putData"
        :toggleEdit="toggleEdit"
        class="w-4/5 p-10 mx-auto flex"
      />
    </div>
    <div v-if="showEdit" class="w-full top-0 left-0 fixed bg-black/50 h-full">
      <EditComponent :toggleEdit="toggleEdit" />
    </div>
  </section>
</template>
<script>
import FilterComponent from "@/components/FilterComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import SortComponent from "@/components/SortComponent.vue";
import TodoCard from "@/components/TodoCard.vue";
import EditComponent from "../components/EditComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
      showEdit: false,
    };
  },
  methods: {
    toggleEdit() {
      this.showEdit = !this.showEdit;
    },
  },
  components: {
    InputComponent,
    FilterComponent,
    SortComponent,
    TodoCard,
    EditComponent,
  },
  props: ["data", "putData", "postData", "deleteData"],
};
</script>
