"use strict";
const utils_request = require("../utils/request.js");
function sendCode(phone) {
  return utils_request.post("/family/auth/send-code", { phone });
}
function familyLogin(phone, code) {
  return utils_request.post("/family/auth/login", { phone, code });
}
function getElders() {
  return utils_request.get("/family/elders");
}
function getVisits() {
  return utils_request.get("/family/visits");
}
function getBills() {
  return utils_request.get("/family/bills");
}
function getCare() {
  return utils_request.get("/family/care");
}
function getMessages() {
  return utils_request.get("/family/messages");
}
function getAlarms() {
  return utils_request.get("/family/alarms");
}
exports.familyLogin = familyLogin;
exports.getAlarms = getAlarms;
exports.getBills = getBills;
exports.getCare = getCare;
exports.getElders = getElders;
exports.getMessages = getMessages;
exports.getVisits = getVisits;
exports.sendCode = sendCode;
