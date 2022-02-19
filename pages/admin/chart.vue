<template>
  <div class="root">
      <h1>Hello</h1>
    <div class="chart-div">
      <LineChart :chartData="chartData" />
    </div>
  </div>
</template>

<script>

export default {

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
