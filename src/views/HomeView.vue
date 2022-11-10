
<template>
  <section>
  <h1 class="text-5xl p-4 underline text-orange-500 text-center">My todo-s!</h1>
    <InputComponent />
  </section>
  <section class="py-9">
    <div class="flex w-fit ml-auto p-8">
      <FilterComponent />
      <SortComponent />
    </div>
    <div class="cards">
    <TodoCard v-for="(item, index) in data" :key="index" :item="item" class="w-4/5 p-10 mx-auto flex" />
    </div>
  </section>
</template>
<script>

import FilterComponent from '@/components/FilterComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import SortComponent from '@/components/SortComponent.vue';
import TodoCard from "@/components/TodoCard.vue";

export default {
  name: "HomeView",
  components: {
    InputComponent,
    FilterComponent,
    SortComponent,
    TodoCard
  },
    props: ["data"],
}
</script>
