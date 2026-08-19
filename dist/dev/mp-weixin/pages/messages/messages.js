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
  __name: "messages",
  setup(__props) {
    const messages = common_vendor.ref([]);
    const alarmRules = common_vendor.ref([]);
    const devices = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const msgIconMap = { "探视": "👋", "护理": "💊", "财务": "💰", "账单": "📄", "系统": "📢" };
    const msgClsMap = { "探视": "visit", "护理": "care", "财务": "finance", "账单": "bill", "系统": "system" };
    const deviceTextMap = { 0: "离线", 1: "在线", 2: "故障" };
    const deviceBgMap = { 0: "#f2f2f2", 1: "#e6f9f0", 2: "#ffebeb" };
    const deviceColorMap = { 0: "#999", 1: "#07c160", 2: "#ff4d4f" };
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
          statusBg: deviceBgMap[it.status] || "#f5f7fa",
          statusColor: deviceColorMap[it.status] || "#999"
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
      }, loading.value ? {
        b: common_vendor.p({
          text: "正在加载消息...",
          textSize: "15",
          color: "#3b7cff",
          textColor: "#666"
        })
      } : common_vendor.e({
        c: !messages.value.length
      }, !messages.value.length ? {
        d: common_vendor.p({
          mode: "list",
          text: "暂无消息",
          marginTop: "40"
        })
      } : {
        e: common_vendor.f(messages.value, (item, index, i0) => {
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
        f: !alarmRules.value.length
      }, !alarmRules.value.length ? {
        g: common_vendor.p({
          mode: "list",
          text: "暂无预警规则",
          marginTop: "40"
        })
      } : {
        h: common_vendor.f(alarmRules.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.ruleName),
            b: "f5640984-3-" + i0,
            c: common_vendor.t(item.deviceType),
            d: common_vendor.t(item.alarmCondition),
            e: "r" + index
          };
        }),
        i: common_vendor.p({
          text: "预警中",
          bgColor: "#ffebeb",
          color: "#ff4d4f",
          borderColor: "#ffebeb",
          size: "mini"
        })
      }, {
        j: !devices.value.length
      }, !devices.value.length ? {
        k: common_vendor.p({
          mode: "list",
          text: "暂无设备",
          marginTop: "40"
        })
      } : {
        l: common_vendor.f(devices.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.deviceName),
            b: common_vendor.t(item.deviceType),
            c: "f5640984-5-" + i0,
            d: common_vendor.p({
              text: item.statusText,
              bgColor: item.statusBg,
              color: item.statusColor,
              borderColor: item.statusBg,
              size: "mini"
            }),
            e: "d" + index
          };
        })
      }));
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f5640984"]]);
wx.createPage(MiniProgramPage);
