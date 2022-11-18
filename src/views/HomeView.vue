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
        v-model.trim="todoTitle"
      />
      <button class="btn" @click="onToggleCreate" type="button">ADD</button>
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
        v-for="(item, index) in filteredItemsComputed"
        :key="`todoItem-${index}`"
        :id="item.id"
        :item="item"
        @deleteData="deleteTodo($event)"
        :onToggleEdit="onToggleEdit"
        @editTodo="onEditClick($event)"
        @isChecked="putTodo($event)"
        class="w-11/12 p-10 mx-auto flex items-center"
      />
    </div>
    <form
      v-if="isShowEdit"
      class="w-full top-0 left-0 fixed bg-black-900/50 h-full"
    >
      <EditTodo
        :currentItem="currentItem"
        @putData="putTodo($event)"
        :onToggleEdit="onToggleEdit"
        @deleteData="deleteTodo($event)"
      />
    </form>
    <form
      v-if="isShowCreate"
      @submit.prevent="onPostTodo"
      class="w-full top-0 left-0 fixed bg-black-900/50 h-full"
    >
      <AddTodo
        :onToggleCreate="onToggleCreate"
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
      isShowEdit: false,
      filter: null,
      isSorted: false,
      todoTitle: "",
      currentItem: {
        title: "",
        id: "",
        isCompleted: false,
        image: "",
        user: "",
        due: "",
        createdAt: "",
      },
      search: "",
      isShowCreate: false,
    };
  },
  computed: {
    filteredItemsComputed() {
      let reg = new RegExp(this.search, "i");
      let resultData = [...this.data];
      if (this.filter || this.filter == false) {
        resultData = resultData.filter(
          (item) => item.isCompleted == this.filter
        );
      }
      if (this.search) {
        resultData = resultData.filter(function (item) {
          return item.title.search(reg) != -1;
        });
      }
      if (this.isSorted) {
        resultData = resultData.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else {
        resultData = resultData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      return resultData;
    },
  },
  methods: {
    onToggleCreate() {
      if (!this.todoTitle.trim()) {
        alert("Please type in your todo");
        return;
      }
      this.isShowCreate = !this.isShowCreate;
    },
    onToggleEdit() {
      this.isShowEdit = !this.isShowEdit;
    },
    onFilterClick(value) {
      this.filter = value;
    },
    onSortedClick(value) {
      this.isSorted = value;
    },
    onPostTodo() {
      this.currentItem.title = this.todoTitle;
      this.currentItem.createdAt = getDate();
      this.$emit("postDataToApi", this.currentItem);
      this.$refs.inputForm.reset();
      this.onToggleCreate();
    },
    onEditClick(value) {
      this.currentItem = value;
    },
    getDataFromInput(value) {
      this.currentItem = Object.assign({}, value);
    },
    putTodo(value) {
      console.log(value);
      this.$emit("putDataToApi", value);
    },
    onSearchClick(value) {
      this.search = value;
    },
    deleteTodo(id) {
      this.$emit("deleteDataFromApi", id);
    },
  },
  emits: ["putDataToApi", "postDataToApi", "deleteDataFromApi"],
  components: {
    BaseInput,
    FilterTodo,
    SortTodo,
    TodoCard,
    EditTodo,
    SearchByKeyword,
    AddTodo,
  },
  props: ["data"],
};
</script>
