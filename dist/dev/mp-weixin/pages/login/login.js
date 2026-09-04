"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_family = require("../../api/family.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  (_easycom_up_icon2 + _easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_button2 + _easycom_up_form2)();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_input + _easycom_up_form_item + _easycom_up_button + _easycom_up_form)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const phone = common_vendor.ref("");
    const code = common_vendor.ref("");
    const devCode = common_vendor.ref("");
    const counting = common_vendor.ref(false);
    const codeText = common_vendor.ref("获取验证码");
    common_vendor.ref(false);
    common_vendor.ref(false);
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
          size: "20",
          color: "#3b7cff",
          customStyle: "margin-right: 16rpx;"
        }),
        c: common_vendor.o(($event) => phone.value = $event, "68"),
        d: common_vendor.p({
          type: "number",
          maxlength: "11",
          placeholder: "请输入手机号",
          border: "none",
          customStyle: "background: #f4f6fb; border-radius: 18rpx; padding: 10rpx 24rpx; height: 96rpx;",
          modelValue: phone.value
        }),
        e: common_vendor.p({
          name: "lock",
          size: "20",
          color: "#3b7cff",
          customStyle: "margin-right: 16rpx;"
        }),
        f: common_vendor.o(getCode, "88"),
        g: common_vendor.p({
          text: codeText.value,
          disabled: counting.value,
          type: "primary",
          size: "small",
          customStyle: "height: 72rpx; border-radius: 14rpx; background: #eaf1ff; color: #3b7cff; border: none; font-weight: 600;"
        }),
        h: common_vendor.o(($event) => code.value = $event, "5d"),
        i: common_vendor.p({
          placeholder: "请输入验证码",
          border: "none",
          customStyle: "background: #f4f6fb; border-radius: 18rpx; padding: 10rpx 12rpx 10rpx 24rpx; height: 96rpx;",
          modelValue: code.value
        }),
        j: common_vendor.o(doLogin, "3f"),
        k: common_vendor.p({
          text: "登 录",
          type: "primary",
          customStyle: "margin-top: 16rpx; height: 96rpx; background: linear-gradient(135deg, #3b7cff, #5e9bff); border: none; border-radius: 18rpx; font-size: 34rpx; font-weight: 700; letter-spacing: 4rpx; box-shadow: 0 14rpx 30rpx rgba(59, 124, 255, 0.32);"
        }),
        l: devCode.value
      }, devCode.value ? {
        m: common_vendor.t(devCode.value)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfe2409"]]);
wx.createPage(MiniProgramPage);
