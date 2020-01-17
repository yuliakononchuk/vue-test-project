<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" :class="column.noSort ? '' : 'sortable'" @click="sort(column.sortBy || column.key)">
          {{column.name}} 
          <font-awesome-icon v-if="!column.noSort" :icon="getSortIcon(column.sortBy || column.key)"/>
        </th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="event in sortedEvents" :key="event.url">
        <td v-for="column in columns" :key="column.key">{{event[column.key]}}</td>
        <td><a target="_blank" :href="event.url"><font-awesome-icon :icon="faExternalLinkAlt" /></a></td>
        <td><a target="_blank" :href="event.more_info"><font-awesome-icon :icon="faInfoCircle" /></a></td>
      </tr>
    </tbody> 
  </table>
</template> 

<script>
import {
  faExternalLinkAlt,
  faInfoCircle,
  faSort,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { sortWithType } from "./helpers";

export default {
  name: "EventGrid",
  data: function() {
    return {
      faExternalLinkAlt,
      faInfoCircle,
      faSort,
      faSortUp,
      faSortDown,
      columns: [
        { key: "name", name: "Name", noSort: true },
        { key: "dateText", name: "Date", sortBy: "date" },
        { key: "city", name: "City" },
        { key: "venue", name: "Venue" },
        { key: "likes", name: "Likes" }
      ],
      sortBy: [],
      sortOrder: {}
    };
  },
  components: {
    FontAwesomeIcon
  },
  props: {
    events: Array
  },
  methods: {
    getSortIcon: function(columnName) {
      if (this.sortOrder[columnName] === undefined) {
        return this.faSort;
      }
      return this.sortOrder[columnName] ? this.faSortUp : faSortDown;
    },
    sort: function(sortByItem) {
      const index = this.sortBy.indexOf(sortByItem);
      if (index !== -1) {
        this.sortBy.splice(index, 1);
        this.sortOrder[sortByItem] = !this.sortOrder[sortByItem];
      } else {
        this.sortOrder[sortByItem] = true;
      }
      this.sortBy.push(sortByItem);
    }
  },
  computed: {
    sortedEvents: function() {
      let sortedData = [...this.events];
      this.sortBy.forEach(sortByItem => {
        const isNumeric = !isNaN(sortedData[0][sortByItem]);
        const orderIsAsc = this.sortOrder[sortByItem];
        sortWithType(sortedData, isNumeric, orderIsAsc, sortByItem);
      });
      return sortedData;
    }
  }
};
</script>

<style>
table {
  background-color: #c5dcd7;
}

th, th svg {
  background-color: #303030;
  color: #dcccc5;
  font-size: 13px;
}

.sortable {
  cursor: pointer;
}

td, td a, td svg {
  background-color: #303030;
  font-size: 14px;
}

th,
td {
  min-width: 60px;
  padding: 10px 5px;
}

a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: #c5dcd7;
}
</style>