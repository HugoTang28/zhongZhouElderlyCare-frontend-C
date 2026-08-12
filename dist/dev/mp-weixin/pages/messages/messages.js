"use strict";
const common_vendor = require("../../common/vendor.js");
const api_family = require("../../api/family.js");
const utils_format = require("../../utils/format.js");
const _sfc_main = {
  __name: "messages",
  setup(__props) {
    const messages = common_vendor.ref([]);
    const alarmRules = common_vendor.ref([]);
    const devices = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const msgIconMap = { "探视": "👋", "护理": "💊", "财务": "💰", "账单": "📄", "系统": "📢" };
    const msgClsMap = { "探视": "visit", "护理": "care", "财务": "finance", "账单": "bill", "系统": "system" };
    const deviceTextMap = { 0: "离线", 1: "在线", 2: "故障" };
    const deviceClsMap = { 1: "online", 2: "fault" };
    const alarmTextMap = { 0: "停用", 1: "启用" };
    function load() {
      loading.value = true;
      const p1 = api_family.getMessages().then((data) => {
        messages.value = (data || []).map((it) => ({
          ...it,
          icon: msgIconMap[it.msgType] || "📢",
          cls: msgClsMap[it.msgType] || "system",
          timeText: utils_format.fmtTime(it.createTime)
        }));
      }).catch((err) => console.error("加载消息失败", err));
      const p2 = api_family.getAlarms().then((data) => {
        alarmRules.value = (data && data.rules || []).map((it) => ({
          ...it,
          statusText: alarmTextMap[it.status] || "未知"
        }));
        devices.value = (data && data.devices || []).map((it) => ({
          ...it,
          statusText: deviceTextMap[it.status] || "未知",
          statusCls: deviceClsMap[it.status] || "offline"
        }));
      }).catch((err) => console.error("加载预警失败", err));
      return Promise.all([p1, p2]).finally(() => {
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
        b: !messages.value.length
      }, !messages.value.length ? {} : {
        c: common_vendor.f(messages.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.n(item.cls),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.content),
            e: common_vendor.t(item.timeText),
            f: "m" + index
          };
        })
      }, {
        d: !alarmRules.value.length
      }, !alarmRules.value.length ? {} : {
        e: common_vendor.f(alarmRules.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.ruleName),
            b: common_vendor.t(item.deviceType),
            c: common_vendor.t(item.alarmCondition),
            d: "r" + index
          };
        })
      }, {
        f: !devices.value.length
      }, !devices.value.length ? {} : {
        g: common_vendor.f(devices.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.deviceName),
            b: common_vendor.t(item.deviceType),
            c: common_vendor.t(item.statusText),
            d: common_vendor.n(item.statusCls),
            e: "d" + index
          };
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f5640984"]]);
wx.createPage(MiniProgramPage);
