/**
 * LƯU LỜI CHÚC / XÁC NHẬN THAM DỰ VÀO GOOGLE SHEETS
 * --------------------------------------------------
 * 1. Tạo 1 Google Sheet mới → menu Tiện ích mở rộng (Extensions) → Apps Script.
 * 2. Xoá code mặc định, dán toàn bộ file này vào, bấm Lưu.
 * 3. Bấm "Triển khai" (Deploy) → "Tùy chọn triển khai mới" (New deployment)
 *    - Loại: Ứng dụng web (Web app)
 *    - Thực thi với tư cách: Tôi (Me)
 *    - Người có quyền truy cập: Bất kỳ ai (Anyone)
 * 4. Cấp quyền, copy "URL ứng dụng web" (dạng https://script.google.com/macros/s/.../exec)
 *    rồi dán vào CONFIG.sheetEndpoint trong js/main.js.
 */

var SHEET_NAME = 'Loi chuc';
var HEADERS = ['Thời gian', 'Tên khách', 'Lời chúc', 'Tham dự'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function clean_(v, max) {
  v = String(v == null ? '' : v).trim().slice(0, max);
  // Chặn công thức bảng tính độc hại (=, +, -, @)
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

/** Nhận lời chúc mới */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents || '{}');
    var name = clean_(d.name, 80);
    var message = clean_(d.message, 600);
    var attend = clean_(d.attend, 60);
    if (!name || !message) return json_({ ok: false, error: 'Thiếu thông tin' });
    getSheet_().appendRow([new Date(), name, message, attend]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Trả về danh sách lời chúc (hiện trong nút "Danh sách phản hồi") */
function doGet() {
  var rows = getSheet_().getDataRange().getValues().slice(1);
  var wishes = rows
    .filter(function (r) { return r[1]; })
    .map(function (r) {
      return {
        createdAt: r[0] instanceof Date ? r[0].toISOString() : r[0],
        name: String(r[1]).replace(/^'/, ''),
        message: String(r[2]).replace(/^'/, ''),
        attend: r[3]
      };
    });
  return json_({ total: wishes.length, wishes: wishes });
}

