/* =========================================================
   THIỆP CƯỚI ONLINE — xử lý tương tác
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     CẤU HÌNH — chỉnh tại đây
     --------------------------------------------------------- */
  var CONFIG = {
    // Thời điểm đếm ngược tới (giờ Việt Nam, +07:00)
    countdownTarget: '2026-10-24T10:30:00+07:00',

    // Danh sách nhạc nền — phát lần lượt và lặp lại
    musicList: ['assets/music/music.mp3'],

    // Link Web App Google Apps Script để lưu lời chúc vào Google Sheets
    // (xem HUONG-DAN.md). Để trống = chỉ lưu tạm trên trình duyệt (dùng thử).
    sheetEndpoint: 'https://script.google.com/macros/s/AKfycbzDrHSN4zSdUruG5qO6sGqQ2bq9Ut_O-5IRnn2y18hPsBOzKOwKMXZ12Clk2WyQoRuf/exec',

    // Tự mở cửa sau bao nhiêu ms nếu khách không chạm (0 = không tự mở)
    autoOpenAfter: 200
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Thông báo nhỏ
     --------------------------------------------------------- */
  var toastEl = $('#toast');
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ---------------------------------------------------------
     1. Ô ảnh: ẩn ảnh lỗi để hiện khung chờ
     --------------------------------------------------------- */
  $$('.photo img').forEach(function (img) {
    var box = img.closest('.photo');
    var ok = function () { img.classList.add('loaded'); box.classList.remove('empty'); };
    var fail = function () { box.classList.add('empty'); };
    if (img.complete) {
      img.naturalWidth ? ok() : fail();
    }
    img.addEventListener('load', ok);
    img.addEventListener('error', fail);
  });

  /* ---------------------------------------------------------
     2. Tên khách mời qua link: ...index.html?khach=Anh%20Nam
     --------------------------------------------------------- */
  var params = new URLSearchParams(location.search);
  var guest = (params.get('khach') || params.get('to') || '').trim().slice(0, 60);
  var nameInput = $('#f-name');
  if (guest) {
    $$('[data-guest]').forEach(function (el) {
      el.textContent = guest;
      el.classList.add('has-guest');
    });
    if (nameInput) nameInput.value = guest;
  }

  /* ---------------------------------------------------------
     3. Nhạc nền
     --------------------------------------------------------- */
  var musicBtn = $('#music-btn');
  var audio = new Audio();
  var trackIndex = 0;
  var userPaused = false;
  var resumeOnShow = false;

  audio.src = CONFIG.musicList[0];
  audio.preload = 'auto';
  audio.loop = CONFIG.musicList.length === 1;
  audio.addEventListener('ended', function () {
    trackIndex = (trackIndex + 1) % CONFIG.musicList.length;
    audio.src = CONFIG.musicList[trackIndex];
    playMusic();
  });

  function syncMusicBtn() {
    var playing = !audio.paused;
    musicBtn.classList.toggle('playing', playing);
    musicBtn.setAttribute('aria-pressed', String(playing));
  }
  audio.addEventListener('play', syncMusicBtn);
  audio.addEventListener('pause', syncMusicBtn);

  function playMusic() {
    var p = audio.play();
    return (p && p.catch) ? p.catch(function () {}) : Promise.resolve();
  }

  musicBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (audio.paused) { userPaused = false; playMusic(); }
    else { userPaused = true; audio.pause(); }
  });

  // Trình duyệt chỉ cho phát nhạc sau lần chạm đầu tiên
  var gestureEvents = ['pointerdown', 'touchend', 'click', 'keydown'];
  function onFirstGesture(e) {
    if (userPaused || (e.target.closest && e.target.closest('#music-btn'))) return;
    playMusic().then(function () {
      if (!audio.paused) gestureEvents.forEach(function (ev) { document.removeEventListener(ev, onFirstGesture, true); });
    });
  }
  gestureEvents.forEach(function (ev) { document.addEventListener(ev, onFirstGesture, true); });

  // Tạm dừng khi khách chuyển sang ứng dụng khác
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      resumeOnShow = !audio.paused;
      audio.pause();
    } else if (resumeOnShow && !userPaused) {
      playMusic();
    }
  });
  syncMusicBtn();

  /* ---------------------------------------------------------
     4. Hiệu ứng xuất hiện khi cuộn
     --------------------------------------------------------- */
  function reveal(el) {
    if (el.classList.contains('in')) return;
    if (!reduceMotion) {
      if (el.dataset.delay) el.style.animationDelay = el.dataset.delay + 's';
      el.style.animationName = el.dataset.anim || 'fadeInUp';
    }
    el.classList.add('in');
  }
  var animStarted = false;
  function startAnimations() {
    if (animStarted) return;
    animStarted = true;
    var els = $$('.anim');
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(reveal); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     5. Màn mở thiệp
     --------------------------------------------------------- */
  var opening = $('#opening');
  function openInvite() {
    if (!opening || opening.classList.contains('open')) return;
    opening.classList.add('open');
    playMusic();
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    setTimeout(startAnimations, 700);
    var done = false;
    var finish = function () {
      if (done) return;
      done = true;
      opening.remove();
      opening = null;
      window.scrollTo(0, 0);
    };
    $('.door-right', opening).addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 3500);
  }
  if (opening) {
    opening.addEventListener('click', openInvite);
    opening.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvite(); }
    });
    if (CONFIG.autoOpenAfter > 0) {
      window.addEventListener('load', function () { setTimeout(openInvite, CONFIG.autoOpenAfter); });
    }
  } else {
    document.body.classList.remove('locked');
    startAnimations();
  }

  /* ---------------------------------------------------------
     6. Đồng hồ đếm ngược
     --------------------------------------------------------- */
  (function () {
    var box = $('#countdown');
    if (!box) return;
    var target = new Date(CONFIG.countdownTarget).getTime();
    if (isNaN(target)) return;
    var el = {
      d: $('[data-days]', box), h: $('[data-hours]', box),
      m: $('[data-minutes]', box), s: $('[data-seconds]', box)
    };
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var timer;
    function tick() {
      var diff = Math.max(target - Date.now(), 0);
      var sec = Math.floor(diff / 1000);
      el.d.textContent = pad(Math.floor(sec / 86400));
      el.h.textContent = pad(Math.floor(sec / 3600) % 24);
      el.m.textContent = pad(Math.floor(sec / 60) % 60);
      el.s.textContent = pad(sec % 60);
      if (diff <= 0) clearInterval(timer);
    }
    tick();
    timer = setInterval(tick, 1000);
  })();

  /* ---------------------------------------------------------
     7. Popup
     --------------------------------------------------------- */
  var openModals = 0;
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m || m.classList.contains('open')) return;
    m.classList.add('open');
    openModals++;
    document.body.classList.add('locked');
    if (id === 'wishes-modal') loadWishList();
  }
  function closeModal(m) {
    if (!m || !m.classList.contains('open')) return;
    m.classList.remove('open');
    openModals = Math.max(0, openModals - 1);
    if (!openModals && !opening) document.body.classList.remove('locked');
  }
  $$('[data-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) { e.preventDefault(); openModal(btn.dataset.open); });
  });
  $$('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) {
      if (e.target === m || e.target.closest('[data-close]')) closeModal(m);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    $$('.modal.open').forEach(closeModal);
    closeLightbox();
  });

  // Sao chép số tài khoản
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyText(btn.dataset.copy).then(
        function () { toast('Đã sao chép số tài khoản: ' + btn.dataset.copy); },
        function () { toast('Không sao chép được, Quý Khách vui lòng ghi lại STK.'); }
      );
    });
  });

  /* ---------------------------------------------------------
     8. Form gửi lời chúc & xác nhận tham dự
     --------------------------------------------------------- */
  var LOCAL_KEY = 'wedding-wishes';
  function getLocalWishes() {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; } catch (e) { return []; }
  }

  function saveWish(data) {
    if (!CONFIG.sheetEndpoint) {
      var list = getLocalWishes();
      list.push(data);
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(list)); } catch (e) { /* bỏ qua */ }
      return new Promise(function (r) { setTimeout(r, 500); });
    }
    return fetch(CONFIG.sheetEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // tránh lỗi CORS với Apps Script
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json().catch(function () { return { ok: true }; });
    }).then(function (j) {
      if (j && j.ok === false) throw new Error(j.error || 'Lỗi máy chủ');
    });
  }

  function loadWishes() {
    if (!CONFIG.sheetEndpoint) return Promise.resolve(getLocalWishes());
    var sep = CONFIG.sheetEndpoint.indexOf('?') > -1 ? '&' : '?';
    return fetch(CONFIG.sheetEndpoint + sep + 't=' + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (j) { return Array.isArray(j.wishes) ? j.wishes : []; });
  }

  var form = $('#rsvp-form');
  var submitBtn = $('#rsvp-submit');
  if (form && submitBtn) {
    var defaultText = submitBtn.textContent;
    var resetTimer;

    $$('.field', form).forEach(function (f) {
      f.addEventListener('input', function () { f.classList.remove('error'); });
      f.addEventListener('change', function () { f.classList.remove('error'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;

      var nameEl = form.elements.guestName;
      var msgEl = form.elements.message;
      var attendEl = form.elements.attend;
      var invalid = [];
      if (!nameEl.value.trim()) invalid.push(nameEl);
      if (!msgEl.value.trim()) invalid.push(msgEl);
      if (!attendEl.value) invalid.push(attendEl);
      if (invalid.length) {
        invalid.forEach(function (f) { f.classList.add('error'); });
        invalid[0].focus();
        toast('Quý Khách vui lòng điền đầy đủ thông tin nhé!');
        return;
      }

      var data = {
        name: nameEl.value.trim(),
        message: msgEl.value.trim(),
        attend: attendEl.selectedOptions[0].text.trim(),
        createdAt: new Date().toISOString()
      };

      submitBtn.disabled = true;
      submitBtn.textContent = 'ĐANG GỬI...';
      clearTimeout(resetTimer);

      saveWish(data).then(function () {
        submitBtn.textContent = 'ĐÃ GỬI THÀNH CÔNG ❤️';
        form.reset();
        if (guest && nameInput) nameInput.value = guest;
        toast('Cảm ơn Quý Khách đã gửi lời chúc!');
      }).catch(function (err) {
        console.error(err);
        submitBtn.textContent = 'GỬI THẤT BẠI 💔';
        toast('Gửi chưa được, Quý Khách thử lại giúp nhé.');
      }).then(function () {
        resetTimer = setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = defaultText;
        }, 4000);
      });
    });
  }

  /* Danh sách phản hồi */
  var listEl = $('#wish-list');
  var listTitle = $('#wishes-title');
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtTime(v) {
    var d = new Date(v);
    if (isNaN(d)) return '';
    var p = function (n) { return String(n).padStart(2, '0'); };
    return p(d.getHours()) + ':' + p(d.getMinutes()) + ', ' + p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear();
  }
  function loadWishList() {
    if (!listEl) return;
    listEl.innerHTML = '<p class="wish-empty">Đang tải...</p>';
    loadWishes().then(function (wishes) {
      wishes.sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
      if (listTitle) listTitle.textContent = 'DANH SÁCH PHẢN HỒI (' + wishes.length + ')';
      if (!wishes.length) {
        listEl.innerHTML = '<p class="wish-empty">Chưa có phản hồi nào.<br>Hãy là người đầu tiên gửi lời chúc nhé!</p>';
        return;
      }
      listEl.innerHTML = wishes.map(function (w) {
        var no = /không/i.test(w.attend || '');
        return '<div class="wish">' +
          '<div class="wish-head"><span class="wish-name">' + esc(w.name) + '</span>' +
          (w.attend ? '<span class="wish-tag' + (no ? ' no' : '') + '">' + esc(no ? 'Không thể tham dự' : 'Sẽ tham dự') + '</span>' : '') +
          '</div>' +
          '<p class="wish-msg">' + esc(w.message) + '</p>' +
          '<p class="wish-time">' + esc(fmtTime(w.createdAt)) + '</p>' +
          '</div>';
      }).join('');
    }).catch(function (err) {
      console.error(err);
      listEl.innerHTML = '<p class="wish-empty">Không tải được dữ liệu.</p>';
    });
  }

  /* ---------------------------------------------------------
     9. Xem ảnh phóng to (vuốt trái/phải để chuyển ảnh)
     --------------------------------------------------------- */
  var lb = $('#lightbox');
  var lbImg = $('.lb-img', lb);
  var lbCount = $('.lb-count', lb);
  var lbList = [];
  var lbIndex = 0;

  function showLb(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    lbImg.src = lbList[lbIndex].currentSrc || lbList[lbIndex].src;
    lbCount.textContent = (lbIndex + 1) + ' / ' + lbList.length;
  }
  function openLightbox(img) {
    lbList = $$('.photo.zoom:not(.empty) img.loaded');
    var i = lbList.indexOf(img);
    if (i < 0) return;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
    showLb(i);
  }
  function closeLightbox() {
    if (!lb.classList.contains('open')) return;
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    if (!openModals && !opening) document.body.classList.remove('locked');
  }
  $$('.photo.zoom').forEach(function (box) {
    box.addEventListener('click', function () {
      var img = $('img', box);
      if (img && img.classList.contains('loaded')) openLightbox(img);
    });
  });
  $('.lb-close', lb).addEventListener('click', closeLightbox);
  $('.lb-prev', lb).addEventListener('click', function (e) { e.stopPropagation(); showLb(lbIndex - 1); });
  $('.lb-next', lb).addEventListener('click', function (e) { e.stopPropagation(); showLb(lbIndex + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
  });
  var touchX = null;
  lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });
})();

