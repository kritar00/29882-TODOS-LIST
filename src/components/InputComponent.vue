<template>
  <label>
    {{ label }}
    <input
      class="w-3/4 shadow-lg"
      type="text"
      @input="$emit('input', $event.target.value)"
      id="todo-input"
    />
  </label>
</template>

<script>
export default {
  name: "InputComponent",
  inheritAttrs: false,
  props: {
    label: String,
  },
  //   emits: ["input:modelValue"],
  //   model: {
  //     prop: "value",
  //   },
};
</script>
