import App from './App'
import NavgationBar from './components/navbar/index.vue'
import Tabbar from './components/tabbar/index.vue'
import SubNav from './components/navbar/subNav.vue'
import Empty from './components/common/empty.vue'
import './static/css/global.scss'

Vue.component('navgation-bar', NavgationBar)
Vue.component('tab-bar', Tabbar)
Vue.component('sub-nav', SubNav)
Vue.component('empty', Empty)
// 引入store
import store from "@/store/index";

// 引入API
import api from '@/api/index.js'
Vue.prototype.$api = api
/**
 * Copies the given text to the clipboard.
 * @param {string} text - The text to be copied.
 */
Vue.prototype.$copyToClipboard = function(text) {
  // Set the clipboard data.
  uni.setClipboardData({
    // The text to be copied.
    data: text,
    // Callback function when the copying is successful.
    success: () => {
      uni.showToast({
        // The toast message to be displayed.
        title: 'Copiado com sucesso',
        // Icon to be displayed.
        icon: 'none',
        // Duration of the toast.
        duration: 1500
      });
    },
    // Callback function when the copying fails.
    fail: (err) => {
      uni.showToast({
        // The toast message to be displayed.
        title: 'Falha na cópia, tente novamente',
        // Icon to be displayed.
        icon: 'none',
        // Duration of the toast.
        duration: 1500
      });
      // Log the error message.
      console.error('Falha na cópia:', err);
    },
  });
};
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif