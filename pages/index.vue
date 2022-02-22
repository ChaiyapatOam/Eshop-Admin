<template>
  <div>
     <Tutorial />
  </div>
 
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    this.$router.push('/login')
  },
}
</script>
