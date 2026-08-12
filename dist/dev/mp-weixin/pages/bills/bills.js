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
  __name: "bills",
  setup(__props) {
    const bills = common_vendor.ref([]);
    const prestore = common_vendor.ref([]);
    const balance = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const billStatusTextMap = { 0: "未缴", 1: "已缴", 2: "退费" };
    const billStatusClsMap = { 0: "unpaid", 1: "paid", 2: "refund" };
    const billStatusTypeMap = { 0: "danger", 1: "success", 2: "warning" };
    const billStatusBgMap = { 0: "#ffebeb", 1: "#e6f9f0", 2: "#fff5e6" };
    const billStatusColorMap = { 0: "#ff4d4f", 1: "#07c160", 2: "#ff9900" };
    const prestoreTypeMap = { 0: "预存充值", 1: "费用扣款", 2: "退款" };
    function load() {
      loading.value = true;
      return api_family.getBills().then((data) => {
        bills.value = (data && data.bills || []).map((it) => ({
          ...it,
          statusText: billStatusTextMap[it.status] || "未知",
          statusCls: billStatusClsMap[it.status] || "unpaid",
          statusType: billStatusTypeMap[it.status] || "danger",
          statusBg: billStatusBgMap[it.status] || "#f5f7fa",
          statusColor: billStatusColorMap[it.status] || "#999",
          timeText: it.billMonth || utils_format.fmtTime(it.createTime)
        }));
        prestore.value = (data && data.prestores || []).map((it) => ({
          ...it,
          amountText: (it.amount >= 0 ? "+" : "") + (it.amount != null ? it.amount : "0"),
          amountCls: it.amount >= 0 ? "in" : "out",
          typeText: prestoreTypeMap[it.transType] || "其它",
          timeText: utils_format.fmtTime(it.createTime)
        }));
        balance.value = data && data.balance != null ? data.balance : 0;
      }).catch((err) => {
        console.error("加载账单失败", err);
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
        a: common_vendor.t(balance.value),
        b: loading.value
      }, loading.value ? {
        c: common_vendor.p({
          text: "正在加载账单...",
          textSize: "15",
          color: "#3b7cff",
          textColor: "#666"
        })
      } : common_vendor.e({
        d: !bills.value.length
      }, !bills.value.length ? {
        e: common_vendor.p({
          mode: "list",
          text: "暂无账单",
          marginTop: "40"
        })
      } : {
        f: common_vendor.f(bills.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.billType),
            b: common_vendor.t(item.amount),
            c: common_vendor.n(item.statusCls),
            d: common_vendor.t(item.elderName),
            e: "3b793916-2-" + i0,
            f: common_vendor.p({
              text: item.statusText,
              bgColor: item.statusBg,
              color: item.statusColor,
              borderColor: item.statusBg,
              size: "mini"
            }),
            g: common_vendor.t(item.timeText),
            h: "b" + index
          };
        })
      }, {
        g: !prestore.value.length
      }, !prestore.value.length ? {
        h: common_vendor.p({
          mode: "list",
          text: "暂无预存记录",
          marginTop: "40"
        })
      } : {
        i: common_vendor.f(prestore.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.typeText),
            b: common_vendor.t(item.timeText),
            c: common_vendor.t(item.amountText),
            d: common_vendor.n(item.amountCls),
            e: common_vendor.t(item.balance),
            f: "p" + index
          };
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3b793916"]]);
wx.createPage(MiniProgramPage);
