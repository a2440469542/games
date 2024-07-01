// request.js
import config from "../config/index.js";
const BASE_URL = config.baseUrl; // 替换成你的API的基本URL
import store from '@/store'; // 引入 Vuex store

// 创建loading实例
let globalLoading = null;
function showLoading() {
  if (!globalLoading) {
    globalLoading = uni.showLoading({
      title: "carregando...",
      mask: true, // 是否显示透明蒙层，防止触摸穿透
    });
  }
}

function hideLoading() {
  if (globalLoading) {
    uni.hideLoading();
    globalLoading = null;
  }
}
function request(url, method = "GET", data = {}, header = {}) {
  showLoading();
  console.log('store.state.SystemStore.channelInfo', store.state.SystemStore.channelInfo.cid)
  header.cid = store.state.SystemStore.channelInfo.cid || '';
  header.Authorization = uni.getStorageSync("token") || "";
  return new Promise((resolve, reject) => {
    let options = {
      url: BASE_URL + url,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        hideLoading();
        //console.log(res);
        let { code } = res.data;
        if (code === 0) {
          // 存入token
          if (res.data.data.token) {
            const newToken = res.data.data.token;
            uni.setStorageSync("token", newToken);
            uni.setStorageSync("cid", res.data.data.cid);
          }
          resolve(res.data.data);
        } else if (res.statusCode == 401) {
          uni.removeStorageSync("token");
          uni.removeStorageSync("channelInfo");
          store.dispatch('setIsLogin', false)
          store.dispatch('setUserinfo', {})
          uni.reLaunch({
            url: "/pages/index/index",
          });
        } else if (code == 102) {
          resolve(res.data);
        } else {
          hideLoading();
          uni.showToast({
            title: res.data.msg || "Falha na solicitação",
            duration: 2000,
          });
          reject(new Error("Request failed"));
        }
      },
      fail: (err) => {
        reject(err);
      },
    };
    options.withCredentials = true;
    uni.request(options);
  });
}

export default request;
