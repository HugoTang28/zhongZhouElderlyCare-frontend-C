"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "zz-status-tag",
  props: {
    text: { type: String, default: "" },
    type: { type: String, default: "info" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.text),
        b: common_vendor.n("zz-tag--" + __props.type)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d31591be"]]);
wx.createComponent(Component);
