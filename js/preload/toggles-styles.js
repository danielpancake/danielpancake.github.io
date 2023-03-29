/* This script adds styles required for toggles.js to work */
const styleEl = document.createElement("style");
/* Minified CSS */
styleEl.innerHTML = `.toggle{cursor:url(../images/cur-pointer.png),auto;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.inner{height:0;overflow:hidden;-webkit-transition:.25s;-o-transition:.25s;transition:.25s}.inner.hidden{height:0!important;padding-top:0!important;padding-bottom:0!important;border-top-width:0!important;margin-top:0!important;margin-bottom:0!important}`
document.head.appendChild(styleEl);
