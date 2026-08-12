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
    console.log("App Launch");
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
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
