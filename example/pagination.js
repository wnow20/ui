// main.js
import Vue from 'vue';
// require a *.vue component
import Pagination from '../src/components/pagination.js';

// mount a root Vue instance
var app = new Vue({
  el: 'body',
  data: {
    currentPage: 5, pageSize: 30, totalCount: 888
  },
  components: {
    'pagination': Pagination
  }
})

app.$on('change', function (data) {
	console.log(this);
	console.log(data);
	console.log('active: ', this.$data.currentPage);
});