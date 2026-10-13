# Hướng dẫn sử dụng thiệp cưới

## 1. Thêm ảnh
Bỏ ảnh vào thư mục `assets/images/` với **đúng tên file** dưới đây (ô nào chưa có ảnh sẽ hiện khung chờ ghi tên file):

| Tên file | Vị trí | Tỉ lệ gợi ý |
|---|---|---|
| `cover.jpg` | Ảnh bìa đầu thiệp | dọc 2:3 (vd 1290×1935) |
| `groom.jpg`, `bride.jpg` | Ảnh chú rể / cô dâu | dọc 2:3 |
| `invite-1.jpg`, `invite-2.jpg`, `invite-3.jpg` | 3 ảnh dưới lời mời (ảnh 2 ở giữa, to hơn) | dọc 2:3 |
| `album-1.jpg` | Ảnh ngang đầu album | ngang 3:2 |
| `album-2.jpg` | Ảnh dọc lớn | dọc 2:3 |
| `album-3.jpg`, `album-4.jpg` | 2 ảnh nhỏ cạnh ảnh dọc lớn | dọc 3:4 |
| `album-5.jpg` … `album-8.jpg` | Lưới 4 ảnh | dọc 2:3 |
| `footer.jpg` | Ảnh cuối thiệp (lời cảm ơn) | ngang 4:3 |
| `qr-groom.png`, `qr-bride.png` | Mã QR ngân hàng | vuông |

> Mẹo: nén ảnh (≈ 1200–1600px cạnh dài, < 400KB) tại squoosh.app để thiệp tải nhanh trên 4G.
> Muốn dùng tên/định dạng khác (vd `.webp`) thì sửa `src` tương ứng trong `index.html`.

## 2. Nhạc nền
Bỏ file nhạc vào `assets/music/music.mp3`. Muốn nhiều bài: sửa `musicList` trong `js/main.js`.
Nhạc tự phát khi khách chạm mở thiệp (trình duyệt điện thoại không cho phát khi chưa chạm).

## 3. Sửa nội dung
- Chữ (tên, bố mẹ, giờ, địa chỉ, lời chúc…): sửa trực tiếp trong `index.html` — mỗi phần có chú thích.
- Link chỉ đường: thay `href` của 2 nút **Xem chỉ đường**.
- Chữ lồng trên con dấu: tìm `T&amp;T` trong `index.html`.
- Ngày đếm ngược: `countdownTarget` trong `js/main.js`.
- Thông tin ngân hàng: phần `POPUP: QUÀ MỪNG CƯỚI` trong `index.html` (nhớ sửa cả `data-copy`).
- Đổi màu chủ đạo: biến `--green`, `--green-dark` đầu file `css/style.css`.

## 4. Lưu lời chúc vào Google Sheets
Mặc định (chưa cấu hình) lời chúc chỉ lưu tạm trên máy người gửi để thử. Để nhận lời chúc thật:
1. Làm theo hướng dẫn ở đầu file `google-apps-script/Code.gs`.
2. Dán URL Web App vào `sheetEndpoint` trong `js/main.js`.

Mọi lời chúc sẽ vào Google Sheet của bạn và hiện trong nút ☰ cạnh nút gửi.

## 5. Gửi thiệp có tên khách
Thêm `?khach=Tên` vào cuối link, ví dụ:
`https://ten-mien-cua-ban/?khach=Anh%20Nam%20%26%20Chị%20Lan`
→ Thiệp hiện "Trân trọng kính mời **Anh Nam & Chị Lan**" và tự điền tên vào form.

## 6. Xem thử & đưa lên mạng
- Xem trên máy: chạy `python3 -m http.server 8000` trong thư mục này, mở `http://localhost:8000`.
  Xem trên điện thoại cùng Wi-Fi: `http://<IP-máy-tính>:8000`.
- Đưa lên mạng miễn phí: kéo thả cả thư mục vào https://app.netlify.com/drop, hoặc dùng GitHub Pages / Vercel.

