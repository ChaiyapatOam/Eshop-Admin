<template>
  <div class="root">
    <Sidebar />
      <h1>Hello</h1>
      <h1>ร้านค้าทั้งหมด</h1> 
    <div class="chart-div">
      <LineChart :chartData="chartData" />
    </div>  <Loading />
  </div>
</template>

<script>
import { Jwt } from '../../libs/sessionStorage'
import { mapMutations } from 'vuex'
import Loading from '../../components/Loading.vue'
import Sidebar from '../../components/Sidebar.vue'
import LineChart from '../..//components/LineChart.vue'
export default {
  components: {
    Sidebar,
    Loading,
  },
  mounted() {
    this.setLoading(true)
    setTimeout(() => this.setLoading(false), 5000)
    if (!Jwt.getJwtToken()) this.$router.push('/admin/login')
  },
  methods: {
    ...mapMutations({
      setLoading: 'loading/setLoading',
    }),
  },
  data() {
    return {
      chartData: {
        labels: ['a', 'b', 'c'],
        datasets: {
          data: [1, 2, 3],
        },
      },
    }
  },
}
</script>

<style scoped>
.root {
  min-width: 100vw;
}

.container {
  width: 100%;
}
</style>
