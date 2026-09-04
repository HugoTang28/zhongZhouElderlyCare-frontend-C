"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "up-form-item",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$2],
  data() {
    return {
      // 错误提示语
      message: "",
      parentData: {
        // 提示文本的位置
        labelPosition: "left",
        // 提示文本对齐方式
        labelAlign: "left",
        // 提示文本的样式
        labelStyle: {},
        // 提示文本的宽度
        labelWidth: 45,
        // 错误提示方式
        errorType: "message"
      },
      color: common_vendor.color,
      itemRules: []
    };
  },
  // 组件创建完成时，将当前实例保存到u-form中
  computed: {
    labelDynamicStyle() {
      return {
        color: this.upThemeVar("--up-main-color", "#303133")
      };
    },
    propsLine() {
      return common_vendor.props$3.line;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  emits: ["click"],
  watch: {
    // 监听规则的变化
    rules: {
      immediate: true,
      handler(n) {
        this.setRules(n);
      }
    }
  },
  methods: {
    addStyle: common_vendor.addStyle,
    addUnit: common_vendor.addUnit,
    init() {
      this.updateParentData();
      if (!this.parent) {
        common_vendor.error("u-form-item需要结合up-form组件使用");
      }
    },
    // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
    setRules(rules) {
      if (rules.length === 0) {
        this.itemRules = [];
        return;
      }
      this.itemRules = rules;
    },
    // 获取父组件的参数
    updateParentData() {
      this.getParentData("up-form");
    },
    // 移除u-form-item的校验结果
    clearValidate() {
      this.message = "";
    },
    // 清空当前的组件的校验结果，并重置为初始值
    resetField() {
      const value = common_vendor.getProperty(this.parent.$data["originalModel"], this.prop);
      common_vendor.setProperty(this.parent.$props["model"], this.prop, value);
      this.message = "";
    },
    // 点击组件
    clickHandler() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _component_u_line = common_vendor.resolveComponent("u-line");
  (_easycom_up_icon2 + _component_u_line)();
}
const _easycom_up_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.required || _ctx.leftIcon != "" || _ctx.label != ""
  }, _ctx.required || _ctx.leftIcon != "" || _ctx.label != "" ? common_vendor.e({
    b: _ctx.required
  }, _ctx.required ? {} : {}, {
    c: _ctx.leftIcon
  }, _ctx.leftIcon ? {
    d: common_vendor.p({
      name: _ctx.leftIcon,
      ["custom-style"]: _ctx.leftIconStyle
    })
  } : {}, {
    e: common_vendor.t(_ctx.label),
    f: common_vendor.s($options.labelDynamicStyle),
    g: common_vendor.s($data.parentData.labelStyle),
    h: common_vendor.s({
      justifyContent: $data.parentData["labelAlign"] === "left" ? "flex-start" : $data.parentData["labelAlign"] === "center" ? "center" : "flex-end"
    }),
    i: $options.addUnit(_ctx.labelWidth || $data.parentData["labelWidth"]),
    j: (_ctx.labelPosition || $data.parentData["labelPosition"]) === "left" ? 0 : "5px"
  }) : {}, {
    k: _ctx.$slots["right"]
  }, _ctx.$slots["right"] ? {} : {}, {
    l: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args), "80"),
    m: common_vendor.s($options.addStyle(_ctx.customStyle)),
    n: common_vendor.s({
      flexDirection: (_ctx.labelPosition || $data.parentData["labelPosition"]) === "left" ? "row" : "column"
    }),
    o: $data.message != "" && $data.parentData["errorType"] === "message"
  }, $data.message != "" && $data.parentData["errorType"] === "message" ? {
    p: common_vendor.t($data.message),
    q: $options.addUnit((_ctx.labelPosition || $data.parentData["labelPosition"]) === "top" ? 0 : _ctx.labelWidth || $data.parentData["labelWidth"])
  } : {}, {
    r: _ctx.borderBottom
  }, _ctx.borderBottom ? {
    s: common_vendor.p({
      color: $data.message != "" && $data.parentData["errorType"] === "border-bottom" ? $data.color["error"] : $options.propsLine["color"],
      customStyle: `margin-top: ${$data.message != "" && $data.parentData["errorType"] === "message" ? "5px" : 0}`
    })
  } : {}, {
    t: $data.message != "" && $data.parentData["errorType"] === "message" ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b4fd400b"]]);
wx.createComponent(Component);
