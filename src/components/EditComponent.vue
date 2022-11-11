<template>
  <div
    class="border h-96 p-20 bg-white shadow fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4"
  >
    <button class="absolute top-5 left-5" @click="toggleEdit()">
      <i class="text-3xl text-orange-500 uil uil-arrow-left"></i>
    </button>
    <h2 class="text-4xl text-center mb-5 text-orange-500 underline">
      Edit item
    </h2>
    <div class="flex flex-col">
      <label class="text-3xl" for="title">Edit title</label>
      <input
        class="w-96 shadow py-2 mb-2"
        type="text"
        id="title"
        v-model="todoTitle"
      />
      <span class="flex items-center mt-4 gap-3">
        <label for="finished">Mark as finished</label>
        <input type="checkbox" id="finished" v-model="checked" />
      </span>
    </div>
    <div class="pt-8 flex justify-around">
      <button class="btn bg-blue-400">Save changes</button>
      <button class="btn ml-auto bg-red-400">Delete todo</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["toggleEdit"],
  name: "EditComponent",
  data() {
    return {
      todoTitle: "",
      checked: false,
    };
  },
  methods: {},
};
</script>
