"use strict";
const common_vendor = require("../../common/vendor.js");
const api_family = require("../../api/family.js");
const utils_format = require("../../utils/format.js");
if (!Array) {
  const _easycom_up_loading_icon2 = common_vendor.resolveComponent("up-loading-icon");
  const _easycom_up_empty2 = common_vendor.resolveComponent("up-empty");
  const _easycom_up_tag2 = common_vendor.resolveComponent("up-tag");
  (_easycom_up_loading_icon2 + _easycom_up_empty2 + _easycom_up_tag2)();
}
const _easycom_up_loading_icon = () => "../../node-modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_up_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_up_tag = () => "../../node-modules/uview-plus/components/u-tag/u-tag.js";
if (!Math) {
  (_easycom_up_loading_icon + _easycom_up_empty + _easycom_up_tag)();
}
const _sfc_main = {
  __name: "visits",
  setup(__props) {
    const appointments = common_vendor.ref([]);
    const registrations = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const apptTextMap = { 0: "待审核", 1: "已通过", 2: "已拒绝", 3: "已取消" };
    const apptBgMap = { 0: "#fff5e6", 1: "#e6f9f0", 2: "#ffebeb", 3: "#f2f2f2" };
    const apptColorMap = { 0: "#ff9900", 1: "#07c160", 2: "#ff4d4f", 3: "#999" };
    function load() {
      loading.value = true;
      return api_family.getVisits().then((data) => {
        appointments.value = (data && data.appointments || []).map((it) => ({
          ...it,
          apptText: apptTextMap[it.status] || "未知",
          apptBg: apptBgMap[it.status] || "#f5f7fa",
          apptColor: apptColorMap[it.status] || "#999",
          visitTimeText: utils_format.fmtTime(it.visitTime)
        }));
        registrations.value = (data && data.registrations || []).map((it) => ({
          ...it,
          arriveTimeText: utils_format.fmtTime(it.arriveTime),
          leaveTimeText: it.leaveTime ? utils_format.fmtTime(it.leaveTime) : "未离开",
          idCardMasked: utils_format.maskIdCard(it.idCard)
        }));
      }).catch((err) => {
        console.error("加载探视记录失败", err);
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
          text: "正在加载探视记录...",
          textSize: "15",
          color: "#3b7cff",
          textColor: "#666"
        })
      } : common_vendor.e({
        c: !appointments.value.length
      }, !appointments.value.length ? {
        d: common_vendor.p({
          mode: "list",
          text: "暂无预约记录",
          marginTop: "40"
        })
      } : {
        e: common_vendor.f(appointments.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.visitorName),
            b: "367d0dd2-2-" + i0,
            c: common_vendor.p({
              text: item.apptText,
              bgColor: item.apptBg,
              color: item.apptColor,
              borderColor: item.apptBg,
              size: "mini"
            }),
            d: common_vendor.t(item.elderName),
            e: common_vendor.t(item.visitTimeText),
            f: common_vendor.t(item.purpose || "-"),
            g: common_vendor.t(item.phone || "-"),
            h: "a" + index
          };
        })
      }, {
        f: !registrations.value.length
      }, !registrations.value.length ? {
        g: common_vendor.p({
          mode: "list",
          text: "暂无登记记录",
          marginTop: "40"
        })
      } : {
        h: common_vendor.f(registrations.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.visitorName),
            b: "367d0dd2-4-" + i0,
            c: common_vendor.p({
              text: item.relation || "家属",
              bgColor: "#f2f2f2",
              color: "#666",
              borderColor: "#f2f2f2",
              size: "mini"
            }),
            d: common_vendor.t(item.elderName),
            e: common_vendor.t(item.arriveTimeText),
            f: common_vendor.t(item.leaveTimeText),
            g: common_vendor.t(item.idCardMasked),
            h: "r" + index
          };
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-367d0dd2"]]);
wx.createPage(MiniProgramPage);
