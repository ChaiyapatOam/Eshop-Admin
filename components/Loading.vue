<template>
  <div class="loading" v-if="this.$store.state.loading.isLoading">
    <h1>Loading...</h1>
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  bottom: 20px;
  right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: red;
  z-index: 10001;
}

h1 {
  color: white;
}
</style>