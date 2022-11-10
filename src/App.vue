<template>

  <HomeView :data="data" />
</template>

<script>
import axios from "axios"
import HomeView from "./views/HomeView.vue";
// import { defineComponent } from "vue";
export default {
  components: {
    HomeView,
  },
    data() {
      return {
        data: []
      }
    },
    methods: {
      async getData() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/')
        this.data = response.data
      }
    },
  async mounted() {
    await this.getData()
  }
  }

</script>
<style scoped>
</style>