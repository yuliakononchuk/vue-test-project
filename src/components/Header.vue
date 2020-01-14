<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h1 {
  margin: 40px;
  color: #0D1B46;
}
</style>
