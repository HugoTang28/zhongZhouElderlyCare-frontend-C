"use strict";
const common_vendor = require("../../common/vendor.js");
const api_family = require("../../api/family.js");
const utils_format = require("../../utils/format.js");
if (!Array) {
  const _easycom_up_loading_icon2 = common_vendor.resolveComponent("up-loading-icon");
  const _easycom_up_empty2 = common_vendor.resolveComponent("up-empty");
  const _easycom_up_tag2 = common_vendor.resolveComponent("up-tag");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_up_loading_icon2 + _easycom_up_empty2 + _easycom_up_tag2 + _easycom_up_icon2)();
}
const _easycom_up_loading_icon = () => "../../node-modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_up_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_up_tag = () => "../../node-modules/uview-plus/components/u-tag/u-tag.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_loading_icon + _easycom_up_empty + _easycom_up_tag + _easycom_up_icon)();
}
const _sfc_main = {
  __name: "elders",
  setup(__props) {
    const list = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const statusTextMap = { 0: "在住", 1: "已退住", 2: "待入住" };
    const statusBgMap = { 0: "#e6f9f0", 1: "#f2f2f2", 2: "#fff5e6" };
    const statusColorMap = { 0: "#07c160", 1: "#999", 2: "#ff9900" };
    const sexTextMap = { 1: "男", 2: "女" };
    function load() {
      loading.value = true;
      return api_family.getElders().then((data) => {
        list.value = (data || []).map((it) => ({
          ...it,
          statusText: statusTextMap[it.status] || "未知",
          statusBg: statusBgMap[it.status] || "#f5f7fa",
          statusColor: statusColorMap[it.status] || "#999",
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
      }, loading.value ? {
        b: common_vendor.p({
          text: "正在加载家人信息...",
          textSize: "15",
          color: "#3b7cff",
          textColor: "#666"
        })
      } : !list.value.length ? {
        d: common_vendor.p({
          mode: "list",
          text: "暂无关联老人",
          marginTop: "40"
        })
      } : {
        e: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.elderName ? item.elderName.charAt(0) : "长"),
            b: common_vendor.t(item.elderName),
            c: "18f9d8a6-2-" + i0,
            d: common_vendor.p({
              text: item.statusText,
              bgColor: item.statusBg,
              color: item.statusColor,
              borderColor: item.statusBg,
              size: "mini"
            }),
            e: common_vendor.t(item.sexText),
            f: common_vendor.t(item.age),
            g: "18f9d8a6-3-" + i0,
            h: common_vendor.t(item.idCardMasked),
            i: common_vendor.t(item.bedText),
            j: common_vendor.t(item.contractNo || "-"),
            k: common_vendor.t(item.familyName || "-"),
            l: common_vendor.t(item.familyPhone || "-"),
            m: common_vendor.t(item.checkInTimeText),
            n: "18f9d8a6-4-" + i0,
            o: index
          };
        }),
        f: common_vendor.p({
          name: "arrow-right",
          color: "#c5ccd6",
          size: "22"
        }),
        g: common_vendor.p({
          name: "arrow-right",
          color: "#9aa0a6",
          size: "18"
        })
      }, {
        c: !list.value.length
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18f9d8a6"]]);
wx.createPage(MiniProgramPage);
