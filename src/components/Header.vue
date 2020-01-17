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
  font-family: 'Gochi Hand', cursive;
  padding: 20px;
  color: #303030;
  font-size: 40px;
}
</style>
