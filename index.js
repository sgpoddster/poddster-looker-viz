/* global dscc */
'use strict';

// ── Constants ─────────────────────────────────────────────────────────────
var MONTH_W   = 48;   // px per month (default)
var ROW_H     = 32;
var MONTHS    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── State ─────────────────────────────────────────────────────────────────
var sortKey     = 'first';
var fitMode     = false;
var allClients  = [];
var nMonths     = 0;
var sMon        = null;
var totalW      = 0;
var todayX      = 0;
var activeColor = '#1a73e8';
var cancelColor = '#ea4335';
var barColor    = '#93bbf5';

// ── Build DOM skeleton (once) ──────────────────────────────────────────────
document.body.innerHTML = [
  '<div id="toolbar">',
    '<span>Sort:</span>',
    '<button class="btn active" id="btn-first">First booking</button>',
    '<button class="btn"        id="btn-last">Last booking</button>',
    '<button class="btn"        id="btn-count">Most visits</button>',
    '<button class="btn"        id="btn-email">Email A→Z</button>',
    '<div class="spacer"></div>',
    '<button class="btn"        id="btn-fit">↔ Fit all</button>',
    '<span class="chip" id="s-clients">—</span>',
    '<span class="chip" id="s-bookings">—</span>',
  '</div>',
  '<div id="main">',
    '<div id="left">',
      '<div id="left-head">Client</div>',
      '<div id="left-body"><div id="left-inner"></div></div>',
    '</div>',
    '<div id="right">',
      '<div id="right-inner">',
        '<div id="time-head"></div>',
        '<div id="gantt-rows"><div id="grid-overlay"></div></div>',
      '</div>',
    '</div>',
  '</div>',
  '<div id="legend">',
    '<span class="ld" id="leg-active"></span>Active &nbsp;',
    '<span class="ld" id="leg-cancel" style="background:#ea4335"></span>Cancelled &nbsp;',
    '<span class="ll" style="background:#fbbc04"></span>Today &nbsp;',
    '<span class="ll" id="leg-bar"></span>Booking span',
  '</div>',
  '<div id="tt"></div>'
].join('');

// ── Element refs ──────────────────────────────────────────────────────────
var rightEl     = document.getElementById('right');
var rightInner  = document.getElementById('right-inner');
var leftInnerEl = document.getElementById('left-inner');
var timeHead    = document.getElementById('time-head');
var ganttRows   = document.getElementById('gantt-rows');
var gridOverlay = document.getElementById('grid-overlay');
var ttEl        = document.getElementById('tt');

// ── Scroll sync ───────────────────────────────────────────────────────────
rightEl.addEventListener('scroll', function () {
  leftInnerEl.style.transform = 'translateY(-' + this.scrollTop + 'px)';
});

// ── Sort buttons ──────────────────────────────────────────────────────────
[['btn-first','first'],['btn-last','last'],['btn-count','count'],['btn-email','email']]
  .forEach(function (pair) {
    document.getElementById(pair[0]).addEventListener('click', function () {
      sortKey = pair[1];
      document.querySelectorAll('#btn-first,#btn-last,#btn-count,#btn-email')
        .forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      renderRows();
    });
  });

document.getElementById('btn-fit').addEventListener('click', function () {
  fitMode = !fitMode;
  this.classList.toggle('active', fitMode);
  MONTH_W = fitMode ? Math.max(5, Math.floor(rightEl.clientWidth / nMonths)) : 48;
  computeLayout();
  renderHeader();
  renderRows();
  if (!fitMode) rightEl.scrollLeft = Math.max(0, todayX - rightEl.clientWidth * 0.6);
});

// ── Layout helpers ────────────────────────────────────────────────────────
function mDiff(a, b) {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
}

function computeLayout() {
  totalW = nMonths * MONTH_W;
  var now = new Date();
  todayX = (mDiff(sMon, new Date(now.getFullYear(), now.getMonth(), 1))
            + (now.getDate() - 1) / 30) * MONTH_W;
  rightInner.style.width    = totalW + 'px';
  rightInner.style.minWidth = totalW + 'px';
}

function dateToX(dt) {
  return (mDiff(sMon, new Date(dt.getFullYear(), dt.getMonth(), 1))
          + (dt.getDate() - 1) / 30) * MONTH_W;
}

// ── Parse Looker Studio date string (YYYYMMDD) ────────────────────────────
function parseLS(str) {
  if (!str || str.length < 8) return null;
  var y = parseInt(str.substr(0, 4), 10);
  var m = parseInt(str.substr(4, 2), 10) - 1;
  var d = parseInt(str.substr(6, 2), 10);
  var dt = new Date(y, m, d);
  return isNaN(dt.getTime()) ? null : dt;
}

// ── Render timeline header ─────────────────────────────────────────────────
function renderHeader() {
  timeHead.innerHTML = '';
  timeHead.style.width = totalW + 'px';
  var prevYr = -1;
  for (var i = 0; i < nMonths; i++) {
    var d = new Date(sMon.getFullYear(), sMon.getMonth() + i, 1);
    var x = i * MONTH_W;
    if (d.getFullYear() !== prevYr) {
      var yl = mk('div', 'yr-lbl');
      yl.style.left  = x + 'px';
      yl.textContent = d.getFullYear();
      timeHead.appendChild(yl);
      prevYr = d.getFullYear();
    }
    if (MONTH_W >= 16) {
      var ml = mk('div', 'mo-lbl');
      ml.style.left  = (x + MONTH_W / 2) + 'px';
      ml.textContent = MONTHS[d.getMonth()];
      timeHead.appendChild(ml);
    }
  }
}

// ── Render grid overlay ────────────────────────────────────────────────────
function renderGrid(numRows) {
  gridOverlay.innerHTML = '';
  gridOverlay.style.width  = totalW + 'px';
  gridOverlay.style.height = (numRows * ROW_H) + 'px';

  for (var i = 0; i <= nMonths; i++) {
    var d  = new Date(sMon.getFullYear(), sMon.getMonth() + i, 1);
    var gl = document.createElement('div');
    gl.style.cssText = 'position:absolute;top:0;bottom:0;width:1px;left:'
      + (i * MONTH_W) + 'px;background:'
      + (d.getMonth() === 0 ? '#e0e0e0' : '#f0f0f0') + ';';
    gridOverlay.appendChild(gl);
  }

  var tl = document.createElement('div');
  tl.style.cssText = 'position:absolute;top:0;width:2px;left:'
    + todayX + 'px;height:' + (numRows * ROW_H) + 'px;background:#fbbc04;';
  gridOverlay.appendChild(tl);
}

// ── Render client rows ────────────────────────────────────────────────────
function renderRows() {
  var clients = allClients.slice().sort(function (a, b) {
    if (sortKey === 'first') return a.firstDate - b.firstDate;
    if (sortKey === 'last')  return b.lastDate  - a.lastDate;
    if (sortKey === 'count') return b.count     - a.count;
    return a.email.localeCompare(b.email);
  });

  leftInnerEl.innerHTML = '';
  while (ganttRows.firstChild) ganttRows.removeChild(ganttRows.firstChild);
  ganttRows.appendChild(gridOverlay);

  clients.forEach(function (c) {
    // Left cell
    var lr   = mk('div', 'l-row');
    var info = mk('div', 'cl-info');
    var nm   = mk('div', 'cl-name');
    nm.title = c.email;
    nm.textContent = c.name || c.email;
    info.appendChild(nm);
    if (c.name) {
      var sub = mk('div', 'cl-sub');
      sub.textContent = c.email;
      info.appendChild(sub);
    }
    lr.appendChild(info);
    var badge = mk('div', 'cnt-badge');
    badge.textContent = c.count + 'x';
    lr.appendChild(badge);
    leftInnerEl.appendChild(lr);

    // Gantt row
    var gr = mk('div', 'g-row');
    gr.style.width = totalW + 'px';

    if (c.count > 1) {
      var bar = mk('div', 'g-bar');
      var fx  = dateToX(c.firstDate), lx = dateToX(c.lastDate);
      bar.style.left       = fx + 'px';
      bar.style.width      = Math.max(lx - fx, 2) + 'px';
      bar.style.background = barColor;
      gr.appendChild(bar);
    }

    c.bookings.forEach(function (b) {
      var dot = mk('div', 'dot');
      dot.style.left       = dateToX(b.date) + 'px';
      dot.style.background = b.cancelled ? cancelColor : activeColor;
      dot._b = b;
      dot.addEventListener('mouseenter', showTT);
      dot.addEventListener('mouseleave', hideTT);
      dot.addEventListener('mousemove',  moveTT);
      gr.appendChild(dot);
    });

    ganttRows.appendChild(gr);
  });

  renderGrid(clients.length);

  var total = clients.reduce(function (s, c) { return s + c.count; }, 0);
  document.getElementById('s-clients').textContent  = clients.length + ' clients';
  document.getElementById('s-bookings').textContent = total + ' bookings';
}

// ── Tooltip ───────────────────────────────────────────────────────────────
function showTT(e) {
  var b = this._b;
  var h = '<div class="tt-ttl">' + esc(b.dateLabel) + '</div>';
  if (b.name)   h += row_('Client', b.name);
  h += row_('Email', b.email);
  h += '<div><span class="tt-lbl">Status: </span>'
     + '<span style="color:' + (b.cancelled ? '#f28b82' : '#81c995') + '">'
     + (b.cancelled ? 'Cancelled' : 'Active') + '</span></div>';
  ttEl.innerHTML = h;
  ttEl.style.display = 'block';
  posTT(e);
}
function moveTT(e) { posTT(e); }
function hideTT()  { ttEl.style.display = 'none'; }
function posTT(e) {
  var x = e.clientX + 12, y = e.clientY - 8;
  if (x + 250 > window.innerWidth)  x = e.clientX - 254;
  if (y + 140 > window.innerHeight) y = e.clientY - 120;
  ttEl.style.left = x + 'px';
  ttEl.style.top  = y + 'px';
}
function row_(l, v) { return '<div><span class="tt-lbl">' + l + ': </span>' + esc(v) + '</div>'; }
function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function mk(tag, cls) { var el = document.createElement(tag); if (cls) el.className = cls; return el; }

// ── Main data callback (called by Looker Studio on every data refresh) ────
function drawViz(data) {
  // Read style values
  var st      = data.style || {};
  activeColor = (st.activeColor && st.activeColor.value && st.activeColor.value.color) || '#1a73e8';
  cancelColor = (st.cancelColor && st.cancelColor.value && st.cancelColor.value.color) || '#ea4335';
  barColor    = (st.barColor    && st.barColor.value    && st.barColor.value.color)    || '#93bbf5';

  // Update legend dots
  document.getElementById('leg-active').style.background = activeColor;
  document.getElementById('leg-cancel').style.background = cancelColor;
  document.getElementById('leg-bar').style.background    = barColor;

  // Process rows — each row = one booking (email + date dimensions)
  var rows = data.tables.DEFAULT;
  var clientMap = {};

  rows.forEach(function (row) {
    var email  = ((row.emailDim  || [])[0] || '').toLowerCase().trim();
    var dStr   = ((row.dateDim   || [])[0] || '');
    var name   = ((row.nameDim   || [])[0] || '');
    var status = ((row.statusDim || [])[0] || '');

    if (!email) return;
    var dt = parseLS(dStr);
    if (!dt) return;

    if (!clientMap[email]) {
      clientMap[email] = { email: email, name: name, bookings: [] };
    }
    if (!clientMap[email].name && name) clientMap[email].name = name;

    clientMap[email].bookings.push({
      date:      dt,
      dateLabel: dt.getDate() + ' ' + MONTHS[dt.getMonth()] + ' ' + dt.getFullYear(),
      email:     email,
      name:      name,
      cancelled: /cancel/i.test(status)
    });
  });

  // Build client array with first/last/count
  allClients = Object.keys(clientMap).map(function (email) {
    var c       = clientMap[email];
    var sorted  = c.bookings.sort(function (a, b) { return a.date - b.date; });
    return {
      email:     c.email,
      name:      c.name,
      bookings:  sorted,
      firstDate: sorted[0].date,
      lastDate:  sorted[sorted.length - 1].date,
      count:     sorted.length
    };
  });

  if (!allClients.length) {
    document.body.innerHTML = '<p style="padding:20px;color:#666">No data — check your field mappings.</p>';
    return;
  }

  // Compute timeline bounds
  var minMs = Math.min.apply(null, allClients.map(function (c) { return c.firstDate.getTime(); }));
  var sd    = new Date(minMs);
  sMon      = new Date(sd.getFullYear(), sd.getMonth(), 1);
  var now   = new Date();
  var eMon  = new Date(now.getFullYear(), now.getMonth() + 2, 1);
  nMonths   = mDiff(sMon, eMon);

  // Fit mode: recalculate MONTH_W if active
  if (fitMode) {
    MONTH_W = Math.max(5, Math.floor(rightEl.clientWidth / nMonths));
  } else {
    MONTH_W = 48;
  }

  computeLayout();
  renderHeader();
  renderRows();

  // Scroll to show recent activity
  if (!fitMode) rightEl.scrollLeft = Math.max(0, todayX - rightEl.clientWidth * 0.6);
}

// ── Subscribe to Looker Studio data ───────────────────────────────────────
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
