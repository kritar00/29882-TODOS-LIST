<template>
  <div
    class="ease-in-out duration-200 border p-20 bg-white-50 shadow fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-2/4"
  >
    <button class="absolute top-5 left-5" @click="toggleEdit()">
      <i class="text-3xl text-orange-500 uil uil-arrow-left"></i>
    </button>
    <h2 class="text-4xl text-center mb-5 text-tia-maria-500 underline">
      Edit Item
    </h2>
    <div class="flex flex-col">
      <BaseInput
        class=""
        label="Todo title"
        v-model="edited.title"
        type="text"
        required
        placeholder="Edit your todo..."
      />
      <BaseInput
        class=""
        label="Change your image"
        v-model="edited.image"
        type="text"
        placeholder="Edit your image ..."
      />
      <BaseInput
        class=""
        label="Change your Due"
        v-model="edited.due"
        type="Date"
        required
      />
      <span class="flex items-center mt-4 gap-3">
        <label for="finished">Mark as finished</label>
        <input type="checkbox" id="finished" v-model="edited.isCompleted" />
      </span>
    </div>
    <div class="mt-2 flex justify-around">
      <button
        type="submit"
        :disabled="isDisabled"
        @click.prevent="saveHandler"
        class="btn bg-havelock-blue-400 hover:bg-havelock-blue-700 hover:text-white-50"
      >
        Save changes
      </button>
      <button
        type="button"
        @click="deleteHandler"
        class="btn ml-auto bg-roof-terracotta-400 hover:bg-roof-terracotta-600 hover:text-white-50"
      >
        Delete todo
      </button>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {
  props: ["toggleEdit", "currentItem", "deleteTodo", "putData"],
  name: "EditComponent",
  data() {
    return {
      edited: {
        id: this.currentItem.id,
        title: this.currentItem.title,
        isCompleted: this.currentItem.isCompleted,
        image: this.currentItem.image,
        due: this.currentItem.due,
      },
    };
  },
  computed: {
    isDisabled() {
      return !this.edited.title.trim() || !this.edited.due;
    },
  },
  methods: {
    saveHandler() {
      this.putData(this.edited);
      this.toggleEdit();
    },
    deleteHandler() {
      this.deleteTodo(this.currentItem.id);
      this.toggleEdit();
    },
  },
  components: { BaseInput },
};
</script>
