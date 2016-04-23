function printStackTrace(b){var c=(b&&b.e)?b.e:null;var e=(b&&b.guess)?b.guess:true;var d=new printStackTrace.implementation();var a=d.run(c);return(e)?d.guessFunctions(a):a}printStackTrace.implementation=function(){};printStackTrace.implementation.prototype={run:function(a){var b=this._mode||this.mode();if(b==="other"){return this.other(arguments.callee)}else{a=a||(function(){try{(0)()}catch(c){return c}})();return this[b](a)}},mode:function(){try{(0)()}catch(a){if(a.arguments){return(this._mode="chrome")}else{if(a.stack){return(this._mode="firefox")}else{if(window.opera&&!("stacktrace" in a)){return(this._mode="opera")}}}}return(this._mode="other")},chrome:function(a){return a.stack.replace(/^.*?\n/,"").replace(/^.*?\n/,"").replace(/^.*?\n/,"").replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@").split("\n")},firefox:function(a){return a.stack.replace(/^.*?\n/,"").replace(/(?:\n@:0)?\s+$/m,"").replace(/^\(/gm,"{anonymous}(").split("\n")},opera:function(h){var c=h.message.split("\n"),b="{anonymous}",g=/Line\s+(\d+).*?script\s+(http\S+)(?:.*?in\s+function\s+(\S+))?/i,f,d,a;for(f=4,d=0,a=c.length;f<a;f+=2){if(g.test(c[f])){c[d++]=(RegExp.$3?RegExp.$3+"()@"+RegExp.$2+RegExp.$1:b+"()@"+RegExp.$2+":"+RegExp.$1)+" -- "+c[f+1].replace(/^\s+/,"")}}c.splice(d,c.length-d);return c},other:function(h){var b="{anonymous}",g=/function\s*([\w\-$]+)?\s*\(/i,a=[],d=0,e,c;var f=10;while(h&&a.length<f){e=g.test(h.toString())?RegExp.$1||b:b;c=Array.prototype.slice.call(h["arguments"]);a[d++]=e+"("+printStackTrace.implementation.prototype.stringifyArguments(c)+")";if(h===h.caller&&window.opera){break}h=h.caller}return a},stringifyArguments:function(a){for(var b=0;b<a.length;++b){var c=a[b];if(typeof c=="object"){a[b]="#object"}else{if(typeof c=="function"){a[b]="#function"}else{if(typeof c=="string"){a[b]='"'+c+'"'}}}}return a.join(",")},sourceCache:{},ajax:function(a){var b=this.createXMLHTTPObject();if(!b){return}b.open("GET",a,false);b.setRequestHeader("User-Agent","XMLHTTP/1.0");b.send("");return b.responseText},createXMLHTTPObject:function(){var c,a=[function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var b=0;b<a.length;b++){try{c=a[b]();this.createXMLHTTPObject=a[b];return c}catch(d){}}},getSource:function(a){if(!(a in this.sourceCache)){this.sourceCache[a]=this.ajax(a).split("\n")}return this.sourceCache[a]},guessFunctions:function(b){for(var d=0;d<b.length;++d){var h=/{anonymous}\(.*\)@(\w+:\/\/([-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/;var g=b[d],a=h.exec(g);if(a){var c=a[1],f=a[4];if(c&&f){var e=this.guessFunctionName(c,f);b[d]=g.replace("{anonymous}",e)}}}return b},guessFunctionName:function(a,c){try{return this.guessFunctionNameFromLines(c,this.getSource(a))}catch(b){return"getSource failed with url: "+a+", exception: "+b.toString()}},guessFunctionNameFromLines:function(h,f){var c=/function ([^(]*)\(([^)]*)\)/;var g=/['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/;var b="",d=10;for(var e=0;e<d;++e){b=f[h-e]+b;if(b!==undefined){var a=g.exec(b);if(a){return a[1]}else{a=c.exec(b)}if(a&&a[1]){return a[1]}}}return"(?)"}};
var oWorkerProperties, oGeneralProperties, oRotationProperties;
var oViewProperties;
var oPageProperties={};
var oFileAges;
var oStatusMessageTimer;
var oMapObjects={};
var oMapSummaryObj;
var regexCache={};
var validMapConfig={};
var validMainConfig={};
var iNow=Math.floor(Date.parse(new Date()) / 1000);
var oStates={};
var isIE=navigator.appVersion.indexOf("MSIE") != -1;
var crawlX=0;
var crawlY=0;
var crawling=0;
function getSidebarWidth() {
return 0;
}
function date(format, timestamp) {
var that=this,
jsdate, f, formatChr = /\\?([a-z])/gi, formatChrCb,
_pad = function (n, c) {
if ((n = n + "").length < c) {
return new Array((++c) - n.length).join("0") + n;
} else {
return n;
}
},
txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur",
"January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"],
txt_ordin = {
1: "st",
2: "nd",
3: "rd",
21: "st",
22: "nd",
23: "rd",
31: "st"
};
formatChrCb = function (t, s) {
return f[t] ? f[t]() : s;
};
f = {
d: function () { // Day of month w/leading 0; 01..31
return _pad(f.j(), 2);
},
D: function () { // Shorthand day name; Mon...Sun
return f.l().slice(0, 3);
},
j: function () { // Day of month; 1..31
return jsdate.getDate();
},
l: function () { // Full day name; Monday...Sunday
return txt_words[f.w()] + 'day';
},
N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
return f.w() || 7;
},
S: function () { // Ordinal suffix for day of month; st, nd, rd, th
return txt_ordin[f.j()] || 'th';
},
w: function () { // Day of week; 0[Sun]..6[Sat]
return jsdate.getDay();
},
z: function () { // Day of year; 0..365
var a=new Date(f.Y(), f.n() - 1, f.j()),
b = new Date(f.Y(), 0, 1);
return Math.round((a - b) / 864e5) + 1;
},
W: function () { // ISO-8601 week number
var a=new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
b = new Date(a.getFullYear(), 0, 4);
return 1 + Math.round((a - b) / 864e5 / 7);
},
F: function () { // Full month name; January...December
return txt_words[6 + f.n()];
},
m: function () { // Month w/leading 0; 01...12
return _pad(f.n(), 2);
},
M: function () { // Shorthand month name; Jan...Dec
return f.F().slice(0, 3);
},
n: function () { // Month; 1...12
return jsdate.getMonth() + 1;
},
t: function () { // Days in month; 28...31
return (new Date(f.Y(), f.n(), 0)).getDate();
},
L: function () { // Is leap year?; 0 or 1
return new Date(f.Y(), 1, 29).getMonth() === 1 | 0;
},
o: function () { // ISO-8601 year
var n=f.n(), W = f.W(), Y = f.Y();
return Y + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
},
Y: function () { // Full year; e.g. 1980...2010
return jsdate.getFullYear();
},
y: function () { // Last two digits of year; 00...99
return (f.Y() + "").slice(-2);
},
a: function () { // am or pm
return jsdate.getHours() > 11 ? "pm" : "am";
},
A: function () { // AM or PM
return f.a().toUpperCase();
},
B: function () { // Swatch Internet time; 000..999
var H=jsdate.getUTCHours() * 36e2, // Hours
i = jsdate.getUTCMinutes() * 60, // Minutes
s = jsdate.getUTCSeconds(); // Seconds
return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
},
g: function () { // 12-Hours; 1..12
return f.G() % 12 || 12;
},
G: function () { // 24-Hours; 0..23
return jsdate.getHours();
},
h: function () { // 12-Hours w/leading 0; 01..12
return _pad(f.g(), 2);
},
H: function () { // 24-Hours w/leading 0; 00..23
return _pad(f.G(), 2);
},
i: function () { // Minutes w/leading 0; 00..59
return _pad(jsdate.getMinutes(), 2);
},
s: function () { // Seconds w/leading 0; 00..59
return _pad(jsdate.getSeconds(), 2);
},
u: function () { // Microseconds; 000000-999000
return _pad(jsdate.getMilliseconds() * 1000, 6);
},
e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
throw 'Not supported (see source code of date() for timezone on how to add support)';
},
I: function () { // DST observed?; 0 or 1
var a=new Date(f.Y(), 0), // Jan 1
c = Date.UTC(f.Y(), 0), // Jan 1 UTC
b = new Date(f.Y(), 6), // Jul 1
d = Date.UTC(f.Y(), 6); // Jul 1 UTC
return 0 + ((a - c) !== (b - d));
},
O: function () { // Difference to GMT in hour format; e.g. +0200
var a=jsdate.getTimezoneOffset();
return (a > 0 ? "-" : "+") + _pad(Math.abs(a / 60 * 100), 4);
},
P: function () { // Difference to GMT w/colon; e.g. +02:00
var O=f.O();
return (O.substr(0, 3) + ":" + O.substr(3, 2));
},
T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
return 'UTC';
},
Z: function () { // Timezone offset in seconds (-43200...50400)
return -jsdate.getTimezoneOffset() * 60;
},
c: function () { // ISO-8601 date.
return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
},
r: function () { // RFC 2822
return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
},
U: function () { // Seconds since UNIX epoch
return jsdate.getTime() / 1000 | 0;
}
};
this.date = function (format, timestamp) {
that = this;
jsdate = (
(typeof timestamp === 'undefined') ? new Date() : // Not provided
(timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
);
return format.replace(formatChr, formatChrCb);
};
return this.date(format, timestamp);
}
function updateWorkerCounter() {
var oWorkerCounter=document.getElementById('workerLastRunCounter');
if(oWorkerCounter) {
if(oWorkerProperties.last_run) {
oWorkerCounter.innerHTML = date(oGeneralProperties.date_format, oWorkerProperties.last_run);
}
}
oWorkerCounter = null;
return true;
}
function rotatePage() {
if(oRotationProperties.nextStepUrl !== '') {
if(oRotationProperties.rotationEnabled == true) {
window.open(oRotationProperties.nextStepUrl, "_self");
return true;
}
} else {
window.location.reload(true);
return true;
}
return false;
}
function rotationCountdown() {
if(oRotationProperties.rotationEnabled && oRotationProperties.rotationEnabled == true && oRotationProperties.nextStepTime && oRotationProperties.nextStepTime !== '') {
oRotationProperties.nextStepTime -= 1;
if(oRotationProperties.nextStepTime <= 0) {
return rotatePage();
} else {
var oRefCountHead=document.getElementById('refreshCounterHead');
if(oRefCountHead) {
oRefCountHead.innerHTML = oRotationProperties.nextStepTime;
oRefCountHead = null;
}
var oRefCount=document.getElementById('refreshCounter');
if(oRefCount) {
oRefCount.innerHTML = oRotationProperties.nextStepTime;
oRefCount = null;
}
}
}
return false;
}
function getUrlParam(name) {
var name2=name.replace('[', '\\[').replace(']', '\\]');
var regexS="[\\?&]"+name2+"=([^&#]*)";
var regex=new RegExp( regexS );
var results=regex.exec(window.location);
if(results === null) {
return '';
} else {
return results[1];
}
}
function makeuri(addparams) {
var tmp=window.location.href.split('?');
var base=tmp[0];
tmp = tmp[1].split('#');
tmp = tmp[0].split('&');
var len=tmp.length;
var params={};
var pair=null;
for(var i=0; i < tmp.length; i++) {
pair = tmp[i].split('=');
if(addparams[pair[0]] !== undefined && addparams[pair[0]] == null)
continue;
params[pair[0]] = pair[1];
}
for (var key in addparams) {
if(addparams[key] != null) {
params[key] = addparams[key];
}
}
var aparams=[];
for (var key in params) {
aparams.push(key + '=' + params[key]);
}
return base + '?' + aparams.join('&');
}
function setRotationLabel() {
if(oRotationProperties.rotationEnabled == true) {
document.getElementById('rotationStart').style.display = 'none';
document.getElementById('rotationStop').style.display = 'inline';
} else {
document.getElementById('rotationStart').style.display = 'inline';
document.getElementById('rotationStop').style.display = 'none';
}
}
function switchRotation() {
if(oRotationProperties.rotationEnabled == true) {
oRotationProperties.rotationEnabled = false;
setRotationLabel();
} else {
oRotationProperties.rotationEnabled = true;
setRotationLabel();
}
}
function getCurrentTime() {
var oDate=new Date();
var sHours=oDate.getHours();
sHours = (( sHours < 10) ? "0"+sHours : sHours);
var sMinutes=oDate.getMinutes();
sMinutes = (( sMinutes < 10) ? "0"+sMinutes : sMinutes);
var sSeconds=oDate.getSeconds();
sSeconds = (( sSeconds < 10) ? "0"+sSeconds : sSeconds);
return sHours+":"+sMinutes+":"+sSeconds;
}
function getRandomLowerCaseLetter() {
return String.fromCharCode(97 + Math.round(Math.random() * 25));
}
function getRandom(min, max) {
if( min > max ) {
return -1;
}
if( min == max ) {
return min;
}
return min + parseInt(Math.random() * (max-min+1), 0);
}
function cloneObject(what) {
var o;
var i;
if(what instanceof Array) {
o = [];
} else {
o = {};
}
for (i in what) {
if (typeof what[i] == 'object') {
if(i != 'parsedObject') {
o[i] = cloneObject(what[i]);
}
} else {
o[i] = what[i];
}
}
return o;
}
function pageWidth() {
var w;
if(window.innerWidth !== null  && typeof window.innerWidth !== 'undefined') {
w = window.innerWidth;
} else if(document.documentElement && document.documentElement.clientWidth) {
w = document.documentElement.clientWidth;
} else if(document.body !== null) {
w = document.body.clientWidth;
} else {
w = null;
}
return w;
}
function pageHeight() {
var h;
if(window.innerHeight !== null && typeof window.innerHeight !== 'undefined') {
h = window.innerHeight;
} else if(document.documentElement && document.documentElement.clientHeight) {
h = document.documentElement.clientHeight;
} else if(document.body !== null) {
h = document.body.clientHeight;
} else {
h = null;
}
return h;
}
function getScrollTop() {
if (typeof window.pageYOffset !== 'undefined')
return window.pageYOffset;
else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat')
return document.documentElement.scrollTop;
else if (typeof document.body !== 'undefined')
return document.body.scrollTop;
}
function getScrollLeft() {
if (typeof window.pageXOffset !== 'undefined')
return window.pageXOffset;
else if (typeof document.compatMode != 'undefined' && document.compatMode !== 'BackCompat')
return document.documentElement.scrollLeft;
else if (typeof document.body !== 'undefined')
return document.body.scrollLeft;
}
function scrollSlow(iTargetX, iTargetY, iSpeed) {
var currentScrollTop=getScrollTop();
var currentScrollLeft=getScrollLeft();
var iMapOffsetTop;
var scrollTop;
var scrollLeft;
var iWidth;
var iHeight;
var iStep=10;
iTargetX = parseInt(iTargetX);
iTargetY = parseInt(iTargetY);
if((iTargetX !== crawlX || iTargetY !== crawlY) && crawlX !== 0 && crawlY !== 0) {
crawling = 1;
} else if(crawlX == 0 && crawlY == 0) {
crawlX = iTargetX;
crawlY = iTargetY;
}
var oMap=document.getElementById('map');
if(oMap && oMap.offsetTop) {
iMapOffsetTop = oMap.offsetTop;
} else {
iMapOffsetTop = 0;
}
oMap = null;
iWidth  = pageWidth();
iHeight = pageHeight() - iMapOffsetTop;
if((iTargetY < (currentScrollTop+iHeight/2+iStep) && iTargetY >= (currentScrollTop+iHeight/2-iStep)) || (currentScrollTop<iStep && iTargetY<iHeight/2)) {
scrollTop = 0;
} else if(iTargetY < (currentScrollTop+iHeight/2) && currentScrollTop>iStep) {
scrollTop = -iStep;
} else if(iTargetY > (currentScrollTop+iHeight/2)) {
scrollTop = iStep;
} else {
eventlog("js-error", "critical", "JS-Error occured: iTargetY: " +iTargetY);
scrollTop = 0;
}
if((iTargetX < (currentScrollLeft+iWidth/2+iStep) && iTargetX >= (currentScrollLeft+iWidth/2-iStep)) || (currentScrollLeft<iStep && iTargetX<iWidth/2)) {
scrollLeft = 0;
} else if(iTargetX < (currentScrollLeft+iWidth/2) && currentScrollLeft>iStep) {
scrollLeft = -iStep;
} else if(iTargetX > (currentScrollLeft+iWidth/2)) {
scrollLeft = iStep;
} else {
eventlog("js-error", "critical", "JS-Error occured: iTargetX: " +iTargetX);
scrollLeft = 0;
}
eventlog("scroll", "debug", currentScrollLeft+" to "+iTargetX+" = "+scrollLeft+", "+currentScrollTop+" to "+iTargetY+" = "+scrollTop);
if((scrollTop !== 0 || scrollLeft !== 0) && crawling == 0) {
window.scrollBy(scrollLeft, scrollTop);
if (currentScrollTop !== getScrollTop() || currentScrollLeft !== getScrollLeft()) {
setTimeout(function() { scrollSlow(iTargetX, iTargetY, iSpeed); }, iSpeed);
};
} else {
eventlog("scroll", "debug", 'No need to scroll: '+currentScrollLeft+' - '+iTargetX+', '+currentScrollTop+' - '+iTargetY);
crawlX=0;
crawlY=0;
crawling=0;
}
}
function escapeUrlValues(sStr) {
if(typeof sStr === undefined || sStr === null || sStr === '') {
return sStr;
}
sStr = new String(sStr);
if(sStr.search('\\+') !== -1) {
sStr = sStr.replace(/\+/g, '%2B');
}
if(sStr.search('&') !== -1) {
sStr = sStr.replace(/&/g, '%26');
}
if(sStr.search('#') !== -1) {
sStr = sStr.replace(/#/g, '%23');
}
if(sStr.search(':') !== -1) {
sStr = sStr.replace(/:/g, '%3A');
}
if(sStr.search(' ') !== -1) {
sStr = sStr.replace(/ /g, '%20');
}
if(sStr.search('=') !== -1) {
sStr = sStr.replace(/=/g, '%3D');
}
if(sStr.search('\\?') !== -1) {
sStr = sStr.replace(/\?/g, '%3F');
}
return sStr;
}
function oDump(object, depth, max){
depth = depth || 0;
max = max || 2;
if (depth > max) {
return false;
}
var indent="";
for (var i=0; i < depth; i++) {
indent += "  ";
}
var output="";
for (var key in object) {
output += "\n" + indent + key + ": ";
switch (typeof object[key]) {
case "object": output += oDump(object[key], depth + 1, max); break;
case "function": output += "function"; break;
default: output += object[key]; break;
}
}
return output;
}
function oLength(object) {
var c=0;
for(var key in object)
c++;
return c;
}
function isFirefox() {
return navigator.userAgent.indexOf("Firefox") > -1;
}
addDOMLoadEvent = (function(){
var load_events=[],
load_timer,
script,
done,
exec,
old_onload,
init = function () {
done = true;
clearInterval(load_timer);
while (exec = load_events.shift())
setTimeout(exec, 50);
if (script) script.onreadystatechange = '';
};
return function (func) {
if (done) return func();
if (!load_events[0]) {
if (document.addEventListener)
document.addEventListener("DOMContentLoaded", init, false);
/*@cc_on @*/
/*@if (@_win32)
document.write("<script id=__ie_onload defer src=><\/script>");
script = document.getElementById("__ie_onload");
script.onreadystatechange = function() {
if (this.readyState == "complete")
init(); // call the onload handler
};
@end
@*/
if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) { // sniff
load_timer = setInterval(function() {
if (/loaded|complete/.test(document.readyState))
init(); // call the onload handler
}, 10);
}
old_onload = window.onload;
window.onload = function() {
init();
if (old_onload) old_onload();
};
}
load_events.push(func);
}
})();
function handleJSError(sMsg, sUrl, iLine) {
if(!isset(sUrl))
var sUrl='<Empty URL>';
eventlog("js-error", "critical", "JS-Error occured: " + sMsg + " " + sUrl + " (" + iLine + ")");
var oMsg={};
oMsg.type = 'CRITICAL';
oMsg.message = "Javascript error occured:\n " + sMsg + " "
+ sUrl + " (" + iLine + ")<br /><br /><code>- Stacktrace - <br />"
+ printStackTrace().join("<br />") + '</code>';
oMsg.title = "Javascript error";
frontendMessage(oMsg);
oMsg = null;
return false;
}
try {
window.onerror = handleJSError;
} catch(er) {}
function addEvent(obj, type, fn) {
if(obj.addEventListener) {
obj.addEventListener(type, fn, false);
} else if (obj.attachEvent) {
obj.attachEvent("on"+type, fn);
}
}
function removeEvent(obj, type, fn) {
if(obj.removeEventListener) {
obj.removeEventListener(type, fn, false);
} else if (obj.detachEvent) {
obj.detachEvent("on"+type, fn);
}
}
function displayStatusMessage(msg, type, hold) {
var iMessageTime=5000;
var oMessage=document.getElementById('statusMessage');
if(!oMessage) {
oMessage = document.createElement('div');
oMessage.setAttribute('id', 'statusMessage');
if(isIE)
oMessage.style.filter = 'alpha(opacity=85)';
document.body.appendChild(oMessage);
}
if(oStatusMessageTimer) {
clearTimeout(oStatusMessageTimer);
}
var cont=msg;
if (type) {
cont = '<div class="'+type+'">'+cont+'</div>';
}
oMessage.innerHTML = cont;
oMessage.style.display = 'block';
if (type != 'loading') {
oMessage.onmousedown = function() { hideStatusMessage(); return true; };
}
if (!hold) {
oStatusMessageTimer = window.setTimeout(function() { hideStatusMessage(); }, iMessageTime);
}
oMessage = null;
}
function hideStatusMessage() {
var oMessage=document.getElementById('statusMessage');
if(oMessage) {
oMessage.style.display = 'none';
oMessage.onmousedown = null;
}
}
function drawNagVisTextbox(oContainer, id, className, bgColor, borderColor, x, y, z, w, h, text, customStyle) {
var initRendering=false;
var oLabelDiv=document.getElementById(id);
if(!oLabelDiv) {
oLabelDiv = document.createElement('div');
oLabelDiv.setAttribute('id', id);
initRendering = true;
}
oLabelDiv.setAttribute('class', className);
oLabelDiv.setAttribute('className', className);
oLabelDiv.style.background = bgColor;
oLabelDiv.style.borderColor = borderColor;
oLabelDiv.style.position = 'absolute';
oLabelDiv.style.left = x + 'px';
oLabelDiv.style.top = y + 'px';
if(w && w !== '' && w !== 'auto')
oLabelDiv.style.width = addZoomFactor(w) + 'px';
if(h && h !== '' && h !== 'auto')
oLabelDiv.style.height = addZoomFactor(h) + 'px';
oLabelDiv.style.zIndex = parseInt(z) + 1;
oLabelDiv.style.overflow = 'visible';
if(borderColor == 'transparent')
oLabelDiv.style.borderStyle = 'none';
else
oLabelDiv.style.borderStyle = 'solid';
var oLabelSpan=null;
if(oLabelDiv.childNodes.length == 0)
oLabelSpan = document.createElement('span');
else
oLabelSpan = oLabelDiv.childNodes[0];
if(customStyle && customStyle !== '') {
var aStyle=customStyle.split(';');
for(var i in aStyle) {
if(typeof(aStyle[i]) !== 'string')
continue;
var aOpt=aStyle[i].split(':');
if(aOpt[0] && aOpt[0] != '' && aOpt[1] && aOpt[1] != '') {
var sKey=aOpt[0].replace(/(-[a-zA-Z])/g, '$1');
var regex=/(-[a-zA-Z])/;
var result=regex.exec(aOpt[0]);
if(result !== null) {
for (var i=1; i < result.length; i++) {
var fixed=result[i].replace('-', '').toUpperCase();
sKey = sKey.replace(result[i], fixed);
}
}
oLabelSpan.style[sKey] = aOpt[1];
}
aOpt = null;
}
aStyle = null;
}
oLabelSpan.innerHTML = text;
executeJS(oLabelSpan);
oLabelDiv.appendChild(oLabelSpan);
oContainer.appendChild(oLabelDiv);
if(initRendering) {
oLabelDiv.width  = addZoomFactor(oLabelDiv.width);
oLabelDiv.height = addZoomFactor(oLabelDiv.height);
var fontSize=getEffectiveStyle(oLabelSpan, 'font-size');
if(fontSize === null) {
eventlog(
"drawNagVisTextbox",
"critical",
"Unable to fetch font-size attribute for textbox"
);
} else {
if(fontSize.indexOf('px') !== -1) {
var fontSize=parseInt(fontSize.replace('px', ''));
oLabelSpan.style.fontSize = addZoomFactor(fontSize) + 'px';
} else {
eventlog(
"drawNagVisTextbox",
"critical",
"Zoom: Can not handle this font-size declaration (" + fontSize + ")"
);
}
}
}
oLabelSpan = null;
return oLabelDiv;
}
function lightenColor(code, rD, gD, bD) {
var r=parseInt(code.substring(1, 3), 16);
var g=parseInt(code.substring(3, 5), 16);
var b=parseInt(code.substring(5, 7), 16);
r += rD;  if (r > 255) r = 255;  if (r < 0) r = 0;
g += gD;  if (g > 255) g = 255;  if (g < 0) g = 0;
b += bD;  if (b > 255) b = 255;  if (b < 0) b = 0;
code  = r.length < 2 ? "0"+r.toString(16) : r.toString(16);
code += g.length < 2 ? "0"+g.toString(16) : g.toString(16);
code += b.length < 2 ? "0"+b.toString(16) : b.toString(16);
return "#" + code.toUpperCase();
}
function getRegEx(n, exp, mod) {
if(typeof(regexCache[n]) !== 'undefined')
return regexCache[n];
else
if(mod !== undefined) {
regexCache[n+'-'+mod] = new RegExp(exp, mod);
return regexCache[n+'-'+mod];
} else {
regexCache[n] = new RegExp(exp);
return regexCache[n];
}
}
function storeUserOption(key, value) {
oUserProperties[key] = value;
var url=oGeneralProperties.path_server + '?mod=User&act=setOption&opts['+escapeUrlValues(key)+']=' + escapeUrlValues(value);
getAsyncRequest(url, false, undefined, undefined);
}
function isset(v) {
return typeof(v) !== 'undefined' && v !== null;
}
function isInt(v) {
return parseFloat(v) == parseInt(v) && !isNaN(v);
}
function isFloat(v) {
return parseFloat(v) == v && !isNaN(v);
}
function pxToInt(v) {
return parseInt(v.replace('px', ''));
}
function isRelativeCoord(v) {
return isset(v) && ((!isInt(v) && !isFloat(v)) || v.length === 6);
}
function getKeys(o) {
var a=[];
for(var key in o)
a.push(key);
return a;
}
if (!Array.prototype.indexOf) {
Array.prototype.indexOf = function(searchElement ) {
"use strict";
if (this === void 0 || this === null)
throw new TypeError();
var t=Object(this);
var len=t.length >>> 0;
if (len === 0)
return -1;
var n=0;
if (arguments.length > 0)
{
n = Number(arguments[1]);
if (n !== n)
n = 0;
else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
n = (n > 0 || -1) * Math.floor(Math.abs(n));
}
if (n >= len)
return -1;
var k=n >= 0
? n
: Math.max(len - Math.abs(n), 0);
for (; k < len; k++)
{
if (k in t && t[k] === searchElement)
return k;
}
return -1;
};
}
function getEffectiveStyle(e, attr) {
if(e.style[attr]) {
return e.style[attr];
} else if(document.defaultView && document.defaultView.getComputedStyle) {
return document.defaultView.getComputedStyle(e, null).getPropertyValue(attr);
} else if(e.currentStyle){
var ie_attr=attr.replace(/\-(\w)/g, function (strMatch, p1){
return p1.toUpperCase();
});
var f=e.currentStyle[ie_attr];
if(f.length > 0) {
return f;
}
}
return null;
}
function scaleView() {
var header=document.getElementById('header');
var headerSpacer=document.getElementById('headerspacer');
if(header) {
header.style.width = pageWidth() + 'px';
if(headerSpacer) {
headerSpacer.style.height = header.clientHeight + 'px';
headerSpacer = null;
}
header = null;
}
var sidebar=document.getElementById('sidebar');
if(sidebar && sidebarOpen()) {
sidebar.style.height = (pageHeight() + getScrollTop()) + 'px';
}
sidebar = null;
}
var g_zoom_factor=null;
function getZoomFactor() {
if(g_zoom_factor !== null)
return g_zoom_factor; // only compute once
var zoom=getViewParam('zoom');
if (zoom === null || zoom == 'fill')
g_zoom_factor = 100;
else
g_zoom_factor = parseInt(zoom);
return g_zoom_factor;
}
function isZoomed() {
return getZoomFactor() !== 100;
}
function addZoomFactor(coord, forced) {
if (typeof(forced) === 'undefined')
var forced=false;
if (!forced && oGeneralProperties.zoom_scale_objects && oGeneralProperties.zoom_scale_objects != 1)
return parseInt(coord);
return parseInt(coord * getZoomFactor() / 100);
}
function rmZoomFactor(coord, forced) {
if (typeof(forced) === 'undefined')
var forced=false;
if (!forced && oGeneralProperties.zoom_scale_objects && oGeneralProperties.zoom_scale_objects != 1)
return parseInt(coord);
return parseInt(coord / getZoomFactor() * 100);
}
function zoomHandler(event, obj, forced_zoom) {
if(obj == window) {
if(event.srcElement) {
var obj=event.srcElement;
}
}
if(!obj)
return false;
obj.style.display = 'block';
var width=addZoomFactor(obj.width, forced_zoom);
var height=addZoomFactor(obj.height, forced_zoom);
obj.style.display = 'none';
obj.width  = width;
obj.height = height;
obj.style.display = 'block';
var arr=obj.id.split('-');
var map_obj=getMapObjByDomObjId(arr[0]);
if(map_obj && typeof(map_obj.updateLabel) == 'function') {
map_obj.updateLabel();
}
map_obj = null;
obj = null;
}
function addZoomHandler(oImage, forced_zoom) {
if(!isZoomed())
return; // If not zoomed, no handler is needed
if (typeof(forced_zoom) == 'undefined')
var forced_zoom=false;
oImage.style.display = 'none';
addEvent(oImage, 'load', function(event) { zoomHandler(event, this, forced_zoom); });
oImage = null;
}
function _(s, replace) {
if(typeof s === 'undefined')
return '';
if(isset(oLocales[s])) {
s = oLocales[s];
} else {
eventlog(
"localize",
"warning",
"String is not localizable '" + s + "'"
);
}
s = s.replace(/<(\/|)(i|b)>/ig, '');
s = s.replace('&auml;', 'ä').replace('&uuml;', 'ü');
s = s.replace('&ouml;', 'ö').replace('&szlig;', '');
if(typeof replace != "undefined") {
for(var i=0; i < replace.length; i++) {
s = s.replace("["+replace[i][0]+"]", replace[i][1]);
}
}
return s;
}
function has_class(o, cn) {
if (typeof o.className === 'undefined')
return false;
var parts=o.className.split(' ');
for (x=0; x<parts.length; x++) {
if (parts[x] == cn)
return true;
}
return false;
}
function remove_class(o, cn) {
var parts=o.className.split(' ');
var new_parts=Array();
for (x=0; x<parts.length; x++) {
if (parts[x] != cn)
new_parts.push(parts[x]);
}
o.className = new_parts.join(" ");
}
function add_class(o, cn) {
if (!has_class(o, cn))
o.className += " " + cn;
}
function change_class(o, a, b) {
remove_class(o, a);
add_class(o, b);
}
function executeJS(obj) {
var aScripts=obj.getElementsByTagName('script');
for (var i=0; i < aScripts.length; i++) {
if (aScripts[i].src && aScripts[i].src !== '') {
var oScr=document.createElement('script');
oScr.src = aScripts[i].src;
document.getElementsByTagName("HEAD")[0].appendChild(oScr);
} else {
try {
eval(aScripts[i].text);
} catch(e) {
alert(aScripts[i].text + "\nError:" + e.message);
}
}
}
}
function toggleLineMidLock(event, objectId) {
getMapObjByDomObjId(objectId).toggleLineMidLock();
var event=!event ? window.event : event;
if(event.stopPropagation)
event.stopPropagation();
event.cancelBubble = true;
return false;
}
function toggleMapObjectLock(event, objectId) {
updateNumUnlocked(getMapObjByDomObjId(objectId).toggleLock());
var event=!event ? window.event : event;
if(event.stopPropagation)
event.stopPropagation();
event.cancelBubble = true;
return false;
}
function toggleAllMapObjectsLock() {
var lock=false;
if(iNumUnlocked > 0)
lock = true;
for(var i in oMapObjects)
updateNumUnlocked(oMapObjects[i].toggleLock(lock));
if(!lock)
storeUserOption('unlocked-' + oPageProperties.map_name, '*');
else
storeUserOption('unlocked-' + oPageProperties.map_name, '');
}
var draggingEnabled=true;
var draggingObject=null;
var dragObjectOffset=null;
var dragObjectPos=null;
var dragObjectStartPos=null;
var dragObjectChilds={};
var dragStopHandlers={};
var dragMoveHandlers={};
function getTargetRaw(event) {
return event.target ? event.target : event.srcElement;
}
function getTarget(event, ignoreType) {
if(typeof(ignoreType) === 'undefined')
var ignoreType=null;
var target=event.target ? event.target : event.srcElement;
while(target && (target.tagName != 'DIV'
|| typeof(target.id) === 'undefined'
|| (ignoreType !== null && (target.id.split('-')[1] === ignoreType)))) {
target = target.parentNode;
}
return target;
}
function getButton(event) {
if (event.which == null)
return (event.button < 2) ? "LEFT" : ((event.button == 4) ? "MIDDLE" : "RIGHT");
else
return (event.which < 2) ? "LEFT" : ((event.which == 2) ? "MIDDLE" : "RIGHT");
}
function makeUndragable(objects) {
var len=objects.length;
if(len == 0)
return false;
for(var i=0; i < len; i++) {
if(typeof(objects[i]) === 'object')
var o=objects[i];
else
var o=document.getElementById(objects[i]);
if(o)  {
delete dragStopHandlers[o.id];
delete dragMoveHandlers[o.id];
removeEvent(o, 'mousedown', dragStart);
removeEvent(o, 'mouseup',   dragStop);
o = null;
}
}
}
function makeDragable(objects, dragStopHandler, dragMoveHandler) {
var len=objects.length;
if(len == 0)
return false;
for(var i=0; i < len; i++) {
if(typeof(objects[i]) === 'object')
var o=objects[i];
else
var o=document.getElementById(objects[i]);
if(o) {
dragStopHandlers[o.id] = dragStopHandler;
dragMoveHandlers[o.id] = dragMoveHandler;
addEvent(o, "mousedown", dragStart);
addEvent(document, "mouseup", dragStop);
o = null;
}
}
len = null;
}
function dragStart(event) {
if(!event)
event = window.event;
var target=getTarget(event, 'icon');
var button=getButton(event);
if(draggingObject !== null || button != 'LEFT' || !draggingEnabled)
return true;
var posx, posy;
if (event.pageX || event.pageY) {
posx = event.pageX;
posy = event.pageY;
} else if (event.clientX || event.clientY) {
posx = event.clientX;
posy = event.clientY;
}
draggingObject = target;
draggingObject.x = draggingObject.offsetLeft;
draggingObject.y = draggingObject.offsetTop;
dragObjectOffset   = [ posy - draggingObject.offsetTop - getHeaderHeight(),
posx - draggingObject.offsetLeft ];
dragObjectStartPos = [ draggingObject.offsetTop, draggingObject.offsetLeft ];
var sLabelName=target.id.replace('box_', 'rel_label_');
var oLabel=document.getElementById(sLabelName);
if(oLabel) {
dragObjectChilds[sLabelName] = [ oLabel.offsetTop - draggingObject.offsetTop,
oLabel.offsetLeft - draggingObject.offsetLeft ];
oLabel = null;
}
sLabelName = null;
if(event.preventDefault)
event.preventDefault();
else
event.returnValue = false;
return true;
}
function dragObject(event) {
if(!event)
event = window.event;
if(draggingObject === null || !draggingEnabled)
return true;
var posx, posy;
if (event.pageX || event.pageY) {
posx = event.pageX;
posy = event.pageY;
} else if (event.clientX || event.clientY) {
posx = event.clientX;
posy = event.clientY;
}
var newTop=posy - dragObjectOffset[0] - getHeaderHeight();
var newLeft=posx - dragObjectOffset[1];
draggingObject.style.position = 'absolute';
draggingObject.style.top  = newTop + 'px';
draggingObject.style.left = newLeft + 'px';
draggingObject.x = rmZoomFactor(newLeft, true);
draggingObject.y = rmZoomFactor(newTop, true);
moveRelativeObject(draggingObject.id, newTop, newLeft);
if(event.ctrlKey) {
for(var i in oMapObjects)
oMapObjects[i].highlight(false);
var o=getNearestObject(draggingObject, newLeft, newTop)
if(o) {
o.highlight(true);
o = null;
}
}
if(event.shiftKey) {
for(var i in oMapObjects)
oMapObjects[i].highlight(false);
}
if(dragMoveHandlers[draggingObject.id])
dragMoveHandlers[draggingObject.id](draggingObject, event);
oParent = null;
}
function getNearestObject(draggingObject, x, y) {
var nearest=null;
var min=null;
var dist;
var obj;
for(var i in oMapObjects) {
obj = oMapObjects[i];
if(draggingObject.id.split('-')[0] == obj.conf.object_id)
continue;
if(obj.conf.view_type !== 'icon' || obj.conf.type == 'line')
continue;
var objX=obj.parseCoord(obj.conf.x, 'x');
var objY=obj.parseCoord(obj.conf.y, 'y');
dist = Math.sqrt(((objX - x) * (objX - x)) + ((objY - y) * (objY - y)));
if(min === null || dist < min) {
if(coordsReferTo(obj, draggingObject.id.split('-')[0])) {
continue;
}
min     = dist;
nearest = obj;
}
}
obj     = null;
min     = null;
dist    = null;
return nearest;
}
function coordsReferTo(obj, target_object_id) {
if (obj.conf.object_id == target_object_id) {
return true;
}
if (isRelativeCoord(obj.conf.x)) {
var xParent=getMapObjByDomObjId(obj.getCoordParent(obj.conf.x, -1));
if(coordsReferTo(xParent, target_object_id)) {
return true;
}
}
if (isRelativeCoord(obj.conf.y)) {
var yParent=getMapObjByDomObjId(obj.getCoordParent(obj.conf.y, -1));
if(coordsReferTo(yParent, target_object_id)) {
return true;
}
}
return false;
}
function moveRelativeObject(parentId, parentTop, parentLeft) {
var sLabelName=parentId.replace('box_', 'rel_label_');
if(typeof dragObjectChilds[sLabelName] !== 'undefined') {
var oLabel=document.getElementById(sLabelName);
if(oLabel) {
oLabel.style.position = 'absolute';
oLabel.style.top  = (dragObjectChilds[sLabelName][0] + parentTop) + 'px';
oLabel.style.left = (dragObjectChilds[sLabelName][1] + parentLeft) + 'px';
oLabel = null;
}
}
sLabelName = null;
}
function dragStop(event) {
if(draggingObject === null || !draggingEnabled
|| typeof draggingObject.y == 'undefined' || typeof draggingObject.x == 'undefined')
return;
if(draggingObject.y < 0 || draggingObject.x < 0) {
draggingObject.style.top  = dragObjectStartPos[0] + 'px';
draggingObject.style.left = dragObjectStartPos[1] + 'px';
draggingObject.x = dragObjectStartPos[1];
draggingObject.y = dragObjectStartPos[0];
moveRelativeObject(draggingObject.id, dragObjectStartPos[0], dragObjectStartPos[1]);
if(dragMoveHandlers[draggingObject.id])
dragMoveHandlers[draggingObject.id](draggingObject, event);
draggingObject = null;
return;
}
if(draggingObject.y == dragObjectStartPos[0] && draggingObject.x == dragObjectStartPos[1]) {
draggingObject = null;
return;
}
var oParent=null;
if(event.ctrlKey) {
var oParent=getNearestObject(draggingObject, draggingObject.x, draggingObject.y);
if(oParent)
oParent.highlight(false);
}
if(event.shiftKey)
oParent = false;
for(var objectId in getMapObjByDomObjId(draggingObject.id.split('-')[0]).getParentObjectIds())
getMapObjByDomObjId(objectId).highlight(false);
dragStopHandlers[draggingObject.id](draggingObject, oParent);
oParent = null;
draggingObject    = null;
}
function dragging() {
return draggingObject !== null;
}
var addObjType=null,
addViewType = null,
addNumLeft  = null,
addAction   = null,
addX        = [],
addY        = [],
addFollow   = false,
addShape    = null,
cloneId     = null;
function cloneObject(e, objId) {
cloneId = objId;
var obj=getMapObjByDomObjId(objId);
var numClicks=1;
if(obj.conf.type == 'textbox'|| obj.conf.type == 'container' || obj.conf.view_type == 'line' || obj.type == 'line')
numClicks = 2;
return addObject(e, obj.conf.type, obj.conf.view_type, numClicks, 'clone');
}
function addObject(e, objType, viewType, numLeft, action) {
addObjType  = objType;
addViewType = viewType;
addNumLeft  = numLeft;
addAction   = action;
if(document.body)
document.body.style.cursor = 'crosshair';
var event=!e ? window.event : e;
if(event.stopPropagation)
event.stopPropagation();
event.cancelBubble = true;
return false;
}
function getEventMousePos(e) {
var event=!e ? window.event : e;
if(getButton(event) != 'LEFT')
return null;
if(event.target) {
var target=event.target;
while(target) {
if(target.id && target.id == 'header') {
return false;
}
target = target.parentNode;
}
}
if (event.pageX || event.pageY) {
posx = event.pageX;
posy = event.pageY;
} else if (event.clientX || event.clientY) {
posx = event.clientX;
posy = event.clientY;
}
posy -= getHeaderHeight();
posx = rmZoomFactor(posx, true);
posy = rmZoomFactor(posy, true);
return [ posx, posy ];
}
function stop_adding() {
if(document.body)
document.body.style.cursor = 'default';
addObjType  = null,
addViewType = null,
addNumLeft  = null,
addAction   = null,
addX        = [],
addY        = [],
addFollow   = false,
addShape    = null;
}
function addClick(e) {
if(!adding())
return;
var pos=getEventMousePos(e);
if (pos === false) {
stop_adding();
return;
}
addX.push(pos[0] - getSidebarWidth());
addY.push(pos[1]);
addNumLeft -= 1;
pos = null;
if((addViewType === 'line' || addObjType === 'textbox' || addObjType === 'container' || addObjType === 'line')
&& addShape === null) {
addShape = new jsGraphics('map');
addShape.cnv.setAttribute('id', 'drawing');
addShape.setColor('#06B606');
addShape.setStroke(1);
addFollow = true;
}
if(addNumLeft > 0)
return;
if(addObjType == 'textbox' || addObjType == 'container') {
var w=addX.pop();
var h=addY.pop();
}
var sUrl='';
if(addAction == 'add' || addAction == 'clone')
sUrl = oGeneralProperties.path_server + '?mod=Map&act=addModify'
+ '&show=' + oPageProperties.map_name
+ '&type=' + addObjType
+ '&x=' + addX.join(',')
+ '&y=' + addY.join(',');
if(addObjType != 'textbox' && addObjType != 'container'
&& addObjType != 'shape' && addViewType != 'icon' && addViewType != '')
sUrl += '&view_type=' + addViewType;
if(addAction == 'clone' && cloneId !== null)
sUrl += '&clone_id=' + cloneId;
if(addObjType == 'textbox' || addObjType == 'container')
sUrl += '&w=' + (w - addX[0]) + '&h=' + (h - addY[0]);
if(sUrl === '')
return false;
if(addShape !== null) {
addShape.clear();
document.getElementById('map').removeChild(addShape.cnv);
}
showFrontendDialog(sUrl, _('Create Object'));
sUrl = '';
stop_adding();
}
function adding() {
return addNumLeft !== null;
}
function addFollowing(e) {
if(!addFollow)
return;
var pos=getEventMousePos(e);
addShape.clear();
if(addViewType === 'line' || addObjType === 'line')
addShape.drawLine(addX[0], addY[0], pos[0] - getSidebarWidth(), pos[1]);
else
addShape.drawRect(addX[0], addY[0], (pos[0] - getSidebarWidth() - addX[0]), (pos[1] - addY[0]));
addShape.paint();
}
if (window.addEventListener) {
window.addEventListener("mousemove", function(e) {
dragObject(e);
addFollowing(e);
return false;
}, false);
window.addEventListener("click", function(e) {
addClick(e);
return false;
}, false);
} else {
document.documentElement.onmousemove  = function(e) {
dragObject(e);
addFollowing(e);
return false;
};
document.documentElement.onclick = function(e) {
addClick(e);
return true;
};
}
function validateValue(sName, sValue, sRegex) {
sRegex = sRegex.replace(/^\//, "");
sRegex = sRegex.replace(/\/[iugm]*$/, "");
var regex=new RegExp(sRegex, "i");
var match=regex.exec(sValue);
if(sValue == '' || match != null) {
return true;
} else {
alert(printLang(lang['wrongValueFormatOption'],'ATTRIBUTE~'+sName));
return false;
}
}
function useGrid() {
return oViewProperties.grid_show === 1;
}
function gridParse() {
if(useGrid()) {
var oGrid=document.createElement('div');
oGrid.setAttribute('id', 'grid');
document.getElementById('map').appendChild(oGrid);
oGrid = null;
var grid=new jsGraphics('grid');
grid.setColor(oViewProperties.grid_color);
grid.setStroke(1);
var gridStep=addZoomFactor(oViewProperties.grid_steps);
var gridYStart=0;
var gridXStart=0;
var gridYEnd=pageHeight() - getHeaderHeight();
var gridXEnd=pageWidth();
for(var gridX=gridStep; gridX < gridXEnd; gridX = gridX + gridStep) {
grid.drawLine(gridX, gridYStart, gridX, gridYEnd);
}
for(var gridY=gridStep; gridY < gridYEnd; gridY = gridY + gridStep) {
grid.drawLine(gridXStart, gridY, gridXEnd, gridY);
}
grid.paint();
gridXEnd = null
gridYEnd = null;
gridXStart = null;
gridYStart = null;
gridStep = null;
grid = null;
addEvent(window, "resize", gridRedraw);
}
}
function gridRemove() {
var oMap=document.getElementById('map');
if(oMap) {
var oGrid=document.getElementById('grid')
if(oGrid) {
oMap.removeChild(oGrid);
oGrid = null;
}
oMap = null;
}
removeEvent(window, "resize", gridRedraw);
}
function gridRedraw() {
gridRemove();
gridParse();
}
function gridToggle() {
if(useGrid()) {
oViewProperties.grid_show = 0;
gridRemove();
} else {
oViewProperties.grid_show = 1;
gridParse();
}
var url=oGeneralProperties.path_server+'?mod=Map&act=modifyObject&map='
+ oPageProperties.map_name+'&type=global&id=0&grid_show='+oViewProperties.grid_show;
var oResult=getSyncRequest(url);
if(oResult && oResult.status != 'OK') {
alert(oResult.message);
}
oResult = null;
}
function coordsToGrid(x, y) {
x = "" + x;
y = "" + y;
if(x.indexOf(',') !== -1) {
x = x.split(',');
y = y.split(',');
for(var i=0; i < x.length; i++) {
x[i] = x[i] - (x[i] % addZoomFactor(oViewProperties.grid_steps));
y[i] = y[i] - (y[i] % addZoomFactor(ooViewProperties.grid_steps));
}
return [ x.join(','), y.join(',') ];
} else {
x = +x;
y = +y;
var gridMoveX=x - (x % addZoomFactor(oViewProperties.grid_steps));
var gridMoveY=y - (y % addZoomFactor(oViewProperties.grid_steps));
return [ gridMoveX, gridMoveY ];
}
}
function toggle_maincfg_section(sec) {
var tables=document.getElementsByClassName('section');
for (var i=0; i < tables.length; i++) {
if (tables[i].id == 'sec_' + sec)
tables[i].style.display = '';
else
tables[i].style.display = 'none';
}
var nav_items=document.getElementById('nav').childNodes;
for (var i=0; i < nav_items.length; i++) {
if (nav_items[i].id == 'nav_' + sec)
add_class(nav_items[i], 'active');
else
remove_class(nav_items[i], 'active');
}
document.getElementById('sec').value = sec;
}
function printLang(sLang, sReplace) {
if(typeof sLang === 'undefined')
return '';
sLang = sLang.replace(/<(\/|)(i|b)>/ig, '');
sLang = sLang.replace('&auml;', 'ä').replace('&uuml;', 'ü');
sLang = sLang.replace('&ouml;', 'ö').replace('&szlig;', '');
if(typeof sReplace != "undefined") {
aReplace = sReplace.split(",");
for(var i=0; i < aReplace.length; i++) {
var aReplaceSplit=aReplace[i].split("~");
sLang = sLang.replace("["+aReplaceSplit[0]+"]",aReplaceSplit[1]);
}
}
return sLang;
}
function checkPngGifOrJpg(imageName) {
var type=imageName.substring(imageName.length-3,imageName.length).toLowerCase();
return type == 'png' || type == 'jpg' || type == 'gif';
}
function toggle_option(name) {
var field=document.getElementById(name);
var txt=document.getElementById('_txt_' + name);
if(field && txt) {
if(field.style.display === 'none') {
field.style.display = '';
txt.style.display = 'none';
} else {
field.style.display = 'none';
txt.style.display = '';
}
txt = null;
field = null;
}
}
function togglePicker(id, state) {
var o=document.getElementById(id);
if(jscolor.picker && jscolor.picker.owner == o.color)
o.color.hidePicker();
else
o.color.showPicker();
o = null;
}
function pickWindowSize(id, dimension) {
var o=document.getElementById(id);
if(dimension == 'width') {
o.value = pageWidth();
} else {
o.value = pageHeight() - getHeaderHeight();
}
o = null;
}
var popupNN6=document.getElementById && !document.all;
var bDragging=false;
var pwX, pwY, pwTx, pwTy;
var dragObj=null;
function movemouse(e) {
if(bDragging) {
dragObj.style.left = popupNN6 ? (pwTx + e.clientX - pwX) + 'px' : (pwTx + event.clientX - pwX) + 'px';
dragObj.style.top  = popupNN6 ? (pwTy + e.clientY - pwY) + 'px' : (pwTy + event.clientY - pwY) + 'px';
return false;
}
return true;
}
function selectmouse(e) {
bDragging = true;
dragObj = document.getElementById('popupWindow');
pwTx = parseInt(dragObj.style.left+0, 10);
pwTy = parseInt(dragObj.style.top+0, 10);
pwX = popupNN6 ? e.clientX : event.clientX;
pwY = popupNN6 ? e.clientY : event.clientY;
document.body.onmousemove=movemouse;
return false;
}
function popupWindowClose() {
var w=document.getElementById('popupWindow');
if (w)
document.body.removeChild(w);
if (jscolor.picker)
jscolor.picker.owner.hidePicker();
}
function popupWindowRefresh() {
var oWindow=document.getElementById('popupWindow');
if(oWindow) {
popupWindowPutContent(getSyncRequest(oWindow.url, false, false));
oWindow = null;
}
}
function popupWindowPutContent(oContent) {
if(oContent === null || oContent.code === null) {
return false;
}
var oCell=document.getElementById('popupWindowContent');
if(oCell) {
oCell.innerHTML = oContent.code;
executeJS(oCell);
}
}
function popupWindow(title, oContent, openOnMousePosition, sWidth) {
if(oContent === null || oContent.code === null)
return false;
if(typeof openOnMousePosition === 'undefined')
openOnMousePosition = true;
if(typeof sWidth === 'undefined' || sWidth === null)
sWidth = '';
popupWindowClose();
var posX=getScrollLeft() + 100;
var posY=getScrollTop() + 20;
if(openOnMousePosition) {
}
var oContainerDiv=document.createElement('div');
oContainerDiv.setAttribute('id', 'popupWindow');
oContainerDiv.style.position = 'absolute';
oContainerDiv.style.left = posX+'px';
oContainerDiv.style.top = posY+'px';
oContainerDiv.url = oContent.url;
var oClose=document.createElement('div');
oClose.className = 'close';
oClose.onclick = function() {
popupWindowClose();
return false;
};
oClose.appendChild(document.createTextNode('x'));
oContainerDiv.appendChild(oClose);
oClose = null;
var oTitle=document.createElement('h1');
oTitle.appendChild(document.createTextNode(title));
oTitle.onmousedown = selectmouse;
oTitle.onmouseup = function() {
bDragging = false;
};
oContainerDiv.appendChild(oTitle);
oTitle = null;
var oTable=document.createElement('table');
oTable.setAttribute('id', 'popupWindowMaster');
if(sWidth !== '') {
oContainerDiv.style.width = sWidth+'px';
oTable.style.width = sWidth+'px';
}
var oTbody=document.createElement('tbody');
oRow = document.createElement('tr');
oCell = document.createElement('td');
oCell.setAttribute('id', 'popupWindowContent');
oCell.colSpan = '2';
oRow.appendChild(oCell);
oCell = null;
oTbody.appendChild(oRow);
oRow = null;
oTable.appendChild(oTbody);
oTbody = null;
oContainerDiv.appendChild(oTable);
oTable = null;
document.body.appendChild(oContainerDiv);
oContainerDiv = null;
popupWindowPutContent(oContent);
return false;
}
var Base=function() {
};
Base.extend = function(_instance, _static) { // subclass
var extend=Base.prototype.extend;
Base._prototyping = true;
var proto=new this();
extend.call(proto, _instance);
delete Base._prototyping;
var constructor=proto.constructor;
proto.constructor = function() {
if (!Base._prototyping) {
if (this._constructing || this.constructor == klass) { // instantiation
this._constructing = true;
constructor.apply(this, arguments);
delete this._constructing;
} else if (arguments[0] !== null) { // casting
return (arguments[0].extend || extend).call(arguments[0], proto);
}
}
return false;
};
var klass=proto.constructor;
klass.ancestor = this;
klass.extend = this.extend;
klass.forEach = this.forEach;
klass.implement = this.implement;
klass.prototype = proto;
klass.toString = this.toString;
klass.valueOf = function(type) {
return (type == "object") ? klass : constructor.valueOf();
};
extend.call(klass, _static);
if (typeof klass.init == "function") {
klass.init();
}
return klass;
};
Base.prototype = {
extend: function(source, value) {
if (arguments.length > 1) { // extending with a name/value pair
var ancestor=this[source];
if (ancestor && (typeof value == "function") && // overriding a method?
(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
/\bbase\b/.test(value)) {
var method=value.valueOf();
value = function() {
var previous=this.base || Base.prototype.base;
this.base = ancestor;
var returnValue=method.apply(this, arguments);
this.base = previous;
return returnValue;
};
value.valueOf = function(type) {
return (type == "object") ? value : method;
};
value.toString = Base.toString;
}
this[source] = value;
} else if (source) { // extending with an object literal
var extend=Base.prototype.extend;
if (!Base._prototyping && typeof this != "function") {
extend = this.extend || extend;
}
var proto={toSource: null};
var hidden=["constructor", "toString", "valueOf"];
var i=Base._prototyping ? 0 : 1;
var key;
while ((key = hidden[i++])) {
if (source[key] != proto[key]) {
extend.call(this, key, source[key]);
}
}
for (var key in source) {
if (!proto[key]) {
extend.call(this, key, source[key]);
}
}
}
return this;
},
base: function() {
}
};
Base = Base.extend({
constructor: function() {
this.extend(arguments[0]);
}
}, {
ancestor: Object,
version: "1.1",
forEach: function(object, block, context) {
for (var key in object) {
if (this.prototype[key] === undefined) {
block.call(context, object[key], key, object);
}
}
},
implement: function() {
for (var i=0; i < arguments.length; i++) {
if (typeof arguments[i] == "function") {
arguments[i](this.prototype);
} else {
this.prototype.extend(arguments[i]);
}
}
return this;
},
toString: function() {
return String(this.valueOf());
}
});
var frontendMessages={};
var frontendMessageList=[];
function frontendMessageActive() {
return frontendMessageList.length > 0;
}
function frontendMessageHide() {
if(frontendMessageActive())
document.body.removeChild(frontendMessageList.pop());
}
function frontendMessagePresent(key) {
return isset(frontendMessages[key]);
}
function frontendMessageRemove(key) {
if(frontendMessagePresent(key)) {
document.body.removeChild(frontendMessages[key]);
delete frontendMessages[key];
}
}
function frontendMessage(oMessage, iTimeout, key) {
var oContainerDiv;
var oTable;
var oTbody;
var oRow;
var oCell;
var oImg;
var sBoxType=oMessage.type.toLowerCase();
var sTitle='';
if(typeof oMessage.title !== 'undefined')
sTitle = oMessage.title;
if(isset(key) && frontendMessagePresent(key))
return;
if(typeof iTimeout !== 'undefined' && iTimeout !== 0) {
window.setTimeout(function() { frontendMessageHide(); }, iTimeout*1000);
}
var imgPath='/nagvis/frontend/nagvis-js/images/';
if(isset(oGeneralProperties) && isset(oGeneralProperties.path_images))
imgPath = oGeneralProperties.path_images
oContainerDiv = document.createElement('div');
oContainerDiv.setAttribute('id', 'messageBoxDiv');
if(isset(key)) {
frontendMessages[key] = oContainerDiv;
}
frontendMessageList.push(oContainerDiv);
oTable = document.createElement('table');
oTable.setAttribute('id', 'messageBox');
oTable.setAttribute('class', sBoxType);
oTable.setAttribute('className', sBoxType);
oTable.style.height = '100%';
oTable.style.width = '100%';
oTable.cellPadding = '0';
oTable.cellSpacing = '0';
oTbody = document.createElement('tbody');
oRow = document.createElement('tr');
oCell = document.createElement('td');
oCell.setAttribute('class', sBoxType);
oCell.setAttribute('className', sBoxType);
oCell.colSpan = '3';
oCell.style.height = '16px';
oCell.style.textAlign = 'right';
oCell.style.paddingRight = '5px';
oCell.style.fontSize = '10px';
var oLink=document.createElement('a');
oLink.href = '#';
oLink.onclick = function() {
frontendMessageHide();
return false;
};
oLink.appendChild(document.createTextNode('[close]'));
oCell.appendChild(oLink);
oRow.appendChild(oCell);
oCell = null;
oTbody.appendChild(oRow);
oRow = null;
oRow = document.createElement('tr');
oRow.style.height = '32px';
oCell = document.createElement('th');
oCell.setAttribute('class', sBoxType);
oCell.setAttribute('className', sBoxType);
oCell.style.width = '60px';
oImg = document.createElement('img');
oImg.src = imgPath + 'internal/msg_' + sBoxType + '.png';
oCell.appendChild(oImg);
oImg = null;
oRow.appendChild(oCell);
oCell = null;
oCell = document.createElement('th');
oCell.style.width = '474px';
oCell.setAttribute('class', sBoxType);
oCell.setAttribute('className', sBoxType);
oCell.appendChild(document.createTextNode(sTitle));
oRow.appendChild(oCell);
oCell = null;
oCell = document.createElement('th');
oCell.setAttribute('class', sBoxType);
oCell.setAttribute('className', sBoxType);
oCell.style.width = '60px';
oImg = document.createElement('img');
oImg.src = imgPath + 'internal/msg_' + sBoxType + '.png';
oCell.appendChild(oImg);
oImg = null;
oRow.appendChild(oCell);
oCell = null;
oTbody.appendChild(oRow);
oRow = null;
oRow = document.createElement('tr');
oCell = document.createElement('td');
oCell.setAttribute('class', sBoxType);
oCell.setAttribute('className', sBoxType);
oCell.colSpan = '3';
oCell.style.padding = '16px';
oCell.style.height = '202px';
oCell.innerHTML = oMessage.message
oRow.appendChild(oCell);
oCell = null;
oTbody.appendChild(oRow);
oRow = null;
oTable.appendChild(oTbody);
oTbody = null;
oContainerDiv.appendChild(oTable);
oTable = null;
document.body.appendChild(oContainerDiv);
oContainerDiv = null;
if(typeof oMessage.reloadTime !== 'undefined' && oMessage.reloadTime !== null) {
var sUrl=window.location.href;
if(typeof oMessage.reloadUrl !== 'undefined' && oMessage.reloadUrl !== null) {
sUrl = oMessage.reloadUrl;
}
sUrl = sUrl.replace('#', '');
window.setTimeout(function() { window.location.href = sUrl; }, oMessage.reloadTime*1000);
}
}
var _eventlog=null;
var oSeverity={
'debug':    4,
'info':     3,
'warning':  2,
'critical': 1,
'error':    1
};
function eventlogToggle(store) {
var oLog=document.getElementById('eventlog');
var oLogControl=document.getElementById('eventlogControl');
if(store === true)
storeUserOption('eventlog', oLog.style.display == 'none');
if(oLog.style.display != 'none') {
oLog.style.display = 'none';
oLogControl.style.bottom = '0px';
} else {
oLog.style.display = '';
oLog.style.height = oPageProperties.event_log_height+'px';
oLogControl.style.bottom = (parseInt(oPageProperties.event_log_height, 10)+5)+'px';
}
oLog = null;
}
function eventlogInitialize() {
var doc=document;
var oEventlog=doc.createElement('div');
oEventlog.setAttribute("id","eventlog");
oEventlog.style.overflow = 'auto';
oEventlog.style.height = oPageProperties.event_log_height+'px';
var oEventlogControl=doc.createElement('div');
oEventlogControl.setAttribute("id","eventlogControl");
oEventlogControl.style.bottom = (parseInt(oPageProperties.event_log_height, 10)+5)+'px';
oEventlogControl.appendChild(doc.createTextNode('_'));
oEventlogControl.onmouseover = function() {
document.body.style.cursor='pointer';
};
oEventlogControl.onmouseout = function() {
document.body.style.cursor='auto';
};
oEventlogControl.onclick = function() {
eventlogToggle(true);
};
doc.body.appendChild(oEventlog);
doc.body.appendChild(oEventlogControl);
oEventlogControl = null;
if((typeof(oUserProperties.eventlog) !== 'undefined' && oUserProperties.eventlog === false)
|| oPageProperties.event_log_hidden == 1)
eventlogToggle(false);
_eventlog = oEventlog;
oEventlog = null;
doc = null;
}
function eventlog(sComponent, sSeverity, sText) {
if(typeof(oPageProperties) != 'undefined' && oPageProperties !== null && oPageProperties.event_log && oPageProperties.event_log != '0') {
var doc=document;
if(_eventlog === null) {
eventlogInitialize();
eventlog("eventlog", "info", "Eventlog initialized (Level: "+oPageProperties.event_log_level+")");
}
var oEventlog=_eventlog;
if(typeof oSeverity[sSeverity] === 'undefined') {
eventlog('eventlog', 'error', 'Unknown severity used, skipping: '+sSeverity+' '+sComponent+': '+sText)
oEventlog = null;
}
if(oSeverity[sSeverity] <= oSeverity[oPageProperties.event_log_level]) {
if(oEventlog.childNodes && oEventlog.childNodes.length >= oPageProperties.event_log_events * 2) {
oEventlog.removeChild(oEventlog.firstChild);
oEventlog.removeChild(oEventlog.firstChild);
}
var oEntry=doc.createTextNode(getCurrentTime()+" "+sSeverity+" "+sComponent+": "+sText);
oEventlog.appendChild(oEntry);
oEntry = null;
oEventlog.appendChild(doc.createElement('br'));
oEventlog.scrollTop = oEventlog.scrollHeight;
}
oEventlog = null;
doc = null;
}
}
var _openHoverMenus=[];
var _hoverTimer=null;
function hoverOpen() {
return _openHoverMenus.length > 0;
}
function hoverHide(id) {
while(_openHoverMenus.length > 0) {
_openHoverMenus[0].style.display = 'none';
_openHoverMenus[0] = null;
_openHoverMenus.splice(0,1);
}
if(_hoverTimer !== null) {
clearTimeout(_hoverTimer);
_hoverTimer = null;
}
var obj=getMapObjByDomObjId(id);
if(obj) {
obj.parsedObject.style.cursor = 'auto';
obj.hoverX = null;
obj.hoverY = null;
obj = null;
}
}
function hoverShow(x, y, id) {
hoverHide(id);
var hoverSpacer=5;
var minWidth=400;
var obj=getMapObjByDomObjId(id);
obj.hoverX = x;
obj.hoverY = y;
var scrollTop=document.body.scrollTop ? document.body.scrollTop :
document.documentElement.scrollTop;
var scrollLeft=document.body.scrollLeft ? document.body.scrollLeft :
document.documentElement.scrollLeft;
var hoverMenu=document.getElementById(id+'-hover');
if(hoverMenu === null) {
eventlog('hover', 'error', 'Found no hover menu with the id "'+id+'-hover"');
return false;
}
obj.parsedObject.style.cursor = 'pointer';
obj = null;
hoverMenu.style.display = 'none';
hoverMenu.style.left = (x + scrollLeft + hoverSpacer - getSidebarWidth()) + 'px';
hoverMenu.style.top = (y + scrollTop + hoverSpacer - getHeaderHeight()) + 'px';
if(isIE) {
hoverMenu.style.width = '0px';
} else {
hoverMenu.style.width = 'auto';
}
hoverMenu.style.display = '';
if(hoverMenu.clientWidth - hoverSpacer > minWidth)
hoverMenu.style.width = hoverMenu.clientWidth - hoverSpacer + 'px';
else
hoverMenu.style.width = minWidth + 'px';
var hoverLeft=parseInt(hoverMenu.style.left.replace('px', ''));
var screenWidth=pageWidth();
var hoverPosAndSizeOk=true;
if(!hoverMenuInScreen(hoverMenu, hoverSpacer)) {
hoverPosAndSizeOk = false;
if(tryResize(hoverMenu, hoverSpacer, minWidth))
hoverPosAndSizeOk = true;
}
if(!hoverPosAndSizeOk) {
if(hoverMenu.clientWidth < minWidth) {
hoverMenu.style.left = (x - minWidth - hoverSpacer + scrollLeft) + 'px';
} else {
hoverMenu.style.left = (x - hoverMenu.clientWidth - hoverSpacer + scrollLeft) + 'px';
}
if(hoverMenuInScreen(hoverMenu, hoverSpacer)) {
hoverPosAndSizeOk = true;
} else {
if(tryResize(hoverMenu, hoverSpacer, minWidth, true)) {
hoverPosAndSizeOk = true;
}
}
}
if(!hoverMenuInScreen(hoverMenu, hoverSpacer)) {
hoverMenu.style.left = hoverSpacer + scrollLeft + 'px';
hoverMenu.style.width = pageWidth() - (2*hoverSpacer) + 'px';
}
var hoverTop=parseInt(hoverMenu.style.top.replace('px', ''));
if(hoverTop + hoverMenu.clientHeight > pageHeight() && hoverTop - hoverMenu.clientHeight >= 0)
hoverMenu.style.top = hoverTop - hoverMenu.clientHeight - hoverSpacer - 5 + 'px';
hoverTop = null;
_openHoverMenus.push(hoverMenu);
hoverMenu = null;
return false;
}
function hoverMenuInScreen(hoverMenu, hoverSpacer) {
var hoverLeft=parseInt(hoverMenu.style.left.replace('px', ''));
var scrollLeft=document.body.scrollLeft ? document.body.scrollLeft :
document.documentElement.scrollLeft;
if(hoverLeft < scrollLeft) {
return false;
}
var hoverRight=hoverLeft + hoverMenu.clientWidth - scrollLeft;
var viewRight=pageWidth();
if(hoverRight > viewRight) {
return false;
}
if(hoverLeft - hoverSpacer < 0) {
return false;
}
scrollLeft = null;
hoverLeft = null;
hoverMenu = null;
return true;
}
function tryResize(hoverMenu, hoverSpacer, minWidth, rightSide) {
if(!isset(rightSide))
var reposition=false;
var hoverLeft=parseInt(hoverMenu.style.left.replace('px', ''));
if(rightSide)
var overhead=hoverLeft + hoverMenu.clientWidth + hoverSpacer - pageWidth();
else
var overhead=hoverLeft;
var widthAfterResize=hoverMenu.clientWidth - overhead;
if(widthAfterResize > minWidth) {
hoverMenu.style.width = widthAfterResize + 'px';
if(rightSide) {
if(overhead < 0)
overhead *= -1
hoverMenu.style.left = (hoverLeft + overhead) + 'px';
}
return true;
} else {
return false;
}
hoverLeft = null;
overhead = null;
widthAfterResize = null;
hoverMenu = null;
reposition = null;
}
function replaceHoverTemplateChildMacros(oObj, sTemplateCode) {
var mapName='';
var childsHtmlCode='';
var regex='';
if(typeof(oPageProperties) != 'undefined' && oPageProperties != null)
mapName = oPageProperties.map_name;
var rowHtmlCode=oHoverTemplatesChild[oObj.conf.hover_template];
if(typeof(rowHtmlCode) != 'undefined' && rowHtmlCode != '' && oObj.members && oObj.members.length > 0) {
for(var i=0, len1 = oObj.conf.hover_childs_limit, len2 = oObj.members.length;
(len1 == -1 || (len1 >= 0 && i <= len1)) && i < len2; i++) {
if(len1 == -1 || (len1 >= 0 && i < len1)) {
if(!oObj.members[i].conf) {
eventlog("hover-parsing", "critical",
"Problem while parsing child in hover template (t:" & oObj.conf.type & " n:" & oObj.conf.name &")");
} else {
if(oObj.members[i].conf.type !== 'textbox' && oObj.members[i].conf.type !== 'shape') {
oObj.members[i].parent_type = oObj.conf.type;
oObj.members[i].parent_name = oObj.conf.name;
childsHtmlCode += replaceHoverTemplateMacrosChild(oObj.members[i], rowHtmlCode);
}
}
} else {
var oMember={
'conf': {
'type': 'host',
'name': '',
'summary_state': '',
'summary_output': (oObj.conf.num_members - oObj.conf.hover_childs_limit) + ' ' + _('more items...'),
'<!--\\sBEGIN\\sservicegroup_child\\s-->.+?<!--\\sEND\\sservicegroup_child\\s-->': ''
}
};
childsHtmlCode += replaceHoverTemplateMacrosChild(oMember, rowHtmlCode);
}
}
}
if(childsHtmlCode != '')
regex = getRegEx('loopChild', "<!--\\sBEGIN\\sloop_child\\s-->(.+?)<!--\\sEND\\sloop_child\\s-->");
else
regex = getRegEx('loopChildEmpty', '<!--\\sBEGIN\\schilds\\s-->.+?<!--\\sEND\\schilds\\s-->');
sTemplateCode = sTemplateCode.replace(regex, childsHtmlCode);
regex = null;
childsHtmlCode = null;
rowHtmlCode = null;
return sTemplateCode;
}
function replaceHoverTemplateMacrosChild(oObj, sTemplateCode) {
if(oObj.conf === null || oObj.conf === undefined) {
eventlog("hover-parsing", "critical", "Problem while parsing hover template");
return sTemplateCode;
}
var oMacros={
'obj_summary_state':  oObj.conf.summary_state,
'obj_summary_output': oObj.conf.summary_output
}
if(oObj.conf.summary_problem_has_been_acknowledged && oObj.conf.summary_problem_has_been_acknowledged == 1)
oMacros.obj_summary_acknowledged = '(Acknowledged)';
if(oObj.conf.summary_in_downtime && oObj.conf.summary_in_downtime == 1)
oMacros.obj_summary_in_downtime = '(Downtime)';
if(oObj.conf.summary_stale)
oMacros.obj_summary_stale = '(Stale)';
if(oObj.conf.type === 'service')
oMacros.obj_name = oObj.conf.service_description;
else
oMacros.obj_name = oObj.conf.name;
if((oObj.parent_type === 'servicegroup' || oObj.parent_type === 'dyngroup') && oObj.conf.type === 'service')
oMacros.obj_name1 = oObj.conf.name;
else {
var regex=getRegEx('section-sgchild', '<!--\\sBEGIN\\sservicegroup_child\\s-->.+?<!--\\sEND\\sservicegroup_child\\s-->', 'gm');
if(sTemplateCode.search(regex) !== -1)
sTemplateCode = sTemplateCode.replace(regex, '');
regex = null;
}
sTemplateCode = sTemplateCode.replace(/\[(\w*)\]/g, function(){ return oMacros[ arguments[1] ] || "";});
oMacros = null;
return sTemplateCode;
}
function replaceHoverTemplateDynamicMacros(oObj) {
var oMacros={};
if(isset(oPageProperties) && oPageProperties.view_type === 'map')
oMacros.map_name = oPageProperties.map_name;
oMacros.last_status_refresh = date(oGeneralProperties.date_format, oObj.lastUpdate);
oMacros.obj_state = oObj.conf.state;
oMacros.obj_summary_state = oObj.conf.summary_state;
if(oObj.conf.summary_problem_has_been_acknowledged && oObj.conf.summary_problem_has_been_acknowledged === 1)
oMacros.obj_summary_acknowledged = '(Acknowledged)';
if(oObj.conf.problem_has_been_acknowledged && oObj.conf.problem_has_been_acknowledged === 1)
oMacros.obj_acknowledged = '(Acknowledged)';
if(oObj.conf.summary_in_downtime && oObj.conf.summary_in_downtime === 1)
oMacros.obj_summary_in_downtime = '(Downtime)';
if(oObj.conf.in_downtime && oObj.conf.in_downtime === 1)
oMacros.obj_in_downtime = '(Downtime)';
if(oObj.conf.summary_stale)
oMacros.obj_summary_stale = '(Stale)';
if(oObj.conf.stale)
oMacros.obj_stale = '(Stale)';
oMacros.obj_output = oObj.conf.output;
oMacros.obj_summary_output = oObj.conf.summary_output;
if(oObj.conf.type === 'host' || oObj.conf.type === 'service') {
oMacros.obj_last_check = oObj.conf.last_check;
oMacros.obj_next_check = oObj.conf.next_check;
oMacros.obj_state_type = oObj.conf.state_type;
oMacros.obj_current_check_attempt = oObj.conf.current_check_attempt;
oMacros.obj_max_check_attempts = oObj.conf.max_check_attempts;
oMacros.obj_last_state_change = oObj.conf.last_state_change;
oMacros.obj_last_hard_state_change = oObj.conf.last_hard_state_change;
oMacros.obj_state_duration = oObj.conf.state_duration;
oMacros.obj_perfdata = oObj.conf.perfdata;
}
var sTemplateCode=oObj.hover_template_code;
if(oObj.firstUpdate !== null) {
var regex=getRegEx('img_timestamp', '_t='+oObj.firstUpdate, 'g');
if(sTemplateCode.search(regex) !== -1)
sTemplateCode = sTemplateCode.replace(regex, '_t='+oObj.lastUpdate);
regex = null;
}
if(oObj.conf.hover_childs_show && oObj.conf.hover_childs_show == '1')
sTemplateCode = replaceHoverTemplateChildMacros(oObj, sTemplateCode);
sTemplateCode = sTemplateCode.replace(/\[(\w*)\]/g, function(){ return oMacros[ arguments[1] ] || "";});
oMacros = null;
return sTemplateCode;
}
function replaceHoverTemplateStaticMacros(oObj, sTemplateCode) {
var oMacros={};
var oSectionMacros={};
if(oObj.conf === null)
eventlog("hover-parsing", "critical", "Problem while parsing hover template");
if(oObj.conf.type && oObj.conf.type != '')
oMacros.obj_type = oObj.conf.type;
oMacros.lang_obj_type = oObj.conf.lang_obj_type;
oMacros.lang_name = oObj.conf.lang_name;
oMacros.lang_child_name = oObj.conf.lang_child_name;
oMacros.lang_child_name1 = oObj.conf.lang_child_name1;
oMacros.obj_name = oObj.conf.name;
if(oObj.conf.alias && oObj.conf.alias !== '') {
oMacros.obj_alias        = oObj.conf.alias;
oMacros.obj_alias_braces = ' (' +oObj.conf.alias + ')';
} else {
oMacros.obj_alias        = '';
oMacros.obj_alias_braces = '';
}
if(oObj.conf.display_name && oObj.conf.display_name !== '')
oMacros.obj_display_name = oObj.conf.display_name;
else
oMacros.obj_display_name = '';
if(oObj.conf.notes && oObj.conf.notes !== '')
oMacros.obj_notes = oObj.conf.notes;
else
oMacros.obj_notes = '';
if(oObj.conf.type !== 'map') {
oMacros.obj_backendid = oObj.conf.backend_id;
oMacros.obj_backend_instancename = oObj.conf.backend_instancename;
oMacros.html_cgi = oObj.conf.htmlcgi;
oMacros.custom_1 = oObj.conf.custom_1;
oMacros.custom_2 = oObj.conf.custom_2;
oMacros.custom_3 = oObj.conf.custom_3;
} else {
oMacros.obj_backendid = '';
oMacros.obj_backend_instancename = '';
oMacros.html_cgi = '';
oMacros.custom_1 = '';
oMacros.custom_2 = '';
oMacros.custom_3 = '';
}
if(oObj.conf.type === 'host' || oObj.conf.type === 'service') {
oMacros.obj_address = oObj.conf.address;
oMacros.obj_tags    = oObj.conf.tags.join(', ');
for (var group_id in oObj.conf.taggroups) {
var group=oObj.conf.taggroups[group_id];
oMacros['obj_taggroup_' + group_id + '_title'] = group.title;
oMacros['obj_taggroup_' + group_id + '_topic'] = group.topic;
if (group.value) {
oMacros['obj_taggroup_' + group_id + '_value']       = group.value[0];
oMacros['obj_taggroup_' + group_id + '_value_title'] = group.value[1];
} else {
oMacros['obj_taggroup_' + group_id + '_value']       = '';
oMacros['obj_taggroup_' + group_id + '_value_title'] = '';
}
}
} else {
oMacros.obj_address = '';
oMacros.obj_tags    = '';
}
if (oMacros.obj_tags == '') {
oSectionMacros.has_tags = '<!--\\sBEGIN\\shas_tags\\s-->.+?<!--\\sEND\\shas_tags\\s-->';
}
if(oObj.conf.type === 'service') {
oMacros.service_description = oObj.conf.service_description;
oMacros.pnp_hostname = oObj.conf.name.replace(/\s/g,'%20');
oMacros.pnp_service_description = oObj.conf.service_description.replace(/\s/g,'%20');
} else
oSectionMacros.service = '<!--\\sBEGIN\\sservice\\s-->.+?<!--\\sEND\\sservice\\s-->';
if(oObj.conf.type === 'host')
oMacros.pnp_hostname = oObj.conf.name.replace(' ','%20');
else
oSectionMacros.host = '<!--\\sBEGIN\\shost\\s-->.+?<!--\\sEND\\shost\\s-->';
if(oObj.conf.type !== 'servicegroup' && !(oObj.conf.type === 'dyngroup' && oObj.conf.object_types == 'service')) {
oSectionMacros.servicegroup = '<!--\\sBEGIN\\sservicegroup\\s-->.+?<!--\\sEND\\sservicegroup\\s-->';
}
if(oObj.conf.type !== 'hostgroup')
oSectionMacros.hostgroup = '<!--\\sBEGIN\\shostgroup\\s-->.+?<!--\\sEND\\shostgroup\\s-->';
if(oObj.conf.type !== 'map')
oSectionMacros.map = '<!--\\sBEGIN\\smap\\s-->.+?<!--\\sEND\\smap\\s-->';
if(oObj.conf.hover_childs_show && oObj.conf.hover_childs_show != '1')
oSectionMacros.childs = '<!--\\sBEGIN\\schilds\\s-->.+?<!--\\sEND\\schilds\\s-->';
for (var key in oSectionMacros) {
var regex=getRegEx('section-'+key, oSectionMacros[key], 'gm');
if(sTemplateCode.search(regex) !== -1)
sTemplateCode = sTemplateCode.replace(regex, '');
regex = null;
}
oSectionMacros = null;
sTemplateCode = sTemplateCode.replace(/\[(\w*)\]/g, function(){ return oMacros[ arguments[1] ] || '['+arguments[1]+']';});
oMacros = null;
var regex=getRegEx('loopChild', "<!--\\sBEGIN\\sloop_child\\s-->(.+?)<!--\\sEND\\sloop_child\\s-->");
if(sTemplateCode.search(regex) !== -1)
sTemplateCode = sTemplateCode.replace(regex, '<!-- BEGIN loop_child -->'+oHoverTemplatesChild[oObj.hover_template]+'<!-- END loop_child -->');
regex = null;
var regex=getRegEx('img', "<img.*src=['\"]?([^>'\"]*)['\"]?");
var results=regex.exec(sTemplateCode);
if(results !== null) {
for(var i=0, len = results.length; i < len; i=i+2) {
var sTmp;
sTmp = results[i].replace(results[i+1], results[i+1]+"&_t="+oObj.firstUpdate);
sTemplateCode = sTemplateCode.replace(results[i], sTmp);
sTmp = null;
}
}
results = null;
regex = null;
return sTemplateCode;
}
function displayHoverMenu(event, objId, iHoverDelay) {
if(!event) {
alert('ERROR: The event object is not defined.');
return;
}
if(!objId) {
alert('ERROR: The object id is not defined.');
return;
}
if(!dragging() && !contextOpen() && _hoverTimer === null) {
if(iHoverDelay && iHoverDelay != "0" && !hoverOpen())
_hoverTimer = setTimeout('hoverShow('+event.clientX+', '+event.clientY+', "'+objId+'")', parseInt(iHoverDelay)*1000);
else
hoverShow(event.clientX, event.clientY, objId);
}
}
var _replaceContext=false;
var _openContextMenus=[];
function contextOpen() {
var bReturn;
if(_openContextMenus.length > 0) {
bReturn = true;
} else {
bReturn = false;
}
return bReturn
}
function contextHide() {
while(_openContextMenus.length > 0) {
_openContextMenus[0].style.display = 'none';
_openContextMenus[0] = null;
_openContextMenus.splice(0,1);
}
}
function contextMouseDown(event) {
var target;
var id=-1;
if(event === null || typeof event === 'undefined')
event = window.event;
if(typeof event.target != 'undefined' && event.target !== null)
target = event.target;
else
target = event.srcElement;
var oNode=target;
while(typeof oNode.parentNode != 'undefined'
&& oNode.parentNode && oNode.parentNode !== null
&& (typeof oNode.id === 'undefined' || oNode.id === ''))
oNode = oNode.parentNode;
if(typeof oNode.id !== 'undefined' && oNode.id !== '')
id = oNode.id;
oNode = null;
if(id === -1 || id.indexOf('http:') === -1 && id.indexOf('-context') === -1)
contextHide();
if(dragging())
return false;
if(event.button === 2)
_replaceContext = true;
}
function contextShow(event) {
var target;
if (event === null || typeof event === 'undefined')
event = window.event;
if(typeof event.target != 'undefined' && event.target !== null)
target = event.target;
else
target = event.srcElement;
if(!_replaceContext)
return false;
hoverHide();
var scrollTop=document.body.scrollTop ? document.body.scrollTop :
document.documentElement.scrollTop;
var scrollLeft=document.body.scrollLeft ? document.body.scrollLeft :
document.documentElement.scrollLeft;
while(target && (typeof target.id === 'undefined' || target.id === '')) {
target = target.parentNode;
}
var id;
if(target.id !== '')
id = target.id;
if(typeof id === 'undefined') {
eventlog("context", "error", "Target object search had no id");
_replaceContext = false;
return false;
}
if(id.indexOf('-') !== -1)
id = id.substr(0, id.lastIndexOf('-'));
var contextMenu=document.getElementById(id+'-context');
if(contextMenu === null) {
eventlog('context', 'error', 'Found no context menu wit the id "'+id+'-context"');
_replaceContext = false;
return false;
}
contextMenu.style.display = 'none';
contextMenu.style.left = event.clientX + scrollLeft - getSidebarWidth() + 'px';
contextMenu.style.top = event.clientY + scrollTop - getHeaderHeight() + 'px';
contextMenu.style.display = '';
var contextLeft=parseInt(contextMenu.style.left.replace('px', ''));
if(contextLeft+contextMenu.clientWidth > pageWidth()) {
contextMenu.style.left = contextLeft - contextMenu.clientWidth + 'px';
}
contextLeft = null;
var contextTop=parseInt(contextMenu.style.top.replace('px', ''));
if(contextTop+contextMenu.clientHeight > pageHeight()) {
if(contextTop - contextMenu.clientHeight >= 0) {
contextMenu.style.top = contextTop - contextMenu.clientHeight + 'px';
}
}
contextTop = null;
_openContextMenus.push(contextMenu);
contextMenu = null;
_replaceContext = false;
return false;
}
var ajaxQueryCache={};
var ajaxQueryCacheLifetime=30;
function initXMLHttpClient() {
var xmlhttp;
try {
xmlhttp = new XMLHttpRequest();
} catch (e) {
var XMLHTTP_IDS=[ 'MSXML2.XMLHTTP.5.0',
'MSXML2.XMLHTTP.4.0',
'MSXML2.XMLHTTP.3.0',
'MSXML2.XMLHTTP',
'Microsoft.XMLHTTP' ];
var success=false;
for(var i=0, len = XMLHTTP_IDS.length; i < len && !success; i++) {
try {
xmlhttp = new ActiveXObject(XMLHTTP_IDS[i]);
success = true;
} catch (e) {}
}
if (!success) {
throw new Error('Unable to create XMLHttpRequest.');
}
}
return xmlhttp;
}
function updateQueryCache(url, timestamp, response) {
ajaxQueryCache[url] = { "timestamp": timestamp, "response": response };
eventlog("ajax", "debug", "Caching Query: "+url);
}
function cleanupQueryCache(sUrl) {
ajaxQueryCache[sUrl] = null;
delete ajaxQueryCache[sUrl];
eventlog("ajax", "debug", "Removed cached ajax query:"+sUrl);
}
function cleanupAjaxQueryCache() {
eventlog("ajax", "debug", "Removing old cached ajax queries");
for(var sKey in ajaxQueryCache) {
if(iNow - ajaxQueryCache[sKey].timestamp > ajaxQueryCacheLifetime) {
cleanupQueryCache(sKey);
}
}
}
function ajaxError(e) {
eventlog("ajax", "critical", "Problem while ajax transaction");
eventlog("ajax", "debug", e.toString());
frontendMessage({'type': 'CRITICAL',
'title': 'Ajax transaction error',
'message': 'Problem while ajax transaction. Is the NagVis host reachable?'},
0, 'ajaxError');
}
function httpError(text) {
frontendMessage({'type': 'CRITICAL',
'title': 'HTTP error',
'message': text}, 0, 'httpError');
}
function phpError(text) {
frontendMessage({'type': 'CRITICAL',
'title': 'PHP error',
'message': "PHP error in ajax request handler:\n" + text});
}
function jsonError(text) {
frontendMessage({'type': 'CRITICAL',
'title': 'Syntax error',
'message': text}, 0, 'jsonError');
}
function getAsyncRequest(sUrl, bCacheable, callback, callbackParams) {
if(bCacheable === null)
bCacheable = true;
if(!isset(callback))
callback = handleAsyncResponse;
if(!isset(callbackParams))
callbackParams = null;
sUrl = sUrl.replace("+", "%2B");
if(bCacheable
&& typeof(ajaxQueryCache[sUrl]) !== 'undefined'
&& iNow - ajaxQueryCache[sUrl].timestamp <= ajaxQueryCacheLifetime) {
eventlog("ajax", "debug", "Using cached query");
if(ajaxQueryCache[sUrl].response !== '')
callback(eval('( '+ajaxQueryCache[sUrl].response+')'), callbackParams);
else
cleanupQueryCache(sUrl);
} else {
var oRequest=initXMLHttpClient();
if(!oRequest)
return false;
oRequest.open("GET", sUrl+"&_t="+iNow);
oRequest.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
oRequest.onreadystatechange = function() {
if(oRequest && oRequest.readyState == 4) {
if(oRequest.status != 200) {
if(oRequest.status == 0) {
return; // silently skip status code 0 (occurs e.g. during page switching)
}
var msg='HTTP-Response: ' + oRequest.status;
if(oRequest.responseText != '') {
msg += ' - Body: ' + oRequest.responseText;
} else if(oRequest.status == 500) {
msg += ' - Internal Server Error (Take a look at the apache error log for details.)'
}
httpError(msg);
return;
}
frontendMessageRemove('httpError');
frontendMessageRemove('ajaxError');
var oResponse=null;
if(oRequest.responseText.replace(/\s+/g, '').length === 0) {
if(bCacheable)
updateQueryCache(sUrl, iNow, '');
} else {
var responseText=oRequest.responseText.replace(/^\s+/,"");
if(responseText.match(/^Notice:|^Warning:|^Error:|^Parse error:/)) {
phpError(responseText);
} else {
oResponse = handleJsonResponse(sUrl, responseText);
if(oResponse === '')
oResponse = null;
}
responseText = null;
}
callback(oResponse, callbackParams);
oResponse = null;
}
}
try {
oRequest.send(null);
} catch(e) {
ajaxError(e);
}
}
}
function handleAsyncResponse(oResponse) {
if(isset(oResponse) && oResponse.status != 'OK')
alert(oResponse.message);
oResponse = null;
}
function getSyncRequest(sUrl, bCacheable, bRetryable) {
var sResponse=null;
var responseText;
if(!isset(bCacheable))
bCacheable = true;
if(!isset(bRetryable))
bRetryable = true;
sUrl = sUrl.replace("+", "%2B");
if(bCacheable
&& typeof(ajaxQueryCache[sUrl]) !== 'undefined'
&& iNow - ajaxQueryCache[sUrl].timestamp <= ajaxQueryCacheLifetime) {
eventlog("ajax", "debug", "Using cached query");
responseText = ajaxQueryCache[sUrl].response;
if(responseText !== '') {
sResponse = handleJsonResponse(sUrl, responseText);
} else {
cleanupQueryCache(sUrl);
}
responseText = null;
} else {
var oRequest=initXMLHttpClient();
if(oRequest) {
var url=sUrl;
var timestamp=iNow;
oRequest.open("GET", sUrl+"&_t="+timestamp, false);
oRequest.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
try {
oRequest.send(null);
frontendMessageRemove('ajaxError');
} catch(e) {
ajaxError(e);
bCacheable = false;
}
responseText = oRequest.responseText;
if(responseText.replace(/\s+/g, '').length === 0) {
if(bCacheable) {
updateQueryCache(url, timestamp, '');
}
sResponse = '';
} else {
responseText = responseText.replace(/^\s+/,"");
if(responseText.match(/^Notice:|^Warning:|^Error:|^Parse error:/)) {
phpError(responseText);
} else {
sResponse = handleJsonResponse(sUrl, responseText)
if(sResponse !== '' && bCacheable) {
updateQueryCache(url, timestamp, responseText);
}
responseText = null;
}
}
url = null;
timestamp = null;
}
oRequest = null;
}
return sResponse;
}
function handleJsonResponse(sUrl, responseText) {
try {
oResponse = eval('( '+responseText+')');
frontendMessageRemove('jsonError');
} catch(e) {
jsonError("Invalid json response<div class=details>\nTime: " + iNow + "<br />\nURL: " + sUrl + "<br />\nResponse: <code>" + responseText + '</code></div>');
return '';
}
if(typeof(oResponse) !== 'object') {
jsonError("Invalid json response:\nTime:" + iNow + "\nURL: " + sUrl + "\nResponse: " + responseText);
return '';
} else {
if(isset(oResponse.type) && isset(oResponse.message)) {
frontendMessage(oResponse, 0, 'miscError');
return '';
}
frontendMessageRemove('miscError');
return oResponse;
}
}
function getSyncUrl(url) {
var oReq=initXMLHttpClient();
oReq.open('GET', url, false);
oReq.send(null);
return oReq.responseText;
}
function postSyncUrl(url, data) {
var oReq=initXMLHttpClient();
oReq.open('POST', url, false);
oReq.setRequestHeader("If-Modified-Since", "Sat, 22 Sep 1986 00:00:00 GMT");
oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
oReq.setRequestHeader("Content-length", data.length);
oReq.setRequestHeader("Connection", "close");
oReq.send(data);
return oReq.responseText;
}
function getBulkRequest(sBaseUrl, aUrlParts, iLimit, bCacheable, handler, handlerParams) {
var sUrl='';
var o;
var aReturn=[];
var async=false;
if(typeof handler == 'function')
async = true;
eventlog("ajax", "debug", "Bulk parts: "+aUrlParts.length+" Async: "+ async);
var count=0;
for(var i=0, len = aUrlParts.length; i < len; i++) {
sUrl = sUrl + aUrlParts[i];
count += 1;
if(sUrl !== '' && (sBaseUrl.length + sUrl.length > iLimit || i == len - 1)) {
eventlog("ajax", "debug", "Bulk go: "+ count);
if(async)
getAsyncRequest(sBaseUrl + sUrl, bCacheable, handler, handlerParams);
else {
o = getSyncRequest(sBaseUrl + sUrl, bCacheable);
if(o)
aReturn = aReturn.concat(o);
o = null;
}
count = 0;
sUrl = '';
}
}
return aReturn;
}
function postSyncRequest(sUrl, request) {
var oResponse=null;
var responseText;
sUrl = sUrl.replace("+", "%2B");
var oRequest=initXMLHttpClient();
if(oRequest) {
oRequest.open("POST", sUrl+"&_t="+iNow, false);
oRequest.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
if (typeof request !== 'object')
oRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
try {
oRequest.send(request);
frontendMessageRemove('ajaxError');
} catch(e) {
ajaxError(e);
}
responseText = oRequest.responseText;
if(oResponse === null && responseText.replace(/\s+/g, '').length !== 0) {
responseText = responseText.replace(/^\s+/,"");
if(responseText.match(/^Notice:|^Warning:|^Error:|^Parse error:/)) {
oResponse = {};
oResponse.type = 'CRITICAL';
oResponse.message = "PHP error in ajax request handler:\n"+responseText;
oResponse.title = "PHP error";
} else {
try {
oResponse = eval('( '+responseText+')');
} catch(e) {
oResponse = {};
oResponse.type = 'CRITICAL';
oResponse.message = "Invalid JSON response:\n"+responseText;
oResponse.title = "Syntax error";
}
responseText = null;
}
}
}
oRequest = null;
return oResponse;
}
function getFormParams(formId, skipHelperFields) {
if (window.FormData) {
var data=new FormData();
var formdata=true;
} else {
var formdata=false;
var data='';
}
var add_data=function(key, val) {
if (formdata)
data.append(key, val);
else
data += key + "=" + escapeUrlValues(val) + "&";
};
var oForm=document.getElementById(formId);
if (typeof oForm === 'undefined')
return data;
var aFields=oForm.getElementsByTagName('input');
for (var i=0, len = aFields.length; i < len; i++) {
if (skipHelperFields && aFields[i].name.charAt(0) === '_')
continue;
var oFieldDefault=document.getElementById('_'+aFields[i].name);
if (aFields[i] && oFieldDefault && !document.getElementById('_conf_'+aFields[i].name)) {
if (aFields[i].value === oFieldDefault.value) {
continue;
}
}
oFieldDefault = null;
if (aFields[i].type == "hidden"
|| aFields[i].type == "text"
|| aFields[i].type == "password"
|| aFields[i].type == "submit") {
add_data(aFields[i].name, aFields[i].value);
}
else if (aFields[i].type == "checkbox") {
if (aFields[i].checked) {
add_data(aFields[i].name, aFields[i].value);
}
else {
add_data(aFields[i].name, '');
}
}
else if (aFields[i].type == "radio") {
if (aFields[i].checked) {
add_data(aFields[i].name, aFields[i].value);
}
}
else if (aFields[i].type == "file") {
if (!formdata) {
throw new Error('File upload not supported with your browser. '
+'This form can only be used when using a browser '
+'which suports javascript file uploads (FormData).');
}
if (aFields[i].files.length > 0) {
var file=aFields[i].files[0];
data.append(aFields[i].name, file, file.name);
}
}
}
aFields = oForm.getElementsByTagName('select');
for(var i=0, len = aFields.length; i < len; i++) {
if (skipHelperFields && aFields[i].name.charAt(0) === '_')
continue;
var oFieldDefault=document.getElementById('_'+aFields[i].name);
if(aFields[i] && oFieldDefault) {
if(aFields[i].value === oFieldDefault.value) {
continue;
}
}
oFieldDefault = null;
if(!aFields[i].multiple || aFields[i].multiple !== true) {
if (aFields[i].selectedIndex != -1) {
add_data(aFields[i].name, aFields[i].options[aFields[i].selectedIndex].value);
}
} else {
for (var a=0; a < aFields[i].options.length; a++) {
if (aFields[i].options[a].selected == true) {
add_data(aFields[i].name+'[]', aFields[i].options[a].value);
}
}
}
}
aFields = null;
oForm = null;
return data;
}
function getDomObjViewType(id) {
if(document.getElementById(id+'-icondiv'))
return 'icon';
else if(document.getElementById(id+'-linediv'))
return 'line';
}
function getDomObjType(id) {
return 'service';
}
function getMidOfAnchor(oObj) {
return [ oObj.x + parseInt(oObj.style.width)  / 2,
oObj.y + parseInt(oObj.style.height) / 2 ];
}
function handleDragResult(objId, anchorId) {
var urlParts='';
var jsObj=getMapObjByDomObjId(objId);
urlParts = '&x=' + escapeUrlValues(jsObj.conf.x) + '&y=' + escapeUrlValues(jsObj.conf.y);
jsObj = null;
return urlParts;
}
function saveObjectAfterResize(oObj) {
var objId=oObj.id.split('-')[0];
var objX=rmZoomFactor(pxToInt(oObj.style.left), true);
var objY=rmZoomFactor(pxToInt(oObj.style.top), true);
var objW=rmZoomFactor(parseInt(oObj.style.width));
var objH=rmZoomFactor(parseInt(oObj.style.height));
var obj=getMapObjByDomObjId(objId);
obj.conf.x = objX;
obj.conf.y = objY;
obj.conf.w = objW;
obj.conf.h = objH;
obj.reposition();
if(!isInt(objX) || !isInt(objY) || !isInt(objW) || !isInt(objH)) {
alert('ERROR: Invalid coords ('+objX+'/'+objY+'/'+objW+'/'+objH+'). Terminating.');
return false;
}
var urlPart='&x='+objX+'&y='+objY+'&w='+objW+'&h='+objH;
getAsyncRequest(oGeneralProperties.path_server + '?mod=Map&act=modifyObject'
+'&map=' + escapeUrlValues(oPageProperties.map_name)
+ '&id=' + escapeUrlValues(objId) + urlPart);
}
function saveObjectAfterAnchorAction(oAnchor) {
var arr=oAnchor.id.split('-');
var objId=arr[0];
var anchorType=arr[1];
var anchorId=arr[2];
arr = null;
var urlPart='';
var action='modifyObject';
if(anchorType === 'drag' || anchorType === 'icondiv' || anchorType === 'label') {
urlPart = handleDragResult(objId, anchorId);
} else if(anchorType === 'delete') {
action  = 'deleteObject';
} else {
alert('Unhandled action object: ' + anchorType);
}
getAsyncRequest(oGeneralProperties.path_server + '?mod=Map&act=' + action + '&map='
+ escapeUrlValues(oPageProperties.map_name)
+ '&id=' + escapeUrlValues(objId) + urlPart);
}
function saveObjectAttr(objId, attr) {
var urlPart='';
for (var key in attr)
urlPart += '&' + key + '=' + escapeUrlValues(attr[key]);
getAsyncRequest(oGeneralProperties.path_server + '?mod=Map&act=modifyObject&map='
+ escapeUrlValues(oPageProperties.map_name) + '&id=' + escapeUrlValues(objId) + urlPart);
}
function saveObjectRemove(objId) {
getAsyncRequest(oGeneralProperties.path_server + '?mod=Map&act=deleteObject&map='
+ escapeUrlValues(oPageProperties.map_name) + '&id=' + escapeUrlValues(objId));
}
var favicon={
change: function(iconURL) {
this.addLink(iconURL, true);
},
addLink: function(iconURL) {
var docHead=document.getElementsByTagName("head")[0];
var link=document.createElement("link");
link.type = "image/x-icon";
link.rel = "shortcut icon";
link.href = iconURL;
this.removeLinkIfExists();
docHead.appendChild(link);
link = null;
docHead = null;
},
removeLinkIfExists: function() {
var docHead=document.getElementsByTagName("head")[0];
var links=docHead.getElementsByTagName("link");
if(!docHead || !links)
return false;
for (var i=0, len = links.length; i<len; i++) {
if (links[i] && links[i].type == "image/x-icon" && links[i].rel == "shortcut icon") {
docHead.removeChild(links[i]);
}
}
links = null;
docHead = null;
return true;
}
};
var oHoverTemplates={};
var oHoverTemplatesChild={};
var oHoverUrls={};
var oContextTemplates={};
var bBlockUpdates=false;
var iNumUnlocked=false;
var cacheHeaderHeight=null;
var workerTimeoutID=null;
function inMaintenance(displayMsg) {
if(!isset(displayMsg))
var displayMsg=true;
if(oPageProperties && oPageProperties.in_maintenance === '1') {
hideStatusMessage();
if(displayMsg && !frontendMessageActive())
frontendMessage({'type': 'NOTE', 'title': 'Maintenance', 'message': 'The current page is in maintenance mode.<br />Please be patient.'});
return true;
} else {
return false;
}
}
function getHeaderHeight() {
if(cacheHeaderHeight === null) {
var ret=0;
var oHeader=document.getElementById('header');
if(oHeader) {
if(oHeader.style.display != 'none')
ret = oHeader.clientHeight;
oHeader = null;
}
cacheHeaderHeight = ret;
}
return cacheHeaderHeight;
}
function submitFrontendForm(sUrl, sFormId, bReloadOnSuccess) {
if(typeof bReloadOnSuccess === 'undefined' || bReloadOnSuccess === null) {
bReloadOnSuccess = '';
}
var oResult=postSyncRequest(sUrl, getFormParams(sFormId, true));
if(oResult && oResult.type) {
if(oResult.type === 'ok' && bReloadOnSuccess) {
if(typeof popupWindowRefresh == 'function') {
popupWindowRefresh();
}
} else {
frontendMessage(oResult);
if(typeof popupWindowClose == 'function') {
popupWindowClose();
}
}
}
oResult = null;
}
function submitFrontendForm2(sUrl, sFormId) {
var oResult=postSyncRequest(sUrl, getFormParams(sFormId, false));
if(oResult && oResult.type) {
frontendMessage(oResult);
if(typeof popupWindowClose == 'function')
popupWindowClose();
} else {
popupWindowPutContent(oResult);
}
oResult = null;
}
function updateForm() {
document.getElementById('_update').value = '1';
document.getElementById('_submit').click();
}
function showFrontendDialog(sUrl, sTitle, sWidth) {
if(typeof sWidth === 'undefined' || sWidth === null) {
sWidth = 350;
}
var oContent=getSyncRequest(sUrl, false, false);
if(isset(oContent)) {
oContent.url = sUrl;
if(typeof oContent !== 'undefined' && typeof oContent.code !== 'undefined') {
popupWindow(sTitle, oContent, true, sWidth);
}
oContent = null;
}
}
function searchObjectsKeyCheck(sMatch, e) {
var charCode;
if(e && e.which) {
charCode = e.which;
} else if(window.event) {
e = window.event;
charCode = e.keyCode;
}
if(charCode == 13) {
searchObjects(sMatch);
}
}
function searchObjects(sMatch) {
var aResults=[];
var bMatch=false;
if(sMatch == '')
return false;
var obj;
for(var i in oMapObjects) {
obj = oMapObjects[i];
if(obj.conf.type != 'shape'
&& obj.conf.type != 'textbox'
&& obj.conf.type != 'container'
&& obj.conf.type != 'line') {
bMatch = false;
var regex=new RegExp(sMatch, 'g');
if(obj.conf.type.search(regex) !== -1)
bMatch = true;
if(obj.conf.name.search(regex) !== -1)
bMatch = true;
if(obj.conf.type === 'service'
&& obj.conf.service_description.search(regex) !== -1)
bMatch = true;
regex = null;
if(bMatch === true)
aResults.push(i);
}
}
obj = null;
for(var i=0, len = aResults.length; i < len; i++) {
var objectId=aResults[i];
if(oMapObjects[objectId].conf.view_type && oMapObjects[objectId].conf.view_type === 'icon') {
setTimeout('flashIcon("'+objectId+'", '+oPageProperties.event_highlight_duration+', '+oPageProperties.event_highlight_interval+')', 0);
} else {
}
if(len == 1) {
setTimeout('scrollSlow('+oMapObjects[objectId].parsedX()+', '+oMapObjects[objectId].parsedY()+', 1)', 0);
}
objectId = null;
}
}
function getObjectsToUpdate() {
eventlog("worker", "debug", "getObjectsToUpdate: Start");
var arrReturn=[];
for(var i in oMapObjects) {
if(oMapObjects[i].lastUpdate <= iNow - oWorkerProperties.worker_update_object_states) {
if(oMapObjects[i].conf.type !== 'textbox'
&& oMapObjects[i].conf.type !== 'shape'
&& oMapObjects[i].conf.type !== 'container') {
arrReturn.push(i);
} else if(oMapObjects[i].conf.enable_refresh && oMapObjects[i].conf.enable_refresh == '1') {
arrReturn.push(i);
}
}
}
var iNumTimeslots=Math.ceil(oWorkerProperties.worker_update_object_states / oWorkerProperties.worker_interval);
var iNumObjectsPerTimeslot=Math.ceil(oLength(oMapObjects) / iNumTimeslots);
eventlog("worker", "debug", "Number of timeslots: "+iNumTimeslots+" Number of Objects per Slot: "+iNumObjectsPerTimeslot);
if(arrReturn.length > iNumObjectsPerTimeslot) {
eventlog("worker", "debug", "Spreading map objects in timeslots");
arrReturn.sort(function(id_1, id_2) {
return oMapObjects[id_1].lastUpdate > oMapObjects[id_2].lastUpdate;
});
arrReturn = arrReturn.slice(0, iNumObjectsPerTimeslot);
}
eventlog("worker", "debug", "getObjectsToUpdate: Have to update "+arrReturn.length+" objects");
return arrReturn;
}
function getFileAgeParams(viewType, mapName) {
if(!isset(viewType))
var viewType=oPageProperties.view_type;
if(!isset(mapName))
var mapName=oPageProperties.map_name;
var addParams='';
if(viewType === 'map' && mapName !== false)
addParams = '&f[]=map,' + mapName + ',' + oFileAges[mapName];
return '&f[]=maincfg,maincfg,' + oFileAges['maincfg'] + addParams;
}
function getHoverUrls() {
var aUrlParts=[];
for(var i in oMapObjects) {
if(oMapObjects[i].conf.hover_menu && oMapObjects[i].conf.hover_menu == 1
&& oMapObjects[i].conf.hover_url && oMapObjects[i].conf.hover_url !== '') {
oHoverUrls[oMapObjects[i].conf.hover_url] = '';
}
}
for(var i in oHoverUrls)
if(i != 'Inherits')
aUrlParts.push('&url[]='+escapeUrlValues(i));
var aTemplateObjects=getBulkRequest(oGeneralProperties.path_server+'?mod=General&act=getHoverUrl',
aUrlParts, oWorkerProperties.worker_request_max_length, true);
if(aTemplateObjects.length > 0)
for(var i=0, len = aTemplateObjects.length; i < len; i++)
oHoverUrls[aTemplateObjects[i].url] = aTemplateObjects[i].code;
aTemplateObjects = null;
}
function parseHoverMenus() {
for(var i in oMapObjects)
if(oMapObjects[i].needsHoverMenu())
oMapObjects[i].parseHoverMenu();
}
function getHoverTemplateChildCode(sTemplateCode) {
var regex=getRegEx('loopChild', "<!--\\sBEGIN\\sloop_child\\s-->(.+?)<!--\\sEND\\sloop_child\\s-->");
var results=regex.exec(sTemplateCode);
regex = null;
if(results !== null)
return results[1];
else
return '';
}
function getHoverTemplates() {
var aUrlParts=[];
for(var i in oMapObjects) {
if(isset(oMapObjects[i].conf.hover_menu) && oMapObjects[i].conf.hover_menu == '1'
&& (!oMapObjects[i].conf.hover_url || oMapObjects[i].conf.hover_url === '')
&& isset(oMapObjects[i].conf.hover_template)
&& (!isset(oHoverTemplates[oMapObjects[i].conf.hover_template]) || oHoverTemplates[oMapObjects[i].conf.hover_template] === '')) {
oHoverTemplates[oMapObjects[i].conf.hover_template] = '';
}
}
for(var i in oHoverTemplates)
if(i !== 'Inherits' && oHoverTemplates[i] === '')
aUrlParts.push('&name[]='+i);
if(aUrlParts.length == 0)
return;
var aTemplateObjects=getBulkRequest(oGeneralProperties.path_server+'?mod=General&act=getHoverTemplate',
aUrlParts, oWorkerProperties.worker_request_max_length, true);
if(aTemplateObjects.length > 0)
for(var i=0, len = aTemplateObjects.length; i < len; i++) {
oHoverTemplates[aTemplateObjects[i].name] = aTemplateObjects[i].code;
oHoverTemplatesChild[aTemplateObjects[i].name] = getHoverTemplateChildCode(aTemplateObjects[i].code);
if(isset(aTemplateObjects[i].css_file)) {
var oLink=document.createElement('link');
oLink.href = aTemplateObjects[i].css_file
oLink.rel = 'stylesheet';
oLink.type = 'text/css';
document.getElementsByTagName("head")[0].appendChild(oLink);
oLink = null;
}
}
aTemplateObjects = null;
}
function getContextTemplates() {
var aUrlParts=[];
for(var i in oMapObjects)
if(isset(oMapObjects[i].conf.context_template)
&& (!isset(oContextTemplates[oMapObjects[i].conf.context_template]) || oContextTemplates[oMapObjects[i].conf.context_template] === ''))
oContextTemplates[oMapObjects[i].conf.context_template] = '';
for(var sName in oContextTemplates)
if(sName !== 'Inherits' && oContextTemplates[sName] === '')
aUrlParts.push('&name[]='+sName);
if(aUrlParts.length === 0)
return;
var aTemplateObjects=getBulkRequest(oGeneralProperties.path_server+'?mod=General&act=getContextTemplate', aUrlParts, oWorkerProperties.worker_request_max_length, true);
if(aTemplateObjects.length > 0) {
for(var i=0, len = aTemplateObjects.length; i < len; i++) {
oContextTemplates[aTemplateObjects[i].name] = aTemplateObjects[i].code;
if(isset(aTemplateObjects[i].css_file)) {
var oLink=document.createElement('link');
oLink.href = aTemplateObjects[i].css_file
oLink.rel = 'stylesheet';
oLink.type = 'text/css';
document.getElementsByTagName("head")[0].appendChild(oLink);
oLink = null;
}
}
}
aTemplateObjects = null;
}
function parseContextMenus() {
for(var i in oMapObjects)
if(oMapObjects[i].needsContextMenu())
oMapObjects[i].parseContextMenu();
}
function getBackgroundColor(oObj) {
var sColor;
if(!oObj.summary_state || oObj.summary_state == 'PENDING' || oObj.summary_state == 'OK' || oObj.summary_state == 'UP')
sColor = oPageProperties.background_color;
else {
sColor = oStates[oObj.summary_state].bgcolor;
if(oObj.summary_in_downtime && oObj.summary_in_downtime === 1)
if(isset(oStates[oObj.summary_state]['downtime_bgcolor']) && oStates[oObj.summary_state]['downtime_bgcolor'] != '')
sColor = oStates[oObj.summary_state]['downtime_bgcolor'];
else
sColor = lightenColor(sColor, 100, 100, 100);
else if(oObj.summary_problem_has_been_acknowledged && oObj.summary_problem_has_been_acknowledged === 1)
if(isset(oStates[oObj.summary_state]['ack_bgcolor']) && oStates[oObj.summary_state]['ack_bgcolor'] != '')
sColor = oStates[oObj.summary_state]['ack_bgcolor'];
else
sColor = lightenColor(sColor, 100, 100, 100);
}
oObj = null;
return sColor;
}
function getFaviconImage(oObj) {
var sFavicon;
if(oObj.summary_in_downtime && oObj.summary_in_downtime === 1)
sFavicon = 'downtime';
else if(oObj.summary_problem_has_been_acknowledged && oObj.summary_problem_has_been_acknowledged === 1)
sFavicon = 'ack';
else if(oObj.summary_state.toLowerCase() == 'unreachable')
sFavicon = 'down';
else
sFavicon = oObj.summary_state.toLowerCase();
oObj = null;
sFavicon = oGeneralProperties.path_images+'internal/favicon_'+sFavicon+'.png';
return sFavicon;
}
function setPageBackgroundColor(sColor) {
eventlog("background", "debug", "Setting backgroundcolor to " + sColor);
eventlog("background", "debug", "Old backgroundcolor: " + document.body.style.backgroundColor);
document.body.style.backgroundColor = sColor;
eventlog("background", "debug", "New backgroundcolor: " + document.body.style.backgroundColor);
}
function setPageFavicon(sFavicon) {
favicon.change(sFavicon);
}
function setPageTitle(sTitle) {
document.title = sTitle;
}
function updateMapBasics() {
var show_filter='';
if (oPageProperties.map_name !== false)
show_filter = '&show=' + escapeUrlValues(oPageProperties.map_name)
oMapSummaryObj = new NagVisMap(getSyncRequest(oGeneralProperties.path_server
+ '?mod=Map&act=getObjectStates&ty=summary'
+ show_filter + getViewParams(), false)[0]);
if(oMapSummaryObj == null || typeof oMapSummaryObj === 'undefined') {
eventlog("worker", "debug", "The oMapSummaryObj is null. Maybe a communication problem with the backend");
return false;
}
setPageFavicon(getFaviconImage(oMapSummaryObj.conf));
setPageTitle(oPageProperties.alias + ' ('
+ oMapSummaryObj.conf.summary_state + ') :: '
+ oGeneralProperties.internal_title);
if(oPageProperties.event_background && oPageProperties.event_background == '1')
setPageBackgroundColor(getBackgroundColor(oMapSummaryObj.conf));
}
function initRepeatedEvents(objectId) {
if(isset(oViewProperties.event_repeat_interval)
&& oViewProperties.event_repeat_interval != 0) {
oMapObjects[objectId].event_time_first = iNow;
oMapObjects[objectId].event_time_last  = iNow;
}
}
function handleRepeatEvents() {
eventlog("worker", "debug", "handleRepeatEvents: Start");
for(var i in oMapObjects) {
if(oMapObjects[i].has_state && oMapObjects[i].event_time_first !== null) {
checkRepeatEvents(i);
}
}
eventlog("worker", "debug", "handleRepeatEvents: End");
}
function checkRepeatEvents(objectId) {
if(!oMapObjects[objectId].hasProblematicState()) {
oMapObjects[objectId].event_time_first = null;
oMapObjects[objectId].event_time_last  = null;
return;
}
if(oViewProperties.event_repeat_duration != -1
&& oMapObjects[objectId].event_time_first
+ oViewProperties.event_repeat_duration < iNow) {
oMapObjects[objectId].event_time_first = null;
oMapObjects[objectId].event_time_last  = null;
return;
}
if(oMapObjects[objectId].event_time_last
+ oViewProperties.event_repeat_interval >= iNow) {
raiseEvents(objectId, false);
oMapObjects[objectId].event_time_last = iNow;
}
}
function raiseEvents(objectId, stateChanged) {
if(oPageProperties.event_highlight === '1') {
if(oMapObjects[objectId].conf.view_type && oMapObjects[objectId].conf.view_type === 'icon') {
setTimeout('flashIcon("'+objectId+'", '+oPageProperties.event_highlight_duration+', '+oPageProperties.event_highlight_interval+')', 0);
} else {
}
}
if(oPageProperties.event_scroll === '1') {
setTimeout('scrollSlow('+oMapObjects[objectId].parsedX()+', '+oMapObjects[objectId].parsedY()+', 1)', 0);
}
if(oMapObjects[objectId].conf.type == 'service') {
if(stateChanged) {
eventlog("state-change", "info", oMapObjects[objectId].conf.type+" "+oMapObjects[objectId].conf.name+" "+oMapObjects[objectId].conf.service_description+": Old: "+oMapObjects[objectId].last_state.summary_state+"/"+oMapObjects[objectId].last_state.summary_problem_has_been_acknowledged+"/"+oMapObjects[objectId].last_state.summary_in_downtime+" New: "+oMapObjects[objectId].conf.summary_state+"/"+oMapObjects[objectId].conf.summary_problem_has_been_acknowledged+"/"+oMapObjects[objectId].conf.summary_in_downtime);
} else {
eventlog("state-log", "info", oMapObjects[objectId].conf.type+" "+oMapObjects[objectId].conf.name+" "+oMapObjects[objectId].conf.service_description+": State: "+oMapObjects[objectId].conf.summary_state+"/"+oMapObjects[objectId].conf.summary_problem_has_been_acknowledged+"/"+oMapObjects[objectId].conf.summary_in_downtime);
}
} else {
if(stateChanged) {
eventlog("state-change", "info", oMapObjects[objectId].conf.type+" "+oMapObjects[objectId].conf.name+": Old: "+oMapObjects[objectId].last_state.summary_state+"/"+oMapObjects[objectId].last_state.summary_problem_has_been_acknowledged+"/"+oMapObjects[objectId].last_state.summary_in_downtime+" New: "+oMapObjects[objectId].conf.summary_state+"/"+oMapObjects[objectId].conf.summary_problem_has_been_acknowledged+"/"+oMapObjects[objectId].conf.summary_in_downtime);
} else {
eventlog("state-log", "info", oMapObjects[objectId].conf.type+" "+oMapObjects[objectId].conf.name+": State: "+oMapObjects[objectId].conf.summary_state+"/"+oMapObjects[objectId].conf.summary_problem_has_been_acknowledged+"/"+oMapObjects[objectId].conf.summary_in_downtime);
}
}
if(oPageProperties.event_sound === '1') {
setTimeout('playSound("'+objectId+'", 1)', 0);
}
}
function updateObjects(aMapObjectInformations, sType) {
var bStateChanged=false;
for(var i=0, len = aMapObjectInformations.length; i < len; i++) {
var objectId=aMapObjectInformations[i].object_id;
if(!isset(oMapObjects[objectId])) {
eventlog("updateObjects", "critical", "Could not find an object with the id "+objectId+" in object array");
return false;
}
oMapObjects[objectId].saveLastState();
for (var strIndex in aMapObjectInformations[i])
if(aMapObjectInformations[i][strIndex] != 'object_id')
oMapObjects[objectId].conf[strIndex] = aMapObjectInformations[i][strIndex];
oMapObjects[objectId].getMembers();
oMapObjects[objectId].setLastUpdate();
if(sType === 'map'
&& !oMapObjects[objectId].stateChanged()
&& oMapObjects[objectId].outputOrPerfdataChanged()) {
oMapObjects[objectId].parse();
}
if(isset(oMapObjects) && oMapObjects[objectId].stateChanged()) {
bStateChanged = true;
oMapObjects[objectId].hover_template_code = null;
if(sType === 'map') {
oMapObjects[objectId].parse();
} else if(sType === 'overview') {
var oOld=oMapObjects[objectId].parsedObject;
oMapObjects[objectId].parsedObject = oMapObjects[objectId].parsedObject.parentNode.insertBefore(oMapObjects[objectId].parseOverview(), oMapObjects[objectId].parsedObject);
oMapObjects[objectId].parsedObject.parentNode.removeChild(oOld);
oOld = null;
}
if(oMapObjects[objectId].stateChangedToWorse()) {
raiseEvents(objectId, true);
initRepeatedEvents(objectId);
}
}
oMapObjects[objectId].parseHoverMenu();
oMapObjects[objectId].parseContextMenu();
}
return bStateChanged;
}
function getMapObjByDomObjId(id) {
try {
return oMapObjects[id];
} catch(er) {
return null;
}
}
function updateNumUnlocked(num) {
iNumUnlocked += num;
if(iNumUnlocked == 0) {
var o=document.getElementById('editIndicator');
if(o) {
o.style.display = 'none';
o = null;
}
gridRemove();
} else {
var o=document.getElementById('editIndicator');
if(o) {
o.style.display = '';
o = null;
}
gridParse();
}
}
function removeMapObject(objectId, msg) {
if(msg != '' && !confirm(msg))
return;
var obj=getMapObjByDomObjId(objectId);
obj.detachChilds();
saveObjectRemove(objectId);
obj.remove();
if(!obj.bIsLocked)
updateNumUnlocked(-1);
obj = null;
delete oMapObjects[objectId];
}
function showAddModifyDialog(mapname, objectId) {
showFrontendDialog(oGeneralProperties.path_server
+ '?mod=Map&act=addModify&show='
+ escapeUrlValues(mapname)
+ '&object_id=' + escapeUrlValues(objectId), 'Modify Object');
}
function showAckDialog(map_name, objectId) {
showFrontendDialog(oGeneralProperties.path_server
+ '?mod=Action&act=acknowledge&map=' + escapeUrlValues(map_name)
+ '&object_id=' + escapeUrlValues(objectId), 'Acknowledge Problem');
}
function refreshMapObject(event, objectId) {
var oObj=getMapObjByDomObjId(objectId);
var name=oObj.conf.name;
var obj_id=oObj.conf.object_id;
var map=oPageProperties.map_name;
oObj = null;
var sMapPart='';
var sMod='';
var sAddPart='';
if(oPageProperties.view_type === 'map') {
sMod = 'Map';
if (map !== false)
sMapPart = '&show='+escapeUrlValues(map);
sAddPart = getViewParams();
} else if(oPageProperties.view_type === 'overview') {
sMod = 'Overview';
sMapPart = '';
}
getAsyncRequest(oGeneralProperties.path_server+'?mod='
+ escapeUrlValues(sMod) + '&act=getObjectStates'
+ sMapPart + '&ty=state&i[]=' + escapeUrlValues(obj_id) + sAddPart, false,
getObjectStatesCallback);
sMod = null;
sMapPart = null;
map = null;
service_description = null;
obj_id = null;
name = null;
var event=!event ? window.event : event;
if(event) {
if(event.stopPropagation)
event.stopPropagation();
event.cancelBubble = true;
}
return false
}
function getObjectStatesCallback(oResponse) {
var bStateChanged=false;
if(isset(oResponse) && oResponse.length > 0)
bStateChanged = updateObjects(oResponse, oPageProperties.view_type);
oResponse = null;
if(oPageProperties.view_type !== 'overview' && bStateChanged)
updateMapBasics();
bStateChanged = null;
}
function setMapBackgroundImage(sImage) {
if(typeof sImage !== 'undefined' && sImage !== 'none' && sImage !== '') {
var oImage=document.getElementById('backgroundImage');
if(!oImage) {
var oImage=document.createElement('img');
oImage.id = 'backgroundImage';
document.getElementById('map').appendChild(oImage);
}
addZoomHandler(oImage, true);
oImage.src = sImage;
oImage = null;
}
}
function setPageBasics(oProperties) {
setPageFavicon(oProperties.favicon_image);
setPageTitle(oProperties.page_title);
if(oPageProperties.event_background && oPageProperties.event_background == '1')
setPageBackgroundColor(getBackgroundColor(oMapSummaryObj.conf));
else
setPageBackgroundColor(oProperties.background_color);
}
function setMapBasics(oProperties) {
oProperties.page_title = oPageProperties.alias
+ ' (' + oMapSummaryObj.conf.summary_state + ') :: '
+ oGeneralProperties.internal_title;
oProperties.favicon_image = getFaviconImage(oMapSummaryObj.conf);
setPageBasics(oProperties);
setMapBackgroundImage(oProperties.background_image);
}
function setMapObjects(aMapObjectConf) {
eventlog("worker", "debug", "setMapObjects: Start setting map objects");
oMapSummaryObj = new NagVisMap(aMapObjectConf[0]);
for(var i=1, len = aMapObjectConf.length; i < len; i++) {
var oObj;
switch (aMapObjectConf[i].type) {
case 'host':
oObj = new NagVisHost(aMapObjectConf[i]);
break;
case 'service':
oObj = new NagVisService(aMapObjectConf[i]);
break;
case 'hostgroup':
oObj = new NagVisHostgroup(aMapObjectConf[i]);
break;
case 'servicegroup':
oObj = new NagVisServicegroup(aMapObjectConf[i]);
break;
case 'dyngroup':
oObj = new NagVisDynGroup(aMapObjectConf[i]);
break;
case 'aggr':
oObj = new NagVisAggr(aMapObjectConf[i]);
break;
case 'map':
oObj = new NagVisMap(aMapObjectConf[i]);
break;
case 'textbox':
oObj = new NagVisTextbox(aMapObjectConf[i]);
break;
case 'container':
oObj = new NagVisContainer(aMapObjectConf[i]);
break;
case 'shape':
oObj = new NagVisShape(aMapObjectConf[i]);
break;
case 'line':
oObj = new NagVisLine(aMapObjectConf[i]);
break;
default:
oObj = null;
alert('Error: Unknown object type');
break;
}
if(!oObj.bIsLocked)
updateNumUnlocked(1);
if(oObj !== null)
oMapObjects[oObj.conf.object_id] = oObj;
oObj = null;
}
for(var i in oMapObjects) {
if(oPageProperties.view_type === 'map') {
oMapObjects[i].parse();
if(isset(oViewProperties.event_on_load) && oViewProperties.event_on_load == 1
&& oMapObjects[i].has_state
&& oMapObjects[i].hasProblematicState()) {
raiseEvents(oMapObjects[i].conf.object_id, false);
initRepeatedEvents(oMapObjects[i].conf.object_id);
}
}
var parents=oMapObjects[i].getParentObjectIds();
if(parents) {
for (var objectId in parents) {
var refObj=getMapObjByDomObjId(objectId);
if(refObj)
refObj.addChild(oMapObjects[i]);
refObj = null;
}
}
parents = null;
}
eventlog("worker", "debug", "setMapObjects: End setting map objects");
}
function reloadObjects(aObjs) {
for(var i=0, len = aObjs.length; i < len; i++) {
oMapObjects[aObjs[i]].parse();
}
}
function playSound(objectId, iNumTimes){
var sSound='';
var id=oMapObjects[objectId].parsedObject.id;
var oObjIcon=document.getElementById(id+'-icon');
var oObjIconDiv=document.getElementById(id+'-icondiv');
var sState=oMapObjects[objectId].conf.summary_state;
if(oStates[sState] && oStates[sState].sound && oStates[sState].sound !== '') {
sSound = oStates[sState].sound;
}
eventlog("state-change", "debug", "Sound to play: "+sSound);
if(sSound !== '') {
if(document.getElementById('sound'+sState)) {
document.body.removeChild(document.getElementById('sound'+sState));
}
var oEmbed=document.createElement('embed');
oEmbed.setAttribute('id', 'sound'+sState);
oEmbed.setAttribute('src', window.location.protocol + '//' + window.location.host + ':'
+ window.location.port + oGeneralProperties.path_sounds+sSound);
oEmbed.setAttribute('width', '0');
oEmbed.setAttribute('height', '0');
oEmbed.setAttribute('hidden', 'true');
oEmbed.setAttribute('loop', 'false');
oEmbed.setAttribute('autostart', 'true');
oEmbed.setAttribute('enablejavascript', 'true');
oEmbed = document.body.appendChild(oEmbed);
oEmbed = null;
iNumTimes = iNumTimes - 1;
if(iNumTimes > 0) {
setTimeout(function() { playSound(objectId, iNumTimes); }, 500);
}
}
oObjIcon = null;
oObjIconDiv = null;
}
function flashIcon(objectId, iDuration, iInterval){
if(isset(oMapObjects[objectId])) {
oMapObjects[objectId].highlight(!oMapObjects[objectId].bIsFlashing);
var iDurationNew=iDuration - iInterval;
if(iDurationNew > 0 || (iDurationNew <= 0 && oMapObjects[objectId].bIsFlashing === true))
setTimeout(function() { flashIcon(objectId, iDurationNew, iInterval); }, iInterval);
}
}
function parseOverviewPage() {
var oContainer=document.getElementById('overview');
var types=[ [ oPageProperties.showmaps,      'overviewMaps',      oPageProperties.lang_mapIndex ],
[ oPageProperties.showrotations, 'overviewRotations', oPageProperties.lang_rotationPools ] ];
for(var i=0; i < types.length; i++) {
if(types[i][0] === 1) {
var h2=document.createElement('h2');
h2.innerHTML = types[i][2];
oContainer.appendChild(h2);
var container=document.createElement('div');
container.setAttribute('id', types[i][1]);
container.className = 'infobox';
oContainer.appendChild(container);
oTable = null;
}
}
oContainer = null;
}
g_rendered_maps = 0;
g_processed_maps = 0;
function addOverviewMap(map_conf, map_name) {
g_processed_maps += 1;
if(map_conf === null || map_conf.length != 1)  {
eventlog("worker", "warning", "addOverviewMap: Invalid call - maybe broken ajax response ("+map_name+")");
if (g_processed_maps == g_map_names.length)
finishOverviewMaps();
return false;
}
g_rendered_maps += 1; // also count errors
var container=document.getElementById('overviewMaps');
var mapdiv=null;
var child=null;
for (var i=0; i < container.childNodes.length; i++) {
child = container.childNodes[i];
if (child.id == map_name) {
mapdiv = child;
break;
}
}
var oObj=new NagVisMap(map_conf[0]);
if(oObj !== null) {
oMapObjects[oObj.conf.object_id] = oObj;
oObj.parsedObject = oObj.parseOverview();
container.replaceChild(oObj.parsedObject, mapdiv);
}
oObj = null;
if (g_processed_maps == g_map_names.length)
finishOverviewMaps();
container = null;
}
function finishOverviewMaps() {
eventlog("worker", "debug", "addOverviewMap: Finished parsing all maps");
getAndParseTemplates();
hideStatusMessage();
}
function parseOverviewRotations(aRotationsConf) {
eventlog("worker", "debug", "setOverviewObjects: Start setting rotations");
if(oPageProperties.showrotations === 1 && aRotationsConf.length > 0) {
for(var i=0, len = aRotationsConf.length; i < len; i++) {
var oObj;
oObj = new NagVisRotation(aRotationsConf[i]);
if(oObj !== null) {
oObj.parseOverview();
}
}
} else {
var container=document.getElementById('overviewRotations');
if (container) {
container.style.display = 'none';
container = null;
}
}
eventlog("worker", "debug", "setOverviewObjects: End setting rotations");
}
function getOverviewProperties(mapName) {
return getSyncRequest(oGeneralProperties.path_server+'?mod=Overview&act=getOverviewProperties')
}
function getOverviewMaps() {
var map_container=document.getElementById('overviewMaps');
if(oPageProperties.showmaps !== 1 || g_map_names.length == 0) {
if (map_container)
map_container.parentNode.style.display = 'none';
hideStatusMessage();
return false;
}
eventlog("worker", "debug", "getOverviewMaps: Start requesting maps...");
for (var i=0, len = g_map_names.length; i < len; i++) {
var mapdiv=document.createElement('div');
mapdiv.setAttribute('id', g_map_names[i])
map_container.appendChild(mapdiv);
mapdiv = null;
getAsyncRequest(oGeneralProperties.path_server+'?mod=Overview&act=getObjectStates'
+ '&i[]=map-' + escapeUrlValues(g_map_names[i]) + getViewParams(),
false, addOverviewMap, g_map_names[i]);
}
}
function getOverviewRotations() {
return getSyncRequest(oGeneralProperties.path_server+'?mod=Overview&act=getOverviewRotations')
}
function set_fill_zoom_factor() {
var obj, zoom;
var c_top=null, c_left = null, c_bottom = null, c_right = null;
var o_top, o_left, o_bottom, o_right;
for(var i in oMapObjects) {
obj = oMapObjects[i];
if (obj && obj.getObjLeft && obj.getObjTop && obj.getObjHeight && obj.getObjWidth) {
o_top = obj.getObjTop();
if (c_top === null || o_top < c_top)
c_top = o_top;
o_left = obj.getObjLeft();
if (c_left === null || o_left < c_left)
c_left = o_left;
o_bottom = o_top + obj.getObjHeight();
if (c_bottom === null || o_bottom > c_bottom)
c_bottom = o_bottom;
o_right = o_left + obj.getObjWidth();
if (c_right === null || o_right > c_right)
c_right = o_right;
}
}
var border=40; // border per side in px * 2
var zoom_y=parseInt((pageHeight() - border - getHeaderHeight()) / parseFloat(c_bottom) * 100);
var zoom_x=parseInt((pageWidth() - border - getSidebarWidth())/ parseFloat(c_right) * 100);
set_zoom(Math.min(zoom_y, zoom_x));
}
function set_zoom(val) {
setViewParam('zoom', val);
if(workerTimeoutID)
window.clearTimeout(workerTimeoutID);
window.location = makeuri({'zoom': val});
}
function zoom(how) {
var cur_zoom=getZoomFactor();
if (cur_zoom == 'fill')
cur_zoom = 100;
var new_zoom=100;
if (how != 0) {
new_zoom = cur_zoom + how;
if (new_zoom <= 0 || new_zoom >= 200)
return;
}
if (cur_zoom != new_zoom) {
set_zoom(new_zoom);
}
}
function wheel_zoom(event) {
if (!event)
event = window.event;
var delta=0;
if (!event.altKey)
return; // only proceed with pressed ALT
if (event.wheelDelta) { // IE/Opera.
delta = event.wheelDelta/120;
} else if (event.detail) { // firefox
delta = -event.detail/3;
}
if (delta > 0) {
zoom(delta * 5);
} else if (delta < 0) {
zoom(delta * 5);
}
if (event.preventDefault)
event.preventDefault();
event.returnValue = false;
}
var g_drag_ind=null;
function zoombarDragStart(event) {
if (!event)
event = window.event;
if ((event.which === null && event.button >= 2) || (event.which !== null && event.which >= 2))
return; // skip clicks with other than left mouse
g_left_clicked = true;
g_drag_ind = document.getElementById('zoombar-drag_ind');
}
function zoombarDrag(event) {
if (!event)
event = window.event;
if (g_drag_ind === null)
return true;
if (!g_left_clicked) {
zoombarDragStop(event);
return;
}
var top_offset=62;
var ind_offset=3; // height / 2
var pos=(event.clientY - top_offset);
if (pos > g_drag_ind.parentNode.clientHeight) {
pos = g_drag_ind.parentNode.clientHeight;
} else if (pos < 0) {
pos = 0;
}
g_drag_ind.style.top = (pos - ind_offset) + 'px';
}
function zoombarDragStop(event) {
if (!event)
event = window.event;
if (g_drag_ind === null)
return true;
if ((event.which === null && event.button >= 2) || (event.which !== null && event.which >= 2))
return; // skip clicks with other than left mouse
g_left_clicked = false;
var zoom=getZoomFactor();
var val=parseInt((100 - (parseInt(g_drag_ind.style.top.replace('px', '')) + 3)) / 100 * 200);
if (val != zoom) {
if (val <= 0)
val = 10;
set_zoom(val);
}
g_drag_ind = null;
if (event.preventDefault)
event.preventDefault();
if (event.stopPropagation)
event.stopPropagation();
event.returnValue = false;
return false;
}
var g_left_clicked=false;
function mouse_click(event) {
if (!event)
event = window.event;
if ((event.which === null && event.button >= 2) || (event.which !== null && event.which >= 2))
return; // skip clicks with other than left mouse
g_left_clicked = true;
}
function mouse_release(event) {
if (!event)
event = window.event;
if ((event.which === null && event.button >= 2) || (event.which !== null && event.which >= 2))
return; // skip clicks with other than left mouse
g_left_clicked = false;
zoombarDragStop(event);
}
function updateZoomIndicator() {
var zoom=getZoomFactor();
var ind=document.getElementById('zoombar-drag_ind');
ind.style.top = (100 - ((zoom / 200 * 100)) - 3) + 'px';
ind = null;
}
function renderZoombar() {
if (getViewParam('zoombar') == 0)
return;
var bar=document.createElement('div');
bar.setAttribute('id', 'zoombar');
var plus=document.createElement('a');
plus.setAttribute('id', 'zoombar-plus');
plus.setAttribute('class', 'plus');
plus.appendChild(document.createTextNode('+'));
plus.onclick = function() {
zoom(10);
};
bar.appendChild(plus);
var drag=document.createElement('div');
drag.setAttribute('id', 'zoombar-drag');
drag.setAttribute('class', 'drag');
bar.appendChild(drag);
var drag_ind=document.createElement('div');
drag_ind.setAttribute('id', 'zoombar-drag_ind');
drag_ind.setAttribute('class', 'drag_ind');
addEvent(drag_ind, 'mousedown', zoombarDragStart);
addEvent(drag,     'mousemove', zoombarDrag);
addEvent(drag,     'mouseup',   zoombarDragStop);
drag.appendChild(drag_ind);
var minus=document.createElement('a');
minus.setAttribute('id', 'zoombar-minus');
minus.setAttribute('class', 'minus');
minus.appendChild(document.createTextNode('-'));
minus.onclick = function() {
zoom(-10);
};
bar.appendChild(minus);
var norm=document.createElement('a');
norm.setAttribute('class', 'norm');
norm.appendChild(document.createTextNode('o'));
norm.onclick = function() {
zoom(0);
};
bar.appendChild(norm);
var wheel_event=(/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
addEvent(document, wheel_event, wheel_zoom);
addEvent(document, 'mousedown', mouse_click);
addEvent(document, 'mouseup',   mouse_release);
document.body.appendChild(bar);
updateZoomIndicator();
}
function getViewParams(update, userParams) {
if(!isset(userParams))
userParams = false;
if(!userParams && isset(oViewProperties) && isset(oViewProperties['params'])) {
var params=oViewProperties['params'];
} else if(isset(oViewProperties) && isset(oViewProperties['user_params'])) {
var params=oViewProperties['user_params'];
} else {
return '';
}
if(!isset(params))
return '';
if(isset(update)) {
for(var param in update) {
params[param] = update[param];
}
}
var sParams='';
for(var param in params) {
if(params[param] != '') {
sParams += '&' + param + '=' + escapeUrlValues(params[param]);
}
}
return sParams;
}
function getViewParam(param) {
if(oViewProperties && isset(oViewProperties['params'])
&& isset(oViewProperties['params'][param]))
return oViewProperties['params'][param];
return null;
}
function setViewParam(param, val) {
oViewProperties['params'][param] = val;
}
function getMapProperties(type, mapName) {
return getSyncRequest(oGeneralProperties.path_server+'?mod=Map&act=getMapProperties&show='
+ escapeUrlValues(mapName)+getViewParams());
}
function getUrlProperties(sUrl) {
return getSyncRequest(oGeneralProperties.path_server+'?mod=Url&act=getProperties&show='
+ escapeUrlValues(sUrl));
}
function usesSource(source) {
return oPageProperties
&& oPageProperties.view_type == 'map'
&& oPageProperties.sources
&& oPageProperties.sources.indexOf(source) !== -1;
}
function parseMap(iMapCfgAge, type, mapName) {
var bReturn=false;
oPageProperties.map_name = mapName;
bBlockUpdates = true;
var wasInMaintenance=inMaintenance(false);
var properties=getMapProperties(type, mapName);
if (properties)
oPageProperties = properties;
oPageProperties.view_type = type;
if(inMaintenance()) {
bBlockUpdates = false;
return false
} else if(wasInMaintenance === true) {
frontendMessageHide();
}
wasInMaintenance = null;
getAsyncRequest(oGeneralProperties.path_server
+ '?mod=Map&act=getMapObjects&show='
+ mapName+getViewParams(), false, parseMapHandler, [iMapCfgAge, type, mapName]);
}
function parseMapHandler(oObjects, params) {
if(!oPageProperties || !oObjects) {
hideStatusMessage();
return;
}
var iMapCfgAge=params[0];
var type=params[1];
var mapName=params[2];
var keys=getKeys(oMapObjects);
for(var i=0, len = keys.length; i < len; i++) {
var obj=oMapObjects[keys[i]];
if(obj && typeof obj.remove === 'function') {
obj.remove();
if(!obj.bIsLocked)
updateNumUnlocked(-1);
obj = null;
delete oMapObjects[keys[i]];
}
}
keys = null;
oFileAges[mapName] = iMapCfgAge;
eventlog("worker", "info", "Parsing "+type+" objects");
setMapObjects(oObjects);
if (getViewParam('zoom') == 'fill')
set_fill_zoom_factor();
setMapBasics(oPageProperties);
getAndParseTemplates();
if(oViewProperties && oViewProperties.search && oViewProperties.search != '') {
eventlog("worker", "info", "Searching for matching object(s)");
searchObjects(oViewProperties.search);
}
oObjects = null;
hideStatusMessage();
bBlockUpdates = false;
}
function parseUrl(sUrl) {
var urlContainer=document.getElementById('url');
if (urlContainer.tagName == 'DIV') {
var oUrlContents=getSyncRequest(oGeneralProperties.path_server
+ '?mod=Url&act=getContents&show='
+ escapeUrlValues(sUrl));
if(typeof oUrlContents !== 'undefined' && oUrlContents.content) {
urlContainer.innerHTML = oUrlContents.content;
}
}
else {
urlContainer.src = sUrl;
}
}
function workerInitialize(iCount, sType, sIdentifier) {
displayStatusMessage('Loading...', 'loading', true);
eventlog("worker", "info", "Initializing Worker (Run-ID: "+iCount+")");
eventlog("worker", "debug", "Loading the state properties");
if(sType == 'map') {
eventlog("worker", "debug", "Parsing " + sType + ": " + sIdentifier);
renderZoombar();
parseMap(oFileAges[sIdentifier], sType, sIdentifier);
} else if(sType === 'overview') {
eventlog("worker", "debug", "Loading the overview properties");
oPageProperties = getOverviewProperties();
oPageProperties.view_type = sType;
eventlog("worker", "debug", "Setting page basiscs like title and favicon");
setPageBasics(oPageProperties);
eventlog("worker", "debug", "Parsing overview page");
parseOverviewPage();
getOverviewMaps();
eventlog("worker", "debug", "Parsing rotations");
parseOverviewRotations(getOverviewRotations());
eventlog("worker", "info", "Finished parsing overview");
} else if(sType === 'url') {
eventlog("worker", "debug", "Loading the url properties");
oPageProperties = getUrlProperties(sIdentifier);
oPageProperties.view_type = sType;
eventlog("worker", "debug", "Parsing url page");
parseUrl(sIdentifier);
hideStatusMessage();
} else {
eventlog("worker", "error", "Unknown view type: "+sType);
hideStatusMessage();
}
}
function getAndParseTemplates() {
eventlog("worker", "debug", "Fetching hover templates and urls");
getHoverTemplates();
getHoverUrls();
eventlog("worker", "debug", "Parse hover menus");
parseHoverMenus();
eventlog("worker", "debug", "Fetching context templates");
getContextTemplates();
eventlog("worker", "debug", "Parse context menus");
parseContextMenus();
}
function handleUpdate(o, aParams) {
var sType=aParams[0];
var bStateChanged=false;
if(bBlockUpdates) {
eventlog("ajax", "info", "Throwing new object information away since the view is blocked");
return false;
}
if (!o) {
eventlog("ajax", "info", "handleUpdate: got empty object. Terminating.");
return false;
}
if(isset(o['status']) && o['status'] == 'CHANGED') {
var oChanged=o['data'];
for(var key in oChanged) {
if(key == 'maincfg') {
eventlog("worker", "info", "Main configuration file was updated. Need to reload the page");
if(workerTimeoutID)
window.clearTimeout(workerTimeoutID);
window.location.reload(true);
return;
} else {
if(iNumUnlocked > 0) {
eventlog("worker", "info", "Map config updated. "+iNumUnlocked+" objects unlocked - not reloading.");
} else {
eventlog("worker", "info", "Map configuration file was updated. Reparsing the map.");
parseMap(oChanged[key], sType, oPageProperties.map_name);
return;
}
}
}
}
if(oLength(oMapObjects) === 0) {
if(sType == 'overview') {
eventlog("worker", "info", "No maps found, reparsing...");
getOverviewMaps();
return;
} else {
eventlog("worker", "info", "Map is empty. Strange. Re-fetching objects");
parseMap(oFileAges[oPageProperties.map_name], sType, oPageProperties.map_name);
return;
}
}
if(o.length > 0)
bStateChanged = updateObjects(o, sType);
if(sType == 'map' && bStateChanged)
updateMapBasics();
o = null;
bStateChanged = null;
}
function getUrlParts(arrObj) {
var aUrlParts=[];
var iUrlParams=0;
for(var i=0, len = arrObj.length; i < len && (oWorkerProperties.worker_request_max_params == 0 || iUrlParams < oWorkerProperties.worker_request_max_params); i++) {
var type=oMapObjects[arrObj[i]].conf.type;
var name=oMapObjects[arrObj[i]].conf.name;
if(name) {
var obj_id=oMapObjects[arrObj[i]].conf.object_id;
var service_description=oMapObjects[arrObj[i]].conf.service_description;
var sUrlPart='&i[]='+obj_id;
iUrlParams += 1;
aUrlParts.push(sUrlPart);
sUrlPart = null;
service_description = null;
obj_id = null;
}
name = null;
type = null;
}
iUrlParams = null;
arrObj = null;
return aUrlParts;
}
function workerUpdate(iCount, sType, sIdentifier) {
eventlog("worker", "debug", "Update (Run-ID: "+iCount+")");
if(sType === 'map' || sType === 'overview') {
var mod='Map';
var show='';
if (sType === 'map' && oPageProperties.map_name !== false)
show = '&show=' + escapeUrlValues(oPageProperties.map_name);
if (sType === 'overview') {
mod = 'Overview';
}
var arrObj=getObjectsToUpdate();
getBulkRequest(oGeneralProperties.path_server+'?mod=' + mod + '&act=getObjectStates'
+ show +'&ty=state'+getViewParams()+getFileAgeParams(),
getUrlParts(arrObj), oWorkerProperties.worker_request_max_length,
false, handleUpdate, [ sType ]);
if(sType === 'map') {
var aReload=[];
for(var i=0, len = arrObj.length; i < len; i++)
if(oMapObjects[arrObj[i]].conf.type === 'shape'
|| oMapObjects[arrObj[i]].conf.type === 'container')
aReload.push(arrObj[i]);
if(aReload.length > 0)
reloadObjects(aReload);
aReload = null;
}
handleRepeatEvents();
} else if(sType === 'url') {
eventlog("worker", "debug", "Reparsing url page");
parseUrl(oPageProperties.url);
}
oWorkerProperties.last_run = iNow;
updateWorkerCounter();
cleanupAjaxQueryCache();
}
function runWorker(iCount, sType, sIdentifier) {
if(iCount === 0) {
workerInitialize(iCount, sType, sIdentifier);
} else {
iNow = Math.floor(Date.parse(new Date()) / 1000);
if(rotationCountdown() === true) {
eventlog("worker", "debug", "Worker stopped: Rotate/Refresh detected");
return false;
}
if(iCount % oWorkerProperties.worker_interval === 0)
workerUpdate(iCount, sType, sIdentifier);
}
workerTimeoutID = window.setTimeout(function() { runWorker((iCount+1), sType, sIdentifier); }, 1000);
return true;
}
function middle(x1, x2, cut) {
return parseInt(x1) + parseInt((x2 - x1) * cut);
}
function max(arr) {
var max=arr[0];
for (var i=1, len = arr.length; i < len; i++) {
if (arr[i] > max) {
max = arr[i];
}
}
return max;
}
function min(arr) {
var min=arr[0];
for (var i=1, len = arr.length; i < len; i++) {
if (arr[i] < min) {
min = arr[i];
}
}
return min;
}
function newX(a, b, x, y) {
return Math.round(Math.cos(Math.atan2(y,x)+Math.atan2(b,a))*Math.sqrt(x*x+y*y));
}
function newY(a, b, x, y) {
return Math.round(Math.sin(Math.atan2(y,x)+Math.atan2(b,a))*Math.sqrt(x*x+y*y));
}
function drawPolygonBasedObject(objectId, num, xCoord, yCoord, z, colorFill, colorBorder) {
var xMin=min(xCoord);
var yMin=min(yCoord);
var xMax=max(xCoord);
var yMax=max(yCoord);
var oCanvas=document.createElement('canvas');
if(oCanvas.getContext) {
oCanvas = document.getElementById(objectId+'-canvas'+num);
if(!oCanvas)
oCanvas = document.createElement('canvas');
oCanvas.setAttribute('id', objectId+'-canvas'+num);
oCanvas.style.position = 'absolute';
oCanvas.style.left = xMin+"px";
oCanvas.style.top = yMin+"px";
oCanvas.width = Math.round(xMax-xMin);
oCanvas.height = Math.round(yMax-yMin);
oCanvas.style.zIndex = z;
var ctx=oCanvas.getContext('2d');
ctx.clearRect(0, 0, oCanvas.width, oCanvas.height);
ctx.fillStyle = colorFill;
ctx.beginPath();
ctx.moveTo(xCoord[0]-xMin, yCoord[0]-yMin);
for(var i=1, len = xCoord.length; i < len; i++) {
ctx.lineTo(xCoord[i]-xMin, yCoord[i]-yMin);
}
ctx.fill();
ctx = null;
if(!isset(oCanvas.parentNode)) {
var oLineContainer=document.getElementById(objectId+'-line');
if(oLineContainer) {
oLineContainer.appendChild(oCanvas);
oLineContainer = null;
}
}
oCanvas = null;
} else {
var oLine=document.getElementById(objectId+'-line');
var oContainer;
if(oLine.hasChildNodes() && oLine.childNodes.length > num - 1) {
oContainer = oLine.childNodes[num - 1];
while(oContainer.hasChildNodes() && oContainer.childNodes.length >= 1)
oContainer.removeChild(oContainer.firstChild);
} else {
oContainer = document.createElement('div');
oLine.appendChild(oContainer);
}
oContainer.setAttribute('class', 'jsline');
oContainer.setAttribute('className', 'jsline');
var oL=new jsGraphics(oContainer);
oL.setColor(colorFill);
oL.fillPolygon(xCoord, yCoord);
oL.paint();
oL         = null;
oContainer = null;
oLine      = null;
}
oCanvas = null;
}
function drawLabel(objectId, num, lineType, lx, ly, z, perfdataA, perfdataB, yOffset) {
var oLinkContainer=document.getElementById(objectId+'-linelink');
labelShift = getLabelShift(perfdataA);
var labelHeight=21;
if(lineType == '13' || lineType == '15') {
if(oLinkContainer)
drawNagVisTextbox(oLinkContainer, objectId+'-link'+num, 'box', '#ffffff', '#000000', (lx-labelShift), parseInt(ly - labelHeight / 2), z, 'auto', 'auto', '<b>' + perfdataA + '</b>');
} else if(lineType == '14') {
drawNagVisTextbox(oLinkContainer, objectId+'-link'+num, 'box', '#ffffff', '#000000', (lx-labelShift), parseInt(ly - labelHeight - yOffset), z, 'auto', 'auto', '<b>' + perfdataA + '</b>');
labelShift = getLabelShift(perfdataB);
drawNagVisTextbox(oLinkContainer, objectId+'-link'+(num+1), 'box', '#ffffff', '#000000', (lx-labelShift), parseInt(ly + yOffset), z, 'auto', 'auto', '<b>' + perfdataB + '</b>');
}
oLinkContainer = null;
}
function drawLinkArea(objectId, num, lx, ly, z) {
var oLinkContainer=document.getElementById(objectId+'-linelink');
if(!oLinkContainer)
return;
var oImg=document.getElementById(objectId+'-link'+num);
if(!oImg)
oImg = document.createElement('img');
oImg.setAttribute('id', objectId+'-link'+num);
oImg.src = oGeneralProperties.path_iconsets+'20x20.gif';
oImg.style.position = 'absolute';
oImg.style.left = (lx-10)+"px";
oImg.style.top = (ly-10)+"px";
oImg.style.width = addZoomFactor(20) + 'px';
oImg.style.height = addZoomFactor(20) + 'px';
oImg.style.zIndex = parseInt(z)+1;
oLinkContainer.appendChild(oImg);
oImg = null;
oLinkContainer = null;
}
function getLabelShift(str) {
if(str && str.length > 0)
return (str.length / 2) * 9;
else
return 10
}
function drawArrow(objectId, num, x1, y1, x2, y2, z, w, colorFill, colorBorder) {
var xCoord=[];
var yCoord=[];
xCoord[0] = x1 + newX(x2-x1, y2-y1, 0, w);
xCoord[1] = x2 + newX(x2-x1, y2-y1, -4*w, w);
xCoord[2] = x2 + newX(x2-x1, y2-y1, -4*w, 2*w);
xCoord[3] = x2;
xCoord[4] = x2 + newX(x2-x1, y2-y1, -4*w, -2*w);
xCoord[5] = x2 + newX(x2-x1, y2-y1, -4*w, -w);
xCoord[6] = x1 + newX(x2-x1, y2-y1, 0, -w);
yCoord[0] = y1 + newY(x2-x1, y2-y1, 0, w);
yCoord[1] = y2 + newY(x2-x1, y2-y1, -4*w, w);
yCoord[2] = y2 + newY(x2-x1, y2-y1, -4*w, 2*w);
yCoord[3] = y2;
yCoord[4] = y2 + newY(x2-x1, y2-y1, -4*w, -2*w);
yCoord[5] = y2 + newY(x2-x1, y2-y1, -4*w, -w);
yCoord[6] = y1 + newY(x2-x1, y2-y1, 0, -w);
drawPolygonBasedObject(objectId, num, xCoord, yCoord, z, colorFill, colorBorder);
yCoord = null;
xCoord = null;
}
function drawSimpleLine(objectId, num, x1, y1, x2, y2, z, w, colorFill, colorBorder) {
var xCoord=[];
var yCoord=[];
xCoord[0] = x1 + newX(x2-x1, y2-y1, 0, w);
xCoord[1] = x2 + newX(x2-x1, y2-y1, w, w);
xCoord[2] = x2 + newX(x2-x1, y2-y1, w, -w);
xCoord[3] = x1 + newX(x2-x1, y2-y1, 0, -w);
yCoord[0] = y1 + newY(x2-x1, y2-y1, 0, w);
yCoord[1] = y2 + newY(x2-x1, y2-y1, w, w);
yCoord[2] = y2 + newY(x2-x1, y2-y1, w, -w);
yCoord[3] = y1 + newY(x2-x1, y2-y1, 0, -w);
drawPolygonBasedObject(objectId, num, xCoord, yCoord, z, colorFill, colorBorder);
yCoord = null;
xCoord = null;
}
function drawNagVisLine(objectId, lineType, lineCoords, z, width, colorFill, colorFill2, perfdata, colorBorder, bLinkArea, bLabelShow, yOffset) {
var x=lineCoords[0];
var y=lineCoords[1];
var cuts=lineCoords[2];
for(var i=0; i < x.length; i++) {
x[i] = parseInt(x[i], 10);
y[i] = parseInt(y[i], 10);
}
var xStart=x[0];
var yStart=y[0];
var xEnd=x[x.length - 1];
var yEnd=y[y.length - 1];
if(perfdata == null)
perfdata = [];
width = parseInt(width, 10);
var perfdataA="N/A";
var perfdataB="N/A";
var cut=cuts[0];
var cutIn=cuts[1];
var cutOut=cuts[2];
switch (lineType) {
case '10':
if(x.length == 2) {
var xMid=middle(xStart, xEnd, cut);
var yMid=middle(yStart, yEnd, cut);
} else {
var xMid=x[1];
var yMid=y[1];
}
drawArrow(objectId, 1, xStart, yStart, xMid, yMid, z, width, colorFill, colorBorder);
drawLinkOrLabel(objectId, 1, lineType, xMid, yMid, z, perfdataA, perfdataB, bLinkArea, bLabelShow);
drawArrow(objectId, 2, xEnd, yEnd, xMid, yMid, z, width, colorFill, colorBorder);
drawLinkOrLabel(objectId, 2, lineType, xMid, yMid, z, perfdataA, perfdataB, bLinkArea, bLabelShow);
break;
case '11':
var xMid=middle(xStart, xEnd, cut);
var yMid=middle(yStart, yEnd, cut);
drawArrow(objectId, 1, xStart, yStart, xEnd, yEnd, z, width, colorFill, colorBorder);
drawLinkOrLabel(objectId, 1, lineType, xMid, yMid, z, perfdataA, perfdataB, bLinkArea, bLabelShow);
break;
case '12':
var xMid=middle(xStart, xEnd, cut);
var yMid=middle(yStart, yEnd, cut);
drawSimpleLine(objectId, 1, xStart, yStart, xEnd, yEnd, z, width, colorFill, colorBorder);
drawLinkOrLabel(objectId, 1, lineType, xMid, yMid, z, perfdataA, perfdataB, bLinkArea, bLabelShow);
break;
case '13':
if(x.length == 2) {
var xMid=middle(xStart, xEnd, cut);
var yMid=middle(yStart, yEnd, cut);
} else {
var xMid=x[1];
var yMid=y[1];
}
if(isset(perfdata[0]) && isset(perfdata[0][1]) && isset(perfdata[0][2]))
perfdataA = perfdata[0][1] + perfdata[0][2];
drawArrow(objectId, 1, xStart, yStart, xMid, yMid, z, width, colorFill, colorBorder);
drawLinkOrLabel(objectId, 1, lineType, middle(xStart, xMid, cutIn), middle(yStart, yMid, cutIn), z, perfdataA, perfdataB, bLinkArea, bLabelShow);
if(isset(perfdata[1]) && isset(perfdata[1][1]) && isset(perfdata[1][2]))
perfdataA = perfdata[1][1] + perfdata[1][2];
drawArrow(objectId, 2, xEnd, yEnd, xMid, yMid, z, width, colorFill2, colorBorder);
drawLinkOrLabel(objectId, 2, lineType, middle(xEnd, xMid, cutOut), middle(yEnd, yMid, cutOut), z, perfdataA, perfdataB, bLinkArea, bLabelShow);
break;
case '14':
if(x.length == 2) {
var xMid=middle(xStart, xEnd, cut);
var yMid=middle(yStart, yEnd, cut);
} else {
var xMid=x[1];
var yMid=y[1];
}
yOffset = yOffset + width;
if(isset(perfdata[0]) && isset(perfdata[0][1]) && isset(perfdata[0][2]))
perfdataA = perfdata[0][1] + perfdata[0][2];
if(isset(perfdata[2]) && isset(perfdata[2][1]) && isset(perfdata[2][2]))
perfdataB = perfdata[2][1] + perfdata[2][2];
drawArrow(objectId, 1, xStart, yStart, xMid, yMid, z, width, colorFill, colorBorder);
drawLinkOrLabel(objectId, 1, lineType, middle(xStart, xMid, cutOut), middle(yStart, yMid, cutOut), z, perfdataA, perfdataB, bLinkArea, bLabelShow, yOffset);
if(isset(perfdata[1]) && isset(perfdata[1][1]) && isset(perfdata[1][2]))
perfdataA = perfdata[1][1] + perfdata[1][2];
if(isset(perfdata[3]) && isset(perfdata[3][1]) && isset(perfdata[3][2]))
perfdataB = perfdata[3][1] + perfdata[3][2];
drawArrow(objectId, 3, xEnd, yEnd, xMid, yMid, z, width, colorFill2, colorBorder);
drawLinkOrLabel(objectId, 3, lineType, middle(xEnd, xMid, cutIn), middle(yEnd, yMid, cutIn), z, perfdataA, perfdataB, bLinkArea, bLabelShow, yOffset);
break;
case '15':
if(x.length == 2) {
var xMid=middle(xStart, xEnd, cut);
var yMid=middle(yStart, yEnd, cut);
} else {
var xMid=x[1];
var yMid=y[1];
}
yOffset = yOffset + width;
if(isset(perfdata[2]) && isset(perfdata[2][1]) && isset(perfdata[2][2]))
perfdataA = perfdata[2][1] + perfdata[2][2];
drawArrow(objectId, 1, xStart, yStart, xMid, yMid, z, width, colorFill, colorBorder);
drawLinkOrLabel(objectId, 1, lineType, middle(xStart, xMid, cutOut), middle(yStart, yMid, cutOut), z, perfdataA, perfdataB, bLinkArea, bLabelShow, yOffset);
if(isset(perfdata[3]) && isset(perfdata[3][1]) && isset(perfdata[3][2]))
perfdataA = perfdata[3][1] + perfdata[3][2];
drawArrow(objectId, 3, xEnd, yEnd, xMid, yMid, z, width, colorFill2, colorBorder);
drawLinkOrLabel(objectId, 3, lineType, middle(xEnd, xMid, cutIn), middle(yEnd, yMid, cutIn), z, perfdataA, perfdataB, bLinkArea, bLabelShow, yOffset);
break;
default:
alert('Error: Unknown line type');
}
}
function drawLinkOrLabel(objectId, num, lineType, x, y, z, perfdataA, perfdataB, bLinkArea, bLabelShow, yOffset) {
if(bLabelShow && (lineType == 13 || lineType == 14 || lineType == 15))
drawLabel(objectId, num, lineType, x, y, z, perfdataA, perfdataB, yOffset);
else
drawLinkArea(objectId, num, x, y, z);
}
function splicePerfdata(nagiosPerfdata) {
var oMsg={};
var setMatches=[];
if(!nagiosPerfdata || nagiosPerfdata == '')
return 'empty';
else {
nagiosPerfdata = nagiosPerfdata.replace('/\s*=\s*/', '=');
var re=/([^=]+)=([\d\.\-]+)([\w%]*);?([\d\.\-:~@]+)?;?([\d\.\-:~@]+)?;?([\d\.\-]+)?;?([\d\.\-]+)?\s*/g;
var perfdataMatches=nagiosPerfdata.match(re);
if(perfdataMatches == null)
frontendMessage({'type': 'WARNING', 'title': 'Data error', 'message': 'No performance data found in perfdata string - lines.js (271)'});
else {
for (var i=0; i < perfdataMatches.length; i++) {
var tmpMatches=perfdataMatches[i];
var tmpSetMatches=[];
tmpSetMatches = tmpMatches.match(/(&#145;)?([\w\s\=\']*)(&#145;)?\=([\d\.\-\+]*)([\w%]*)[\;|\s]?([\d\.\-:~@]+)*[\;|\s]?([\d\.\-:~@]+)*[\;|\s]?([\d\.\-\+]*)[\;|\s]?([\d\.\-\+]*)/);
if(tmpSetMatches !== null) {
setMatches[i] = new Array(7);
setMatches[i][0] = tmpSetMatches[2];
setMatches[i][1] = tmpSetMatches[4];
setMatches[i][2] = tmpSetMatches[5];
setMatches[i][3] = tmpSetMatches[6];
setMatches[i][4] = tmpSetMatches[7];
setMatches[i][5] = tmpSetMatches[8];
setMatches[i][6] = tmpSetMatches[9];
} else
frontendMessage({'type': 'WARNING', 'title': 'Data error', 'message': 'No valid performance data in perfdata string - lines.js (305)'});
}
return setMatches;
}
}
}
var NagVisObject=Base.extend({
parsedObject:          null,
hover_template_code:   null,
context_template_code: null,
conf:                  null,
contextMenu:           null,
lastUpdate:            null,
firstUpdate:           null,
bIsFlashing:           false,
bIsLocked:             true,
objControls:           null,
childs:                null,
hoverX:                null,
hoverY:                null,
constructor: function(oConf) {
this.setLastUpdate();
this.childs      = [];
this.objControls = [];
this.conf        = oConf;
if(this.conf.object_id == null)
this.conf.object_id = getRandomLowerCaseLetter() + getRandom(1, 99999);
this.loadLocked();
this.loadViewOpts();
},
loadLocked: function() {
if(oPageProperties.view_type != 'map')
return;
if(!oUserProperties.hasOwnProperty('unlocked-' + oPageProperties.map_name))
return;
if(oViewProperties.hasOwnProperty('edit_mode') && oViewProperties['edit_mode'] === true) {
this.bIsLocked = false;
return;
}
var unlocked=oUserProperties['unlocked-' + oPageProperties.map_name].split(',');
this.bIsLocked = unlocked.indexOf(this.conf.object_id) === -1 && unlocked.indexOf('*') === -1;
unlocked = null;
},
loadViewOpts: function() {
if(this.conf.type == 'line')
return;
if(isset(oViewProperties) && isset(oViewProperties.hover_menu))
this.conf.hover_menu = oViewProperties.hover_menu;
if(isset(oViewProperties) && isset(oViewProperties.context_menu))
this.conf.context_menu = oViewProperties.context_menu;
},
setLastUpdate: function() {
this.lastUpdate = iNow;
if(this.firstUpdate === null)
this.firstUpdate = this.lastUpdate;
},
getContextMenu: function (sObjId) {
this.getContextTemplateCode();
this.replaceContextTemplateMacros();
var doc=document;
var oObj=doc.getElementById(sObjId);
var oContainer=doc.getElementById(this.conf.object_id);
if(oObj == null) {
eventlog("NagVisObject", "critical", "Could not get context menu object (ID:"+sObjId+")");
return false;
}
if(oContainer == null) {
eventlog("NagVisObject", "critical", "Could not get context menu container (ID:"+this.conf.object_id+")");
oObj = null;
return false;
}
var contextMenu=doc.getElementById(this.conf.object_id+'-context');
var justAdded=false;
if(!contextMenu) {
var contextMenu=doc.createElement('div');
contextMenu.setAttribute('id', this.conf.object_id+'-context');
contextMenu.setAttribute('class', 'context');
contextMenu.setAttribute('className', 'context');
contextMenu.style.zIndex = '1000';
contextMenu.style.display = 'none';
contextMenu.style.position = 'absolute';
contextMenu.style.overflow = 'visible';
justAdded = true;
}
contextMenu.innerHTML = this.context_template_code;
if(justAdded) {
oContainer.appendChild(contextMenu);
oObj.onmousedown = contextMouseDown;
oObj.oncontextmenu = contextShow;
}
contextMenu = null;
oContainer = null;
oObj = null;
doc = null;
},
parseContextMenu: function () {
if(this.needsContextMenu()) {
if(this.conf.view_type && this.conf.view_type == 'line') {
this.getContextMenu(this.conf.object_id+'-linelink');
} else if(this.conf.type == 'textbox' || this.conf.type == 'container') {
this.getContextMenu(this.conf.object_id);
} else {
this.getContextMenu(this.conf.object_id+'-icon');
}
}
},
replaceContextTemplateMacros: function() {
var oSectionMacros={};
if(!this.context_template_code || this.context_template_code === '') {
return false;
}
var oMacros={
'obj_id':      this.conf.object_id,
'type':        this.conf.type,
'name':        this.conf.name,
'alias':       this.conf.alias,
'address':     this.conf.address,
'html_cgi':    this.conf.htmlcgi,
'backend_id':  this.conf.backend_id,
'custom_1':    this.conf.custom_1,
'custom_2':    this.conf.custom_2,
'custom_3':    this.conf.custom_3
};
if(typeof(oPageProperties) != 'undefined' && oPageProperties != null
&& oPageProperties.view_type === 'map')
oMacros.map_name = oPageProperties.map_name;
if(this.conf.type === 'service') {
oMacros.service_description = escapeUrlValues(this.conf.service_description);
oMacros.pnp_hostname = this.conf.name.replace(/\s/g,'%20');
oMacros.pnp_service_description = this.conf.service_description.replace(/\s/g,'%20');
} else
oSectionMacros.service = '<!--\\sBEGIN\\sservice\\s-->.+?<!--\\sEND\\sservice\\s-->';
if(this.conf.type === 'host')
oMacros.pnp_hostname = this.conf.name.replace(/\s/g,'%20');
else
oSectionMacros.host = '<!--\\sBEGIN\\shost\\s-->.+?<!--\\sEND\\shost\\s-->';
if(this.conf.type !== 'host' && this.conf.type !== 'shape')
oSectionMacros.host_or_shape = '<!--\\sBEGIN\\shost_or_shape\\s-->.+?<!--\\sEND\\shost_or_shape\\s-->';
if(this.conf.type === 'line' || this.conf.type == 'shape'
|| this.conf.type == 'textbox' || this.conf.type === 'container')
oSectionMacros.stateful = '<!--\\sBEGIN\\sstateful\\s-->.+?<!--\\sEND\\sstateful\\s-->';
if(this.bIsLocked)
oSectionMacros.unlocked = '<!--\\sBEGIN\\sunlocked\\s-->.+?<!--\\sEND\\sunlocked\\s-->';
else
oSectionMacros.locked = '<!--\\sBEGIN\\slocked\\s-->.+?<!--\\sEND\\slocked\\s-->';
if(!oViewProperties || !oViewProperties.permitted_edit)
oSectionMacros.permitted_edit = '<!--\\sBEGIN\\spermitted_edit\\s-->.+?<!--\\sEND\\spermitted_edit\\s-->';
if(!oViewProperties || !oViewProperties.permitted_perform)
oSectionMacros.permitted_perform = '<!--\\sBEGIN\\spermitted_perform\\s-->.+?<!--\\sEND\\spermitted_perform\\s-->';
if(usesSource('automap')) {
oSectionMacros.not_automap = '<!--\\sBEGIN\\snot_automap\\s-->.+?<!--\\sEND\\snot_automap\\s-->';
if(this.conf.name === getUrlParam('root'))
oSectionMacros.automap_not_root = '<!--\\sBEGIN\\sautomap_not_root\\s-->.+?<!--\\sEND\\sautomap_not_root\\s-->';
} else {
oSectionMacros.automap_not_root = '<!--\\sBEGIN\\sautomap_not_root\\s-->.+?<!--\\sEND\\sautomap_not_root\\s-->';
oSectionMacros.automap = '<!--\\sBEGIN\\sautomap\\s-->.+?<!--\\sEND\\sautomap\\s-->';
}
if(this.conf.view_type !== 'line')
oSectionMacros.line = '<!--\\sBEGIN\\sline\\s-->.+?<!--\\sEND\\sline\\s-->';
if(this.conf.view_type !== 'line'
|| (this.conf.line_type == 11 || this.conf.line_type == 12))
oSectionMacros.line_type = '<!--\\sBEGIN\\sline_two_parts\\s-->.+?<!--\\sEND\\sline_two_parts\\s-->';
if(this.conf.type !== 'hostgroup')
oSectionMacros.hostgroup = '<!--\\sBEGIN\\shostgroup\\s-->.+?<!--\\sEND\\shostgroup\\s-->';
if(this.conf.type !== 'servicegroup' && !(this.conf.type === 'dyngroup' && this.conf.object_types == 'service'))
oSectionMacros.servicegroup = '<!--\\sBEGIN\\sservicegroup\\s-->.+?<!--\\sEND\\sservicegroup\\s-->';
if(this.conf.type !== 'map')
oSectionMacros.map = '<!--\\sBEGIN\\smap\\s-->.+?<!--\\sEND\\smap\\s-->';
for (var key in oGeneralProperties.actions) {
if(key == "indexOf")
continue; // skip indexOf prototype (seems to be looped in IE)
var action=oGeneralProperties.actions[key];
var hide=false;
hide = action.obj_type.indexOf(this.conf.type) == -1;
if(!hide && isset(action.client_os) && action.client_os.length > 0) {
var os=navigator.platform.toLowerCase();
if (os.indexOf('win') !== -1)
os = 'win';
else if (os.indexOf('linux') !== -1)
os = 'lnx';
else if (os.indexOf('mac') !== -1)
os = 'mac';
hide = action.client_os.indexOf(os) == -1;
}
if(!hide && isset(action.condition) && action.condition !== '') {
var cond=action.condition;
var op='';
if (cond.indexOf('~') != -1) {
op = '~';
} else if (cond.indexOf('=') != -1) {
op = '=';
}
var parts=cond.split(op);
var attr=parts[0];
var val=parts[1];
var to_be_checked;
if (isset(this.conf.custom_variables) && isset(this.conf.custom_variables[attr])) {
to_be_checked = this.conf.custom_variables[attr];
} else if(isset(this.conf[attr])) {
to_be_checked = this.conf[attr];
}
if (to_be_checked) {
if (op == '=' && to_be_checked != val) {
hide = true;
} else if (op == '~' && to_be_checked.indexOf(val) == -1) {
hide = true;
}
} else {
hide = true;
}
}
if(!hide) {
oSectionMacros['action_'+key] = '<!--\\s(BEGIN|END)\\saction_'+key+'\\s-->';
}
cond = null;
action = null;
}
oSectionMacros['actions'] = '<!--\\sBEGIN\\saction_.+?\\s-->.+?<!--\\sEND\\saction_.+?\\s-->';
for (var key in oSectionMacros) {
var regex=getRegEx('section-'+key, oSectionMacros[key], 'gm');
this.context_template_code = this.context_template_code.replace(regex, '');
regex = null;
}
oSectionMacros = null;
this.context_template_code = this.context_template_code.replace(/\[(\w*)\]/g,
function(){ return oMacros[ arguments[1] ] || '';});
oMacros = null;
},
getContextTemplateCode: function() {
this.context_template_code = oContextTemplates[this.conf.context_template];
},
menuOpened: function(ty) {
var menu=document.getElementById(this.conf.object_id + '-' + ty);
if(menu) {
if(menu.style.display !== 'none') {
return true;
}
menu = null;
}
return false;
},
getHoverMenu: function (sObjId) {
if(!this.conf.hover_menu || this.conf.hover_menu != '1')
return;
var objId=this.conf.object_id;
var sTemplateCode='';
var iHoverDelay=this.conf.hover_delay;
if(this.conf.hover_url && this.conf.hover_url !== '') {
this.getHoverUrlCode();
sTemplateCode = this.hover_template_code;
} else {
if(this.hover_template_code === null)
this.getHoverTemplateCode();
if(isset(this.conf.hover_template))
sTemplateCode = replaceHoverTemplateDynamicMacros(this);
}
var doc=document;
var oObj=doc.getElementById(sObjId);
var oContainer=doc.getElementById(this.conf.object_id);
if(oObj == null) {
eventlog("NagVisObject", "critical", "Could not get hover menu object (ID:"+sObjId+")");
return false;
}
if(oContainer == null) {
eventlog("NagVisObject", "critical", "Could not get hover menu container (ID:"+this.conf.object_id+")");
oObj = null;
return false;
}
var hoverMenu=doc.getElementById(this.conf.object_id+'-hover');
var justCreated=false;
if(!hoverMenu) {
var hoverMenu=doc.createElement('div');
hoverMenu.setAttribute('id', this.conf.object_id+'-hover');
hoverMenu.setAttribute('class', 'hover');
hoverMenu.setAttribute('className', 'hover');
hoverMenu.style.zIndex = '1000';
hoverMenu.style.display = 'none';
hoverMenu.style.position = 'absolute';
hoverMenu.style.overflow = 'visible';
justCreated = true;
}
hoverMenu.innerHTML = sTemplateCode;
sTemplateCode = null;
if(justCreated) {
oContainer.appendChild(hoverMenu);
if(oObj) {
oObj.onmousemove = function(event) {
if(!isset(event))
event = window.event;
var id=objId;
var iH=iHoverDelay;
displayHoverMenu(event, id, iH);
id = null; iH = null; event = null;
};
oObj.onmouseout = function(e) { var id=objId; hoverHide(id); id = null; };
}
if(typeof(this.toggleObjectActions) == 'function')
this.toggleObjectActions(this.bIsLocked);
}
justCreated = null;
hoverMenu = null;
oContainer = null;
oObj = null;
doc = null;
},
getHoverUrlCode: function() {
this.hover_template_code = oHoverUrls[this.conf.hover_url];
if(this.hover_template_code === null)
this.hover_template_code = '';
},
getHoverTemplateCode: function() {
if(isset(this.conf.hover_template))
this.hover_template_code = replaceHoverTemplateStaticMacros(this, oHoverTemplates[this.conf.hover_template]);
},
toggleLock: function(lock) {
var equal=false;
if(isset(lock) && lock === this.bIsLocked)
equal = true;
if(isset(lock))
this.bIsLocked = lock;
else
this.bIsLocked = !this.bIsLocked;
if(this.conf.view_type === 'line' || this.conf.type === 'line')
this.parseLineHoverArea(document.getElementById(this.conf.object_id+'-linediv'));
this.parseContextMenu();
if(this.toggleObjControls()) {
if(typeof(this.toggleLabelLock) == 'function')
this.toggleLabelLock();
if(typeof(this.toggleObjectActions) == 'function')
this.toggleObjectActions(this.bIsLocked);
if(!isset(lock) && (!oViewProperties.hasOwnProperty('edit_mode') || oViewProperties['edit_mode'] !== true)) {
var unlocked=[];
if(oUserProperties.hasOwnProperty('unlocked-' + oPageProperties.map_name))
unlocked = oUserProperties['unlocked-' + oPageProperties.map_name].split(',');
if(this.bIsLocked)
unlocked.splice(unlocked.indexOf(this.conf.object_id), 1);
else
unlocked.push(this.conf.object_id);
storeUserOption('unlocked-' + oPageProperties.map_name, unlocked.join(','));
unlocked = null;
}
if(equal === true)
return 0;
else
return this.bIsLocked ? -1 : 1;
} else {
return 0;
}
},
toggleObjControls: function() {
if(!this.bIsLocked) {
if(isset(this.parseControls)) {
this.parseControls();
return true;
}
} else {
if(isset(this.removeControls)) {
this.removeControls();
return true;
}
}
return false;
},
getObjLeft: function () {
if (this.conf.x.toString().split(',').length > 1) {
return Math.min.apply(Math, this.parseCoords(this.conf.x, 'x'));
} else {
return this.parseCoord(this.conf.x, 'x');
}
},
getObjTop: function () {
if (this.conf.x.toString().split(',').length > 1) {
return Math.min.apply(Math, this.parseCoords(this.conf.y, 'y'));
} else {
return this.parseCoord(this.conf.y, 'y');
}
},
getObjWidth: function () {
var o=document.getElementById(this.conf.object_id + '-icondiv');
if(o && o.clientWidth)
return parseInt(o.clientWidth);
else
return 0;
},
getObjHeight: function () {
var o=document.getElementById(this.conf.object_id + '-icondiv');
if(o && o.clientHeight)
return parseInt(o.clientHeight);
else
return 0;
},
parseCoord: function(val, dir, addZoom) {
if (addZoom === undefined)
addZoom = true;
var coord=0;
if(!isRelativeCoord(val)) {
coord = parseInt(val);
} else {
if(val.search('%') !== -1) {
var parts=val.split('%');
var objectId=parts[0];
var offset=parts[1];
var refObj=getMapObjByDomObjId(objectId);
if (refObj) {
coord = parseFloat(refObj.parseCoord(refObj.conf[dir], dir, false));
if (addZoom)
coord = addZoomFactor(coord, true);
if (addZoom)
coord += addZoomFactor(parseFloat(offset), false);
else
coord += parseFloat(offset);
return coord;
}
} else {
var refObj=getMapObjByDomObjId(val);
if(refObj)
coord = parseInt(refObj.parseCoord(refObj.conf[dir], dir));
}
}
if (addZoom)
return addZoomFactor(coord, true);
else
return coord;
},
parseCoords: function(val, dir, addZoom) {
var l=[];
if(val)
l = val.toString().split(',');
for(var i=0, len = l.length; i < len; i++)
l[i] = this.parseCoord(l[i], dir, addZoom);
return l;
},
makeAbsoluteCoords: function(num) {
var x=num === -1 ? this.conf.x : this.conf.x.split(',')[num];
var y=num === -1 ? this.conf.y : this.conf.y.split(',')[num];
if(!isRelativeCoord(x) && !isRelativeCoord(y))
return;
var xParent=this.getCoordParent(this.conf.x, num);
var yParent=this.getCoordParent(this.conf.y, num);
if(xParent == yParent) {
var o=getMapObjByDomObjId(xParent);
if(o && getKeys(this.getRelativeCoordsUsingParent(xParent)).length == 1) {
o.delChild(this);
o = null
}
} else {
var o=getMapObjByDomObjId(xParent);
if(o && getKeys(this.getRelativeCoordsUsingParent(xParent)).length == 1) {
o.delChild(this);
o = null
}
var o=getMapObjByDomObjId(yParent);
if(o && getKeys(this.getRelativeCoordsUsingParent(yParent)).length == 1) {
o.delChild(this);
o = null
}
}
xParent = null;
yParent = null;
if(num === -1) {
this.conf.x = this.parseCoord(x, 'x', false);
this.conf.y = this.parseCoord(y, 'y', false);
} else {
var old=this.conf.x.split(',');
old[num] = this.parseCoord(x, 'x', false);
this.conf.x = old.join(',');
old  = this.conf.y.split(',');
old[num] = this.parseCoord(y, 'y', false);
this.conf.y = old.join(',');
old = null;
}
},
makeRelativeCoords: function(oParent, num) {
var xParent=this.getCoordParent(this.conf.x, num);
var yParent=this.getCoordParent(this.conf.y, num);
var x=num === -1 ? this.conf.x : this.conf.x.split(',')[num];
var y=num === -1 ? this.conf.y : this.conf.y.split(',')[num];
if(isRelativeCoord(x) && isRelativeCoord(y)) {
if(xParent == oParent.conf.object_id
&& yParent == oParent.conf.object_id)
return;
if(xParent != oParent.conf.object_id) {
var o=getMapObjByDomObjId(xParent);
if(o) {
o.delChild(this);
o = null;
}
}
if(yParent != oParent.conf.object_id) {
var o=getMapObjByDomObjId(yParent);
if(o) {
o.delChild(this);
o = null;
}
}
}
oParent.addChild(this);
if(num === -1) {
this.conf.x = this.getRelCoords(oParent, this.parseCoord(this.conf.x, 'x', false), 'x', -1);
this.conf.y = this.getRelCoords(oParent, this.parseCoord(this.conf.y, 'y', false), 'y', -1);
} else {
var newX=this.getRelCoords(oParent, this.parseCoords(this.conf.x, 'x', false)[num], 'x', -1);
var newY=this.getRelCoords(oParent, this.parseCoords(this.conf.y, 'y', false)[num], 'y', -1);
var old=this.conf.x.split(',');
old[num] = newX;
this.conf.x = old.join(',');
old  = this.conf.y.split(',');
old[num] = newY;
this.conf.y = old.join(',');
}
},
getCoordParent: function(val, num) {
var coord=num === -1 ? val.toString() : val.split(',')[num].toString();
return coord.search('%') !== -1 ? coord.split('%')[0] : coord;
},
getRelCoords: function(refObj, val, dir, num) {
var refPos=num === -1 ? refObj.conf[dir] : refObj.conf[dir].split(',')[num];
var offset=parseInt(val) - parseInt(refObj.parseCoord(refPos, dir, false));
var pre=offset >= 0 ? '+' : '';
val        = refObj.conf.object_id + '%' + pre + offset;
refObj     = null;
return val;
},
calcNewCoord: function(val, dir, num) {
if(!isset(num))
var num=-1;
var oldVal=num === -1 ? this.conf[dir] : this.conf[dir].split(',')[num];
if(isset(oldVal) && isRelativeCoord(oldVal)) {
var objectId=null;
if(oldVal.search('%') !== -1)
objectId = oldVal.split('%')[0];
else
objectId = oldVal;
var refObj=getMapObjByDomObjId(objectId);
if(refObj)
val = this.getRelCoords(refObj, val, dir, -1);
objectId = null;
} else if(num === -1) {
val = Math.round(val);
}
oldVal = null;
if(num === -1) {
return val;
} else {
var old=this.conf[dir].split(',');
if(isRelativeCoord(val))
old[num] = val;
else
old[num] = Math.round(val);
return old.join(',');
}
},
getParentObjectIds: function(num) {
var parentIds={};
if(isset(num))
var coords=(this.conf['x'].split(',')[num] + ',' + this.conf['y'].split(',')[num]).split(',');
else
var coords=(this.conf.x + ',' + this.conf.y).split(',');
for(var i=0, len = coords.length; i < len; i++)
if(isRelativeCoord(coords[i]))
if(coords[i].search('%') !== -1)
parentIds[coords[i].split('%')[0]] = true;
else
parentIds[coords[i]] = true;
coords = null;
return parentIds;
},
getRelativeCoordsUsingParent: function(parentId) {
var matches={};
for(var i=0, len = this.conf.x.split(',').length; i < len; i++) {
if(this.getCoordParent(this.conf.x, i) === parentId && !isset(matches[i]))
matches[i] = true;
else if(this.getCoordParent(this.conf.y, i) === parentId && !isset(matches[i]))
matches[i] = true;
}
return matches;
},
addChild: function(obj) {
if(this.childs.indexOf(obj) === -1)
this.childs.push(obj);
obj = null;
},
delChild: function(obj) {
this.childs.splice(this.childs.indexOf(obj), 1);
obj = null;
},
detachChilds: function() {
for(var i=this.childs.length - 1; i >= 0; i--) {
var nums=this.childs[i].getRelativeCoordsUsingParent(this.conf.object_id);
var obj=this.childs[i];
for(var num in nums) {
obj.makeAbsoluteCoords(num);
}
saveObjectAttr(obj.conf.object_id, {'x': obj.conf.x, 'y': obj.conf.y });
obj  = null;
nums = null;
}
},
moveIcon: function () {
var container=document.getElementById(this.conf.object_id + '-icondiv');
container.style.top  = this.parseCoord(this.conf.y, 'y') + 'px';
container.style.left = this.parseCoord(this.conf.x, 'x') + 'px';
container = null;
},
parsedX: function() {
return this.parseCoords(this.conf.x, 'x');
},
parsedY: function() {
return this.parseCoords(this.conf.y, 'y');
},
reposition: function() {
if(this.conf.view_type === 'line' || this.conf.type === 'line')
this.drawLine();
else if(this.conf.type === 'textbox' || this.conf.type === 'container')
this.moveBox();
else
this.moveIcon();
if(this.conf.label_show && this.conf.label_show == '1')
this.updateLabel();
for(var i=0, l = this.childs.length; i < l; i++)
this.childs[i].reposition();
if(!this.bIsLocked)
this.redrawControls();
},
redrawControls: function () {
if(typeof(this.removeControls) == 'function')
this.removeControls();
if(typeof(this.parseControls) == 'function')
this.parseControls();
},
parseControls: function () {
var oControls=document.getElementById(this.conf.object_id+'-controls');
if(!oControls) {
oControls = document.createElement('div');
oControls.setAttribute('id', this.conf.object_id+'-controls');
if(this.parsedObject)
this.parsedObject.appendChild(oControls);
}
oControls = null;
if(this.conf.view_type === 'line' || this.conf.type === 'line')
this.parseLineControls();
else if(this.conf.view_type === 'icon' || this.conf.view_type === 'gadget')
this.parseIconControls();
else if(this.conf.type === 'textbox' || this.conf.type === 'container')
this.parseBoxControls();
else if(this.conf.type === 'shape')
this.parseShapeControls();
},
addControl: function (obj) {
var o=document.getElementById(this.conf.object_id+'-controls');
if(o) {
o.appendChild(obj);
o = null;
this.objControls.push(obj);
}
},
toggleLineMidLock: function() {
var x=this.conf.x.split(',');
var y=this.conf.y.split(',')
if(this.conf.line_type != 10 && this.conf.line_type != 13
&& this.conf.line_type != 14 && this.conf.line_type != 15) {
alert('Not available for this line. Only lines with 2 line parts have a middle coordinate.');
return;
}
if(x.length == 2) {
this.conf.x = [
x[0],
middle(this.parseCoords(this.conf.x, 'x', false)[0], this.parseCoords(this.conf.x, 'x', false)[1], this.conf.line_cut),
x[1],
].join(',');
this.conf.y = [
y[0],
middle(this.parseCoords(this.conf.y, 'y', false)[0], this.parseCoords(this.conf.y, 'y', false)[1], this.conf.line_cut),
y[1],
].join(',');
} else {
this.conf.x = [ x[0], x[2] ].join(',');
this.conf.y = [ y[0], y[2] ].join(',');
}
saveObjectAttr(this.conf.object_id, { 'x': this.conf.x, 'y': this.conf.y});
if(!this.bIsLocked)
this.redrawControls();
this.drawLine();
},
needsContextMenu: function () {
return (this.conf.context_menu && this.conf.context_menu !== '' && this.conf.context_menu !== '0'
&& this.conf.context_template && this.conf.context_template !== '') || !this.bIsLocked;
},
needsHoverMenu: function() {
return this.conf.hover_menu && this.conf.hover_menu !== '' && this.conf.hover_menu !== '0'
&& ((this.conf.hover_template && this.conf.hover_template !== '') ||
(this.conf.hover_url && this.conf.hover_url !== ''));
},
needsLink: function() {
return this.conf.url && this.conf.url !== '' && this.conf.url !== '#';
},
needsLineHoverArea: function() {
return this.needsHoverMenu() || this.needsContextMenu() || this.needsLink() || !this.bIsLocked;
},
parseLineHoverArea: function(oContainer) {
var oLink=document.getElementById(this.conf.object_id+'-linelink');
if(!oLink) {
var oLink=document.createElement('a');
oLink.setAttribute('id', this.conf.object_id+'-linelink');
oLink.setAttribute('class', 'linelink');
oLink.setAttribute('className', 'linelink');
oLink.href = this.conf.url;
oLink.target = this.conf.url_target;
oContainer.appendChild(oLink);
}
if(!this.needsLineHoverArea()) {
oLink.style.display = 'none';
} else {
oLink.style.display = 'block';
}
oLink = null;
oContainer = null;
},
removeLineHoverArea: function() {
if(!this.needsLineHoverArea()) {
var area=document.getElementById(this.conf.object_id+'-linelink');
area.style.display = 'none';
area = null;
}
},
parseLineControls: function () {
var x=this.parseCoords(this.conf.x, 'x');
var y=this.parseCoords(this.conf.y, 'y');
var size=oGeneralProperties['controls_size'];
var lineEndSize=size;
if(size < 20)
lineEndSize = 20;
for(var i=0, l = x.length; i < l; i++) {
if(l > 2 && i == 1)
this.parseControlDrag(i, x[i], y[i], - size / 2, - size / 2, size);
else
this.parseControlDrag(i, x[i], y[i], - lineEndSize / 2, - lineEndSize / 2, lineEndSize);
makeDragable([this.conf.object_id+'-drag-'+i], this.saveObject, this.moveObject);
}
if(this.conf.view_type === 'line' && (this.conf.line_type == 10
|| this.conf.line_type == 13 || this.conf.line_type == 14 || this.conf.line_type == 15))
this.parseControlToggleLineMid(x.length+2, this.getLineMid(this.conf.x, 'x'), this.getLineMid(this.conf.y, 'y'), 20 - size / 2, -size / 2 + 5, size);
lineEndSize = null;
size = null;
x = null;
y = null;
},
getLineMid: function(coord, dir) {
var c=coord.split(',');
if(c.length == 2)
return middle(this.parseCoords(coord, dir)[0],
this.parseCoords(coord, dir)[1],
this.conf.line_cut);
else
return this.parseCoords(coord, dir)[1];
},
lineCoords: function() {
return [
this.parseCoords(this.conf.x, 'x'),
this.parseCoords(this.conf.y, 'y'),
[this.conf.line_cut, this.conf.line_label_pos_in, this.conf.line_label_pos_out]
];
},
removeControls: function() {
var oControls=document.getElementById(this.conf.object_id+'-controls');
if(oControls)
for(var i=oControls.childNodes.length; i > 0; i--)
oControls.removeChild(oControls.childNodes[0]);
this.objControls = [];
oControls = null;
if(this.conf.type === 'textbox' || this.conf.type === 'container') {
this.removeBoxControls();
makeUndragable([this.conf.object_id+'-label']);
} else {
makeUndragable([this.conf.object_id+'-icondiv']);
}
if(this.conf.view_type === 'line' || this.conf.type === 'line')
this.removeLineHoverArea();
},
parseControlDrag: function (num, objX, objY, offX, offY, size) {
var ctl=document.createElement('div');
ctl.setAttribute('id',         this.conf.object_id+'-drag-' + num);
ctl.setAttribute('class',     'control drag');
ctl.setAttribute('className', 'control drag');
ctl.title          = 'Move object';
ctl.style.zIndex   = parseInt(this.conf.z)+1;
ctl.style.width    = addZoomFactor(size) + 'px';
ctl.style.height   = addZoomFactor(size) + 'px';
ctl.style.left     = (objX + offX) + 'px';
ctl.style.top      = (objY + offY) + 'px';
ctl.objOffsetX     = offX;
ctl.objOffsetY     = offY;
ctl.onmouseover = function() {
document.body.style.cursor = 'move';
};
ctl.onmouseout = function() {
document.body.style.cursor = 'auto';
};
this.addControl(ctl);
ctl = null;
},
parseControlToggleLineMid: function (num, objX, objY, offX, offY, size) {
var ctl=document.createElement('div');
ctl.setAttribute('id',         this.conf.object_id+'-togglemid-' + num);
ctl.setAttribute('class',     'control togglemid');
ctl.setAttribute('className', 'control togglemid');
ctl.title          = 'Lock/Unlock line middle';
ctl.style.zIndex   = parseInt(this.conf.z)+1;
ctl.style.width    = addZoomFactor(size) + 'px';
ctl.style.height   = addZoomFactor(size) + 'px';
ctl.style.left     = (objX + offX) + 'px';
ctl.style.top      = (objY + offY) + 'px';
ctl.objOffsetX     = offX;
ctl.objOffsetY     = offY;
ctl.onclick = function(event) {
var arr=this.id.split('-');
var objId=arr[0];
toggleLineMidLock(event, objId);
contextHide();
objId = null;
arr   = null;
document.body.style.cursor = 'auto';
};
ctl.onmouseover = function() {
document.body.style.cursor = 'pointer';
};
ctl.onmouseout = function() {
document.body.style.cursor = 'auto';
};
this.addControl(ctl);
ctl = null;
},
moveObject: function(obj) {
var arr=obj.id.split('-');
var objId=arr[0];
if(arr.length > 1)
var anchorType=arr[1];
var newPos;
var viewType=getDomObjViewType(objId);
var jsObj=getMapObjByDomObjId(objId);
if(viewType === 'line') {
newPos = getMidOfAnchor(obj);
var anchorId=arr[2];
newPos = [ jsObj.calcNewCoord(newPos[0], 'x', anchorId),
jsObj.calcNewCoord(newPos[1], 'y', anchorId) ];
var parents=jsObj.getParentObjectIds(anchorId);
anchorId   = null;
} else {
var offsetX=isset(obj.objOffsetX) ? obj.objOffsetX : 0;
var offsetY=isset(obj.objOffsetY) ? obj.objOffsetY : 0;
newPos = [ jsObj.calcNewCoord(obj.x - offsetX, 'x'),
jsObj.calcNewCoord(obj.y - offsetY, 'y') ];
var parents=jsObj.getParentObjectIds();
}
for (var objectId in parents) {
var p=getMapObjByDomObjId(objectId);
if(p)
p.highlight(true);
p = null;
}
parents = null;
jsObj.conf.x = newPos[0];
jsObj.conf.y = newPos[1];
jsObj.reposition();
jsObj      = null;
objId      = null;
anchorType = null;
newPos     = null;
viewType   = null;
},
saveObject: function(obj, oParent) {
var arr=obj.id.split('-');
var objId=arr[0];
if(arr.length > 2)
var anchorId=arr[2];
var viewType=getDomObjViewType(objId);
var jsObj=getMapObjByDomObjId(objId);
if(viewType !== 'line')
anchorId = -1;
if(useGrid()) {
if(viewType === 'line') {
var pos=coordsToGrid(jsObj.parseCoords(jsObj.conf.x, 'x', false)[anchorId],
jsObj.parseCoords(jsObj.conf.y, 'y', false)[anchorId]);
jsObj.conf.x = jsObj.calcNewCoord(pos[0], 'x', anchorId);
jsObj.conf.y = jsObj.calcNewCoord(pos[1], 'y', anchorId);
pos = null;
} else {
var pos=coordsToGrid(jsObj.parseCoord(jsObj.conf.x, 'x', false),
jsObj.parseCoord(jsObj.conf.y, 'y', false));
jsObj.conf.x = jsObj.calcNewCoord(pos[0], 'x');
jsObj.conf.y = jsObj.calcNewCoord(pos[1], 'y');
pos = null;
}
jsObj.reposition();
}
if(isset(oParent))
if(oParent !== false)
jsObj.makeRelativeCoords(oParent, anchorId);
else
jsObj.makeAbsoluteCoords(anchorId);
saveObjectAfterAnchorAction(obj);
document.body.style.cursor = 'auto';
arr      = null;
objId    = null;
anchorId = null;
jsObj    = null;
},
getJsObjId: function() {
if(this.conf.view_type && this.conf.view_type === 'line')
return this.conf.object_id+'-linelink';
else
return this.conf.object_id+'-icon';
},
toggleObjectActions: function(enable) {
var o=document.getElementById(this.getJsObjId());
if(o) {
if(enable && isset(o.disabled_onmousemove)) {
o.onmousemove = o.disabled_onmousemove;
o.onmouseout  = o.disabled_onmouseout;
o.disabled_onmousemove = null;
o.disabled_onmouseout  = null;
if(o.parentNode.tagName == 'A')
o.parentNode.onclick = null;
} else if(!enable) {
o.disabled_onmousemove = o.onmousemove;
o.disabled_onmouseout  = o.onmouseout;
o.onmousemove = null;
o.onmouseout  = null;
if(o.parentNode.tagName == 'A')
o.parentNode.onclick = function(event) {
var event=!event ? window.event : event;
if(event.stopPropagation)
event.stopPropagation();
event.cancelBubble = true;
return false;
};
}
o = null;
}
},
highlight: function(show) {}
});
var NagVisStatefulObject=NagVisObject.extend({
has_state: true,
last_state: null,
members: [],
event_time_first: null,
event_time_last: null,
constructor: function(oConf) {
this.base(oConf);
},
getMembers: function() {
this.members = [];
if(this.conf && this.conf.members && this.conf.members.length > 0) {
for(var i=0, len = this.conf.members.length; i < len; i++) {
var oMember=this.conf.members[i];
var oObj;
switch (oMember.type) {
case 'host':
oObj = new NagVisHost(oMember);
break;
case 'service':
oObj = new NagVisService(oMember);
break;
case 'hostgroup':
oObj = new NagVisHostgroup(oMember);
break;
case 'servicegroup':
oObj = new NagVisServicegroup(oMember);
break;
case 'dyngroup':
oObj = new NagVisDynGroup(oMember);
break;
case 'aggr':
oObj = new NagVisAggr(oMember);
break;
case 'map':
oObj = new NagVisMap(oMember);
break;
case 'textbox':
oObj = new NagVisTextbox(oMember);
break;
case 'container':
oObj = new NagVisContainer(oMember);
break;
case 'shape':
oObj = new NagVisShape(oMember);
break;
case 'line':
oObj = new NagVisLine(oMember);
break;
default:
alert('Error: Unknown member object type ('+oMember.type+')');
break;
}
if(oObj !== null) {
this.members.push(oObj);
}
oObj = null;
oMember = null;
}
}
},
saveLastState: function() {
this.last_state = {
'summary_state': this.conf.summary_state,
'summary_in_downtime': this.conf.summary_in_downtime,
'summary_stale': this.conf.summary_stale,
'summary_problem_has_been_acknowledged': this.conf.summary_problem_has_been_acknowledged,
'output': this.conf.output,
'perfdata': this.conf.perfdata
};
},
stateChanged: function() {
if(this.conf.summary_state != this.last_state.summary_state ||
this.conf.summary_problem_has_been_acknowledged != this.last_state.summary_problem_has_been_acknowledged ||
this.conf.summary_stale != this.last_state.summary_stale ||
this.conf.summary_in_downtime != this.last_state.summary_in_downtime) {
return true;
} else {
return false;
}
},
stateChangedToWorse: function() {
var lastSubState='normal';
if(this.last_state.summary_problem_has_been_acknowledged && this.last_state.summary_problem_has_been_acknowledged === 1) {
lastSubState = 'ack';
} else if(this.last_state.summary_in_downtime && this.last_state.summary_in_downtime == 1) {
lastSubState = 'downtime';
} else if(this.last_state.summary_stale) {
lastSubState = 'stale';
}
if(!this.last_state.summary_state) {
return true;
}
var lastWeight=oStates[this.last_state.summary_state][lastSubState];
var subState='normal';
if(this.conf.summary_problem_has_been_acknowledged && this.conf.summary_problem_has_been_acknowledged === 1) {
subState = 'ack';
} else if(this.conf.summary_in_downtime && this.conf.summary_in_downtime === 1) {
subState = 'downtime';
} else if(this.conf.summary_stale) {
subState = 'stale';
}
var weight=oStates[this.conf.summary_state][subState];
return lastWeight < weight;
},
hasProblematicState: function() {
if(this.conf.summary_problem_has_been_acknowledged && this.conf.summary_problem_has_been_acknowledged === 1) {
return false;
} else if(this.conf.summary_in_downtime && this.conf.summary_in_downtime === 1) {
return false;
} else if(this.conf.summary_stale && this.conf.summary_stale) {
return false;
}
var weight=oStates[this.conf.summary_state]['normal'];
return weight > oStates['UP']['normal'];
},
outputOrPerfdataChanged: function() {
return this.conf.output != this.last_state.output || this.conf.perfdata != this.last_state.perfdata;
},
parse: function () {
if(!this.parsedObject) {
this.replaceMacros();
}
this.remove();
var doc=document;
var oContainerDiv=doc.createElement('div');
oContainerDiv.setAttribute('id', this.conf.object_id);
switch(this.conf.view_type) {
case 'line':
oContainerDiv.appendChild(this.parseLine());
break;
case 'gadget':
oContainerDiv.appendChild(this.parseGadget());
break;
default:
oContainerDiv.appendChild(this.parseIcon());
break;
}
var oMap=doc.getElementById('map');
if(oMap) {
this.parsedObject = oMap.appendChild(oContainerDiv);
oMap = null;
}
doc = null;
if(this.conf.label_show && this.conf.label_show == '1') {
this.parseLabel(oContainerDiv);
}
oContainerDiv = null;
if(this.conf.view_type && this.conf.view_type == 'line')
this.drawLine();
if(!this.bIsLocked) {
this.parseControls();
this.unlockLabel();
if(typeof(this.toggleObjectActions) == 'function')
this.toggleObjectActions(this.bIsLocked);
}
},
remove: function () {
if(!this.parsedObject)
return;
var doc=document;
var oMap=doc.getElementById('map');
if(!oMap) {
doc = null;
return;
}
var oObj;
if(isset(this.conf.view_type) && this.conf.view_type === 'line')
oObj = doc.getElementById(this.conf.object_id+'-linelink');
else
oObj = doc.getElementById(this.conf.object_id+'-icon');
if(oObj) {
oObj.onmousedown    = null;
oObj.oncontextmenu  = null;
oObj.onmouseover    = null;
oObj.onmouseout     = null;
oObj.onload         = null;
oObj = null;
}
var oContext=doc.getElementById(this.conf.object_id+'-context');
if(oContext) {
try {
this.parsedObject.removeChild(oContext);
} catch(e) {}
oContext = null;
}
var oHover=doc.getElementById(this.conf.object_id+'-hover');
if(oHover) {
try {
this.parsedObject.removeChild(oHover);
} catch(e) {}
oHover = null;
}
var oLabel=doc.getElementById(this.conf.object_id+'-label');
if(oLabel) {
try {
this.parsedObject.removeChild(oLabel);
} catch(e) {}
oLabel = null;
}
if(isset(this.conf.view_type) && this.conf.view_type === 'line') {
var linediv=doc.getElementById(this.conf.object_id+'-linediv');
linediv.removeChild(doc.getElementById(this.conf.object_id+'-line'));
linediv.removeChild(doc.getElementById(this.conf.object_id+'-linelink'));
this.parsedObject.removeChild(linediv);
} else {
this.parsedObject.removeChild(doc.getElementById(this.conf.object_id+'-icondiv'));
}
if(!this.bIsLocked)
this.removeControls();
oMap.removeChild(this.parsedObject);
this.parsedObject = null;
oMap = null;
doc = null;
},
parseHoverMenu: function () {
this.getHoverMenu(this.getJsObjId());
if(this.hoverX !== null) {
hoverShow(this.hoverX, this.hoverY, this.conf.object_id);
}
},
replaceMacros: function () {
var name='';
if(this.conf.type == 'service') {
name = 'host_name';
} else {
name = this.conf.type + '_name';
}
if(this.conf.url && this.conf.url !== '') {
if(this.conf.htmlcgi && this.conf.htmlcgi !== '') {
this.conf.url = this.conf.url.replace(getRegEx('htmlcgi', '\\[htmlcgi\\]', 'g'), this.conf.htmlcgi);
} else {
this.conf.url = this.conf.url.replace(getRegEx('htmlcgi', '\\[htmlcgi\\]', 'g'), oGeneralProperties.path_cgi);
}
this.conf.url = this.conf.url.replace(getRegEx('htmlbase', '\\[htmlbase\\]', 'g'), oGeneralProperties.path_base);
this.conf.url = this.conf.url.replace(getRegEx(name, '\\['+name+'\\]', 'g'), this.conf.name);
if(this.conf.type == 'service') {
this.conf.url = this.conf.url.replace(getRegEx('service_description', '\\[service_description\\]', 'g'), this.conf.service_description);
}
if(this.conf.type != 'map') {
this.conf.url = this.conf.url.replace(getRegEx('backend_id', '\\[backend_id\\]', 'g'), this.conf.backend_id);
}
}
if(this.conf.hover_url && this.conf.hover_url !== '') {
this.conf.hover_url = this.conf.hover_url.replace(getRegEx(name, '\\['+name+'\\]', 'g'), this.conf.name);
if(this.conf.type == 'service') {
this.conf.hover_url = this.conf.hover_url.replace(getRegEx('service_description', '\\[service_description\\]', 'g'), this.conf.service_description);
}
}
if(this.conf.label_text && this.conf.label_text !== '') {
var objName;
if(this.conf.type == 'map') {
objName = this.conf.alias;
} else {
objName = this.conf.name;
}
this.conf.label_text = this.conf.label_text.replace(getRegEx('name', '\\[name\\]', 'g'), objName);
this.conf.label_text = this.conf.label_text.replace(getRegEx('alias', '\\[alias\\]', 'g'), this.conf.alias);
if(this.conf.type == 'service') {
this.conf.label_text = this.conf.label_text.replace(getRegEx('service_description', '\\[service_description\\]', 'g'), this.conf.service_description);
}
}
},
replaceLabelTextDynamicMacros: function () {
var sReturn=this.conf.label_text;
if(sReturn && sReturn !== '') {
sReturn = sReturn.replace(getRegEx('output', '\\[output\\]', 'g'), this.conf.output);
if(this.conf.type == 'service' || this.conf.type == 'host') {
sReturn = sReturn.replace(getRegEx('perfdata', '\\[perfdata\\]', 'g'), this.conf.perfdata);
}
}
if (this.conf.label_maxlen > 0 && sReturn.length > this.conf.label_maxlen) {
sReturn = sReturn.substr(0, this.conf.label_maxlen - 2) + '...';
}
return sReturn;
},
parseLine: function () {
var doc=document;
var oContainerDiv=doc.createElement('div');
oContainerDiv.setAttribute('id', this.conf.object_id+'-linediv');
var oLineDiv=doc.createElement('div');
oLineDiv.setAttribute('id', this.conf.object_id+'-line');
oLineDiv.style.zIndex = this.conf.z;
oContainerDiv.appendChild(oLineDiv);
oLineDiv = null;
this.parseLineHoverArea(oContainerDiv);
doc = null;
return oContainerDiv;
},
drawLine: function() {
var width=addZoomFactor(this.conf.line_width);
if(width <= 0)
width = 1; // minimal width for lines
var colorFill='';
var colorFill2='';
var colorBorder='#000000';
var setPerfdata=[];
setPerfdata[0] = Array('dummyPercentIn', 88, '%', 85, 98, 0, 100);
setPerfdata[1] = Array('dummyPercentOut', 99, '%', 85, 98, 0, 100);
setPerfdata[2] = Array('dummyActualIn', 88.88, 'mB/s', 850, 980, 0, 1000);
setPerfdata[3] = Array('dummyActualOut', 99.99, 'mB/s', 850, 980, 0, 1000);
switch (this.conf.summary_state) {
case 'UNREACHABLE':
case 'DOWN':
case 'CRITICAL':
case 'WARNING':
case 'UNKNOWN':
case 'ERROR':
case 'UP':
case 'OK':
case 'PENDING':
colorFill = oStates[this.conf.summary_state].color;
break;
default:
colorFill = '#FFCC66';
break;
}
if(this.conf.line_type == 13 || this.conf.line_type == 14 || this.conf.line_type == 15) {
colorFill  = '#000000';
colorFill2 = '#000000';
setPerfdata = splicePerfdata(this.conf.perfdata);
if(setPerfdata == 'empty'
|| !isset(setPerfdata[0]) || setPerfdata[0][0] == 'dummyPercentIn'
|| !isset(setPerfdata[1]) || setPerfdata[1][0] == 'dummyPercentOut'
|| (this.conf.line_type == 14 && (
!isset(setPerfdata[2]) || setPerfdata[2][0] == 'dummyActualIn'
|| !isset(setPerfdata[3]) || setPerfdata[3][0] == 'dummyActualOut'))) {
var msg="Missing performance data - ";
if(setPerfdata == 'empty')
msg += "perfdata string is empty";
else {
if(isset(setPerfdata[0]) && setPerfdata[0][0] == 'dummyPercentIn')
msg += "value 1 is \'" + setPerfdata[0][1] + "\'";
if(isset(setPerfdata[1]) && setPerfdata[1][0] == 'dummyPercentOut')
msg += " value 2 is \'" + setPerfdata[1][1] + "\'";
if(this.conf.line_type == 14) {
if(isset(setPerfdata[2]) && setPerfdata[2][0] == 'dummyActualIn')
msg += " value 3 is \'" + setPerfdata[2][1] + "\'";
if(isset(setPerfdata[3]) && setPerfdata[3][0] == 'dummyActualOut')
msg += " value 4 is \'" + setPerfdata[3][1] + "\'";
}
}
this.conf.summary_output += ' (Weathermap Line Error: ' + msg + ')';
} else {
if(setPerfdata[0][2] === null || setPerfdata[0][2] === ''
|| setPerfdata[1][2] === null || setPerfdata[1][2] === '') {
setPerfdata = this.calculateUsage(setPerfdata);
}
if(setPerfdata[0][2] !== null && setPerfdata[0][2] == '%' && setPerfdata[0][1] !== null) {
colorFill = this.getColorFill(setPerfdata[0][1]);
} else {
colorFill = '#000000';
this.perfdataError('First', setPerfdata[0][1], this.conf.name, this.conf.service_description);
}
if(setPerfdata[1][2] !== null && setPerfdata[1][2] == '%' && setPerfdata [1][1] !== null) {
colorFill2 = this.getColorFill(setPerfdata[1][1]);
} else {
colorFill2 = '#000000';
this.perfdataError('Second', setPerfdata[1][1], this.conf.name, this.conf.service_description);
}
}
}
if(this.conf.summary_problem_has_been_acknowledged === 1 || this.conf.summary_in_downtime === 1 || this.conf.summary_stale) {
colorBorder = '#666666';
colorFill = lightenColor(colorFill, 100, 100, 100);
}
drawNagVisLine(this.conf.object_id, this.conf.line_type, this.lineCoords(),
this.conf.z, width, colorFill, colorFill2, setPerfdata, colorBorder,
this.needsLineHoverArea(),
(this.conf.line_label_show && this.conf.line_label_show === '1'),
parseInt(this.conf.line_label_y_offset));
},
getColorFill: function(perc) {
var ranges=this.conf.line_weather_colors.split(',');
for(var i=0; i < ranges.length; i++) {
var parts=ranges[i].split(':');
if(parseFloat(perc) <= parts[0])
return parts[1];
parts = null;
}
ranges = null;
return '#000000';
},
calculateUsage: function(oldPerfdata) {
var newPerfdata=[];
var foundNew=false;
var display_bits=false;
if(oldPerfdata.length >= 11 && oldPerfdata[10][5] == '0.0')
display_bits = true;
for(var i=0; i < oldPerfdata.length; i++) {
if(oldPerfdata[i][0] == 'in' && (oldPerfdata[i][2] === null || oldPerfdata[i][2] === '')) {
newPerfdata[0] = this.perfdataCalcPerc(oldPerfdata[i]);
if(!display_bits) {
newPerfdata[2] = this.perfdataCalcBytesReadable(oldPerfdata[i]);
} else {
oldPerfdata[i][1] *= 8; // convert those hakish bytes to bits
newPerfdata[2] = this.perfdataCalcBitsReadable(oldPerfdata[i]);
}
foundNew = true;
}
if(oldPerfdata[i][0] == 'out' && (oldPerfdata[i][2] === null || oldPerfdata[i][2] === '')) {
newPerfdata[1] = this.perfdataCalcPerc(oldPerfdata[i]);
if(!display_bits) {
newPerfdata[3] = this.perfdataCalcBytesReadable(oldPerfdata[i]);
} else {
oldPerfdata[i][1] *= 8; // convert those hakish bytes to bits
newPerfdata[3] = this.perfdataCalcBitsReadable(oldPerfdata[i]);
}
foundNew = true;
}
}
if(foundNew)
return newPerfdata;
else
return oldPerfdata;
},
perfdataCalcBitsReadable: function(set) {
var KB=1024;
var MB=1024 * 1024;
var GB=1024 * 1024 * 1024;
if(set[1] > GB) {
set[1] /= GB
set[2]  = 'Gbit/s'
} else if(set[1] > MB) {
set[1] /= MB
set[2]  = 'Mbit/s'
} else if(set[1] > KB) {
set[1] /= KB
set[2]  = 'Kbit/s'
} else {
set[2]  = 'bit/s'
}
set[1] = Math.round(set[1]*100)/100;
return set;
},
perfdataCalcBytesReadable: function(set) {
var KB=1024;
var MB=1024 * 1024;
var GB=1024 * 1024 * 1024;
if(set[1] > GB) {
set[1] /= GB
set[2]  = 'GB/s'
} else if(set[1] > MB) {
set[1] /= MB
set[2]  = 'MB/s'
} else if(set[1] > KB) {
set[1] /= KB
set[2]  = 'KB/s'
} else {
set[2]  = 'B/s'
}
set[1] = Math.round(set[1]*100)/100;
return set;
},
perfdataCalcPerc: function(set) {
if(set[1] === null || set[6] === null || set[1] == '' || set[6] == '')
return set;
return Array(set[0], Math.round(set[1]*100/set[6]*100)/100, '%', set[3], set[4], 0, 100);
},
perfdataError: function(type, value, name1, name2) {
this.conf.summary_output += ' (Weathermap Line Error: ' + type+' set of performance data ('+value+') for  '+name1+' ['+name2+'] is not a percentage value)';
},
parseIcon: function () {
var alt='';
if(this.type == 'service') {
alt = this.conf.name+'-'+this.conf.service_description;
} else {
alt = this.conf.name;
}
var doc=document;
var oIcon=doc.createElement('img');
oIcon.setAttribute('id', this.conf.object_id+'-icon');
oIcon.onload = function() {
var arr=this.id.split('-');
var objId=arr[0];
var obj=getMapObjByDomObjId(objId);
if (obj) {
if (obj.conf.label_show && obj.conf.label_show == '1')
obj.updateLabel();
if (!obj.bIsLocked)
obj.redrawControls();
obj = null;
}
objId = null;
arr = null;
};
addZoomHandler(oIcon);
oIcon.src = oGeneralProperties.path_iconsets + this.conf.icon;
oIcon.alt = this.conf.type + '-' + alt;
var oIconDiv=doc.createElement('div');
oIconDiv.setAttribute('id', this.conf.object_id+'-icondiv');
oIconDiv.setAttribute('class', 'icon');
oIconDiv.setAttribute('className', 'icon');
oIconDiv.style.position = 'absolute';
oIconDiv.style.top  = this.parseCoord(this.conf.y, 'y') + 'px';
oIconDiv.style.left = this.parseCoord(this.conf.x, 'x') + 'px';
oIconDiv.style.zIndex = this.conf.z;
if(this.conf.url && this.conf.url !== '' && this.conf.url !== '#') {
var oIconLink=doc.createElement('a');
oIconLink.href = this.conf.url;
oIconLink.target = this.conf.url_target;
oIconLink.appendChild(oIcon);
oIcon = null;
oIconDiv.appendChild(oIconLink);
oIconLink = null;
} else {
oIconDiv.appendChild(oIcon);
oIcon = null;
}
doc = null;
return oIconDiv;
},
updateLabel: function () {
var label=document.getElementById(this.conf.object_id + '-label');
if (label) {
this.updateLabelPos(label);
label = null;
}
},
dragLabel: function(obj, event) {
var arr=obj.id.split('-');
var objId=arr[0];
var anchorType=arr[1];
var viewType=getDomObjViewType(objId);
var jsObj=getMapObjByDomObjId(objId);
jsObj.conf.label_x = jsObj.calcNewLabelCoord(jsObj.conf.label_x, jsObj.parseCoord(jsObj.conf.x, 'x', false), obj.x);
jsObj.conf.label_y = jsObj.calcNewLabelCoord(jsObj.conf.label_y, jsObj.parseCoord(jsObj.conf.y, 'y', false), obj.y);
jsObj      = null;
objId      = null;
anchorType = null;
viewType   = null;
},
calcNewLabelCoord: function (labelCoord, coord, newCoord) {
if(labelCoord.toString().match(/^(?:\+|\-)/)) {
var ret=newCoord - coord;
if(ret >= 0)
return '+' + ret;
return ret;
} else
return newCoord;
},
saveLabel: function(obj, oParent) {
var arr=obj.id.split('-');
var objId=arr[0];
var jsObj=getMapObjByDomObjId(objId);
saveObjectAttr(objId, { 'label_x': jsObj.conf.label_x, 'label_y': jsObj.conf.label_y});
jsObj = null;
arr   = null;
},
updateLabelPos: function (oLabel) {
oLabel.style.left = this.parseLabelCoord('x', oLabel) + 'px';
oLabel.style.top  = this.parseLabelCoord('y', oLabel) + 'px';
oLabel = null;
},
parseLabelCoord: function (dir, oLabel) {
if (dir === 'x') {
var coord=this.conf.label_x;
if (this.conf.view_type && this.conf.view_type == 'line') {
var obj_coord=this.getLineMid(this.conf.x, 'x');
} else {
var obj_coord=addZoomFactor(this.parseCoords(this.conf.x, 'x', false)[0], true);
}
} else {
var coord=this.conf.label_y;
if (this.conf.view_type && this.conf.view_type == 'line') {
var obj_coord=this.getLineMid(this.conf.y, 'y');
} else {
var obj_coord=addZoomFactor(this.parseCoords(this.conf.y, 'y', false)[0], true);
}
}
if (dir == 'x' && coord && coord.toString() == 'center') {
var diff=parseInt(parseInt(oLabel.clientWidth) - rmZoomFactor(this.getObjWidth())) / 2;
coord = obj_coord - diff;
} else if (dir == 'y' && coord && coord.toString() == 'bottom') {
coord = obj_coord + rmZoomFactor(this.getObjHeight());
} else if (coord && coord.toString().match(/^(?:\+|\-)/)) {
coord = obj_coord + addZoomFactor(parseFloat(coord));
} else if (!coord || coord === '0') {
coord = obj_coord;
} else {
coord = addZoomFactor(coord, true);
}
return coord;
},
parseLabel: function (oContainer) {
var oLabel=drawNagVisTextbox(
oContainer, this.conf.object_id + '-label', 'object_label',
this.conf.label_background, this.conf.label_border,
this.parseCoord(this.conf.x, 'x', false), this.parseCoord(this.conf.y, 'y', false),
this.conf.z,
this.conf.label_width, '', this.replaceLabelTextDynamicMacros(),
this.conf.label_style
);
this.updateLabelPos(oLabel);
oLabel = null;
},
unlockLabel: function () {
var o=document.getElementById(this.conf.object_id + '-label');
if(!o)
return;
o.onmouseover = function() {
document.body.style.cursor = 'move';
};
o.onmouseout = function() {
document.body.style.cursor = 'auto';
};
makeDragable([o], this.saveLabel, this.dragLabel);
o = null;
},
lockLabel: function () {
var o=document.getElementById(this.conf.object_id + '-label');
if(!o)
return;
var n=o.cloneNode(true);
o.parentNode.replaceChild(n, o);
makeUndragable([o]);
o = null;
n = null;
},
toggleLabelLock: function () {
if(this.bIsLocked)
this.lockLabel();
else
this.unlockLabel();
},
parseIconControls: function () {
makeDragable([this.conf.object_id+'-icondiv'], this.saveObject, this.moveObject);
},
highlight: function(show) {
if(this.conf.view_type !== 'icon')
return;
var oObjIcon=document.getElementById(this.conf.object_id + '-icon');
var oObjIconDiv=document.getElementById(this.conf.object_id + '-icondiv');
var sColor=oStates[this.conf.summary_state].color;
this.bIsFlashing = show;
if(show) {
oObjIcon.style.border  = "5px solid " + sColor;
oObjIconDiv.style.top  = (this.parseCoord(this.conf.y, 'y') - 5) + 'px';
oObjIconDiv.style.left = (this.parseCoord(this.conf.x, 'x') - 5) + 'px';
} else {
oObjIcon.style.border  = "none";
oObjIconDiv.style.top  = this.parseCoord(this.conf.y, 'y') + 'px';
oObjIconDiv.style.left = this.parseCoord(this.conf.x, 'x') + 'px';
}
sColor      = null;
oObjIconDiv = null;
oObjIcon    = null;
},
requestGadget: function (param_str) {
var data='members='+escape(JSON.stringify(this.conf.members));
return postSyncUrl(this.conf.gadget_url + param_str, data);
},
detectGadgetType: function (param_str) {
var content=this.requestGadget(param_str);
if (content.substring(0, 4) === 'GIF8' || ! /^[\x00-\x7F]*$/.test(content[0]))
this.gadget_type = 'img';
else
this.gadget_type = 'html';
},
parseGadget: function () {
var sParams='name1=' + this.conf.name;
if (this.conf.type == 'service')
sParams += '&name2=' + escapeUrlValues(this.conf.service_description);
sParams += '&type=' + this.conf.type
+ '&object_id=' + this.conf.object_id
+ '&scale=' + escapeUrlValues(this.conf.gadget_scale.toString())
+ '&state=' + this.conf.summary_state
+ '&stateType=' + this.conf.state_type
+ '&ack=' + this.conf.summary_problem_has_been_acknowledged
+ '&downtime=' + this.conf.summary_in_downtime;
if (this.conf.type == 'dyngroup')
sParams += '&object_types=' + this.conf.object_types;
if (this.conf.perfdata && this.conf.perfdata != '')
sParams += '&perfdata=' + this.conf.perfdata.replace(/\&quot\;|\&\#145\;/g,'%22');
if (this.conf.gadget_opts && this.conf.gadget_opts != '')
sParams += '&opts=' + escapeUrlValues(this.conf.gadget_opts.toString());
if (this.conf.gadget_url.indexOf('?') == -1)
sParams = '?' + sParams;
else
sParams = '&' + sParams;
this.detectGadgetType(sParams);
if (this.gadget_type === 'img') {
var oGadget=document.createElement('img');
addZoomHandler(oGadget);
oGadget.src = this.conf.gadget_url + sParams;
var alt=this.conf.type + '-' + this.conf.name;
if (this.conf.type == 'service')
alt += '-'+this.conf.service_description;
oGadget.alt = alt;
} else {
var oGadget=document.createElement('div');
oGadget.innerHTML = this.requestGadget(sParams);
}
oGadget.setAttribute('id', this.conf.object_id + '-icon');
var oIconDiv=document.createElement('div');
oIconDiv.setAttribute('id', this.conf.object_id + '-icondiv');
oIconDiv.setAttribute('class', 'icon');
oIconDiv.setAttribute('className', 'icon');
oIconDiv.style.position = 'absolute';
oIconDiv.style.top      = this.parseCoord(this.conf.y, 'y') + 'px';
oIconDiv.style.left     = this.parseCoord(this.conf.x, 'x') + 'px';
oIconDiv.style.zIndex   = this.conf.z;
if(this.conf.url && this.conf.url !== '') {
var oIconLink=document.createElement('a');
oIconLink.href = this.conf.url;
oIconLink.target = this.conf.url_target;
oIconLink.appendChild(oGadget);
oGadget = null;
oIconDiv.appendChild(oIconLink);
oIconLink = null;
} else {
oIconDiv.appendChild(oGadget);
oGadget = null;
}
return oIconDiv;
}
});
var NagVisStatelessObject=NagVisObject.extend({
has_state: false,
constructor: function(oConf) {
this.base(oConf);
},
remove: function () {
if(!this.parsedObject)
return;
var oObj;
oObj = document.getElementById(this.conf.object_id);
if(oObj) {
oObj.onmousedown = null;
oObj.oncontextmenu = null;
oObj.onmouseover = null;
oObj.onmouseout = null;
oObj = null;
}
if(!this.bIsLocked)
this.removeControls();
var oMap=document.getElementById('map');
if(oMap) {
oMap.removeChild(this.parsedObject);
oMap = null;
}
this.parsedObject = null;
}
});
var NagVisHost=NagVisStatefulObject.extend({
constructor: function(oConf) {
this.base(oConf);
this.getMembers();
}
});
var NagVisService=NagVisStatefulObject.extend({
constructor: function(oConf) {
this.base(oConf);
},
});
var NagVisHostgroup=NagVisStatefulObject.extend({
constructor: function(oConf) {
this.base(oConf);
this.getMembers();
}
});
var NagVisServicegroup=NagVisStatefulObject.extend({
constructor: function(oConf) {
this.base(oConf);
this.getMembers();
}
});
var NagVisDynGroup=NagVisStatefulObject.extend({
constructor: function(oConf) {
this.base(oConf);
this.getMembers();
}
});
var NagVisAggr=NagVisStatefulObject.extend({
constructor: function(oConf) {
this.base(oConf);
this.getMembers();
}
});
var NagVisMap=NagVisStatefulObject.extend({
constructor: function(oConf) {
this.base(oConf);
this.getMembers();
},
stateText: function () {
var substate='';
if (this.conf.summary_in_downtime == 1)
substate = ' (downtime)';
else if (this.conf.summary_problem_has_been_acknowledged == 1)
substate = ' (ack)';
else if (this.conf.summary_stale)
substate = ' (stale)';
return this.conf.summary_state + substate;
},
parseOverview: function () {
var alt='';
if(this.type == 'service')
alt = this.conf.name+'-'+this.conf.service_description;
else
alt = this.conf.name;
this.replaceMacros();
var div=document.createElement('div');
div.setAttribute('id', this.conf.object_id);
div.className = 'mapobj '+this.conf.overview_class;
var url=this.conf.overview_url;
div.onclick = function() {
location.href = url;
return false;
};
if(oPageProperties.showmapthumbs == 1)
div.style.height = '200px';
var oLink=document.createElement('a');
oLink.setAttribute('id', this.conf.object_id+'-icon');
oLink.style.display = "block";
oLink.style.width = "100%";
oLink.style.height = "100%";
oLink.href = this.conf.overview_url;
if(this.conf.icon !== null && this.conf.icon !== '') {
var oImg=document.createElement('img');
oImg.className = 'state';
oImg.align = 'right';
oImg.src   = oGeneralProperties.path_iconsets + this.conf.icon;
oImg.alt   = this.stateText();
oLink.appendChild(oImg);
oImg = null;
}
var h3=document.createElement('h3');
h3.appendChild(document.createTextNode(this.conf.alias));
oLink.appendChild(h3);
h3 = null;
if(oPageProperties.showmapthumbs == 1 && this.conf.overview_image != '') {
oImg = document.createElement('img');
oImg.style.width = '200px';
oImg.style.height = '150px';
oImg.src = this.conf.overview_image;
oLink.appendChild(oImg);
oImg = null;
}
div.appendChild(oLink);
oLink = null;
return div;
}
});
var NagVisShape=NagVisStatelessObject.extend({
constructor: function(oConf) {
this.base(oConf);
},
parse: function () {
var oContainerDiv;
oContainerDiv = document.createElement('div');
oContainerDiv.setAttribute('id', this.conf.object_id);
oContainerDiv.appendChild(this.parseShape());
this.remove();
var oMap=document.getElementById('map');
if(oMap) {
this.parsedObject = oMap.appendChild(oContainerDiv);
oMap = null;
}
oContainerDiv = null;
if(!this.bIsLocked) {
this.parseControls();
this.toggleObjectActions(this.bIsLocked);
}
},
parseShape: function () {
var oIconDiv=document.createElement('div');
oIconDiv.setAttribute('id', this.conf.object_id+'-icondiv');
oIconDiv.setAttribute('class', 'icon');
oIconDiv.setAttribute('className', 'icon');
oIconDiv.style.top    = this.parseCoord(this.conf.y, 'y') + 'px';
oIconDiv.style.left   = this.parseCoord(this.conf.x, 'x') + 'px';
oIconDiv.style.zIndex = this.conf.z;
var oIcon=document.createElement('img');
oIcon.setAttribute('id', this.conf.object_id+'-icon');
var img_url=null;
if(this.conf.icon.match(/^\[(.*)\]$/)) {
img_url = this.conf.icon.replace(/^\[(.*)\]$/, '$1');
} else {
img_url = oGeneralProperties.path_shapes + this.conf.icon;
}
if(img_url.indexOf('?') !== -1) {
img_url += '&_t=' + iNow;
} else {
img_url += '?_t=' + iNow;
}
addZoomHandler(oIcon);
oIcon.src = img_url;
oIcon.alt = this.conf.type;
if(this.conf.url && this.conf.url !== '') {
var oIconLink=document.createElement('a');
oIconLink.href = this.conf.url;
oIconLink.target = this.conf.url_target;
oIconLink.appendChild(oIcon);
oIcon = null;
oIconDiv.appendChild(oIconLink);
oIconLink = null;
} else {
oIconDiv.appendChild(oIcon);
oIcon = null;
}
return oIconDiv;
},
parseHoverMenu: function () {
this.getHoverMenu(this.conf.object_id+'-icon');
},
parseShapeControls: function () {
makeDragable([this.conf.object_id+'-icondiv'], this.saveObject, this.moveObject);
},
toggleObjectActions: function(enable) {
var o=document.getElementById(this.conf.object_id+'-icon');
if(o) {
if(enable) {
if(o.parentNode.tagName == 'A')
o.parentNode.onclick = null;
} else if(!enable) {
if(o.parentNode.tagName == 'A')
o.parentNode.onclick = function() {return false};
}
o = null;
o = null;
}
}
});
var NagVisLine=NagVisStatelessObject.extend({
constructor: function(oConf) {
this.base(oConf);
},
parse: function () {
var oContainerDiv;
oContainerDiv = document.createElement('div');
oContainerDiv.setAttribute('id', this.conf.object_id);
var oLine=this.parseLine();
oContainerDiv.appendChild(oLine);
oShape = null;
var oMap=document.getElementById('map');
if(oMap) {
this.parsedObject = oMap.appendChild(oContainerDiv);
oMap = null;
}
oContainerDiv = null;
this.drawLine();
if(!this.bIsLocked) {
this.parseControls();
if(typeof(this.unlockLabel) == 'function')
this.unlockLabel();
this.toggleObjectActions(this.bIsLocked);
}
},
parseLine: function () {
var ret='';
var link='';
var oContainerDiv=document.createElement('div');
oContainerDiv.setAttribute('id', this.conf.object_id+'-linediv');
var oLineDiv=document.createElement('div');
oLineDiv.setAttribute('id', this.conf.object_id+'-line');
oLineDiv.style.zIndex = this.conf.z;
oContainerDiv.appendChild(oLineDiv);
oLineDiv = null;
this.parseLineHoverArea(oContainerDiv);
return oContainerDiv;
},
drawLine: function() {
var width=addZoomFactor(this.conf.line_width);
if(width <= 0)
width = 1; // minimal width for lines
var colorFill=this.conf.line_color;
var colorBorder=this.conf.line_color_border;
drawNagVisLine(this.conf.object_id, this.conf.line_type, this.lineCoords(),
this.conf.z, width, colorFill, null, null, colorBorder,
this.needsLineHoverArea(),
(this.conf.line_label_show && this.conf.line_label_show === '1'),
parseInt(this.conf.line_label_y_offset));
},
remove: function () {
if(!this.parsedObject)
return
var oMap=document.getElementById('map');
if(oMap)
oMap.removeChild(this.parsedObject);
this.parsedObject = null;
oMap = null;
},
parseHoverMenu: function () {
this.getHoverMenu(this.conf.object_id+'-linelink');
}
});
var NagVisTextbox=NagVisStatelessObject.extend({
constructor: function(oConf) {
this.base(oConf);
},
parse: function() {
var oContainerDiv;
this.replaceMacros();
oContainerDiv = document.createElement('div');
oContainerDiv.setAttribute('id', this.conf.object_id);
this.remove();
var oMap=document.getElementById('map');
if(oMap) {
this.parsedObject = oMap.appendChild(oContainerDiv);
oMap = null;
}
this.parseTextbox(oContainerDiv);
oContainerDiv = null;
if(!this.bIsLocked)
this.parseControls();
},
replaceMacros: function () {
this.conf.text = this.conf.text.replace('[refresh_counter]', '<font id="refreshCounter"></font>');
this.conf.text = this.conf.text.replace('[worker_last_run]', '<font id="workerLastRunCounter"></font>');
},
parseTextbox: function (oContainer) {
drawNagVisTextbox(
oContainer,
this.conf.object_id+'-label', 'box',
this.conf.background_color, this.conf.border_color,
this.parseCoord(this.conf.x, 'x'), this.parseCoord(this.conf.y, 'y'), this.conf.z, this.conf.w,
this.conf.h, this.conf.text, this.conf.style
);
},
parseBoxControls: function () {
var oBox=document.getElementById(this.conf.object_id+'-label');
oBox.setAttribute('class',     'box resizeMe');
oBox.setAttribute('className', 'box resizeMe');
oBox = null;
makeDragable([this.conf.object_id+'-label'], this.saveObject, this.moveObject);
},
removeBoxControls: function () {
var oBox=document.getElementById(this.conf.object_id+'-label');
oBox.setAttribute('class',     'box');
oBox.setAttribute('className', 'box');
oBox = null;
},
moveBox: function () {
var container=document.getElementById(this.conf.object_id + '-label');
container.style.top  = this.parseCoord(this.conf.y, 'y') + 'px';
container.style.left = this.parseCoord(this.conf.x, 'x') + 'px';
container = null;
}
});
var NagVisContainer=NagVisStatelessObject.extend({
constructor: function(oConf) {
this.base(oConf);
},
parse: function() {
var oContainerDiv=document.getElementById(this.conf.object_id);
if(!oContainerDiv) {
var oContainerDiv=document.createElement('div');
oContainerDiv.setAttribute('id', this.conf.object_id);
this.parseTextbox(oContainerDiv);
var oMap=document.getElementById('map');
if(oMap) {
this.parsedObject = oMap.appendChild(oContainerDiv);
oMap = null;
}
}
oContainerDiv = null;
var oTextbox=document.getElementById(this.conf.object_id +'-label');
if(oTextbox) {
var oSpan=oTextbox.childNodes[0];
if(oSpan) {
oSpan.style.display = 'block';
oSpan.style.height = '100%';
if(this.conf.view_type === 'inline') {
try {
oSpan.innerHTML = getSyncUrl(this.conf.url);
} catch(e) {
oSpan.innerHTML = e.toString();
}
} else {
oSpan.innerHTML = '';
var oIframe=document.createElement('iframe');
oIframe.style.borderWidth = 0;
oIframe.style.width  = '100%';
oIframe.style.height = '100%';
oIframe.src = this.conf.url;
oSpan.appendChild(oIframe);
oIframe = null;
}
oSpan = null;
}
oTextbox = null;
}
if(!this.bIsLocked)
this.parseControls();
},
parseTextbox: function (oContainer) {
drawNagVisTextbox(
oContainer,
this.conf.object_id+'-label', 'box',
this.conf.background_color, this.conf.border_color,
this.parseCoord(this.conf.x, 'x'), this.parseCoord(this.conf.y, 'y'), this.conf.z, this.conf.w,
this.conf.h, '', this.conf.style
);
},
parseBoxControls: function () {
var oBox=document.getElementById(this.conf.object_id+'-label');
if(oBox) {
oBox.setAttribute('class',     'box resizeMe');
oBox.setAttribute('className', 'box resizeMe');
oBox = null;
makeDragable([this.conf.object_id+'-label'], this.saveObject, this.moveObject);
}
},
removeBoxControls: function () {
var oBox=document.getElementById(this.conf.object_id+'-label');
if(oBox) {
oBox.setAttribute('class',     'box');
oBox.setAttribute('className', 'box');
oBox = null;
}
},
moveBox: function () {
var container=document.getElementById(this.conf.object_id + '-label');
if(container) {
container.style.top  = this.parseCoord(this.conf.y, 'y') + 'px';
container.style.left = this.parseCoord(this.conf.x, 'x') + 'px';
container = null;
}
}
});
var NagVisRotation=NagVisStatelessObject.extend({
constructor: function(oConf) {
this.base(oConf);
},
parseOverview: function() {
var container=document.getElementById('overviewRotations');
var oTable=document.createElement('table');
oTable.className = 'rotation';
container.appendChild(oTable);
var oTbody=document.createElement('tbody');
oTable.appendChild(oTbody);
var oTr=document.createElement('tr');
var oTd=document.createElement('td');
oTd.className = 'title';
oTd.setAttribute('rowSpan', this.conf.num_steps);
oTd.rowSpan = this.conf.num_steps;
var oLink=document.createElement('a');
oLink.href = this.conf.url;
var h3=document.createElement('h3');
h3.appendChild(document.createTextNode(this.conf.name));
oLink.appendChild(h3);
h3 = null;
oTd.appendChild(oLink);
oTr.appendChild(oTd);
oTd = null;
for(var i=0, len = this.conf.steps.length; i < len; i++) {
if(i !== 0)
oTr = document.createElement('tr');
oTd = document.createElement('td');
oLink = document.createElement('a');
oLink.href = this.conf.steps[i].url;
oLink.appendChild(document.createTextNode(this.conf.steps[i].name));
oTd.appendChild(oLink);
oLink = null;
oTr.appendChild(oTd);
oTd = null;
oTbody.appendChild(oTr);
oTr = null;
}
container = null;
}
});
var jg_ok, jg_ie, jg_fast, jg_dom, jg_moz;
function _chkDHTM(wnd, x, i)
{
x = wnd.document.body || null;
jg_ie = x && typeof x.insertAdjacentHTML != "undefined" && wnd.document.createElement;
jg_dom = (x && !jg_ie &&
typeof x.appendChild != "undefined" &&
typeof wnd.document.createRange != "undefined" &&
typeof (i = wnd.document.createRange()).setStartBefore != "undefined" &&
typeof i.createContextualFragment != "undefined");
jg_fast = jg_ie && wnd.document.all && !wnd.opera;
jg_moz = jg_dom && typeof x.style.MozOpacity != "undefined";
jg_ok = !!(jg_ie || jg_dom);
}
function _pntCnvDom()
{
var x=this.wnd.document.createRange();
x.setStartBefore(this.cnv);
x = x.createContextualFragment(jg_fast? this._htmRpc() : this.htm);
if(this.cnv) this.cnv.appendChild(x);
this.htm = "";
}
function _pntCnvIe()
{
if(this.cnv) this.cnv.insertAdjacentHTML("BeforeEnd", jg_fast? this._htmRpc() : this.htm);
this.htm = "";
}
function _pntDoc()
{
this.wnd.document.write(jg_fast? this._htmRpc() : this.htm);
this.htm = '';
}
function _pntN() {
}
function _mkDiv(x, y, w, h)
{
this.htm += '<div style="position:absolute;'+
'left:' + x + 'px;'+
'top:' + y + 'px;'+
'width:' + w + 'px;'+
'height:' + h + 'px;'+
'clip:rect(0,'+w+'px,'+h+'px,0);'+
'background-color:' + this.color +
(!jg_moz? ';overflow:hidden' : '')+
';"><\/div>';
}
function _mkDivIe(x, y, w, h)
{
this.htm += '%%'+this.color+';'+x+';'+y+';'+w+';'+h+';';
}
function _mkDivPrt(x, y, w, h)
{
this.htm += '<div style="position:absolute;'+
'border-left:' + w + 'px solid ' + this.color + ';'+
'left:' + x + 'px;'+
'top:' + y + 'px;'+
'width:0px;'+
'height:' + h + 'px;'+
'clip:rect(0,'+w+'px,'+h+'px,0);'+
'background-color:' + this.color +
(!jg_moz? ';overflow:hidden' : '')+
';"><\/div>';
}
var _regex=/%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g;
function _htmRpc()
{
return this.htm.replace(
_regex,
'<div style="overflow:hidden;position:absolute;background-color:'+
'$1;left:$2px;top:$3px;width:$4px;height:$5px"></div>\n');
}
function _htmPrtRpc()
{
return this.htm.replace(
_regex,
'<div style="overflow:hidden;position:absolute;background-color:'+
'$1;left:$2px;top:$3px;width:$4px;height:$5px;border-left:$4px solid $1"></div>\n');
}
function _mkLin(x1, y1, x2, y2)
{
if(x1 > x2)
{
var _x2=x2;
var _y2=y2;
x2 = x1;
y2 = y1;
x1 = _x2;
y1 = _y2;
}
var dx=x2-x1, dy = Math.abs(y2-y1),
x = x1, y = y1,
yIncr = (y1 > y2)? -1 : 1;
if(dx >= dy)
{
var pr=dy<<1,
pru = pr - (dx<<1),
p = pr-dx,
ox = x;
while(dx > 0)
{--dx;
++x;
if(p > 0)
{
this._mkDiv(ox, y, x-ox, 1);
y += yIncr;
p += pru;
ox = x;
}
else p += pr;
}
this._mkDiv(ox, y, x2-ox+1, 1);
}
else
{
var pr=dx<<1,
pru = pr - (dy<<1),
p = pr-dy,
oy = y;
if(y2 <= y1)
{
while(dy > 0)
{--dy;
if(p > 0)
{
this._mkDiv(x++, y, 1, oy-y+1);
y += yIncr;
p += pru;
oy = y;
}
else
{
y += yIncr;
p += pr;
}
}
this._mkDiv(x2, y2, 1, oy-y2+1);
}
else
{
while(dy > 0)
{--dy;
y += yIncr;
if(p > 0)
{
this._mkDiv(x++, oy, 1, y-oy);
p += pru;
oy = y;
}
else p += pr;
}
this._mkDiv(x2, oy, 1, y2-oy+1);
}
}
}
function _mkLin2D(x1, y1, x2, y2)
{
if(x1 > x2)
{
var _x2=x2;
var _y2=y2;
x2 = x1;
y2 = y1;
x1 = _x2;
y1 = _y2;
}
var dx=x2-x1, dy = Math.abs(y2-y1),
x = x1, y = y1,
yIncr = (y1 > y2)? -1 : 1;
var s=this.stroke;
if(dx >= dy)
{
if(dx > 0 && s-3 > 0)
{
var _s=(s*dx*Math.sqrt(1+dy*dy/(dx*dx))-dx-(s>>1)*dy) / dx;
_s = (!(s-4)? Math.ceil(_s) : Math.round(_s)) + 1;
}
else var _s=s;
var ad=Math.ceil(s/2);
var pr=dy<<1,
pru = pr - (dx<<1),
p = pr-dx,
ox = x;
while(dx > 0)
{--dx;
++x;
if(p > 0)
{
this._mkDiv(ox, y, x-ox+ad, _s);
y += yIncr;
p += pru;
ox = x;
}
else p += pr;
}
this._mkDiv(ox, y, x2-ox+ad+1, _s);
}
else
{
if(s-3 > 0)
{
var _s=(s*dy*Math.sqrt(1+dx*dx/(dy*dy))-(s>>1)*dx-dy) / dy;
_s = (!(s-4)? Math.ceil(_s) : Math.round(_s)) + 1;
}
else var _s=s;
var ad=Math.round(s/2);
var pr=dx<<1,
pru = pr - (dy<<1),
p = pr-dy,
oy = y;
if(y2 <= y1)
{
++ad;
while(dy > 0)
{--dy;
if(p > 0)
{
this._mkDiv(x++, y, _s, oy-y+ad);
y += yIncr;
p += pru;
oy = y;
}
else
{
y += yIncr;
p += pr;
}
}
this._mkDiv(x2, y2, _s, oy-y2+ad);
}
else
{
while(dy > 0)
{--dy;
y += yIncr;
if(p > 0)
{
this._mkDiv(x++, oy, _s, y-oy+ad);
p += pru;
oy = y;
}
else p += pr;
}
this._mkDiv(x2, oy, _s, y2-oy+ad+1);
}
}
}
function _mkLinDott(x1, y1, x2, y2)
{
if(x1 > x2)
{
var _x2=x2;
var _y2=y2;
x2 = x1;
y2 = y1;
x1 = _x2;
y1 = _y2;
}
var dx=x2-x1, dy = Math.abs(y2-y1),
x = x1, y = y1,
yIncr = (y1 > y2)? -1 : 1,
drw = true;
if(dx >= dy)
{
var pr=dy<<1,
pru = pr - (dx<<1),
p = pr-dx;
while(dx > 0)
{--dx;
if(drw) this._mkDiv(x, y, 1, 1);
drw = !drw;
if(p > 0)
{
y += yIncr;
p += pru;
}
else p += pr;
++x;
}
}
else
{
var pr=dx<<1,
pru = pr - (dy<<1),
p = pr-dy;
while(dy > 0)
{--dy;
if(drw) this._mkDiv(x, y, 1, 1);
drw = !drw;
y += yIncr;
if(p > 0)
{
++x;
p += pru;
}
else p += pr;
}
}
if(drw) this._mkDiv(x, y, 1, 1);
}
function _mkOv(left, top, width, height)
{
var a=(++width)>>1, b = (++height)>>1,
wod = width&1, hod = height&1,
cx = left+a, cy = top+b,
x = 0, y = b,
ox = 0, oy = b,
aa2 = (a*a)<<1, aa4 = aa2<<1, bb2 = (b*b)<<1, bb4 = bb2<<1,
st = (aa2>>1)*(1-(b<<1)) + bb2,
tt = (bb2>>1) - aa2*((b<<1)-1),
w, h;
while(y > 0)
{
if(st < 0)
{
st += bb2*((x<<1)+3);
tt += bb4*(++x);
}
else if(tt < 0)
{
st += bb2*((x<<1)+3) - aa4*(y-1);
tt += bb4*(++x) - aa2*(((y--)<<1)-3);
w = x-ox;
h = oy-y;
if((w&2) && (h&2))
{
this._mkOvQds(cx, cy, x-2, y+2, 1, 1, wod, hod);
this._mkOvQds(cx, cy, x-1, y+1, 1, 1, wod, hod);
}
else this._mkOvQds(cx, cy, x-1, oy, w, h, wod, hod);
ox = x;
oy = y;
}
else
{
tt -= aa2*((y<<1)-3);
st -= aa4*(--y);
}
}
w = a-ox+1;
h = (oy<<1)+hod;
y = cy-oy;
this._mkDiv(cx-a, y, w, h);
this._mkDiv(cx+ox+wod-1, y, w, h);
}
function _mkOv2D(left, top, width, height)
{
var s=this.stroke;
width += s+1;
height += s+1;
var a=width>>1, b = height>>1,
wod = width&1, hod = height&1,
cx = left+a, cy = top+b,
x = 0, y = b,
aa2 = (a*a)<<1, aa4 = aa2<<1, bb2 = (b*b)<<1, bb4 = bb2<<1,
st = (aa2>>1)*(1-(b<<1)) + bb2,
tt = (bb2>>1) - aa2*((b<<1)-1);
if(s-4 < 0 && (!(s-2) || width-51 > 0 && height-51 > 0))
{
var ox=0, oy = b,
w, h,
pxw;
while(y > 0)
{
if(st < 0)
{
st += bb2*((x<<1)+3);
tt += bb4*(++x);
}
else if(tt < 0)
{
st += bb2*((x<<1)+3) - aa4*(y-1);
tt += bb4*(++x) - aa2*(((y--)<<1)-3);
w = x-ox;
h = oy-y;
if(w-1)
{
pxw = w+1+(s&1);
h = s;
}
else if(h-1)
{
pxw = s;
h += 1+(s&1);
}
else pxw = h = s;
this._mkOvQds(cx, cy, x-1, oy, pxw, h, wod, hod);
ox = x;
oy = y;
}
else
{
tt -= aa2*((y<<1)-3);
st -= aa4*(--y);
}
}
this._mkDiv(cx-a, cy-oy, s, (oy<<1)+hod);
this._mkDiv(cx+a+wod-s, cy-oy, s, (oy<<1)+hod);
}
else
{
var _a=(width-(s<<1))>>1,
_b = (height-(s<<1))>>1,
_x = 0, _y = _b,
_aa2 = (_a*_a)<<1, _aa4 = _aa2<<1, _bb2 = (_b*_b)<<1, _bb4 = _bb2<<1,
_st = (_aa2>>1)*(1-(_b<<1)) + _bb2,
_tt = (_bb2>>1) - _aa2*((_b<<1)-1),
pxl = new Array(),
pxt = new Array(),
_pxb = new Array();
pxl[0] = 0;
pxt[0] = b;
_pxb[0] = _b-1;
while(y > 0)
{
if(st < 0)
{
pxl[pxl.length] = x;
pxt[pxt.length] = y;
st += bb2*((x<<1)+3);
tt += bb4*(++x);
}
else if(tt < 0)
{
pxl[pxl.length] = x;
st += bb2*((x<<1)+3) - aa4*(y-1);
tt += bb4*(++x) - aa2*(((y--)<<1)-3);
pxt[pxt.length] = y;
}
else
{
tt -= aa2*((y<<1)-3);
st -= aa4*(--y);
}
if(_y > 0)
{
if(_st < 0)
{
_st += _bb2*((_x<<1)+3);
_tt += _bb4*(++_x);
_pxb[_pxb.length] = _y-1;
}
else if(_tt < 0)
{
_st += _bb2*((_x<<1)+3) - _aa4*(_y-1);
_tt += _bb4*(++_x) - _aa2*(((_y--)<<1)-3);
_pxb[_pxb.length] = _y-1;
}
else
{
_tt -= _aa2*((_y<<1)-3);
_st -= _aa4*(--_y);
_pxb[_pxb.length-1]--;
}
}
}
var ox=-wod, oy = b,
_oy = _pxb[0],
l = pxl.length,
w, h;
for(var i=0; i < l; i++)
{
if(typeof _pxb[i] != "undefined")
{
if(_pxb[i] < _oy || pxt[i] < oy)
{
x = pxl[i];
this._mkOvQds(cx, cy, x, oy, x-ox, oy-_oy, wod, hod);
ox = x;
oy = pxt[i];
_oy = _pxb[i];
}
}
else
{
x = pxl[i];
this._mkDiv(cx-x, cy-oy, 1, (oy<<1)+hod);
this._mkDiv(cx+ox+wod, cy-oy, 1, (oy<<1)+hod);
ox = x;
oy = pxt[i];
}
}
this._mkDiv(cx-a, cy-oy, 1, (oy<<1)+hod);
this._mkDiv(cx+ox+wod, cy-oy, 1, (oy<<1)+hod);
}
}
function _mkOvDott(left, top, width, height)
{
var a=(++width)>>1, b = (++height)>>1,
wod = width&1, hod = height&1, hodu = hod^1,
cx = left+a, cy = top+b,
x = 0, y = b,
aa2 = (a*a)<<1, aa4 = aa2<<1, bb2 = (b*b)<<1, bb4 = bb2<<1,
st = (aa2>>1)*(1-(b<<1)) + bb2,
tt = (bb2>>1) - aa2*((b<<1)-1),
drw = true;
while(y > 0)
{
if(st < 0)
{
st += bb2*((x<<1)+3);
tt += bb4*(++x);
}
else if(tt < 0)
{
st += bb2*((x<<1)+3) - aa4*(y-1);
tt += bb4*(++x) - aa2*(((y--)<<1)-3);
}
else
{
tt -= aa2*((y<<1)-3);
st -= aa4*(--y);
}
if(drw && y >= hodu) this._mkOvQds(cx, cy, x, y, 1, 1, wod, hod);
drw = !drw;
}
}
function _mkRect(x, y, w, h)
{
var s=this.stroke;
this._mkDiv(x, y, w, s);
this._mkDiv(x+w, y, s, h);
this._mkDiv(x, y+h, w+s, s);
this._mkDiv(x, y+s, s, h-s);
}
function _mkRectDott(x, y, w, h)
{
this.drawLine(x, y, x+w, y);
this.drawLine(x+w, y, x+w, y+h);
this.drawLine(x, y+h, x+w, y+h);
this.drawLine(x, y, x, y+h);
}
function jsgFont()
{
this.PLAIN = 'font-weight:normal;';
this.BOLD = 'font-weight:bold;';
this.ITALIC = 'font-style:italic;';
this.ITALIC_BOLD = this.ITALIC + this.BOLD;
this.BOLD_ITALIC = this.ITALIC_BOLD;
}
var Font=new jsgFont();
function jsgStroke()
{
this.DOTTED = -1;
}
var Stroke=new jsgStroke();
function jsGraphics(cnv, wnd)
{
this.setColor = function(x)
{
this.color = x.toLowerCase();
};
this.setStroke = function(x)
{
this.stroke = x;
if(!(x+1))
{
this.drawLine = _mkLinDott;
this._mkOv = _mkOvDott;
this.drawRect = _mkRectDott;
}
else if(x-1 > 0)
{
this.drawLine = _mkLin2D;
this._mkOv = _mkOv2D;
this.drawRect = _mkRect;
}
else
{
this.drawLine = _mkLin;
this._mkOv = _mkOv;
this.drawRect = _mkRect;
}
};
this.setPrintable = function(arg)
{
this.printable = arg;
if(jg_fast)
{
this._mkDiv = _mkDivIe;
this._htmRpc = arg? _htmPrtRpc : _htmRpc;
}
else this._mkDiv = arg? _mkDivPrt : _mkDiv;
};
this.setFont = function(fam, sz, sty)
{
this.ftFam = fam;
this.ftSz = sz;
this.ftSty = sty || Font.PLAIN;
};
this.drawPolyline = this.drawPolyLine = function(x, y)
{
for (var i=x.length - 1; i;)
{--i;
this.drawLine(x[i], y[i], x[i+1], y[i+1]);
}
};
this.fillRect = function(x, y, w, h)
{
this._mkDiv(x, y, w, h);
};
this.drawPolygon = function(x, y)
{
this.drawPolyline(x, y);
this.drawLine(x[x.length-1], y[x.length-1], x[0], y[0]);
};
this.drawEllipse = this.drawOval = function(x, y, w, h)
{
this._mkOv(x, y, w, h);
};
this.fillEllipse = this.fillOval = function(left, top, w, h)
{
var a=w>>1, b = h>>1,
wod = w&1, hod = h&1,
cx = left+a, cy = top+b,
x = 0, y = b, oy = b,
aa2 = (a*a)<<1, aa4 = aa2<<1, bb2 = (b*b)<<1, bb4 = bb2<<1,
st = (aa2>>1)*(1-(b<<1)) + bb2,
tt = (bb2>>1) - aa2*((b<<1)-1),
xl, dw, dh;
if(w) while(y > 0)
{
if(st < 0)
{
st += bb2*((x<<1)+3);
tt += bb4*(++x);
}
else if(tt < 0)
{
st += bb2*((x<<1)+3) - aa4*(y-1);
xl = cx-x;
dw = (x<<1)+wod;
tt += bb4*(++x) - aa2*(((y--)<<1)-3);
dh = oy-y;
this._mkDiv(xl, cy-oy, dw, dh);
this._mkDiv(xl, cy+y+hod, dw, dh);
oy = y;
}
else
{
tt -= aa2*((y<<1)-3);
st -= aa4*(--y);
}
}
this._mkDiv(cx-a, cy-oy, w, (oy<<1)+hod);
};
this.fillArc = function(iL, iT, iW, iH, fAngA, fAngZ)
{
var a=iW>>1, b = iH>>1,
iOdds = (iW&1) | ((iH&1) << 16),
cx = iL+a, cy = iT+b,
x = 0, y = b, ox = x, oy = y,
aa2 = (a*a)<<1, aa4 = aa2<<1, bb2 = (b*b)<<1, bb4 = bb2<<1,
st = (aa2>>1)*(1-(b<<1)) + bb2,
tt = (bb2>>1) - aa2*((b<<1)-1),
xEndA, yEndA, xEndZ, yEndZ,
iSects = (1 << (Math.floor((fAngA %= 360.0)/180.0) << 3))
| (2 << (Math.floor((fAngZ %= 360.0)/180.0) << 3))
| ((fAngA >= fAngZ) << 16),
aBndA = new Array(b+1), aBndZ = new Array(b+1);
fAngA *= Math.PI/180.0;
fAngZ *= Math.PI/180.0;
xEndA = cx+Math.round(a*Math.cos(fAngA));
yEndA = cy+Math.round(-b*Math.sin(fAngA));
_mkLinVirt(aBndA, cx, cy, xEndA, yEndA);
xEndZ = cx+Math.round(a*Math.cos(fAngZ));
yEndZ = cy+Math.round(-b*Math.sin(fAngZ));
_mkLinVirt(aBndZ, cx, cy, xEndZ, yEndZ);
while(y > 0)
{
if(st < 0) // Advance x
{
st += bb2*((x<<1)+3);
tt += bb4*(++x);
}
else if(tt < 0) // Advance x and y
{
st += bb2*((x<<1)+3) - aa4*(y-1);
ox = x;
tt += bb4*(++x) - aa2*(((y--)<<1)-3);
this._mkArcDiv(ox, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
oy = y;
}
else // Advance y
{
tt -= aa2*((y<<1)-3);
st -= aa4*(--y);
if(y && (aBndA[y] != aBndA[y-1] || aBndZ[y] != aBndZ[y-1]))
{
this._mkArcDiv(x, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
ox = x;
oy = y;
}
}
}
this._mkArcDiv(x, 0, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
if(iOdds >> 16) // Odd height
{
if(iSects >> 16) // Start-angle > end-angle
{
var xl=(yEndA <= cy || yEndZ > cy)? (cx - x) : cx;
this._mkDiv(xl, cy, x + cx - xl + (iOdds & 0xffff), 1);
}
else if((iSects & 0x01) && yEndZ > cy)
this._mkDiv(cx - x, cy, x, 1);
}
};
this.fillPolygon = function(array_x, array_y)
{
var i;
var y;
var miny, maxy;
var x1, y1;
var x2, y2;
var ind1, ind2;
var ints;
var n=array_x.length;
if(!n) return;
miny = array_y[0];
maxy = array_y[0];
for(i = 1; i < n; i++)
{
if(array_y[i] < miny)
miny = array_y[i];
if(array_y[i] > maxy)
maxy = array_y[i];
}
for(y = miny; y <= maxy; y++)
{
var polyInts=new Array();
ints = 0;
for(i = 0; i < n; i++)
{
if(!i)
{
ind1 = n-1;
ind2 = 0;
}
else
{
ind1 = i-1;
ind2 = i;
}
y1 = array_y[ind1];
y2 = array_y[ind2];
if(y1 < y2)
{
x1 = array_x[ind1];
x2 = array_x[ind2];
}
else if(y1 > y2)
{
y2 = array_y[ind1];
y1 = array_y[ind2];
x2 = array_x[ind1];
x1 = array_x[ind2];
}
else continue;
if((y >= y1) && (y < y2))
polyInts[ints++] = Math.round((y-y1) * (x2-x1) / (y2-y1) + x1);
else if((y == maxy) && (y > y1) && (y <= y2))
polyInts[ints++] = Math.round((y-y1) * (x2-x1) / (y2-y1) + x1);
}
polyInts.sort(_CompInt);
for(i = 0; i < ints; i+=2)
this._mkDiv(polyInts[i], y, polyInts[i+1]-polyInts[i]+1, 1);
}
};
this.drawString = function(txt, x, y)
{
this.htm += '<div style="position:absolute;white-space:nowrap;'+
'left:' + x + 'px;'+
'top:' + y + 'px;'+
'font-family:' +  this.ftFam + ';'+
'font-size:' + this.ftSz + ';'+
'color:' + this.color + ';' + this.ftSty + '">'+
txt +
'<\/div>';
};
this.drawStringRect = function(txt, x, y, width, halign)
{
this.htm += '<div style="position:absolute;overflow:hidden;'+
'left:' + x + 'px;'+
'top:' + y + 'px;'+
'width:'+width +'px;'+
'text-align:'+halign+';'+
'font-family:' +  this.ftFam + ';'+
'font-size:' + this.ftSz + ';'+
'color:' + this.color + ';' + this.ftSty + '">'+
txt +
'<\/div>';
};
this.drawImage = function(imgSrc, x, y, w, h, a)
{
this.htm += '<div style="position:absolute;'+
'left:' + x + 'px;'+
'top:' + y + 'px;'+
(w? ('width:' +  w + 'px;') : '') +
(h? ('height:' + h + 'px;'):'')+'">'+
'<img src="' + imgSrc +'"'+ (w ? (' width="' + w + '"'):'')+ (h ? (' height="' + h + '"'):'') + (a? (' '+a) : '') + '>'+
'<\/div>';
};
this.clear = function()
{
this.htm = "";
if(this.cnv) this.cnv.innerHTML = "";
};
this._mkOvQds = function(cx, cy, x, y, w, h, wod, hod)
{
var xl=cx - x, xr = cx + x + wod - w, yt = cy - y, yb = cy + y + hod - h;
if(xr > xl+w)
{
this._mkDiv(xr, yt, w, h);
this._mkDiv(xr, yb, w, h);
}
else
w = xr - xl + w;
this._mkDiv(xl, yt, w, h);
this._mkDiv(xl, yb, w, h);
};
this._mkArcDiv = function(x, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects)
{
var xrDef=cx + x + (iOdds & 0xffff), y2, h = oy - y, xl, xr, w;
if(!h) h = 1;
x = cx - x;
if(iSects & 0xff0000) // Start-angle > end-angle
{
y2 = cy - y - h;
if(iSects & 0x00ff)
{
if(iSects & 0x02)
{
xl = Math.max(x, aBndZ[y]);
w = xrDef - xl;
if(w > 0) this._mkDiv(xl, y2, w, h);
}
if(iSects & 0x01)
{
xr = Math.min(xrDef, aBndA[y]);
w = xr - x;
if(w > 0) this._mkDiv(x, y2, w, h);
}
}
else
this._mkDiv(x, y2, xrDef - x, h);
y2 = cy + y + (iOdds >> 16);
if(iSects & 0xff00)
{
if(iSects & 0x0100)
{
xl = Math.max(x, aBndA[y]);
w = xrDef - xl;
if(w > 0) this._mkDiv(xl, y2, w, h);
}
if(iSects & 0x0200)
{
xr = Math.min(xrDef, aBndZ[y]);
w = xr - x;
if(w > 0) this._mkDiv(x, y2, w, h);
}
}
else
this._mkDiv(x, y2, xrDef - x, h);
}
else
{
if(iSects & 0x00ff)
{
if(iSects & 0x02)
xl = Math.max(x, aBndZ[y]);
else
xl = x;
if(iSects & 0x01)
xr = Math.min(xrDef, aBndA[y]);
else
xr = xrDef;
y2 = cy - y - h;
w = xr - xl;
if(w > 0) this._mkDiv(xl, y2, w, h);
}
if(iSects & 0xff00)
{
if(iSects & 0x0100)
xl = Math.max(x, aBndA[y]);
else
xl = x;
if(iSects & 0x0200)
xr = Math.min(xrDef, aBndZ[y]);
else
xr = xrDef;
y2 = cy + y + (iOdds >> 16);
w = xr - xl;
if(w > 0) this._mkDiv(xl, y2, w, h);
}
}
};
this.setStroke(1);
this.setFont("verdana,geneva,helvetica,sans-serif", "12px", Font.PLAIN);
this.color = "#000000";
this.htm = "";
this.wnd = wnd || window;
if(!jg_ok) _chkDHTM(this.wnd);
if(jg_ok)
{
if(cnv)
{
if(typeof(cnv) == "string")
this.cont = document.all? (this.wnd.document.all[cnv] || null)
: document.getElementById? (this.wnd.document.getElementById(cnv) || null)
: null;
else if(cnv == window.document)
this.cont = document.getElementsByTagName("body")[0];
else this.cont = cnv;
this.cnv = this.wnd.document.createElement("div");
this.cnv.style.fontSize=0;
this.cont.appendChild(this.cnv);
this.paint = jg_dom? _pntCnvDom : _pntCnvIe;
}
else
this.paint = _pntDoc;
}
else
this.paint = _pntN;
this.setPrintable(false);
}
function _mkLinVirt(aLin, x1, y1, x2, y2)
{
var dx=Math.abs(x2-x1), dy = Math.abs(y2-y1),
x = x1, y = y1,
xIncr = (x1 > x2)? -1 : 1,
yIncr = (y1 > y2)? -1 : 1,
p,
i = 0;
if(dx >= dy)
{
var pr=dy<<1,
pru = pr - (dx<<1);
p = pr-dx;
while(dx > 0)
{--dx;
if(p > 0)    //  Increment y
{
aLin[i++] = x;
y += yIncr;
p += pru;
}
else p += pr;
x += xIncr;
}
}
else
{
var pr=dx<<1,
pru = pr - (dy<<1);
p = pr-dy;
while(dy > 0)
{--dy;
y += yIncr;
aLin[i++] = x;
if(p > 0)    //  Increment x
{
x += xIncr;
p += pru;
}
else p += pr;
}
}
for(var len=aLin.length, i = len-i; i;)
aLin[len-(i--)] = x;
};
function _CompInt(x, y)
{
return(x - y);
}
var resizeObj=null; //This gets a value as soon as a resize start
function resizeObject() {
this.el        = null; //pointer to the object
this.dir    = "";      //type of current resize (n, s, e, w, ne, nw, se, sw)
this.grabx = null;     //Some useful values
this.graby = null;
this.width = null;
this.height = null;
this.left = null;
this.top = null;
}
function getDirection(event, el) {
var xPos, yPos, offset, dir;
dir = "";
xPos = event.layerX ? event.layerX : event.offsetX ? event.offsetX : 0;
yPos = event.layerY ? event.layerY : event.offsetY ? event.offsetY : 0;
offset = 8;
if (yPos < offset) {
dir += "n";
}	else if (yPos > el.offsetHeight - offset) {
dir += "s";
}
if(xPos < offset) {
dir += "w";
}	else if (xPos > el.offsetWidth - offset) {
dir += "e";
}
return dir;
}
function doDown(event) {
if (event === null || typeof event === 'undefined') {
event = window.event;
}
if(typeof event.target != 'undefined' && event.target !== null) {
target = event.target;
} else {
target = event.srcElement;
}
var el=getReal(target, "className", "resizeMe");
if(el == null || el.id == '') {
resizeObj = null;
return;
}
if(el.className.indexOf("resizeMe") !== -1) {
dir = getDirection(event, el);
if (dir == "") return;
draggingEnabled = false;
draggingObject = null;
resizeObj = new resizeObject();
resizeObj.el = el;
resizeObj.dir = dir;
resizeObj.grabx  = event.clientX;
resizeObj.graby  = event.clientY;
resizeObj.width  = el.offsetWidth;
resizeObj.height = el.offsetHeight;
resizeObj.left   = el.offsetLeft;
resizeObj.top    = el.offsetTop;
event.returnValue = false;
event.cancelBubble = true;
}
}
function doUp(event) {
if (event === null || typeof event === 'undefined') {
event = window.event;
}
if(resizeObj != null) {
draggingEnabled = true;
draggingObject = null;
saveObjectAfterResize(resizeObj.el);
resizeObj = null;
event.returnValue = false;
event.cancelBubble = true;
}
return false;
}
function doMove(event) {
if (event === null || typeof event === 'undefined') {
event = window.event;
}
if(typeof event.target != 'undefined' && event.target !== null) {
target = event.target;
} else {
target = event.srcElement;
}
var el, xPos, yPos, xMin, yMin;
xMin = 8;
yMin = 8;
el = getReal(target, "className", "resizeMe");
if(!isset(el.className))
return;
if(el.className.indexOf("resizeMe") !== -1) {
var str=getDirection(event, el);
if (str == "") str = "default";
else str += "-resize";
el.style.cursor = str;
str = null;
}
if(resizeObj != null) {
if(resizeObj.dir.indexOf("e") != -1)
resizeObj.el.style.width = Math.max(xMin, resizeObj.width + event.clientX - resizeObj.grabx) + "px";
if(resizeObj.dir.indexOf("s") != -1) {
resizeObj.el.style.height = Math.max(yMin, resizeObj.height + event.clientY - resizeObj.graby) + "px";
}
if(resizeObj.dir.indexOf("w") != -1) {
resizeObj.el.style.left = Math.min(resizeObj.left + event.clientX - resizeObj.grabx, resizeObj.left + resizeObj.width - xMin) + "px";
resizeObj.el.style.width = Math.max(xMin, resizeObj.width - event.clientX + resizeObj.grabx) + "px";
}
if(resizeObj.dir.indexOf("n") != -1) {
resizeObj.el.style.top = Math.min(resizeObj.top + event.clientY - resizeObj.graby, resizeObj.top + resizeObj.height - yMin) + "px";
resizeObj.el.style.height = Math.max(yMin, resizeObj.height - event.clientY + resizeObj.graby) + "px";
}
event.returnValue = false;
event.cancelBubble = true;
}
return false;
}
function getReal(el, type, value) {
temp = el;
while(isset(temp) && temp != null && temp.tagName != "BODY") {
var o=temp[type];
if(isset(o) && o.indexOf(value) !== -1) {
el = temp;
return el;
}
o = null;
temp = temp.parentElement;
}
return el;
}
addEvent(document, "mousedown", doDown);
addEvent(document, "mouseup",   doUp);
addEvent(document, "mousemove", doMove);
var jscolor={
dir : '', // location of jscolor directory (leave empty to autodetect)
bindClass : 'color', // class name
binding : false, // automatic binding via <input class="...">
preloading : true, // use image preloading?
install : function() {
jscolor.addEvent(window, 'load', jscolor.init);
},
init : function() {
if(jscolor.binding) {
jscolor.bind();
}
if(jscolor.preloading) {
jscolor.preload();
}
},
getDir : function() {
if(!jscolor.dir) {
var detected=jscolor.detectDir();
jscolor.dir = detected!==false ? detected : 'jscolor/';
}
return jscolor.dir;
},
detectDir : function() {
var base=location.href;
var e=document.getElementsByTagName('base');
for(var i=0; i<e.length; i+=1) {
if(e[i].href) { base = e[i].href; }
}
var e=document.getElementsByTagName('script');
for(var i=0; i<e.length; i+=1) {
if(e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
var src=new jscolor.URI(e[i].src);
var srcAbs=src.toAbsolute(base);
srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
srcAbs.query = null;
srcAbs.fragment = null;
return srcAbs.toString();
}
}
return false;
},
bind : function() {
var matchClass=new RegExp('(^|\\s)('+jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
var e=document.getElementsByTagName('input');
for(var i=0; i<e.length; i+=1) {
var m;
if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
var prop={};
if(m[3]) {
try {
eval('prop='+m[3]);
} catch(eInvalidProp) {}
}
e[i].color = new jscolor.color(e[i], prop);
}
}
},
preload : function() {
for(var fn in jscolor.imgRequire) {
if(jscolor.imgRequire.hasOwnProperty(fn)) {
jscolor.loadImage(fn);
}
}
},
images : {
pad : [ 181, 101 ],
sld : [ 16, 101 ],
cross : [ 15, 15 ],
arrow : [ 7, 11 ]
},
imgRequire : {},
imgLoaded : {},
requireImage : function(filename) {
jscolor.imgRequire[filename] = true;
},
loadImage : function(filename) {
if(!jscolor.imgLoaded[filename]) {
jscolor.imgLoaded[filename] = new Image();
jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
}
},
fetchElement : function(mixed) {
return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
},
addEvent : function(el, evnt, func) {
if(el.addEventListener) {
el.addEventListener(evnt, func, false);
} else if(el.attachEvent) {
el.attachEvent('on'+evnt, func);
}
},
fireEvent : function(el, evnt) {
if(!el) {
return;
}
if(document.createEvent) {
var ev=document.createEvent('HTMLEvents');
ev.initEvent(evnt, true, true);
el.dispatchEvent(ev);
} else if(document.createEventObject) {
var ev=document.createEventObject();
el.fireEvent('on'+evnt, ev);
} else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
el['on'+evnt]();
}
},
getElementPos : function(e) {
var e1=e, e2=e;
var x=0, y=0;
if(e1.offsetParent) {
do {
x += e1.offsetLeft;
y += e1.offsetTop;
} while(e1 = e1.offsetParent);
}
while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
x -= e2.scrollLeft;
y -= e2.scrollTop;
}
return [x, y];
},
getElementSize : function(e) {
return [e.offsetWidth, e.offsetHeight];
},
getRelMousePos : function(e) {
var x=0, y = 0;
if (!e) { e = window.event; }
if (typeof e.offsetX === 'number') {
x = e.offsetX;
y = e.offsetY;
} else if (typeof e.layerX === 'number') {
x = e.layerX;
y = e.layerY;
}
return { x: x, y: y };
},
getViewPos : function() {
if(typeof window.pageYOffset === 'number') {
return [window.pageXOffset, window.pageYOffset];
} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
return [document.body.scrollLeft, document.body.scrollTop];
} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
} else {
return [0, 0];
}
},
getViewSize : function() {
if(typeof window.innerWidth === 'number') {
return [window.innerWidth, window.innerHeight];
} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
return [document.body.clientWidth, document.body.clientHeight];
} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
return [document.documentElement.clientWidth, document.documentElement.clientHeight];
} else {
return [0, 0];
}
},
URI : function(uri) { // See RFC3986
this.scheme = null;
this.authority = null;
this.path = '';
this.query = null;
this.fragment = null;
this.parse = function(uri) {
var m=uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
this.scheme = m[3] ? m[2] : null;
this.authority = m[5] ? m[6] : null;
this.path = m[7];
this.query = m[9] ? m[10] : null;
this.fragment = m[12] ? m[13] : null;
return this;
};
this.toString = function() {
var result='';
if(this.scheme !== null) { result = result + this.scheme + ':'; }
if(this.authority !== null) { result = result + '//' + this.authority; }
if(this.path !== null) { result = result + this.path; }
if(this.query !== null) { result = result + '?' + this.query; }
if(this.fragment !== null) { result = result + '#' + this.fragment; }
return result;
};
this.toAbsolute = function(base) {
var base=new jscolor.URI(base);
var r=this;
var t=new jscolor.URI;
if(base.scheme === null) { return false; }
if(r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
r.scheme = null;
}
if(r.scheme !== null) {
t.scheme = r.scheme;
t.authority = r.authority;
t.path = removeDotSegments(r.path);
t.query = r.query;
} else {
if(r.authority !== null) {
t.authority = r.authority;
t.path = removeDotSegments(r.path);
t.query = r.query;
} else {
if(r.path === '') { // TODO: == or === ?
t.path = base.path;
if(r.query !== null) {
t.query = r.query;
} else {
t.query = base.query;
}
} else {
if(r.path.substr(0,1) === '/') {
t.path = removeDotSegments(r.path);
} else {
if(base.authority !== null && base.path === '') { // TODO: == or === ?
t.path = '/'+r.path;
} else {
t.path = base.path.replace(/[^\/]+$/,'')+r.path;
}
t.path = removeDotSegments(t.path);
}
t.query = r.query;
}
t.authority = base.authority;
}
t.scheme = base.scheme;
}
t.fragment = r.fragment;
return t;
};
function removeDotSegments(path) {
var out='';
while(path) {
if(path.substr(0,3)==='../' || path.substr(0,2)==='./') {
path = path.replace(/^\.+/,'').substr(1);
} else if(path.substr(0,3)==='/./' || path==='/.') {
path = '/'+path.substr(3);
} else if(path.substr(0,4)==='/../' || path==='/..') {
path = '/'+path.substr(4);
out = out.replace(/\/?[^\/]*$/, '');
} else if(path==='.' || path==='..') {
path = '';
} else {
var rm=path.match(/^\/?[^\/]*/)[0];
path = path.substr(rm.length);
out = out + rm;
}
}
return out;
}
if(uri) {
this.parse(uri);
}
},
color : function(target, prop) {
this.required = true; // refuse empty values?
this.adjust = true; // adjust value to uniform notation?
this.hash = false; // prefix color with # symbol?
this.caps = true; // uppercase?
this.slider = true; // show the value/saturation slider?
this.valueElement = target; // value holder
this.styleElement = target; // where to reflect current color
this.onImmediateChange = null; // onchange callback (can be either string or function)
this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1
this.pickerOnfocus = true; // display picker on focus?
this.pickerMode = 'HSV'; // HSV | HVS
this.pickerPosition = 'bottom'; // left | right | top | bottom
this.pickerButtonHeight = 20; // px
this.pickerClosable = false;
this.pickerCloseText = 'Close';
this.pickerButtonColor = 'ButtonText'; // px
this.pickerFace = 10; // px
this.pickerFaceColor = 'ThreeDFace'; // CSS color
this.pickerBorder = 1; // px
this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
this.pickerInset = 1; // px
this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
this.pickerZIndex = 10000;
for(var p in prop) {
if(prop.hasOwnProperty(p)) {
this[p] = prop[p];
}
}
this.hidePicker = function() {
if(isPickerOwner()) {
removePicker();
}
};
this.showPicker = function() {
if(!isPickerOwner()) {
var tp=jscolor.getElementPos(target); // target pos
var ts=jscolor.getElementSize(target); // target size
var vp=jscolor.getViewPos(); // view pos
var vs=jscolor.getViewSize(); // view size
var ps=getPickerDims(this); // picker size
var a, b, c;
switch(this.pickerPosition.toLowerCase()) {
case 'left': a=1; b=0; c=-1; break;
case 'right':a=1; b=0; c=1; break;
case 'top':  a=0; b=1; c=-1; break;
default:     a=0; b=1; c=1; break;
}
var l=(ts[b]+ps[b])/2;
var pp=[ // picker pos
-vp[a]+tp[a]+ps[a] > vs[a] ?
(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
tp[a],
-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
];
drawPicker(pp[a], pp[b]);
}
};
this.importColor = function() {
if(!valueElement) {
this.exportColor();
} else {
if(!this.adjust) {
if(!this.fromString(valueElement.value, leaveValue)) {
styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
styleElement.style.color = styleElement.jscStyle.color;
this.exportColor(leaveValue | leaveStyle);
}
} else if(!this.required && /^\s*$/.test(valueElement.value)) {
valueElement.value = '';
styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
styleElement.style.color = styleElement.jscStyle.color;
this.exportColor(leaveValue | leaveStyle);
} else if(this.fromString(valueElement.value)) {
} else {
this.exportColor();
}
}
};
this.exportColor = function(flags) {
if(!(flags & leaveValue) && valueElement) {
var value=this.toString();
if(this.caps) { value = value.toUpperCase(); }
if(this.hash) { value = '#'+value; }
valueElement.value = value;
}
if(!(flags & leaveStyle) && styleElement) {
styleElement.style.backgroundColor =
'#'+this.toString();
styleElement.style.color =
0.213 * this.rgb[0] +
0.715 * this.rgb[1] +
0.072 * this.rgb[2]
< 0.5 ? '#FFF' : '#000';
}
if(!(flags & leavePad) && isPickerOwner()) {
redrawPad();
}
if(!(flags & leaveSld) && isPickerOwner()) {
redrawSld();
}
};
this.fromHSV = function(h, s, v, flags) { // null = don't change
h<0 && (h=0) || h>6 && (h=6);
s<0 && (s=0) || s>1 && (s=1);
v<0 && (v=0) || v>1 && (v=1);
this.rgb = HSV_RGB(
h===null ? this.hsv[0] : (this.hsv[0]=h),
s===null ? this.hsv[1] : (this.hsv[1]=s),
v===null ? this.hsv[2] : (this.hsv[2]=v)
);
this.exportColor(flags);
};
this.fromRGB = function(r, g, b, flags) { // null = don't change
r<0 && (r=0) || r>1 && (r=1);
g<0 && (g=0) || g>1 && (g=1);
b<0 && (b=0) || b>1 && (b=1);
var hsv=RGB_HSV(
r===null ? this.rgb[0] : (this.rgb[0]=r),
g===null ? this.rgb[1] : (this.rgb[1]=g),
b===null ? this.rgb[2] : (this.rgb[2]=b)
);
if(hsv[0] !== null) {
this.hsv[0] = hsv[0];
}
if(hsv[2] !== 0) {
this.hsv[1] = hsv[1];
}
this.hsv[2] = hsv[2];
this.exportColor(flags);
};
this.fromString = function(hex, flags) {
var m=hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
if(!m) {
return false;
} else {
if(m[1].length === 6) { // 6-char notation
this.fromRGB(
parseInt(m[1].substr(0,2),16) / 255,
parseInt(m[1].substr(2,2),16) / 255,
parseInt(m[1].substr(4,2),16) / 255,
flags
);
} else { // 3-char notation
this.fromRGB(
parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
flags
);
}
return true;
}
};
this.toString = function() {
return (
(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
);
};
function RGB_HSV(r, g, b) {
var n=Math.min(Math.min(r,g),b);
var v=Math.max(Math.max(r,g),b);
var m=v - n;
if(m === 0) { return [ null, 0, v ]; }
var h=r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
return [ h===6?0:h, m/v, v ];
}
function HSV_RGB(h, s, v) {
if(h === null) { return [ v, v, v ]; }
var i=Math.floor(h);
var f=i%2 ? h-i : 1-(h-i);
var m=v * (1 - s);
var n=v * (1 - s*f);
switch(i) {
case 6:
case 0: return [v,n,m];
case 1: return [n,v,m];
case 2: return [m,v,n];
case 3: return [m,n,v];
case 4: return [n,m,v];
case 5: return [v,m,n];
}
}
function removePicker() {
delete jscolor.picker.owner;
document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
}
function drawPicker(x, y) {
if(!jscolor.picker) {
jscolor.picker = {
box : document.createElement('div'),
boxB : document.createElement('div'),
pad : document.createElement('div'),
padB : document.createElement('div'),
padM : document.createElement('div'),
sld : document.createElement('div'),
sldB : document.createElement('div'),
sldM : document.createElement('div'),
btn : document.createElement('div'),
btnS : document.createElement('span'),
btnT : document.createTextNode(THIS.pickerCloseText)
};
for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
var seg=document.createElement('div');
seg.style.height = segSize+'px';
seg.style.fontSize = '1px';
seg.style.lineHeight = '0';
jscolor.picker.sld.appendChild(seg);
}
jscolor.picker.sldB.appendChild(jscolor.picker.sld);
jscolor.picker.box.appendChild(jscolor.picker.sldB);
jscolor.picker.box.appendChild(jscolor.picker.sldM);
jscolor.picker.padB.appendChild(jscolor.picker.pad);
jscolor.picker.box.appendChild(jscolor.picker.padB);
jscolor.picker.box.appendChild(jscolor.picker.padM);
jscolor.picker.btnS.appendChild(jscolor.picker.btnT);
jscolor.picker.btn.appendChild(jscolor.picker.btnS);
jscolor.picker.box.appendChild(jscolor.picker.btn);
jscolor.picker.boxB.appendChild(jscolor.picker.box);
}
var p=jscolor.picker;
p.box.onmouseup =
p.box.onmouseout = function() { target.focus(); };
p.box.onmousedown = function() { abortBlur=true; };
p.box.onmousemove = function(e) {
if (holdPad || holdSld) {
holdPad && setPad(e);
holdSld && setSld(e);
if (document.selection) {
document.selection.empty();
} else if (window.getSelection) {
window.getSelection().removeAllRanges();
}
dispatchImmediateChange();
}
};
p.padM.onmouseup =
p.padM.onmouseout = function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } };
p.padM.onmousedown = function(e) {
holdPad=true;
setPad(e);
dispatchImmediateChange();
};
p.sldM.onmouseup =
p.sldM.onmouseout = function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } };
p.sldM.onmousedown = function(e) {
holdSld=true;
setSld(e);
dispatchImmediateChange();
};
var dims=getPickerDims(THIS);
p.box.style.width = dims[0] + 'px';
p.box.style.height = dims[1] + 'px';
p.boxB.style.position = 'absolute';
p.boxB.style.clear = 'both';
p.boxB.style.left = x+'px';
p.boxB.style.top = y+'px';
p.boxB.style.zIndex = THIS.pickerZIndex;
p.boxB.style.border = THIS.pickerBorder+'px solid';
p.boxB.style.borderColor = THIS.pickerBorderColor;
p.boxB.style.background = THIS.pickerFaceColor;
p.pad.style.width = jscolor.images.pad[0]+'px';
p.pad.style.height = jscolor.images.pad[1]+'px';
p.padB.style.position = 'absolute';
p.padB.style.left = THIS.pickerFace+'px';
p.padB.style.top = THIS.pickerFace+'px';
p.padB.style.border = THIS.pickerInset+'px solid';
p.padB.style.borderColor = THIS.pickerInsetColor;
p.padM.style.position = 'absolute';
p.padM.style.left = '0';
p.padM.style.top = '0';
p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
p.padM.style.height = p.box.style.height;
p.padM.style.cursor = 'crosshair';
p.sld.style.overflow = 'hidden';
p.sld.style.width = jscolor.images.sld[0]+'px';
p.sld.style.height = jscolor.images.sld[1]+'px';
p.sldB.style.display = THIS.slider ? 'block' : 'none';
p.sldB.style.position = 'absolute';
p.sldB.style.right = THIS.pickerFace+'px';
p.sldB.style.top = THIS.pickerFace+'px';
p.sldB.style.border = THIS.pickerInset+'px solid';
p.sldB.style.borderColor = THIS.pickerInsetColor;
p.sldM.style.display = THIS.slider ? 'block' : 'none';
p.sldM.style.position = 'absolute';
p.sldM.style.right = '0';
p.sldM.style.top = '0';
p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
p.sldM.style.height = p.box.style.height;
try {
p.sldM.style.cursor = 'pointer';
} catch(eOldIE) {
p.sldM.style.cursor = 'hand';
}
function setBtnBorder() {
var insetColors=THIS.pickerInsetColor.split(/\s+/);
var pickerOutsetColor=insetColors.length < 2 ? insetColors[0] : insetColors[1] + ' ' + insetColors[0] + ' ' + insetColors[0] + ' ' + insetColors[1];
p.btn.style.borderColor = pickerOutsetColor;
}
p.btn.style.display = THIS.pickerClosable ? 'block' : 'none';
p.btn.style.position = 'absolute';
p.btn.style.left = THIS.pickerFace + 'px';
p.btn.style.bottom = THIS.pickerFace + 'px';
p.btn.style.padding = '0 15px';
p.btn.style.height = '18px';
p.btn.style.border = THIS.pickerInset + 'px solid';
setBtnBorder();
p.btn.style.color = THIS.pickerButtonColor;
p.btn.style.font = '12px sans-serif';
p.btn.style.textAlign = 'center';
try {
p.btn.style.cursor = 'pointer';
} catch(eOldIE) {
p.btn.style.cursor = 'hand';
}
p.btn.onmousedown = function () {
THIS.hidePicker();
};
p.btnS.style.lineHeight = p.btn.style.height;
switch(modeID) {
case 0: var padImg='hs.png'; break;
case 1: var padImg='hv.png'; break;
}
p.padM.style.backgroundImage = "url('"+jscolor.getDir()+"cross.gif')";
p.padM.style.backgroundRepeat = "no-repeat";
p.sldM.style.backgroundImage = "url('"+jscolor.getDir()+"arrow.gif')";
p.sldM.style.backgroundRepeat = "no-repeat";
p.pad.style.backgroundImage = "url('"+jscolor.getDir()+padImg+"')";
p.pad.style.backgroundRepeat = "no-repeat";
p.pad.style.backgroundPosition = "0 0";
redrawPad();
redrawSld();
jscolor.picker.owner = THIS;
document.getElementsByTagName('body')[0].appendChild(p.boxB);
}
function getPickerDims(o) {
var dims=[
2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[0] +
(o.slider ? 2*o.pickerInset + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] : 0),
o.pickerClosable ?
4*o.pickerInset + 3*o.pickerFace + jscolor.images.pad[1] + o.pickerButtonHeight :
2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[1]
];
return dims;
}
function redrawPad() {
switch(modeID) {
case 0: var yComponent=1; break;
case 1: var yComponent=2; break;
}
var x=Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
var y=Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
jscolor.picker.padM.style.backgroundPosition =
(THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
(THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';
var seg=jscolor.picker.sld.childNodes;
switch(modeID) {
case 0:
var rgb=HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
for(var i=0; i<seg.length; i+=1) {
seg[i].style.backgroundColor = 'rgb('+
(rgb[0]*(1-i/seg.length)*100)+'%,'+
(rgb[1]*(1-i/seg.length)*100)+'%,'+
(rgb[2]*(1-i/seg.length)*100)+'%)';
}
break;
case 1:
var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
var i=Math.floor(THIS.hsv[0]);
var f=i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
switch(i) {
case 6:
case 0: rgb=[0,1,2]; break;
case 1: rgb=[1,0,2]; break;
case 2: rgb=[2,0,1]; break;
case 3: rgb=[2,1,0]; break;
case 4: rgb=[1,2,0]; break;
case 5: rgb=[0,2,1]; break;
}
for(var i=0; i<seg.length; i+=1) {
s = 1 - 1/(seg.length-1)*i;
c[1] = c[0] * (1 - s*f);
c[2] = c[0] * (1 - s);
seg[i].style.backgroundColor = 'rgb('+
(c[rgb[0]]*100)+'%,'+
(c[rgb[1]]*100)+'%,'+
(c[rgb[2]]*100)+'%)';
}
break;
}
}
function redrawSld() {
switch(modeID) {
case 0: var yComponent=2; break;
case 1: var yComponent=1; break;
}
var y=Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
jscolor.picker.sldM.style.backgroundPosition =
'0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
}
function isPickerOwner() {
return jscolor.picker && jscolor.picker.owner === THIS;
}
function blurTarget() {
if(valueElement === target) {
THIS.importColor();
}
if(THIS.pickerOnfocus) {
THIS.hidePicker();
}
}
function blurValue() {
if(valueElement !== target) {
THIS.importColor();
}
}
function setPad(e) {
var mpos=jscolor.getRelMousePos(e);
var x=mpos.x - THIS.pickerFace - THIS.pickerInset;
var y=mpos.y - THIS.pickerFace - THIS.pickerInset;
switch(modeID) {
case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
}
}
function setSld(e) {
var mpos=jscolor.getRelMousePos(e);
var y=mpos.y - THIS.pickerFace - THIS.pickerInset;
switch(modeID) {
case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
}
}
function dispatchImmediateChange() {
if (THIS.onImmediateChange) {
if (typeof THIS.onImmediateChange === 'string') {
eval(THIS.onImmediateChange);
} else {
THIS.onImmediateChange(THIS);
}
}
}
var THIS=this;
var modeID=this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
var abortBlur=false;
var
valueElement = jscolor.fetchElement(this.valueElement),
styleElement = jscolor.fetchElement(this.styleElement);
var
holdPad = false,
holdSld = false;
var
leaveValue = 1<<0,
leaveStyle = 1<<1,
leavePad = 1<<2,
leaveSld = 1<<3;
jscolor.addEvent(target, 'focus', function() {
if(THIS.pickerOnfocus) { THIS.showPicker(); }
});
jscolor.addEvent(target, 'blur', function() {
if(!abortBlur) {
window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
} else {
abortBlur = false;
}
});
if(valueElement) {
var updateField=function() {
THIS.fromString(valueElement.value, leaveValue);
};
jscolor.addEvent(valueElement, 'keyup', updateField);
jscolor.addEvent(valueElement, 'input', updateField);
jscolor.addEvent(valueElement, 'blur', blurValue);
valueElement.setAttribute('autocomplete', 'off');
}
if(styleElement) {
styleElement.jscStyle = {
backgroundColor : styleElement.style.backgroundColor,
color : styleElement.style.color
};
}
switch(modeID) {
case 0: jscolor.requireImage('hs.png'); break;
case 1: jscolor.requireImage('hv.png'); break;
}
jscolor.requireImage('cross.gif');
jscolor.requireImage('arrow.gif');
this.importColor();
}
};
jscolor.install();
