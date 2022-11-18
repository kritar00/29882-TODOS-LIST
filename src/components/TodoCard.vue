<template>
  <div>
    <input
      class="mr-2"
      v-model="completed.completed"
      type="checkbox"
      @change="isChecked"
    />
    <p class="text-xl w-80 overflow-hidden whitespace-nowrap">
      {{ item.title }}
    </p>
    <img
      v-if="item.image"
      :src="item.image"
      @error="replaceByDefault"
      class="w-16"
      alt="dummy image"
    />
    <p :class="className" class="rounded-xl text-xl ml-auto py-1 px-5">
      <span v-if="item.completed">Finished</span>
      <span v-else title="Due time"
        ><i class="text-grandis-400 uil uil-hourglass"></i>{{ item.due }}</span
      >
    </p>
    <p class="ml-auto">{{ item.user }}</p>
    <div class="ml-auto flex flex-col">
      <div class="flex gap-3 justify-center">
        <button @click="editClicked()">
          <i class="text-xl text-havelock-blue-700 uil uil-edit-alt"></i>
        </button>
        <button @click="deleteTodo(item.id)">
          <i class="text-xl text-roof-terracotta-400 uil uil-trash-alt"></i>
        </button>
      </div>
      <a title="Last modified">{{ item.createdAt }}</a>
    </div>
  </div>
</template>
<script>
import defaultImg from "@/assets/Error.svg";
export default {
  props: ["item", "deleteTodo", "toggleEdit"],
  data() {
    return {
      completed: {
        id: this.item.id,
        completed: this.item.completed,
      },
    };
  },
  computed: {
    className() {
      return this.item.completed
        ? "bg-la-palma-400"
        : "border-grandis-400 border";
    },
  },
  methods: {
    editClicked() {
      this.toggleEdit();
      this.$emit("editTodo", this.item);
    },
    isChecked() {
      this.$emit("isChecked", this.completed);
    },
    replaceByDefault(e) {
      e.target.src = defaultImg;
    },
  },
  emits: ["editTodo", "isChecked"],
};
</script>
