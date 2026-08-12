"use strict";
function fmtTime(v) {
  if (!v)
    return "-";
  const s = String(v).replace("T", " ").replace(/\.\d+$/, "");
  return s.slice(0, 16);
}
function maskIdCard(id) {
  if (!id || id.length < 10)
    return id || "-";
  return id.slice(0, 6) + "********" + id.slice(-4);
}
exports.fmtTime = fmtTime;
exports.maskIdCard = maskIdCard;
