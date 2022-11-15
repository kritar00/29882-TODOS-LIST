<template>
  <section>
    <h1 class="text-5xl p-4 underline text-orange-500 text-center">
      My todo-s!
    </h1>
    <form
      ref="inputForm"
      class="w-3/4 mx-auto p-9 flex justify-around shadow-md"
      action=""
      @submit.prevent="postTodo"
    >
      <InputComponent
        placeholder="Type your todo here..."
        required
        label="Todo input"
        v-model="todo"
      />
      <button class="btn" type="submit">ADD</button>
    </form>
  </section>
  <section class="py-9">
    <div class="flex w-fit ml-auto p-8">
      <FilterComponent @filter="onFilterClick($event)" />
      <SortComponent @sort="onSortedClick($event)" />
    </div>
    <div class="cards">
      <TodoCard
        v-for="item in filtered_items"
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
      todo: "",
      showEdit: false,
      filter: null,
      sorted: false,
    };
  },
  computed: {
    filtered_items() {
      const dataClone = this.data;
      if (this.filter === null || this.filter === "All") {
        if (this.sorted)
          return dataClone.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
        return dataClone.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      if (this.filter)
        if (this.sorted)
          return dataClone
            .filter((item) => item.completed == this.filter)
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        else
          return dataClone
            .filter((item) => item.completed == this.filter)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      else if (this.sorted)
        return dataClone
          .filter((item) => item.completed == this.filter)
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      else
        return dataClone
          .filter((item) => item.completed == this.filter)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    toggleEdit() {
      this.showEdit = !this.showEdit;
    },
    onFilterClick(value) {
      this.filter = value;
    },
    onSortedClick(value) {
      this.sorted = value;
    },
    postTodo() {
      this.postData(this.todo);
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
