<template>

  <HomeView :data="data" :putData="putData" :postData="postData" :deleteData="deleteData" />
</template>

<script>
import axios from "axios"
import HomeView from "./views/HomeView.vue";
import getDate from "@/components/helpers/helpers.js"
// import { defineAsyncComponent } from "vue";
const url = 'https://636db3bc91576e19e32daf8a.mockapi.io/todoapi/todos';
export default {
  components: {
    HomeView,
  },
    data() {
      return {
        data: [],
      }
    },
    methods: {
      async getData() {
        const response = await axios.get(url)
        this.data = response.data
      },
      async putData(data) {
        const response = await axios.put(url, data)
        this.getData()
      },
      async postData(data) {
        let obj = {
          createdAt: getDate(),
          id: '',
          title: data,
          completed: false
        }
        const response = await axios.post(url, obj)
        this.getData()
      },
      async deleteData(id) {
        const response = await axios.delete(`${url}/${id}`)
        this.getData()
      }
    },
  async mounted() {
    await this.getData()
  }
  }

</script>
<style scoped>
</style>