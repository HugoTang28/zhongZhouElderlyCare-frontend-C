"use strict";
const common_vendor = require("../../common/vendor.js");
const api_family = require("../../api/family.js");
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
        a: common_vendor.o(($event) => phoneFocus.value = true, "17"),
        b: common_vendor.o(($event) => phoneFocus.value = false, "17"),
        c: phone.value,
        d: common_vendor.o(($event) => phone.value = $event.detail.value, "61"),
        e: phoneFocus.value ? 1 : "",
        f: common_vendor.o(($event) => codeFocus.value = true, "7f"),
        g: common_vendor.o(($event) => codeFocus.value = false, "2d"),
        h: code.value,
        i: common_vendor.o(($event) => code.value = $event.detail.value, "06"),
        j: common_vendor.t(codeText.value),
        k: common_vendor.o(getCode, "27"),
        l: counting.value,
        m: codeFocus.value ? 1 : "",
        n: common_vendor.o(doLogin, "b2"),
        o: devCode.value
      }, devCode.value ? {
        p: common_vendor.t(devCode.value)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfe2409"]]);
wx.createPage(MiniProgramPage);
