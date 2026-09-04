"use strict";
const common_vendor = require("../common/vendor.js");
let BASE_URL = "http://192.168.11.7:9996";
function getToken() {
  return common_vendor.index.getStorageSync("family_token") || "";
}
function request(url, method = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = BASE_URL + url;
    console.log("[request]", method, fullUrl, data);
    common_vendor.index.request({
      url: fullUrl,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
      },
      success: (res) => {
        console.log("[response]", url, res.statusCode, res.data);
        const body = res.data;
        if (res.statusCode === 200 && body && body.code === 200) {
          resolve(body.data);
        } else if (body && body.code === 401) {
          common_vendor.index.removeStorageSync("family_token");
          common_vendor.index.reLaunch({ url: "/pages/login/login" });
          reject(body);
        } else {
          const msg = body && body.msg || "请求失败";
          common_vendor.index.showToast({ title: msg, icon: "none" });
          reject(body);
        }
      },
      fail: (err) => {
        console.error("[request fail]", url, err);
        common_vendor.index.showToast({ title: "网络异常，请稍后重试", icon: "none" });
        reject(err);
      }
    });
  });
}
function get(url, data) {
  return request(url, "GET", data);
}
function post(url, data) {
  return request(url, "POST", data);
}
exports.get = get;
exports.post = post;
