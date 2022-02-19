<template>
  <div>
    <Siderbar/>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue"
export default {
    components:{
        Sidebar
    },
    async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/v1/products");
    //   console.log(response);
      return {
        products: response,
       
      };
    } catch (err) {}
  },
}
</script>