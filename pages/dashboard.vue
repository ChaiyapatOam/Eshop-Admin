<template>
  <div class="container">
    <Sidebar />
    <div id="content-wrapper" class="container-fluid">
      <h1>Dashboard</h1>
      <h2>{{ time }}</h2>
      <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                  >
                    Earnings (Monthly)
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    $40,000
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-success text-uppercase mb-1"
                  >
                    Earnings (Annual)
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    $215,000
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-info text-uppercase mb-1"
                  >
                    Tasks
                  </div>
                  <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                      <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        50%
                      </div>
                    </div>
                    <div class="col">
                      <div class="progress progress-sm mr-2">
                        <div
                          class="progress-bar bg-info"
                          role="progressbar"
                          style="width: 50%"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
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

        <!-- Pending Requests Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="text-xs font-weight-bold text-warning text-uppercase mb-1"
                  >
                    Pending Requests
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart">
        <LineChart :chartData="chartData" :height="400" :width="1200" />
        <Bar :chartData="BarData" :options="options" :width="1200" />
      </div>
      <Loading />
    </div>
  </div>
</template>

<script>
import { Jwt } from '../libs/sessionStorage'
import { mapMutations,mapState } from 'vuex'
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
  mounted() {
    this.setLoading(true)
    setTimeout(() => this.setLoading(false), 5000)
    if (!Jwt.getJwtToken()) this.$router.push('/login')
  },
  methods: {
    ...mapMutations({
      setLoading: 'loading/setLoading',
    }),
  },
  data() {
    return {
      time: null,
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
  mounted() {
    setInterval(() => {
      this.time = moment(Date()).format('dddd DD/MM/YYYY HH:mm:ss')
    }, 100)
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
