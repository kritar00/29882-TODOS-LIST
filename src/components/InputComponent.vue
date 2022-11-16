<template>
  <label class="w-full">
    <span class="whitespace-nowrap font-bold">{{ label }}</span>
    <input
      class="w-full shadow-lg"
      type="text"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    modelValue: String,
    label: String,
  },
  emits: ["update:modelValue"],
};
</script>
