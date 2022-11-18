<template>
  <label class="w-full">
    <span class="whitespace-nowrap font-bold">{{ label }}</span>
    <input
      class="w-full shadow-lg"
      :type="type"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: String,
    label: String,
    type: String,
  },
  emits: ["update:modelValue"],
};
</script>
