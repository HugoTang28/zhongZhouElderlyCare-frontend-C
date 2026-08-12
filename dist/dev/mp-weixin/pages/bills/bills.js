"use strict";
const common_vendor = require("../../common/vendor.js");
const api_family = require("../../api/family.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "bills",
  setup(__props) {
    const bills = common_vendor.ref([]);
    const prestore = common_vendor.ref([]);
    const balance = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const billStatusTextMap = { 0: "未缴", 1: "已缴", 2: "退费" };
    const billStatusClsMap = { 0: "unpaid", 1: "paid", 2: "refund" };
    const prestoreTypeMap = { 0: "预存充值", 1: "费用扣款", 2: "退款" };
    function load() {
      loading.value = true;
      return api_family.getBills().then((data) => {
        bills.value = (data && data.bills || []).map((it) => ({
          ...it,
          statusText: billStatusTextMap[it.status] || "未知",
          statusCls: billStatusClsMap[it.status] || "unpaid",
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
      }, loading.value ? {} : common_vendor.e({
        c: !bills.value.length
      }, !bills.value.length ? {} : {
        d: common_vendor.f(bills.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.billType),
            b: common_vendor.t(item.amount),
            c: common_vendor.n(item.statusCls),
            d: common_vendor.t(item.elderName),
            e: common_vendor.t(item.statusText),
            f: common_vendor.n(item.statusCls),
            g: common_vendor.t(item.timeText),
            h: "b" + index
          };
        })
      }, {
        e: !prestore.value.length
      }, !prestore.value.length ? {} : {
        f: common_vendor.f(prestore.value, (item, index, i0) => {
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
