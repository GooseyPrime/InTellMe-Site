/* InTellMe — atmosphere.  Progressive enhancement only.
   Every route renders complete without this file. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* --- sticky nav: background only after 8px of scroll ------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- mobile drawer with focus trap -------------------------- */
  var drawer = document.getElementById('drawer');
  var open = document.getElementById('drawer-open');
  var close = document.getElementById('drawer-close');
  if (drawer && open && close) {
    var lastFocus = null;
    var focusables = function () {
      return drawer.querySelectorAll('a[href], button:not([disabled])');
    };
    var setOpen = function (state) {
      drawer.hidden = !state;
      open.setAttribute('aria-expanded', String(state));
      document.body.style.overflow = state ? 'hidden' : '';
      if (state) { lastFocus = document.activeElement; close.focus(); }
      else if (lastFocus) { lastFocus.focus(); }
    };
    open.addEventListener('click', function () { setOpen(true); });
    close.addEventListener('click', function () { setOpen(false); });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (drawer.hidden) return;
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* --- scroll reveal: once, threshold 0.18 -------------------- */
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* --- cursor dust: desktop, fine pointer, motion allowed ----- */
  var canvas = document.getElementById('dust');
  var fine = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
  if (canvas && fine.matches && !reduce.matches) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, raf = null;
    var pt = { x: -999, y: -999 };
    var trail = [];
    for (var k = 0; k < 7; k++) trail.push({ x: -999, y: -999 });

    var size = function () {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener('resize', size, { passive: true });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      pt.x = e.clientX; pt.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(draw);
    }, { passive: true });
    window.addEventListener('pointerleave', function () { pt.x = -999; pt.y = -999; });

    function draw() {
      ctx.clearRect(0, 0, w, h);
      var prev = pt;
      for (var i = 0; i < trail.length; i++) {
        var p = trail[i];
        p.x += (prev.x - p.x) * 0.12;
        p.y += (prev.y - p.y) * 0.12;
        var r = 6 + (i / trail.length) * 4;
        var a = 0.12 - (i / trail.length) * 0.04;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(198, 163, 106, ' + a.toFixed(3) + ')';
        ctx.fill();
        prev = p;
      }
      raf = requestAnimationFrame(draw);
    }
  }
})();
