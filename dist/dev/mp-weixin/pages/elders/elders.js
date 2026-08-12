"use strict";
const common_vendor = require("../../common/vendor.js");
const api_family = require("../../api/family.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "elders",
  setup(__props) {
    const list = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const statusTextMap = { 0: "在住", 1: "已退住", 2: "待入住" };
    const statusClsMap = { 0: "status-in", 1: "status-out", 2: "status-wait" };
    const sexTextMap = { 1: "男", 2: "女" };
    function load() {
      loading.value = true;
      return api_family.getElders().then((data) => {
        list.value = (data || []).map((it) => ({
          ...it,
          statusText: statusTextMap[it.status] || "未知",
          statusCls: statusClsMap[it.status] || "status-wait",
          sexText: sexTextMap[it.sex] || "未知",
          idCardMasked: utils_format.maskIdCard(it.idCard),
          bedText: it.bedId ? "#" + it.bedId : "暂未分配",
          checkInTimeText: utils_format.fmtTime(it.checkInTime),
          age: it.age || "-"
        }));
      }).catch((err) => {
        console.error("加载家人失败", err);
      }).finally(() => {
        loading.value = false;
      });
    }
    common_vendor.onShow(() => {
      load();
    });
    common_vendor.onPullDownRefresh(() => {
      load().finally(() => common_vendor.index.stopPullDownRefresh());
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : !list.value.length ? {} : {
        c: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.elderName ? item.elderName.charAt(0) : "长"),
            b: common_vendor.t(item.elderName),
            c: common_vendor.t(item.statusText),
            d: common_vendor.n(item.statusCls),
            e: common_vendor.t(item.sexText),
            f: common_vendor.t(item.age),
            g: common_vendor.t(item.idCardMasked),
            h: common_vendor.t(item.bedText),
            i: common_vendor.t(item.contractNo || "-"),
            j: common_vendor.t(item.familyName || "-"),
            k: common_vendor.t(item.familyPhone || "-"),
            l: common_vendor.t(item.checkInTimeText),
            m: index
          };
        })
      }, {
        b: !list.value.length
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18f9d8a6"]]);
wx.createPage(MiniProgramPage);
