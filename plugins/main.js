import Vue from 'vue'
import ApiService from '../services/api-services'
import moment from "moment"
Vue.prototype.moment = moment;
const apiService = {
  install(Vue) {
    Vue.prototype.$http = ApiService
  }
}

Vue.use(apiService)

// 为了在 asyncData 方法中使用
export default ({ app }, inject) => {
  app.$http = ApiService
}
