<template>
  <HomeView
    :data="data"
    @putDataToApi="putData($event)"
    @postDataToApi="postData($event)"
    @deleteDataFromApi="deleteData"
  />
</template>

<script>
import axios from "axios";
import HomeView from "@/views/HomeView.vue";
const url = "https://636db3bc91576e19e32daf8a.mockapi.io/todoapi/todos";
export default {
  components: {
    HomeView,
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get(url);
        this.data = response.data;
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async putData(data) {
      try {
        await axios.put(`${url}/${data.id}`, data);
        this.getData();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async postData(data) {
      try {
        await axios.post(url, data);
        this.getData();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async deleteData(id) {
      try {
        await axios.delete(`${url}/${id}`);
        this.getData();
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
  },
  async mounted() {
    await this.getData();
  },
};
</script>
<style scoped></style>
