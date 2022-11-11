<template>
  <div>
    <p class="text-xl w-96 overflow-hidden whitespace-nowrap">
      {{ item.title }}
    </p>
    <p :class="getClass()" class="rounded-xl text-xl ml-auto py-1 px-5">
      {{ item.completed ? "Finished" : "Unfinished" }}
    </p>
    <div class="ml-auto flex gap-3">
      <button @click="toggleEdit()">
        <i class="text-xl text-blue-500 uil uil-edit-alt"></i>
      </button>
      <button @click="deleteData(item.id)">
        <i class="text-xl text-red-400 uil uil-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "putData", "deleteData", "toggleEdit"],
  data() {
    return {};
  },
  methods: {
    getClass() {
      return {
        "bg-green-400": this.item.completed,
        "bg-red-400": !this.item.completed,
      };
    },
  },
};
</script>
