import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Reports from './views/Reports';
import Heatmap from './views/Heatmap';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ocorrencias',
      name: 'reports',
      component: Reports
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: Heatmap
    }
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(webpackChunkName: "about"  './views/About.vue')
    }*/
  ]
});
