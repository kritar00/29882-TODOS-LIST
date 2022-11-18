<template>
  <div
    class="ease-in-out duration-200 border h-96 p-20 bg-white-50 shadow fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-2/4"
  >
    <h2 class="text-center text-4xl mb-5 text-tia-maria-500 underline">
      Create your todo
    </h2>
    <BaseInput
      class="my-4"
      label="Your choice of images (optional)"
      v-model="todo.image"
      type="url"
    />
    <BaseInput class="my-4" label="Due date" v-model="todo.due" type="date" />
    <label for="user-selection">For:</label>
    <select name="username" id="user-selection" v-model="todo.user">
      <option value="Machine">Machine</option>
      <option value="Kirby">Kirby</option>
      <option value="Beaver">Beaver</option>
    </select>
    <div>
      <button
        title="Create new todo"
        type="submit"
        @click="postData"
        class="btn"
        :disabled="!todo.due || !todo.user"
      >
        Add it
      </button>
      <button
        title="Cancel action"
        type="button"
        @click="this.toggleCreate()"
        class="btn"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {
  components: { BaseInput },
  data() {
    return {
      todo: {
        user: "",
        image: "",
        due: "",
      },
    };
  },
  methods: {
    postData() {
      this.$emit("addTodo", this.todo);
    },
  },
  props: ["toggleCreate"],
};
</script>
