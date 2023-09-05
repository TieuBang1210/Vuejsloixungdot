import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Andon from './pages/Andon.vue';
import Perpormance from './pages/Perpormance.vue';

import TableList from './pages/TableList.vue';



Vue.use(VueRouter)

import './plugins';

const routes = [
  { path: '/Andon', component: Andon },
  { path: '/Perpormance', component: Perpormance },
  { path: '/TableList', component: TableList }
 
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
