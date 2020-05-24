import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from './store'
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(mavonEditor)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
