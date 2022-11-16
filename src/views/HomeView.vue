<template>
  <section>
    <h1 class="text-5xl p-4 underline text-orange-500 text-center">
      My todo-s!
    </h1>
    <form
      ref="inputForm"
      class="w-3/4 mx-auto p-9 flex justify-around shadow-md"
      @submit.prevent="postTodo"
    >
      <InputComponent
        class="flex items-center gap-3 justify-center"
        placeholder="Type your todo here..."
        required
        label="Todo input"
        v-model="todo"
      />
      <button class="btn" type="submit">ADD</button>
    </form>
  </section>
  <section class="py-9">
    <div class="flex items-center w-fit ml-auto p-8">
      <SearchComponent @searchByKeyword="onSearchClick($event)" />
      <FilterComponent @filter="onFilterClick($event)" />
      <SortComponent @sort="onSortedClick($event)" />
    </div>
    <div class="cards">
      <TodoCard
        v-for="item in filtered_items"
        :key="item.id"
        :id="item.id"
        :item="item"
        :deleteData="deleteData"
        :toggleEdit="toggleEdit"
        @edit="onEditClick($event)"
        class="w-4/5 p-10 mx-auto flex"
      />
    </div>
    <form
      v-if="showEdit"
      @submit.prevent="putTodo"
      class="w-full top-0 left-0 fixed bg-black/50 h-full"
    >
      <EditComponent
        :currentEdit="currentEdit"
        @put="getDataFromEdit($event)"
        :toggleEdit="toggleEdit"
      />
    </form>
  </section>
</template>
<script>
import FilterComponent from "@/components/FilterComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import SortComponent from "@/components/SortComponent.vue";
import TodoCard from "@/components/TodoCard.vue";
import EditComponent from "../components/EditComponent.vue";
import SearchComponent from "../components/SearchComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
      todo: "",
      showEdit: false,
      filter: null,
      sorted: false,
      currentEdit: {},
      search: "",
    };
  },
  computed: {
    filtered_items() {
      let reg = new RegExp(this.search, "i");
      const dataClone = this.data;
      if (this.filter === null || this.filter === "All") {
        if (this.sorted)
          if (this.search)
            return dataClone
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .filter(function (item) {
                return item.title.search(reg) != -1;
              });
          else
            return dataClone.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
        if (this.search)
          return dataClone
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .filter(function (item) {
              return item.title.search(reg) != -1;
            });
        return dataClone.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      if (this.filter)
        if (this.sorted)
          if (this.search)
            return dataClone
              .filter(
                (item) =>
                  item.completed == this.filter && item.title.search(reg) != -1
              )
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          else
            return dataClone
              .filter((item) => item.completed == this.filter)
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        else if (this.search)
          return dataClone
            .filter(
              (item) =>
                item.completed == this.filter && item.title.search(reg) != -1
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        else
          return dataClone
            .filter((item) => item.completed == this.filter)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      else if (this.sorted)
        if (this.search)
          return dataClone
            .filter(
              (item) =>
                item.completed == this.filter && item.title.search(reg) != -1
            )
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        else
          return dataClone
            .filter((item) => item.completed == this.filter)
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      else if (this.search)
        return dataClone
          .filter(
            (item) =>
              item.completed == this.filter && item.title.search(reg) != -1
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
      this.$refs.inputForm.reset();
    },
    onEditClick(value) {
      this.currentEdit = value;
    },
    getDataFromEdit(value) {
      this.currentEdit.title = value.todo;
      this.currentEdit.completed = value.checked;
    },
    putTodo() {
      this.putData(
        this.currentEdit.id,
        this.currentEdit.title,
        this.currentEdit.completed
      );
      this.toggleEdit();
    },
    onSearchClick(value) {
      this.search = value;
    },
  },
  components: {
    InputComponent,
    FilterComponent,
    SortComponent,
    TodoCard,
    EditComponent,
    SearchComponent,
  },
  props: ["data", "putData", "postData", "deleteData"],
};
</script>
