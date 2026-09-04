"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-button",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.buttonMixin, common_vendor.openType, common_vendor.props$4],
  data() {
    return {};
  },
  computed: {
    // 生成bem风格的类名
    bemClass() {
      if (!this.color) {
        return this.bem(
          "button",
          ["type", "shape", "size"],
          ["disabled", "plain", "hairline"]
        );
      } else {
        return this.bem(
          "button",
          ["shape", "size"],
          ["disabled", "plain", "hairline"]
        );
      }
    },
    isDarkTheme() {
      return this.$u.theme && this.$u.theme.mode === "dark";
    },
    nvueMainColor() {
      return this.resolveNvueColor(this.$u.color.mainColor, this.isDarkTheme ? "#f5f5f5" : "#303133");
    },
    nvueBorderColor() {
      return this.resolveNvueColor(this.$u.color.borderColor, this.isDarkTheme ? "#3a3a3c" : "#dadbde");
    },
    themeTypeColor() {
      const fallbackMap = {
        primary: "#3c9cff",
        success: "#5ac725",
        warning: "#f9ae3d",
        error: "#f56c6c",
        info: "#909399"
      };
      const type = fallbackMap[this.type] ? this.type : "info";
      return this.resolveNvueColor(
        this.upThemeVar(`--up-${type}`, fallbackMap[type]),
        fallbackMap[type]
      );
    },
    nvueInfoBackgroundColor() {
      return this.upThemeVar(
        "--up-button-info-background-color",
        this.upThemeVar(
          "--up-card-bg-color",
          this.isDarkTheme ? "#1c1c1e" : "#ffffff"
        )
      );
    },
    nvuePlainBackgroundColor() {
      return this.upThemeVar(
        "--up-button-plain-background-color",
        this.upThemeVar(
          "--up-card-bg-color",
          this.isDarkTheme ? "#1c1c1e" : "#ffffff"
        )
      );
    },
    loadingColor() {
      if (this.plain) {
        return this.color ? this.color : this.themeTypeColor;
      }
      if (this.type === "info") {
        return this.isDarkTheme ? "#9ca3af" : "#c9c9c9";
      }
      return "rgb(200, 200, 200)";
    },
    iconColorCom() {
      if (this.iconColor)
        return this.iconColor;
      if (this.plain) {
        return this.color ? this.color : this.type;
      } else {
        return this.type === "info" ? this.nvueMainColor : "#ffffff";
      }
    },
    baseColor() {
      let style = {};
      if (this.color) {
        style.color = this.plain ? this.color : "white";
        if (!this.plain) {
          style["background-color"] = this.color;
        }
        if (this.color.indexOf("gradient") !== -1) {
          style.borderTopWidth = 0;
          style.borderRightWidth = 0;
          style.borderBottomWidth = 0;
          style.borderLeftWidth = 0;
          if (!this.plain) {
            style.backgroundImage = this.color;
          }
        } else {
          style.borderColor = this.color;
          style.borderWidth = "1px";
          style.borderStyle = "solid";
        }
        return style;
      }
      return style;
    },
    // nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
    nvueTextStyle() {
      let style = {};
      if (this.type === "info") {
        style.color = this.nvueMainColor;
      }
      if (this.color) {
        style.color = this.plain ? this.color : "white";
      } else if (this.plain && this.type !== "info") {
        style.color = this.themeTypeColor;
      }
      style.fontSize = this.textSize + "px";
      return style;
    },
    // 字体大小
    textSize() {
      let fontSize = 14, { size } = this;
      if (size === "large")
        fontSize = 16;
      if (size === "normal")
        fontSize = 14;
      if (size === "small")
        fontSize = 12;
      if (size === "mini")
        fontSize = 10;
      return fontSize;
    }
  },
  emits: [
    "click",
    "getphonenumber",
    "getuserinfo",
    "error",
    "opensetting",
    "launchapp",
    "agreeprivacyauthorization"
  ],
  methods: {
    addStyle: common_vendor.addStyle,
    resolveNvueColor(colorValue, fallbackColor) {
      if (typeof colorValue !== "string")
        return fallbackColor;
      if (colorValue.indexOf("var(") > -1)
        return fallbackColor;
      return colorValue;
    },
    upThemeVar(varName, fallbackColor) {
      return common_vendor.getThemeVar(varName, fallbackColor, this.$u);
    },
    clickHandler(e) {
      if (!this.disabled && !this.loading) {
        common_vendor.throttle(() => {
          this.$emit("click", e);
        }, this.throttleTime);
      }
      this.stop && this.preventEvent(e);
    },
    // 下面为对接uniapp官方按钮开放能力事件回调的对接
    getphonenumber(res) {
      this.$emit("getphonenumber", res);
    },
    getuserinfo(res) {
      this.$emit("getuserinfo", res);
    },
    error(res) {
      this.$emit("error", res);
    },
    opensetting(res) {
      this.$emit("opensetting", res);
    },
    launchapp(res) {
      this.$emit("launchapp", res);
    },
    agreeprivacyauthorization(res) {
      this.$emit("agreeprivacyauthorization", res);
    }
  }
};
if (!Array) {
  const _component_u_loading_icon = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_component_u_loading_icon + _easycom_up_icon2)();
}
const _easycom_up_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.loading
  }, _ctx.loading ? {
    b: common_vendor.p({
      mode: _ctx.loadingMode,
      size: _ctx.loadingSize * 1.15,
      color: $options.loadingColor
    }),
    c: common_vendor.t(_ctx.loadingText || _ctx.text),
    d: common_vendor.s({
      fontSize: $options.textSize + "px"
    })
  } : common_vendor.e({
    e: _ctx.icon
  }, _ctx.icon ? {
    f: common_vendor.p({
      name: _ctx.icon,
      color: $options.iconColorCom,
      size: $options.textSize * 1.35,
      customStyle: {
        marginRight: "2px"
      }
    })
  } : {}, {
    g: common_vendor.t(_ctx.text),
    h: common_vendor.s({
      fontSize: $options.textSize + "px"
    })
  }), {
    i: Number(_ctx.hoverStartTime),
    j: Number(_ctx.hoverStayTime),
    k: _ctx.formType,
    l: _ctx.openType,
    m: _ctx.appParameter,
    n: _ctx.hoverStopPropagation,
    o: _ctx.sendMessageTitle,
    p: _ctx.sendMessagePath,
    q: _ctx.lang,
    r: _ctx.dataName,
    s: _ctx.sessionFrom,
    t: _ctx.sendMessageImg,
    v: _ctx.showMessageCard,
    w: common_vendor.o((...args) => $options.getphonenumber && $options.getphonenumber(...args), "f8"),
    x: common_vendor.o((...args) => $options.getuserinfo && $options.getuserinfo(...args), "68"),
    y: common_vendor.o((...args) => $options.error && $options.error(...args), "22"),
    z: common_vendor.o((...args) => $options.opensetting && $options.opensetting(...args), "bd"),
    A: common_vendor.o((...args) => $options.launchapp && $options.launchapp(...args), "96"),
    B: common_vendor.o((...args) => $options.agreeprivacyauthorization && $options.agreeprivacyauthorization(...args), "9a"),
    C: !_ctx.disabled && !_ctx.loading ? "u-button--active" : "",
    D: common_vendor.s($options.baseColor),
    E: common_vendor.s($options.addStyle(_ctx.customStyle)),
    F: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args), "b1"),
    G: common_vendor.n($options.bemClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-461e713c"]]);
wx.createComponent(Component);
