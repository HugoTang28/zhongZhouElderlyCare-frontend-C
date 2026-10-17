"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/elders/elders.js";
  "./pages/visits/visits.js";
  "./pages/bills/bills.js";
  "./pages/care/care.js";
  "./pages/messages/messages.js";
}
const _sfc_main = {
  onLaunch() {
    common_vendor.index.__f__("log", "at App.vue:6", "App Launch");
  },
  onShow() {
    common_vendor.index.__f__("log", "at App.vue:9", "App Show");
  },
  onHide() {
    common_vendor.index.__f__("log", "at App.vue:12", "App Hide");
  }
};
const zzPlaceholder = () => "./components/zz-placeholder/zz-placeholder.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.uviewPlus);
  app.component("zz-placeholder", zzPlaceholder);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
