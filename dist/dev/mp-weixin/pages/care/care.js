"use strict";
const common_vendor = require("../../common/vendor.js");
const api_family = require("../../api/family.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "care",
  setup(__props) {
    const plans = common_vendor.ref([]);
    const tasks = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const planTextMap = { 0: "执行中", 1: "已完成", 2: "已暂停" };
    const planClsMap = { 0: "doing", 1: "done", 2: "pause" };
    const taskTextMap = { 0: "待执行", 1: "执行中", 2: "已完成", 3: "已取消" };
    const taskClsMap = { 0: "wait", 1: "doing", 2: "done", 3: "cancel" };
    function load() {
      loading.value = true;
      return api_family.getCare().then((data) => {
        plans.value = (data && data.plans || []).map((it) => ({
          ...it,
          statusText: planTextMap[it.status] || "未知",
          statusCls: planClsMap[it.status] || "wait",
          periodText: utils_format.fmtTime(it.startDate) + " 至 " + utils_format.fmtTime(it.endDate)
        }));
        tasks.value = (data && data.tasks || []).map((it) => ({
          ...it,
          statusText: taskTextMap[it.status] || "未知",
          statusCls: taskClsMap[it.status] || "grey",
          planTimeText: utils_format.fmtTime(it.planTime)
        }));
      }).catch((err) => {
        console.error("加载护理动态失败", err);
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
        b: !plans.value.length
      }, !plans.value.length ? {} : {
        c: common_vendor.f(plans.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.planName),
            b: common_vendor.t(item.statusText),
            c: common_vendor.n(item.statusCls),
            d: common_vendor.t(item.elderName),
            e: common_vendor.t(item.periodText),
            f: common_vendor.t(item.content || "-"),
            g: "p" + index
          };
        })
      }, {
        d: !tasks.value.length
      }, !tasks.value.length ? {} : {
        e: common_vendor.f(tasks.value, (item, index, i0) => {
          return {
            a: common_vendor.n(item.statusCls),
            b: common_vendor.t(item.taskName),
            c: common_vendor.t(item.elderName),
            d: common_vendor.t(item.executor || "未分配"),
            e: common_vendor.t(item.planTimeText),
            f: common_vendor.t(item.statusText),
            g: common_vendor.n(item.statusCls),
            h: "t" + index
          };
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9bfbe887"]]);
wx.createPage(MiniProgramPage);
