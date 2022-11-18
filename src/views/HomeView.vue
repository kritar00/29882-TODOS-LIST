<template>
  <section>
    <h1 class="text-5xl p-4 underline text-tia-maria-500 text-center">
      My todo-s!
    </h1>
    <form
      ref="inputForm"
      class="w-3/4 mx-auto p-9 flex justify-around shadow-md"
    >
      <BaseInput
        type="text"
        class="flex items-center gap-3 justify-center"
        placeholder="Type your todo here..."
        required
        label="Todo input"
        v-model="todoTitle"
      />
      <button class="btn" @click="toggleCreate" type="button">ADD</button>
    </form>
  </section>
  <section class="py-9">
    <div class="flex items-center w-fit ml-auto p-8">
      <SearchByKeyword @searchByKeyword="onSearchClick($event)" />
      <FilterTodo @filter="onFilterClick($event)" />
      <SortTodo @sort="onSortedClick($event)" />
    </div>
    <a
      v-if="search"
      class="underline float-right mr-7"
      href="#"
      @click="search = ''"
      >Remove search value</a
    >
    <div class="cards">
      <TodoCard
        v-for="item in filtered_items"
        :key="item.id"
        :id="item.id"
        :item="item"
        :deleteTodo="deleteData"
        :toggleEdit="toggleEdit"
        @editTodo="onEditClick($event)"
        @isChecked="putTodo($event)"
        class="w-11/12 p-10 mx-auto flex items-center"
      />
    </div>
    <form
      v-if="showEdit"
      class="w-full top-0 left-0 fixed bg-black-900/50 h-full"
    >
      <EditTodo
        :currentItem="currentItem"
        :putData="putData"
        :toggleEdit="toggleEdit"
        :deleteTodo="deleteData"
      />
    </form>
    <form
      v-if="showCreate"
      @submit.prevent="postTodo"
      class="w-full top-0 left-0 fixed bg-black-900/50 h-full"
    >
      <AddTodo
        :toggleCreate="toggleCreate"
        @addTodo="getDataFromInput($event)"
      />
    </form>
  </section>
</template>
<script>
import FilterTodo from "@/components/FilterTodo.vue";
import BaseInput from "@/components/BaseInput.vue";
import SortTodo from "@/components/SortTodo.vue";
import TodoCard from "@/components/TodoCard.vue";
import EditTodo from "../components/EditTodo.vue";
import SearchByKeyword from "../components/SearchByKeyword.vue";
import AddTodo from "../components/AddTodo.vue";
import getDate from "@/helpers/helpers.js";
export default {
  name: "HomeView",
  data() {
    return {
      showEdit: false,
      filter: "All",
      sorted: false,
      todoTitle: "",
      currentItem: {
        title: "",
        id: "",
        completed: false,
        image: "",
        user: "",
        due: "",
        createdAt: "",
      },
      search: "",
      showCreate: false,
    };
  },
  computed: {
    filtered_items() {
      let reg = new RegExp(this.search, "i");
      const dataClone = this.data;
      if (this.filter === "All") {
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
    toggleCreate() {
      if (!this.todoTitle.trim()) {
        alert("Please type in your todo");
        return;
      }
      this.showCreate = !this.showCreate;
    },
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
      this.currentItem.title = this.todoTitle.trim();
      this.currentItem.createdAt = getDate();
      this.postData(this.currentItem);
      this.$refs.inputForm.reset();
      this.toggleCreate();
    },
    onEditClick(value) {
      this.currentItem = value;
    },
    getDataFromInput(value) {
      let current = this.currentItem;
      current.title = value.title;
      current.image = value.image;
      current.due = value.due;
      current.user = value.user;
      current.completed = value.completed ? true : false;
    },
    putTodo(value) {
      this.putData(value);
    },
    onSearchClick(value) {
      this.search = value;
    },
  },
  components: {
    BaseInput,
    FilterTodo,
    SortTodo,
    TodoCard,
    EditTodo,
    SearchByKeyword,
    AddTodo,
  },
  props: ["data", "putData", "postData", "deleteData"],
};
</script>
