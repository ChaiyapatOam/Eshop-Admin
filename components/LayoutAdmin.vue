<template>
  <div class="root">
    <nav>
      <Sidebar />
    </nav>

    <div class="wrapper container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.root {
  min-height: 100vh !important;

  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: row;
}

.wrapper {
  padding: 20px;

  height: 100% !important;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-content: center;

  gap: 2.5rem;
}

nav {
  min-height: 100vh !important;
  overflow: auto;
}
</style>
