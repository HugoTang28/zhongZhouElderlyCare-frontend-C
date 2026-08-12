// 通用格式化工具

// 后端 LocalDateTime 序列化为 "2026-06-18T13:30:00"，转成 "2026-06-18 13:30"
export function fmtTime(v) {
  if (!v) return '-'
  const s = String(v).replace('T', ' ').replace(/\.\d+$/, '')
  return s.slice(0, 16)
}

// 身份证脱敏
export function maskIdCard(id) {
  if (!id || id.length < 10) return id || '-'
  return id.slice(0, 6) + '********' + id.slice(-4)
}
