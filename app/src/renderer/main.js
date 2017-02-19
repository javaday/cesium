import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en';
import Icon from 'vue-awesome/components/Icon.vue';

import 'element-ui/lib/theme-default/index.css';
import 'vue-awesome/icons';

import App from './App'
import routes from './routes'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(ElementUI, { locale })

Vue.component('icon', Icon);

Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
