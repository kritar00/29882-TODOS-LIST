<template>
  <div>
    <input
      class="mr-2"
      v-model="isCompleted.isCompleted"
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
      <span v-if="item.isCompleted">Finished</span>
      <span v-else title="Due time"
        ><i class="text-grandis-400 uil uil-hourglass"></i>{{ item.due }}</span
      >
    </p>
    <p class="ml-auto">{{ item.user }}</p>
    <div class="ml-auto flex flex-col">
      <div class="flex gap-3 justify-center">
        <button @click="onEditClicked">
          <i class="text-xl text-havelock-blue-700 uil uil-edit-alt"></i>
        </button>
        <button @click="deleteData(item.id)">
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
  props: ["item", "deleteData", "onToggleEdit"],
  data() {
    return {
      isCompleted: Object.assign({}, this.item),
    };
  },
  computed: {
    className() {
      return this.item.isCompleted
        ? "bg-la-palma-400"
        : "border-grandis-400 border";
    },
  },
  methods: {
    onEditClicked() {
      this.onToggleEdit();
      this.$emit("editTodo", this.item);
    },
    isChecked() {
      this.$emit("isChecked", this.isCompleted);
    },
    replaceByDefault(e) {
      e.target.src = defaultImg;
    },
  },
  emits: ["editTodo", "isChecked"],
};
</script>
