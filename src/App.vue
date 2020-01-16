<template>
  <div id="app">
    <Header msg="All WeArePublic events at one place! 🚀" />
    <EventGrid v-bind:events="events" />
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header";
import EventGrid from "./components/EventGrid.vue";
import { parseData } from "./helpers";

export default {
  name: "app",
  data: function() {
    return {
      data: []
    };
  },
  mounted: function() {
    axios.get("/data").then(response => {
      this.data = response.data.data;
    });
  },
  computed: {
    events: function() {
      return parseData(this.data);
    }
  },
  components: {
    Header,
    EventGrid
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
