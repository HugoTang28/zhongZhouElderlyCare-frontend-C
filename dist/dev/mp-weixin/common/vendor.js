"use strict";
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$2 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$2(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LAST_PAGE_BACK_PRESS = "onLastPageBackPress";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_UPLOAD_DOUYIN_VIDEO = "onUploadDouyinVideo";
const ON_LIVE_MOUNT = "onLiveMount";
const ON_TITLE_CLICK = "onTitleClick";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_SHARE_CHAT = "onShareChat";
const ON_COPY_URL = "onCopyUrl";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const VIRTUAL_HOST_STYLE = "virtualHostStyle";
const VIRTUAL_HOST_CLASS = "virtualHostClass";
const VIRTUAL_HOST_HIDDEN = "virtualHostHidden";
const VIRTUAL_HOST_ID = "virtualHostId";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
const encode$1 = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode$1) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$2(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_COPY_URL,
  ON_UPLOAD_DOUYIN_VIDEO,
  ON_LIVE_MOUNT,
  ON_TITLE_CLICK,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_COPY_URL,
  ON_UPLOAD_DOUYIN_VIDEO,
  ON_LIVE_MOUNT,
  ON_TITLE_CLICK,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED,
  ON_LAST_PAGE_BACK_PRESS
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2,
    onShareChat: 1 << 3,
    onCopyUrl: 1 << 4,
    onUploadDouyinVideo: 1 << 5,
    onLiveMount: 1 << 6,
    onTitleClick: 1 << 7
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  return createErrorHandler2(app);
});
const E = function() {
};
E.prototype = {
  _id: 1,
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx,
      _id: this._id
    });
    return this._id++;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, event) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && event) {
      for (var i = evts.length - 1; i >= 0; i--) {
        if (evts[i].fn === event || evts[i].fn._ === event || evts[i]._id === event) {
          evts.splice(i, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages3) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
function getLocaleLanguage$1() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$1(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject$2(prop)) {
    prop = { type: prop };
  }
  const { type: type2, required: required2, validator } = prop;
  if (required2 && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required2) {
    return;
  }
  if (type2 != null) {
    let isValid = false;
    const types2 = isArray$1(type2) ? type2 : [type2];
    const expectedTypes = [];
    for (let i = 0; i < types2.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types2[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type2) {
  let valid;
  const expectedType = getType$1(type2);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type2;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else {
    {
      valid = value instanceof type2;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type2) {
  if (type2 === "String") {
    return `"${value}"`;
  } else if (type2 === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type2) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type2.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject$2(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params2) {
  return function(data) {
    return hook(data, params2) || data;
  };
}
function queue$1(hooks, data, params2) {
  let promise2 = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise2) {
      promise2 = Promise.resolve(wrapperHook(hook, params2));
    } else {
      const res = hook(data, params2);
      if (isPromise(res)) {
        promise2 = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise2 || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray$1(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method3, returnValue) {
  const returnValueHooks = [];
  if (isArray$1(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor2 = scopedInterceptors[method3];
  if (interceptor2 && isArray$1(interceptor2.returnValue)) {
    returnValueHooks.push(...interceptor2.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method3) {
  const interceptor2 = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor2[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method3];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor2[hook] = (interceptor2[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor2;
}
function invokeApi(method3, api, options, params2) {
  const interceptor2 = getApiInterceptorHooks(method3);
  if (interceptor2 && Object.keys(interceptor2).length) {
    if (isArray$1(interceptor2.invoke)) {
      const res = queue$1(interceptor2.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method3), options2), ...params2);
      });
    } else {
      return api(wrapperOptions(interceptor2, options), ...params2);
    }
  }
  return api(options, ...params2);
}
function hasCallback(args) {
  if (isPlainObject$2(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise2) {
  return promise2;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, extend({}, args), rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend({}, args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  args[0];
  {
    return;
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  {
    delete errRes.errCode;
  }
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  const errMsg = formatApiArgs(args);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) {
      console.error(errMsg.message + "\n" + errMsg.stack);
    }
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  var _a, _b;
  let windowWidth, pixelRatio, platform2;
  {
    const windowInfo = ((_a = wx.getWindowInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const deviceInfo = ((_b = wx.getDeviceInfo) === null || _b === void 0 ? void 0 : _b.call(wx)) || wx.getSystemInfoSync();
    windowWidth = windowInfo.windowWidth;
    pixelRatio = windowInfo.pixelRatio;
    platform2 = deviceInfo.platform;
  }
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform2 === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number3, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number3 = Number(number3);
  if (number3 === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number3 / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number3 < 0 ? -result : result;
}, Upx2pxProtocol);
function __f__(type2, filename, ...args) {
  if (filename) {
    args.push(filename);
  }
  console[type2].apply(console, args);
}
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor2) {
  Object.keys(interceptor2).forEach((hook) => {
    if (isFunction(interceptor2[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor2[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor2) {
  if (!interceptors2 || !interceptor2) {
    return;
  }
  Object.keys(interceptor2).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor2[name];
    if (isArray$1(hooks) && isFunction(hook)) {
      remove$1(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$1(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method3, interceptor2) => {
  if (isString(method3) && isPlainObject$2(interceptor2)) {
    mergeInterceptorHook(scopedInterceptors[method3] || (scopedInterceptors[method3] = {}), interceptor2);
  } else if (isPlainObject$2(method3)) {
    mergeInterceptorHook(globalInterceptors, method3);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method3, interceptor2) => {
  if (isString(method3)) {
    if (isPlainObject$2(interceptor2)) {
      removeInterceptorHook(scopedInterceptors[method3], interceptor2);
    } else {
      delete scopedInterceptors[method3];
    }
  } else if (isPlainObject$2(method3)) {
    removeInterceptorHook(globalInterceptors, method3);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: [Function, Number]
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
class EventBus {
  constructor() {
    this.$emitter = new E$1();
  }
  on(name, callback) {
    return this.$emitter.on(name, callback);
  }
  once(name, callback) {
    return this.$emitter.once(name, callback);
  }
  off(name, callback) {
    if (!name) {
      this.$emitter.e = {};
      return;
    }
    this.$emitter.off(name, callback);
  }
  emit(name, ...args) {
    this.$emitter.emit(name, ...args);
  }
}
const eventBus = new EventBus();
const $on = defineSyncApi(API_ON, (name, callback) => {
  eventBus.on(name, callback);
  return () => eventBus.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  eventBus.once(name, callback);
  return () => eventBus.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!isArray$1(name))
    name = name ? [name] : [];
  name.forEach((n2) => {
    eventBus.off(n2, callback);
  });
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  eventBus.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId$1 = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|__f__|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const TASK_APIS = ["request", "downloadFile", "uploadFile", "connectSocket"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function isTaskApi(name) {
  return TASK_APIS.indexOf(name) !== -1;
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise2 = this.constructor;
    return this.then((value) => promise2.resolve(onfinally && onfinally()).then(() => value), (reason) => promise2.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, extend({}, options), rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method3, returnValue) {
    return function(res) {
      return method3(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$2(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$2(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      if (isFunction(argsOption)) {
        argsOption(fromArgs, {});
      }
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    const realKeepReturnValue = keepReturnValue || false;
    return processArgs(methodName, res, returnValue, {}, realKeepReturnValue);
  }
  return function wrapper(methodName, method3) {
    const hasProtocol = hasOwn(protocols2, methodName);
    if (!hasProtocol && typeof wx[methodName] !== "function") {
      return method3;
    }
    const needWrapper = hasProtocol || isFunction(protocols2.returnValue) || isContextApi(methodName) || isTaskApi(methodName);
    const hasMethod = hasProtocol || isFunction(method3);
    if (!hasProtocol && !method3) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    if (!needWrapper || !hasMethod) {
      return method3;
    }
    const protocol = protocols2[methodName];
    return function(arg1, arg2) {
      let options = protocol || {};
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isContextApi(methodName) || isTaskApi(methodName)) {
        if (returnValue && !returnValue.__v_skip) {
          returnValue.__v_skip = true;
        }
      }
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return getLocaleLanguage$1();
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system, platform2) {
  let osName = "";
  let osVersion = "";
  if (platform2 && false) {
    osName = platform2;
    osVersion = system;
    system = `${osName} ${osVersion}`;
  } else {
    {
      osName = platform2;
    }
    osVersion = system.split(" ")[1] || "";
  }
  osName = osName.toLowerCase();
  switch (osName) {
    case "harmony":
    case "ohos":
    case "openharmonyos":
    case "openharmony":
      osName = "harmonyos";
      break;
    case "iphone os":
      osName = "ios";
      break;
    case "mac":
    case "darwin":
      osName = "macos";
      break;
    case "windows_nt":
      osName = "windows";
      break;
  }
  return {
    osName,
    osVersion,
    system
  };
}
function getPlatform$1(platform2) {
  platform2 = platform2.toLowerCase();
  {
    if (platform2 === "ohos") {
      platform2 = "harmonyos";
    }
  }
  return platform2;
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform: platform2, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  const { osName, osVersion, system: updatedSystem } = getOSInfo(system, platform2);
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = (language || "").replace(/_/g, "-");
  const parameters = {
    appId: "touristappid",
    appName: "zzyl-family",
    appVersion: "",
    appVersionCode: "",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "5.23",
    uniCompilerVersion: "5.23",
    uniRuntimeVersion: "5.23",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName,
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    platform: getPlatform$1(platform2),
    system: updatedSystem,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0,
    isUniAppX: false
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  const platform2 = fromRes.platform || "";
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc",
      linux: "pc",
      pc: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  {
    if (platform2 === "ohos_pc") {
      deviceType = "pc";
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo$1 = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo$1;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$1(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model, system = "", platform: platform2 = "" } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    const { osName, osVersion } = getOSInfo(system, platform2);
    toRes = extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion,
      platform: getPlatform$1(platform2)
    });
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = (language || "").replace(/_/g, "-");
    const parameters = {
      appId: "touristappid",
      appName: "zzyl-family",
      appVersion: "",
      appVersionCode: "",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      isUniAppX: false,
      uniPlatform: "mp-weixin",
      uniCompileVersion: "5.23",
      uniCompilerVersion: "5.23",
      uniRuntimeVersion: "5.23"
    };
    try {
      if (typeof wx.getAccountInfoSync === "function") {
        parameters.packagename = wx.getAccountInfoSync().miniProgram.appId;
      }
    } catch (error2) {
    }
    extend(toRes, parameters);
  }
};
const getWindowInfo$1 = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    });
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const onError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        wx.$onErrorHandlers = [];
      }
      wx.$onErrorHandlers.push(fromArgs);
    } else {
      injectHook(ON_ERROR, fromArgs, app.$vm.$);
    }
  }
};
const offError = {
  args(fromArgs) {
    const app = getApp({ allowDefault: true }) || {};
    if (!app.$vm) {
      if (!wx.$onErrorHandlers) {
        return;
      }
      const index2 = wx.$onErrorHandlers.findIndex((fn) => fn === fromArgs);
      if (index2 !== -1) {
        wx.$onErrorHandlers.splice(index2, 1);
      }
    } else if (fromArgs.__weh) {
      const onErrors = app.$vm.$[ON_ERROR];
      if (onErrors) {
        const index2 = onErrors.indexOf(fromArgs.__weh);
        if (index2 > -1) {
          onErrors.splice(index2, 1);
        }
      }
    }
  }
};
const onSocketOpen = {
  args() {
    if (wx.__uni_console__) {
      if (wx.__uni_console_warned__) {
        return;
      }
      wx.__uni_console_warned__ = true;
      console.warn(`开发模式下小程序日志回显会使用 socket 连接，为了避免冲突，建议使用 SocketTask 的方式去管理 WebSocket 或手动关闭日志回显功能。[详情](https://uniapp.dcloud.net.cn/tutorial/run/mp-log.html)`);
    }
  }
};
const onSocketMessage = onSocketOpen;
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  rpx2px: upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId: getPushClientId$1,
  onPushMessage,
  offPushMessage,
  invokePushCallback,
  __f__
};
function normalizeApi(name, api) {
  return api;
}
function initUni(api, protocols2, platform2 = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return normalizeApi(key, promisify(key, api[key]));
      }
      if (hasOwn(baseApis, key)) {
        return normalizeApi(key, promisify(key, baseApis[key]));
      }
      return normalizeApi(key, promisify(key, wrapper(key, platform2[key])));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    if (component.$scope) {
      return oldIn.call(this, component.$scope);
    }
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
if (!wx$2.getAppBaseInfo || !wx$2.getAppBaseInfo()) {
  wx$2.getAppBaseInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.getWindowInfo || !wx$2.getWindowInfo()) {
  wx$2.getWindowInfo = wx$2.getSystemInfoSync;
}
if (!wx$2.getDeviceInfo || !wx$2.getDeviceInfo()) {
  wx$2.getDeviceInfo = wx$2.getSystemInfoSync;
}
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo: getSystemInfo$1,
  getSystemInfoSync,
  getWindowInfo: getWindowInfo$1,
  offError,
  onError,
  onSocketMessage,
  onSocketOpen,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index$1 = initUni(shims, protocols, wx$1);
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0; i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type2, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type: type2,
        key
      }
    );
  }
}
function trigger(target, type2, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type2 === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type2) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type: type2,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size$1(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add$2(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach3(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method3, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method3 === "entries" || method3 === Symbol.iterator && targetIsMap;
    const isKeyOnly = method3 === "keys" && targetIsMap;
    const innerIterator = target[method3](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type2) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type2)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type2 === "delete" ? false : type2 === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size$1(this);
    },
    has,
    add: add$2,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size$1(this);
    },
    has,
    add: add$2,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method3) => {
    mutableInstrumentations2[method3] = createIterableMethod(method3, false, false);
    readonlyInstrumentations2[method3] = createIterableMethod(method3, true, false);
    shallowInstrumentations2[method3] = createIterableMethod(method3, false, true);
    shallowReadonlyInstrumentations2[method3] = createIterableMethod(
      method3,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type2 = toRawType(target);
    warn$2(
      `Reactive ${type2} contains both the raw and reactive versions of the same object${type2 === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance2 = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance2 && instance2.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance2,
      11,
      [
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance2 && instance2.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance2, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props2) {
  const res = [];
  const keys = Object.keys(props2);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props2[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance2, type2, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError$1(err, instance2, type2);
  }
}
function callWithAsyncErrorHandling(fn, instance2, type2, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance2, type2, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError$1(err, instance2, type2);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance2, type2, args));
  }
  return values;
}
function handleError$1(err, instance2, type2, throwInDev = true) {
  const contextVNode = instance2 ? instance2.vnode : null;
  if (instance2) {
    let cur = instance2.parent;
    const exposedInstance = instance2.proxy;
    const errorInfo = ErrorTypeStrings[type2] || type2;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance2.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type2, contextVNode, throwInDev);
}
function logError(err, type2, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type2] || type2;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance2, seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance2 = fn.ownerInstance;
      const componentName = instance2 && getComponentName(instance2.type);
      handleError$1(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type2, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type2, time);
  };
}
function devtoolsComponentEmit(component, event, params2) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params2
  );
}
function emit(instance2, event, ...rawArgs) {
  if (instance2.isUnmounted)
    return;
  const props2 = instance2.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance2;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props2) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number: number3, trim: trim2 } = props2[modifiersKey] || EMPTY_OBJ;
    if (trim2) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number3) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance2, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props2[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance2,
          instance2.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props2[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props2[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props2[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance2,
      6,
      args
    );
  }
  const onceHandler = props2[handlerName + `Once`];
  if (onceHandler) {
    if (!instance2.emitted) {
      instance2.emitted = {};
    } else if (instance2.emitted[handlerName]) {
      return;
    }
    instance2.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance2,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.emitsCache;
  const cached2 = cache2.get(comp);
  if (cached2 !== void 0) {
    return cached2;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache2.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache2.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance2) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance2;
  instance2 && instance2.type.__scopeId || null;
  return prev;
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type2, name, warnMissing = true, maybeSelfReference = false) {
  const instance2 = currentRenderingInstance || currentInstance;
  if (instance2) {
    const Component2 = instance2.type;
    {
      const selfName = getComponentName(
        Component2,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance2[type2] || Component2[type2], name) || // global registration
      resolve(instance2.appContext[type2], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.`;
      warn$1(`Failed to resolve ${type2.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type2.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry2, name) {
  return registry2 && (registry2[name] || registry2[camelize(name)] || registry2[capitalize(camelize(name))]);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush: flush2,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance2 = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance2, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance2, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance2,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance2, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance2, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush2 === "sync") {
    scheduler = job;
  } else if (flush2 === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance2 && instance2.suspense);
  } else {
    job.pre = true;
    if (instance2)
      job.id = instance2.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove$1(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush2 === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance2 && instance2.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, currentDepth, seen);
    });
  } else if (isPlainObject$2(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version: version$1,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin2) {
        {
          if (!context.mixins.includes(mixin2)) {
            context.mixins.push(mixin2);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin2.name ? `: ${mixin2.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance2 = currentInstance || currentRenderingInstance;
  if (instance2 || currentApp) {
    const provides = instance2 ? instance2.parent == null ? instance2.vnode.appContext && instance2.vnode.appContext.provides : instance2.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance2 && instance2.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type2, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type2, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type2, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type2, target, keepAliveRoot) {
  const injected = injectHook(
    type2,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove$1(keepAliveRoot[type2], injected);
  }, target);
}
function injectHook(type2, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type2)) {
      target = target.root;
    }
    const hooks = target[type2] || (target[type2] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type2, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type2] || type2.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
function getComponentInternalInstance(i) {
  return i;
}
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    // fixed by xxxxxx
    $: getComponentInternalInstance,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      i.effect.dirty = true;
      queueJob(i.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state2, key) => state2 !== EMPTY_OBJ && !state2.__isScriptSetup && hasOwn(state2, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance2 }, key) {
    const { ctx, setupState, data, props: props2, accessCache, type: type2, appContext } = instance2;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props2[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance2.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props2[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance2, "get", key);
      } else if (key === "$slots") {
        track(instance2, "get", key);
      }
      return publicGetter(instance2);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type2.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (instance2.exposed && hasOwn(instance2.exposed, key)) {
      return instance2.exposed[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance2 === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance2 }, key, value) {
    const { data, setupState, ctx } = instance2;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance2.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance2) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance2.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance2) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance2
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance2),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance2) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance2;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance2.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance2) {
  const { ctx, setupState } = instance2;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props2) {
  return isArray$1(props2) ? props2.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props2;
}
function createDuplicateChecker() {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (type2, key) => {
    if (cache2[key]) {
      warn$1(`${type2} property "${key}" is already defined in ${cache2[key]}.`);
    } else {
      cache2[key] = type2;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance2) {
  const options = resolveMergedOptions(instance2);
  const publicThis = instance2.proxy;
  const ctx = instance2.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance2, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance2.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  function initInjections() {
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
  }
  {
    initInjections();
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$1(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance2.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v) => c2.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  function initProvides() {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    initProvides();
  }
  {
    if (created) {
      callHook$1(created, instance2, "c");
    }
  }
  function registerLifecycleHook(register2, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register2(_hook.bind(publicThis)));
    } else if (hook) {
      register2(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance2.exposed || (instance2.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance2.exposed) {
      instance2.exposed = {};
    }
  }
  if (render && instance2.render === NOOP) {
    instance2.render = render;
  }
  if (inheritAttrs != null) {
    instance2.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance2.components = components;
  if (directives)
    instance2.directives = directives;
  if (instance2.ctx.$onApplyOptions) {
    instance2.ctx.$onApplyOptions(options, instance2, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance2, type2) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance2.proxy)) : hook.bind(instance2.proxy),
    instance2,
    type2
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance2) {
  const base = instance2.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache2,
    config: { optionMergeStrategies }
  } = instance2.appContext;
  const cached2 = cache2.get(base);
  let resolved;
  if (cached2) {
    resolved = cached2;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache2.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance2, rawProps, isStateful, isSSR = false) {
  const props2 = {};
  const attrs = {};
  instance2.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance2, rawProps, props2, attrs);
  for (const key in instance2.propsOptions[0]) {
    if (!(key in props2)) {
      props2[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props2, instance2);
  }
  if (isStateful) {
    instance2.props = isSSR ? props2 : shallowReactive(props2);
  } else {
    if (!instance2.type.props) {
      instance2.props = attrs;
    } else {
      instance2.props = props2;
    }
  }
  instance2.attrs = attrs;
}
function isInHmrContext(instance2) {
}
function updateProps(instance2, rawProps, rawPrevProps, optimized) {
  const {
    props: props2,
    attrs,
    vnode: { patchFlag }
  } = instance2;
  const rawCurrentProps = toRaw(props2);
  const [options] = instance2.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext() && patchFlag > 0 && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance2.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance2.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = normalizeInheritAttrsValue(instance2, key, value);
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props2[camelizedKey] = resolvePropValue$1(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance2,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = normalizeInheritAttrsValue(instance2, key, value);
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance2, rawProps, props2, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props2[key] = resolvePropValue$1(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance2,
              true
            );
          }
        } else {
          delete props2[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance2, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props2, instance2);
  }
}
function setFullProps(instance2, rawProps, props2, attrs) {
  const [options, needCastKeys] = instance2.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          {
            props2[camelKey] = value;
          }
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance2.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = normalizeInheritAttrsValue(instance2, key, value);
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props2);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props2[key] = resolvePropValue$1(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance2,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function normalizeInheritAttrsValue(instance2, key, value) {
  return value;
}
function resolvePropValue$1(options, props2, key, value, instance2, isAbsent) {
  const result = _resolvePropValue(
    options,
    props2,
    key,
    value,
    instance2,
    isAbsent
  );
  return result;
}
function _resolvePropValue(options, props2, key, value, instance2, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance2;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance2);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props2
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.propsCache;
  const cached2 = cache2.get(comp);
  if (cached2) {
    return cached2;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props2, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props2);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache2.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache2.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type2, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type2));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type2) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props2, instance2) {
  const resolvedValues = toRaw(props2);
  const options = instance2.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, props2, isAbsent) {
  const { type: type2, required: required2, validator, skipCheck } = prop;
  if (required2 && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required2) {
    return;
  }
  if (type2 != null && type2 !== true && !skipCheck) {
    let isValid = false;
    const types2 = isArray$1(type2) ? type2 : [type2];
    const expectedTypes = [];
    for (let i = 0; i < types2.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types2[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props2)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type2) {
  let valid;
  const expectedType = getType(type2);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type2;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type2;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type2) {
  if (type2 === "String") {
    return `"${value}"`;
  } else if (type2 === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type2) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type2.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance2, type2) {
  if (instance2.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type2}-${instance2.uid}`);
  }
  {
    devtoolsPerfStart(instance2, type2, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance2, type2) {
  if (instance2.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type2}-${instance2.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance2, instance2.type)}> ${type2}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance2, type2, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props2) {
  if (!props2)
    return null;
  return isProxy(props2) || InternalObjectKey in props2 ? extend({}, props2) : props2;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type2 = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance2 = {
    uid: uid++,
    vnode,
    type: type2,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type2, appContext),
    emitsOptions: normalizeEmitsOptions(type2, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type2.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
    // fixed by xxxxxx 用于存储uni-app的元素缓存
    $uniElements: /* @__PURE__ */ new Map(),
    $templateUniElementRefs: [],
    $templateUniElementStyles: {},
    $eS: {},
    $eA: {}
  };
  {
    instance2.ctx = createDevRenderContext(instance2);
  }
  instance2.root = parent ? parent.root : instance2;
  instance2.emit = emit.bind(null, instance2);
  if (vnode.ce) {
    vnode.ce(instance2);
  }
  return instance2;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i) => {
    currentInstance = i;
  };
  setInSSRSetupState = (v) => {
    isInSSRComponentSetup = v;
  };
}
const setCurrentInstance = (instance2) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance2);
  instance2.scope.on();
  return () => {
    instance2.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance2) {
  return instance2.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance2, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props: props2
    /*, children*/
  } = instance2.vnode;
  const isStateful = isStatefulComponent(instance2);
  initProps$1(instance2, props2, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance2, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance2, isSSR) {
  const Component2 = instance2.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance2.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance2.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance2.accessCache = /* @__PURE__ */ Object.create(null);
  instance2.proxy = markRaw(new Proxy(instance2.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance2);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance2.setupContext = setup.length > 1 ? createSetupContext(instance2) : null;
    const reset = setCurrentInstance(instance2);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance2,
      0,
      [
        shallowReadonly(instance2.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance2, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance2, isSSR);
  }
}
function handleSetupResult(instance2, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance2.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance2.devtoolsRawSetupState = setupResult;
    }
    instance2.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance2);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance2, isSSR);
}
const isRuntimeOnly = () => true;
function finishComponentSetup(instance2, isSSR, skipOptions) {
  const Component2 = instance2.type;
  if (!instance2.render) {
    instance2.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance2);
    pauseTracking();
    try {
      applyOptions$1(instance2);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance2.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance2) {
  return instance2.attrsProxy || (instance2.attrsProxy = new Proxy(
    instance2.attrs,
    {
      get(target, key) {
        track(instance2, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance2) {
  return instance2.slotsProxy || (instance2.slotsProxy = new Proxy(instance2.slots, {
    get(target, key) {
      track(instance2, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance2) {
  const expose = (exposed) => {
    {
      if (instance2.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$1(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance2.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance2);
      },
      get slots() {
        return getSlotsProxy(instance2);
      },
      get emit() {
        return (event, ...args) => instance2.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance2) {
  if (instance2.exposed) {
    return instance2.exposeProxy || (instance2.exposeProxy = new Proxy(proxyRefs(markRaw(instance2.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance2.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance2, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance2 && instance2.parent) {
    const inferFromRegistry = (registry2) => {
      for (const key in registry2) {
        if (registry2[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance2.components || instance2.parent.type.components
    ) || inferFromRegistry(instance2.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version$1 = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance2) {
  return queue.includes(instance2.update);
}
function flushCallbacks(instance2) {
  const ctx = instance2.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance2, fn) {
  const ctx = instance2.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance2)) {
    return nextTick$1(fn && fn.bind(instance2.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance2.proxy),
        instance2,
        14
      );
    } else if (_resolve) {
      _resolve(instance2.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone$1(src, seen) {
  src = unwrapper(src);
  const type2 = typeof src;
  if (type2 === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$1(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone$1(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone$1(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type2 !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone$1(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance2, keys) {
  const data = instance2.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance2, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  data.$eS = instance2.$eS || {};
  data.$eA = instance2.$eA || {};
  const ctx = instance2.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance2);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance2);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance2, publicThis) {
  instance2.appContext.config.globalProperties.$applyOptions(
    options,
    instance2,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance2.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance2.ctx.$onApplyOptions;
}
function setRef$1(instance2, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    $templateUniElementRefs,
    ctx: { $scope, $mpPlatform }
  } = instance2;
  if (!$scope || !$templateRefs && !$templateUniElementRefs) {
    return;
  }
  if (isUnmount) {
    if ($mpPlatform !== "mp-alipay") {
      $templateRefs && $templateRefs.forEach(
        (templateRef) => setTemplateRef(templateRef, null, setupState)
      );
    }
    $templateUniElementRefs && $templateUniElementRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    return;
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    if (refs.length === 0) {
      return [];
    }
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    if ($templateRefs) {
      const refs = doSetByRefs($templateRefs);
      if (refs.length && instance2.proxy && instance2.proxy.$scope) {
        instance2.proxy.$scope.setData({ r1: 1 }, () => {
          doSetByRefs(refs);
        });
      }
    }
  };
  if ($mpPlatform !== "mp-alipay") {
    if ($scope._$setRef) {
      $scope._$setRef(doSet);
    } else {
      nextTick(instance2, doSet);
    }
  }
  if ($templateUniElementRefs && $templateUniElementRefs.length) {
    nextTick(instance2, () => {
      $templateUniElementRefs.forEach((templateRef) => {
        if (isArray$1(templateRef.v)) {
          templateRef.v.forEach((v) => {
            setTemplateRef(templateRef, v, setupState);
          });
        } else {
          setTemplateRef(templateRef, templateRef.v, setupState);
        }
      });
    });
  }
}
function toSkip(value) {
  if (isObject$1(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$1(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          if (refValue.$) {
            onBeforeUnmount(() => remove$1(existing, refValue), refValue.$);
          }
        }
      } else if (_isString) {
        if (hasOwn(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance2 = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  instance2.renderer = options.mpType ? options.mpType : "component";
  {
    instance2.ctx.$onApplyOptions = onApplyOptions;
    instance2.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance2.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance2, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance2, `mount`);
  }
  {
    startMeasure(instance2, `init`);
  }
  setupComponent(instance2);
  {
    endMeasure(instance2, `init`);
  }
  {
    if (options.parentComponent && instance2.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance2) || instance2.proxy);
    }
  }
  setupRenderEffect(instance2);
  {
    popWarningContext();
    endMeasure(instance2, `mount`);
  }
  return instance2.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function clearTemplateRefs(templateRefs) {
  if (!templateRefs) {
    return [];
  }
  return templateRefs.filter((templateRef) => {
    const v = templateRef.v;
    if (v && typeof v === "object" && ["UNI-LOADING-ELEMENT", "UNI-CLOUD-DB-ELEMENT"].includes(v.nodeName)) {
      return true;
    }
    return false;
  });
}
function renderComponentRoot(instance2) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props: props2,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance2;
  instance2.$uniElementIds = /* @__PURE__ */ new Map();
  instance2.$templateRefs = clearTemplateRefs(
    instance2.$templateRefs || []
  );
  instance2.$templateUniElementRefs = clearTemplateRefs(
    instance2.$templateUniElementRefs || []
  );
  instance2.$templateUniElementStyles = {};
  instance2.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance2.__counter = instance2.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance2);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props2, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props2,
        setupState,
        data,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props2,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props2, { attrs, slots, emit: emit2 }) : render2(
        props2,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError$1(err, instance2, 1);
    result = false;
  }
  setRef$1(instance2);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props2, propsOptions, fallthroughAttrs2) {
  if (props2 && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props2[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props2[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance2) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(
        data,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance2) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance2
  );
  instance2.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance2.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance2, true);
      }, instance2);
      {
        startMeasure(instance2, `patch`);
      }
      patch(instance2, renderComponentRoot(instance2));
      {
        endMeasure(instance2, `patch`);
      }
      {
        devtoolsComponentAdded(instance2);
      }
    } else {
      const { next, bu, u } = instance2;
      {
        pushWarningContext(next || instance2.vnode);
      }
      toggleRecurse(instance2, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance2, true);
      {
        startMeasure(instance2, `patch`);
      }
      patch(instance2, renderComponentRoot(instance2));
      {
        endMeasure(instance2, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance2);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance2.effect = new ReactiveEffect(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance2.scope
    // track it in component's effect scope
  );
  const update = instance2.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance2.uid;
  toggleRecurse(instance2, true);
  {
    effect2.onTrack = instance2.rtc ? (e2) => invokeArrayFns$1(instance2.rtc, e2) : void 0;
    effect2.onTrigger = instance2.rtg ? (e2) => invokeArrayFns$1(instance2.rtg, e2) : void 0;
    update.ownerInstance = instance2;
  }
  {
    update();
  }
}
function unmountComponent(instance2) {
  const { bum, scope, update, um } = instance2;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  {
    const parentInstance = instance2.parent;
    if (parentInstance) {
      const $children = parentInstance.ctx.$children;
      const target = getExposeProxy(instance2) || instance2.proxy;
      const index2 = $children.indexOf(target);
      if (index2 > -1) {
        $children.splice(index2, 1);
      }
    }
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance2.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance2);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance2 = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance2.$;
    {
      devtoolsInitApp(app, version$1);
    }
    instance2.$app = app;
    instance2.$createComponent = createComponent2;
    instance2.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance2;
    return instance2;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance2) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance2);
  }
}
function initHooks$1(options, instance2, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component" || // instance.renderer 标识页面是否作为组件渲染
  mpType === "page" && instance2.renderer === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray$1(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance2));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance2);
      }
    }
  });
}
function applyOptions$2(options, instance2, publicThis) {
  initHooks$1(options, instance2, publicThis);
}
function set$2(target, key, val) {
  return target[key] = val;
}
function $callMethod(method3, ...args) {
  const fn = this[method3];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method3} not found`);
  return null;
}
function createErrorHandler(app) {
  const userErrorHandler = app.config.errorHandler;
  return function errorHandler(err, instance2, info) {
    if (userErrorHandler) {
      userErrorHandler(err, instance2, info);
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    if (appInstance[ON_ERROR]) {
      {
        appInstance.proxy.$callHook(ON_ERROR, err);
      }
    } else {
      logError(err, info, instance2 ? instance2.$.vnode : null, false);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index$1.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error2) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error2.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$2;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index$1.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props2) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props2)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer, subpackageRoot, options) {
      const hasSubpackageRoot = typeof subpackageRoot === "string";
      const root = hasSubpackageRoot ? subpackageRoot : void 0;
      const instance2 = hasSubpackageRoot ? oldMount.call(app, rootContainer) : oldMount.apply(app, arguments);
      const createApp2 = getCreateApp(root, options);
      if (createApp2) {
        createApp2(instance2);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance2);
        }
      }
      return instance2;
    };
  }
};
function getCreateApp(subpackageRoot, options) {
  const root = normalizeSubpackageRoot$1(subpackageRoot);
  const method3 = root && (options === null || options === void 0 ? void 0 : options.independent) ? "createIndependentSubpackageApp" : root || "" ? "createSubpackageApp" : "createApp";
  const createApp2 = method3 === "createIndependentSubpackageApp" && (options === null || options === void 0 ? void 0 : options.createApp) ? options.createApp : getGlobalCreateApp(method3);
  if (createApp2 && root && (method3 === "createSubpackageApp" || method3 === "createIndependentSubpackageApp")) {
    return (instance2) => createApp2(instance2, root);
  }
  return createApp2;
}
function getGlobalCreateApp(method3) {
  if (typeof global !== "undefined" && typeof global[method3] !== "undefined") {
    return global[method3];
  } else if (typeof my !== "undefined") {
    return my[method3];
  }
}
function normalizeSubpackageRoot$1(root) {
  return typeof root === "string" ? root.replace(/^\/+|\/+$/g, "") : void 0;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function vOn(value, key) {
  const instance2 = getCurrentInstance();
  const ctx = instance2.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance2.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance2);
  }
  return name;
}
function createInvoker(initialValue, instance2) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (instance2 && instance2.ctx.$getTriggerEventDetail) {
      if (typeof e2.detail === "number") {
        e2.detail = instance2.ctx.$getTriggerEventDetail(e2.detail);
      }
    }
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance2, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray$1(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event, instance2) {
  if (event.type && event.target) {
    event.target;
    event.currentTarget;
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$2(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$2(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n$1 = (value) => normalizeClass(value);
const t$1 = (val) => toDisplayString(val);
const p = (props2) => renderProps(props2);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$1(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance2, mpInstance) {
  Object.defineProperty(instance2, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance2, vuePid) {
  const $children = instance2.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function getLocaleLanguage() {
  var _a;
  let localeLanguage = "";
  {
    const appBaseInfo = ((_a = wx.getAppBaseInfo) === null || _a === void 0 ? void 0 : _a.call(wx)) || wx.getSystemInfoSync();
    const language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance2, options) {
  const ctx = instance2.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  {
    Object.defineProperties(ctx, {
      // only id
      [VIRTUAL_HOST_ID]: {
        get() {
          const id = this.$scope.data[VIRTUAL_HOST_ID];
          return id === void 0 ? "" : id;
        }
      }
    });
  }
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance2.slots = {};
  if (isArray$1(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance2.slots[name] = true;
    });
    if (instance2.slots[SLOT_DEFAULT_NAME]) {
      instance2.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance2.emit = createEmitFn(instance2.emit, ctx);
}
function initComponentInstance(instance2, options) {
  initBaseInstance(instance2, options);
  const ctx = instance2.ctx;
  MP_METHODS.forEach((method3) => {
    ctx[method3] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method3]) {
        return mpInstance[method3].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance2, mpInstance, mocks2) {
  const ctx = instance2.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance2[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin2) => findHooks(mixin2, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$1(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin2) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin2, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
let runtimeSubpackageRoot;
const runtimeSubpackages = /* @__PURE__ */ Object.create(null);
function resolveSubpackageRoot(root) {
  return normalizeSubpackageRoot(root) || normalizeSubpackageRoot("");
}
function setRuntimeSubpackageRoot(root) {
  runtimeSubpackageRoot = normalizeSubpackageRoot(root);
}
function getRuntimeSubpackageRoot() {
  return runtimeSubpackageRoot;
}
function setSubpackageAppVm(root, vm, independent) {
  const subpackageRoot = normalizeSubpackageRoot(root);
  if (!subpackageRoot) {
    return;
  }
  setRuntimeSubpackageRoot(subpackageRoot);
  if (independent) {
    runtimeSubpackages[subpackageRoot] = {
      $vm: vm
    };
  } else {
    const globalObject = wx;
    (globalObject.$subpackages || (globalObject.$subpackages = {}))[subpackageRoot] = {
      $vm: vm
    };
  }
}
function getSubpackageAppVm() {
  var _a, _b, _c;
  const subpackageRoot = getRuntimeSubpackageRoot();
  if (!subpackageRoot) {
    return;
  }
  return ((_a = runtimeSubpackages[subpackageRoot]) === null || _a === void 0 ? void 0 : _a.$vm) || ((_c = (_b = wx.$subpackages) === null || _b === void 0 ? void 0 : _b[subpackageRoot]) === null || _c === void 0 ? void 0 : _c.$vm);
}
function normalizeSubpackageRoot(root) {
  return typeof root === "string" ? root.replace(/^\/+|\/+$/g, "") : void 0;
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance2, parseAppOptions) {
  const internalInstance = instance2.$;
  const appOptions = {
    globalData: instance2.$options && instance2.$options.globalData || {},
    $vm: instance2,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance2;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope && ctx.$callHook) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance2.$callHook(ON_LAUNCH, options);
    }
  };
  const onErrorHandlers = wx.$onErrorHandlers;
  if (onErrorHandlers) {
    onErrorHandlers.forEach((fn) => {
      injectHook(ON_ERROR, fn, internalInstance);
    });
    onErrorHandlers.length = 0;
  }
  initLocale(instance2);
  const vueOptions = instance2.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm, root) {
    const appOptions = parseApp(vm);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
    setSubpackageAppVm(resolveSubpackageRoot(root), vm);
  };
}
function initCreateIndependentSubpackageApp() {
  return function createApp2(vm, root) {
    setSubpackageAppVm(resolveSubpackageRoot(root), vm, true);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(getLocaleLanguage());
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    let observerSlots = function(newVal) {
      const $slots = /* @__PURE__ */ Object.create(null);
      newVal && newVal.forEach((slotName) => {
        $slots[slotName] = true;
      });
      this.setData({
        $slots
      });
    };
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: []
    };
    {
      properties.uS.observer = observerSlots;
    }
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties[VIRTUAL_HOST_STYLE] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_CLASS] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_HIDDEN] = {
        type: null,
        value: ""
      };
      properties[VIRTUAL_HOST_ID] = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type2, defaultValue) {
  if (isArray$1(type2) && type2.length === 1) {
    return type2[0];
  }
  return type2;
}
function normalizePropType(type2, defaultValue) {
  const res = parsePropType(type2);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$1(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$2(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$2(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type2 = opts.type;
        opts.type = normalizePropType(type2);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(resolvePropValue(properties.uP))) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$2(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = resolvePropValue(properties[name]);
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray$1(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function resolvePropValue(prop) {
  return prop;
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(resolvePropValue(up), this.$vm.$);
    } else if (resolvePropValue(this.properties.uT) === "m") {
      updateMiniProgramComponentProperties(resolvePropValue(up), this);
    } else
      ;
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance2) {
  const prevProps = toRaw(instance2.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance2, nextProps, prevProps);
    if (hasQueueJob(instance2.update)) {
      invalidateJob(instance2.update);
    }
    {
      instance2.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$1(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$1(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, isPageInProject, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray$1(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$1(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
let $createComponentAppVm;
let $destroyComponentAppVm;
const componentAppVmMap = /* @__PURE__ */ new WeakMap();
function getAppVm() {
  const subpackageAppVm = getSubpackageAppVm();
  if (subpackageAppVm) {
    return subpackageAppVm;
  }
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  const appVm = getAppVm();
  if (!$createComponentFn || $createComponentAppVm !== appVm) {
    $createComponentAppVm = appVm;
    $createComponentFn = appVm.$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  const exposeProxy = getComponentExposeProxy(proxy);
  componentAppVmMap.set(proxy, appVm);
  if (exposeProxy && typeof exposeProxy === "object") {
    componentAppVmMap.set(exposeProxy, appVm);
  }
  return exposeProxy || proxy;
}
function $destroyComponent(instance2) {
  const appVm = componentAppVmMap.get(instance2) || getAppVm();
  if (!$destroyComponentFn || $destroyComponentAppVm !== appVm) {
    $destroyComponentAppVm = appVm;
    $destroyComponentFn = appVm.$destroyComponent;
  }
  try {
    return $destroyComponentFn(instance2);
  } finally {
    componentAppVmMap.delete(instance2);
  }
}
function getComponentExposeProxy(proxy) {
  return typeof getExposeProxy === "function" ? getExposeProxy(proxy.$) : void 0;
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    isPageInProject: true,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    {
      this.options = query;
    }
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [
      customizeEvent(event),
      ...args
    ]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error2) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance2, options) {
          initRefs(instance2, mpInstance);
          initMocks(instance2, mpInstance, mocks2);
          initComponentInstance(instance2, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
const createIndependentSubpackageApp = initCreateIndependentSubpackageApp();
const isIndependentRuntime = typeof __UNI_MP_INDEPENDENT_RUNTIME__ !== "undefined" && __UNI_MP_INDEPENDENT_RUNTIME__ === true;
{
  if (!isIndependentRuntime) {
    wx.createApp = global.createApp = createApp;
    wx.createPage = createPage;
    wx.createComponent = createComponent;
    wx.createPluginApp = global.createPluginApp = createPluginApp;
    wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
    wx.createIndependentSubpackageApp = global.createIndependentSubpackageApp = createIndependentSubpackageApp;
  }
}
const needShims = [
  {
    name: "onWindowResize",
    fallback: function(_callback) {
    }
  },
  {
    name: "offWindowResize",
    fallback: function(_callback) {
    }
  }
];
function applyUniApiShims() {
  if (typeof index$1 === "undefined")
    return;
  for (const { name, fallback } of needShims) {
    if (typeof index$1[name] !== "function") {
      index$1[name] = fallback;
    }
  }
}
const defineMixin = (options) => {
  return options;
};
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}
function date(value) {
  if (!value)
    return false;
  if (typeof value === "number") {
    if (value.toString().length !== 10 && value.toString().length !== 13) {
      return false;
    }
    return !isNaN(new Date(value).getTime());
  }
  if (typeof value === "string") {
    const numV = Number(value);
    if (!isNaN(numV)) {
      if (numV.toString().length === 10 || numV.toString().length === 13) {
        return !isNaN(new Date(numV).getTime());
      }
    }
    if (value.length < 10 || value.length > 19) {
      return false;
    }
    const dateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}( \d{1,2}:\d{2}(:\d{2})?)?$/;
    if (!dateRegex.test(value)) {
      return false;
    }
    const dateValue = new Date(value);
    return !isNaN(dateValue.getTime());
  }
  return false;
}
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}
function string$1(value) {
  return typeof value === "string";
}
function digits(value) {
  return /^\d+$/.test(value);
}
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    value
  );
}
function carNo(value) {
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}
function amount(value) {
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}
function chinese(value) {
  const reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}
function enOrNum(value) {
  const reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}
function contains(value, param) {
  return value.indexOf(param) >= 0;
}
function range$2(value, param) {
  return value >= param[0] && value <= param[1];
}
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}
function landline(value) {
  const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}
function empty(value) {
  switch (typeof value) {
    case "undefined":
      return true;
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
        return true;
      break;
    case "boolean":
      if (!value)
        return true;
      break;
    case "number":
      if (value === 0 || isNaN(value))
        return true;
      break;
    case "object":
      if (value === null || value.length === 0)
        return true;
      for (const i in value) {
        return false;
      }
      return true;
  }
  return false;
}
function jsonString(value) {
  if (typeof value === "string") {
    try {
      const obj = JSON.parse(value);
      if (typeof obj === "object" && obj) {
        return true;
      }
      return false;
    } catch (e2) {
      return false;
    }
  }
  return false;
}
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === "[object Array]";
}
function object(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function objectPromise(value) {
  return Object.prototype.toString.call(value) === "[object Promise]";
}
function code(value, len = 6) {
  return new RegExp(`^\\d{${len}}$`).test(value);
}
function func(value) {
  return typeof value === "function";
}
function promise(value) {
  return objectPromise(value) && func(value.then) && func(value.catch);
}
function image(value) {
  const newValue = value.split("?")[0];
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}
function video(value) {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}
function regExp(o2) {
  return o2 && Object.prototype.toString.call(o2) === "[object RegExp]";
}
const test = {
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  digits,
  idCard,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  contains,
  range: range$2,
  rangeLength,
  empty,
  isEmpty: empty,
  jsonString,
  landline,
  object,
  array,
  code,
  func,
  promise,
  video,
  image,
  regExp,
  string: string$1
};
function strip(num, precision = 15) {
  return +parseFloat(Number(num).toPrecision(precision));
}
function digitLength(num) {
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
function float2Fixed(num) {
  if (num.toString().indexOf("e") === -1) {
    return Number(num.toString().replace(".", ""));
  }
  const dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}
function checkBoundary(num) {
  {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(`${num} 超出了精度限制，结果可能不正确`);
    }
  }
}
function iteratorOperation(arr, operation) {
  const [num1, num2, ...others] = arr;
  let res = operation(num1, num2);
  others.forEach((num) => {
    res = operation(res, num);
  });
  return res;
}
function times(...nums) {
  if (nums.length > 2) {
    return iteratorOperation(nums, times);
  }
  const [num1, num2] = nums;
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  const baseNum = digitLength(num1) + digitLength(num2);
  const leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
}
function divide(...nums) {
  if (nums.length > 2) {
    return iteratorOperation(nums, divide);
  }
  const [num1, num2] = nums;
  const num1Changed = float2Fixed(num1);
  const num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}
function round(num, ratio) {
  const base = Math.pow(10, ratio);
  let result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  return result;
}
const version = "3";
{
  console.log(`
 %c uview-plus V${version} %c https://uview-plus.jiangruyi.com/ 

`, "color: #ffffff; background: #3c9cff; padding:5px 0;", "color: #3c9cff;background: #ffffff; padding:5px 0;");
}
const config$2 = {
  v: version,
  version,
  // 主题名称
  type: [
    "primary",
    "success",
    "info",
    "error",
    "warning"
  ],
  // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
  color: {
    "u-primary": "#2979ff",
    "u-warning": "#ff9900",
    "u-success": "#19be6b",
    "u-error": "#fa3534",
    "u-info": "#909399",
    "u-main-color": "#303133",
    "u-content-color": "#606266",
    "u-tips-color": "#909399",
    "u-light-color": "#c0c4cc",
    "up-primary": "#2979ff",
    "up-warning": "#ff9900",
    "up-success": "#19be6b",
    "up-error": "#fa3534",
    "up-info": "#909399",
    "up-main-color": "#303133",
    "up-content-color": "#606266",
    "up-tips-color": "#909399",
    "up-light-color": "#c0c4cc"
  },
  // 字体图标地址
  iconUrl: "https://at.alicdn.com/t/font_2225171_8kdcwk4po24.ttf",
  // 自定义图标
  customIcon: {
    family: "",
    url: ""
  },
  customIcons: {},
  // 自定义图标与unicode对应关系
  // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
  unit: "px",
  // 是否由运行时主题同步原生导航栏、页面背景、tabBar等全局UI
  nativeThemeSync: false,
  // 拦截器
  interceptor: {
    navbarLeftClick: null
  },
  // 只加载一次字体
  loadFontOnce: false
};
function range$1(min = 0, max = 0, value = 0) {
  return Math.max(min, Math.min(max, Number(value)));
}
function getPx(value, unit = false) {
  if (number(value)) {
    return unit ? `${value}px` : Number(value);
  }
  if (/(rpx|upx)$/.test(value)) {
    return unit ? `${index$1.upx2px(parseInt(value))}px` : Number(index$1.upx2px(parseInt(value)));
  }
  return unit ? `${parseInt(value)}px` : parseInt(value);
}
function rpx2px(value) {
  return index$1.rpx2px(value);
}
function sleep(value = 30) {
  return new Promise((resolve2) => {
    setTimeout(() => {
      resolve2();
    }, value);
  });
}
function os() {
  return index$1.getDeviceInfo().platform.toLowerCase();
}
function sys() {
  return index$1.getSystemInfoSync();
}
function getWindowInfo() {
  let ret = {};
  ret = index$1.getWindowInfo();
  return ret;
}
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    const gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}
function guid(len = 32, firstU = true, radix = null) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  radix = radix || chars.length;
  if (len) {
    for (let i = 0; i < len; i++)
      uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
      }
    }
  }
  if (firstU) {
    uuid.shift();
    return `u${uuid.join("")}`;
  }
  return uuid.join("");
}
function $parent(name = void 0) {
  let parent = this.$parent;
  while (parent) {
    let name2 = "";
    if (name.startsWith("up-")) {
      name2 = name.replace(/up-([a-zA-Z0-9-_]+)/g, "u-$1");
    } else if (name.startsWith("u-")) {
      name2 = name.replace(/u-([a-zA-Z0-9-_]+)/g, "up-$1");
    }
    if (parent.$options && parent.$options.name !== name && parent.$options.name !== name2) {
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}
function addStyle(customStyle, target = "object") {
  if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
    return customStyle;
  }
  if (target === "object") {
    customStyle = trim(customStyle);
    const styleArray = customStyle.split(";");
    const style = {};
    for (let i = 0; i < styleArray.length; i++) {
      if (styleArray[i]) {
        const item = styleArray[i].split(":");
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  let string2 = "";
  if (typeof customStyle === "object") {
    customStyle.forEach((val, i) => {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${val};`;
    });
  }
  return trim(string2);
}
function addUnit(value = "auto", unit = "") {
  if (!unit) {
    unit = config$2.unit || "px";
  }
  if (unit == "rpx" && number(String(value))) {
    value = value * 2;
  }
  value = String(value);
  return number(value) ? `${value}${unit}` : value;
}
function deepClone(obj) {
  if ([null, void 0, NaN, false].includes(obj))
    return obj;
  if (typeof obj !== "object" && typeof obj !== "function") {
    return obj;
  }
  const o2 = array(obj) ? [] : {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      o2[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o2;
}
function deepMerge$2(targetOrigin = {}, source = {}) {
  let target = deepClone(targetOrigin);
  if (typeof target !== "object" || typeof source !== "object")
    return false;
  for (const prop in source) {
    if (!source.hasOwnProperty(prop))
      continue;
    if (prop in target) {
      if (source[prop] == null) {
        target[prop] = source[prop];
      } else if (typeof target[prop] !== "object") {
        target[prop] = source[prop];
      } else if (typeof source[prop] !== "object") {
        target[prop] = source[prop];
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop]);
      } else {
        target[prop] = deepMerge$2(target[prop], source[prop]);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
function shallowMerge(target, source = {}) {
  if (typeof target !== "object" || typeof source !== "object")
    return false;
  for (const prop in source) {
    if (!source.hasOwnProperty(prop))
      continue;
    if (prop in target) {
      if (source[prop] == null) {
        target[prop] = source[prop];
      } else if (typeof target[prop] !== "object") {
        target[prop] = source[prop];
      } else if (typeof source[prop] !== "object") {
        target[prop] = source[prop];
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop]);
      } else {
        target[prop] = shallowMerge(target[prop], source[prop]);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
function error(err) {
  {
    console.error(`uView提示：${err}`);
  }
}
function randomArray(array3 = []) {
  return array3.sort(() => Math.random() - 0.5);
}
if (!String.prototype.padStart) {
  String.prototype.padStart = function(maxLength, fillString = " ") {
    if (Object.prototype.toString.call(fillString) !== "[object String]") {
      throw new TypeError(
        "fillString must be String"
      );
    }
    const str = this;
    if (str.length >= maxLength)
      return String(str);
    const fillLength = maxLength - str.length;
    let times2 = Math.ceil(fillLength / fillString.length);
    while (times2 >>= 1) {
      fillString += fillString;
      if (times2 === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}
function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
  let date3;
  if (!dateTime) {
    date3 = /* @__PURE__ */ new Date();
  } else if (/^\d{10}$/.test(dateTime.toString().trim())) {
    date3 = new Date(dateTime * 1e3);
  } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
    date3 = new Date(Number(dateTime));
  } else if (typeof dateTime === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?$/.test(dateTime)) {
    date3 = new Date(dateTime);
  } else {
    date3 = new Date(
      typeof dateTime === "string" ? dateTime.replace(/-/g, "/") : dateTime
    );
  }
  const timeSource = {
    "y": date3.getFullYear().toString(),
    // 年
    "m": (date3.getMonth() + 1).toString().padStart(2, "0"),
    // 月
    "d": date3.getDate().toString().padStart(2, "0"),
    // 日
    "h": date3.getHours().toString().padStart(2, "0"),
    // 时
    "M": date3.getMinutes().toString().padStart(2, "0"),
    // 分
    "s": date3.getSeconds().toString().padStart(2, "0")
    // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (const key in timeSource) {
    const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
    if (ret) {
      const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
    }
  }
  return formatStr;
}
function timeFrom(timestamp = null, format2 = "yyyy-mm-dd") {
  if (timestamp == null)
    timestamp = Number(/* @__PURE__ */ new Date());
  timestamp = parseInt(timestamp);
  if (timestamp.toString().length == 10)
    timestamp *= 1e3;
  let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
  timer = parseInt(timer / 1e3);
  let tips = "";
  switch (true) {
    case timer < 300:
      tips = "刚刚";
      break;
    case (timer >= 300 && timer < 3600):
      tips = `${parseInt(timer / 60)}分钟前`;
      break;
    case (timer >= 3600 && timer < 86400):
      tips = `${parseInt(timer / 3600)}小时前`;
      break;
    case (timer >= 86400 && timer < 2592e3):
      tips = `${parseInt(timer / 86400)}天前`;
      break;
    default:
      if (format2 === false) {
        if (timer >= 2592e3 && timer < 365 * 86400) {
          tips = `${parseInt(timer / (86400 * 30))}个月前`;
        } else {
          tips = `${parseInt(timer / (86400 * 365))}年前`;
        }
      } else {
        tips = timeFormat(timestamp, format2);
      }
  }
  return tips;
}
function trim(str, pos = "both") {
  str = String(str);
  if (pos == "both") {
    return str.replace(/^\s+|\s+$/g, "");
  }
  if (pos == "left") {
    return str.replace(/^\s*/, "");
  }
  if (pos == "right") {
    return str.replace(/(\s*$)/g, "");
  }
  if (pos == "all") {
    return str.replace(/\s+/g, "");
  }
  return str;
}
function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
  const prefix = isPrefix ? "?" : "";
  const _result = [];
  if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
    arrayFormat = "brackets";
  for (const key in data) {
    const value = data[key];
    if (["", void 0, null].indexOf(value) >= 0) {
      continue;
    }
    if (value.constructor === Array) {
      switch (arrayFormat) {
        case "indices":
          for (let i = 0; i < value.length; i++) {
            _result.push(`${key}[${i}]=${value[i]}`);
          }
          break;
        case "brackets":
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
          break;
        case "repeat":
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`);
          });
          break;
        case "comma":
          let commaStr = "";
          value.forEach((_value) => {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(`${key}=${commaStr}`);
          break;
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`);
          });
      }
    } else {
      _result.push(`${key}=${value}`);
    }
  }
  return _result.length ? prefix + _result.join("&") : "";
}
function toast(title, duration = 2e3) {
  index$1.showToast({
    title: String(title),
    icon: "none",
    duration
  });
}
function type2icon(type2 = "success", fill = false) {
  if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
    type2 = "success";
  let iconName = "";
  switch (type2) {
    case "primary":
      iconName = "info-circle";
      break;
    case "info":
      iconName = "info-circle";
      break;
    case "error":
      iconName = "close-circle";
      break;
    case "warning":
      iconName = "error-circle";
      break;
    case "success":
      iconName = "checkmark-circle";
      break;
    default:
      iconName = "checkmark-circle";
  }
  if (fill)
    iconName += "-fill";
  return iconName;
}
function priceFormat(number3, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
  number3 = `${number3}`.replace(/[^0-9+-Ee.]/g, "");
  const n2 = !isFinite(+number3) ? 0 : +number3;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
  const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
  let s2 = "";
  s2 = (prec ? round(n2, prec) + "" : `${Math.round(n2)}`).split(".");
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s2[0])) {
    s2[0] = s2[0].replace(re, `$1${sep}$2`);
  }
  if ((s2[1] || "").length < prec) {
    s2[1] = s2[1] || "";
    s2[1] += new Array(prec - s2[1].length + 1).join("0");
  }
  return s2.join(dec);
}
function getDuration(value, unit = true) {
  const valueNum = parseInt(value);
  if (unit) {
    if (/s$/.test(value))
      return value;
    return value > 30 ? `${value}ms` : `${value}s`;
  }
  if (/ms$/.test(value))
    return valueNum;
  if (/s$/.test(value))
    return valueNum > 30 ? valueNum : valueNum * 1e3;
  return valueNum;
}
function padZero(value) {
  return `00${value}`.slice(-2);
}
function formValidate(instance2, event) {
  const formItem = $parent.call(instance2, "up-form-item");
  const form = $parent.call(instance2, "up-form");
  if (formItem && form) {
    form.validateField(formItem.prop, () => {
    }, event);
  }
}
function getProperty(obj, key) {
  if (typeof obj !== "object" || null == obj) {
    return "";
  }
  if (typeof key !== "string" || key === "") {
    return "";
  }
  if (key.indexOf(".") !== -1) {
    const keys = key.split(".");
    let firstObj = obj[keys[0]] || {};
    for (let i = 1; i < keys.length; i++) {
      if (firstObj) {
        firstObj = firstObj[keys[i]];
      }
    }
    return firstObj;
  }
  return obj[key];
}
function setProperty(obj, key, value) {
  if (typeof obj !== "object" || null == obj) {
    return;
  }
  const inFn = function(_obj, keys, v) {
    if (keys.length === 1) {
      _obj[keys[0]] = v;
      return;
    }
    while (keys.length > 1) {
      const k = keys[0];
      if (!_obj[k] || typeof _obj[k] !== "object") {
        _obj[k] = {};
      }
      keys.shift();
      inFn(_obj[k], keys, v);
    }
  };
  if (typeof key !== "string" || key === "")
    ;
  else if (key.indexOf(".") !== -1) {
    const keys = key.split(".");
    inFn(obj, keys, value);
  } else {
    obj[key] = value;
  }
}
function page() {
  const pages2 = getCurrentPages();
  return `/${pages2[pages2.length - 1].route || ""}`;
}
function pages() {
  const pages2 = getCurrentPages();
  return pages2;
}
function getValueByPath(obj, path) {
  const pathArr = path.split(".");
  return pathArr.reduce((acc, curr) => {
    return acc && acc[curr] !== void 0 ? acc[curr] : void 0;
  }, obj);
}
function genLightColor(textColor, lightness = 95) {
  const rgb = parseColorWithoutDOM(textColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const bgHsl = {
    h: hsl.h,
    s: hsl.s,
    l: Math.min(lightness, 95)
  };
  return hslToHex(bgHsl.h, bgHsl.s, bgHsl.l);
}
function parseColorWithoutDOM(colorStr) {
  const str = colorStr.toLowerCase().trim();
  if (str.startsWith("#")) {
    const hex2 = str.replace("#", "");
    const fullHex = hex2.length === 3 ? hex2.split("").map((c) => c + c).join("") : hex2;
    return {
      r: parseInt(fullHex.substring(0, 2), 16),
      g: parseInt(fullHex.substring(2, 4), 16),
      b: parseInt(fullHex.substring(4, 6), 16)
    };
  }
  const rgbMatch = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: +rgbMatch[1],
      g: +rgbMatch[2],
      b: +rgbMatch[3]
    };
  }
  throw new Error("Invalid color format");
}
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s2, l = (max + min) / 2;
  if (max === min) {
    h = s2 = 0;
  } else {
    const d = max - min;
    s2 = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = (h * 60).toFixed(1);
  }
  return { h: +h, s: +(s2 * 100).toFixed(1), l: +(l * 100).toFixed(1) };
}
function hslToHex(h, s2, l) {
  l /= 100;
  const a = s2 * Math.min(l, 1 - l) / 100;
  const f2 = (n2) => {
    const k = (n2 + h / 30) % 12;
    const color2 = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color2).toString(16).padStart(2, "0");
  };
  return `#${f2(0)}${f2(8)}${f2(4)}`;
}
const index = {
  range: range$1,
  getPx,
  sleep,
  os,
  sys,
  getWindowInfo,
  random,
  guid,
  $parent,
  addStyle,
  addUnit,
  deepClone,
  deepMerge: deepMerge$2,
  shallowMerge,
  error,
  randomArray,
  timeFormat,
  timeFrom,
  trim,
  queryParams,
  toast,
  type2icon,
  priceFormat,
  getDuration,
  padZero,
  formValidate,
  getProperty,
  setProperty,
  page,
  pages,
  getValueByPath,
  genLightColor,
  rpx2px
};
class Router {
  constructor() {
    this.config = {
      type: "navigateTo",
      url: "",
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: "pop-in",
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false
      // 是否需要拦截
    };
    this.route = this.route.bind(this);
  }
  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  addRootPath(url3) {
    return url3[0] === "/" ? url3 : `/${url3}`;
  }
  // 整合路由参数
  mixinParam(url3, params2) {
    url3 = url3 && this.addRootPath(url3);
    let query = "";
    if (/.*\/.*\?.*=.*/.test(url3)) {
      query = queryParams(params2, false);
      return url3 += `&${query}`;
    }
    query = queryParams(params2);
    return url3 += query;
  }
  // 对外的方法名称
  async route(options = {}, params2 = {}) {
    let mergeConfig2 = {};
    if (typeof options === "string") {
      mergeConfig2.url = this.mixinParam(options, params2);
      mergeConfig2.type = "navigateTo";
    } else {
      mergeConfig2 = deepMerge$2(this.config, options);
      mergeConfig2.url = this.mixinParam(options.url, options.params);
    }
    if (mergeConfig2.url === page())
      return;
    if (params2.intercept) {
      this.config.intercept = params2.intercept;
    }
    mergeConfig2.params = params2;
    mergeConfig2 = deepMerge$2(this.config, mergeConfig2);
    if (typeof index$1.$u.routeIntercept === "function") {
      const isNext = await new Promise((resolve2, reject) => {
        index$1.$u.routeIntercept(mergeConfig2, resolve2);
      });
      isNext && this.openPage(mergeConfig2);
    } else {
      this.openPage(mergeConfig2);
    }
  }
  // 执行路由跳转
  openPage(config2) {
    const {
      url: url3,
      type: type2,
      delta,
      animationType,
      animationDuration
    } = config2;
    if (config2.type == "navigateTo" || config2.type == "to") {
      index$1.navigateTo({
        url: url3,
        animationType,
        animationDuration
      });
    }
    if (config2.type == "redirectTo" || config2.type == "redirect") {
      index$1.redirectTo({
        url: url3
      });
    }
    if (config2.type == "switchTab" || config2.type == "tab") {
      index$1.switchTab({
        url: url3
      });
    }
    if (config2.type == "reLaunch" || config2.type == "launch") {
      index$1.reLaunch({
        url: url3
      });
    }
    if (config2.type == "navigateBack" || config2.type == "back") {
      index$1.navigateBack({
        delta
      });
    }
  }
}
const route = new Router().route;
const THEME_MODE_STORAGE_KEY$1 = "u-theme-mode";
const FALLBACK_THEME_VARS = {
  light: {
    "--up-main-color": "var(--up-light-main-color, #303133)",
    "--up-content-color": "var(--up-light-content-color, #606266)",
    "--up-tips-color": "var(--up-light-tips-color, #909193)",
    "--up-light-color": "var(--up-light-light-color, #c0c4cc)",
    "--up-border-color": "var(--up-light-border-color, #dadbde)",
    "--up-bg-color": "var(--up-light-bg-color, #f3f4f6)",
    "--up-hover-bg-color": "#e7ebf0",
    "--up-page-bg-color": "#f3f4f6",
    "--up-card-bg-color": "#ffffff",
    "--up-navbar-bg-color": "#ffffff",
    "--up-table2-header-bg-color": "#f5f7fa",
    "--up-table2-zebra-bg-color": "#fafafa",
    "--up-table2-highlight-bg-color": "#f5f7fa",
    "--up-gap-bg-color": "#f3f4f6",
    "--up-skeleton-bg-color": "#f1f2f4",
    "--up-skeleton-shimmer-color": "#e6e6e6",
    "--up-swipe-action-button-bg-color": "#c7c6cd",
    "--up-index-list-indicator-bg-color": "#c9c9c9",
    "--up-calendar-month-mark-color": "rgba(231, 232, 234, 0.83)",
    "--up-disabled-color": "var(--up-light-disabled-color, #c8c9cc)",
    "--up-primary": "var(--up-light-primary, #3c9cff)",
    "--up-primary-dark": "var(--up-light-primary-dark, #398ade)",
    "--up-primary-disabled": "var(--up-light-primary-disabled, #9acafc)",
    "--up-primary-light": "var(--up-light-primary-light, #ecf5ff)",
    "--up-warning": "var(--up-light-warning, #f9ae3d)",
    "--up-warning-dark": "var(--up-light-warning-dark, #f1a532)",
    "--up-warning-disabled": "var(--up-light-warning-disabled, #f9d39b)",
    "--up-warning-light": "var(--up-light-warning-light, #fdf6ec)",
    "--up-success": "var(--up-light-success, #5ac725)",
    "--up-success-dark": "var(--up-light-success-dark, #53c21d)",
    "--up-success-disabled": "var(--up-light-success-disabled, #a9e08f)",
    "--up-success-light": "var(--up-light-success-light, #f5fff0)",
    "--up-error": "var(--up-light-error, #f56c6c)",
    "--up-error-dark": "var(--up-light-error-dark, #e45656)",
    "--up-error-disabled": "var(--up-light-error-disabled, #f7b2b2)",
    "--up-error-light": "var(--up-light-error-light, #fef0f0)",
    "--up-info": "var(--up-light-info, #909399)",
    "--up-info-dark": "var(--up-light-info-dark, #767a82)",
    "--up-info-disabled": "var(--up-light-info-disabled, #c4c6c9)",
    "--up-info-light": "var(--up-light-info-light, #f4f4f5)"
  },
  dark: {
    "--up-main-color": "#f5f5f5",
    "--up-content-color": "#d1d5db",
    "--up-tips-color": "#9ca3af",
    "--up-light-color": "#6b7280",
    "--up-border-color": "#3a3a3c",
    "--up-bg-color": "#1f1f1f",
    "--up-hover-bg-color": "#343741",
    "--up-page-bg-color": "#1f1f1f",
    "--up-card-bg-color": "#1c1c1e",
    "--up-navbar-bg-color": "#1c1c1e",
    "--up-table2-header-bg-color": "#2a2d33",
    "--up-table2-zebra-bg-color": "#23262b",
    "--up-table2-highlight-bg-color": "#2f3440",
    "--up-gap-bg-color": "#111111",
    "--up-skeleton-bg-color": "#2f3135",
    "--up-skeleton-shimmer-color": "rgba(255, 255, 255, 0.12)",
    "--up-swipe-action-button-bg-color": "#4b5563",
    "--up-index-list-indicator-bg-color": "#4b5563",
    "--up-calendar-month-mark-color": "rgba(255, 255, 255, 0.04)",
    "--up-disabled-color": "#4b5563",
    "--up-primary": "#3c9cff",
    "--up-primary-dark": "#5aa8ff",
    "--up-primary-disabled": "#4c6f92",
    "--up-primary-light": "#10243a",
    "--up-warning": "#f9ae3d",
    "--up-warning-dark": "#ffbf66",
    "--up-warning-disabled": "#8a6a3a",
    "--up-warning-light": "#3d2f1b",
    "--up-success": "#5ac725",
    "--up-success-dark": "#7ad94b",
    "--up-success-disabled": "#5f7f4f",
    "--up-success-light": "#1f3316",
    "--up-error": "#f56c6c",
    "--up-error-dark": "#ff8a8a",
    "--up-error-disabled": "#8d5858",
    "--up-error-light": "#3a2222",
    "--up-info": "#909399",
    "--up-info-dark": "#b0b3b8",
    "--up-info-disabled": "#5f6368",
    "--up-info-light": "#2f3238"
  }
};
const THEME_COLOR_SYNC_MAP = {
  "--up-main-color": "mainColor",
  "--up-content-color": "contentColor",
  "--up-tips-color": "tipsColor",
  "--up-light-color": "lightColor",
  "--up-border-color": "borderColor",
  "--up-bg-color": "bgColor",
  "--up-disabled-color": "disabledColor",
  "--up-primary": "primary",
  "--up-primary-dark": "primaryDark",
  "--up-primary-disabled": "primaryDisabled",
  "--up-primary-light": "primaryLight",
  "--up-warning": "warning",
  "--up-warning-dark": "warningDark",
  "--up-warning-disabled": "warningDisabled",
  "--up-warning-light": "warningLight",
  "--up-success": "success",
  "--up-success-dark": "successDark",
  "--up-success-disabled": "successDisabled",
  "--up-success-light": "successLight",
  "--up-error": "error",
  "--up-error-dark": "errorDark",
  "--up-error-disabled": "errorDisabled",
  "--up-error-light": "errorLight",
  "--up-info": "info",
  "--up-info-dark": "infoDark",
  "--up-info-disabled": "infoDisabled",
  "--up-info-light": "infoLight"
};
function buildFallbackAliasVars(vars) {
  const aliasVars = {};
  Object.keys(vars).forEach((key) => {
    if (typeof key === "string" && key.indexOf("--up-") === 0) {
      aliasVars[key.replace("--up-", "--u-")] = vars[key];
    }
  });
  return aliasVars;
}
function getRuntimeU(upU) {
  if (upU)
    return upU;
  if (typeof index$1 !== "undefined")
    return index$1.$u;
  return null;
}
function normalizeRuntimeRoute(route2) {
  if (typeof route2 !== "string")
    return "";
  return route2.replace(/^\//, "").split("?")[0];
}
function getCurrentRuntimeRoute() {
  try {
    if (typeof getCurrentPages !== "function")
      return "";
    const pages2 = getCurrentPages();
    if (!Array.isArray(pages2) || pages2.length === 0)
      return "";
    const page2 = pages2[pages2.length - 1] || {};
    return normalizeRuntimeRoute(page2.route || page2.path || "");
  } catch (e2) {
  }
  return "";
}
function getRuntimeTabBarRoutes() {
  var _a;
  const routes = [];
  try {
    const runtimeConfig = typeof __uniConfig !== "undefined" ? __uniConfig : null;
    const tabBarList = (_a = runtimeConfig == null ? void 0 : runtimeConfig.tabBar) == null ? void 0 : _a.list;
    if (Array.isArray(tabBarList)) {
      tabBarList.forEach((item) => {
        const route2 = normalizeRuntimeRoute((item == null ? void 0 : item.pagePath) || "");
        if (route2)
          routes.push(route2);
      });
    }
  } catch (e2) {
  }
  return routes;
}
function hasActiveRuntimePage$1() {
  try {
    if (typeof getCurrentPages === "function") {
      const pages2 = getCurrentPages();
      return Array.isArray(pages2) && pages2.length > 0;
    }
  } catch (e2) {
  }
  return false;
}
function trySetNavigationBarColor$1(options) {
  if (typeof index$1 === "undefined" || typeof index$1.setNavigationBarColor !== "function")
    return;
  if (!hasActiveRuntimePage$1())
    return;
  try {
    const result = index$1.setNavigationBarColor(options);
    if (result && typeof result.catch === "function") {
      result.catch(() => {
      });
    }
  } catch (e2) {
  }
}
function isTabBarPage() {
  const route2 = getCurrentRuntimeRoute();
  if (!route2)
    return false;
  const tabBarRoutes = getRuntimeTabBarRoutes();
  if (!tabBarRoutes.length)
    return false;
  return tabBarRoutes.includes(route2);
}
function trySetTabBarStyle(options) {
  if (typeof index$1 === "undefined" || typeof index$1.setTabBarStyle !== "function")
    return;
  if (!isTabBarPage())
    return;
  try {
    const result = index$1.setTabBarStyle(options);
    if (result && typeof result.catch === "function") {
      result.catch(() => {
      });
    }
  } catch (e2) {
  }
}
function normalizeThemeMode$1(theme = "light") {
  return theme === "dark" ? "dark" : "light";
}
function normalizeThemePreference$1(mode = "system") {
  return mode === "dark" || mode === "light" ? mode : "system";
}
function getFallbackSystemTheme() {
  let theme = "light";
  try {
    if (typeof index$1 !== "undefined" && typeof index$1.getAppBaseInfo === "function") {
      const appBaseInfo = index$1.getAppBaseInfo() || {};
      if (appBaseInfo.theme)
        theme = appBaseInfo.theme;
    }
    if (typeof index$1 !== "undefined" && typeof index$1.getSystemInfoSync === "function") {
      const systemInfo = index$1.getSystemInfoSync() || {};
      if (systemInfo.theme)
        theme = systemInfo.theme;
    }
  } catch (e2) {
    theme = "light";
  }
  return normalizeThemeMode$1(theme);
}
function getFallbackThemePreference() {
  try {
    if (typeof index$1 !== "undefined" && typeof index$1.getStorageSync === "function") {
      const preference = index$1.getStorageSync(THEME_MODE_STORAGE_KEY$1);
      return normalizeThemePreference$1(preference);
    }
  } catch (e2) {
  }
  return "system";
}
function getFallbackThemeMode() {
  const preference = getFallbackThemePreference();
  if (preference === "dark" || preference === "light")
    return preference;
  return getFallbackSystemTheme();
}
function getFallbackThemeVarsByMode(mode) {
  const vars = FALLBACK_THEME_VARS[normalizeThemeMode$1(mode)] || FALLBACK_THEME_VARS.light;
  return {
    ...vars,
    ...buildFallbackAliasVars(vars)
  };
}
function getFallbackThemeVars(upU) {
  const mode = getThemeIsDark(upU) ? "dark" : "light";
  return getFallbackThemeVarsByMode(mode);
}
function syncRuntimeColor(runtimeU, vars) {
  if (!runtimeU || !runtimeU.color)
    return;
  Object.keys(THEME_COLOR_SYNC_MAP).forEach((token) => {
    const field = THEME_COLOR_SYNC_MAP[token];
    runtimeU.color[field] = vars[token];
  });
}
function syncThemeRuntimeFromStorage(upU) {
  const runtimeU = getRuntimeU(upU);
  if (!runtimeU || !runtimeU.theme)
    return runtimeU == null ? void 0 : runtimeU.theme;
  const preference = getFallbackThemePreference();
  const mode = preference === "system" ? getFallbackSystemTheme() : preference;
  const vars = getFallbackThemeVarsByMode(mode);
  const shouldUpdate = runtimeU.theme.preference !== preference || runtimeU.theme.mode !== mode;
  if (shouldUpdate && typeof runtimeU.setThemePreference === "function") {
    return runtimeU.setThemePreference(preference) || runtimeU.theme;
  }
  runtimeU.theme.preference = preference;
  runtimeU.theme.mode = mode;
  runtimeU.theme.vars = {
    ...vars,
    ...runtimeU.theme.vars && !shouldUpdate ? runtimeU.theme.vars : {}
  };
  if (shouldUpdate) {
    runtimeU.theme.version = Number(runtimeU.theme.version || 0) + 1;
  }
  syncRuntimeColor(runtimeU, runtimeU.theme.vars);
  return runtimeU.theme;
}
function getThemeIsDark(upU) {
  var _a, _b;
  const runtimeMode = (_b = (_a = getRuntimeU(upU)) == null ? void 0 : _a.theme) == null ? void 0 : _b.mode;
  if (runtimeMode)
    return runtimeMode === "dark";
  return getFallbackThemeMode() === "dark";
}
function getThemeVarsForStyle(upU) {
  const runtimeU = getRuntimeU(upU);
  if (runtimeU && typeof runtimeU.getThemeVars === "function") {
    return runtimeU.getThemeVars();
  }
  return getFallbackThemeVars(runtimeU);
}
function getThemeVar(varName, fallbackColor, upU) {
  var _a, _b;
  const runtimeU = getRuntimeU(upU);
  const themeVars = (_a = runtimeU == null ? void 0 : runtimeU.theme) == null ? void 0 : _a.vars;
  if (themeVars && Object.prototype.hasOwnProperty.call(themeVars, varName)) {
    return themeVars[varName];
  }
  if (typeof varName === "string") {
    const aliasVarName = varName.indexOf("--up-") === 0 ? varName.replace("--up-", "--u-") : varName.indexOf("--u-") === 0 ? varName.replace("--u-", "--up-") : "";
    if (aliasVarName && themeVars && Object.prototype.hasOwnProperty.call(themeVars, aliasVarName)) {
      return themeVars[aliasVarName];
    }
    const runtimeColorMap = ((_b = runtimeU == null ? void 0 : runtimeU.config) == null ? void 0 : _b.color) || {};
    const colorTokenKey = varName.indexOf("--") === 0 ? varName.slice(2) : varName;
    if (Object.prototype.hasOwnProperty.call(runtimeColorMap, colorTokenKey)) {
      return runtimeColorMap[colorTokenKey];
    }
    const aliasColorTokenKey = colorTokenKey.indexOf("up-") === 0 ? colorTokenKey.replace("up-", "u-") : colorTokenKey.indexOf("u-") === 0 ? colorTokenKey.replace("u-", "up-") : "";
    if (aliasColorTokenKey && Object.prototype.hasOwnProperty.call(runtimeColorMap, aliasColorTokenKey)) {
      return runtimeColorMap[aliasColorTokenKey];
    }
  }
  if (runtimeU && typeof runtimeU.getThemeVars === "function") {
    const vars = runtimeU.getThemeVars();
    if (vars && Object.prototype.hasOwnProperty.call(vars, varName)) {
      return vars[varName];
    }
  }
  const fallbackVars = getFallbackThemeVars(runtimeU);
  if (fallbackVars && Object.prototype.hasOwnProperty.call(fallbackVars, varName)) {
    return fallbackVars[varName];
  }
  return typeof fallbackColor !== "undefined" ? fallbackColor : "";
}
function getThemePageStyle(upU, preferCssVars = false) {
  var _a;
  const runtimeU = getRuntimeU(upU);
  const isDark = getThemeIsDark(runtimeU);
  const fallbackBg = isDark ? "#1f1f1f" : ((_a = runtimeU == null ? void 0 : runtimeU.color) == null ? void 0 : _a.bgColor) || "#f3f4f6";
  if (preferCssVars) {
    return {
      ...getThemeVarsForStyle(runtimeU),
      minHeight: "100vh",
      backgroundColor: `var(--up-page-bg-color, var(--up-bg-color, ${fallbackBg}))`
    };
  }
  return {
    backgroundColor: getThemeVar(
      "--up-page-bg-color",
      getThemeVar("--up-bg-color", fallbackBg, runtimeU),
      runtimeU
    )
  };
}
function getThemeCardStyle(upU, preferCssVars = false) {
  var _a;
  const runtimeU = getRuntimeU(upU);
  const isDark = getThemeIsDark(runtimeU);
  const fallbackCard = isDark ? "#1c1c1e" : "#ffffff";
  const fallbackBorder = ((_a = runtimeU == null ? void 0 : runtimeU.color) == null ? void 0 : _a.borderColor) || "#dadbde";
  if (preferCssVars) {
    return {
      backgroundColor: `var(--up-card-bg-color, ${fallbackCard})`,
      borderColor: `var(--up-border-color, ${fallbackBorder})`
    };
  }
  return {
    backgroundColor: getThemeVar("--up-card-bg-color", fallbackCard, runtimeU),
    borderColor: getThemeVar("--up-border-color", fallbackBorder, runtimeU)
  };
}
function getThemeTabBarStyle(upU) {
  const runtimeU = getRuntimeU(upU);
  const isDark = getThemeIsDark(runtimeU);
  return {
    color: isDark ? "#8e8e93" : "#909399",
    selectedColor: isDark ? "#f2f2f7" : "#303133",
    backgroundColor: isDark ? "#111111" : "#ffffff",
    borderStyle: isDark ? "white" : "black"
  };
}
function applyNativeThemeUI$1(upU) {
  var _a, _b;
  if (typeof index$1 === "undefined")
    return;
  const runtimeU = getRuntimeU(upU);
  if (((_a = runtimeU == null ? void 0 : runtimeU.config) == null ? void 0 : _a.nativeThemeSync) !== true)
    return;
  const isDark = getThemeIsDark(runtimeU);
  const fallbackBg = isDark ? "#1f1f1f" : ((_b = runtimeU == null ? void 0 : runtimeU.color) == null ? void 0 : _b.bgColor) || "#f3f4f6";
  const pageBg = getThemeVar(
    "--up-page-bg-color",
    getThemeVar("--up-bg-color", fallbackBg, runtimeU),
    runtimeU
  );
  const navBg = getThemeVar(
    "--up-navbar-bg-color",
    isDark ? "#1c1c1e" : "#ffffff",
    runtimeU
  );
  trySetNavigationBarColor$1({
    frontColor: isDark ? "#ffffff" : "#000000",
    backgroundColor: navBg,
    animation: {
      duration: 0,
      timingFunc: "linear"
    }
  });
  if (typeof index$1.setBackgroundColor === "function") {
    index$1.setBackgroundColor({
      backgroundColor: pageBg,
      backgroundColorTop: pageBg,
      backgroundColorBottom: pageBg
    });
  }
  trySetTabBarStyle(getThemeTabBarStyle(runtimeU));
}
function applyNativeThemeUIDeferred(upU, delay = 30) {
  applyNativeThemeUI$1(upU);
  if (typeof setTimeout === "function") {
    setTimeout(() => {
      applyNativeThemeUI$1(upU);
    }, delay);
  }
}
const mixin = defineMixin({
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: () => ({})
    },
    customClass: {
      type: String,
      default: ""
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ""
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: "navigateTo"
    }
  },
  data() {
    return {
      __upPageThemeChangeHandler: null,
      upThemeVersion: 0
    };
  },
  onLoad() {
    this.upBindGetRect();
    this.upInitThemeVersion();
    if (this.upIsPageScope()) {
      this.upApplyNativeThemeUI();
      if (typeof index$1 !== "undefined" && typeof index$1.$on === "function" && !this.__upPageThemeChangeHandler) {
        this.__upPageThemeChangeHandler = () => {
          this.upApplyNativeThemeUI();
        };
        index$1.$on("uThemeChange", this.__upPageThemeChangeHandler);
      }
    }
  },
  onShow() {
    if (this.upIsPageScope()) {
      this.upApplyNativeThemeUI();
    }
  },
  created() {
    this.upBindGetRect();
    this.upInitThemeVersion();
    if (typeof index$1 !== "undefined" && typeof index$1.$on === "function") {
      this.__uThemeChangeHandler = (payload = {}) => {
        this.upSyncThemeVersion(payload);
        this.upClearUCache();
        if (typeof this.$forceUpdate === "function") {
          this.$forceUpdate();
        }
      };
      index$1.$on("uThemeChange", this.__uThemeChangeHandler);
    }
  },
  computed: {
    // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
    // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
    // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
    $u() {
      this.upThemeVersion;
      const instance2 = this.$;
      if (instance2 == null ? void 0 : instance2.__upUCache) {
        return instance2.__upUCache;
      }
      let mergeU = deepMerge$2(index$1.$u, {
        props: void 0,
        http: void 0,
        mixin: void 0
      });
      if (instance2) {
        instance2.__upUCache = mergeU;
        return instance2.__upUCache;
      }
      return mergeU;
    },
    upThemeIsDark() {
      this.upThemeVersion;
      return getThemeIsDark(this.$u);
    },
    upThemeVars() {
      this.upThemeVersion;
      return getThemeVarsForStyle(this.$u);
    },
    upThemePageStyle() {
      this.upThemeVersion;
      return getThemePageStyle(this.$u);
    },
    upThemeCardStyle() {
      this.upThemeVersion;
      return getThemeCardStyle(this.$u);
    },
    /**
     * 生成bem规则类名
     * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
     * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
     * @param {String} name 组件名称
     * @param {Array} fixed 一直会存在的类名
     * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
     * @returns {Array|string}
     */
    bem() {
      return function(name, fixed, change) {
        const prefix = `u-${name}--`;
        const classes = {};
        if (fixed) {
          fixed.map((item) => {
            classes[prefix + this[item]] = true;
          });
        }
        if (change) {
          change.map((item) => {
            this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
      };
    }
  },
  methods: {
    upClearUCache() {
      if (this.$) {
        this.$.__upUCache = null;
      }
    },
    upBindGetRect() {
      const upU = this.$u || (typeof index$1 !== "undefined" ? index$1.$u : null);
      if (upU) {
        upU.getRect = this.$uGetRect;
      } else if (typeof index$1 !== "undefined") {
        index$1.$u = {
          getRect: this.$uGetRect
        };
      }
    },
    upReadThemeVersion() {
      return Number(typeof index$1 !== "undefined" && index$1.$u && index$1.$u.theme && index$1.$u.theme.version || 0);
    },
    upInitThemeVersion() {
      const version2 = this.upReadThemeVersion();
      if (version2) {
        this.upThemeVersion = version2;
      }
    },
    upSyncThemeVersion(payload = {}) {
      const version2 = Number(payload.version || this.upReadThemeVersion() || 0);
      this.upThemeVersion = version2 || Number(this.upThemeVersion || 0) + 1;
    },
    upIsPageScope() {
      var _a;
      return !!(this.$page || this.route || ((_a = this.$options) == null ? void 0 : _a.mpType) === "page");
    },
    upHasProp(propName) {
      var _a, _b;
      const vnodeProps = ((_b = (_a = this.$) == null ? void 0 : _a.vnode) == null ? void 0 : _b.props) || {};
      const kebabName = propName.replace(/[A-Z]/g, (s2) => `-${s2.toLowerCase()}`);
      return Object.prototype.hasOwnProperty.call(vnodeProps, propName) || Object.prototype.hasOwnProperty.call(vnodeProps, kebabName);
    },
    upThemeVar(varName, fallbackColor) {
      this.upThemeVersion;
      return getThemeVar(varName, fallbackColor, this.$u);
    },
    upApplyNativeThemeUI() {
      syncThemeRuntimeFromStorage(this.$u);
      this.upSyncThemeVersion();
      applyNativeThemeUIDeferred(this.$u);
    },
    // 跳转某一个页面
    openPage(urlKey = "url") {
      const url3 = this[urlKey];
      if (url3) {
        route({ type: this.linkType, url: url3 });
      }
    },
    navTo(url3 = "", linkType = "navigateTo") {
      route({ type: this.linkType, url: url3 });
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect(selector, all) {
      return new Promise((resolve2) => {
        index$1.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve2(rect);
          }
          if (!all && rect) {
            resolve2(rect);
          }
        }).exec();
      });
    },
    getParentData(parentName = "") {
      if (!this.parent)
        this.parent = {};
      this.parent = $parent.call(this, parentName);
      if (this.parent.children) {
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent(e2) {
      e2 && typeof e2.stopPropagation === "function" && e2.stopPropagation();
    },
    // 空操作
    noop(e2) {
      this.preventEvent(e2);
    }
  },
  onReachBottom() {
    index$1.$emit("uOnReachBottom");
  },
  beforeUnmount() {
    if (this.parent && test.array(this.parent.children)) {
      const childrenList = this.parent.children;
      childrenList.map((child, index2) => {
        if (child === this) {
          childrenList.splice(index2, 1);
        }
      });
    }
    if (typeof index$1 !== "undefined" && typeof index$1.$off === "function" && this.__uThemeChangeHandler) {
      index$1.$off("uThemeChange", this.__uThemeChangeHandler);
      this.__uThemeChangeHandler = null;
    }
    if (typeof index$1 !== "undefined" && typeof index$1.$off === "function" && this.__upPageThemeChangeHandler) {
      index$1.$off("uThemeChange", this.__upPageThemeChangeHandler);
      this.__upPageThemeChangeHandler = null;
    }
  }
});
const mpMixin = defineMixin({
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true
  }
});
function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
  const startRGB = hexToRgb(startColor, false);
  const startR = startRGB[0];
  const startG = startRGB[1];
  const startB = startRGB[2];
  const endRGB = hexToRgb(endColor, false);
  const endR = endRGB[0];
  const endG = endRGB[1];
  const endB = endRGB[2];
  const sR = (endR - startR) / step;
  const sG = (endG - startG) / step;
  const sB = (endB - startB) / step;
  const colorArr = [];
  for (let i = 0; i < step; i++) {
    let hex2 = rgbToHex(`rgb(${Math.round(sR * i + startR)},${Math.round(sG * i + startG)},${Math.round(sB * i + startB)})`);
    if (i === 0)
      hex2 = rgbToHex(startColor);
    if (i === step - 1)
      hex2 = rgbToHex(endColor);
    colorArr.push(hex2);
  }
  return colorArr;
}
function hexToRgb(sColor, str = true) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = String(sColor).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
    }
    if (!str) {
      return sColorChange;
    }
    return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
  }
  if (/^(rgb|RGB)/.test(sColor)) {
    const arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map((val) => Number(val));
  }
  return sColor;
}
function rgbToHex(rgb) {
  const _this = rgb;
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    const aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i = 0; i < aColor.length; i++) {
      let hex2 = Number(aColor[i]).toString(16);
      hex2 = String(hex2).length == 1 ? `${0}${hex2}` : hex2;
      if (hex2 === "0") {
        hex2 += hex2;
      }
      strHex += hex2;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  }
  if (reg.test(_this)) {
    const aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    }
    if (aNum.length === 3) {
      let numHex = "#";
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}
function colorToRgba(color2, alpha) {
  color2 = rgbToHex(color2);
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = String(color2).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
    }
    return `rgba(${sColorChange.join(",")},${alpha})`;
  }
  return sColor;
}
const colorGradient$1 = {
  colorGradient,
  hexToRgb,
  rgbToHex,
  colorToRgba
};
let timeout = null;
function debounce(func2, wait = 500, immediate = false) {
  if (timeout !== null)
    clearTimeout(timeout);
  if (immediate) {
    const callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow)
      typeof func2 === "function" && func2();
  } else {
    timeout = setTimeout(() => {
      typeof func2 === "function" && func2();
    }, wait);
  }
}
let flag;
function throttle(func2, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      typeof func2 === "function" && func2();
      setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    setTimeout(() => {
      flag = false;
      typeof func2 === "function" && func2();
    }, wait);
  }
}
function add$1(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e2) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e2) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
function sub(arg1, arg2) {
  var r1, r2, m, n2;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e2) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e2) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n2 = r1 >= r2 ? r1 : r2;
  return Math.abs(((arg1 * m - arg2 * m) / m).toFixed(n2));
}
function mul(a, b) {
  var c = 0, d = a.toString(), e2 = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f2) {
  }
  try {
    c += e2.split(".")[1].length;
  } catch (f2) {
  }
  return Number(d.replace(".", "")) * Number(e2.replace(".", "")) / Math.pow(10, c);
}
function div(a, b) {
  var c, d, e2 = 0, f2 = 0;
  try {
    e2 = a.toString().split(".")[1].length;
  } catch (g) {
  }
  try {
    f2 = b.toString().split(".")[1].length;
  } catch (g) {
  }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), xyutil.mul(c / d, Math.pow(10, f2 - e2));
}
const calc = {
  add: add$1,
  sub,
  mul,
  div
};
const zIndex = {
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965
};
const color$2 = {
  primary: "#3c9cff",
  info: "#909399",
  default: "#909399",
  warning: "#f9ae3d",
  error: "#f56c6c",
  success: "#5ac725",
  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed"
};
const { toString } = Object.prototype;
function isArray(val) {
  return toString.call(val) === "[object Array]";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isDate(val) {
  return toString.call(val) === "[object Date]";
}
function isURLSearchParams(val) {
  return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function isPlainObject$1(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function deepMerge$1() {
  const result = {};
  function assignValue(val, key) {
    if (typeof result[key] === "object" && typeof val === "object") {
      result[key] = deepMerge$1(result[key], val);
    } else if (typeof val === "object") {
      result[key] = deepMerge$1({}, val);
    } else {
      result[key] = val;
    }
  }
  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url3, params2) {
  if (!params2) {
    return url3;
  }
  let serializedParams;
  if (isURLSearchParams(params2)) {
    serializedParams = params2.toString();
  } else {
    const parts = [];
    forEach(params2, (val, key) => {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (isArray(val)) {
        key = `${key}[]`;
      } else {
        val = [val];
      }
      forEach(val, (v) => {
        if (isDate(v)) {
          v = v.toISOString();
        } else if (isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(`${encode(key)}=${encode(v)}`);
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    const hashmarkIndex = url3.indexOf("#");
    if (hashmarkIndex !== -1) {
      url3 = url3.slice(0, hashmarkIndex);
    }
    url3 += (url3.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url3;
}
function isAbsoluteURL(url3) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url3);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}` : baseURL;
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
function settle(resolve2, reject, response) {
  const { validateStatus: validateStatus2 } = response.config;
  const status = response.statusCode;
  if (status && (!validateStatus2 || validateStatus2(status))) {
    resolve2(response);
  } else {
    reject(response);
  }
}
const mergeKeys$1 = (keys, config2) => {
  const config3 = {};
  keys.forEach((prop) => {
    if (!isUndefined(config2[prop])) {
      config3[prop] = config2[prop];
    }
  });
  return config3;
};
const adapter = (config2) => new Promise((resolve2, reject) => {
  const fullPath = buildURL(buildFullPath(config2.baseURL, config2.url), config2.params);
  const _config = {
    url: fullPath,
    header: config2.header,
    complete: (response) => {
      config2.fullPath = fullPath;
      response.config = config2;
      try {
        if (typeof response.data === "string") {
          response.data = JSON.parse(response.data);
        }
      } catch (e2) {
      }
      settle(resolve2, reject, response);
    }
  };
  let requestTask;
  if (config2.method === "UPLOAD") {
    delete _config.header["content-type"];
    delete _config.header["Content-Type"];
    const otherConfig = {
      filePath: config2.filePath,
      name: config2.name
    };
    const optionalKeys = [
      "formData"
    ];
    requestTask = index$1.uploadFile({ ..._config, ...otherConfig, ...mergeKeys$1(optionalKeys, config2) });
  } else if (config2.method === "DOWNLOAD") {
    requestTask = index$1.downloadFile(_config);
  } else {
    const optionalKeys = [
      "data",
      "method",
      "timeout",
      "dataType",
      "responseType"
    ];
    requestTask = index$1.request({ ..._config, ...mergeKeys$1(optionalKeys, config2) });
  }
  if (config2.getTask) {
    config2.getTask(requestTask, config2);
  }
});
const dispatchRequest = (config2) => adapter(config2);
function InterceptorManager() {
  this.handlers = [];
}
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  });
  return this.handlers.length - 1;
};
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager.prototype.forEach = function forEach2(fn) {
  this.handlers.forEach((h) => {
    if (h !== null) {
      fn(h);
    }
  });
};
const mergeKeys = (keys, globalsConfig, config2) => {
  const config3 = {};
  keys.forEach((prop) => {
    if (!isUndefined(config2[prop])) {
      config3[prop] = config2[prop];
    } else if (!isUndefined(globalsConfig[prop])) {
      config3[prop] = globalsConfig[prop];
    }
  });
  return config3;
};
const mergeConfig = (globalsConfig, config2 = {}) => {
  const method3 = config2.method || globalsConfig.method || "GET";
  let config3 = {
    baseURL: globalsConfig.baseURL || "",
    method: method3,
    url: config2.url || "",
    params: config2.params || {},
    custom: { ...globalsConfig.custom || {}, ...config2.custom || {} },
    header: deepMerge$1(globalsConfig.header || {}, config2.header || {})
  };
  const defaultToConfig2Keys = ["getTask", "validateStatus"];
  config3 = { ...config3, ...mergeKeys(defaultToConfig2Keys, globalsConfig, config2) };
  if (method3 === "DOWNLOAD")
    ;
  else if (method3 === "UPLOAD") {
    delete config3.header["content-type"];
    delete config3.header["Content-Type"];
    const uploadKeys = [
      "filePath",
      "name",
      "formData"
    ];
    uploadKeys.forEach((prop) => {
      if (!isUndefined(config2[prop])) {
        config3[prop] = config2[prop];
      }
    });
  } else {
    const defaultsKeys = [
      "data",
      "timeout",
      "dataType",
      "responseType"
    ];
    config3 = { ...config3, ...mergeKeys(defaultsKeys, globalsConfig, config2) };
  }
  return config3;
};
const defaults = {
  baseURL: "",
  header: {},
  method: "GET",
  dataType: "json",
  responseType: "text",
  custom: {},
  timeout: 6e4,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
var clone = function() {
  function _instanceof(obj, type2) {
    return type2 != null && obj instanceof type2;
  }
  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    nativeMap = function() {
    };
  }
  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = function() {
    };
  }
  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = function() {
    };
  }
  function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
    if (typeof circular === "object") {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    var allParents = [];
    var allChildren = [];
    var useBuffer = typeof Buffer != "undefined";
    if (typeof circular == "undefined")
      circular = true;
    if (typeof depth == "undefined")
      depth = Infinity;
    function _clone(parent2, depth2) {
      if (parent2 === null)
        return null;
      if (depth2 === 0)
        return parent2;
      var child;
      var proto;
      if (typeof parent2 != "object") {
        return parent2;
      }
      if (_instanceof(parent2, nativeMap)) {
        child = new nativeMap();
      } else if (_instanceof(parent2, nativeSet)) {
        child = new nativeSet();
      } else if (_instanceof(parent2, nativePromise)) {
        child = new nativePromise(function(resolve2, reject) {
          parent2.then(function(value) {
            resolve2(_clone(value, depth2 - 1));
          }, function(err) {
            reject(_clone(err, depth2 - 1));
          });
        });
      } else if (clone2.__isArray(parent2)) {
        child = [];
      } else if (clone2.__isRegExp(parent2)) {
        child = new RegExp(parent2.source, __getRegExpFlags(parent2));
        if (parent2.lastIndex)
          child.lastIndex = parent2.lastIndex;
      } else if (clone2.__isDate(parent2)) {
        child = new Date(parent2.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent2)) {
        if (Buffer.from) {
          child = Buffer.from(parent2);
        } else {
          child = new Buffer(parent2.length);
          parent2.copy(child);
        }
        return child;
      } else if (_instanceof(parent2, Error)) {
        child = Object.create(parent2);
      } else {
        if (typeof prototype == "undefined") {
          proto = Object.getPrototypeOf(parent2);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }
      if (circular) {
        var index2 = allParents.indexOf(parent2);
        if (index2 != -1) {
          return allChildren[index2];
        }
        allParents.push(parent2);
        allChildren.push(child);
      }
      if (_instanceof(parent2, nativeMap)) {
        parent2.forEach(function(value, key) {
          var keyChild = _clone(key, depth2 - 1);
          var valueChild = _clone(value, depth2 - 1);
          child.set(keyChild, valueChild);
        });
      }
      if (_instanceof(parent2, nativeSet)) {
        parent2.forEach(function(value) {
          var entryChild = _clone(value, depth2 - 1);
          child.add(entryChild);
        });
      }
      for (var i in parent2) {
        var attrs = Object.getOwnPropertyDescriptor(parent2, i);
        if (attrs) {
          child[i] = _clone(parent2[i], depth2 - 1);
        }
        try {
          var objProperty = Object.getOwnPropertyDescriptor(parent2, i);
          if (objProperty.set === "undefined") {
            continue;
          }
          child[i] = _clone(parent2[i], depth2 - 1);
        } catch (e2) {
          if (e2 instanceof TypeError) {
            continue;
          } else if (e2 instanceof ReferenceError) {
            continue;
          }
        }
      }
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent2);
        for (var i = 0; i < symbols.length; i++) {
          var symbol = symbols[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent2[symbol], depth2 - 1);
          Object.defineProperty(child, symbol, descriptor);
        }
      }
      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent2);
        for (var i = 0; i < allPropertyNames.length; i++) {
          var propertyName = allPropertyNames[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
          Object.defineProperty(child, propertyName, descriptor);
        }
      }
      return child;
    }
    return _clone(parent, depth);
  }
  clone2.clonePrototype = function clonePrototype(parent) {
    if (parent === null)
      return null;
    var c = function() {
    };
    c.prototype = parent;
    return new c();
  };
  function __objToStr(o2) {
    return Object.prototype.toString.call(o2);
  }
  clone2.__objToStr = __objToStr;
  function __isDate(o2) {
    return typeof o2 === "object" && __objToStr(o2) === "[object Date]";
  }
  clone2.__isDate = __isDate;
  function __isArray(o2) {
    return typeof o2 === "object" && __objToStr(o2) === "[object Array]";
  }
  clone2.__isArray = __isArray;
  function __isRegExp(o2) {
    return typeof o2 === "object" && __objToStr(o2) === "[object RegExp]";
  }
  clone2.__isRegExp = __isRegExp;
  function __getRegExpFlags(re) {
    var flags = "";
    if (re.global)
      flags += "g";
    if (re.ignoreCase)
      flags += "i";
    if (re.multiline)
      flags += "m";
    return flags;
  }
  clone2.__getRegExpFlags = __getRegExpFlags;
  return clone2;
}();
class Request {
  /**
  * @param {Object} arg - 全局配置
  * @param {String} arg.baseURL - 全局根路径
  * @param {Object} arg.header - 全局header
  * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
  * @param {String} arg.dataType = [json] - 全局默认的dataType
  * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
  * @param {Object} arg.custom - 全局默认的自定义参数
  * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
  * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
  * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
  * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
  * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
  */
  constructor(arg = {}) {
    if (!isPlainObject$1(arg)) {
      arg = {};
      console.warn("设置全局参数必须接收一个Object");
    }
    this.config = clone({ ...defaults, ...arg });
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
  * @Function
  * @param {Request~setConfigCallback} f - 设置全局默认配置
  */
  setConfig(f2) {
    this.config = f2(this.config);
  }
  middleware(config2) {
    config2 = mergeConfig(this.config, config2);
    const chain = [dispatchRequest, void 0];
    let promise2 = Promise.resolve(config2);
    this.interceptors.request.forEach((interceptor2) => {
      chain.unshift(interceptor2.fulfilled, interceptor2.rejected);
    });
    this.interceptors.response.forEach((interceptor2) => {
      chain.push(interceptor2.fulfilled, interceptor2.rejected);
    });
    while (chain.length) {
      promise2 = promise2.then(chain.shift(), chain.shift());
    }
    return promise2;
  }
  /**
  * @Function
  * @param {Object} config - 请求配置项
  * @prop {String} options.url - 请求路径
  * @prop {Object} options.data - 请求参数
  * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
  * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
  * @prop {Object} [options.header = config.header] - 请求header
  * @prop {Object} [options.method = config.method] - 请求方法
  * @returns {Promise<unknown>}
  */
  request(config2 = {}) {
    return this.middleware(config2);
  }
  get(url3, options = {}) {
    return this.middleware({
      url: url3,
      method: "GET",
      ...options
    });
  }
  post(url3, data, options = {}) {
    return this.middleware({
      url: url3,
      data,
      method: "POST",
      ...options
    });
  }
  put(url3, data, options = {}) {
    return this.middleware({
      url: url3,
      data,
      method: "PUT",
      ...options
    });
  }
  delete(url3, data, options = {}) {
    return this.middleware({
      url: url3,
      data,
      method: "DELETE",
      ...options
    });
  }
  connect(url3, data, options = {}) {
    return this.middleware({
      url: url3,
      data,
      method: "CONNECT",
      ...options
    });
  }
  head(url3, data, options = {}) {
    return this.middleware({
      url: url3,
      data,
      method: "HEAD",
      ...options
    });
  }
  options(url3, data, options = {}) {
    return this.middleware({
      url: url3,
      data,
      method: "OPTIONS",
      ...options
    });
  }
  trace(url3, data, options = {}) {
    return this.middleware({
      url: url3,
      data,
      method: "TRACE",
      ...options
    });
  }
  upload(url3, config2 = {}) {
    config2.url = url3;
    config2.method = "UPLOAD";
    return this.middleware(config2);
  }
  download(url3, config2 = {}) {
    config2.url = url3;
    config2.method = "DOWNLOAD";
    return this.middleware(config2);
  }
}
const http = new Request();
const componentKeys = [
  "actionSheet",
  "album",
  "alert",
  "avatar",
  "avatarGroup",
  "backtop",
  "badge",
  "box",
  "button",
  "calendar",
  "calendarStrip",
  "carKeyboard",
  "card",
  "cell",
  "cellGroup",
  "checkbox",
  "checkboxGroup",
  "circleProgress",
  "code",
  "codeInput",
  "col",
  "collapse",
  "collapseItem",
  "columnNotice",
  "countDown",
  "countTo",
  "datetimePicker",
  "divider",
  "dropdown",
  "dropdownItem",
  "empty",
  "form",
  "formItem",
  "gap",
  "grid",
  "gridItem",
  "guide",
  "icon",
  "image",
  "indexAnchor",
  "indexItem",
  "indexList",
  "input",
  "keyboard",
  "line",
  "lineProgress",
  "link",
  "list",
  "listItem",
  "loadingIcon",
  "loadingPage",
  "loadmore",
  "modal",
  "navbar",
  "navbarMini",
  "noNetwork",
  "noticeBar",
  "notify",
  "numberBox",
  "numberKeyboard",
  "overlay",
  "parse",
  "pdfReader",
  "picker",
  "pickerColumn",
  "popover",
  "popup",
  "radio",
  "radioGroup",
  "rate",
  "readMore",
  "row",
  "rowNotice",
  "safeBottom",
  "scrollList",
  "search",
  "section",
  "skeleton",
  "slider",
  "statusBar",
  "steps",
  "stepsItem",
  "sticky",
  "subsection",
  "swipeAction",
  "swipeActionItem",
  "swiper",
  "swiperIndicator",
  "switch",
  "tabbar",
  "tabbarItem",
  "table",
  "tabs",
  "tabsItem",
  "tag",
  "td",
  "text",
  "textarea",
  "th",
  "toast",
  "toolbar",
  "tooltip",
  "tr",
  "transition",
  "upload"
];
const props$8 = {};
function ensureComponentProps(key) {
  if (!props$8[key] || typeof props$8[key] !== "object") {
    props$8[key] = {};
  }
  return props$8[key];
}
function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function cloneDefaultValue(value) {
  if (Array.isArray(value)) {
    return value.slice();
  }
  if (isPlainObject(value)) {
    return mergeDefaults({}, value);
  }
  return value;
}
function mergeDefaults(target, defaults2 = {}) {
  if (!target || typeof target !== "object" || !defaults2 || typeof defaults2 !== "object") {
    return target;
  }
  Object.keys(defaults2).forEach((key) => {
    const defaultValue = defaults2[key];
    const targetValue = target[key];
    if (targetValue === void 0) {
      target[key] = cloneDefaultValue(defaultValue);
    } else if (isPlainObject(targetValue) && isPlainObject(defaultValue)) {
      mergeDefaults(targetValue, defaultValue);
    }
  });
  return target;
}
componentKeys.forEach(ensureComponentProps);
function registerComponentProps(defaultProps = {}) {
  Object.keys(defaultProps || {}).forEach((key) => {
    const componentProps = ensureComponentProps(key);
    mergeDefaults(componentProps, defaultProps[key]);
  });
  return props$8;
}
function setPropsConfig(configProps = {}) {
  Object.keys(configProps || {}).forEach((key) => {
    shallowMerge(ensureComponentProps(key), configProps[key]);
  });
  return props$8;
}
function setConfig$1(configs = {}) {
  shallowMerge(config$2, configs.config || {});
  setPropsConfig(configs.props || {});
  shallowMerge(color$2, configs.color || {});
  shallowMerge(zIndex, configs.zIndex || {});
}
if (typeof index$1 !== "undefined" && index$1 && index$1.upuiParams) {
  console.log("setting uview-plus");
  let temp = index$1.upuiParams();
  if (temp.httpIns) {
    temp.httpIns(http);
  }
  if (temp.options) {
    setConfig$1(temp.options);
  }
}
let platform = "none";
platform = "vue3";
platform = "mp";
platform = "weixin";
const platform$1 = platform;
const iconFontFamily = "uicon-iconfont";
let params = {
  loaded: false
};
const getIconUrl = () => {
  return config$2.iconUrl;
};
const markFontLoaded = () => {
  if (config$2.loadFontOnce) {
    params.loaded = true;
  }
};
const loadFont = () => {
  const iconUrl = getIconUrl();
  markFontLoaded();
  index$1.loadFontFace({
    global: true,
    // 是否全局生效。微信小程序 '2.10.0'起支持全局生效，需在 app.vue 中调用。
    family: iconFontFamily,
    source: 'url("' + iconUrl + '")',
    success() {
    },
    fail() {
    }
  });
  if (config$2.customIcon.family) {
    index$1.loadFontFace({
      global: true,
      // 是否全局生效。微信小程序 '2.10.0'起支持全局生效，需在 app.vue 中调用。
      family: config$2.customIcon.family,
      source: 'url("' + config$2.customIcon.url + '")',
      success() {
      },
      fail() {
      }
    });
  }
  return true;
};
const fontUtil = {
  params,
  loadFont
};
const zhHans = {
  "up.common.cancel": "取消",
  "up.common.confirm": "确定",
  "up.common.start": "开始",
  "up.common.end": "结束",
  "up.common.stop": "停止",
  "up.common.copy": "复制",
  "up.common.none": "暂无",
  "up.common.tip": "提示",
  "up.common.success": "成功",
  "up.common.fail": "失败",
  "up.common.close": "关闭",
  "up.common.preview": "预览",
  "up.common.re-select": "重选",
  "up.common.rotate": "旋转",
  "up.common.pleaseChoose": "请选择",
  "up.common.loading": "加载中",
  "up.common.loading2": "正在加载",
  "up.common.inOperation": "操作中",
  "up.common.settings": "设置",
  "up.common.retry": "重试",
  "up.common.search": "搜索",
  "up.common.more": "更多",
  "up.common.video": "视频",
  "up.common.file": "文件",
  "up.week.one": "一",
  "up.week.two": "二",
  "up.week.three": "三",
  "up.week.four": "四",
  "up.week.five": "五",
  "up.week.six": "六",
  "up.week.seven": "日",
  "up.barcode.error": "生成条码失败",
  "up.calendar.chooseDates": "日期选择",
  "up.calendar.disabled": "该日期已禁用",
  "up.calendar.daysExceed": "选择天数不能超过{days}天",
  "up.calendar.today": "今天",
  "up.cityLocate.locateCity": "定位城市",
  "up.cityLocate.fail": "定位失败，请点击重试。",
  "up.cityLocate.locating": "定位中",
  "up.code.send": "获取验证码",
  "up.code.resendAfter": "X秒重新获取",
  "up.code.resend": "重新获取",
  "up.cropper.emptyWidhtOrHeight": "裁剪框的宽或高没有设置",
  "up.empty.car": "购物车为空",
  "up.empty.page": "页面不存在",
  "up.empty.search": "没有搜索结果",
  "up.empty.address": "没有收货地址",
  "up.empty.wifi": "没有WiFi",
  "up.empty.order": "订单为空",
  "up.empty.coupon": "没有优惠券",
  "up.empty.favor": "暂无收藏",
  "up.empty.permission": "无权限",
  "up.empty.history": "无历史记录",
  "up.empty.news": "无新闻列表",
  "up.empty.message": "消息列表为空",
  "up.empty.list": "列表为空",
  "up.empty.data": "数据为空",
  "up.empty.comment": "暂无评论",
  "up.link.copyed": "链接已复制，请在浏览器打开",
  "up.loadmoe.loadmore": "加载更多",
  "up.loadmoe.nomore": "没有更多了",
  "up.noNetwork.text": "哎呀，网络信号丢失",
  "up.noNetwork.pleaseCheck": "请检查网络，或前往",
  "up.noNetwork.connect": "网络已连接",
  "up.noNetwork.disconnect": "无网络连接",
  "up.pagination.previous": "上一页",
  "up.pagination.next": "下一页",
  "up.pullRefresh.pull": "下拉刷新",
  "up.pullRefresh.release": "释放刷新",
  "up.pullRefresh.refreshing": "正在刷新",
  "up.readMore.expand": "展开阅读全文",
  "up.readMore.fold": "收起",
  "up.search.placeholder": "请输入关键字",
  "up.signature.penSize": "笔画大小",
  "up.signature.penColor": "笔画颜色",
  "up.upload.sizeExceed": "超过大小限制",
  "up.upload.uploading": "上传中",
  "up.upload.previewImageFail": "预览图片失败",
  "up.upload.previewVideoFail": "预览视频失败",
  "up.goodsSku.stock": "库存",
  "up.goodsSku.price": "价格",
  "up.goodsSku.amount": "件",
  "up.goodsSku.choosed": "已选",
  "up.goodsSku.buyAmount": "购买数量"
};
const settings = {
  lang: typeof index$1 !== "undefined" && typeof index$1.getLocale === "function" ? index$1.getLocale() : "zh-Hans",
  locales: {
    "zh-Hans": zhHans
  }
};
if (typeof index$1 !== "undefined" && typeof index$1.onLocaleChange === "function") {
  index$1.onLocaleChange((locale) => {
    settings.lang = typeof locale === "string" ? locale : locale && locale.locale || settings.lang;
  });
}
function t(value, params2 = {}) {
  if (value) {
    let lang = settings.lang;
    if (!settings.locales[settings.lang]) {
      lang = "zh-Hans";
    }
    let result = settings.locales[lang][value] || value;
    if (params2 && typeof params2 === "object") {
      Object.keys(params2).forEach((key) => {
        const reg = new RegExp(`{${key}}`, "g");
        result = String(result).replace(reg, params2[key]);
      });
    }
    return result;
  }
  return value;
}
const DEFAULT_LIGHT_THEME_COLORS = Object.freeze({
  primary: "#3c9cff",
  info: "#909399",
  warning: "#f9ae3d",
  error: "#f56c6c",
  success: "#5ac725",
  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909193",
  lightColor: "#c0c4cc",
  borderColor: "#dadbde",
  bgColor: "#f3f4f6",
  disabledColor: "#c8c9cc",
  primaryDark: "#398ade",
  primaryDisabled: "#9acafc",
  primaryLight: "#ecf5ff",
  warningDark: "#f1a532",
  warningDisabled: "#f9d39b",
  warningLight: "#fdf6ec",
  successDark: "#53c21d",
  successDisabled: "#a9e08f",
  successLight: "#f5fff0",
  errorDark: "#e45656",
  errorDisabled: "#f7b2b2",
  errorLight: "#fef0f0",
  infoDark: "#767a82",
  infoDisabled: "#c4c6c9",
  infoLight: "#f4f4f5"
});
const DEFAULT_DARK_THEME_COLORS = Object.freeze({
  primary: "#3c9cff",
  info: "#909399",
  warning: "#f9ae3d",
  error: "#f56c6c",
  success: "#5ac725",
  mainColor: "#f5f5f5",
  contentColor: "#d1d5db",
  tipsColor: "#9ca3af",
  lightColor: "#6b7280",
  borderColor: "#3a3a3c",
  bgColor: "#1f1f1f",
  disabledColor: "#4b5563",
  primaryDark: "#5aa8ff",
  primaryDisabled: "#4c6f92",
  primaryLight: "#10243a",
  warningDark: "#ffbf66",
  warningDisabled: "#8a6a3a",
  warningLight: "#3d2f1b",
  successDark: "#7ad94b",
  successDisabled: "#5f7f4f",
  successLight: "#1f3316",
  errorDark: "#ff8a8a",
  errorDisabled: "#8d5858",
  errorLight: "#3a2222",
  infoDark: "#b0b3b8",
  infoDisabled: "#5f6368",
  infoLight: "#2f3238"
});
const DEFAULT_THEME_EXTRA_VARS = Object.freeze({
  light: Object.freeze({
    "--up-table2-header-bg-color": "#f5f7fa",
    "--up-table2-zebra-bg-color": "#fafafa",
    "--up-table2-highlight-bg-color": "#f5f7fa",
    "--up-gap-bg-color": "#f3f4f6",
    "--up-skeleton-bg-color": "#f1f2f4",
    "--up-skeleton-shimmer-color": "#e6e6e6",
    "--up-swipe-action-button-bg-color": "#c7c6cd",
    "--up-index-list-indicator-bg-color": "#c9c9c9",
    "--up-calendar-month-mark-color": "rgba(231, 232, 234, 0.83)"
  }),
  dark: Object.freeze({
    "--up-table2-header-bg-color": "#2a2d33",
    "--up-table2-zebra-bg-color": "#23262b",
    "--up-table2-highlight-bg-color": "#2f3440",
    "--up-gap-bg-color": "#111111",
    "--up-skeleton-bg-color": "#2f3135",
    "--up-skeleton-shimmer-color": "rgba(255, 255, 255, 0.12)",
    "--up-swipe-action-button-bg-color": "#4b5563",
    "--up-index-list-indicator-bg-color": "#4b5563",
    "--up-calendar-month-mark-color": "rgba(255, 255, 255, 0.04)"
  })
});
const themeState = {
  preference: "system",
  mode: "light",
  version: 0,
  vars: {}
};
const THEME_MODE_STORAGE_KEY = "u-theme-mode";
const THEME_MODE_SYSTEM = "system";
const THEME_MODE_MANUAL = ["light", "dark"];
const LIGHT_THEME_TOKEN_FIELD_MAP = Object.freeze({
  "primary": "primary",
  "primary-dark": "primaryDark",
  "primary-disabled": "primaryDisabled",
  "primary-light": "primaryLight",
  "warning": "warning",
  "warning-dark": "warningDark",
  "warning-disabled": "warningDisabled",
  "warning-light": "warningLight",
  "success": "success",
  "success-dark": "successDark",
  "success-disabled": "successDisabled",
  "success-light": "successLight",
  "error": "error",
  "error-dark": "errorDark",
  "error-disabled": "errorDisabled",
  "error-light": "errorLight",
  "info": "info",
  "info-dark": "infoDark",
  "info-disabled": "infoDisabled",
  "info-light": "infoLight",
  "main-color": "mainColor",
  "content-color": "contentColor",
  "tips-color": "tipsColor",
  "light-color": "lightColor",
  "border-color": "borderColor",
  "bg-color": "bgColor",
  "disabled-color": "disabledColor"
});
const LIGHT_THEME_FIELD_TOKEN_MAP = Object.freeze(
  Object.fromEntries(
    Object.entries(LIGHT_THEME_TOKEN_FIELD_MAP).map(([token, field]) => [field, token])
  )
);
const runtimeThemeOverrideState = {
  color: /* @__PURE__ */ Object.create(null),
  configColor: /* @__PURE__ */ Object.create(null)
};
let cachedLightThemeColors = null;
let hasRegisterThemeListener = false;
let currentThemePreference = THEME_MODE_SYSTEM;
function normalizeThemeMode(theme = "light") {
  return theme === "dark" ? "dark" : "light";
}
function normalizeThemePreference(mode = THEME_MODE_SYSTEM) {
  if (THEME_MODE_MANUAL.includes(mode))
    return mode;
  return THEME_MODE_SYSTEM;
}
function getLightBridgeVar(token, fallback) {
  return `var(--up-light-${token}, ${fallback})`;
}
function clearOverrideBucket(bucket) {
  Object.keys(bucket).forEach((key) => {
    delete bucket[key];
  });
}
function normalizeLightThemeToken(token = "") {
  if (typeof token !== "string")
    return "";
  if (token.indexOf("up-") === 0)
    return token.slice(3);
  if (token.indexOf("u-") === 0)
    return token.slice(2);
  return token;
}
function isLightThemeConfigColorKey(token = "") {
  return token.indexOf("up-") === 0 || token.indexOf("u-") === 0;
}
function syncThemeColorOverrideState({
  color: colorOverrides,
  configColor: configColorOverrides,
  reset = false
} = {}) {
  if (reset) {
    clearOverrideBucket(runtimeThemeOverrideState.color);
    clearOverrideBucket(runtimeThemeOverrideState.configColor);
  }
  if (colorOverrides && typeof colorOverrides === "object") {
    Object.keys(LIGHT_THEME_FIELD_TOKEN_MAP).forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(colorOverrides, field))
        return;
      const value = colorOverrides[field];
      if (typeof value === "string" && value) {
        runtimeThemeOverrideState.color[field] = true;
        return;
      }
      delete runtimeThemeOverrideState.color[field];
    });
  }
  if (configColorOverrides && typeof configColorOverrides === "object") {
    Object.keys(configColorOverrides).forEach((key) => {
      const token = normalizeLightThemeToken(key);
      if (!Object.prototype.hasOwnProperty.call(LIGHT_THEME_TOKEN_FIELD_MAP, token))
        return;
      const value = configColorOverrides[key];
      if (typeof value === "string" && value) {
        const overrideKey = isLightThemeConfigColorKey(key) ? key : `up-${token}`;
        runtimeThemeOverrideState.configColor[overrideKey] = true;
        return;
      }
      delete runtimeThemeOverrideState.configColor[key];
      delete runtimeThemeOverrideState.configColor[`u-${token}`];
      delete runtimeThemeOverrideState.configColor[`up-${token}`];
    });
  }
}
function getExplicitRuntimeColorValue(token, runtimeColorMap = {}) {
  const field = LIGHT_THEME_TOKEN_FIELD_MAP[token];
  if (!field)
    return "";
  if (runtimeThemeOverrideState.color[field]) {
    const value = color$2[field];
    if (typeof value === "string" && value)
      return value;
  }
  const upKey = `up-${token}`;
  const uKey = `u-${token}`;
  if (!runtimeThemeOverrideState.configColor[upKey] && !runtimeThemeOverrideState.configColor[uKey])
    return "";
  const upValue = runtimeColorMap[upKey];
  const uValue = runtimeColorMap[uKey];
  if (runtimeThemeOverrideState.configColor[upKey] && typeof upValue === "string" && upValue)
    return upValue;
  if (runtimeThemeOverrideState.configColor[uKey] && typeof uValue === "string" && uValue)
    return uValue;
  return "";
}
function readThemePreferenceFromStorage() {
  try {
    if (typeof index$1 !== "undefined" && typeof index$1.getStorageSync === "function") {
      const mode = index$1.getStorageSync(THEME_MODE_STORAGE_KEY);
      return normalizeThemePreference(mode);
    }
  } catch (e2) {
  }
  return THEME_MODE_SYSTEM;
}
function writeThemePreferenceToStorage(mode) {
  try {
    if (typeof index$1 !== "undefined" && typeof index$1.setStorageSync === "function") {
      index$1.setStorageSync(THEME_MODE_STORAGE_KEY, mode);
    }
  } catch (e2) {
  }
}
function getSystemTheme() {
  let theme = "light";
  try {
    if (typeof index$1 !== "undefined" && typeof index$1.getAppBaseInfo === "function") {
      const appBaseInfo = index$1.getAppBaseInfo() || {};
      if (appBaseInfo.theme) {
        theme = appBaseInfo.theme;
      }
    }
    if (typeof index$1 !== "undefined" && typeof index$1.getSystemInfoSync === "function") {
      const systemInfo = index$1.getSystemInfoSync() || {};
      if (systemInfo.theme) {
        theme = systemInfo.theme;
      }
    }
  } catch (e2) {
    theme = "light";
  }
  return normalizeThemeMode(theme);
}
function getCurrentLightThemeColors() {
  const runtimeColorMap = config$2.color || {};
  const lightThemeColors = {
    ...DEFAULT_LIGHT_THEME_COLORS
  };
  Object.keys(LIGHT_THEME_TOKEN_FIELD_MAP).forEach((token) => {
    const explicitValue = getExplicitRuntimeColorValue(token, runtimeColorMap);
    if (!explicitValue)
      return;
    lightThemeColors[LIGHT_THEME_TOKEN_FIELD_MAP[token]] = explicitValue;
  });
  return lightThemeColors;
}
function getThemeColorsByMode(mode) {
  if (!cachedLightThemeColors) {
    cachedLightThemeColors = getCurrentLightThemeColors();
  }
  const themeMode = normalizeThemeMode(mode);
  if (themeMode === "dark") {
    return {
      ...DEFAULT_DARK_THEME_COLORS,
      primary: cachedLightThemeColors.primary,
      info: cachedLightThemeColors.info,
      warning: cachedLightThemeColors.warning,
      error: cachedLightThemeColors.error,
      success: cachedLightThemeColors.success
    };
  }
  return {
    ...cachedLightThemeColors
  };
}
function buildConfigColorMap(themeColors) {
  return {
    "u-primary": themeColors.primary,
    "u-primary-dark": themeColors.primaryDark,
    "u-primary-disabled": themeColors.primaryDisabled,
    "u-primary-light": themeColors.primaryLight,
    "u-warning": themeColors.warning,
    "u-warning-dark": themeColors.warningDark,
    "u-warning-disabled": themeColors.warningDisabled,
    "u-warning-light": themeColors.warningLight,
    "u-success": themeColors.success,
    "u-success-dark": themeColors.successDark,
    "u-success-disabled": themeColors.successDisabled,
    "u-success-light": themeColors.successLight,
    "u-error": themeColors.error,
    "u-error-dark": themeColors.errorDark,
    "u-error-disabled": themeColors.errorDisabled,
    "u-error-light": themeColors.errorLight,
    "u-info": themeColors.info,
    "u-info-dark": themeColors.infoDark,
    "u-info-disabled": themeColors.infoDisabled,
    "u-info-light": themeColors.infoLight,
    "u-main-color": themeColors.mainColor,
    "u-content-color": themeColors.contentColor,
    "u-tips-color": themeColors.tipsColor,
    "u-light-color": themeColors.lightColor,
    "u-border-color": themeColors.borderColor,
    "u-bg-color": themeColors.bgColor,
    "u-disabled-color": themeColors.disabledColor,
    "up-primary": themeColors.primary,
    "up-primary-dark": themeColors.primaryDark,
    "up-primary-disabled": themeColors.primaryDisabled,
    "up-primary-light": themeColors.primaryLight,
    "up-warning": themeColors.warning,
    "up-warning-dark": themeColors.warningDark,
    "up-warning-disabled": themeColors.warningDisabled,
    "up-warning-light": themeColors.warningLight,
    "up-success": themeColors.success,
    "up-success-dark": themeColors.successDark,
    "up-success-disabled": themeColors.successDisabled,
    "up-success-light": themeColors.successLight,
    "up-error": themeColors.error,
    "up-error-dark": themeColors.errorDark,
    "up-error-disabled": themeColors.errorDisabled,
    "up-error-light": themeColors.errorLight,
    "up-info": themeColors.info,
    "up-info-dark": themeColors.infoDark,
    "up-info-disabled": themeColors.infoDisabled,
    "up-info-light": themeColors.infoLight,
    "up-main-color": themeColors.mainColor,
    "up-content-color": themeColors.contentColor,
    "up-tips-color": themeColors.tipsColor,
    "up-light-color": themeColors.lightColor,
    "up-border-color": themeColors.borderColor,
    "up-bg-color": themeColors.bgColor,
    "up-disabled-color": themeColors.disabledColor
  };
}
function buildAliasCssVars(vars = {}) {
  const aliasVars = {};
  Object.keys(vars).forEach((key) => {
    if (typeof key !== "string")
      return;
    if (key.indexOf("--up-") === 0) {
      aliasVars[key.replace("--up-", "--u-")] = vars[key];
      return;
    }
    if (key.indexOf("--u-") === 0) {
      aliasVars[key.replace("--u-", "--up-")] = vars[key];
    }
  });
  return aliasVars;
}
function buildThemeCssVars(themeColors, mode = "light") {
  const themeMode = normalizeThemeMode(mode);
  const isDark = themeMode === "dark";
  const useBridge = !isDark;
  const runtimeColorMap = config$2.color || {};
  const defaultExtraVars = DEFAULT_THEME_EXTRA_VARS[themeMode] || DEFAULT_THEME_EXTRA_VARS.light;
  const pageBgColor = themeColors.bgColor || (isDark ? "#1f1f1f" : "#f3f4f6");
  const hoverBgColor = runtimeColorMap["up-hover-bg-color"] || runtimeColorMap["u-hover-bg-color"] || (isDark ? "#343741" : "#e7ebf0");
  const navbarBgColor = runtimeColorMap["up-navbar-bg-color"] || runtimeColorMap["u-navbar-bg-color"] || (isDark ? "#1c1c1e" : "#ffffff");
  const resolveLightTokenValue = (token, fallback) => {
    if (!useBridge)
      return fallback;
    const explicitValue = getExplicitRuntimeColorValue(token, runtimeColorMap);
    return explicitValue || getLightBridgeVar(token, fallback);
  };
  const resolvedMainColor = resolveLightTokenValue("main-color", themeColors.mainColor);
  const resolvedContentColor = resolveLightTokenValue("content-color", themeColors.contentColor);
  const resolvedTipsColor = resolveLightTokenValue("tips-color", themeColors.tipsColor);
  const resolvedLightColor = resolveLightTokenValue("light-color", themeColors.lightColor);
  const resolvedBorderColor = resolveLightTokenValue("border-color", themeColors.borderColor);
  const resolvedBgColor = resolveLightTokenValue("bg-color", themeColors.bgColor);
  const resolvedDisabledColor = resolveLightTokenValue("disabled-color", themeColors.disabledColor);
  const resolvedPrimary = resolveLightTokenValue("primary", themeColors.primary);
  const resolvedPrimaryDark = resolveLightTokenValue("primary-dark", themeColors.primaryDark);
  const resolvedPrimaryDisabled = resolveLightTokenValue("primary-disabled", themeColors.primaryDisabled);
  const resolvedPrimaryLight = resolveLightTokenValue("primary-light", themeColors.primaryLight);
  const resolvedWarning = resolveLightTokenValue("warning", themeColors.warning);
  const resolvedWarningDark = resolveLightTokenValue("warning-dark", themeColors.warningDark);
  const resolvedWarningDisabled = resolveLightTokenValue("warning-disabled", themeColors.warningDisabled);
  const resolvedWarningLight = resolveLightTokenValue("warning-light", themeColors.warningLight);
  const resolvedSuccess = resolveLightTokenValue("success", themeColors.success);
  const resolvedSuccessDark = resolveLightTokenValue("success-dark", themeColors.successDark);
  const resolvedSuccessDisabled = resolveLightTokenValue("success-disabled", themeColors.successDisabled);
  const resolvedSuccessLight = resolveLightTokenValue("success-light", themeColors.successLight);
  const resolvedError = resolveLightTokenValue("error", themeColors.error);
  const resolvedErrorDark = resolveLightTokenValue("error-dark", themeColors.errorDark);
  const resolvedErrorDisabled = resolveLightTokenValue("error-disabled", themeColors.errorDisabled);
  const resolvedErrorLight = resolveLightTokenValue("error-light", themeColors.errorLight);
  const resolvedInfo = resolveLightTokenValue("info", themeColors.info);
  const resolvedInfoDark = resolveLightTokenValue("info-dark", themeColors.infoDark);
  const resolvedInfoDisabled = resolveLightTokenValue("info-disabled", themeColors.infoDisabled);
  const resolvedInfoLight = resolveLightTokenValue("info-light", themeColors.infoLight);
  const coreVars = {
    "--u-main-color": resolvedMainColor,
    "--u-content-color": resolvedContentColor,
    "--u-tips-color": resolvedTipsColor,
    "--u-light-color": resolvedLightColor,
    "--u-border-color": resolvedBorderColor,
    "--u-bg-color": resolvedBgColor,
    "--u-hover-bg-color": hoverBgColor,
    "--u-disabled-color": resolvedDisabledColor,
    "--u-primary": resolvedPrimary,
    "--u-primary-dark": resolvedPrimaryDark,
    "--u-primary-disabled": resolvedPrimaryDisabled,
    "--u-primary-light": resolvedPrimaryLight,
    "--u-warning": resolvedWarning,
    "--u-warning-dark": resolvedWarningDark,
    "--u-warning-disabled": resolvedWarningDisabled,
    "--u-warning-light": resolvedWarningLight,
    "--u-success": resolvedSuccess,
    "--u-success-dark": resolvedSuccessDark,
    "--u-success-disabled": resolvedSuccessDisabled,
    "--u-success-light": resolvedSuccessLight,
    "--u-error": resolvedError,
    "--u-error-dark": resolvedErrorDark,
    "--u-error-disabled": resolvedErrorDisabled,
    "--u-error-light": resolvedErrorLight,
    "--u-info": resolvedInfo,
    "--u-info-dark": resolvedInfoDark,
    "--u-info-disabled": resolvedInfoDisabled,
    "--u-info-light": resolvedInfoLight,
    "--up-main-color": resolvedMainColor,
    "--up-content-color": resolvedContentColor,
    "--up-tips-color": resolvedTipsColor,
    "--up-light-color": resolvedLightColor,
    "--up-border-color": resolvedBorderColor,
    "--up-bg-color": resolvedBgColor,
    "--up-hover-bg-color": hoverBgColor,
    "--up-disabled-color": resolvedDisabledColor,
    "--up-primary": resolvedPrimary,
    "--up-primary-dark": resolvedPrimaryDark,
    "--up-primary-disabled": resolvedPrimaryDisabled,
    "--up-primary-light": resolvedPrimaryLight,
    "--up-warning": resolvedWarning,
    "--up-warning-dark": resolvedWarningDark,
    "--up-warning-disabled": resolvedWarningDisabled,
    "--up-warning-light": resolvedWarningLight,
    "--up-success": resolvedSuccess,
    "--up-success-dark": resolvedSuccessDark,
    "--up-success-disabled": resolvedSuccessDisabled,
    "--up-success-light": resolvedSuccessLight,
    "--up-error": resolvedError,
    "--up-error-dark": resolvedErrorDark,
    "--up-error-disabled": resolvedErrorDisabled,
    "--up-error-light": resolvedErrorLight,
    "--up-info": resolvedInfo,
    "--up-info-dark": resolvedInfoDark,
    "--up-info-disabled": resolvedInfoDisabled,
    "--up-info-light": resolvedInfoLight,
    "--up-page-bg-color": pageBgColor,
    "--up-card-bg-color": isDark ? "#1c1c1e" : "#ffffff",
    "--up-navbar-bg-color": navbarBgColor
  };
  const extraVars = {};
  Object.keys(runtimeColorMap).forEach((key) => {
    if (typeof key !== "string")
      return;
    const isThemeToken = key.indexOf("up-") === 0 || key.indexOf("u-") === 0;
    if (!isThemeToken)
      return;
    const cssVarName = `--${key}`;
    if (Object.prototype.hasOwnProperty.call(coreVars, cssVarName))
      return;
    const value = runtimeColorMap[key];
    if (typeof value === "string" && value) {
      extraVars[cssVarName] = value;
    }
  });
  return {
    ...coreVars,
    ...defaultExtraVars,
    ...buildAliasCssVars(defaultExtraVars),
    ...extraVars,
    ...buildAliasCssVars(extraVars)
  };
}
function getThemeVars(mode) {
  if (mode) {
    return buildThemeCssVars(getThemeColorsByMode(mode), mode);
  }
  if (themeState.vars && Object.keys(themeState.vars).length > 0) {
    return { ...themeState.vars };
  }
  return buildThemeCssVars(getThemeColorsByMode(themeState.mode), themeState.mode);
}
function hasActiveRuntimePage() {
  try {
    if (typeof getCurrentPages === "function") {
      const pages2 = getCurrentPages();
      return Array.isArray(pages2) && pages2.length > 0;
    }
  } catch (e2) {
  }
  return false;
}
function trySetNavigationBarColor(options) {
  if (typeof index$1 === "undefined" || typeof index$1.setNavigationBarColor !== "function")
    return;
  if (!hasActiveRuntimePage())
    return;
  try {
    const result = index$1.setNavigationBarColor(options);
    if (result && typeof result.catch === "function") {
      result.catch(() => {
      });
    }
  } catch (e2) {
  }
}
function applyNativeThemeUI(mode, themeColors, themeVars = {}) {
  var _a, _b;
  if (typeof index$1 === "undefined")
    return;
  if (config$2.nativeThemeSync !== true)
    return;
  const isDark = normalizeThemeMode(mode) === "dark";
  const pageBg = (themeColors == null ? void 0 : themeColors.bgColor) || (isDark ? "#1f1f1f" : "#f3f4f6");
  const navBg = (themeVars == null ? void 0 : themeVars["--up-navbar-bg-color"]) || (themeVars == null ? void 0 : themeVars["--u-navbar-bg-color"]) || ((_a = config$2.color) == null ? void 0 : _a["up-navbar-bg-color"]) || ((_b = config$2.color) == null ? void 0 : _b["u-navbar-bg-color"]) || (isDark ? "#1c1c1e" : "#ffffff");
  trySetNavigationBarColor({
    frontColor: isDark ? "#ffffff" : "#000000",
    backgroundColor: navBg,
    animation: {
      duration: 0,
      timingFunc: "linear"
    }
  });
  if (typeof index$1.setBackgroundColor === "function") {
    index$1.setBackgroundColor({
      backgroundColor: pageBg,
      backgroundColorTop: pageBg,
      backgroundColorBottom: pageBg
    });
  }
  trySetTabBarStyle({
    color: isDark ? "#8e8e93" : "#909399",
    selectedColor: isDark ? "#f2f2f7" : "#303133",
    backgroundColor: isDark ? "#111111" : "#ffffff",
    borderStyle: isDark ? "white" : "black"
  });
}
function applyTheme(mode = "light") {
  const themeMode = normalizeThemeMode(mode);
  const themeColors = getThemeColorsByMode(themeMode);
  const themeVars = buildThemeCssVars(themeColors, themeMode);
  index.shallowMerge(color$2, {
    primary: themeColors.primary,
    primaryDark: themeColors.primaryDark,
    primaryDisabled: themeColors.primaryDisabled,
    primaryLight: themeColors.primaryLight,
    info: themeColors.info,
    infoDark: themeColors.infoDark,
    infoDisabled: themeColors.infoDisabled,
    infoLight: themeColors.infoLight,
    default: themeColors.info,
    warning: themeColors.warning,
    warningDark: themeColors.warningDark,
    warningDisabled: themeColors.warningDisabled,
    warningLight: themeColors.warningLight,
    error: themeColors.error,
    errorDark: themeColors.errorDark,
    errorDisabled: themeColors.errorDisabled,
    errorLight: themeColors.errorLight,
    success: themeColors.success,
    successDark: themeColors.successDark,
    successDisabled: themeColors.successDisabled,
    successLight: themeColors.successLight,
    mainColor: themeColors.mainColor,
    contentColor: themeColors.contentColor,
    tipsColor: themeColors.tipsColor,
    lightColor: themeColors.lightColor,
    borderColor: themeColors.borderColor,
    bgColor: themeColors.bgColor,
    disabledColor: themeColors.disabledColor
  });
  index.shallowMerge(config$2.color, buildConfigColorMap(themeColors));
  config$2.themeMode = themeMode;
  themeState.preference = currentThemePreference;
  themeState.mode = themeMode;
  themeState.vars = { ...themeVars };
  themeState.version = Number(themeState.version || 0) + 1;
  applyNativeThemeUI(themeMode, themeColors, themeVars);
  if (typeof index$1 !== "undefined" && index$1.$u && index$1.$u.theme) {
    index$1.$u.theme.mode = themeState.mode;
    if (Object.prototype.hasOwnProperty.call(index$1.$u.theme, "colors")) {
      delete index$1.$u.theme.colors;
    }
    index$1.$u.theme.vars = { ...themeState.vars };
    index$1.$u.theme.version = themeState.version;
  }
  if (typeof index$1 !== "undefined" && typeof index$1.$emit === "function") {
    index$1.$emit("uThemeChange", {
      mode: themeState.mode,
      colors: { ...themeColors },
      version: themeState.version,
      vars: { ...themeState.vars }
    });
  }
  return themeState;
}
function setTheme(mode = "light") {
  currentThemePreference = normalizeThemeMode(mode);
  writeThemePreferenceToStorage(currentThemePreference);
  return applyTheme(currentThemePreference);
}
function setThemePreference(mode = THEME_MODE_SYSTEM) {
  currentThemePreference = normalizeThemePreference(mode);
  writeThemePreferenceToStorage(currentThemePreference);
  if (currentThemePreference === THEME_MODE_SYSTEM) {
    return applyTheme(getSystemTheme());
  }
  return applyTheme(currentThemePreference);
}
function getThemePreference() {
  return currentThemePreference;
}
function refreshThemeFromConfig() {
  cachedLightThemeColors = getCurrentLightThemeColors();
  if (themeState.version > 0) {
    applyTheme(themeState.mode);
  }
}
function initThemeSystem() {
  if (typeof index$1 === "undefined")
    return;
  if (!cachedLightThemeColors) {
    cachedLightThemeColors = getCurrentLightThemeColors();
  }
  currentThemePreference = readThemePreferenceFromStorage();
  if (currentThemePreference === THEME_MODE_SYSTEM) {
    applyTheme(getSystemTheme());
  } else {
    applyTheme(currentThemePreference);
  }
  if (!hasRegisterThemeListener && typeof index$1.onThemeChange === "function") {
    index$1.onThemeChange((res = {}) => {
      if (currentThemePreference === THEME_MODE_SYSTEM) {
        applyTheme(res.theme);
      }
    });
    hasRegisterThemeListener = true;
  }
}
applyUniApiShims();
const rootToastState = {
  ref: null
};
const rootNotifyState = {
  ref: null
};
function normalizeRootToastOptions(options = {}) {
  const toastOptions = typeof options === "string" ? { message: options } : options && typeof options === "object" ? { ...options } : {};
  if (!toastOptions.message && toastOptions.title) {
    toastOptions.message = toastOptions.title;
  }
  return toastOptions;
}
function setRootToastRef(ref2 = null) {
  rootToastState.ref = ref2 || null;
}
function rootToast(options = {}) {
  const toastOptions = normalizeRootToastOptions(options);
  const toastRef = rootToastState.ref;
  if (toastRef && typeof toastRef.show === "function") {
    toastRef.show(toastOptions);
    return;
  }
  if (!toastOptions.message)
    return;
  if (typeof index$1 !== "undefined" && typeof index$1.showToast === "function") {
    index$1.showToast({
      title: toastOptions.message,
      icon: "none",
      duration: Number(toastOptions.duration) || 2e3
    });
  }
}
function normalizeRootNotifyOptions(options = {}) {
  const notifyOptions = typeof options === "string" ? { message: options } : options && typeof options === "object" ? { ...options } : {};
  if (!notifyOptions.message && notifyOptions.title) {
    notifyOptions.message = notifyOptions.title;
  }
  return notifyOptions;
}
function setRootNotifyRef(ref2 = null) {
  rootNotifyState.ref = ref2 || null;
}
function rootNotify(options = {}) {
  const notifyOptions = normalizeRootNotifyOptions(options);
  const notifyRef = rootNotifyState.ref;
  if (notifyRef && typeof notifyRef.show === "function") {
    notifyRef.show(notifyOptions);
    return;
  }
  if (!notifyOptions.message)
    return;
  if (typeof index$1 !== "undefined" && typeof index$1.showToast === "function") {
    index$1.showToast({
      title: notifyOptions.message,
      icon: "none",
      duration: Number(notifyOptions.duration) || 3e3
    });
  }
}
let themeType = ["primary", "success", "error", "warning", "info"];
function setConfig(configs) {
  var _a, _b;
  const settings2 = configs || {};
  index.shallowMerge(config$2, settings2.config || {});
  setPropsConfig(settings2.props || {});
  index.shallowMerge(color$2, settings2.color || {});
  index.shallowMerge(zIndex, settings2.zIndex || {});
  syncThemeColorOverrideState({
    color: settings2.color,
    configColor: (_a = settings2 == null ? void 0 : settings2.config) == null ? void 0 : _a.color
  });
  const shouldRefreshTheme = !!settings2.color || !!((_b = settings2 == null ? void 0 : settings2.config) == null ? void 0 : _b.color) || themeState.version > 0;
  if (shouldRefreshTheme) {
    refreshThemeFromConfig();
  }
}
index.setConfig = setConfig;
const $u = {
  route,
  date: index.timeFormat,
  // 另名date
  colorGradient: colorGradient$1.colorGradient,
  hexToRgb: colorGradient$1.hexToRgb,
  rgbToHex: colorGradient$1.rgbToHex,
  colorToRgba: colorGradient$1.colorToRgba,
  test,
  type: themeType,
  http,
  config: config$2,
  // uview-plus配置信息相关，比如版本号
  zIndex,
  debounce,
  throttle,
  calc,
  mixin,
  mpMixin,
  props: props$8,
  ...index,
  color: color$2,
  platform: platform$1,
  theme: themeState,
  setTheme,
  setThemePreference,
  getThemePreference,
  getSystemTheme,
  getThemeVars,
  getThemeTabBarStyle,
  applyNativeThemeUI: applyNativeThemeUI$1,
  rootToast,
  setRootToastRef,
  rootNotify,
  setRootNotifyRef
};
function defineGlobalThemeHelpers(Vue) {
  var _a;
  const globalProperties = (_a = Vue == null ? void 0 : Vue.config) == null ? void 0 : _a.globalProperties;
  if (!globalProperties)
    return;
  Object.defineProperty(globalProperties, "upThemeIsDark", {
    configurable: true,
    get() {
      return getThemeIsDark();
    }
  });
  Object.defineProperty(globalProperties, "upThemeVars", {
    configurable: true,
    get() {
      return getThemeVarsForStyle();
    }
  });
  Object.defineProperty(globalProperties, "upThemePageStyle", {
    configurable: true,
    get() {
      return getThemePageStyle();
    }
  });
  Object.defineProperty(globalProperties, "upThemeCardStyle", {
    configurable: true,
    get() {
      return getThemeCardStyle();
    }
  });
  globalProperties.upThemeVar = function(varName, fallbackColor) {
    return getThemeVar(varName, fallbackColor);
  };
  globalProperties.upApplyNativeThemeUI = function() {
    return applyNativeThemeUI$1();
  };
}
const install = (Vue, upuiParams = "") => {
  if (upuiParams) {
    index$1.upuiParams = upuiParams;
    let temp = upuiParams();
    if (temp.httpIns) {
      temp.httpIns(http);
    }
    if (temp.options) {
      setConfig(temp.options);
    }
  }
  index$1.$u = $u;
  initThemeSystem();
  if (Vue && Vue.config && Vue.config.globalProperties) {
    Vue.config.globalProperties.$u = $u;
    defineGlobalThemeHelpers(Vue);
  }
  if (Vue && typeof Vue.mixin === "function") {
    Vue.mixin(mixin);
  }
};
const uviewPlus = {
  install
};
const LT = {
  Launch: "1",
  Hide: "3",
  Page: "11",
  Event: "21",
  Error: "31",
  Push: "101"
};
const CST = {
  ColdLaunch: 1,
  BackgroundTimeout: 2,
  PageInactiveTimeout: 3
};
const IEY = {
  No: 0,
  Yes: 1
};
function toIey(input) {
  if (input === true || input === 1 || input === "1")
    return IEY.Yes;
  return IEY.No;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
typeof SuppressedError === "function" ? SuppressedError : function(error2, suppressed, message) {
  var e2 = new Error(message);
  return e2.name = "SuppressedError", e2.error = error2, e2.suppressed = suppressed, e2;
};
const DEFAULT_MAX_LENGTH = 4096;
const TRUNCATED_SUFFIX = "…[truncated]";
function safeStringify(value, max = DEFAULT_MAX_LENGTH) {
  var _a;
  if (value === void 0)
    return "";
  let raw;
  if (typeof value === "string") {
    raw = value;
  } else {
    const seen = /* @__PURE__ */ new WeakSet();
    try {
      raw = (_a = JSON.stringify(value, (_key, val) => {
        if (typeof val === "object" && val !== null) {
          if (seen.has(val))
            return "[Circular]";
          seen.add(val);
        }
        if (typeof val === "bigint")
          return val.toString();
        if (typeof val === "function")
          return `[Function ${val.name || "anonymous"}]`;
        return val;
      })) !== null && _a !== void 0 ? _a : "";
    } catch (e2) {
      raw = `[Unserializable: ${e2.message}]`;
    }
  }
  if (raw.length > max) {
    return raw.slice(0, Math.max(0, max - TRUNCATED_SUFFIX.length)) + TRUNCATED_SUFFIX;
  }
  return raw;
}
function tryRun(fn, fallback) {
  try {
    return fn();
  } catch (_a) {
    return fallback;
  }
}
function withRetry(fn, opts) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a;
    const total = Math.max(1, Math.floor(opts.times));
    const sleep2 = (_a = opts.sleep) !== null && _a !== void 0 ? _a : defaultSleep;
    let lastErr;
    for (let attempt = 1; attempt <= total; attempt++) {
      try {
        return yield fn();
      } catch (e2) {
        lastErr = e2;
        if (attempt >= total)
          break;
        yield sleep2(opts.baseDelayMs * Math.pow(2, attempt - 1));
      }
    }
    throw lastErr;
  });
}
function defaultSleep(ms) {
  return new Promise((resolve2) => setTimeout(resolve2, ms));
}
function isUsableUniRuntime(candidate) {
  if (candidate == null || typeof candidate !== "object")
    return false;
  const u = candidate;
  return typeof u.getStorageSync === "function" || typeof u.onCreateVueApp === "function" || typeof u.request === "function" || typeof u.onAppShow === "function";
}
function getModuleUniCandidate() {
  if (typeof index$1 === "undefined" || index$1 == null || typeof index$1 !== "object") {
    return void 0;
  }
  return index$1;
}
function getWindowObject() {
  try {
    const w = Function('return typeof window !== "undefined" ? window : undefined')();
    return w != null ? w : void 0;
  } catch (_a) {
    return void 0;
  }
}
function getGlobalObject() {
  if (typeof globalThis !== "undefined" && globalThis != null) {
    return globalThis;
  }
  if (typeof global !== "undefined" && global != null) {
    return global;
  }
  if (typeof self !== "undefined" && self != null) {
    return self;
  }
  const win = getWindowObject();
  if (win)
    return win;
  return {};
}
function buildInjectedUniRuntime() {
  try {
    const out = {};
    const pick = (name, fn) => {
      if (typeof fn === "function")
        out[name] = fn;
    };
    pick("getStorageSync", index$1.getStorageSync);
    pick("setStorageSync", index$1.setStorageSync);
    pick("removeStorageSync", index$1.removeStorageSync);
    pick("getSystemInfoSync", index$1.getSystemInfoSync);
    pick("getDeviceInfo", index$1.getDeviceInfo);
    pick("getAppBaseInfo", index$1.getAppBaseInfo);
    pick("getWindowInfo", index$1.getWindowInfo);
    pick("getNetworkType", index$1.getNetworkType);
    pick("request", index$1.request);
    pick("onAppShow", index$1.onAppShow);
    pick("offAppShow", index$1.offAppShow);
    pick("onAppHide", index$1.onAppHide);
    pick("offAppHide", index$1.offAppHide);
    pick("onAppLaunch", index$1.onAppLaunch);
    pick("offAppLaunch", index$1.offAppLaunch);
    pick("getLaunchOptionsSync", index$1.getLaunchOptionsSync);
    pick("addInterceptor", index$1.addInterceptor);
    pick("removeInterceptor", index$1.removeInterceptor);
    pick("getPushClientId", index$1.getPushClientId);
    pick("getAccountInfoSync", index$1.getAccountInfoSync);
    pick("onCreateVueApp", index$1.onCreateVueApp);
    return Object.keys(out).length > 0 ? out : void 0;
  } catch (_e) {
    return void 0;
  }
}
function probeUniRuntime() {
  const globalThisAvailable = typeof globalThis !== "undefined";
  const g = getGlobalObject();
  const globalUni = g.uni;
  const globalThisHasUni = globalUni != null && typeof globalUni === "object";
  const globalThisUniStub = globalThisHasUni && !isUsableUniRuntime(globalUni);
  const moduleUni = getModuleUniCandidate();
  const moduleUniDefined = moduleUni != null;
  if (isUsableUniRuntime(globalUni)) {
    return {
      resolved: true,
      source: "globalThis",
      globalThisHasUni: true,
      globalThisUniStub: false,
      moduleUniDefined,
      globalThisAvailable,
      uni: globalUni
    };
  }
  if (isUsableUniRuntime(moduleUni)) {
    return {
      resolved: true,
      source: "module",
      globalThisHasUni,
      globalThisUniStub,
      moduleUniDefined: true,
      globalThisAvailable,
      uni: moduleUni
    };
  }
  const injectedUni = buildInjectedUniRuntime();
  if (isUsableUniRuntime(injectedUni)) {
    return {
      resolved: true,
      source: "injected",
      globalThisHasUni,
      globalThisUniStub,
      moduleUniDefined,
      globalThisAvailable,
      uni: injectedUni
    };
  }
  return {
    resolved: false,
    source: "none",
    globalThisHasUni,
    globalThisUniStub,
    moduleUniDefined,
    globalThisAvailable,
    uni: void 0
  };
}
function resolveUniRuntime() {
  const probe = probeUniRuntime();
  return probe.resolved ? probe.uni : void 0;
}
const TAG = "[uni统计 2.0]";
let runtimeDebug;
let muteNonDebug;
function preferSingleLineConsole() {
  return isAndroidOrIosRuntime();
}
function isAndroidOrIosRuntime() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const raw = (_a = "mp-weixin") !== null && _a !== void 0 ? _a : "";
  const g = getGlobalObject();
  if (raw === "app" || raw === "app-plus" || raw === "app-harmony") {
    const n2 = (_d = (_c = (_b = g.plus) === null || _b === void 0 ? void 0 : _b.os) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.toLowerCase();
    if (!n2)
      return false;
    if (n2.includes("android"))
      return true;
    if (n2 === "ios" || n2.includes("iphone"))
      return true;
    return false;
  }
  if (raw.startsWith("mp-")) {
    try {
      const p2 = (_h = (_g = (_f = (_e = g.uni) === null || _e === void 0 ? void 0 : _e.getSystemInfoSync) === null || _f === void 0 ? void 0 : _f.call(_e)) === null || _g === void 0 ? void 0 : _g.platform) === null || _h === void 0 ? void 0 : _h.toLowerCase();
      return p2 === "android" || p2 === "ios";
    } catch (_j) {
      return false;
    }
  }
  return false;
}
function stringifyObjectArgForNative(value) {
  if (value === null || value === void 0)
    return value;
  if (typeof value !== "object")
    return value;
  if (value instanceof Error)
    return `${value.name}: ${value.message}`;
  return safeStringify(value);
}
function formatLogArgForNativeConsole(value) {
  if (value === null)
    return "null";
  if (value === void 0)
    return "undefined";
  if (typeof value === "string")
    return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "bigint")
    return String(value);
  if (typeof value === "symbol") {
    try {
      return value.toString();
    } catch (_a) {
      return "?";
    }
  }
  if (typeof value === "function") {
    const fn = value;
    return `[Function ${fn.name || "anonymous"}]`;
  }
  if (typeof value === "object") {
    if (value instanceof Error)
      return `${value.name}: ${value.message}`;
    return safeStringify(value);
  }
  return String(value);
}
function isNonDebugMuted() {
  if (muteNonDebug !== void 0)
    return muteNonDebug;
  return false;
}
function setMuteNonDebug(value) {
  muteNonDebug = value;
}
function emitConsole(method3, args) {
  if (method3 !== "log" && isNonDebugMuted())
    return;
  const fn = console[method3];
  if (!preferSingleLineConsole()) {
    fn.call(console, TAG, ...args);
    return;
  }
  const mapped = isAndroidOrIosRuntime() ? args.map(stringifyObjectArgForNative) : args;
  if (mapped.length === 0) {
    fn.call(console, TAG);
    return;
  }
  const body = mapped.map(formatLogArgForNativeConsole).join(" ");
  fn.call(console, `${TAG} ${body}`);
}
function isDebug() {
  if (runtimeDebug !== void 0)
    return runtimeDebug;
  const v = "false";
  return v === true;
}
function setDebug(value) {
  runtimeDebug = value;
}
const logger = {
  debug(...args) {
    if (!isDebug())
      return;
    emitConsole("log", args);
  },
  info(...args) {
    emitConsole("info", args);
  },
  warn(...args) {
    emitConsole("warn", args);
  },
  error(...args) {
    emitConsole("error", args);
  },
  setDebug,
  isDebug,
  setMuteNonDebug
};
const NAMESPACE_ROOT = "UNI_STAT_DATA";
const LEGACY_NAMESPACE_ROOT = "$$STAT__DBDATA";
const cache = /* @__PURE__ */ new Map();
const knownKeys = /* @__PURE__ */ new Set();
function fullKey(key) {
  const appid = "touristappid";
  return `${NAMESPACE_ROOT}:${appid}:${key}`;
}
function getUni$a() {
  const raw = resolveUniRuntime();
  const u = raw != null && typeof raw === "object" ? raw : void 0;
  if (!u || typeof u.getStorageSync !== "function") {
    throw new Error("[uni统计 2.0] uni storage API is not available");
  }
  return u;
}
function get(key) {
  const fk = fullKey(key);
  if (cache.has(fk))
    return cache.get(fk);
  try {
    const raw = getUni$a().getStorageSync(fk);
    if (raw === "" || raw === null || raw === void 0) {
      cache.set(fk, void 0);
      return void 0;
    }
    cache.set(fk, raw);
    knownKeys.add(fk);
    return raw;
  } catch (_a) {
    return void 0;
  }
}
function safeRead(key) {
  const fk = fullKey(key);
  if (cache.has(fk))
    return { ok: true, value: cache.get(fk) };
  try {
    const raw = getUni$a().getStorageSync(fk);
    if (raw === "" || raw === null || raw === void 0) {
      cache.set(fk, void 0);
      return { ok: true, value: void 0 };
    }
    cache.set(fk, raw);
    knownKeys.add(fk);
    return { ok: true, value: raw };
  } catch (_a) {
    return { ok: false, value: void 0 };
  }
}
function set(key, value) {
  const fk = fullKey(key);
  if (value === void 0) {
    remove(key);
    return;
  }
  cache.set(fk, value);
  knownKeys.add(fk);
  try {
    getUni$a().setStorageSync(fk, value);
  } catch (_a) {
  }
}
function remove(key) {
  const fk = fullKey(key);
  cache.set(fk, void 0);
  try {
    getUni$a().removeStorageSync(fk);
  } catch (_a) {
  }
}
function batchGet(keys) {
  const out = {};
  for (const k of keys)
    out[k] = get(k);
  return out;
}
function batchSet(entries) {
  for (const k of Object.keys(entries))
    set(k, entries[k]);
}
function clearNamespace() {
  let uni2;
  try {
    uni2 = getUni$a();
  } catch (_a) {
  }
  for (const fk of Array.from(knownKeys)) {
    try {
      uni2 === null || uni2 === void 0 ? void 0 : uni2.removeStorageSync(fk);
    } catch (_b) {
    }
    cache.set(fk, void 0);
  }
  knownKeys.clear();
}
function __resetCache() {
  cache.clear();
  knownKeys.clear();
}
const storage = {
  get,
  set,
  remove,
  safeRead,
  batchGet,
  batchSet,
  clearNamespace,
  __resetCache
};
const KEY_FVTS = "visit:fvts";
const KEY_LVTS = "visit:lvts";
const KEY_TVC = "visit:tvc";
const EMPTY_SNAPSHOT = {
  fvts: 0,
  lvts: 0,
  tvc: 0,
  isNewUser: true,
  degraded: false
};
let loaded = null;
let pending = null;
let pendingRenewal = null;
let committed = null;
let lastBuilt = null;
let buildCalledInProcess = false;
function toNum(v) {
  if (typeof v === "number" && Number.isFinite(v) && v >= 0)
    return v;
  if (typeof v === "string" && v.length > 0) {
    const n2 = Number(v);
    if (Number.isFinite(n2) && n2 >= 0)
      return n2;
  }
  return 0;
}
function isLikelyFreshDevice(snap) {
  return snap.fvts === 0 && snap.lvts === 0 && snap.tvc === 0;
}
function isTrustworthyNewUser(snap) {
  if (!snap.isNewUser)
    return false;
  return !snap.degraded || isLikelyFreshDevice(snap);
}
function loadVisitSnapshot() {
  const fvtsR = storage.safeRead(KEY_FVTS);
  const lvtsR = storage.safeRead(KEY_LVTS);
  const tvcR = storage.safeRead(KEY_TVC);
  const degraded = !fvtsR.ok || !lvtsR.ok || !tvcR.ok;
  const fvts = toNum(fvtsR.value);
  const lvts = toNum(lvtsR.value);
  const tvc = toNum(tvcR.value);
  const snapshot = {
    fvts,
    lvts,
    tvc,
    isNewUser: lvts === 0,
    degraded
  };
  if (degraded) {
    const likelyFresh = fvts === 0 && lvts === 0 && tvc === 0 && snapshot.isNewUser;
    if (!likelyFresh) {
      logger.warn("[uni统计 2.0] visit snapshot degraded; some storage keys read failed");
    }
  }
  loaded = snapshot;
  return snapshot;
}
function ensureLoaded() {
  if (!loaded)
    loaded = EMPTY_SNAPSHOT;
  return loaded;
}
function persistNewUserBaseline(now) {
  storage.set(KEY_FVTS, now);
  storage.set(KEY_LVTS, now);
  storage.set(KEY_TVC, 1);
  const baseline = {
    fvts: now,
    lvts: now,
    tvc: 1,
    isNewUser: false,
    degraded: false
  };
  loaded = baseline;
  committed = baseline;
}
function buildVisitFields(now) {
  const snap = ensureLoaded();
  if (buildCalledInProcess && lastBuilt) {
    logger.warn("[uni统计 2.0] buildVisitFields() called twice in same process; returning cached fields");
    return Object.assign({}, lastBuilt);
  }
  buildCalledInProcess = true;
  if (isTrustworthyNewUser(snap)) {
    pending = { fvts: now, lvts: 0, tvc: 1, now };
    persistNewUserBaseline(now);
  } else if (snap.isNewUser) {
    logger.warn("[uni统计 2.0] visit degraded: lvts 读取失败但检测到历史数据，按老用户处理以避免新增虚高");
    const fvts = snap.fvts > 0 ? snap.fvts : now;
    pending = { fvts, lvts: fvts, tvc: snap.tvc + 1, now };
  } else {
    pending = {
      fvts: snap.fvts,
      lvts: snap.lvts,
      tvc: snap.tvc + 1,
      now
    };
  }
  lastBuilt = { fvts: pending.fvts, lvts: pending.lvts, tvc: pending.tvc };
  return Object.assign({}, lastBuilt);
}
function buildVisitFieldsForSessionRenewal(now) {
  let fvts;
  let lvts;
  let tvc;
  if (committed) {
    fvts = committed.fvts;
    lvts = committed.lvts;
    tvc = committed.tvc + 1;
  } else if (lastBuilt) {
    fvts = lastBuilt.fvts;
    lvts = lastBuilt.lvts !== 0 ? lastBuilt.lvts : lastBuilt.fvts;
    tvc = lastBuilt.tvc;
  } else {
    const snap = ensureLoaded();
    if (isTrustworthyNewUser(snap)) {
      fvts = now;
      lvts = 0;
      tvc = 1;
      persistNewUserBaseline(now);
    } else if (snap.isNewUser) {
      fvts = snap.fvts > 0 ? snap.fvts : now;
      lvts = fvts;
      tvc = snap.tvc + 1;
    } else {
      fvts = snap.fvts;
      lvts = snap.lvts;
      tvc = snap.tvc + 1;
    }
  }
  pendingRenewal = { fvts, lvts, tvc, now };
  return { fvts, lvts, tvc };
}
function commitVisitOnAck(now) {
  if (pending) {
    const snap = ensureLoaded();
    const newFvts2 = snap.fvts === 0 ? now : snap.fvts;
    const newLvts2 = now;
    const newTvc2 = pending.tvc;
    storage.set(KEY_FVTS, newFvts2);
    storage.set(KEY_LVTS, newLvts2);
    storage.set(KEY_TVC, newTvc2);
    committed = {
      fvts: newFvts2,
      lvts: newLvts2,
      tvc: newTvc2,
      isNewUser: false,
      degraded: false
    };
    loaded = committed;
    pending = null;
    return;
  }
  if (!pendingRenewal)
    return;
  const newFvts = pendingRenewal.fvts;
  const newLvts = now;
  const newTvc = pendingRenewal.tvc;
  storage.set(KEY_FVTS, newFvts);
  storage.set(KEY_LVTS, newLvts);
  storage.set(KEY_TVC, newTvc);
  committed = {
    fvts: newFvts,
    lvts: newLvts,
    tvc: newTvc,
    isNewUser: false,
    degraded: false
  };
  loaded = committed;
  pendingRenewal = null;
}
function rollbackPendingVisit() {
  pending = null;
  pendingRenewal = null;
}
const KEY_ENTRY = "session:entryRoute";
let cached$3;
let entryDeparted = false;
function markEntryPage(route2) {
  if (!route2)
    return;
  const existing = getEntryRoute();
  if (existing)
    return;
  storage.set(KEY_ENTRY, route2);
  cached$3 = route2;
}
function getEntryRoute() {
  if (cached$3 !== void 0)
    return cached$3 || void 0;
  const r = storage.safeRead(KEY_ENTRY);
  if (!r.ok)
    return void 0;
  if (typeof r.value === "string" && r.value.length > 0) {
    cached$3 = r.value;
    return r.value;
  }
  cached$3 = "";
  return void 0;
}
function isEntry(route2) {
  if (!route2)
    return false;
  const entry = getEntryRoute();
  return entry === route2;
}
function isEntryForIey(route2) {
  if (entryDeparted)
    return false;
  return isEntry(route2);
}
function markEntryDeparted() {
  entryDeparted = true;
}
function clearEntry() {
  cached$3 = "";
  entryDeparted = false;
  storage.remove(KEY_ENTRY);
}
let titleMapCache;
function getVue3TitleMap() {
  if (titleMapCache)
    return titleMapCache;
  titleMapCache = {};
  try {
    const raw = '{"pages/login/login":"登录","pages/elders/elders":"我的家人","pages/visits/visits":"探视记录","pages/bills/bills":"账单与预存","pages/care/care":"护理动态","pages/messages/messages":"消息与预警"}';
    if (typeof raw !== "string" || !raw)
      ;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      titleMapCache = parsed;
    }
  } catch (_a) {
    titleMapCache = {};
  }
  return titleMapCache;
}
function getTitleMap() {
  let map = {};
  map = getVue3TitleMap();
  return map;
}
function getPagesJsonNavigationTitle(routePath) {
  if (!routePath || typeof routePath !== "string")
    return "";
  const pathOnly = routePath.split("?")[0].trim();
  if (!pathOnly)
    return "";
  const map = getTitleMap();
  let result = "";
  const keys = [pathOnly];
  if (pathOnly.startsWith("/")) {
    keys.push(pathOnly.slice(1));
  } else {
    keys.push(`/${pathOnly}`);
  }
  for (const k of keys) {
    const v = map[k];
    if (typeof v === "string" && v.length > 0) {
      result = v;
      break;
    }
  }
  return result;
}
const state$2 = { page: "", config: "", report: "" };
function setPageTitle(title) {
  state$2.page = typeof title === "string" ? title : "";
}
function setConfigTitle(title) {
  state$2.config = typeof title === "string" ? title : "";
}
function setReportTitle(title) {
  state$2.report = typeof title === "string" ? title : "";
}
function getCurrentTitle() {
  return { ttn: state$2.page, ttpj: state$2.config, ttc: state$2.report };
}
function clearPageTitle() {
  state$2.page = "";
}
function nowMs() {
  return Date.now();
}
function nowSec() {
  return Math.floor(Date.now() / 1e3);
}
function clampUrlrefStaySec(deltaSec) {
  const d = deltaSec > 0 ? deltaSec : 0;
  return d < 1 ? 1 : d;
}
function normalizeStatOsP(info) {
  var _a, _b, _c, _d, _e;
  const fromToken = (raw) => {
    const s2 = raw.toLowerCase().trim();
    if (!s2)
      return "";
    if (s2 === "devtools")
      return "";
    if (s2 === "android")
      return "android";
    if (s2 === "ios" || s2 === "iphone")
      return "ios";
    if (s2.includes("android"))
      return "android";
    if (s2.includes("iphone") || s2 === "iphone os" || /\bios\b/.test(s2))
      return "ios";
    if (s2.includes("harmony") || s2 === "ohos" || s2 === "openharmony")
      return "harmonyos";
    if (s2.includes("windows") || s2 === "windows_nt")
      return "windows";
    if (s2 === "mac" || s2 === "darwin" || s2.includes("mac os") || s2 === "macos")
      return "macos";
    if (s2.includes("linux") && !s2.includes("android"))
      return "linux";
    return "";
  };
  const p0 = fromToken((_a = info.platform) !== null && _a !== void 0 ? _a : "");
  if (p0)
    return p0;
  const p1 = fromToken((_b = info.osName) !== null && _b !== void 0 ? _b : "");
  if (p1)
    return p1;
  const sys2 = ((_c = info.system) !== null && _c !== void 0 ? _c : "").toLowerCase();
  if (sys2.includes("android"))
    return "android";
  if (sys2.includes("iphone") || /\bios\b/.test(sys2))
    return "ios";
  if (sys2.includes("harmony") || sys2.includes("ohos"))
    return "harmonyos";
  if (sys2.includes("windows"))
    return "windows";
  if (sys2.includes("mac os") || sys2.includes("darwin"))
    return "macos";
  if (sys2.includes("linux"))
    return "linux";
  const plus = getGlobalObject().plus;
  const p2 = fromToken((_e = (_d = plus === null || plus === void 0 ? void 0 : plus.os) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "");
  if (p2)
    return p2;
  return "";
}
function uniPlatformMpAliRaw() {
  const parts = ["y", "a", "p", "mp-ali"];
  return [...parts].reverse().join("");
}
const PLATFORM_MAP = {
  app: "n",
  "app-plus": "n",
  "app-harmony": "n",
  "mp-harmony": "mhm",
  h5: "h5",
  "mp-weixin": "wx",
  [uniPlatformMpAliRaw()]: "ali",
  "mp-baidu": "bd",
  "mp-toutiao": "tt",
  "mp-qq": "qq",
  "mp-kuaishou": "ks",
  "mp-lark": "lark",
  "mp-xhs": "xhs",
  "mp-jd": "jd",
  "quickapp-native": "qn",
  "quickapp-webview": "qw"
};
function getRawPlatform() {
  var _a;
  return (_a = "mp-weixin") !== null && _a !== void 0 ? _a : "";
}
function getPlatform() {
  var _a;
  const raw = getRawPlatform();
  const mapped = PLATFORM_MAP[raw];
  if (!mapped)
    return "unknown";
  if (mapped === "ali") {
    const my2 = getGlobalObject().my;
    if (((_a = my2 === null || my2 === void 0 ? void 0 : my2.env) === null || _a === void 0 ? void 0 : _a.clientName) === "dingtalk")
      return "dt";
    return "ali";
  }
  return mapped;
}
function isApp() {
  const raw = getRawPlatform();
  return raw === "app" || raw === "app-plus" || raw === "app-harmony";
}
function isMp() {
  return getRawPlatform().startsWith("mp-");
}
function isH5() {
  return getRawPlatform() === "h5";
}
function isNvue() {
  return Boolean(getGlobalObject().__NVUE__);
}
const STORAGE_KEY_UUID = "device:uuid";
const WEB_UUID_KEY = "__DC_STAT_UUID";
let cachedUuid = null;
function preferGetDeviceInfoDeviceIdFirst() {
  if (isApp() || isH5())
    return true;
  return getRawPlatform() === "mp-weixin";
}
function readSysDeviceId() {
  const root = resolveUniRuntime();
  const u = root != null && typeof root === "object" ? root : void 0;
  if (!u || typeof u.getSystemInfoSync !== "function")
    return "";
  return tryRun(() => {
    var _a;
    return (_a = u.getSystemInfoSync().deviceId) !== null && _a !== void 0 ? _a : "";
  }, "");
}
function readGetDeviceInfoDeviceId() {
  const root = resolveUniRuntime();
  const u = root != null && typeof root === "object" ? root : void 0;
  if (!u || typeof u.getDeviceInfo !== "function")
    return "";
  return tryRun(() => {
    var _a;
    return (_a = u.getDeviceInfo().deviceId) !== null && _a !== void 0 ? _a : "";
  }, "");
}
function generateAnonUuid() {
  const ms = nowMs();
  const rnd = Math.floor(Math.random() * 1e6).toString().padStart(6, "0");
  return `${ms}${rnd}`;
}
function persistUuid(uuid) {
  tryRun(() => storage.set(STORAGE_KEY_UUID, uuid), void 0);
}
function getWebLocalStorage() {
  return tryRun(() => {
    const g = getGlobalObject();
    if (g.navigator && g.navigator.cookieEnabled === false)
      return void 0;
    const ls = g.localStorage;
    if (ls && typeof ls.getItem === "function" && typeof ls.setItem === "function") {
      return ls;
    }
    return void 0;
  }, void 0);
}
function readWebDeviceId() {
  const ls = getWebLocalStorage();
  if (!ls)
    return "";
  return tryRun(() => {
    const v = ls.getItem(WEB_UUID_KEY);
    return typeof v === "string" ? v : "";
  }, "");
}
function writeWebDeviceId(uuid) {
  const ls = getWebLocalStorage();
  if (!ls)
    return;
  tryRun(() => ls.setItem(WEB_UUID_KEY, uuid), void 0);
}
function resolveDeviceIdFromUni() {
  if (preferGetDeviceInfoDeviceIdFirst()) {
    const fromDeviceInfo = readGetDeviceInfoDeviceId();
    if (fromDeviceInfo)
      return fromDeviceInfo;
  }
  return readSysDeviceId();
}
function getUuid() {
  if (cachedUuid)
    return cachedUuid;
  if (isH5()) {
    const fromWeb = readWebDeviceId();
    if (fromWeb) {
      cachedUuid = fromWeb;
      return cachedUuid;
    }
  }
  const fromDevice = resolveDeviceIdFromUni();
  if (fromDevice) {
    persistUuid(fromDevice);
    if (isH5())
      writeWebDeviceId(fromDevice);
    cachedUuid = fromDevice;
    return cachedUuid;
  }
  const storedRead = storage.safeRead(STORAGE_KEY_UUID);
  if (storedRead.ok) {
    const stored = storedRead.value;
    if (typeof stored === "string" && stored.length > 0) {
      if (stored.startsWith("device-anon-")) {
        const upgraded = generateAnonUuid();
        persistUuid(upgraded);
        if (isH5())
          writeWebDeviceId(upgraded);
        cachedUuid = upgraded;
        return cachedUuid;
      }
      cachedUuid = stored;
      return cachedUuid;
    }
    const generated = generateAnonUuid();
    persistUuid(generated);
    if (isH5())
      writeWebDeviceId(generated);
    cachedUuid = generated;
    return cachedUuid;
  }
  const ephemeral = generateAnonUuid();
  if (isH5()) {
    writeWebDeviceId(ephemeral);
    cachedUuid = ephemeral;
    return cachedUuid;
  }
  return ephemeral;
}
const SUFFIX_HEAD_LEN = 8;
const SUFFIX_TAIL_LEN = 4;
function randomPart(len) {
  const r = Math.random().toString(36).slice(2, 2 + len);
  return r.length >= len ? r : r.padEnd(len, "0");
}
function sessionInstanceSuffix() {
  return `${randomPart(SUFFIX_HEAD_LEN)}-${randomPart(SUFFIX_TAIL_LEN)}`;
}
function anonNumericBody() {
  const ms = nowMs();
  const rnd = Math.floor(Math.random() * 1e6).toString().padStart(6, "0");
  return `${ms}${rnd}`;
}
function genSid(uuid) {
  if (uuid && uuid.length > 0) {
    return `${uuid}-${sessionInstanceSuffix()}`;
  }
  return `${anonNumericBody()}-${sessionInstanceSuffix()}`;
}
const KEY_SID = "session:id";
const KEY_SST = "session:start";
const KEY_SCT = "session:sct";
const KEY_SEQ = "session:seq";
const KEY_LAST_ACTIVE = "session:lastActive";
const KEY_BG_TS = "session:bgTs";
const KEY_LAST_SCENE = "session:lastScene";
const DEFAULT_CONFIG = {
  backgroundTimeoutSec: 300,
  pageInactiveTimeoutSec: 1800
};
let config$1 = Object.assign({}, DEFAULT_CONFIG);
let cached$2 = null;
function configure$1(c) {
  config$1 = Object.assign({}, DEFAULT_CONFIG, c);
}
function readNum(key) {
  const r = storage.safeRead(key);
  if (!r.ok)
    return 0;
  const v = r.value;
  if (typeof v === "number" && Number.isFinite(v) && v >= 0)
    return v;
  if (typeof v === "string" && v.length > 0) {
    const n2 = Number(v);
    if (Number.isFinite(n2) && n2 >= 0)
      return n2;
  }
  return 0;
}
function readStr(key) {
  const r = storage.safeRead(key);
  if (!r.ok)
    return "";
  return typeof r.value === "string" ? r.value : "";
}
function elapsedNonNeg(now, from) {
  const diff2 = now - from;
  return diff2 > 0 ? diff2 : 0;
}
function loadFromStorage() {
  const sid = readStr(KEY_SID);
  if (!sid)
    return null;
  return {
    sid,
    sst: readNum(KEY_SST),
    sct: readNum(KEY_SCT) || CST.ColdLaunch,
    seq: readNum(KEY_SEQ),
    lastActive: readNum(KEY_LAST_ACTIVE),
    bgTs: readNum(KEY_BG_TS),
    lastScene: readStr(KEY_LAST_SCENE)
  };
}
function ensureCache() {
  if (cached$2 !== null)
    return cached$2;
  cached$2 = loadFromStorage();
  return cached$2;
}
function createNew(now, sct, scene) {
  const sid = genSid(getUuid());
  const next = {
    sid,
    sst: now,
    sct,
    seq: 0,
    lastActive: now,
    bgTs: 0,
    lastScene: scene
  };
  storage.set(KEY_SID, sid);
  storage.set(KEY_SST, now);
  storage.set(KEY_SCT, sct);
  storage.set(KEY_SEQ, 0);
  storage.set(KEY_LAST_ACTIVE, now);
  storage.set(KEY_BG_TS, 0);
  storage.set(KEY_LAST_SCENE, scene);
  cached$2 = next;
  return next;
}
function ensureSession(t2, ctx) {
  const { now, scene = "" } = ctx;
  const snap = ensureCache();
  if (t2 === "cold_launch") {
    const created = createNew(now, CST.ColdLaunch, scene);
    return { snapshot: created, isNew: true, cst: CST.ColdLaunch };
  }
  if (!snap) {
    const created = createNew(now, CST.ColdLaunch, scene);
    return { snapshot: created, isNew: true, cst: CST.ColdLaunch };
  }
  if (t2 === "app_show") {
    const enterCandidates = [];
    if (ctx.backgroundEnteredAt && ctx.backgroundEnteredAt > 0) {
      enterCandidates.push(ctx.backgroundEnteredAt);
    }
    if (snap.bgTs > 0) {
      enterCandidates.push(snap.bgTs);
    }
    const enterTs = enterCandidates.length > 0 ? Math.min(...enterCandidates) : 0;
    const elapsed2 = enterTs > 0 ? elapsedNonNeg(now, enterTs) : elapsedNonNeg(now, snap.lastActive);
    const sceneChanged = !!scene && !!snap.lastScene && scene !== snap.lastScene;
    const fromBackground = enterTs > 0;
    if (sceneChanged || fromBackground && elapsed2 >= config$1.backgroundTimeoutSec) {
      const created = createNew(now, CST.BackgroundTimeout, scene);
      return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout };
    }
    touch(now);
    storage.set(KEY_BG_TS, 0);
    if (cached$2)
      cached$2.bgTs = 0;
    return { snapshot: cached$2, isNew: false, cst: 0 };
  }
  if (t2 === "wx_scene_changed") {
    if (scene && scene !== snap.lastScene) {
      const created = createNew(now, CST.BackgroundTimeout, scene);
      return { snapshot: created, isNew: true, cst: CST.BackgroundTimeout };
    }
    return { snapshot: snap, isNew: false, cst: 0 };
  }
  const elapsed = elapsedNonNeg(now, snap.lastActive);
  if (elapsed >= config$1.pageInactiveTimeoutSec) {
    const created = createNew(now, CST.PageInactiveTimeout, scene || snap.lastScene);
    return { snapshot: created, isNew: true, cst: CST.PageInactiveTimeout };
  }
  touch(now);
  return { snapshot: cached$2, isNew: false, cst: 0 };
}
function markBackground(now) {
  if (!cached$2)
    cached$2 = loadFromStorage();
  if (!cached$2)
    return;
  storage.set(KEY_BG_TS, now);
  cached$2.bgTs = now;
}
function touch(now) {
  if (!cached$2)
    cached$2 = loadFromStorage();
  if (!cached$2)
    return;
  storage.set(KEY_LAST_ACTIVE, now);
  cached$2.lastActive = now;
}
function nextSeq() {
  if (!cached$2)
    cached$2 = loadFromStorage();
  if (!cached$2)
    return 0;
  const next = cached$2.seq + 1;
  cached$2.seq = next;
  storage.set(KEY_SEQ, next);
  return next;
}
function getSnapshot() {
  return ensureCache();
}
function syncLastScene(scene) {
  if (!scene)
    return;
  if (!cached$2)
    cached$2 = loadFromStorage();
  if (!cached$2)
    return;
  storage.set(KEY_LAST_SCENE, scene);
  cached$2.lastScene = scene;
}
function getPageVmType(vm) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (!vm)
    return null;
  const internalMpType = (_c = (_b = (_a = vm.$) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.mpType) !== null && _c !== void 0 ? _c : (_d = vm.type) === null || _d === void 0 ? void 0 : _d.mpType;
  if (vm.mpType === "page" || vm.$mpType === "page" || ((_e = vm.$mp) === null || _e === void 0 ? void 0 : _e.mpType) === "page" || ((_f = vm.$options) === null || _f === void 0 ? void 0 : _f.mpType) === "page" || internalMpType === "page") {
    return "page";
  }
  if (vm.mpType === "app" || vm.$mpType === "app" || ((_g = vm.$mp) === null || _g === void 0 ? void 0 : _g.mpType) === "app" || ((_h = vm.$options) === null || _h === void 0 ? void 0 : _h.mpType) === "app" || internalMpType === "app") {
    return "app";
  }
  return null;
}
function getTopPageVm() {
  var _a;
  const fn = getGlobalObject().getCurrentPages;
  if (typeof fn !== "function")
    return void 0;
  const pages2 = tryRun(() => fn(), []) || [];
  if (!Array.isArray(pages2) || pages2.length === 0)
    return void 0;
  const top = pages2[pages2.length - 1];
  return (_a = top === null || top === void 0 ? void 0 : top.$vm) !== null && _a !== void 0 ? _a : top;
}
function getCurrentRoute(pageVm) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
  const vm = pageVm !== null && pageVm !== void 0 ? pageVm : getTopPageVm();
  if (!vm)
    return "";
  if (getPlatform() === "bd") {
    const r = (_e = (_c = (_b = (_a = vm.$mp) === null || _a === void 0 ? void 0 : _a.page) === null || _b === void 0 ? void 0 : _b.is) !== null && _c !== void 0 ? _c : (_d = vm.$scope) === null || _d === void 0 ? void 0 : _d.is) !== null && _e !== void 0 ? _e : "";
    if (r)
      return r;
  }
  return (_l = (_h = (_f = vm.route) !== null && _f !== void 0 ? _f : (_g = vm.$scope) === null || _g === void 0 ? void 0 : _g.route) !== null && _h !== void 0 ? _h : (_k = (_j = vm.$mp) === null || _j === void 0 ? void 0 : _j.page) === null || _k === void 0 ? void 0 : _k.route) !== null && _l !== void 0 ? _l : "";
}
function getCurrentRouteWithQuery(pageVm) {
  var _a, _b;
  const vm = pageVm !== null && pageVm !== void 0 ? pageVm : getTopPageVm();
  if (!vm)
    return "";
  const page2 = (_a = vm.$page) !== null && _a !== void 0 ? _a : (_b = vm.$scope) === null || _b === void 0 ? void 0 : _b.$page;
  if (page2) {
    if (page2.fullPath && page2.fullPath !== "/")
      return page2.fullPath;
    if (page2.route)
      return page2.route;
  }
  return getCurrentRoute(vm);
}
function getUni$9() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
function getLaunchScene(override) {
  if (override !== void 0 && override !== null && override !== "") {
    return String(override);
  }
  const u = getUni$9();
  if (typeof (u === null || u === void 0 ? void 0 : u.getLaunchOptionsSync) !== "function")
    return "";
  if (!isMp())
    return "";
  return tryRun(() => {
    const opts = u.getLaunchOptionsSync();
    const scene = opts === null || opts === void 0 ? void 0 : opts.scene;
    return scene === void 0 || scene === null ? "" : String(scene);
  }, "");
}
function getUni$8() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
function getPushClientId(opts = {}) {
  const { enabled: enabled2 = false, timeoutMs = 3e3 } = opts;
  return new Promise((resolve2) => {
    if (!enabled2) {
      resolve2({ ok: false, cid: "", reason: "disabled" });
      return;
    }
    const u = getUni$8();
    if (!u || typeof u.getPushClientId !== "function") {
      resolve2({ ok: false, cid: "", reason: "unsupported" });
      return;
    }
    let settled = false;
    const finish = (r) => {
      if (settled)
        return;
      settled = true;
      resolve2(r);
    };
    const timer = setTimeout(() => finish({ ok: false, cid: "", reason: "timeout" }), timeoutMs);
    tryRun(() => u.getPushClientId({
      success: (res) => {
        clearTimeout(timer);
        const cid2 = typeof (res === null || res === void 0 ? void 0 : res.cid) === "string" ? res.cid : "";
        if (!cid2) {
          finish({ ok: false, cid: "", reason: "fail" });
          return;
        }
        finish({ ok: true, cid: cid2 });
      },
      fail: () => {
        clearTimeout(timer);
        finish({ ok: false, cid: "", reason: "fail" });
      }
    }), void 0);
  });
}
const EMPTY_TITLE_SNAP = { ttn: "", ttpj: "", ttc: "" };
const state$1 = {
  lastRoute: "",
  lastRouteFull: "",
  beforeLastRoute: "",
  beforeLastRouteFull: "",
  lastRouteEnterTime: 0,
  lastPageTitleSnap: Object.assign({}, EMPTY_TITLE_SNAP),
  lastIey: false,
  prevIey: false,
  isHide: false,
  wasBackgrounded: false,
  pendingBackgroundResume: false,
  backgroundEnteredAt: 0,
  suppressNextPageLogAfterResume: false,
  backgroundResumeLt1At: 0
};
const BACKGROUND_RESUME_DEBOUNCE_SEC = 1;
const BACKGROUND_RESUME_LT1_DEDUP_SEC = 3;
const PAGE_APP_HIDE_DEFER_MS = 120;
let pageAppHideDeferTimer;
function shouldEarlyConsumeBackgroundResumeInMixin() {
  return !shouldBindUniAppLifecycle();
}
function markBackgroundResumeLt1Emitted(now) {
  state$1.backgroundResumeLt1At = now;
}
function shouldSkipDuplicateBackgroundResumeLt1(now) {
  return state$1.backgroundResumeLt1At > 0 && now - state$1.backgroundResumeLt1At <= BACKGROUND_RESUME_LT1_DEDUP_SEC;
}
function cancelPageAppHideDefer() {
  if (pageAppHideDeferTimer !== void 0) {
    clearTimeout(pageAppHideDeferTimer);
    pageAppHideDeferTimer = void 0;
  }
}
function tryAppHideFromPageOnHideWhenH5Hidden(app, opts) {
  var _a;
  if (!isH5())
    return;
  if (state$1.pendingBackgroundResume)
    return;
  const vis = (_a = globalThis.document) === null || _a === void 0 ? void 0 : _a.visibilityState;
  if (vis === "hidden") {
    handleAppHide(app, opts);
  }
}
function tryAppHideFromPageOnHideWhenMpDefer(app, opts) {
  if (isH5())
    return;
  if (state$1.pendingBackgroundResume)
    return;
  cancelPageAppHideDefer();
  pageAppHideDeferTimer = setTimeout(() => {
    pageAppHideDeferTimer = void 0;
    if (state$1.pendingBackgroundResume)
      return;
    handleAppHide(app, opts);
  }, PAGE_APP_HIDE_DEFER_MS);
}
function tryVue3AppHideFromPageOnHide(app, opts) {
  if (state$1.pendingBackgroundResume)
    return;
  if (isH5()) {
    tryAppHideFromPageOnHideWhenH5Hidden(app, opts);
    return;
  }
  tryAppHideFromPageOnHideWhenMpDefer(app, opts);
}
function safeCollector(app) {
  return app.getCollector();
}
function normalizePathForEntryMark(raw) {
  var _a;
  if (!raw || typeof raw !== "string")
    return "";
  const noQuery = (_a = raw.split("?")[0]) !== null && _a !== void 0 ? _a : "";
  return noQuery.startsWith("/") ? noQuery.slice(1) : noQuery;
}
function reportNewSession(c, _cst, scene, now, attachVisit, url3 = "") {
  let visit;
  if (attachVisit && !firstVisitEmittedInProcess) {
    firstVisitEmittedInProcess = true;
    visit = tryRun(() => buildVisitFields(now), void 0);
  } else {
    visit = tryRun(() => buildVisitFieldsForSessionRenewal(now), void 0);
  }
  const payload = {
    lt: LT.Launch,
    t: now,
    sc: scene,
    visit
  };
  if (url3)
    payload.url = url3;
  c.report(payload);
}
let firstVisitEmittedInProcess = false;
let titleSnapGeneration = 0;
function scheduleDeferredTitleSnapshot() {
  const gen = titleSnapGeneration;
  const run = typeof queueMicrotask === "function" ? queueMicrotask : (fn) => {
    void Promise.resolve().then(fn);
  };
  run(() => {
    tryRun(() => {
      if (gen !== titleSnapGeneration)
        return;
      state$1.lastPageTitleSnap = Object.assign({}, getCurrentTitle());
    }, void 0);
  });
}
function handleLaunch(app, options = {}, opts = {}) {
  const c = safeCollector(app);
  if (!c)
    return;
  const now = nowSec();
  const scene = tryRun(() => getLaunchScene(options.scene), "");
  const result = tryRun(() => ensureSession("cold_launch", { now, scene }), null);
  if (!result)
    return;
  tryRun(() => clearEntry(), void 0);
  const url3 = options.path || "";
  const entryKey = normalizePathForEntryMark(url3);
  if (entryKey) {
    tryRun(() => markEntryPage(entryKey), void 0);
  }
  reportNewSession(c, result.cst || CST.ColdLaunch, scene, now, true, url3);
  if (opts.enablePush) {
    void getPushClientId({ enabled: true, timeoutMs: opts.pushTimeoutMs }).then((r) => {
      if (!r.ok || !r.cid)
        return;
      const c2 = safeCollector(app);
      if (!c2)
        return;
      c2.report({ lt: LT.Push, cid: r.cid, t: nowSec() });
    }).catch((e2) => logger.warn("[uni统计 2.0] push cid fetch failed", e2));
  }
}
function tryConsumeBackgroundResume(app, options = {}, _opts = {}, _from = "unknown") {
  if (!state$1.pendingBackgroundResume) {
    return false;
  }
  const bgEnterAt = state$1.backgroundEnteredAt;
  if (bgEnterAt <= 0) {
    return false;
  }
  const c = safeCollector(app);
  if (!c) {
    return false;
  }
  const now = nowSec();
  const elapsed = now - bgEnterAt;
  if (elapsed < BACKGROUND_RESUME_DEBOUNCE_SEC) {
    state$1.suppressNextPageLogAfterResume = true;
    return true;
  }
  state$1.wasBackgrounded = false;
  state$1.suppressNextPageLogAfterResume = true;
  state$1.lastRouteEnterTime = now;
  const scene = tryRun(() => getLaunchScene(options.scene), "");
  const result = tryRun(() => ensureSession("app_show", {
    now,
    scene,
    backgroundEnteredAt: bgEnterAt
  }), null);
  state$1.pendingBackgroundResume = false;
  state$1.backgroundEnteredAt = 0;
  if (!result || !result.isNew) {
    return true;
  }
  tryRun(() => clearEntry(), void 0);
  const url3 = options.path || state$1.lastRoute || "";
  const entryKey = normalizePathForEntryMark(url3);
  if (entryKey) {
    tryRun(() => markEntryPage(entryKey), void 0);
  }
  reportNewSession(c, result.cst || CST.BackgroundTimeout, scene, now, false, url3);
  markBackgroundResumeLt1Emitted(now);
  void c.flush(true).catch((e2) => logger.warn("[uni统计 2.0] flush after new session (app_show) failed", e2));
  return true;
}
function handleAppShow(app, options = {}, opts = {}) {
  if (tryConsumeBackgroundResume(app, options, opts, "handleAppShow"))
    return;
  const c = safeCollector(app);
  if (!c)
    return;
  const now = nowSec();
  const scene = tryRun(() => getLaunchScene(options.scene), "");
  if (shouldSkipDuplicateBackgroundResumeLt1(now)) {
    tryRun(() => syncLastScene(scene), void 0);
    return;
  }
  const result = tryRun(() => ensureSession("app_show", { now, scene }), null);
  if (!result || !result.isNew) {
    return;
  }
  tryRun(() => clearEntry(), void 0);
  const url3 = options.path || state$1.lastRoute || "";
  const entryKey = normalizePathForEntryMark(url3);
  if (entryKey) {
    tryRun(() => markEntryPage(entryKey), void 0);
  }
  reportNewSession(c, result.cst || CST.BackgroundTimeout, scene, now, false, url3);
  markBackgroundResumeLt1Emitted(now);
  void c.flush(true).catch((e2) => logger.warn("[uni统计 2.0] flush after new session (app_show) failed", e2));
}
function handleAppHide(app, opts = {}) {
  if (state$1.pendingBackgroundResume)
    return;
  const c = safeCollector(app);
  if (!c)
    return;
  const now = nowSec();
  state$1.wasBackgrounded = true;
  state$1.pendingBackgroundResume = true;
  state$1.backgroundEnteredAt = now;
  tryRun(() => markBackground(now), void 0);
  const deltaStay = state$1.lastRouteEnterTime > 0 ? now - state$1.lastRouteEnterTime : 0;
  const stayed = clampUrlrefStaySec(deltaStay);
  if (state$1.lastRoute && opts.enablePageLog !== false) {
    const exitedUrl = state$1.lastRouteFull || state$1.lastRoute;
    const ref2 = state$1.beforeLastRouteFull || state$1.beforeLastRoute || "";
    const snap = state$1.lastPageTitleSnap;
    const payload = {
      lt: LT.Page,
      t: now,
      url: exitedUrl,
      urlref_ts: stayed,
      iey: state$1.lastIey,
      ppiey: state$1.prevIey,
      ttn: snap.ttn,
      ttpj: snap.ttpj,
      ttc: snap.ttc
    };
    if (ref2)
      payload.urlref = ref2;
    c.report(payload);
    if (state$1.lastIey) {
      tryRun(() => markEntryDeparted(), void 0);
      state$1.lastIey = false;
    }
  }
  c.report({
    lt: LT.Hide,
    t: now,
    urlref: state$1.lastRoute,
    urlref_ts: stayed
  });
  void c.flush(true).catch((e2) => logger.warn("[uni统计 2.0] flush on hide failed", e2));
}
function handlePageShow(app, vm, opts = {}) {
  const c = safeCollector(app);
  if (!c)
    return;
  if (state$1.pendingBackgroundResume && shouldEarlyConsumeBackgroundResumeInMixin()) {
    tryConsumeBackgroundResume(app, {}, opts, "handlePageShow");
  }
  const now = nowSec();
  const route2 = tryRun(() => getCurrentRoute(vm), "");
  const url3 = tryRun(() => getCurrentRouteWithQuery(vm), "") || route2;
  if (!route2 && !url3)
    return;
  const result = tryRun(() => ensureSession("page_show", { now }), null);
  if (!result)
    return;
  tryRun(() => setReportTitle(""), void 0);
  tryRun(() => setConfigTitle(getPagesJsonNavigationTitle(route2)), void 0);
  if (result.isNew) {
    tryRun(() => clearEntry(), void 0);
  }
  if (route2) {
    tryRun(() => markEntryPage(route2), void 0);
  }
  if (result.isNew) {
    reportNewSession(c, result.cst || CST.PageInactiveTimeout, "", now, false, url3);
  }
  const shouldSuppressPageLog = state$1.suppressNextPageLogAfterResume;
  if (state$1.lastRoute && opts.enablePageLog !== false && !shouldSuppressPageLog) {
    const deltaStay = state$1.lastRouteEnterTime > 0 ? now - state$1.lastRouteEnterTime : 0;
    const stayed = clampUrlrefStaySec(deltaStay);
    const exitedUrl = state$1.lastRouteFull || state$1.lastRoute;
    const ref2 = state$1.beforeLastRouteFull || state$1.beforeLastRoute || "";
    const snap = state$1.lastPageTitleSnap;
    const payload = {
      lt: LT.Page,
      t: now,
      url: exitedUrl,
      urlref_ts: stayed,
      // 离开页是否入口页 / urlref 指向页是否入口页（进入新页前状态尚未被本轮覆盖）。
      iey: state$1.lastIey,
      ppiey: state$1.prevIey
    };
    if (ref2)
      payload.urlref = ref2;
    payload.ttn = snap.ttn;
    payload.ttpj = snap.ttpj;
    payload.ttc = snap.ttc;
    c.report(payload);
    if (state$1.lastIey) {
      tryRun(() => markEntryDeparted(), void 0);
    }
  }
  state$1.beforeLastRoute = state$1.lastRoute;
  state$1.beforeLastRouteFull = state$1.lastRouteFull;
  state$1.prevIey = state$1.lastIey;
  state$1.lastIey = !!route2 && tryRun(() => isEntryForIey(route2), false);
  state$1.lastRoute = route2;
  state$1.lastRouteFull = url3;
  state$1.lastRouteEnterTime = now;
  state$1.suppressNextPageLogAfterResume = false;
  scheduleDeferredTitleSnapshot();
  state$1.isHide = false;
  if (result.isNew) {
    void c.flush(true).catch((e2) => logger.warn("[uni统计 2.0] flush after new session (page_show) failed", e2));
  }
}
function handlePageHide(app, _vm) {
  const c = safeCollector(app);
  if (!c)
    return;
  state$1.isHide = true;
  titleSnapGeneration++;
  state$1.lastPageTitleSnap = Object.assign({}, getCurrentTitle());
  tryRun(() => clearPageTitle(), void 0);
}
const rethrownErrors = typeof WeakSet === "function" ? /* @__PURE__ */ new WeakSet() : (
  // 极端环境降级：has=false 永不命中，add=noop；本模块只用 has/add 两个方法，
  // 其它方法（delete / [Symbol.toStringTag]）调用方不依赖，类型断言即可。
  {
    has: () => false,
    add: () => rethrownErrors
  }
);
function handleError(app, e2) {
  const isObj = typeof e2 === "object" && e2 !== null;
  if (isObj && rethrownErrors.has(e2))
    return;
  if (isObj)
    rethrownErrors.add(e2);
  try {
    app.reportError(e2);
  } catch (err) {
    logger.warn("[uni统计 2.0] handleError failed", err);
  }
  if (isMp()) {
    return;
  }
  tryRun(() => {
    setTimeout(() => {
      throw e2;
    }, 0);
  }, void 0);
}
function getUni$7() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
function shouldMixinDispatchAppLifecycle() {
  let result = isH5() || getPlatform() === "n" || isNvue();
  result = isH5() || getPlatform() === "n" || isNvue();
  return result;
}
function shouldBindUniAppLifecycle() {
  let result = !isH5() && getPlatform() !== "n" && !isNvue();
  result = !isH5() && getPlatform() !== "n" && !isNvue();
  return result;
}
const uniAppHookRegistry = {
  showBound: false,
  hideBound: false,
  appShowCb: void 0,
  appHideCb: void 0
};
function tryBindUniAppLifecycle(app, opts = {}) {
  if (!shouldBindUniAppLifecycle())
    return false;
  const u = getUni$7();
  if (!u)
    return false;
  if (!uniAppHookRegistry.showBound && typeof u.onAppShow === "function") {
    uniAppHookRegistry.appShowCb = (e2) => handleAppShow(app, e2 !== null && e2 !== void 0 ? e2 : {}, opts);
    tryRun(() => u.onAppShow(uniAppHookRegistry.appShowCb), void 0);
    uniAppHookRegistry.showBound = true;
  }
  if (!uniAppHookRegistry.hideBound && typeof u.onAppHide === "function") {
    uniAppHookRegistry.appHideCb = () => handleAppHide(app, opts);
    tryRun(() => u.onAppHide(uniAppHookRegistry.appHideCb), void 0);
    uniAppHookRegistry.hideBound = true;
  }
  return uniAppHookRegistry.showBound && uniAppHookRegistry.hideBound;
}
function unbindUniAppLifecycle() {
  if (!uniAppHookRegistry.showBound && !uniAppHookRegistry.hideBound)
    return;
  const cur = getUni$7();
  if (uniAppHookRegistry.showBound && uniAppHookRegistry.appShowCb && (cur === null || cur === void 0 ? void 0 : cur.offAppShow)) {
    tryRun(() => cur.offAppShow(uniAppHookRegistry.appShowCb), void 0);
  }
  if (uniAppHookRegistry.hideBound && uniAppHookRegistry.appHideCb && (cur === null || cur === void 0 ? void 0 : cur.offAppHide)) {
    tryRun(() => cur.offAppHide(uniAppHookRegistry.appHideCb), void 0);
  }
  uniAppHookRegistry.showBound = false;
  uniAppHookRegistry.hideBound = false;
  uniAppHookRegistry.appShowCb = void 0;
  uniAppHookRegistry.appHideCb = void 0;
}
function bindLifecycle(app, opts = {}) {
  let bound = true;
  const mixin2 = {
    onLaunch(options = {}) {
      handleLaunch(app, options, opts);
    },
    onLoad() {
    },
    onShow() {
      const vmType = getPageVmType(this);
      cancelPageAppHideDefer();
      if (state$1.pendingBackgroundResume && shouldEarlyConsumeBackgroundResumeInMixin()) {
        tryConsumeBackgroundResume(app, {}, opts, "mixin.onShow");
      }
      state$1.isHide = false;
      if (vmType === "page") {
        handlePageShow(app, this, opts);
      }
      if (shouldMixinDispatchAppLifecycle() && vmType === "app") {
        handleAppShow(app, {}, opts);
      }
    },
    onHide() {
      state$1.isHide = true;
      if (getPageVmType(this) === "page") {
        handlePageHide(app);
        tryVue3AppHideFromPageOnHide(app, opts);
      }
      if (shouldMixinDispatchAppLifecycle() && getPageVmType(this) === "app" && !state$1.pendingBackgroundResume) {
        handleAppHide(app, opts);
      }
    },
    onUnload() {
      if (state$1.isHide) {
        state$1.isHide = false;
        return;
      }
      handlePageHide(app);
    },
    onError(e2) {
      handleError(app, e2);
    }
  };
  if (shouldBindUniAppLifecycle()) {
    tryBindUniAppLifecycle(app, opts);
  }
  return {
    mixin: mixin2,
    tryBindUniAppHooks: () => shouldBindUniAppLifecycle() && tryBindUniAppLifecycle(app, opts),
    unbind() {
      if (!bound)
        return;
      bound = false;
      unbindUniAppLifecycle();
    }
  };
}
const STAT_VERSION_PUBLIC = "5.23";
const STAT_URL = "https://tongji.dcloud.io/uni/stat";
const STAT_H5_URL = "https://tongji.dcloud.io/uni/stat.gif";
const REPORT_INTERVAL_SEC = 10;
const HTTP_MAX_RETRIES = 3;
const CLOUD_MAX_RETRIES = 2;
const IMAGE_MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 1e3;
const MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT = true;
const MP_WEIXIN_PRELOAD_TIMEOUT_MS = 3e4;
const MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS = 2e3;
const SINGLE_EVENT_MAX_BYTES = 4 * 1024;
const BATCH_REQUESTS_MAX_BYTES = 4 * 1024;
const BATCH_MAX_EVENTS = 30;
const QUEUE_MAX_EVENTS = 1e3;
const RETRY_MAX_ATTEMPTS = 5;
const IMAGE_REPORT_DEFAULTS = {
  host: "https://tongji-collector.dcloud.net.cn",
  /** 正式环境 */
  projectId: "964f0397-af5d-45bf-99d6-8fb3500d7849",
  topicId: "8563e231-f4cd-4ab0-8870-917e4b04e810"
  // 以下为历史测试环境（已停用，勿删便于回切排查）
  // projectId: '9fad19a2-b7f1-47f5-87ff-8621f545ab61',
  // topicId: '99b55c91-ed80-406e-b205-e9d18aca744d',
};
function getAppId$1() {
  var _a;
  return (_a = "touristappid") !== null && _a !== void 0 ? _a : "";
}
function assertCloudResultOk(res) {
  if (!res || typeof res !== "object")
    return;
  const r = res;
  if (r.success === false) {
    throw new Error("cloud receiver reported success=false");
  }
  if (typeof r.errCode === "number" && r.errCode !== 0) {
    throw new Error("cloud receiver reported errCode=" + String(r.errCode));
  }
}
function resolveSpace(injected) {
  if (injected)
    return injected;
  const raw = resolveUniRuntime();
  const u = raw != null && typeof raw === "object" ? raw : void 0;
  return u === null || u === void 0 ? void 0 : u.__stat_uniCloud_space;
}
function createCloudChannel(opts = {}) {
  var _a, _b;
  const receiverName = (_a = opts.receiverName) !== null && _a !== void 0 ? _a : "uni-stat-receiver";
  const maxRetries = (_b = opts.maxRetries) !== null && _b !== void 0 ? _b : CLOUD_MAX_RETRIES;
  function getReceiver() {
    const space = resolveSpace(opts.uniCloudSpace);
    if (!space || typeof space.importObject !== "function")
      return void 0;
    try {
      return space.importObject(receiverName, { customUI: true });
    } catch (e2) {
      logger.warn("[uni统计 2.0] cloud importObject threw", e2);
      return void 0;
    }
  }
  function once2(payload) {
    const receiver = getReceiver();
    if (!receiver || typeof receiver.report !== "function") {
      return Promise.reject(new Error("uniCloud space unavailable"));
    }
    return Promise.resolve(receiver.report(payload)).then((res) => {
      assertCloudResultOk(res);
    });
  }
  return {
    name: "2.0",
    available() {
      const space = resolveSpace(opts.uniCloudSpace);
      return !!(space && typeof space.importObject === "function");
    },
    send(payload) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield withRetry(() => once2(payload), {
            times: maxRetries,
            baseDelayMs: RETRY_BASE_DELAY_MS,
            sleep: opts.sleep
          });
        } catch (e2) {
          logger.warn("[uni统计 2.0] 统计上报失败（云函数已重试）", e2);
          throw e2;
        }
      });
    }
  };
}
function getActionLabel(lt) {
  switch (lt) {
    case LT.Launch:
      return "应用启动";
    case LT.Hide:
      return "应用进入后台";
    case LT.Page:
      return "页面切换";
    case LT.Event:
      return "事件触发";
    case LT.Error:
      return "应用错误";
    case LT.Push:
      return "PUSH 设备标识";
    default:
      return `未知事件 (lt=${String(lt !== null && lt !== void 0 ? lt : "?")})`;
  }
}
function bucketSize(bucket) {
  let n2 = 0;
  for (const lt of Object.keys(bucket)) {
    const arr = bucket[lt];
    if (Array.isArray(arr))
      n2 += arr.length;
  }
  return n2;
}
function bucketSummary(bucket) {
  const parts = [];
  for (const lt of Object.keys(bucket)) {
    const arr = bucket[lt];
    if (Array.isArray(arr) && arr.length > 0) {
      parts.push(`lt=${lt}×${arr.length}`);
    }
  }
  return parts.join(", ") || "<空>";
}
function logCollect(data) {
  if (!logger.isDebug())
    return;
  const lt = data.lt;
  const label = getActionLabel(lt);
  logger.debug(`=== 统计数据采集：${label} (lt=${String(lt !== null && lt !== void 0 ? lt : "?")}) ===`);
  logger.debug(data);
  logger.debug("=== 采集结束 ===");
}
function logBoot(info) {
  if (!logger.isDebug())
    return;
  const timeoutParts = [];
  if (info.backgroundTimeoutSec != null) {
    timeoutParts.push(`后台超时(新会话): ${info.backgroundTimeoutSec}s`);
  }
  if (info.pageInactiveTimeoutSec != null) {
    timeoutParts.push(`前台无操作超时: ${info.pageInactiveTimeoutSec}s`);
  }
  const timeoutSeg = timeoutParts.length > 0 ? ` | ${timeoutParts.join(" | ")}` : "";
  const lines = [
    "=== uni统计 2.0 已启用 ===",
    `上报间隔: ${info.reportIntervalSec}s${timeoutSeg} | 应用APPID: ${info.ak || "<未注入>"}${info.appName ? ` | 应用名: ${info.appName}` : ""}${info.vueMode ? ` | ${info.vueMode}` : ""}`
  ];
  if (info.debugFromManifest) {
    lines.push("调试模式：已从 manifest.uniStatistics.debug 自动开启");
  }
  lines.push("=== 后续将在每次采集 / 上报时输出过程日志 ===");
  logger.debug(lines.join("\n"));
}
function logReportStart(info) {
  if (!logger.isDebug())
    return;
  const total = bucketSize(info.bucket);
  const summary = bucketSummary(info.bucket);
  logger.debug(`=== 准备上报：共 ${total} 条事件 (${summary}) ===`);
}
function logReportFailureReason(info) {
  if (!logger.isDebug())
    return;
  logger.debug(`原因: ${describeError(info.error)}`);
  if (info.persistedId) {
    logger.debug(`已暂存重试队列 [retryId=${info.persistedId}]，下次启动自动续传`);
  } else {
    logger.debug("未能写入重试队列：本批数据已丢弃");
  }
}
function logReportSummary(info) {
  if (!logger.isDebug())
    return;
  if (info.failedCount === 0) {
    logger.debug(`=== 上报成功： ${info.okCount} 条事件已送达, 用时 ${info.elapsedMs}ms ===`);
  } else if (info.okCount === 0) {
    logger.debug(`=== 上报失败： ${info.failedCount} 条事件未送达, 用时 ${info.elapsedMs}ms ===`);
  } else {
    logger.debug(`=== 上报完成：成功 ${info.okCount} 条，失败 ${info.failedCount} 条，用时 ${info.elapsedMs}ms ===`);
  }
}
function logNoChannel(info) {
  if (!logger.isDebug())
    return;
  logger.debug(`=== 上报跳过：当前无可用通道，已回滚 ${bucketSize(info.bucket)} 条事件入队 ===`);
}
function logRecoverStart(count) {
  if (!logger.isDebug())
    return;
  logger.debug(`=== 冷启续传：发现 ${count} 条历史 payload，开始逐条重发 ===`);
}
function logRecoverItem(info) {
  if (!logger.isDebug())
    return;
  if (info.ok) {
    logger.debug(`续传成功 (${info.index}/${info.total})`);
  } else {
    logger.debug(`续传失败 (${info.index}/${info.total})：${describeError(info.error)}`);
  }
}
function describeError(e2) {
  if (!e2)
    return "<无错误对象>";
  if (e2 instanceof Error) {
    return `${e2.name}: ${e2.message}`;
  }
  if (typeof e2 === "string")
    return e2;
  return safeStringify(e2) || String(e2);
}
function omitEmptyStringFieldsForUpload(data) {
  const out = {};
  for (const key of Object.keys(data)) {
    const v = data[key];
    if (v === "")
      continue;
    out[key] = v;
  }
  return out;
}
const LT_ORDER = {
  "1": 1,
  "11": 2,
  "21": 3,
  "31": 4,
  "101": 5,
  "3": 100
};
const UNKNOWN_LT_WEIGHT = 50;
function handleData(buckets) {
  return JSON.stringify(flatten(buckets));
}
function flatten(buckets) {
  const ltKeys = Object.keys(buckets);
  ltKeys.sort((a, b) => weightOf(a) - weightOf(b));
  const out = [];
  for (let i = 0; i < ltKeys.length; i++) {
    const lt = ltKeys[i];
    const list = buckets[lt];
    if (!list || list.length === 0)
      continue;
    for (let j = 0; j < list.length; j++)
      out.push(list[j]);
  }
  return out;
}
function weightOf(lt) {
  const w = LT_ORDER[lt];
  return typeof w === "number" ? w : UNKNOWN_LT_WEIGHT;
}
function chunkEvents(events, opts = {}) {
  var _a, _b;
  const maxEvents2 = (_a = opts.maxEvents) !== null && _a !== void 0 ? _a : Infinity;
  const maxBytes = (_b = opts.maxBytes) !== null && _b !== void 0 ? _b : Infinity;
  const out = [];
  if (!Array.isArray(events) || events.length === 0)
    return out;
  const safeMaxEvents = maxEvents2 > 0 ? maxEvents2 : Infinity;
  const safeMaxBytes = maxBytes > 0 ? maxBytes : Infinity;
  let cur = [];
  let curBytes = 2;
  for (let i = 0; i < events.length; i++) {
    const e2 = events[i];
    let s2 = "";
    try {
      s2 = JSON.stringify(e2);
    } catch (_c) {
      continue;
    }
    const inc = cur.length === 0 ? s2.length : s2.length + 1;
    const wouldExceed = cur.length >= safeMaxEvents || cur.length > 0 && curBytes + inc > safeMaxBytes;
    if (wouldExceed) {
      out.push(cur);
      cur = [];
      curBytes = 2;
    }
    cur.push(e2);
    curBytes += cur.length === 1 ? s2.length : s2.length + 1;
  }
  if (cur.length > 0)
    out.push(cur);
  return out;
}
function handleDataChunked(buckets, opts = {}) {
  const events = flatten(buckets);
  if (events.length === 0)
    return [];
  const chunks = chunkEvents(events, opts);
  const out = [];
  for (let i = 0; i < chunks.length; i++) {
    out.push(JSON.stringify(chunks[i]));
  }
  return out;
}
class PermanentChannelError extends Error {
  constructor(message) {
    super(message);
    this.permanent = true;
    this.name = "PermanentChannelError";
    Object.setPrototypeOf(this, PermanentChannelError.prototype);
  }
}
function isPermanentChannelError(err) {
  if (!err || typeof err !== "object")
    return false;
  if (err instanceof PermanentChannelError)
    return true;
  const e2 = err;
  if (e2.name === "PermanentChannelError")
    return true;
  if (e2.permanent === true)
    return true;
  return false;
}
function defaultGenPayloadId(nowMs2) {
  return "p-" + nowMs2.toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}
function createCollector(deps) {
  let firstFlushDone = false;
  let deferredFlushTimer = null;
  function cancelDeferredFlush() {
    if (deferredFlushTimer == null)
      return;
    clearTimeout(deferredFlushTimer);
    deferredFlushTimer = null;
  }
  function triggerAutoFlush() {
    var _a;
    const deferMs = Math.max(0, Math.floor((_a = deps.firstFlushDeferMs) !== null && _a !== void 0 ? _a : 0));
    if (!firstFlushDone && deferMs > 0) {
      if (deferredFlushTimer != null)
        return;
      deferredFlushTimer = setTimeout(() => {
        deferredFlushTimer = null;
        firstFlushDone = true;
        void flushImpl(false).catch((e2) => logger.warn("[uni统计 2.0] auto-flush failed", e2));
      }, deferMs);
      return;
    }
    firstFlushDone = true;
    void flushImpl(false).catch((e2) => logger.warn("[uni统计 2.0] auto-flush failed", e2));
  }
  function report(input) {
    tryRun(() => {
      const t2 = typeof input.t === "number" ? input.t : deps.nowSec();
      const snap = deps.session.getSnapshot();
      let sessionForCtx;
      if (snap) {
        const seq = deps.session.nextSeq();
        sessionForCtx = Object.assign({}, snap, { seq });
      }
      if (snap && input.lt === LT.Event && deps.session.touch) {
        deps.session.touch(t2);
      }
      const ctx = Object.assign({}, input, {
        t: t2,
        session: sessionForCtx
      });
      const data = deps.builder.build(ctx);
      logCollect(data);
      deps.queue.enqueue(omitEmptyStringFieldsForUpload(data));
      if (deps.queue.shouldFlush()) {
        triggerAutoFlush();
      }
    }, void 0);
  }
  function flushImpl() {
    return __awaiter(this, arguments, void 0, function* (force = false) {
      var _a, _b, _c, _d, _e;
      if (!deps.queue.shouldFlush(force))
        return;
      if (deps.isNetworkOffline) {
        let offline = false;
        try {
          offline = yield deps.isNetworkOffline();
        } catch (_f) {
          offline = false;
        }
        if (offline) {
          logger.warn("[uni统计 2.0] 当前无网络，延后 flush");
          return;
        }
      }
      const snapshot = deps.queue.flush();
      if (!snapshot)
        return;
      const channel = deps.selectChannel();
      if (!channel) {
        logger.warn("[uni统计 2.0] 无可用上报线路，本批已回滚队列");
        logNoChannel({ bucket: snapshot });
        deps.queue.rollback(snapshot);
        return;
      }
      const globalMaxBytes = (_b = (_a = deps.batchLimits) === null || _a === void 0 ? void 0 : _a.maxBytes) !== null && _b !== void 0 ? _b : BATCH_REQUESTS_MAX_BYTES;
      const channelMaxBytes = typeof channel.maxRequestBytes === "function" ? channel.maxRequestBytes() : Number.POSITIVE_INFINITY;
      const limits = {
        maxEvents: (_d = (_c = deps.batchLimits) === null || _c === void 0 ? void 0 : _c.maxEvents) !== null && _d !== void 0 ? _d : BATCH_MAX_EVENTS,
        maxBytes: Math.min(globalMaxBytes, channelMaxBytes)
      };
      const chunks = handleDataChunked(snapshot, limits);
      if (chunks.length === 0) {
        logger.warn("[uni统计 2.0] flush 切片结果为空，已回滚队列", snapshot);
        deps.queue.rollback(snapshot);
        return;
      }
      const startMs = deps.nowMs();
      let totalCount = 0;
      for (const lt of Object.keys(snapshot)) {
        const arr = snapshot[lt];
        if (Array.isArray(arr))
          totalCount += arr.length;
      }
      logReportStart({ channel: channel.name, bucket: snapshot });
      const hasLaunch = Array.isArray(snapshot["1"]) && snapshot["1"].length > 0;
      let okEvents = 0;
      let failedEvents = 0;
      let allOk = true;
      let firstChunkOk = true;
      for (let i = 0; i < chunks.length; i++) {
        const requests = chunks[i];
        const payload = {
          usv: deps.config.usv,
          t: deps.nowSec(),
          requests,
          _id: ((_e = deps.genPayloadId) !== null && _e !== void 0 ? _e : () => defaultGenPayloadId(deps.nowMs()))()
        };
        const sliceEvents = countEvents(requests);
        try {
          yield channel.send(payload);
          okEvents += sliceEvents;
        } catch (e2) {
          allOk = false;
          if (i === 0)
            firstChunkOk = false;
          failedEvents += sliceEvents;
          if (isPermanentChannelError(e2)) {
            logger.warn("[uni统计 2.0] 统计上报失败（本批已丢弃，不可重试）", e2, "sliceBytes=" + requests.length);
            logReportFailureReason({ error: e2, persistedId: void 0 });
            continue;
          }
          logger.warn("[uni统计 2.0] 统计上报失败（已暂存，下次启动自动重试）", e2);
          const id = deps.retry.persist(payload);
          if (!id) {
            logger.warn("[uni统计 2.0] 统计暂存重试失败（无 retryId），本批已丢弃");
          }
          logReportFailureReason({ error: e2, persistedId: id });
        }
      }
      const visitAccepted = hasLaunch ? firstChunkOk : allOk;
      if (visitAccepted) {
        tryRun(() => deps.visit.commitVisitOnAck(deps.nowSec()), void 0);
      } else {
        tryRun(() => deps.visit.rollbackPendingVisit(), void 0);
      }
      logReportSummary({
        channel: channel.name,
        okCount: okEvents,
        failedCount: failedEvents,
        elapsedMs: deps.nowMs() - startMs
      });
    });
  }
  function countEvents(requests) {
    try {
      const arr = JSON.parse(requests);
      return Array.isArray(arr) ? arr.length : 0;
    } catch (_a) {
      return 0;
    }
  }
  function recoverRetry() {
    return __awaiter(this, void 0, void 0, function* () {
      if (deps.isNetworkOffline) {
        let offline = false;
        try {
          offline = yield deps.isNetworkOffline();
        } catch (_a) {
          offline = false;
        }
        if (offline) {
          logger.warn("[uni统计 2.0] 当前无网络，延后续传重试");
          return;
        }
      }
      const items = deps.retry.loadAll();
      if (items.length === 0)
        return;
      const channel = deps.selectChannel();
      if (!channel) {
        logger.warn("[uni统计 2.0] 续传重试跳过：当前无可用上报线路");
        return;
      }
      logRecoverStart(items.length);
      let i = 0;
      for (const payload of items) {
        i++;
        try {
          yield channel.send(payload);
          if (payload._id)
            deps.retry.ack(payload._id);
          logRecoverItem({
            index: i,
            total: items.length,
            payloadId: payload._id,
            ok: true
          });
        } catch (e2) {
          if (isPermanentChannelError(e2)) {
            if (payload._id)
              deps.retry.ack(payload._id);
            logger.warn("[uni统计 2.0] 续传重试失败（不可重试，已从队列移除）", e2, "id=" + payload._id);
            logRecoverItem({
              index: i,
              total: items.length,
              payloadId: payload._id,
              ok: false,
              error: e2
            });
            continue;
          }
          if (payload._id && deps.retry.markAttempt) {
            deps.retry.markAttempt(payload._id);
          }
          logger.warn("[uni统计 2.0] 续传重试失败（保留队列，下次启动再试）", e2);
          logRecoverItem({
            index: i,
            total: items.length,
            payloadId: payload._id,
            ok: false,
            error: e2
          });
        }
      }
    });
  }
  function flush2() {
    return __awaiter(this, arguments, void 0, function* (force = false) {
      cancelDeferredFlush();
      firstFlushDone = true;
      return flushImpl(force);
    });
  }
  function destroy() {
    cancelDeferredFlush();
    firstFlushDone = true;
  }
  return { report, flush: flush2, recoverRetry, destroy };
}
function getUni$6() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
function toQuery(payload) {
  const out = [];
  out.push("usv=" + encodeURIComponent(String(payload.usv)));
  out.push("t=" + encodeURIComponent(String(payload.t)));
  out.push("requests=" + encodeURIComponent(payload.requests));
  return out.join("&");
}
function tryImageRequest(payload, h5Url = STAT_H5_URL) {
  const ImageCtor = getGlobalObject().Image;
  if (typeof ImageCtor !== "function")
    return false;
  return tryRun(() => {
    const img = new ImageCtor();
    img.src = h5Url + "?" + toQuery(payload);
    return true;
  }, false);
}
function createHttpChannel(opts = {}) {
  var _a, _b, _c, _d, _e;
  const url3 = (_a = opts.url) !== null && _a !== void 0 ? _a : STAT_URL;
  const h5Url = (_b = opts.h5Url) !== null && _b !== void 0 ? _b : STAT_H5_URL;
  const ut = (_c = opts.ut) !== null && _c !== void 0 ? _c : "";
  const timeoutMs = (_d = opts.timeoutMs) !== null && _d !== void 0 ? _d : 1e4;
  const maxRetries = (_e = opts.maxRetries) !== null && _e !== void 0 ? _e : HTTP_MAX_RETRIES;
  function once2(payload) {
    if (ut === "h5" && opts.preferImageOnH5 !== false) {
      if (tryImageRequest(payload, h5Url))
        return Promise.resolve();
    }
    const u = getUni$6();
    if (!u || typeof u.request !== "function") {
      return Promise.reject(new Error("uni.request unavailable"));
    }
    return new Promise((resolve2, reject) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled)
          return;
        settled = true;
        reject(new Error("http timeout"));
      }, timeoutMs);
      u.request({
        url: url3,
        method: "POST",
        data: payload,
        timeout: timeoutMs,
        success: (res) => {
          var _a2;
          if (settled)
            return;
          settled = true;
          clearTimeout(timer);
          const code2 = (_a2 = res === null || res === void 0 ? void 0 : res.statusCode) !== null && _a2 !== void 0 ? _a2 : 0;
          if (code2 >= 200 && code2 < 300)
            resolve2();
          else
            reject(new Error("http status " + code2));
        },
        fail: (e2) => {
          if (settled)
            return;
          settled = true;
          clearTimeout(timer);
          reject(e2 instanceof Error ? e2 : new Error(String(e2)));
        }
      });
    });
  }
  return {
    name: "1.0",
    available() {
      const u = getUni$6();
      return !!(u && typeof u.request === "function");
    },
    send(payload) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield withRetry(() => once2(payload), {
            times: maxRetries,
            baseDelayMs: RETRY_BASE_DELAY_MS,
            sleep: opts.sleep
          });
        } catch (e2) {
          logger.warn("[uni统计 2.0] 统计上报失败（HTTP 已重试）", e2);
          throw e2;
        }
      });
    }
  };
}
const WEBTRACK_API_PATH = "/WebTrack";
const WEBTRACK_BEACON_PATH = "/WebTrack.gif";
function getUni$5() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
const REPORT_URL_BASE_OVERHEAD = 256;
const REPORT_ENCODE_RATIO = 3;
function buildStatReportUrl(payload, opts) {
  var _a;
  const t2 = ((_a = opts.nowMs) !== null && _a !== void 0 ? _a : () => Date.now())();
  const logs = encodeURIComponent(payload.requests);
  const host2 = opts.host.replace(/\/+$/, "");
  return host2 + opts.path + "?ProjectId=" + encodeURIComponent(opts.projectId) + "&TopicId=" + encodeURIComponent(opts.topicId) + "&Logs=" + logs + "&Source=webImg&Time=" + t2;
}
function summarizeHttpErrorBody(data, maxLen = 320) {
  if (data == null)
    return "";
  if (typeof data === "string") {
    return data.length <= maxLen ? data : data.slice(0, maxLen) + "…";
  }
  try {
    const s2 = JSON.stringify(data);
    return s2.length <= maxLen ? s2 : s2.slice(0, maxLen) + "…";
  } catch (_a) {
    return String(data).slice(0, maxLen);
  }
}
function imageBeaconAwait(url3, ms) {
  const ImageCtor = getGlobalObject().Image;
  if (typeof ImageCtor !== "function") {
    return Promise.reject(new PermanentChannelError("当前环境无法完成统计上报"));
  }
  return new Promise((resolve2, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled)
        return;
      settled = true;
      reject(new Error("统计上报超时"));
    }, ms);
    const img = new ImageCtor();
    img.onload = () => {
      if (settled)
        return;
      settled = true;
      clearTimeout(timer);
      resolve2();
    };
    img.onerror = () => {
      if (settled)
        return;
      settled = true;
      clearTimeout(timer);
      resolve2();
    };
    img.src = url3;
  });
}
function fetchBeaconAwait(url3, ms) {
  const g = getGlobalObject();
  const fetchFn = g.fetch;
  if (typeof fetchFn !== "function") {
    return Promise.reject(new Error("fetch unavailable"));
  }
  const controller = typeof g.AbortController === "function" ? new g.AbortController() : void 0;
  return new Promise((resolve2, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled)
        return;
      settled = true;
      if (controller)
        tryRun(() => controller.abort(), void 0);
      reject(new Error("统计上报超时"));
    }, ms);
    fetchFn(url3, {
      method: "GET",
      keepalive: true,
      credentials: "omit",
      signal: controller ? controller.signal : void 0
    }).then((res) => {
      if (settled)
        return;
      settled = true;
      clearTimeout(timer);
      if (res && res.ok) {
        resolve2();
        return;
      }
      reject(new Error("统计上报 HTTP " + (res ? res.status : 0)));
    }, (e2) => {
      if (settled)
        return;
      settled = true;
      clearTimeout(timer);
      reject(e2 instanceof Error ? e2 : new Error(String(e2)));
    });
  });
}
function getWxPreloadAssets() {
  const wx2 = getGlobalObject().wx;
  return typeof (wx2 === null || wx2 === void 0 ? void 0 : wx2.preloadAssets) === "function" ? wx2.preloadAssets : void 0;
}
function formatWxPreloadFail(err) {
  if (err instanceof Error)
    return err;
  if (err != null && typeof err === "object" && "errMsg" in err) {
    const msg = err.errMsg;
    if (typeof msg === "string" && msg.length > 0)
      return new Error(msg);
  }
  if (err == null)
    return new Error("preloadAssets fail (empty err)");
  return new Error(String(err));
}
function mpWeixinPreloadAssetsBeaconAwait(url3, ms, preload) {
  return new Promise((resolve2, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled)
        return;
      settled = true;
      reject(new Error("统计上报超时(preloadAssets)"));
    }, ms);
    try {
      preload({
        data: [{ type: "image", src: url3 }],
        success: () => {
          if (settled)
            return;
          settled = true;
          clearTimeout(timer);
          resolve2();
        },
        fail: (err) => {
          if (settled)
            return;
          settled = true;
          clearTimeout(timer);
          reject(formatWxPreloadFail(err));
        }
      });
    } catch (e2) {
      if (settled)
        return;
      settled = true;
      clearTimeout(timer);
      reject(e2 instanceof Error ? e2 : new Error(String(e2)));
    }
  });
}
function isMpWeixinPreloadEnabled(opts) {
  var _a, _b;
  const enabled2 = (_a = opts.mpWeixinPreloadReport) !== null && _a !== void 0 ? _a : MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT;
  if (!enabled2)
    return false;
  const raw = (_b = opts.rawPlatform) !== null && _b !== void 0 ? _b : getRawPlatform();
  return raw === "mp-weixin";
}
function createImageChannel(opts = {}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const host2 = (_a = opts.host) !== null && _a !== void 0 ? _a : IMAGE_REPORT_DEFAULTS.host;
  const projectId = (_b = opts.projectId) !== null && _b !== void 0 ? _b : IMAGE_REPORT_DEFAULTS.projectId;
  const topicId = (_c = opts.topicId) !== null && _c !== void 0 ? _c : IMAGE_REPORT_DEFAULTS.topicId;
  const timeoutMs = (_d = opts.timeoutMs) !== null && _d !== void 0 ? _d : 1e4;
  const maxRetries = (_e = opts.maxRetries) !== null && _e !== void 0 ? _e : IMAGE_MAX_RETRIES;
  const maxUrlLength = (_f = opts.maxUrlLength) !== null && _f !== void 0 ? _f : 6 * 1024;
  const preferBeacon = opts.preferImageBeacon !== false;
  const nowMs2 = opts.nowMs;
  const ut = (_g = opts.ut) !== null && _g !== void 0 ? _g : "";
  const isH52 = ut === "h5";
  const mpWeixinPreload = isMpWeixinPreloadEnabled(opts);
  function configured() {
    return !!(host2 && projectId && topicId);
  }
  const reportOpts = { host: host2, projectId, topicId, nowMs: nowMs2 };
  function preflightUrl(payload, path) {
    if (!configured()) {
      throw new PermanentChannelError("统计上报未配置：请设置 TLS host、projectId、topicId");
    }
    const url3 = buildStatReportUrl(payload, {
      host: reportOpts.host,
      projectId: reportOpts.projectId,
      topicId: reportOpts.topicId,
      nowMs: reportOpts.nowMs,
      path
    });
    if (url3.length > maxUrlLength) {
      throw new PermanentChannelError("统计上报 URL 过长: " + url3.length + " > " + maxUrlLength);
    }
    return url3;
  }
  function webTrackGetViaRequest(url3) {
    const u = getUni$5();
    if (!u || typeof u.request !== "function") {
      return Promise.reject(new PermanentChannelError("当前环境无法完成统计上报"));
    }
    return new Promise((resolve2, reject) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled)
          return;
        settled = true;
        reject(new Error("统计上报超时"));
      }, timeoutMs);
      u.request({
        url: url3,
        method: "GET",
        timeout: timeoutMs,
        success: (res) => {
          var _a2;
          if (settled)
            return;
          settled = true;
          clearTimeout(timer);
          const code2 = (_a2 = res === null || res === void 0 ? void 0 : res.statusCode) !== null && _a2 !== void 0 ? _a2 : 0;
          if (code2 >= 200 && code2 < 300) {
            resolve2();
            return;
          }
          const hint = summarizeHttpErrorBody(res === null || res === void 0 ? void 0 : res.data);
          reject(new Error(hint ? `统计上报 HTTP ${code2}: ${hint}` : `统计上报 HTTP ${code2}`));
        },
        fail: (e2) => {
          if (settled)
            return;
          settled = true;
          clearTimeout(timer);
          reject(e2 instanceof Error ? e2 : new Error(String(e2)));
        }
      });
    });
  }
  function onceH5(payload) {
    const g = getGlobalObject();
    const u = getUni$5();
    const hasRequest = !!(u && typeof u.request === "function");
    if (preferBeacon && typeof g.fetch === "function") {
      return fetchBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), timeoutMs);
    }
    if (hasRequest) {
      return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
    }
    if (preferBeacon && typeof g.Image === "function") {
      return imageBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), timeoutMs);
    }
    return Promise.reject(new PermanentChannelError("当前环境无法完成统计上报"));
  }
  function onceMpWeixin(payload) {
    const preloadFn = getWxPreloadAssets();
    if (preloadFn) {
      return mpWeixinPreloadAssetsBeaconAwait(preflightUrl(payload, WEBTRACK_BEACON_PATH), MP_WEIXIN_PRELOAD_TIMEOUT_MS, preloadFn);
    }
    logger.warn("[uni统计 2.0] wx.preloadAssets 不可用，回退 uni.request GET /WebTrack");
    return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
  }
  function dispatchReport(payload) {
    if (isH52)
      return onceH5(payload);
    if (mpWeixinPreload)
      return onceMpWeixin(payload);
    return webTrackGetViaRequest(preflightUrl(payload, WEBTRACK_API_PATH));
  }
  return {
    name: "image",
    available() {
      return configured();
    },
    maxRequestBytes() {
      const raw = (maxUrlLength - REPORT_URL_BASE_OVERHEAD) / REPORT_ENCODE_RATIO;
      return Math.max(512, Math.floor(raw));
    },
    send(payload) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield withRetry(() => dispatchReport(payload), {
            times: maxRetries,
            baseDelayMs: RETRY_BASE_DELAY_MS,
            sleep: opts.sleep
          });
        } catch (e2) {
          if (isPermanentChannelError(e2)) {
            logger.warn("[uni统计 2.0] 统计上报失败（不可重试）", e2);
          } else {
            logger.warn("[uni统计 2.0] 统计上报失败（已重试）", e2);
          }
          throw e2;
        }
      });
    }
  };
}
function s(v, def2 = "") {
  if (typeof v === "string")
    return v;
  if (typeof v === "number" && Number.isFinite(v))
    return String(v);
  return def2;
}
function n(v, def2 = 0) {
  if (typeof v === "number" && Number.isFinite(v))
    return v;
  if (typeof v === "string" && v.length > 0) {
    const x = Number(v);
    if (Number.isFinite(x))
      return x;
  }
  return def2;
}
function createStatDataBuilder(deps) {
  function baseFields() {
    var _a, _b, _c;
    const { config: config2, platform: platform2, system, locale, device, net, location, pkg, legacy, web } = deps;
    return {
      ak: s(config2.ak),
      usv: s(config2.usv),
      v: s((_a = config2.v) !== null && _a !== void 0 ? _a : system.appVersion),
      ch: s(config2.ch),
      ut: s(platform2.ut),
      p: s((_b = platform2.p) !== null && _b !== void 0 ? _b : system.osP),
      on: s(system.on),
      did: s(device.uuid),
      brand: s(system.brand),
      md: s(system.md),
      sv: s(system.sv),
      mpsdk: s(system.sdkVersion),
      mpv: s(system.mpvHostVersion),
      pr: n(locale.pr, 1),
      ww: n(locale.ww),
      wh: n(locale.wh),
      sw: n(locale.sw),
      sh: n(locale.sh),
      lang: s(locale.lang),
      net: s(net.net, "unknown"),
      lat: s(location.lat),
      lng: s(location.lng),
      mpn: s((_c = legacy === null || legacy === void 0 ? void 0 : legacy.mpn) !== null && _c !== void 0 ? _c : pkg.mpn),
      tdaid: s(pkg.tdaid),
      pkn: s(pkg.pkn),
      an: s(pkg.an),
      domain: s(web.domain)
    };
  }
  function sessionFields(ctx) {
    if (!ctx.session)
      return {};
    return {
      sid: ctx.session.sid,
      cst: ctx.session.sct
    };
  }
  function pageFields(ctx) {
    const out = {};
    if (ctx.url !== void 0)
      out.url = s(ctx.url);
    if (ctx.urlref !== void 0)
      out.urlref = s(ctx.urlref);
    if (ctx.urlref_ts !== void 0)
      out.urlref_ts = n(ctx.urlref_ts);
    if (ctx.ttn !== void 0)
      out.ttn = s(ctx.ttn);
    if (ctx.ttpj !== void 0)
      out.ttpj = s(ctx.ttpj);
    if (ctx.ttc !== void 0)
      out.ttc = s(ctx.ttc);
    return out;
  }
  function entryFields(ctx) {
    if (ctx.lt === "11") {
      return {
        iey: toIey(ctx.iey !== void 0 ? ctx.iey : false),
        ppiey: toIey(ctx.ppiey !== void 0 ? ctx.ppiey : false)
      };
    }
    return {};
  }
  function visitFields(ctx) {
    if (ctx.lt !== "1")
      return {};
    if (!ctx.visit)
      return {};
    return {
      fvts: ctx.visit.fvts,
      lvts: ctx.visit.lvts,
      tvc: ctx.visit.tvc
    };
  }
  function launchFields(ctx) {
    if (ctx.lt !== "1")
      return {};
    if (ctx.sc === void 0)
      return {};
    return { sc: s(ctx.sc) };
  }
  function errorFields(ctx) {
    if (ctx.lt !== "31" || !ctx.errMsg)
      return {};
    const ERR_MSG_MAX = 3 * 1024;
    const TRUNC_SUFFIX = "…[truncated]";
    let em = s(ctx.errMsg);
    if (em.length > ERR_MSG_MAX) {
      em = em.slice(0, ERR_MSG_MAX - TRUNC_SUFFIX.length) + TRUNC_SUFFIX;
    }
    return { em };
  }
  function pushFields(ctx) {
    if (ctx.lt !== "101" || !ctx.cid)
      return {};
    return { cid: s(ctx.cid) };
  }
  function build(ctx) {
    const safeCustom = {};
    if (ctx.custom) {
      const reserved = /* @__PURE__ */ new Set([
        "lt",
        "t",
        "sid",
        "cst",
        "did",
        "p",
        "on",
        "mpv",
        "domain",
        "fvts",
        "lvts",
        "tvc",
        "sc"
      ]);
      for (const k of Object.keys(ctx.custom)) {
        if (!reserved.has(k))
          safeCustom[k] = ctx.custom[k];
      }
    }
    const out = { lt: ctx.lt, t: n(ctx.t) };
    Object.assign(out, baseFields(), sessionFields(ctx), pageFields(ctx), entryFields(ctx), visitFields(ctx), launchFields(ctx), errorFields(ctx), pushFields(ctx), safeCustom);
    return out;
  }
  return { build };
}
function normalizeChannelValue(value) {
  if (typeof value === "string")
    return value;
  if (typeof value === "number" && Number.isFinite(value))
    return String(value);
  return "";
}
function getAppChannel() {
  if (!isApp())
    return "";
  const plus = getGlobalObject().plus;
  const raw = tryRun(() => {
    var _a;
    return (_a = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _a === void 0 ? void 0 : _a.channel;
  }, void 0);
  return normalizeChannelValue(raw);
}
let cachedStatic = null;
function getUni$4() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
function mergeWxHostSnapshots() {
  const raw = getRawPlatform();
  if (raw !== "mp-weixin" && raw !== "mp-qq")
    return null;
  const wxHost = getGlobalObject().wx;
  if (!wxHost)
    return null;
  const sync = typeof wxHost.getSystemInfoSync === "function" ? tryRun(() => wxHost.getSystemInfoSync(), null) : null;
  const device = typeof wxHost.getDeviceInfo === "function" ? tryRun(() => wxHost.getDeviceInfo(), null) : null;
  const appBase = typeof wxHost.getAppBaseInfo === "function" ? tryRun(() => wxHost.getAppBaseInfo(), null) : null;
  const windowInfo = typeof wxHost.getWindowInfo === "function" ? tryRun(() => wxHost.getWindowInfo(), null) : null;
  return mergeSystemSnapshots(sync, device, appBase, windowInfo);
}
function mergeSystemSnapshots(...parts) {
  const out = {};
  for (const p2 of parts) {
    if (!p2)
      continue;
    for (const k of Object.keys(p2)) {
      const v = p2[k];
      if (v !== void 0 && v !== null)
        out[k] = v;
    }
  }
  return out;
}
function mergedSystemInfo() {
  const u = getUni$4();
  const sync = u && typeof u.getSystemInfoSync === "function" ? tryRun(() => u.getSystemInfoSync(), null) : null;
  const device = u && typeof u.getDeviceInfo === "function" ? tryRun(() => u.getDeviceInfo(), null) : null;
  const appBase = u && typeof u.getAppBaseInfo === "function" ? tryRun(() => u.getAppBaseInfo(), null) : null;
  const windowInfo = u && typeof u.getWindowInfo === "function" ? tryRun(() => u.getWindowInfo(), null) : null;
  const fromUni = mergeSystemSnapshots(sync, device, appBase, windowInfo);
  const fromWx = mergeWxHostSnapshots();
  const merged = fromWx ? mergeSystemSnapshots(fromUni, fromWx) : fromUni;
  return merged;
}
function resolveUniConfigAppVersion() {
  return tryRun(() => {
    const cfg = getGlobalObject().__uniConfig;
    return typeof (cfg === null || cfg === void 0 ? void 0 : cfg.appVersion) === "string" ? cfg.appVersion : "";
  }, "");
}
function resolveBuildTimeAppVersion() {
  const raw = "";
  return typeof raw === "string" ? raw : "";
}
function resolveAppVersionForStat(plus, sys2) {
  var _a;
  const fromPlus = (_a = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _a === void 0 ? void 0 : _a.version;
  if (typeof fromPlus === "string" && fromPlus)
    return fromPlus;
  const fromSys = sys2.appVersion;
  if (typeof fromSys === "string" && fromSys)
    return fromSys;
  const fromUniConfig = resolveUniConfigAppVersion();
  if (fromUniConfig)
    return fromUniConfig;
  return resolveBuildTimeAppVersion();
}
function buildOnForStat(sys2) {
  const rom = typeof sys2.romName === "string" ? sys2.romName.trim() : "";
  if (rom) {
    const romVer = typeof sys2.romVersion === "string" ? sys2.romVersion.trim() : "";
    return romVer ? `${rom} ${romVer}`.trim() : rom;
  }
  return typeof sys2.osName === "string" ? sys2.osName.trim() : "";
}
function getSystemInfo() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
  if (cachedStatic)
    return cachedStatic;
  const sys2 = mergedSystemInfo();
  const plus = getGlobalObject().plus;
  const appVersion = resolveAppVersionForStat(plus, sys2);
  cachedStatic = {
    brand: (_b = (_a = sys2.deviceBrand) !== null && _a !== void 0 ? _a : sys2.brand) !== null && _b !== void 0 ? _b : "",
    md: (_d = (_c = sys2.deviceModel) !== null && _c !== void 0 ? _c : sys2.model) !== null && _d !== void 0 ? _d : "",
    sv: (_f = (_e = sys2.osVersion) !== null && _e !== void 0 ? _e : sys2.system) !== null && _f !== void 0 ? _f : "",
    v: (_h = (_g = sys2.hostVersion) !== null && _g !== void 0 ? _g : sys2.version) !== null && _h !== void 0 ? _h : "",
    ut: (_j = sys2.deviceType) !== null && _j !== void 0 ? _j : "unknown",
    appVersion,
    appWgtVersion: (_p = (_o = (_l = (_k = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _k === void 0 ? void 0 : _k.appWgtVersion) !== null && _l !== void 0 ? _l : (_m = plus === null || plus === void 0 ? void 0 : plus.runtime) === null || _m === void 0 ? void 0 : _m.appWgtRevision) !== null && _o !== void 0 ? _o : sys2.appWgtVersion) !== null && _p !== void 0 ? _p : "",
    mpvHostVersion: ((_r = (_q = sys2.hostVersion) !== null && _q !== void 0 ? _q : sys2.version) !== null && _r !== void 0 ? _r : "").trim(),
    on: buildOnForStat(sys2),
    sdkVersion: (_t = (_s = sys2.hostSDKVersion) !== null && _s !== void 0 ? _s : sys2.SDKVersion) !== null && _t !== void 0 ? _t : "",
    statusBarHeight: typeof sys2.statusBarHeight === "number" ? sys2.statusBarHeight : 0,
    osP: normalizeStatOsP({
      platform: sys2.platform,
      osName: sys2.osName,
      system: sys2.system
    })
  };
  return cachedStatic;
}
function getLocaleAndScreen() {
  var _a, _b;
  const sys2 = mergedSystemInfo();
  const prRaw = typeof sys2.pixelRatio === "number" ? sys2.pixelRatio : typeof sys2.devicePixelRatio === "number" ? sys2.devicePixelRatio : 1;
  return {
    lang: ((_b = (_a = sys2.hostLanguage) !== null && _a !== void 0 ? _a : sys2.language) !== null && _b !== void 0 ? _b : "").replace(/_/g, "-"),
    ww: typeof sys2.windowWidth === "number" ? sys2.windowWidth : 0,
    wh: typeof sys2.windowHeight === "number" ? sys2.windowHeight : 0,
    sw: typeof sys2.screenWidth === "number" ? sys2.screenWidth : 0,
    sh: typeof sys2.screenHeight === "number" ? sys2.screenHeight : 0,
    pr: prRaw > 0 ? prRaw : 1
  };
}
let cached$1 = null;
function getUni$3() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
function getPlus() {
  return getGlobalObject().plus;
}
function getMpTdaid(platform2) {
  const u = getUni$3();
  switch (platform2) {
    case "wx":
    case "qq": {
      if (typeof (u === null || u === void 0 ? void 0 : u.getAccountInfoSync) === "function") {
        const id = tryRun(() => {
          var _a, _b;
          return (_b = (_a = u.getAccountInfoSync().miniProgram) === null || _a === void 0 ? void 0 : _a.appId) !== null && _b !== void 0 ? _b : "";
        }, "");
        if (id)
          return id;
      }
      const wxHost = getGlobalObject().wx;
      if (typeof (wxHost === null || wxHost === void 0 ? void 0 : wxHost.getAccountInfoSync) === "function") {
        const id2 = tryRun(() => {
          var _a, _b;
          return (_b = (_a = wxHost.getAccountInfoSync().miniProgram) === null || _a === void 0 ? void 0 : _a.appId) !== null && _b !== void 0 ? _b : "";
        }, "");
        if (id2)
          return id2;
      }
      const envId = "touristappid";
      return typeof envId === "string" ? envId : "";
    }
    case "ali":
    case "dt": {
      const my2 = getGlobalObject().my;
      if (!my2)
        return "";
      const v1 = tryRun(() => {
        var _a, _b;
        return (_b = (_a = my2.getAppIdSync) === null || _a === void 0 ? void 0 : _a.call(my2)) !== null && _b !== void 0 ? _b : "";
      }, "");
      if (v1)
        return v1;
      return tryRun(() => {
        var _a, _b, _c;
        return (_c = (_b = (_a = my2.getAccountInfoSync) === null || _a === void 0 ? void 0 : _a.call(my2).miniProgram) === null || _b === void 0 ? void 0 : _b.appId) !== null && _c !== void 0 ? _c : "";
      }, "");
    }
    case "tt":
    case "lark": {
      const tt = getGlobalObject().tt;
      return tryRun(() => {
        var _a, _b, _c;
        return (_c = (_b = (_a = tt === null || tt === void 0 ? void 0 : tt.getEnvInfoSync) === null || _a === void 0 ? void 0 : _a.call(tt).microapp) === null || _b === void 0 ? void 0 : _b.appId) !== null && _c !== void 0 ? _c : "";
      }, "");
    }
    case "bd": {
      const swan = getGlobalObject().swan;
      return tryRun(() => {
        var _a, _b, _c;
        return (_c = (_b = (_a = swan === null || swan === void 0 ? void 0 : swan.getEnvInfoSync) === null || _a === void 0 ? void 0 : _a.call(swan).common) === null || _b === void 0 ? void 0 : _b.appKey) !== null && _c !== void 0 ? _c : "";
      }, "");
    }
    default:
      return "";
  }
}
function getAppPkn() {
  var _a, _b, _c;
  const plus = getPlus();
  if (!plus)
    return "";
  const osName = (_c = (_b = (_a = plus.os) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : "";
  if (osName.includes("android")) {
    return tryRun(() => {
      var _a2, _b2, _c2, _d, _e;
      return (_e = (_d = (_c2 = (_b2 = (_a2 = plus.android) === null || _a2 === void 0 ? void 0 : _a2.runtimeMainActivity) === null || _b2 === void 0 ? void 0 : _b2.call(_a2)) === null || _c2 === void 0 ? void 0 : _c2.getPackageName) === null || _d === void 0 ? void 0 : _d.call(_c2)) !== null && _e !== void 0 ? _e : "";
    }, "");
  }
  if (osName === "ios" || osName === "iphone os") {
    const v = tryRun(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = plus.ios) === null || _a2 === void 0 ? void 0 : _a2.bundleId) !== null && _b2 !== void 0 ? _b2 : "";
    }, "");
    return v || tryRun(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = plus.runtime) === null || _a2 === void 0 ? void 0 : _a2.appid) !== null && _b2 !== void 0 ? _b2 : "";
    }, "");
  }
  return tryRun(() => {
    var _a2, _b2;
    return (_b2 = (_a2 = plus.runtime) === null || _a2 === void 0 ? void 0 : _a2.appid) !== null && _b2 !== void 0 ? _b2 : "";
  }, "");
}
function getAppName() {
  const plus = getPlus();
  if (!plus)
    return "";
  return tryRun(() => {
    var _a, _b;
    return (_b = (_a = plus.runtime) === null || _a === void 0 ? void 0 : _a.appname) !== null && _b !== void 0 ? _b : "";
  }, "") || tryRun(() => {
    var _a, _b;
    return (_b = (_a = plus.runtime) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
  }, "");
}
function getEnvAppName() {
  var _a;
  return (_a = "zzyl-family") !== null && _a !== void 0 ? _a : "";
}
function getH5AppName() {
  const env = getEnvAppName();
  if (env)
    return env;
  return tryRun(() => {
    var _a, _b;
    return (_b = (_a = getGlobalObject().document) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "";
  }, "");
}
function getPackageInfo() {
  if (cached$1)
    return cached$1;
  const platform2 = getPlatform();
  let mpn = "";
  let tdaid = "";
  let pkn = "";
  let an = "";
  if (isApp()) {
    tdaid = tryRun(() => {
      var _a, _b, _c;
      return (_c = (_b = (_a = getPlus()) === null || _a === void 0 ? void 0 : _a.runtime) === null || _b === void 0 ? void 0 : _b.appid) !== null && _c !== void 0 ? _c : "";
    }, "");
    pkn = getAppPkn() || tdaid;
    an = getAppName() || getEnvAppName();
    mpn = pkn || tdaid;
  } else if (isMp()) {
    tdaid = getMpTdaid(platform2);
    pkn = "";
    an = getEnvAppName();
    mpn = tdaid || "touristappid";
  } else if (isH5()) {
    tdaid = "";
    pkn = "";
    an = getH5AppName();
    mpn = "";
  } else {
    tdaid = "";
    pkn = "";
    an = getEnvAppName();
    mpn = "";
  }
  cached$1 = { mpn, tdaid, pkn, an };
  return cached$1;
}
const EMPTY_WEB_INFO = { domain: "" };
let cached = null;
function readWebDomainFromLocation(loc) {
  const protocol = typeof loc.protocol === "string" ? loc.protocol.toLowerCase() : "";
  if (protocol !== "http:" && protocol !== "https:")
    return "";
  if (typeof loc.origin === "string" && loc.origin.trim()) {
    return loc.origin.trim();
  }
  const host2 = typeof loc.host === "string" && loc.host.trim() ? loc.host.trim() : typeof loc.hostname === "string" ? loc.hostname.trim() : "";
  if (!host2)
    return "";
  return `${protocol}//${host2}`;
}
function getWebInfo() {
  if (!isH5())
    return EMPTY_WEB_INFO;
  if (cached !== null)
    return cached;
  cached = tryRun(() => {
    const win = getGlobalObject();
    const loc = win.location;
    if (!loc)
      return EMPTY_WEB_INFO;
    return { domain: readWebDomainFromLocation(loc) };
  }, EMPTY_WEB_INFO);
  return cached;
}
const registry = /* @__PURE__ */ new Map();
const installedFanout = /* @__PURE__ */ new Map();
function add(api, handlers) {
  var _a;
  const set2 = (_a = registry.get(api)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
  set2.add(handlers);
  registry.set(api, set2);
  reinstall(api);
  return () => {
    const cur = registry.get(api);
    if (!cur)
      return;
    cur.delete(handlers);
    if (cur.size === 0) {
      registry.delete(api);
      const prev = installedFanout.get(api);
      installedFanout.delete(api);
      if (prev) {
        try {
          getUni$2().removeInterceptor(api, prev);
        } catch (_a2) {
        }
      }
    } else {
      reinstall(api);
    }
  };
}
function buildFanout(set2) {
  return {
    invoke(args) {
      let blocked = false;
      for (const h of set2) {
        if (!h.invoke)
          continue;
        const r = h.invoke(args);
        if (r === false)
          blocked = true;
      }
      return blocked ? false : void 0;
    },
    success(res) {
      var _a;
      for (const h of set2)
        (_a = h.success) === null || _a === void 0 ? void 0 : _a.call(h, res);
    },
    fail(err) {
      var _a;
      for (const h of set2)
        (_a = h.fail) === null || _a === void 0 ? void 0 : _a.call(h, err);
    },
    complete(res) {
      var _a;
      for (const h of set2)
        (_a = h.complete) === null || _a === void 0 ? void 0 : _a.call(h, res);
    },
    returnValue(res) {
      let v = res;
      for (const h of set2) {
        if (!h.returnValue)
          continue;
        v = h.returnValue(v);
      }
      return v;
    }
  };
}
function reinstall(api) {
  const set2 = registry.get(api);
  if (!set2 || set2.size === 0)
    return;
  const fanout = buildFanout(set2);
  try {
    const uni2 = getUni$2();
    const prev = installedFanout.get(api);
    if (prev) {
      try {
        uni2.removeInterceptor(api, prev);
      } catch (_a) {
      }
    }
    uni2.addInterceptor(api, fanout);
    installedFanout.set(api, fanout);
  } catch (_b) {
  }
}
function getUni$2() {
  const raw = resolveUniRuntime();
  const u = raw != null && typeof raw === "object" ? raw : void 0;
  if (!u)
    throw new Error("[uni统计 2.0] uni interceptor API is not available");
  return u;
}
function __reset() {
  registry.clear();
  installedFanout.clear();
}
const interceptor = { add, __reset };
function registerLoginInterceptor(reporter) {
  return interceptor.add("login", {
    complete() {
      reporter.report({ lt: LT.Event, custom: { e_n: "login" } });
    }
  });
}
function registerNavigationBarInterceptor() {
  return interceptor.add("setNavigationBarTitle", {
    invoke(args) {
      const a = args;
      if (a && "title" in a)
        setPageTitle(a.title);
    }
  });
}
function registerPaymentInterceptor(reporter) {
  return interceptor.add("requestPayment", {
    success() {
      reporter.report({ lt: LT.Event, custom: { e_n: "pay_success" } });
    },
    fail() {
      reporter.report({ lt: LT.Event, custom: { e_n: "pay_fail" } });
    }
  });
}
function registerShareInterceptor(reporter) {
  const fire = () => reporter.report({ lt: LT.Event, custom: { e_n: "share" } });
  return interceptor.add("share", {
    success() {
      fire();
    },
    fail() {
      fire();
    }
  });
}
function installAllInterceptors(reporter) {
  const unbinders = [
    registerLoginInterceptor(reporter),
    registerShareInterceptor(reporter),
    registerPaymentInterceptor(reporter),
    registerNavigationBarInterceptor()
  ];
  return () => {
    for (const u of unbinders) {
      try {
        u();
      } catch (_a) {
      }
    }
  };
}
const KEY_DONE = "migration:done";
const KEY_MAP = [
  ["__first__visit__time", "visit:fvts"],
  ["__last__visit__time", "visit:lvts"],
  ["__total__visit__count", "visit:tvc"]
];
function getAppId() {
  const id = "touristappid";
  if (id.length > 0)
    return id;
  return "default";
}
function readLegacyAggregate() {
  const u = resolveUniRuntime();
  if (!u || typeof u.getStorageSync !== "function")
    return null;
  const key = `${LEGACY_NAMESPACE_ROOT}:${getAppId()}`;
  const raw = tryRun(() => u.getStorageSync(key), null);
  if (raw && typeof raw === "object")
    return raw;
  return null;
}
let ran = false;
function migrateLegacyData() {
  if (ran)
    return false;
  ran = true;
  const doneR = storage.safeRead(KEY_DONE);
  if (doneR.ok && doneR.value)
    return false;
  const legacy = readLegacyAggregate();
  if (!legacy) {
    storage.set(KEY_DONE, 1);
    return false;
  }
  let migrated = 0;
  for (let i = 0; i < KEY_MAP.length; i++) {
    const [oldKey, newKey] = KEY_MAP[i];
    if (!(oldKey in legacy))
      continue;
    const value = legacy[oldKey];
    const existing = storage.safeRead(newKey);
    if (existing.ok && existing.value !== void 0)
      continue;
    storage.set(newKey, value);
    migrated++;
  }
  storage.set(KEY_DONE, 1);
  if (migrated > 0) {
    logger.info("[uni统计 2.0] migrated legacy keys", migrated);
  }
  return migrated > 0;
}
function selectChannel(opts) {
  var _a;
  const version2 = (_a = opts.version) !== null && _a !== void 0 ? _a : "image";
  const fallback = opts.fallbackToHttp !== false;
  if (version2 === "1") {
    if (opts.http && opts.http.available())
      return opts.http;
    return void 0;
  }
  if (version2 === "2") {
    if (opts.cloud && opts.cloud.available())
      return opts.cloud;
    if (!fallback) {
      logger.warn("[uni统计 2.0] 云函数上报不可用且已关闭 HTTP 兜底，本批已丢弃");
      return void 0;
    }
    if (opts.http && opts.http.available()) {
      logger.warn("[uni统计 2.0] 云函数上报不可用，已降级为 HTTP 上报");
      return opts.http;
    }
    logger.warn("[uni统计 2.0] 无可用上报线路");
    return void 0;
  }
  if (opts.image && opts.image.available())
    return opts.image;
  if (!fallback) {
    if (opts.image) {
      logger.warn("[uni统计 2.0] 统计上报线路不可用且已关闭 HTTP 兜底，本批已丢弃");
    }
    return void 0;
  }
  if (opts.http && opts.http.available()) {
    if (opts.image) {
      logger.warn("[uni统计 2.0] 统计上报线路不可用，已降级为 HTTP 上报");
    }
    return opts.http;
  }
  logger.warn("[uni统计 2.0] 无可用上报线路");
  return void 0;
}
const DEFAULT_RESULT = { net: "unknown", raw: "" };
const NET_MAP = {
  wifi: "wifi",
  "2g": "2g",
  "3g": "3g",
  "4g": "4g",
  "5g": "5g",
  ethernet: "ethernet",
  none: "none",
  unknown: "unknown"
};
function getUni$1() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
function normalizeNet(raw) {
  var _a;
  if (typeof raw !== "string" || raw.length === 0)
    return "unknown";
  return (_a = NET_MAP[raw.toLowerCase()]) !== null && _a !== void 0 ? _a : "unknown";
}
function getNet(timeoutMs = 1500) {
  return new Promise((resolve2) => {
    const u = getUni$1();
    if (!u || typeof u.getNetworkType !== "function") {
      resolve2(DEFAULT_RESULT);
      return;
    }
    let settled = false;
    const finish = (r) => {
      if (settled)
        return;
      settled = true;
      resolve2(r);
    };
    const timer = setTimeout(() => finish(DEFAULT_RESULT), timeoutMs);
    tryRun(() => u.getNetworkType({
      success: (res) => {
        var _a;
        clearTimeout(timer);
        const raw = (_a = res === null || res === void 0 ? void 0 : res.networkType) !== null && _a !== void 0 ? _a : "";
        finish({ net: normalizeNet(raw), raw });
      },
      fail: () => {
        clearTimeout(timer);
        finish(DEFAULT_RESULT);
      }
    }), void 0);
  });
}
function onChange(cb) {
  const u = getUni$1();
  if (!u || typeof u.onNetworkStatusChange !== "function") {
    return () => {
    };
  }
  const wrapped = (res) => {
    var _a;
    const raw = (_a = res === null || res === void 0 ? void 0 : res.networkType) !== null && _a !== void 0 ? _a : "";
    const net = (res === null || res === void 0 ? void 0 : res.isConnected) === false ? "none" : normalizeNet(raw);
    tryRun(() => cb({ net, raw }), void 0);
  };
  tryRun(() => u.onNetworkStatusChange(wrapped), void 0);
  return () => {
    if (typeof u.offNetworkStatusChange === "function") {
      tryRun(() => u.offNetworkStatusChange(wrapped), void 0);
    }
  };
}
function isOfflineNetResult(r) {
  return r.net === "none";
}
function isNetworkOffline() {
  return __awaiter(this, void 0, void 0, function* () {
    const r = yield getNet();
    return isOfflineNetResult(r);
  });
}
function onNetworkOnline(cb) {
  return onChange((r) => {
    if (isOfflineNetResult(r))
      return;
    cb();
  });
}
const STORAGE_KEY$1 = "queue";
const DEFAULT_SINGLE_EVENT_MAX_BYTES = SINGLE_EVENT_MAX_BYTES;
const state = {
  bucket: {},
  lastFlushAt: 0
};
let intervalSec = REPORT_INTERVAL_SEC;
let singleEventMaxBytes = DEFAULT_SINGLE_EVENT_MAX_BYTES;
let maxEvents = QUEUE_MAX_EVENTS;
let restored = false;
let capacityWarned = false;
function configure(opts) {
  if (typeof opts.intervalSec === "number" && opts.intervalSec >= 0) {
    intervalSec = Math.floor(opts.intervalSec);
  }
  if (typeof opts.singleEventMaxBytes === "number" && opts.singleEventMaxBytes > 0) {
    singleEventMaxBytes = Math.floor(opts.singleEventMaxBytes);
  }
  if (typeof opts.maxEvents === "number" && opts.maxEvents > 0) {
    maxEvents = Math.floor(opts.maxEvents);
  }
}
function enforceCapacity() {
  let total = size();
  if (total <= maxEvents) {
    capacityWarned = false;
    return;
  }
  const dropped = total - maxEvents;
  while (total > maxEvents) {
    let largestLt = "";
    let largestLen = 0;
    for (const lt of Object.keys(state.bucket)) {
      const len = state.bucket[lt].length;
      if (len > largestLen) {
        largestLen = len;
        largestLt = lt;
      }
    }
    if (!largestLt || largestLen === 0)
      break;
    state.bucket[largestLt].shift();
    if (state.bucket[largestLt].length === 0)
      delete state.bucket[largestLt];
    total--;
  }
  if (!capacityWarned) {
    capacityWarned = true;
    logger.warn("[uni统计 2.0] 上报队列超过容量上限，已丢弃最旧事件", "dropped=" + dropped, "limit=" + maxEvents);
  }
}
function persistBucket() {
  if (Object.keys(state.bucket).length === 0) {
    storage.remove(STORAGE_KEY$1);
    return;
  }
  try {
    storage.set(STORAGE_KEY$1, state.bucket);
  } catch (e2) {
    logger.warn("[uni统计 2.0] queue persist failed", e2);
  }
}
function restoreOnce() {
  if (restored)
    return;
  restored = true;
  const raw = storage.safeRead(STORAGE_KEY$1);
  if (!raw.ok || !raw.value || typeof raw.value !== "object")
    return;
  const persisted = raw.value;
  for (const lt of Object.keys(persisted)) {
    const arr = persisted[lt];
    if (!Array.isArray(arr) || arr.length === 0)
      continue;
    if (!state.bucket[lt])
      state.bucket[lt] = [];
    state.bucket[lt].push(...arr);
  }
}
function enqueue(data) {
  var _a;
  if (!data || typeof data !== "object")
    return;
  const lt = String((_a = data.lt) !== null && _a !== void 0 ? _a : "");
  if (!lt) {
    logger.warn("[uni统计 2.0] enqueue dropped: missing lt", data);
    return;
  }
  let serialized = "";
  try {
    serialized = JSON.stringify(data);
  } catch (e2) {
    logger.warn("[uni统计 2.0] enqueue dropped: stringify failed", e2);
    return;
  }
  if (serialized.length > singleEventMaxBytes) {
    logger.warn("[uni统计 2.0] enqueue dropped: single event too large", "lt=" + lt, "bytes=" + serialized.length, "limit=" + singleEventMaxBytes);
    return;
  }
  restoreOnce();
  if (!state.bucket[lt])
    state.bucket[lt] = [];
  state.bucket[lt].push(data);
  enforceCapacity();
  persistBucket();
}
function shouldFlush(force = false) {
  if (force)
    return true;
  if (intervalSec <= 0)
    return true;
  const elapsedSec = (nowMs() - state.lastFlushAt) / 1e3;
  return elapsedSec >= intervalSec;
}
function flush() {
  restoreOnce();
  const lts = Object.keys(state.bucket);
  if (lts.length === 0)
    return void 0;
  const snapshot = state.bucket;
  state.bucket = {};
  state.lastFlushAt = nowMs();
  storage.remove(STORAGE_KEY$1);
  return snapshot;
}
function rollback(snapshot) {
  if (!snapshot)
    return;
  for (const lt of Object.keys(snapshot)) {
    const arr = snapshot[lt];
    if (!Array.isArray(arr) || arr.length === 0)
      continue;
    if (!state.bucket[lt])
      state.bucket[lt] = [];
    state.bucket[lt] = arr.concat(state.bucket[lt]);
  }
  enforceCapacity();
  persistBucket();
}
function size() {
  let n2 = 0;
  for (const lt of Object.keys(state.bucket)) {
    n2 += state.bucket[lt].length;
  }
  return n2;
}
const STORAGE_KEY = "retry:queue";
const DEFAULT_MAX_ITEMS = 50;
const DEFAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
const DEFAULT_MAX_ATTEMPTS = RETRY_MAX_ATTEMPTS;
const config = {
  maxItems: DEFAULT_MAX_ITEMS,
  maxAgeMs: DEFAULT_MAX_AGE_MS,
  maxAttempts: DEFAULT_MAX_ATTEMPTS
};
function readQueue() {
  const raw = storage.safeRead(STORAGE_KEY);
  if (!raw.ok || !Array.isArray(raw.value))
    return [];
  return raw.value.filter((it) => it && typeof it.id === "string" && it.payload && typeof it.payload === "object");
}
function writeQueue(items) {
  if (items.length === 0) {
    storage.remove(STORAGE_KEY);
    return;
  }
  storage.set(STORAGE_KEY, items);
}
function genId(payload) {
  if (payload._id)
    return payload._id;
  return "r-" + nowMs().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}
function persist(payload) {
  if (!payload)
    return void 0;
  const id = genId(payload);
  const items = readQueue();
  if (items.some((it) => it.id === id)) {
    return id;
  }
  const item = {
    id,
    payload: Object.assign({}, payload, { _id: id }),
    createdAt: nowMs(),
    attempts: 0
  };
  items.push(item);
  while (items.length > config.maxItems) {
    const dropped = items.shift();
    logger.warn("[uni统计 2.0] retry queue overflow, drop oldest", dropped === null || dropped === void 0 ? void 0 : dropped.id);
  }
  writeQueue(items);
  return id;
}
function loadAll() {
  const items = readQueue();
  if (items.length === 0)
    return [];
  const cutoff = nowMs() - config.maxAgeMs;
  const alive = [];
  for (const it of items) {
    if (it.createdAt < cutoff) {
      logger.warn("[uni统计 2.0] retry item expired, drop", it.id);
      continue;
    }
    alive.push(it);
  }
  if (alive.length !== items.length)
    writeQueue(alive);
  return alive.map((it) => it.payload);
}
function ack(id) {
  if (!id)
    return;
  const items = readQueue();
  const next = items.filter((it) => it.id !== id);
  if (next.length === items.length)
    return;
  writeQueue(next);
}
function markAttempt(id) {
  if (!id)
    return;
  const items = readQueue();
  let nextItems = null;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it.id !== id)
      continue;
    it.attempts++;
    if (it.attempts >= config.maxAttempts) {
      logger.warn("[uni统计 2.0] retry item exceeded maxAttempts, drop as dead letter", id, "attempts=" + it.attempts);
      nextItems = items.slice(0, i).concat(items.slice(i + 1));
    } else {
      nextItems = items;
    }
    break;
  }
  if (nextItems)
    writeQueue(nextItems);
}
let instance = null;
class StatApp {
  constructor() {
    this.installed = false;
    this.statVersion = "image";
  }
  static getInstance() {
    if (!instance)
      instance = new StatApp();
    return instance;
  }
  /**
   * 一次性装配。重复调用直接返回。
   *
   * @param config 业务配置；缺省值兼容私有版默认行为。
   * @param overrides 测试钩子。
   */
  install(config2 = {}, overrides = {}) {
    var _a, _b, _c, _d, _e;
    if (this.installed)
      return;
    const cfg = this.normalizeConfig(config2);
    this.config = cfg;
    this.statVersion = cfg.version;
    tryRun(() => configure$1({
      backgroundTimeoutSec: cfg.backgroundTimeoutSec,
      pageInactiveTimeoutSec: cfg.pageInactiveTimeoutSec
    }), void 0);
    tryRun(() => configure({ intervalSec: cfg.reportIntervalSec }), void 0);
    if (!overrides.skipMigration) {
      tryRun(() => migrateLegacyData(), false);
    }
    tryRun(() => loadVisitSnapshot(), void 0);
    this.httpChannel = (_b = (_a = overrides.channels) === null || _a === void 0 ? void 0 : _a.http) !== null && _b !== void 0 ? _b : createHttpChannel({ ut: getPlatform(), maxRetries: HTTP_MAX_RETRIES });
    if (overrides.channels && "cloud" in overrides.channels) {
      this.cloudChannel = (_c = overrides.channels.cloud) !== null && _c !== void 0 ? _c : void 0;
    } else if (this.statVersion === "2") {
      this.cloudChannel = createCloudChannel({ maxRetries: CLOUD_MAX_RETRIES });
    } else {
      this.cloudChannel = void 0;
    }
    if (overrides.channels && "image" in overrides.channels) {
      this.imageChannel = (_d = overrides.channels.image) !== null && _d !== void 0 ? _d : void 0;
    } else if (this.statVersion === "image") {
      this.imageChannel = createImageChannel({
        host: IMAGE_REPORT_DEFAULTS.host,
        projectId: IMAGE_REPORT_DEFAULTS.projectId,
        topicId: IMAGE_REPORT_DEFAULTS.topicId,
        maxRetries: IMAGE_MAX_RETRIES,
        ut: getPlatform(),
        rawPlatform: getRawPlatform()
      });
    } else {
      this.imageChannel = void 0;
    }
    this.collectorDeps = this.buildCollectorDeps(cfg, (_e = overrides.collectorDepsPatch) !== null && _e !== void 0 ? _e : {});
    this.collector = createCollector(this.collectorDeps);
    if (!overrides.skipInterceptors) {
      const c = this.collector;
      this.uninstallInterceptors = tryRun(() => installAllInterceptors({ report: (i) => c.report(i) }), void 0);
    }
    if (!overrides.skipRecoverRetry) {
      void this.collector.recoverRetry().catch((e2) => logger.warn("[uni统计 2.0] recoverRetry failed", e2));
    }
    this.uninstallNetworkWatch = tryRun(() => onNetworkOnline(() => {
      const c = this.collector;
      if (!c)
        return;
      void c.recoverRetry().catch((e2) => logger.warn("[uni统计 2.0] recoverRetry on online failed", e2));
      void c.flush(true).catch((e2) => logger.warn("[uni统计 2.0] flush on online failed", e2));
    }), void 0);
    this.installed = true;
  }
  /**
   * 业务侧 `uni.report(type, value)` 入口。
   *
   * 兼容私有版语义：
   *   - `type === 'title'` → 写 reportTitle，不发事件；下次 lt=11 / lt=3 携带 `ttc`。
   *   - 其他 type → 自定义事件 lt=21，custom `{ e_n: type, e_v: value }`。
   */
  report(type2, value) {
    if (!this.installed || !this.collector)
      return;
    if (type2 === "title") {
      setReportTitle(value);
      return;
    }
    const ev = typeof value === "object" && value !== null ? tryRun(() => JSON.stringify(value), "") : value === void 0 ? "" : String(value);
    this.collector.report({
      lt: LT.Event,
      custom: { e_n: type2, e_v: ev }
    });
  }
  /** 上报 onError 捕获的错误。 */
  reportError(err) {
    var _a;
    if (!this.installed || !this.collector)
      return;
    const errMsg = err instanceof Error ? `${err.name}: ${err.message}
${(_a = err.stack) !== null && _a !== void 0 ? _a : ""}` : typeof err === "string" ? err : tryRun(() => JSON.stringify(err), "");
    this.collector.report({ lt: LT.Error, errMsg });
  }
  /** 取 collector，供 lifecycleHooks 调度生命周期事件。 */
  getCollector() {
    return this.collector;
  }
  /** 取 deps（测试用）。 */
  getDeps() {
    return this.collectorDeps;
  }
  /** 是否已 install。 */
  isInstalled() {
    return this.installed;
  }
  /** 当前协议版本。 */
  getStatVersion() {
    return this.statVersion;
  }
  /** 当前生效配置（含默认值合并），测试用。 */
  getConfig() {
    return this.config;
  }
  /**
   * 卸载（测试 / hot reload）。
   *
   * 解绑全部拦截器、清空内部句柄。**不**清外部模块（queue/visit/session）状态，
   * 那些由各自的 `__reset*` 在测试 setup 中处理。
   */
  uninstall() {
    if (this.uninstallInterceptors) {
      tryRun(() => this.uninstallInterceptors(), void 0);
    }
    this.uninstallInterceptors = void 0;
    if (this.uninstallNetworkWatch) {
      tryRun(() => this.uninstallNetworkWatch(), void 0);
    }
    this.uninstallNetworkWatch = void 0;
    if (this.collector) {
      tryRun(() => this.collector.destroy(), void 0);
    }
    this.collector = void 0;
    this.collectorDeps = void 0;
    this.httpChannel = void 0;
    this.cloudChannel = void 0;
    this.imageChannel = void 0;
    this.config = void 0;
    this.installed = false;
  }
  /**
   * 解析上行渠道字段 `ch`。
   *
   * 优先级：显式配置（manifest / install 入参）> `plus.runtime.channel`（云打包渠道包）> `''`。
   * 与私有版一致，默认从原生运行时读取；仅当业务方显式传入非空 `ch` 时才覆盖。
   */
  resolveChannel(explicit) {
    if (typeof explicit === "string" && explicit.length > 0) {
      return explicit;
    }
    return getAppChannel();
  }
  normalizeConfig(c) {
    var _a, _b, _c, _d;
    return {
      ak: (_a = c.ak) !== null && _a !== void 0 ? _a : getAppId$1(),
      v: c.v,
      ch: this.resolveChannel(c.ch),
      version: (_b = c.version) !== null && _b !== void 0 ? _b : "image",
      backgroundTimeoutSec: (_c = c.backgroundTimeoutSec) !== null && _c !== void 0 ? _c : 300,
      pageInactiveTimeoutSec: (_d = c.pageInactiveTimeoutSec) !== null && _d !== void 0 ? _d : 1800,
      reportIntervalSec: typeof c.reportIntervalSec === "number" ? c.reportIntervalSec : REPORT_INTERVAL_SEC,
      // collectItems 默认值与私有版严格对齐：push 默认关闭、页面日志默认开启
      enablePush: c.enablePush === true,
      enablePageLog: c.enablePageLog !== false
    };
  }
  /**
   * 构建 collector 依赖。所有 adapter 调用都包了 `tryRun`，避免单端缺失 API 导致
   * install 失败。
   */
  buildCollectorDeps(cfg, patch2) {
    const platformShort = getPlatform();
    const builder = createStatDataBuilder({
      config: { ak: cfg.ak, usv: STAT_VERSION_PUBLIC, v: cfg.v, ch: cfg.ch },
      platform: {
        ut: platformShort
      },
      system: tryRun(() => getSystemInfo(), {
        brand: "",
        md: "",
        sv: "",
        v: "",
        ut: "unknown",
        appVersion: "",
        appWgtVersion: "",
        mpvHostVersion: "",
        on: "",
        sdkVersion: "",
        statusBarHeight: 0,
        osP: ""
      }),
      locale: tryRun(() => getLocaleAndScreen(), {
        lang: "",
        ww: 0,
        wh: 0,
        sw: 0,
        sh: 0,
        pr: 1
      }),
      device: {
        // 惰性解析：每次 build 时再调 getUuid()，避免 install 过早（uni 运行时未就绪）冻结临时值。
        get uuid() {
          return tryRun(() => getUuid(), "");
        }
      },
      net: { net: "unknown", raw: "" },
      location: { lat: "", lng: "", ok: false },
      pkg: tryRun(() => getPackageInfo(), {
        mpn: "",
        tdaid: "",
        pkn: "",
        an: ""
      }),
      web: tryRun(() => getWebInfo(), { domain: "" })
    });
    const base = {
      builder,
      queue: {
        enqueue,
        flush,
        rollback,
        shouldFlush
      },
      serializer: { handleData },
      selectChannel: () => selectChannel({
        version: this.statVersion,
        http: this.httpChannel,
        cloud: this.cloudChannel,
        image: this.imageChannel
      }),
      retry: {
        persist,
        loadAll,
        ack,
        markAttempt
      },
      visit: {
        commitVisitOnAck,
        rollbackPendingVisit
      },
      session: {
        getSnapshot,
        nextSeq,
        touch
      },
      config: { usv: STAT_VERSION_PUBLIC },
      nowMs,
      nowSec,
      firstFlushDeferMs: getRawPlatform() === "mp-weixin" && MP_WEIXIN_USE_PRELOAD_ASSETS_REPORT ? MP_WEIXIN_PRELOAD_FIRST_FLUSH_DELAY_MS : 0,
      isNetworkOffline
    };
    return Object.assign(base, patch2);
  }
}
function getStatApp() {
  return StatApp.getInstance();
}
function parseInjectedUniStatistics() {
  const raw = "{}";
  const trimmed = raw.trim();
  if (!trimmed || trimmed === "undefined")
    return void 0;
  try {
    const obj = JSON.parse(trimmed);
    if (!obj || typeof obj !== "object" || Array.isArray(obj))
      return void 0;
    return obj;
  } catch (_e) {
    return void 0;
  }
}
function readManifestStatConfig() {
  try {
    const obj = parseInjectedUniStatistics();
    if (!obj)
      return void 0;
    const cfg = {};
    if (obj.channelVersion != null) {
      const v = String(obj.channelVersion);
      if (v === "1" || v === "2" || v === "image")
        cfg.version = v;
    }
    const bg = pickPositiveNumber(obj.backgroundTimeout, obj.backgroundTimeoutSec);
    if (bg !== void 0)
      cfg.backgroundTimeoutSec = bg;
    const pi = pickPositiveNumber(obj.pageInactiveTimeout, obj.pageInactiveTimeoutSec);
    if (pi !== void 0)
      cfg.pageInactiveTimeoutSec = pi;
    const ri = pickNonNegativeNumber(obj.reportInterval, obj.reportIntervalSec);
    if (ri !== void 0)
      cfg.reportIntervalSec = ri;
    if (obj.collectItems && typeof obj.collectItems === "object") {
      const items = obj.collectItems;
      if (typeof items.uniPushClientID === "boolean") {
        cfg.enablePush = items.uniPushClientID;
      }
      if (typeof items.uniStatPageLog === "boolean") {
        cfg.enablePageLog = items.uniStatPageLog;
      }
    }
    if (typeof obj.ak === "string" && obj.ak)
      cfg.ak = obj.ak;
    if (typeof obj.v === "string")
      cfg.v = obj.v;
    if (typeof obj.ch === "string")
      cfg.ch = obj.ch;
    return Object.keys(cfg).length > 0 ? cfg : void 0;
  } catch (e2) {
    logger.warn("[uni统计 2.0] readManifestStatConfig failed", e2);
    return void 0;
  }
}
function normalizePositiveNumber(value) {
  if (typeof value === "number") {
    return value > 0 ? value : void 0;
  }
  if (typeof value === "string") {
    const t2 = value.trim();
    if (t2 === "")
      return void 0;
    const n2 = Number(t2);
    if (Number.isFinite(n2) && n2 > 0)
      return n2;
  }
  return void 0;
}
function normalizeNonNegativeNumber(value) {
  if (typeof value === "number") {
    return value >= 0 ? value : void 0;
  }
  if (typeof value === "string") {
    const t2 = value.trim();
    if (t2 === "")
      return void 0;
    const n2 = Number(t2);
    if (Number.isFinite(n2) && n2 >= 0)
      return n2;
  }
  return void 0;
}
function pickPositiveNumber(...candidates) {
  for (const c of candidates) {
    const n2 = normalizePositiveNumber(c);
    if (n2 !== void 0)
      return n2;
  }
  return void 0;
}
function pickNonNegativeNumber(...candidates) {
  for (const c of candidates) {
    const n2 = normalizeNonNegativeNumber(c);
    if (n2 !== void 0)
      return n2;
  }
  return void 0;
}
function getUni() {
  const u = resolveUniRuntime();
  return u != null && typeof u === "object" ? u : void 0;
}
const UNI_HOOK_RETRY_MAX = 20;
const UNI_HOOK_RETRY_MS = 50;
let vueMixinMounted = false;
let vueMixinRetryTimer;
let bootstrapped = false;
let uniHookRetryTimer;
function installPublicStat(opts = {}) {
  if (bootstrapped)
    return;
  bootstrapped = true;
  const fromManifest = readManifestStatConfig();
  const finalConfig = Object.assign({}, fromManifest, opts.config);
  const app = getStatApp();
  tryRun(() => app.install(finalConfig, opts.overrides), void 0);
  tryRun(() => {
    var _a, _b, _c;
    const cfgBoot = app.getConfig();
    const appName = "zzyl-family";
    const injected = parseInjectedUniStatistics();
    const bootBase = {
      channel: (_a = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.version) !== null && _a !== void 0 ? _a : "image",
      reportIntervalSec: (_b = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.reportIntervalSec) !== null && _b !== void 0 ? _b : 0,
      ak: (_c = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.ak) !== null && _c !== void 0 ? _c : "",
      appName,
      debugFromManifest: "false" === true
    };
    if (injected != null) {
      if (injected.backgroundTimeout != null || injected.backgroundTimeoutSec != null) {
        bootBase.backgroundTimeoutSec = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.backgroundTimeoutSec;
      }
      if (injected.pageInactiveTimeout != null || injected.pageInactiveTimeoutSec != null) {
        bootBase.pageInactiveTimeoutSec = cfgBoot === null || cfgBoot === void 0 ? void 0 : cfgBoot.pageInactiveTimeoutSec;
      }
    }
    logBoot(Object.assign({}, bootBase, { vueMode: "Vue3" }));
  }, void 0);
  const finishLifecycleInstall = () => {
    var _a, _b;
    const cfg = app.getConfig();
    const lifecycleOpts = Object.assign({}, {
      enablePush: (_a = cfg === null || cfg === void 0 ? void 0 : cfg.enablePush) !== null && _a !== void 0 ? _a : false,
      enablePageLog: (_b = cfg === null || cfg === void 0 ? void 0 : cfg.enablePageLog) !== null && _b !== void 0 ? _b : true
    }, opts.lifecycle);
    const { mixin: mixin2 } = bindLifecycle(app, lifecycleOpts);
    if (!opts.skipVueMixin) {
      tryRun(() => mountVueMixin(mixin2), void 0);
    }
    if (!opts.skipUniReport) {
      tryRun(() => mountUniReport(app), void 0);
    }
    if (shouldBindUniAppLifecycle() && !tryBindUniAppLifecycle(app, lifecycleOpts)) {
      scheduleUniAppHookRetry(() => tryBindUniAppLifecycle(app, lifecycleOpts));
    }
  };
  finishLifecycleInstall();
}
function scheduleUniAppHookRetry(tryBind) {
  if (uniHookRetryTimer) {
    clearTimeout(uniHookRetryTimer);
    uniHookRetryTimer = void 0;
  }
  let attempts = 0;
  const tick = () => {
    if (tryBind())
      return;
    if (++attempts >= UNI_HOOK_RETRY_MAX) {
      logger.warn("[uni统计 2.0] Vue3 小程序：uni.onAppShow 暂不可用，应用前后台统计可能缺失");
      return;
    }
    uniHookRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
  };
  uniHookRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
}
function tryRegisterVueAppMixin(mixin2) {
  try {
    ;
    index$1.onCreateVueApp((vueApp2) => {
      tryRun(() => vueApp2.mixin(mixin2), void 0);
    });
    return true;
  } catch (_e) {
  }
  const u = getUni();
  if (u && typeof u.onCreateVueApp === "function") {
    u.onCreateVueApp((vueApp2) => {
      tryRun(() => vueApp2.mixin(mixin2), void 0);
    });
    return true;
  }
  return false;
}
function mountVueMixin(mixin2) {
  if (vueMixinMounted)
    return;
  if (tryRegisterVueAppMixin(mixin2)) {
    vueMixinMounted = true;
    return;
  }
  scheduleVueAppMixinRetry(mixin2);
}
function scheduleVueAppMixinRetry(mixin2) {
  if (vueMixinMounted)
    return;
  if (vueMixinRetryTimer)
    return;
  let attempts = 0;
  const tick = () => {
    vueMixinRetryTimer = void 0;
    if (vueMixinMounted)
      return;
    if (tryRegisterVueAppMixin(mixin2)) {
      vueMixinMounted = true;
      return;
    }
    if (++attempts >= UNI_HOOK_RETRY_MAX) {
      if (!vueMixinMounted) {
        logger.warn("[uni统计 2.0] Vue3: onCreateVueApp 在重试后仍不可用，页面级 mixin 未注入");
      }
      return;
    }
    vueMixinRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
  };
  vueMixinRetryTimer = setTimeout(tick, UNI_HOOK_RETRY_MS);
}
function mountUniReport(app) {
  var _a;
  const g = getGlobalObject();
  const u = (_a = getUni()) !== null && _a !== void 0 ? _a : g.uni;
  if (!u || typeof u !== "object")
    return;
  u.report = (type2, value) => {
    app.report(type2, value);
  };
}
installPublicStat();
const createLifeCycleHook = (lifecycle, flag2 = 0) => (hook, target = getCurrentInstance()) => {
  if (isInSSRComponentSetup)
    return;
  injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createLifeCycleHook(
  ON_SHOW,
  2
  /* HookFlags.PAGE */
);
const onUnload = /* @__PURE__ */ createLifeCycleHook(
  ON_UNLOAD,
  2
  /* HookFlags.PAGE */
);
const onPullDownRefresh = /* @__PURE__ */ createLifeCycleHook(
  ON_PULL_DOWN_REFRESH,
  2
  /* HookFlags.PAGE */
);
const icons = {
  "uicon-level": "",
  "uicon-column-line": "",
  "uicon-checkbox-mark": "",
  "uicon-folder": "",
  "uicon-movie": "",
  "uicon-star-fill": "",
  "uicon-star": "",
  "uicon-phone-fill": "",
  "uicon-phone": "",
  "uicon-apple-fill": "",
  "uicon-chrome-circle-fill": "",
  "uicon-backspace": "",
  "uicon-attach": "",
  "uicon-cut": "",
  "uicon-empty-car": "",
  "uicon-empty-coupon": "",
  "uicon-empty-address": "",
  "uicon-empty-favor": "",
  "uicon-empty-permission": "",
  "uicon-empty-news": "",
  "uicon-empty-search": "",
  "uicon-github-circle-fill": "",
  "uicon-rmb": "",
  "uicon-person-delete-fill": "",
  "uicon-reload": "",
  "uicon-order": "",
  "uicon-server-man": "",
  "uicon-search": "",
  "uicon-fingerprint": "",
  "uicon-more-dot-fill": "",
  "uicon-scan": "",
  "uicon-share-square": "",
  "uicon-map": "",
  "uicon-map-fill": "",
  "uicon-tags": "",
  "uicon-tags-fill": "",
  "uicon-bookmark-fill": "",
  "uicon-bookmark": "",
  "uicon-eye": "",
  "uicon-eye-fill": "",
  "uicon-mic": "",
  "uicon-mic-off": "",
  "uicon-calendar": "",
  "uicon-calendar-fill": "",
  "uicon-trash": "",
  "uicon-trash-fill": "",
  "uicon-play-left": "",
  "uicon-play-right": "",
  "uicon-minus": "",
  "uicon-plus": "",
  "uicon-info": "",
  "uicon-info-circle": "",
  "uicon-info-circle-fill": "",
  "uicon-question": "",
  "uicon-error": "",
  "uicon-close": "",
  "uicon-checkmark": "",
  "uicon-android-circle-fill": "",
  "uicon-android-fill": "",
  "uicon-ie": "",
  "uicon-IE-circle-fill": "",
  "uicon-google": "",
  "uicon-google-circle-fill": "",
  "uicon-setting-fill": "",
  "uicon-setting": "",
  "uicon-minus-square-fill": "",
  "uicon-plus-square-fill": "",
  "uicon-heart": "",
  "uicon-heart-fill": "",
  "uicon-camera": "",
  "uicon-camera-fill": "",
  "uicon-more-circle": "",
  "uicon-more-circle-fill": "",
  "uicon-chat": "",
  "uicon-chat-fill": "",
  "uicon-bag-fill": "",
  "uicon-bag": "",
  "uicon-error-circle-fill": "",
  "uicon-error-circle": "",
  "uicon-close-circle": "",
  "uicon-close-circle-fill": "",
  "uicon-checkmark-circle": "",
  "uicon-checkmark-circle-fill": "",
  "uicon-question-circle-fill": "",
  "uicon-question-circle": "",
  "uicon-share": "",
  "uicon-share-fill": "",
  "uicon-shopping-cart": "",
  "uicon-shopping-cart-fill": "",
  "uicon-bell": "",
  "uicon-bell-fill": "",
  "uicon-list": "",
  "uicon-list-dot": "",
  "uicon-zhihu": "",
  "uicon-zhihu-circle-fill": "",
  "uicon-zhifubao": "",
  "uicon-zhifubao-circle-fill": "",
  "uicon-weixin-circle-fill": "",
  "uicon-weixin-fill": "",
  "uicon-twitter-circle-fill": "",
  "uicon-twitter": "",
  "uicon-taobao-circle-fill": "",
  "uicon-taobao": "",
  "uicon-weibo-circle-fill": "",
  "uicon-weibo": "",
  "uicon-qq-fill": "",
  "uicon-qq-circle-fill": "",
  "uicon-moments-circel-fill": "",
  "uicon-moments": "",
  "uicon-qzone": "",
  "uicon-qzone-circle-fill": "",
  "uicon-baidu-circle-fill": "",
  "uicon-baidu": "",
  "uicon-facebook-circle-fill": "",
  "uicon-facebook": "",
  "uicon-car": "",
  "uicon-car-fill": "",
  "uicon-warning-fill": "",
  "uicon-warning": "",
  "uicon-clock-fill": "",
  "uicon-clock": "",
  "uicon-edit-pen": "",
  "uicon-edit-pen-fill": "",
  "uicon-email": "",
  "uicon-email-fill": "",
  "uicon-minus-circle": "",
  "uicon-minus-circle-fill": "",
  "uicon-plus-circle": "",
  "uicon-plus-circle-fill": "",
  "uicon-file-text": "",
  "uicon-file-text-fill": "",
  "uicon-pushpin": "",
  "uicon-pushpin-fill": "",
  "uicon-grid": "",
  "uicon-grid-fill": "",
  "uicon-play-circle": "",
  "uicon-play-circle-fill": "",
  "uicon-pause-circle-fill": "",
  "uicon-pause": "",
  "uicon-pause-circle": "",
  "uicon-eye-off": "",
  "uicon-eye-off-outline": "",
  "uicon-gift-fill": "",
  "uicon-gift": "",
  "uicon-rmb-circle-fill": "",
  "uicon-rmb-circle": "",
  "uicon-kefu-ermai": "",
  "uicon-server-fill": "",
  "uicon-coupon-fill": "",
  "uicon-coupon": "",
  "uicon-integral": "",
  "uicon-integral-fill": "",
  "uicon-home-fill": "",
  "uicon-home": "",
  "uicon-hourglass-half-fill": "",
  "uicon-hourglass": "",
  "uicon-account": "",
  "uicon-plus-people-fill": "",
  "uicon-minus-people-fill": "",
  "uicon-account-fill": "",
  "uicon-thumb-down-fill": "",
  "uicon-thumb-down": "",
  "uicon-thumb-up": "",
  "uicon-thumb-up-fill": "",
  "uicon-lock-fill": "",
  "uicon-lock-open": "",
  "uicon-lock-opened-fill": "",
  "uicon-lock": "",
  "uicon-red-packet-fill": "",
  "uicon-photo-fill": "",
  "uicon-photo": "",
  "uicon-volume-off-fill": "",
  "uicon-volume-off": "",
  "uicon-volume-fill": "",
  "uicon-volume": "",
  "uicon-red-packet": "",
  "uicon-download": "",
  "uicon-arrow-up-fill": "",
  "uicon-arrow-down-fill": "",
  "uicon-play-left-fill": "",
  "uicon-play-right-fill": "",
  "uicon-rewind-left-fill": "",
  "uicon-rewind-right-fill": "",
  "uicon-arrow-downward": "",
  "uicon-arrow-leftward": "",
  "uicon-arrow-rightward": "",
  "uicon-arrow-upward": "",
  "uicon-arrow-down": "",
  "uicon-arrow-right": "",
  "uicon-arrow-left": "",
  "uicon-arrow-up": "",
  "uicon-skip-back-left": "",
  "uicon-skip-forward-right": "",
  "uicon-rewind-right": "",
  "uicon-rewind-left": "",
  "uicon-arrow-right-double": "",
  "uicon-arrow-left-double": "",
  "uicon-wifi-off": "",
  "uicon-wifi": "",
  "uicon-empty-data": "",
  "uicon-empty-history": "",
  "uicon-empty-list": "",
  "uicon-empty-page": "",
  "uicon-empty-order": "",
  "uicon-empty-wifi": "",
  "uicon-man": "",
  "uicon-woman": "",
  "uicon-man-add": "",
  "uicon-man-add-fill": "",
  "uicon-man-delete": "",
  "uicon-man-delete-fill": "",
  "uicon-zh": "",
  "uicon-en": ""
};
const {
  color: color$1
} = config$2;
const IconDefaultProps = {
  // icon组件
  icon: {
    name: "",
    color: color$1["u-content-color"],
    size: "16px",
    bold: false,
    index: "",
    hoverClass: "",
    customPrefix: "uicon",
    label: "",
    labelPos: "right",
    labelSize: "15px",
    labelColor: color$1["u-content-color"],
    space: "3px",
    imgMode: "",
    width: "",
    height: "",
    top: 0,
    stop: false
  }
};
const defProps$7 = registerComponentProps(IconDefaultProps);
const props$7 = defineMixin({
  props: {
    // 图标类名
    name: {
      type: String,
      default: () => defProps$7.icon.name
    },
    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: () => defProps$7.icon.color
    },
    // 字体大小，单位px
    size: {
      type: [String, Number],
      default: () => defProps$7.icon.size
    },
    // 是否显示粗体
    bold: {
      type: Boolean,
      default: () => defProps$7.icon.bold
    },
    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    index: {
      type: [String, Number],
      default: () => defProps$7.icon.index
    },
    // 触摸图标时的类名
    hoverClass: {
      type: String,
      default: () => defProps$7.icon.hoverClass
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: () => defProps$7.icon.customPrefix
    },
    // 图标右边或者下面的文字
    label: {
      type: [String, Number],
      default: () => defProps$7.icon.label
    },
    // label的位置，只能右边或者下边
    labelPos: {
      type: String,
      default: () => defProps$7.icon.labelPos
    },
    // label的大小
    labelSize: {
      type: [String, Number],
      default: () => defProps$7.icon.labelSize
    },
    // label的颜色
    labelColor: {
      type: String,
      default: () => defProps$7.icon.labelColor
    },
    // label与图标的距离
    space: {
      type: [String, Number],
      default: () => defProps$7.icon.space
    },
    // 图片的mode
    imgMode: {
      type: String,
      default: () => defProps$7.icon.imgMode
    },
    // 用于显示图片小图标时，图片的宽度
    width: {
      type: [String, Number],
      default: () => defProps$7.icon.width
    },
    // 用于显示图片小图标时，图片的高度
    height: {
      type: [String, Number],
      default: () => defProps$7.icon.height
    },
    // 用于解决某些情况下，让图标垂直居中的用途
    top: {
      type: [String, Number],
      default: () => defProps$7.icon.top
    },
    // 是否阻止事件传播
    stop: {
      type: Boolean,
      default: () => defProps$7.icon.stop
    }
  }
});
const InputDefaultProps = {
  // index 组件
  input: {
    value: "",
    type: "text",
    fixed: false,
    disabled: false,
    disabledColor: "",
    clearable: false,
    password: false,
    maxlength: 140,
    placeholder: null,
    placeholderClass: "input-placeholder",
    placeholderStyle: "",
    showWordLimit: false,
    confirmType: "done",
    confirmHold: false,
    holdKeyboard: false,
    focus: false,
    autoBlur: false,
    disableDefaultPadding: false,
    cursor: -1,
    cursorSpacing: 30,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    inputAlign: "left",
    fontSize: "15px",
    color: "",
    prefixIcon: "",
    prefixIconStyle: "",
    suffixIcon: "",
    suffixIconStyle: "",
    border: "surround",
    readonly: false,
    shape: "square",
    formatter: null,
    cursorColor: "#53c21d",
    passwordVisibilityToggle: true
  }
};
const defProps$6 = registerComponentProps(InputDefaultProps);
const props$6 = defineMixin({
  props: {
    // 绑定的值
    modelValue: {
      type: [String, Number],
      default: () => defProps$6.input.value
    },
    // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
    // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
    // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
    // text-文本输入键盘
    type: {
      type: String,
      default: () => defProps$6.input.type
    },
    // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，
    // 兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序
    fixed: {
      type: Boolean,
      default: () => defProps$6.input.fixed
    },
    // 是否禁用输入框
    disabled: {
      type: Boolean,
      default: () => defProps$6.input.disabled
    },
    // 禁用状态时的背景色
    disabledColor: {
      type: String,
      default: () => defProps$6.input.disabledColor
    },
    // 是否显示清除控件
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否仅在聚焦时显示清除控件
    onlyClearableOnFocused: {
      type: Boolean,
      default: true
    },
    // 是否密码类型
    password: {
      type: Boolean,
      default: () => defProps$6.input.password
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: [String, Number],
      default: () => defProps$6.input.maxlength
    },
    // 	输入框为空时的占位符
    placeholder: {
      type: String,
      default: () => defProps$6.input.placeholder
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
      type: String,
      default: () => defProps$6.input.placeholderClass
    },
    // 指定placeholder的样式
    placeholderStyle: {
      type: [String, Object],
      default: () => defProps$6.input.placeholderStyle
    },
    // 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效
    showWordLimit: {
      type: Boolean,
      default: () => defProps$6.input.showWordLimit
    },
    // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
    // https://uniapp.dcloud.io/component/input
    // https://uniapp.dcloud.io/component/textarea
    confirmType: {
      type: String,
      default: () => defProps$6.input.confirmType
    },
    // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
    confirmHold: {
      type: Boolean,
      default: () => defProps$6.input.confirmHold
    },
    // focus时，点击页面的时候不收起键盘，微信小程序有效
    holdKeyboard: {
      type: Boolean,
      default: () => defProps$6.input.holdKeyboard
    },
    // 自动获取焦点
    // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
    focus: {
      type: Boolean,
      default: () => defProps$6.input.focus
    },
    // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
    autoBlur: {
      type: Boolean,
      default: () => defProps$6.input.autoBlur
    },
    // 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效
    disableDefaultPadding: {
      type: Boolean,
      default: () => defProps$6.input.disableDefaultPadding
    },
    // 指定focus时光标的位置
    cursor: {
      type: [String, Number],
      default: () => defProps$6.input.cursor
    },
    // 输入框聚焦时底部与键盘的距离
    cursorSpacing: {
      type: [String, Number],
      default: () => defProps$6.input.cursorSpacing
    },
    // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
    selectionStart: {
      type: [String, Number],
      default: () => defProps$6.input.selectionStart
    },
    // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
    selectionEnd: {
      type: [String, Number],
      default: () => defProps$6.input.selectionEnd
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: () => defProps$6.input.adjustPosition
    },
    // 输入框内容对齐方式，可选值为：left|center|right
    inputAlign: {
      type: String,
      default: () => defProps$6.input.inputAlign
    },
    // 输入框字体的大小
    fontSize: {
      type: [String, Number],
      default: () => defProps$6.input.fontSize
    },
    // 输入框字体颜色
    color: {
      type: String,
      default: () => defProps$6.input.color
    },
    // 输入框前置图标
    prefixIcon: {
      type: String,
      default: () => defProps$6.input.prefixIcon
    },
    // 前置图标样式，对象或字符串
    prefixIconStyle: {
      type: [String, Object],
      default: () => defProps$6.input.prefixIconStyle
    },
    // 输入框后置图标
    suffixIcon: {
      type: String,
      default: () => defProps$6.input.suffixIcon
    },
    // 后置图标样式，对象或字符串
    suffixIconStyle: {
      type: [String, Object],
      default: () => defProps$6.input.suffixIconStyle
    },
    // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
    border: {
      type: String,
      default: () => defProps$6.input.border
    },
    // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
    readonly: {
      type: Boolean,
      default: () => defProps$6.input.readonly
    },
    // 输入框形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: () => defProps$6.input.shape
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
      type: [Function, null],
      default: () => defProps$6.input.formatter
    },
    // 是否忽略组件内对文本合成系统事件的处理
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    },
    // 光标颜色
    cursorColor: {
      type: String,
      default: () => defProps$6.input.cursorColor
    },
    // 密码类型可见性切换
    passwordVisibilityToggle: {
      type: Boolean,
      default: () => defProps$6.input.passwordVisibilityToggle
    }
  }
});
const FormItemDefaultProps = {
  // formItem 组件
  formItem: {
    label: "",
    prop: "",
    rules: [],
    borderBottom: "",
    labelPosition: "",
    labelWidth: "",
    rightIcon: "",
    leftIcon: "",
    required: false,
    leftIconStyle: ""
  }
};
const defProps$5 = registerComponentProps(FormItemDefaultProps);
const props$5 = defineMixin({
  props: {
    // input的label提示语
    label: {
      type: String,
      default: () => defProps$5.formItem.label
    },
    // 绑定的值
    prop: {
      type: String,
      default: () => defProps$5.formItem.prop
    },
    // 绑定的规则
    rules: {
      type: Array,
      default: () => defProps$5.formItem.rules
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: [String, Boolean],
      default: () => defProps$5.formItem.borderBottom
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: () => defProps$5.formItem.labelPosition
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: () => defProps$5.formItem.labelWidth
    },
    // 右侧图标
    rightIcon: {
      type: String,
      default: () => defProps$5.formItem.rightIcon
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: () => defProps$5.formItem.leftIcon
    },
    // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
    required: {
      type: Boolean,
      default: () => defProps$5.formItem.required
    },
    leftIconStyle: {
      type: [String, Object],
      default: () => defProps$5.formItem.leftIconStyle
    }
  }
});
const buttonMixin = defineMixin({
  props: {
    lang: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    formType: String,
    openType: String
  }
});
const openType = defineMixin({
  props: {
    openType: String
  },
  methods: {
    onGetUserInfo(event) {
      this.$emit("getuserinfo", event.detail);
    },
    onContact(event) {
      this.$emit("contact", event.detail);
    },
    onGetPhoneNumber(event) {
      this.$emit("getphonenumber", event.detail);
    },
    onError(event) {
      this.$emit("error", event.detail);
    },
    onLaunchApp(event) {
      this.$emit("launchapp", event.detail);
    },
    onOpenSetting(event) {
      this.$emit("opensetting", event.detail);
    }
  }
});
const ButtonDefaultProps = {
  // button组件
  button: {
    hairline: false,
    type: "info",
    size: "normal",
    shape: "square",
    plain: false,
    disabled: false,
    loading: false,
    loadingText: "",
    loadingMode: "spinner",
    loadingSize: 15,
    openType: "",
    formType: "",
    appParameter: "",
    hoverStopPropagation: true,
    lang: "en",
    sessionFrom: "",
    sendMessageTitle: "",
    sendMessagePath: "",
    sendMessageImg: "",
    showMessageCard: false,
    dataName: "",
    throttleTime: 0,
    hoverStartTime: 0,
    hoverStayTime: 200,
    text: "",
    icon: "",
    iconColor: "",
    color: "",
    stop: true
  }
};
const defProps$4 = registerComponentProps(ButtonDefaultProps);
const props$4 = defineMixin({
  props: {
    // 是否细边框
    hairline: {
      type: Boolean,
      default: () => defProps$4.button.hairline
    },
    // 按钮的预置样式，info，primary，error，warning，success
    type: {
      type: String,
      default: () => defProps$4.button.type
    },
    // 按钮尺寸，large，normal，small，mini
    size: {
      type: String,
      default: () => defProps$4.button.size
    },
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: () => defProps$4.button.shape
    },
    // 按钮是否镂空
    plain: {
      type: Boolean,
      default: () => defProps$4.button.plain
    },
    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: () => defProps$4.button.disabled
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: () => defProps$4.button.loading
    },
    // 加载中提示文字
    loadingText: {
      type: [String, Number],
      default: () => defProps$4.button.loadingText
    },
    // 加载状态图标类型
    loadingMode: {
      type: String,
      default: () => defProps$4.button.loadingMode
    },
    // 加载图标大小
    loadingSize: {
      type: [String, Number],
      default: () => defProps$4.button.loadingSize
    },
    // 开放能力，具体请看uniapp稳定关于button组件部分说明
    // https://uniapp.dcloud.io/component/button
    openType: {
      type: String,
      default: () => defProps$4.button.openType
    },
    // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
    // 取值为submit（提交表单），reset（重置表单）
    formType: {
      type: String,
      default: () => defProps$4.button.formType
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    // 只微信小程序、QQ小程序有效
    appParameter: {
      type: String,
      default: () => defProps$4.button.appParameter
    },
    // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
    hoverStopPropagation: {
      type: Boolean,
      default: () => defProps$4.button.hoverStopPropagation
    },
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
    lang: {
      type: String,
      default: () => defProps$4.button.lang
    },
    // 会话来源，open-type="contact"时有效。只微信小程序有效
    sessionFrom: {
      type: String,
      default: () => defProps$4.button.sessionFrom
    },
    // 会话内消息卡片标题，open-type="contact"时有效
    // 默认当前标题，只微信小程序有效
    sendMessageTitle: {
      type: String,
      default: () => defProps$4.button.sendMessageTitle
    },
    // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
    // 默认当前分享路径，只微信小程序有效
    sendMessagePath: {
      type: String,
      default: () => defProps$4.button.sendMessagePath
    },
    // 会话内消息卡片图片，open-type="contact"时有效
    // 默认当前页面截图，只微信小程序有效
    sendMessageImg: {
      type: String,
      default: () => defProps$4.button.sendMessageImg
    },
    // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
    // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
    showMessageCard: {
      type: Boolean,
      default: () => defProps$4.button.showMessageCard
    },
    // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
    dataName: {
      type: String,
      default: () => defProps$4.button.dataName
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: () => defProps$4.button.throttleTime
    },
    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: [String, Number],
      default: () => defProps$4.button.hoverStartTime
    },
    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: [String, Number],
      default: () => defProps$4.button.hoverStayTime
    },
    // 按钮文字，之所以通过props传入，是因为slot传入的话
    // nvue中无法控制文字的样式
    text: {
      type: [String, Number],
      default: () => defProps$4.button.text
    },
    // 按钮图标
    icon: {
      type: String,
      default: () => defProps$4.button.icon
    },
    // 按钮图标
    iconColor: {
      type: String,
      default: () => defProps$4.button.icon
    },
    // 按钮颜色，支持传入linear-gradient渐变色
    color: {
      type: String,
      default: () => defProps$4.button.color
    },
    // 停止冒泡
    stop: {
      type: Boolean,
      default: () => defProps$4.button.stop
    }
  }
});
const FormDefaultProps = {
  // form 组件
  form: {
    model: {},
    rules: {},
    errorType: "message",
    borderBottom: true,
    labelPosition: "left",
    labelWidth: 45,
    labelAlign: "left",
    labelStyle: {}
  }
};
const defProps$3 = registerComponentProps(FormDefaultProps);
const props$3 = defineMixin({
  props: {
    // 当前form的需要验证字段的集合
    model: {
      type: Object,
      default: () => defProps$3.form.model
    },
    // 验证规则
    rules: {
      type: [Object, Function, Array],
      default: () => defProps$3.form.rules
    },
    // 有错误时的提示方式，message-提示信息，toast-进行toast提示
    // border-bottom-下边框呈现红色，none-无提示
    errorType: {
      type: String,
      default: () => defProps$3.form.errorType
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: Boolean,
      default: () => defProps$3.form.borderBottom
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: () => defProps$3.form.labelPosition
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: () => defProps$3.form.labelWidth
    },
    // lable字体的对齐方式
    labelAlign: {
      type: String,
      default: () => defProps$3.form.labelAlign
    },
    // lable的样式，对象形式
    labelStyle: {
      type: Object,
      default: () => defProps$3.form.labelStyle
    }
  }
});
const formatRegExp = /%[sdj%]/g;
let warning = function warning2() {
};
if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
  warning = function warning3(type2, errors) {
    if (typeof console !== "undefined" && console.warn) {
      if (errors.every((e2) => typeof e2 === "string")) {
        console.warn(type2, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length)
    return null;
  const fields = {};
  errors.forEach((error2) => {
    const { field } = error2;
    fields[field] = fields[field] || [];
    fields[field].push(error2);
  });
  return fields;
}
function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  let i = 1;
  const f2 = args[0];
  const len = args.length;
  if (typeof f2 === "function") {
    return f2.apply(null, args.slice(1));
  }
  if (typeof f2 === "string") {
    let str = String(f2).replace(formatRegExp, (x) => {
      if (x === "%%") {
        return "%";
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
          break;
        default:
          return x;
      }
    });
    for (let arg = args[i]; i < len; arg = args[++i]) {
      str += ` ${arg}`;
    }
    return str;
  }
  return f2;
}
function isNativeStringType(type2) {
  return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
}
function isEmptyValue(value, type2) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (type2 === "array" && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type2) && typeof value === "string" && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func2, callback) {
  const results = [];
  let total = 0;
  const arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach((a) => {
    func2(a, count);
  });
}
function asyncSerialArray(arr, func2, callback) {
  let index2 = 0;
  const arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    const original = index2;
    index2 += 1;
    if (original < arrLength) {
      func2(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  const ret = [];
  Object.keys(objArr).forEach((k) => {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}
function asyncMap(objArr, option, func2, callback) {
  if (option.first) {
    const _pending = new Promise((resolve2, reject) => {
      const next = function next2(errors) {
        callback(errors);
        return errors.length ? reject({
          errors,
          fields: convertFieldsError(errors)
        }) : resolve2();
      };
      const flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func2, next);
    });
    _pending.catch((e2) => e2);
    return _pending;
  }
  let firstFields = option.firstFields || [];
  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }
  const objArrKeys = Object.keys(objArr);
  const objArrLength = objArrKeys.length;
  let total = 0;
  const results = [];
  const pending2 = new Promise((resolve2, reject) => {
    const next = function next2(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results)
        }) : resolve2();
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve2();
    }
    objArrKeys.forEach((key) => {
      const arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func2, next);
      } else {
        asyncParallelArray(arr, func2, next);
      }
    });
  });
  pending2.catch((e2) => e2);
  return pending2;
}
function complementError(rule) {
  return function(oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }
    return {
      message: typeof oe === "function" ? oe() : oe,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (const s2 in source) {
      if (source.hasOwnProperty(s2)) {
        const value = source[s2];
        if (typeof value === "object" && typeof target[s2] === "object") {
          target[s2] = { ...target[s2], ...value };
        } else {
          target[s2] = value;
        }
      }
    }
  }
  return target;
}
function required(rule, value, source, errors, options, type2) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}
function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}
const pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
    "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
    "i"
  ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return /^(-)?\d+$/.test(value);
  },
  float: function float(value) {
    return /^(-)?\d+(\.\d+)?$/.test(value);
  },
  array: function array2(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e2) {
      return false;
    }
  },
  date: function date2(value) {
    return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function";
  },
  number: function number2(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof +value === "number";
  },
  object: function object2(value) {
    return typeof value === "object" && !types.array(value);
  },
  method: function method(value) {
    return typeof value === "function";
  },
  email: function email2(value) {
    return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url2(value) {
    return typeof value === "string" && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === "string" && !!value.match(pattern.hex);
  }
};
function type(rule, value, source, errors, options) {
  if (rule.required && value === void 0) {
    required(rule, value, source, errors, options);
    return;
  }
  const custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  const ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}
function range(rule, value, source, errors, options) {
  const len = typeof rule.len === "number";
  const min = typeof rule.min === "number";
  const max = typeof rule.max === "number";
  const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  let val = value;
  let key = null;
  const num = typeof value === "number";
  const str = typeof value === "string";
  const arr = Array.isArray(value);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    val = value.replace(spRegexp, "_").length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}
const ENUM = "enum";
function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
  }
}
function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      const _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}
const rules = {
  required,
  whitespace,
  type,
  range,
  enum: enumerable,
  pattern: pattern$1
};
function string(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "string");
    if (!isEmptyValue(value, "string")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
}
function method2(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function number22(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (value === "") {
      value = void 0;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function _boolean(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function regexp2(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function integer2(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function floatFn(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function array22(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value, "array") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "array");
    if (!isEmptyValue(value, "array")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function object22(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
const ENUM$1 = "enum";
function enumerable$1(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function pattern$2(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "string")) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function date22(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      let dateObject;
      if (typeof value === "number") {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
}
function required$1(rule, value, callback, source, options) {
  const errors = [];
  const type2 = Array.isArray(value) ? "array" : typeof value;
  rules.required(rule, value, source, errors, options, type2);
  callback(errors);
}
function type$1(rule, value, callback, source, options) {
  const ruleType = rule.type;
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
function any(rule, value, callback, source, options) {
  const errors = [];
  const validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate2) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
}
const validators = {
  string,
  method: method2,
  number: number22,
  boolean: _boolean,
  regexp: regexp2,
  integer: integer2,
  float: floatFn,
  array: array22,
  object: object22,
  enum: enumerable$1,
  pattern: pattern$2,
  date: date22,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any
};
function newMessages() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone2() {
      const cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
const messages = newMessages();
function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}
Schema.prototype = {
  messages: function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  },
  define: function define(rules2) {
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    let z;
    let item;
    for (z in rules2) {
      if (rules2.hasOwnProperty(z)) {
        item = rules2[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o2, oc) {
    const _this = this;
    if (o2 === void 0) {
      o2 = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    let source = source_;
    let options = o2;
    let callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }
      return Promise.resolve();
    }
    function complete(results) {
      let i;
      let errors = [];
      let fields = {};
      function add2(e2) {
        if (Array.isArray(e2)) {
          let _errors;
          errors = (_errors = errors).concat.apply(_errors, e2);
        } else {
          errors.push(e2);
        }
      }
      for (i = 0; i < results.length; i++) {
        add2(results[i]);
      }
      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }
      callback(errors, fields);
    }
    if (options.messages) {
      let messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    let arr;
    let value;
    const series = {};
    const keys = options.keys || Object.keys(this.rules);
    keys.forEach((z) => {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach((r) => {
        let rule = r;
        if (typeof rule.transform === "function") {
          if (source === source_) {
            source = { ...source };
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = { ...rule };
        }
        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);
        if (!rule.validator) {
          return;
        }
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value,
          source,
          field: z
        });
      });
    });
    const errorFields = {};
    return asyncMap(series, options, (data, doIt) => {
      const { rule } = data;
      let deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullfield(key, schema) {
        return { ...schema, fullField: `${rule.fullField}.${key}` };
      }
      function cb(e2) {
        if (e2 === void 0) {
          e2 = [];
        }
        let errors = e2;
        if (!Array.isArray(errors)) {
          errors = [errors];
        }
        if (!options.suppressWarning && errors.length) {
          Schema.warning("async-validator:", errors);
        }
        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }
        errors = errors.map(complementError(rule));
        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }
        if (!deep) {
          doIt(errors);
        } else {
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }
            return doIt(errors);
          }
          let fieldsSchema = {};
          if (rule.defaultField) {
            for (const k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }
          fieldsSchema = { ...fieldsSchema, ...data.rule.fields };
          for (const f2 in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f2)) {
              const fieldSchema = Array.isArray(fieldsSchema[f2]) ? fieldsSchema[f2] : [fieldsSchema[f2]];
              fieldsSchema[f2] = fieldSchema.map(addFullfield.bind(null, f2));
            }
          }
          const schema = new Schema(fieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, (errs) => {
            const finalErrors = [];
            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      let res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || `${rule.field} fails`);
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(() => cb(), (e2) => cb(e2));
      }
    }, (results) => {
      complete(results);
    });
  },
  getType: function getType2(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    const keys = Object.keys(rule);
    const messageIndex = keys.indexOf("message");
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === "required") {
      return validators.required;
    }
    return validators[this.getType(rule)] || false;
  }
};
Schema.register = function register(type2, validator) {
  if (typeof validator !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type2] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
const {
  color
} = config$2;
const LoadingIconDefaultProps = {
  // loading-icon加载中图标组件
  loadingIcon: {
    show: true,
    color: color["u-tips-color"],
    textColor: color["u-tips-color"],
    vertical: false,
    mode: "spinner",
    size: 24,
    textSize: 15,
    text: "",
    timingFunction: "ease-in-out",
    duration: 1200,
    inactiveColor: ""
  }
};
const defProps$2 = registerComponentProps(LoadingIconDefaultProps);
const props$2 = defineMixin({
  props: {
    // 是否显示组件
    show: {
      type: Boolean,
      default: () => defProps$2.loadingIcon.show
    },
    // 颜色
    color: {
      type: String,
      default: () => defProps$2.loadingIcon.color
    },
    // 提示文字颜色
    textColor: {
      type: String,
      default: () => defProps$2.loadingIcon.textColor
    },
    // 文字和图标是否垂直排列
    vertical: {
      type: Boolean,
      default: () => defProps$2.loadingIcon.vertical
    },
    // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
    mode: {
      type: String,
      default: () => defProps$2.loadingIcon.mode
    },
    // 图标大小，单位默认px
    size: {
      type: [String, Number],
      default: () => defProps$2.loadingIcon.size
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: () => defProps$2.loadingIcon.textSize
    },
    // 文字内容
    text: {
      type: [String, Number],
      default: () => defProps$2.loadingIcon.text
    },
    // 动画模式
    timingFunction: {
      type: String,
      default: () => defProps$2.loadingIcon.timingFunction
    },
    // 动画执行周期时间
    duration: {
      type: [String, Number],
      default: () => defProps$2.loadingIcon.duration
    },
    // mode=circle时的暗边颜色
    inactiveColor: {
      type: String,
      default: () => defProps$2.loadingIcon.inactiveColor
    }
  }
});
const EmptyDefaultProps = {
  // empty组件
  empty: {
    icon: "",
    text: "",
    textColor: "#c0c4cc",
    textSize: 14,
    iconColor: "#c0c4cc",
    iconSize: 90,
    mode: "data",
    width: 160,
    height: 160,
    show: true,
    marginTop: 0
  }
};
const defProps$1 = registerComponentProps(EmptyDefaultProps);
const props$1 = defineMixin({
  props: {
    // 内置图标名称，或图片路径，建议绝对路径
    icon: {
      type: String,
      default: () => defProps$1.empty.icon
    },
    // 提示文字
    text: {
      type: String,
      default: () => defProps$1.empty.text
    },
    // 文字颜色
    textColor: {
      type: String,
      default: () => defProps$1.empty.textColor
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: () => defProps$1.empty.textSize
    },
    // 图标的颜色
    iconColor: {
      type: String,
      default: () => defProps$1.empty.iconColor
    },
    // 图标的大小
    iconSize: {
      type: [String, Number],
      default: () => defProps$1.empty.iconSize
    },
    // 选择预置的图标类型
    mode: {
      type: String,
      default: () => defProps$1.empty.mode
    },
    //  图标宽度，单位px
    width: {
      type: [String, Number],
      default: () => defProps$1.empty.width
    },
    // 图标高度，单位px
    height: {
      type: [String, Number],
      default: () => defProps$1.empty.height
    },
    // 是否显示组件
    show: {
      type: Boolean,
      default: () => defProps$1.empty.show
    },
    // 组件距离上一个元素之间的距离，默认px单位
    marginTop: {
      type: [String, Number],
      default: () => defProps$1.empty.marginTop
    }
  }
});
const TagDefaultProps = {
  // tag 组件
  tag: {
    type: "primary",
    disabled: false,
    size: "medium",
    shape: "square",
    text: "",
    bgColor: "",
    color: "",
    borderColor: "",
    closeColor: "#C6C7CB",
    name: "",
    plainFill: false,
    plain: false,
    closable: false,
    show: true,
    icon: "",
    iconColor: "",
    textSize: "",
    height: "",
    padding: "",
    borderRadius: "",
    autoBgColor: 0
  }
};
const defProps = registerComponentProps(TagDefaultProps);
const props = defineMixin({
  props: {
    // 标签类型info、primary、success、warning、error
    type: {
      type: String,
      default: () => defProps.tag.type
    },
    // 不可用
    disabled: {
      type: [Boolean, String],
      default: () => defProps.tag.disabled
    },
    // 标签的大小，large，medium，mini
    size: {
      type: String,
      default: () => defProps.tag.size
    },
    // tag的形状，circle（两边半圆形）, square（方形，带圆角）
    shape: {
      type: String,
      default: () => defProps.tag.shape
    },
    // 标签文字
    text: {
      type: [String, Number],
      default: () => defProps.tag.text
    },
    // 背景颜色，默认为空字符串，即不处理
    bgColor: {
      type: String,
      default: () => defProps.tag.bgColor
    },
    // 标签字体颜色，默认为空字符串，即不处理
    color: {
      type: String,
      default: () => defProps.tag.color
    },
    // 标签的边框颜色
    borderColor: {
      type: String,
      default: () => defProps.tag.borderColor
    },
    // 关闭按钮图标的颜色
    closeColor: {
      type: String,
      default: () => defProps.tag.closeColor
    },
    // 点击时返回的索引值，用于区分例遍的数组哪个元素被点击了
    name: {
      type: [String, Number],
      default: () => defProps.tag.name
    },
    // // 模式选择，dark|light|plain
    // mode: {
    // 	type: String,
    // 	default: 'light'
    // },
    // 镂空时是否填充背景色
    plainFill: {
      type: Boolean,
      default: () => defProps.tag.plainFill
    },
    // 是否镂空
    plain: {
      type: Boolean,
      default: () => defProps.tag.plain
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      default: () => defProps.tag.closable
    },
    // 是否显示
    show: {
      type: Boolean,
      default: () => defProps.tag.show
    },
    // 内置图标，或绝对路径的图片
    icon: {
      type: String,
      default: () => defProps.tag.icon
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: () => defProps.tag.iconColor
    },
    // 自定义尺寸字体大小
    textSize: {
      type: String,
      default: () => defProps.tag.textSize
    },
    // 自定义尺寸高度
    height: {
      type: String,
      default: () => defProps.tag.height
    },
    // 自定义尺寸padding
    padding: {
      type: String,
      default: () => defProps.tag.padding
    },
    // 自定义尺寸
    borderRadius: {
      type: String,
      default: () => defProps.tag.borderRadius
    },
    // 自动计算背景色
    autoBgColor: {
      type: Number,
      default: () => defProps.tag.autoBgColor
    }
  }
});
exports.Schema = Schema;
exports._export_sfc = _export_sfc;
exports.addStyle = addStyle;
exports.addUnit = addUnit;
exports.buttonMixin = buttonMixin;
exports.color = color$2;
exports.colorGradient = colorGradient;
exports.config = config$2;
exports.createSSRApp = createSSRApp;
exports.deepClone = deepClone;
exports.deepMerge = deepMerge$2;
exports.e = e;
exports.error = error;
exports.f = f;
exports.fontUtil = fontUtil;
exports.formValidate = formValidate;
exports.genLightColor = genLightColor;
exports.getProperty = getProperty;
exports.getThemeVar = getThemeVar;
exports.icons = icons;
exports.index = index$1;
exports.mixin = mixin;
exports.mpMixin = mpMixin;
exports.n = n$1;
exports.o = o;
exports.onPullDownRefresh = onPullDownRefresh;
exports.onShow = onShow;
exports.onUnload = onUnload;
exports.openType = openType;
exports.p = p;
exports.props = props$7;
exports.props$1 = props$6;
exports.props$2 = props$5;
exports.props$3 = props$8;
exports.props$4 = props$4;
exports.props$5 = props$3;
exports.props$6 = props$2;
exports.props$7 = props$1;
exports.props$8 = props;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s$1;
exports.setProperty = setProperty;
exports.sleep = sleep;
exports.t = t$1;
exports.t$1 = t;
exports.test = test;
exports.throttle = throttle;
exports.toast = toast;
exports.uviewPlus = uviewPlus;
