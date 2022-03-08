<template>
  <div class="container">
    <Sidebar />
    <div id="content-wrapper" class="container-fluid">
      <h1>Dashboard</h1>
      <h2>{{ time }}</h2>
      <div class="row">
        <!-- ยอดขายวันนี้ Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                  >
                    ยอดขายวันนี้
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ total }} บาท
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ยอดขายเดือนนี้ Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-success text-uppercase mb-1"
                  >
                    ยอดขายเดือนนี้
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ month_total }} บาท
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- รายการวันนี้ Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-info text-uppercase mb-1"
                  >
                    รายการวันนี้
                  </div>
                  <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                      <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {{ today_order }} รายการ
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- รายการทั้งหมด Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-warning text-uppercase mb-1"
                  >
                    รายการทั้งหมด
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ all_order }} รายการ
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="chart">
        <LineChart :chartData="chartData" :height="400" :width="1200" />
        <Bar :chartData="BarData" :options="options" :width="1200" />
      </div> -->
      <Loading />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Jwt, StoreAuth } from '../libs/sessionStorage'
import { mapMutations, mapState } from 'vuex'
import Loading from '../components/Loading.vue'
import Sidebar from '../components/Sidebar.vue'
import LineChart from '../components/LineChart.vue'
import Bar from '../components/Bar.vue'
import moment from 'moment'
export default {
  head() {
    return {
      title: 'Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'my website description',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  components: {
    Sidebar,
    Loading,
  },
  async mounted() {
    this.setLoading(true)
    setTimeout(() => this.setLoading(false), 5000)
    if (!Jwt.getJwtToken()) this.$router.push('/login')
  },
  computed: {
    ...mapState(['url']),
  },
  methods: {
    ...mapMutations({
      setLoading: 'loading/setLoading',
    }),
    async fetchData() {
      const body = { store: this.store }
      const total = await axios.post(`${this.url}/orders/get/total/today`, body)
      const month_total = await axios.post(
        `${this.url}/orders/get/total/month`,
        body
      )
      const today_order = await axios.post(
        `${this.url}/orders/get/today_count`,
        body
      )
      const all_order = await axios.post(
        `${this.url}/orders/get/all_count`,
        body
      )
      console.log(body);
      console.log(all_order);
      this.total = total.data.total
      this.month_total = month_total.data.total
      this.today_order = today_order.data.orderCount
      this.all_order = all_order.data.orderCount
    },
  },
  data() {
    return {
      time: null,
      store: '',
      total: 0,
      month_total: 0,
      today_order: 0,
      all_order: 0,
      chartData: {
        labels: ['a', 'b', 'c'],
        datasets: [
          {
            label: 'Hello World!',
            data: [1, 2, 3, 5],
            backgroundColor: 'rgba(20, 255, 0, 0.3)',
            borderColor: 'rgba(100, 255, 0, 1)',
            borderWidth: 2,
          },
        ],
      },
      BarData: {
        labels: ['jan', 'feb', 'march', 'may'],
        datasets: [
          {
            label: 'Sale',
            data: [1000, 2000, 3000, 5000],
            backgroundColor: 'rgb(251, 192, 45)',
            borderColor: 'rgb(255, 238, 88)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    }
  },
  async mounted() {
    setInterval(() => {
      this.time = moment(Date())
        .locale('th')
        .format('dddd DD/MM/YYYY  HH:mm:ss')
    }, 100)
    if (!Jwt.getJwtToken()) this.$router.push('/login')
    const storeAuth = StoreAuth.getStoreAuth()
    this.store = storeAuth.store
    try {
      if (this.store == null) this.$router.push('/login')
      await this.fetchData()
    } catch (err) {
      console.log(err)
    }
  },
}
</script>

<style scoped>
.root {
  min-width: 100vw;
}
#wrapper {
  display: flex;
}

#wrapper #content-wrapper {
  background-color: #f8f9fc;
  width: 100%;
  overflow-x: hidden;
}

#wrapper #content-wrapper #content {
  flex: 1 0 auto;
}

.container {
  width: 100%;
}
div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}
</style>
