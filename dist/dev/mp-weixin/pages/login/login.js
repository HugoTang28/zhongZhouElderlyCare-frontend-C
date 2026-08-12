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
        a: phone.value,
        b: common_vendor.o(($event) => phone.value = $event.detail.value, "d8"),
        c: code.value,
        d: common_vendor.o(($event) => code.value = $event.detail.value, "9b"),
        e: common_vendor.t(codeText.value),
        f: common_vendor.o(getCode, "44"),
        g: counting.value,
        h: common_vendor.o(doLogin, "8b"),
        i: devCode.value
      }, devCode.value ? {
        j: common_vendor.t(devCode.value)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfe2409"]]);
wx.createPage(MiniProgramPage);
