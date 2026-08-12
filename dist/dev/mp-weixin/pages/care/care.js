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
  __name: "care",
  setup(__props) {
    const plans = common_vendor.ref([]);
    const tasks = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const planTextMap = { 0: "执行中", 1: "已完成", 2: "已暂停" };
    const planBgMap = { 0: "#e6f0ff", 1: "#e6f9f0", 2: "#fff5e6" };
    const planColorMap = { 0: "#3b7cff", 1: "#07c160", 2: "#ff9900" };
    const taskTextMap = { 0: "待执行", 1: "执行中", 2: "已完成", 3: "已取消" };
    const taskBgMap = { 0: "#f2f2f2", 1: "#e6f0ff", 2: "#e6f9f0", 3: "#ffebeb" };
    const taskColorMap = { 0: "#999", 1: "#3b7cff", 2: "#07c160", 3: "#ff4d4f" };
    function load() {
      loading.value = true;
      return api_family.getCare().then((data) => {
        plans.value = (data && data.plans || []).map((it) => ({
          ...it,
          statusText: planTextMap[it.status] || "未知",
          statusBg: planBgMap[it.status] || "#f5f7fa",
          statusColor: planColorMap[it.status] || "#999",
          periodText: utils_format.fmtTime(it.startDate) + " 至 " + utils_format.fmtTime(it.endDate)
        }));
        tasks.value = (data && data.tasks || []).map((it) => ({
          ...it,
          statusText: taskTextMap[it.status] || "未知",
          statusBg: taskBgMap[it.status] || "#f5f7fa",
          statusColor: taskColorMap[it.status] || "#999",
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
      }, loading.value ? {
        b: common_vendor.p({
          text: "正在加载护理动态...",
          textSize: "15",
          color: "#3b7cff",
          textColor: "#666"
        })
      } : common_vendor.e({
        c: !plans.value.length
      }, !plans.value.length ? {
        d: common_vendor.p({
          mode: "list",
          text: "暂无护理计划",
          marginTop: "40"
        })
      } : {
        e: common_vendor.f(plans.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.planName),
            b: "9bfbe887-2-" + i0,
            c: common_vendor.p({
              text: item.statusText,
              bgColor: item.statusBg,
              color: item.statusColor,
              borderColor: item.statusBg,
              size: "mini"
            }),
            d: common_vendor.t(item.elderName),
            e: common_vendor.t(item.periodText),
            f: common_vendor.t(item.content || "-"),
            g: "p" + index
          };
        })
      }, {
        f: !tasks.value.length
      }, !tasks.value.length ? {
        g: common_vendor.p({
          mode: "list",
          text: "暂无护理任务",
          marginTop: "40"
        })
      } : {
        h: common_vendor.f(tasks.value, (item, index, i0) => {
          return {
            a: item.statusColor,
            b: common_vendor.t(item.taskName),
            c: common_vendor.t(item.elderName),
            d: common_vendor.t(item.executor || "未分配"),
            e: common_vendor.t(item.planTimeText),
            f: "9bfbe887-4-" + i0,
            g: common_vendor.p({
              text: item.statusText,
              bgColor: item.statusBg,
              color: item.statusColor,
              borderColor: item.statusBg,
              size: "mini",
              customStyle: "margin-top: 12rpx; display: inline-flex;"
            }),
            h: "t" + index
          };
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9bfbe887"]]);
wx.createPage(MiniProgramPage);
