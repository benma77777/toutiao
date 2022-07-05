import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.less";

import TouTiaoIcon from "@/components/TouTiaoIcon";

// 引入vant
import vant from "vant";
// 引入vant 样式
import "vant/lib/index.less";
//注册vant
Vue.use(vant);
// 动态设置 REM 基准值（html 标签的字体大小）
import "amfe-flexible";

// axios
// import request from "@/utils/request";
// request.get("/v1_0/channels").then((res) => {
//   console.log(res);
// });
Vue.component("TouTiaoIcon", TouTiaoIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
