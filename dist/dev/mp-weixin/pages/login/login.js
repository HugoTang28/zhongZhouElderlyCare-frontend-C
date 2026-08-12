"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_family = require("../../api/family.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const phone = common_vendor.ref("");
    const code = common_vendor.ref("");
    const devCode = common_vendor.ref("");
    const counting = common_vendor.ref(false);
    const codeText = common_vendor.ref("获取验证码");
    const phoneFocus = common_vendor.ref(false);
    const codeFocus = common_vendor.ref(false);
    let timer = null;
    function getCode() {
      if (!/^1\d{10}$/.test(phone.value)) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      api_family.sendCode(phone.value).then((res) => {
        devCode.value = res.devCode;
        startCount();
        common_vendor.index.showToast({ title: "验证码已发送", icon: "none" });
      }).catch(() => {
      });
    }
    function startCount() {
      let n = 60;
      counting.value = true;
      codeText.value = n + "s";
      timer = setInterval(() => {
        n--;
        if (n <= 0) {
          clearInterval(timer);
          counting.value = false;
          codeText.value = "获取验证码";
        } else {
          codeText.value = n + "s";
        }
      }, 1e3);
    }
    function doLogin() {
      if (!phone.value || !code.value) {
        common_vendor.index.showToast({ title: "请输入手机号和验证码", icon: "none" });
        return;
      }
      api_family.familyLogin(phone.value, code.value).then((res) => {
        common_vendor.index.setStorageSync("family_token", res.token);
        common_vendor.index.setStorageSync("family_phone", res.phone);
        common_vendor.index.showToast({ title: "登录成功", icon: "success" });
        setTimeout(() => common_vendor.index.switchTab({ url: "/pages/elders/elders" }), 600);
      }).catch(() => {
      });
    }
    common_vendor.onUnload(() => {
      if (timer)
        clearInterval(timer);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.p({
          name: "phone",
          size: "20"
        }),
        c: common_vendor.o(($event) => phoneFocus.value = true, "3c"),
        d: common_vendor.o(($event) => phoneFocus.value = false, "7c"),
        e: phone.value,
        f: common_vendor.o(($event) => phone.value = $event.detail.value, "d7"),
        g: phoneFocus.value ? 1 : "",
        h: common_vendor.o(($event) => codeFocus.value = true, "d3"),
        i: common_vendor.o(($event) => codeFocus.value = false, "a7"),
        j: code.value,
        k: common_vendor.o(($event) => code.value = $event.detail.value, "6a"),
        l: common_vendor.t(codeText.value),
        m: common_vendor.o(getCode, "d0"),
        n: counting.value,
        o: codeFocus.value ? 1 : "",
        p: common_vendor.o(doLogin, "93"),
        q: devCode.value
      }, devCode.value ? {
        r: common_vendor.t(devCode.value)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfe2409"]]);
wx.createPage(MiniProgramPage);
