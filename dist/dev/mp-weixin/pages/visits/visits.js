"use strict";
const common_vendor = require("../../common/vendor.js");
const api_family = require("../../api/family.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "visits",
  setup(__props) {
    const appointments = common_vendor.ref([]);
    const registrations = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const apptTextMap = { 0: "待审核", 1: "已通过", 2: "已拒绝", 3: "已取消" };
    const apptClsMap = { 0: "wait", 1: "pass", 2: "reject", 3: "cancel" };
    function load() {
      loading.value = true;
      return api_family.getVisits().then((data) => {
        appointments.value = (data && data.appointments || []).map((it) => ({
          ...it,
          apptText: apptTextMap[it.status] || "未知",
          apptCls: apptClsMap[it.status] || "grey",
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
      }, loading.value ? {} : common_vendor.e({
        b: !appointments.value.length
      }, !appointments.value.length ? {} : {
        c: common_vendor.f(appointments.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.visitorName),
            b: common_vendor.t(item.apptText),
            c: common_vendor.n(item.apptCls),
            d: common_vendor.t(item.elderName),
            e: common_vendor.t(item.visitTimeText),
            f: common_vendor.t(item.purpose || "-"),
            g: common_vendor.t(item.phone || "-"),
            h: "a" + index
          };
        })
      }, {
        d: !registrations.value.length
      }, !registrations.value.length ? {} : {
        e: common_vendor.f(registrations.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.visitorName),
            b: common_vendor.t(item.relation || "家属"),
            c: common_vendor.t(item.elderName),
            d: common_vendor.t(item.arriveTimeText),
            e: common_vendor.t(item.leaveTimeText),
            f: common_vendor.t(item.idCardMasked),
            g: "r" + index
          };
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-367d0dd2"]]);
wx.createPage(MiniProgramPage);
