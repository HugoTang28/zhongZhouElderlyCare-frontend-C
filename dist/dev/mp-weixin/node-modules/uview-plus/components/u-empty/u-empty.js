"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-empty",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$7],
  data() {
    return {
      icons: {
        car: common_vendor.t$1("up.empty.car"),
        page: common_vendor.t$1("up.empty.page"),
        search: common_vendor.t$1("up.empty.search"),
        address: common_vendor.t$1("up.empty.address"),
        wifi: common_vendor.t$1("up.empty.wifi"),
        order: common_vendor.t$1("up.empty.order"),
        coupon: common_vendor.t$1("up.empty.coupon"),
        favor: common_vendor.t$1("up.empty.favor"),
        permission: common_vendor.t$1("up.empty.permission"),
        history: common_vendor.t$1("up.empty.history"),
        news: common_vendor.t$1("up.empty.news"),
        message: common_vendor.t$1("up.empty.message"),
        list: common_vendor.t$1("up.empty.list"),
        data: common_vendor.t$1("up.empty.data"),
        comment: common_vendor.t$1("up.empty.comment")
      }
    };
  },
  computed: {
    // 组件样式
    emptyStyle() {
      const style = {};
      style.marginTop = common_vendor.addUnit(this.marginTop);
      return common_vendor.deepMerge(common_vendor.addStyle(this.customStyle), style);
    },
    // 文本样式
    textStyle() {
      const style = {};
      style.color = this.textColor;
      style.fontSize = common_vendor.addUnit(this.textSize);
      return style;
    },
    // 判断icon是否图片路径
    isSrc() {
      return this.icon.indexOf("/") >= 0;
    }
  },
  methods: {
    addUnit: common_vendor.addUnit
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.show
  }, _ctx.show ? common_vendor.e({
    b: !$options.isSrc
  }, !$options.isSrc ? {
    c: common_vendor.p({
      name: _ctx.mode === "message" ? "chat" : `empty-${_ctx.mode}`,
      size: _ctx.iconSize,
      color: _ctx.iconColor,
      ["margin-top"]: "14"
    })
  } : {
    d: $options.addUnit(_ctx.width),
    e: $options.addUnit(_ctx.height),
    f: _ctx.icon
  }, {
    g: common_vendor.t(_ctx.text ? _ctx.text : $data.icons[_ctx.mode]),
    h: common_vendor.s($options.textStyle),
    i: _ctx.$slots.default || _ctx.$slots.$default
  }, _ctx.$slots.default || _ctx.$slots.$default ? {} : {}, {
    j: common_vendor.s($options.emptyStyle)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bd84101d"]]);
wx.createComponent(Component);
