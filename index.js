!function(e,R){"object"==typeof exports&&"object"==typeof module?module.exports=R():"function"==typeof define&&define.amd?define("dscc",[],R):"object"==typeof exports?exports.dscc=R():e.dscc=R()}(window,function(){return C={},n.m=t={"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */function(e,N,R){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var R,t=1,C=arguments.length;t<C;t++)for(var n in R=arguments[t])Object.prototype.hasOwnProperty.call(R,n)&&(e[n]=R[n]);return e}).apply(this,arguments)};Object.defineProperty(N,"__esModule",{value:!0});
/*!
  @license
  Copyright 2019 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
var a=R(/*! ./types */"./src/types.ts");!function(e){for(var R in e)N.hasOwnProperty(R)||(N[R]=e[R])}(R(/*! ./types */"./src/types.ts")),N.getWidth=function(){return document.body.clientWidth},N.getHeight=function(){return document.documentElement.clientHeight},N.getComponentId=function(){var e=new URLSearchParams(window.location.search);if(null!==e.get("dscId"))return e.get("dscId");throw new Error("dscId must be in the query parameters. This is a bug in ds-component, please file a bug: https://github.com/googledatastudio/ds-component/issues/new")};function E(e){return e.type===a.ConfigDataElementType.DIMENSION||e.type===a.ConfigDataElementType.METRIC}function r(e){return e===a.ConfigDataElementType.DIMENSION?-1:1}function _(e){var R=[];e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){R.push(e)})});var t,C=(t=function(e,R){return r(e.type)-r(R.type)},R.map(function(e,R){return{item:e,index:R}}).sort(function(e,R){return t(e.item,R.item)||e.index-R.index}).map(function(e){return e.item})),n=[];return C.forEach(function(e){e.value.forEach(function(){return n.push(e.id)})}),n}function o(R){return function(e){var t,C,n={};return C=R,((t=e).length<C.length?t.map(function(e,R){return[e,C[R]]}):C.map(function(e,R){return[t[R],e]})).forEach(function(e){var R=e[0],t=e[1];void 0===n[t]&&(n[t]=[]),n[t].push(R)},{}),n}}N.fieldsByConfigId=function(e){var R=e.fields.reduce(function(e,R){return e[R.id]=R,e},{}),t={};return e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){t[e.id]=e.value.map(function(e){return R[e]})})}),t};function U(e){var R={};return(e.config.style||[]).forEach(function(e){e.elements.forEach(function(e){if(void 0!==R[e.id])throw new Error("styleIds must be unique. Your styleId: '"+e.id+"' is used more than once.");R[e.id]={value:e.value,defaultValue:e.defaultValue}})},{}),R}function Y(e){return e.config.themeStyle}function n(e){switch(e){case a.DSInteractionType.FILTER:return a.InteractionType.FILTER}}function s(e){var R=e.config.interactions;return void 0===R?{}:R.reduce(function(e,R){var t=R.supportedActions.map(n),C={type:n(R.value.type),data:R.value.data};return e[R.id]={value:C,supportedActions:t},e},{})}function u(e){return(e.dataResponse.dateRanges||[]).reduce(function(e,R){return e[R.id]={start:R.start,end:R.end},e},{})}function T(e){var R=e.dataResponse.colorMap||{};return i({},R)}N.tableTransform=function(e){return{tables:(R=e,C=N.fieldsByConfigId(R),n=_(R),E={},r=n.map(function(e){void 0===E[e]?E[e]=0:E[e]++;var R=E[e],t=C[e][R];return i(i({},t),{configId:e})}),(t={})[a.TableType.DEFAULT]={headers:[],rows:[]},o=t,R.dataResponse.tables.forEach(function(e){o[e.id]={headers:r,rows:e.rows}}),o),dateRanges:u(e),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e),colorMap:T(e)};var R,t,C,n,E,r,o},N.objectTransform=function(e){return{tables:(C=_(R=e),(t={})[a.TableType.DEFAULT]=[],n=t,R.dataResponse.tables.forEach(function(e){var R=e.rows.map(o(C));e.id===a.TableType.DEFAULT?n[e.id]=R:(void 0===n[e.id]&&(n[e.id]=[]),n[e.id]=n[e.id].concat(R))}),n),dateRanges:u(e),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e),colorMap:T(e)};var R,t,C,n};function c(e){var R,t=!1;return e===N.tableTransform||e===N.objectTransform?t=!0:(R=!1,"identity"===e("identity")&&(R=!0,console.warn("This is an unsupported data format. Please use one of the supported transforms:\n       dscc.objectFormat or dscc.tableFormat.")),R&&(t=!0)),t}N.subscribeToData=function(R,t){if(c(t.transform)){var e=function(e){e.data.type===a.MessageType.RENDER?R(t.transform(e.data)):console.error("MessageType: "+e.data.type+" is not supported by this version of the library.")};window.addEventListener("message",e);var C={componentId:N.getComponentId(),type:a.ToDSMessageType.VIZ_READY};return window.parent.postMessage(C,"*"),function(){return window.removeEventListener("message",e)}}throw new Error("Only the built in transform functions are supported.")},N.sendInteraction=function(e,R,t){var C=N.getComponentId(),n={type:a.ToDSMessageType.INTERACTION,id:e,data:t,componentId:C};window.parent.postMessage(n,"*")},N.clearInteraction=function(e,R){N.sendInteraction(e,R,void 0)}},"./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */function(e,R,t){"use strict";var C,n,E,r,o,N,i;Object.defineProperty(R,"__esModule",{value:!0}),(C=R.ConceptType||(R.ConceptType={})).METRIC="METRIC",C.DIMENSION="DIMENSION",(R.MessageType||(R.MessageType={})).RENDER="RENDER",(n=R.FieldType||(R.FieldType={})).YEAR="YEAR",n.YEAR_QUARTER="YEAR_QUARTER",n.YEAR_MONTH="YEAR_MONTH",n.YEAR_WEEK="YEAR_WEEK",n.YEAR_MONTH_DAY="YEAR_MONTH_DAY",n.YEAR_MONTH_DAY_HOUR="YEAR_MONTH_DAY_HOUR",n.QUARTER="QUARTER",n.MONTH="MONTH",n.WEEK="WEEK",n.MONTH_DAY="MONTH_DAY",n.DAY_OF_WEEK="DAY_OF_WEEK",n.DAY="DAY",n.HOUR="HOUR",n.MINUTE="MINUTE",n.DURATION="DURATION",n.COUNTRY="COUNTRY",n.COUNTRY_CODE="COUNTRY_CODE",n.CONTINENT="CONTINENT",n.CONTINENT_CODE="CONTINENT_CODE",n.SUB_CONTINENT="SUB_CONTINENT",n.SUB_CONTINENT_CODE="SUB_CONTINENT_CODE",n.REGION="REGION",n.REGION_CODE="REGION_CODE",n.CITY="CITY",n.CITY_CODE="CITY_CODE",n.METRO_CODE="METRO_CODE",n.LATITUDE_LONGITUDE="LATITUDE_LONGITUDE",n.NUMBER="NUMBER",n.PERCENT="PERCENT",n.TEXT="TEXT",n.BOOLEAN="BOOLEAN",n.URL="URL",n.IMAGE="IMAGE",n.CURRENCY_AED="CURRENCY_AED",n.CURRENCY_ALL="CURRENCY_ALL",n.CURRENCY_ARS="CURRENCY_ARS",n.CURRENCY_AUD="CURRENCY_AUD",n.CURRENCY_BDT="CURRENCY_BDT",n.CURRENCY_BGN="CURRENCY_BGN",n.CURRENCY_BOB="CURRENCY_BOB",n.CURRENCY_BRL="CURRENCY_BRL",n.CURRENCY_CAD="CURRENCY_CAD",n.CURRENCY_CDF="CURRENCY_CDF",n.CURRENCY_CHF="CURRENCY_CHF",n.CURRENCY_CLP="CURRENCY_CLP",n.CURRENCY_CNY="CURRENCY_CNY",n.CURRENCY_COP="CURRENCY_COP",n.CURRENCY_CRC="CURRENCY_CRC",n.CURRENCY_CZK="CURRENCY_CZK",n.CURRENCY_DKK="CURRENCY_DKK",n.CURRENCY_DOP="CURRENCY_DOP",n.CURRENCY_EGP="CURRENCY_EGP",n.CURRENCY_ETB="CURRENCY_ETB",n.CURRENCY_EUR="CURRENCY_EUR",n.CURRENCY_GBP="CURRENCY_GBP",n.CURRENCY_HKD="CURRENCY_HKD",n.CURRENCY_HRK="CURRENCY_HRK",n.CURRENCY_HUF="CURRENCY_HUF",n.CURRENCY_IDR="CURRENCY_IDR",n.CURRENCY_ILS="CURRENCY_ILS",n.CURRENCY_INR="CURRENCY_INR",n.CURRENCY_IRR="CURRENCY_IRR",n.CURRENCY_ISK="CURRENCY_ISK",n.CURRENCY_JMD="CURRENCY_JMD",n.CURRENCY_JPY="CURRENCY_JPY",n.CURRENCY_KRW="CURRENCY_KRW",n.CURRENCY_LKR="CURRENCY_LKR",n.CURRENCY_LTL="CURRENCY_LTL",n.CURRENCY_MNT="CURRENCY_MNT",n.CURRENCY_MVR="CURRENCY_MVR",n.CURRENCY_MXN="CURRENCY_MXN",n.CURRENCY_MYR="CURRENCY_MYR",n.CURRENCY_NOK="CURRENCY_NOK",n.CURRENCY_NZD="CURRENCY_NZD",n.CURRENCY_PAB="CURRENCY_PAB",n.CURRENCY_PEN="CURRENCY_PEN",n.CURRENCY_PHP="CURRENCY_PHP",n.CURRENCY_PKR="CURRENCY_PKR",n.CURRENCY_PLN="CURRENCY_PLN",n.CURRENCY_RON="CURRENCY_RON",n.CURRENCY_RSD="CURRENCY_RSD",n.CURRENCY_RUB="CURRENCY_RUB",n.CURRENCY_SAR="CURRENCY_SAR",n.CURRENCY_SEK="CURRENCY_SEK",n.CURRENCY_SGD="CURRENCY_SGD",n.CURRENCY_THB="CURRENCY_THB",n.CURRENCY_TRY="CURRENCY_TRY",n.CURRENCY_TWD="CURRENCY_TWD",n.CURRENCY_TZS="CURRENCY_TZS",n.CURRENCY_UAH="CURRENCY_UAH",n.CURRENCY_USD="CURRENCY_USD",n.CURRENCY_UYU="CURRENCY_UYU",n.CURRENCY_VEF="CURRENCY_VEF",n.CURRENCY_VND="CURRENCY_VND",n.CURRENCY_YER="CURRENCY_YER",n.CURRENCY_ZAR="CURRENCY_ZAR",(E=R.TableType||(R.TableType={})).DEFAULT="DEFAULT",E.COMPARISON="COMPARISON",E.SUMMARY="SUMMARY",(r=R.DateRangeType||(R.DateRangeType={})).DEFAULT="DEFAULT",r.COMPARISON="COMPARISON",(o=R.ConfigDataElementType||(R.ConfigDataElementType={})).METRIC="METRIC",o.DIMENSION="DIMENSION",o.MAX_RESULTS="MAX_RESULTS",(N=R.ConfigStyleElementType||(R.ConfigStyleElementType={})).TEXTINPUT="TEXTINPUT",N.SELECT_SINGLE="SELECT_SINGLE",N.CHECKBOX="CHECKBOX",N.FONT_COLOR="FONT_COLOR",N.FONT_SIZE="FONT_SIZE",N.FONT_FAMILY="FONT_FAMILY",N.FILL_COLOR="FILL_COLOR",N.BORDER_COLOR="BORDER_COLOR",N.AXIS_COLOR="AXIS_COLOR",N.GRID_COLOR="GRID_COLOR",N.OPACITY="OPACITY",N.LINE_WEIGHT="LINE_WEIGHT",N.LINE_STYLE="LINE_STYLE",N.BORDER_RADIUS="BORDER_RADIUS",N.INTERVAL="INTERVAL",N.SELECT_RADIO="SELECT_RADIO",(R.DSInteractionType||(R.DSInteractionType={})).FILTER="FILTER",(i=R.ToDSMessageType||(R.ToDSMessageType={})).VIZ_READY="vizReady",i.INTERACTION="vizAction",(R.InteractionType||(R.InteractionType={})).FILTER="FILTER"}},n.c=C,n.d=function(e,R,t){n.o(e,R)||Object.defineProperty(e,R,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(R,e){if(1&e&&(R=n(R)),8&e)return R;if(4&e&&"object"==typeof R&&R&&R.__esModule)return R;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:R}),2&e&&"string"!=typeof R)for(var C in R)n.d(t,C,function(e){return R[e]}.bind(null,C));return t},n.n=function(e){var R=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(R,"a",R),R},n.o=function(e,R){return Object.prototype.hasOwnProperty.call(e,R)},n.p="",n(n.s="./src/index.ts");function n(e){if(C[e])return C[e].exports;var R=C[e]={i:e,l:!1,exports:{}};return t[e].call(R.exports,R,R.exports,n),R.l=!0,R.exports}var t,C});
/* global dscc */
'use strict';

// ── Constants ─────────────────────────────────────────────────────────────
var MONTH_W   = 48;   // px per month (default)
var ROW_H     = 34;
var MONTHS    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── State ─────────────────────────────────────────────────────────────────
var sortKey     = 'first';
var fitMode     = false;
var allClients  = [];
var nMonths     = 0;
var sMon        = null;
var totalW      = 0;
var todayX      = 0;
var activeColor = '#8ab4f8';
var cancelColor = '#f28b82';
var barColor    = '#3d6eb4';

// ── Build DOM skeleton (once) ──────────────────────────────────────────────
document.body.innerHTML = [
  '<div id="stats-bar">',
    '<div class="stat-card">',
      '<div class="stat-title">Active clients (30d)</div>',
      '<div class="stat-val" id="sv-active">—</div>',
      '<div class="stat-chg" id="sc-active"></div>',
    '</div>',
    '<div class="stat-card">',
      '<div class="stat-title">Bookings (30d)</div>',
      '<div class="stat-val" id="sv-book30">—</div>',
      '<div class="stat-chg" id="sc-book30"></div>',
    '</div>',
    '<div class="stat-card">',
      '<div class="stat-title">New clients (30d)</div>',
      '<div class="stat-val" id="sv-new">—</div>',
      '<div class="stat-chg" id="sc-new"></div>',
    '</div>',
    '<div class="stat-card stat-plain">',
      '<div class="stat-title">All-time clients</div>',
      '<div class="stat-val" id="sv-total">—</div>',
    '</div>',
  '</div>',
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

// Stats bar refs
var svActive  = document.getElementById('sv-active');
var scActive  = document.getElementById('sc-active');
var svBook30  = document.getElementById('sv-book30');
var scBook30  = document.getElementById('sc-book30');
var svNew     = document.getElementById('sv-new');
var scNew     = document.getElementById('sc-new');
var svTotal   = document.getElementById('sv-total');

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
  activeColor = (st.activeColor && st.activeColor.value && st.activeColor.value.color) || '#8ab4f8';
  cancelColor = (st.cancelColor && st.cancelColor.value && st.cancelColor.value.color) || '#f28b82';
  barColor    = (st.barColor    && st.barColor.value    && st.barColor.value.color)    || '#3d6eb4';

  // Update legend dots
  document.getElementById('leg-active').style.background = activeColor;
  document.getElementById('leg-cancel').style.background = cancelColor;
  document.getElementById('leg-bar').style.background    = barColor;

  // Process rows — each row = one booking (email + date dimensions)
  var rows = data.tables.DEFAULT;
  var clientMap = {};

  // Some bookings are made under the studio's own email address.
  // When that happens the real client email is often in the Customer Name field.
  var EMAIL_RE    = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var STUDIO_ADDR = 'singapore@poddster.com';

  rows.forEach(function (row) {
    var rawEmail = ((row.emailDim   || [])[0] || '').toLowerCase().trim();
    var dStr     = ((row.dateDim    || [])[0] || '');
    var rawName  = ((row.nameDim    || [])[0] || '').trim();
    var status   = ((row.statusDim  || [])[0] || '');
    // orderIdDim is mapped to make each booking row unique so Looker Studio
    // doesn't merge same-day bookings for the same client into one row.

    // Resolve the true client email:
    // If the booking email is the studio address but Customer Name is itself
    // a valid email, that name IS the real client identifier.
    var email, name;
    if (rawEmail === STUDIO_ADDR && EMAIL_RE.test(rawName)) {
      email = rawName.toLowerCase();
      name  = '';   // no separate display name available
    } else {
      email = rawEmail;
      // Only use Customer Name as a display name if it isn't just an email address
      name  = EMAIL_RE.test(rawName) ? '' : rawName;
    }

    if (!email) return;
    var dt = parseLS(dStr);
    if (!dt) return;

    if (!clientMap[email]) {
      clientMap[email] = { email: email, name: name, bookings: [] };
    }
    // Keep the best (non-empty, non-email) display name seen for this client
    if (!clientMap[email].name && name) clientMap[email].name = name;

    clientMap[email].bookings.push({
      date:      dt,
      dateLabel: dt.getDate() + ' ' + MONTHS[dt.getMonth()] + ' ' + dt.getFullYear(),
      email:     email,
      name:      clientMap[email].name,
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

  // ── Stats bar ─────────────────────────────────────────────────────────────
  var nowTs = new Date();
  var d30   = new Date(nowTs.getTime() - 30 * 24 * 60 * 60 * 1000);
  var d60   = new Date(nowTs.getTime() - 60 * 24 * 60 * 60 * 1000);
  var actNow = 0, actPrev = 0, bkNow = 0, bkPrev = 0, newNow = 0, newPrev = 0;
  allClients.forEach(function (c) {
    if (c.bookings.some(function (b) { return b.date >= d30; }))              actNow++;
    if (c.bookings.some(function (b) { return b.date >= d60 && b.date < d30; })) actPrev++;
    c.bookings.forEach(function (b) {
      if (b.date >= d30)             bkNow++;
      else if (b.date >= d60)        bkPrev++;
    });
    if (c.firstDate >= d30)          newNow++;
    if (c.firstDate >= d60 && c.firstDate < d30) newPrev++;
  });
  function pct(n, p) {
    if (p === 0) return null;
    return Math.round((n - p) / p * 100);
  }
  function setChg(el, n, p) {
    var v = pct(n, p);
    if (v === null) { el.textContent = ''; return; }
    el.textContent = (v >= 0 ? '▲ +' : '▼ ') + v + '% vs prev 30d';
    el.className = 'stat-chg ' + (v >= 0 ? 'up' : 'dn');
  }
  svActive.textContent = actNow;
  svBook30.textContent = bkNow;
  svNew.textContent    = newNow;
  svTotal.textContent  = allClients.length;
  setChg(scActive, actNow, actPrev);
  setChg(scBook30, bkNow,  bkPrev);
  setChg(scNew,    newNow, newPrev);

  // ── Compute timeline bounds — end of next month + 1 buffer ────────────────
  var minMs = Math.min.apply(null, allClients.map(function (c) { return c.firstDate.getTime(); }));
  var sd    = new Date(minMs);
  sMon      = new Date(sd.getFullYear(), sd.getMonth(), 1);
  var now   = new Date();
  // +3 = always show through end of next month with one extra month so labels never clip
  var eMon  = new Date(now.getFullYear(), now.getMonth() + 3, 1);
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
