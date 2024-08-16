import{e as oe}from"./events-d3dcf16a.js";import{c as T,e as pe}from"./index-a67a649a.js";const ve="PARSE_ERROR",_e="INVALID_REQUEST",be="METHOD_NOT_FOUND",me="INVALID_PARAMS",ie="INTERNAL_ERROR",z="SERVER_ERROR",ge=[-32700,-32600,-32601,-32602,-32603],U={[ve]:{code:-32700,message:"Parse error"},[_e]:{code:-32600,message:"Invalid Request"},[be]:{code:-32601,message:"Method not found"},[me]:{code:-32602,message:"Invalid params"},[ie]:{code:-32603,message:"Internal error"},[z]:{code:-32e3,message:"Server error"}},se=z;function we(n){return ge.includes(n)}function k(n){return Object.keys(U).includes(n)?U[n]:U[se]}function Ee(n){const t=Object.values(U).find(a=>a.code===n);return t||U[se]}function Re(n,t,a){return n.message.includes("getaddrinfo ENOTFOUND")||n.message.includes("connect ECONNREFUSED")?new Error(`Unavailable ${a} RPC url at ${t}`):n}var Oe={},ae={exports:{}};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */(function(n){var t,a,y,p,h,b,w,L,M,A,R,C,S,_,j,F,N,H,q,x,I,J,$;(function(d){var D=typeof T=="object"?T:typeof self=="object"?self:typeof this=="object"?this:{};d(o(D,o(n.exports)));function o(i,s){return i!==D&&(typeof Object.create=="function"?Object.defineProperty(i,"__esModule",{value:!0}):i.__esModule=!0),function(u,e){return i[u]=s?s(u,e):e}}})(function(d){var D=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,i){o.__proto__=i}||function(o,i){for(var s in i)i.hasOwnProperty(s)&&(o[s]=i[s])};t=function(o,i){D(o,i);function s(){this.constructor=o}o.prototype=i===null?Object.create(i):(s.prototype=i.prototype,new s)},a=Object.assign||function(o){for(var i,s=1,u=arguments.length;s<u;s++){i=arguments[s];for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(o[e]=i[e])}return o},y=function(o,i){var s={};for(var u in o)Object.prototype.hasOwnProperty.call(o,u)&&i.indexOf(u)<0&&(s[u]=o[u]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,u=Object.getOwnPropertySymbols(o);e<u.length;e++)i.indexOf(u[e])<0&&Object.prototype.propertyIsEnumerable.call(o,u[e])&&(s[u[e]]=o[u[e]]);return s},p=function(o,i,s,u){var e=arguments.length,r=e<3?i:u===null?u=Object.getOwnPropertyDescriptor(i,s):u,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,i,s,u);else for(var l=o.length-1;l>=0;l--)(c=o[l])&&(r=(e<3?c(r):e>3?c(i,s,r):c(i,s))||r);return e>3&&r&&Object.defineProperty(i,s,r),r},h=function(o,i){return function(s,u){i(s,u,o)}},b=function(o,i){if(typeof Reflect=="object"&&typeof Reflect.metadata=="function")return Reflect.metadata(o,i)},w=function(o,i,s,u){function e(r){return r instanceof s?r:new s(function(c){c(r)})}return new(s||(s=Promise))(function(r,c){function l(g){try{f(u.next(g))}catch(E){c(E)}}function v(g){try{f(u.throw(g))}catch(E){c(E)}}function f(g){g.done?r(g.value):e(g.value).then(l,v)}f((u=u.apply(o,i||[])).next())})},L=function(o,i){var s={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},u,e,r,c;return c={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(c[Symbol.iterator]=function(){return this}),c;function l(f){return function(g){return v([f,g])}}function v(f){if(u)throw new TypeError("Generator is already executing.");for(;s;)try{if(u=1,e&&(r=f[0]&2?e.return:f[0]?e.throw||((r=e.return)&&r.call(e),0):e.next)&&!(r=r.call(e,f[1])).done)return r;switch(e=0,r&&(f=[f[0]&2,r.value]),f[0]){case 0:case 1:r=f;break;case 4:return s.label++,{value:f[1],done:!1};case 5:s.label++,e=f[1],f=[0];continue;case 7:f=s.ops.pop(),s.trys.pop();continue;default:if(r=s.trys,!(r=r.length>0&&r[r.length-1])&&(f[0]===6||f[0]===2)){s=0;continue}if(f[0]===3&&(!r||f[1]>r[0]&&f[1]<r[3])){s.label=f[1];break}if(f[0]===6&&s.label<r[1]){s.label=r[1],r=f;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(f);break}r[2]&&s.ops.pop(),s.trys.pop();continue}f=i.call(o,s)}catch(g){f=[6,g],e=0}finally{u=r=0}if(f[0]&5)throw f[1];return{value:f[0]?f[1]:void 0,done:!0}}},$=function(o,i,s,u){u===void 0&&(u=s),o[u]=i[s]},M=function(o,i){for(var s in o)s!=="default"&&!i.hasOwnProperty(s)&&(i[s]=o[s])},A=function(o){var i=typeof Symbol=="function"&&Symbol.iterator,s=i&&o[i],u=0;if(s)return s.call(o);if(o&&typeof o.length=="number")return{next:function(){return o&&u>=o.length&&(o=void 0),{value:o&&o[u++],done:!o}}};throw new TypeError(i?"Object is not iterable.":"Symbol.iterator is not defined.")},R=function(o,i){var s=typeof Symbol=="function"&&o[Symbol.iterator];if(!s)return o;var u=s.call(o),e,r=[],c;try{for(;(i===void 0||i-- >0)&&!(e=u.next()).done;)r.push(e.value)}catch(l){c={error:l}}finally{try{e&&!e.done&&(s=u.return)&&s.call(u)}finally{if(c)throw c.error}}return r},C=function(){for(var o=[],i=0;i<arguments.length;i++)o=o.concat(R(arguments[i]));return o},S=function(){for(var o=0,i=0,s=arguments.length;i<s;i++)o+=arguments[i].length;for(var u=Array(o),e=0,i=0;i<s;i++)for(var r=arguments[i],c=0,l=r.length;c<l;c++,e++)u[e]=r[c];return u},_=function(o){return this instanceof _?(this.v=o,this):new _(o)},j=function(o,i,s){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var u=s.apply(o,i||[]),e,r=[];return e={},c("next"),c("throw"),c("return"),e[Symbol.asyncIterator]=function(){return this},e;function c(m){u[m]&&(e[m]=function(B){return new Promise(function(V,ye){r.push([m,B,V,ye])>1||l(m,B)})})}function l(m,B){try{v(u[m](B))}catch(V){E(r[0][3],V)}}function v(m){m.value instanceof _?Promise.resolve(m.value.v).then(f,g):E(r[0][2],m)}function f(m){l("next",m)}function g(m){l("throw",m)}function E(m,B){m(B),r.shift(),r.length&&l(r[0][0],r[0][1])}},F=function(o){var i,s;return i={},u("next"),u("throw",function(e){throw e}),u("return"),i[Symbol.iterator]=function(){return this},i;function u(e,r){i[e]=o[e]?function(c){return(s=!s)?{value:_(o[e](c)),done:e==="return"}:r?r(c):c}:r}},N=function(o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=o[Symbol.asyncIterator],s;return i?i.call(o):(o=typeof A=="function"?A(o):o[Symbol.iterator](),s={},u("next"),u("throw"),u("return"),s[Symbol.asyncIterator]=function(){return this},s);function u(r){s[r]=o[r]&&function(c){return new Promise(function(l,v){c=o[r](c),e(l,v,c.done,c.value)})}}function e(r,c,l,v){Promise.resolve(v).then(function(f){r({value:f,done:l})},c)}},H=function(o,i){return Object.defineProperty?Object.defineProperty(o,"raw",{value:i}):o.raw=i,o},q=function(o){if(o&&o.__esModule)return o;var i={};if(o!=null)for(var s in o)Object.hasOwnProperty.call(o,s)&&(i[s]=o[s]);return i.default=o,i},x=function(o){return o&&o.__esModule?o:{default:o}},I=function(o,i){if(!i.has(o))throw new TypeError("attempted to get private field on non-instance");return i.get(o)},J=function(o,i,s){if(!i.has(o))throw new TypeError("attempted to set private field on non-instance");return i.set(o,s),s},d("__extends",t),d("__assign",a),d("__rest",y),d("__decorate",p),d("__param",h),d("__metadata",b),d("__awaiter",w),d("__generator",L),d("__exportStar",M),d("__createBinding",$),d("__values",A),d("__read",R),d("__spread",C),d("__spreadArrays",S),d("__await",_),d("__asyncGenerator",j),d("__asyncDelegator",F),d("__asyncValues",N),d("__makeTemplateObject",H),d("__importStar",q),d("__importDefault",x),d("__classPrivateFieldGet",I),d("__classPrivateFieldSet",J)})})(ae);var Pe=ae.exports,O={},W;function Te(){if(W)return O;W=1,Object.defineProperty(O,"__esModule",{value:!0}),O.isBrowserCryptoAvailable=O.getSubtleCrypto=O.getBrowerCrypto=void 0;function n(){return(T===null||T===void 0?void 0:T.crypto)||(T===null||T===void 0?void 0:T.msCrypto)||{}}O.getBrowerCrypto=n;function t(){const y=n();return y.subtle||y.webkitSubtle}O.getSubtleCrypto=t;function a(){return!!n()&&!!t()}return O.isBrowserCryptoAvailable=a,O}var P={},Q;function Ae(){if(Q)return P;Q=1,Object.defineProperty(P,"__esModule",{value:!0}),P.isBrowser=P.isNode=P.isReactNative=void 0;function n(){return typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"}P.isReactNative=n;function t(){return typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u"}P.isNode=t;function a(){return!n()&&!t()}return P.isBrowser=a,P}(function(n){Object.defineProperty(n,"__esModule",{value:!0});const t=Pe;t.__exportStar(Te(),n),t.__exportStar(Ae(),n)})(Oe);function ce(n=3){const t=Date.now()*Math.pow(10,n),a=Math.floor(Math.random()*Math.pow(10,n));return t+a}function Se(n=6){return BigInt(ce(n))}function je(n,t,a){return{id:a||ce(),jsonrpc:"2.0",method:n,params:t}}function We(n,t){return{id:n,jsonrpc:"2.0",result:t}}function De(n,t,a){return{id:n,jsonrpc:"2.0",error:Be(t,a)}}function Be(n,t){return typeof n>"u"?k(ie):(typeof n=="string"&&(n=Object.assign(Object.assign({},k(z)),{message:n})),typeof t<"u"&&(n.data=t),we(n.code)&&(n=Ee(n.code)),n)}class fe{}class Qe extends fe{constructor(t){super()}}class Ce extends fe{constructor(){super()}}class Fe extends Ce{constructor(t){super()}}const xe="^https?:",Ie="^wss?:";function Ue(n){const t=n.match(new RegExp(/^\w+:/,"gi"));if(!(!t||!t.length))return t[0]}function ue(n,t){const a=Ue(n);return typeof a>"u"?!1:new RegExp(t).test(a)}function K(n){return ue(n,xe)}function Ke(n){return ue(n,Ie)}function Ye(n){return new RegExp("wss?://localhost(:d{2,5})?").test(n)}function le(n){return typeof n=="object"&&"id"in n&&"jsonrpc"in n&&n.jsonrpc==="2.0"}function Ze(n){return le(n)&&"method"in n}function Le(n){return le(n)&&(Me(n)||he(n))}function Me(n){return"result"in n}function he(n){return"error"in n}class et extends Fe{constructor(t){super(t),this.events=new oe.EventEmitter,this.hasRegisteredEventListeners=!1,this.connection=this.setConnection(t),this.connection.connected&&this.registerEventListeners()}async connect(t=this.connection){await this.open(t)}async disconnect(){await this.close()}on(t,a){this.events.on(t,a)}once(t,a){this.events.once(t,a)}off(t,a){this.events.off(t,a)}removeListener(t,a){this.events.removeListener(t,a)}async request(t,a){return this.requestStrict(je(t.method,t.params||[],Se().toString()),a)}async requestStrict(t,a){return new Promise(async(y,p)=>{if(!this.connection.connected)try{await this.open()}catch(h){p(h)}this.events.on(`${t.id}`,h=>{he(h)?p(h.error):y(h.result)});try{await this.connection.send(t,a)}catch(h){p(h)}})}setConnection(t=this.connection){return t}onPayload(t){this.events.emit("payload",t),Le(t)?this.events.emit(`${t.id}`,t):this.events.emit("message",{type:t.method,data:t.params})}onClose(t){t&&t.code===3e3&&this.events.emit("error",new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason?`(${t.reason})`:""}`)),this.events.emit("disconnect")}async open(t=this.connection){this.connection===t&&this.connection.connected||(this.connection.connected&&this.close(),typeof t=="string"&&(await this.connection.open(t),t=this.connection),this.connection=this.setConnection(t),await this.connection.open(),this.registerEventListeners(),this.events.emit("connect"))}async close(){await this.connection.close()}registerEventListeners(){this.hasRegisteredEventListeners||(this.connection.on("payload",t=>this.onPayload(t)),this.connection.on("close",t=>this.onClose(t)),this.connection.on("error",t=>this.events.emit("error",t)),this.connection.on("register_error",t=>this.onClose()),this.hasRegisteredEventListeners=!0)}}var G={exports:{}};(function(n,t){var a=typeof self<"u"?self:T,y=function(){function h(){this.fetch=!1,this.DOMException=a.DOMException}return h.prototype=a,new h}();(function(h){(function(b){var w={searchParams:"URLSearchParams"in h,iterable:"Symbol"in h&&"iterator"in Symbol,blob:"FileReader"in h&&"Blob"in h&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in h,arrayBuffer:"ArrayBuffer"in h};function L(e){return e&&DataView.prototype.isPrototypeOf(e)}if(w.arrayBuffer)var M=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],A=ArrayBuffer.isView||function(e){return e&&M.indexOf(Object.prototype.toString.call(e))>-1};function R(e){if(typeof e!="string"&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function C(e){return typeof e!="string"&&(e=String(e)),e}function S(e){var r={next:function(){var c=e.shift();return{done:c===void 0,value:c}}};return w.iterable&&(r[Symbol.iterator]=function(){return r}),r}function _(e){this.map={},e instanceof _?e.forEach(function(r,c){this.append(c,r)},this):Array.isArray(e)?e.forEach(function(r){this.append(r[0],r[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(r){this.append(r,e[r])},this)}_.prototype.append=function(e,r){e=R(e),r=C(r);var c=this.map[e];this.map[e]=c?c+", "+r:r},_.prototype.delete=function(e){delete this.map[R(e)]},_.prototype.get=function(e){return e=R(e),this.has(e)?this.map[e]:null},_.prototype.has=function(e){return this.map.hasOwnProperty(R(e))},_.prototype.set=function(e,r){this.map[R(e)]=C(r)},_.prototype.forEach=function(e,r){for(var c in this.map)this.map.hasOwnProperty(c)&&e.call(r,this.map[c],c,this)},_.prototype.keys=function(){var e=[];return this.forEach(function(r,c){e.push(c)}),S(e)},_.prototype.values=function(){var e=[];return this.forEach(function(r){e.push(r)}),S(e)},_.prototype.entries=function(){var e=[];return this.forEach(function(r,c){e.push([c,r])}),S(e)},w.iterable&&(_.prototype[Symbol.iterator]=_.prototype.entries);function j(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function F(e){return new Promise(function(r,c){e.onload=function(){r(e.result)},e.onerror=function(){c(e.error)}})}function N(e){var r=new FileReader,c=F(r);return r.readAsArrayBuffer(e),c}function H(e){var r=new FileReader,c=F(r);return r.readAsText(e),c}function q(e){for(var r=new Uint8Array(e),c=new Array(r.length),l=0;l<r.length;l++)c[l]=String.fromCharCode(r[l]);return c.join("")}function x(e){if(e.slice)return e.slice(0);var r=new Uint8Array(e.byteLength);return r.set(new Uint8Array(e)),r.buffer}function I(){return this.bodyUsed=!1,this._initBody=function(e){this._bodyInit=e,e?typeof e=="string"?this._bodyText=e:w.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:w.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:w.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():w.arrayBuffer&&w.blob&&L(e)?(this._bodyArrayBuffer=x(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):w.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||A(e))?this._bodyArrayBuffer=x(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||(typeof e=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):w.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},w.blob&&(this.blob=function(){var e=j(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?j(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(N)}),this.text=function(){var e=j(this);if(e)return e;if(this._bodyBlob)return H(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(q(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},w.formData&&(this.formData=function(){return this.text().then(D)}),this.json=function(){return this.text().then(JSON.parse)},this}var J=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function $(e){var r=e.toUpperCase();return J.indexOf(r)>-1?r:e}function d(e,r){r=r||{};var c=r.body;if(e instanceof d){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,r.headers||(this.headers=new _(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,!c&&e._bodyInit!=null&&(c=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=r.credentials||this.credentials||"same-origin",(r.headers||!this.headers)&&(this.headers=new _(r.headers)),this.method=$(r.method||this.method||"GET"),this.mode=r.mode||this.mode||null,this.signal=r.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&c)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(c)}d.prototype.clone=function(){return new d(this,{body:this._bodyInit})};function D(e){var r=new FormData;return e.trim().split("&").forEach(function(c){if(c){var l=c.split("="),v=l.shift().replace(/\+/g," "),f=l.join("=").replace(/\+/g," ");r.append(decodeURIComponent(v),decodeURIComponent(f))}}),r}function o(e){var r=new _,c=e.replace(/\r?\n[\t ]+/g," ");return c.split(/\r?\n/).forEach(function(l){var v=l.split(":"),f=v.shift().trim();if(f){var g=v.join(":").trim();r.append(f,g)}}),r}I.call(d.prototype);function i(e,r){r||(r={}),this.type="default",this.status=r.status===void 0?200:r.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in r?r.statusText:"OK",this.headers=new _(r.headers),this.url=r.url||"",this._initBody(e)}I.call(i.prototype),i.prototype.clone=function(){return new i(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new _(this.headers),url:this.url})},i.error=function(){var e=new i(null,{status:0,statusText:""});return e.type="error",e};var s=[301,302,303,307,308];i.redirect=function(e,r){if(s.indexOf(r)===-1)throw new RangeError("Invalid status code");return new i(null,{status:r,headers:{location:e}})},b.DOMException=h.DOMException;try{new b.DOMException}catch{b.DOMException=function(r,c){this.message=r,this.name=c;var l=Error(r);this.stack=l.stack},b.DOMException.prototype=Object.create(Error.prototype),b.DOMException.prototype.constructor=b.DOMException}function u(e,r){return new Promise(function(c,l){var v=new d(e,r);if(v.signal&&v.signal.aborted)return l(new b.DOMException("Aborted","AbortError"));var f=new XMLHttpRequest;function g(){f.abort()}f.onload=function(){var E={status:f.status,statusText:f.statusText,headers:o(f.getAllResponseHeaders()||"")};E.url="responseURL"in f?f.responseURL:E.headers.get("X-Request-URL");var m="response"in f?f.response:f.responseText;c(new i(m,E))},f.onerror=function(){l(new TypeError("Network request failed"))},f.ontimeout=function(){l(new TypeError("Network request failed"))},f.onabort=function(){l(new b.DOMException("Aborted","AbortError"))},f.open(v.method,v.url,!0),v.credentials==="include"?f.withCredentials=!0:v.credentials==="omit"&&(f.withCredentials=!1),"responseType"in f&&w.blob&&(f.responseType="blob"),v.headers.forEach(function(E,m){f.setRequestHeader(m,E)}),v.signal&&(v.signal.addEventListener("abort",g),f.onreadystatechange=function(){f.readyState===4&&v.signal.removeEventListener("abort",g)}),f.send(typeof v._bodyInit>"u"?null:v._bodyInit)})}return u.polyfill=!0,h.fetch||(h.fetch=u,h.Headers=_,h.Request=d,h.Response=i),b.Headers=_,b.Request=d,b.Response=i,b.fetch=u,Object.defineProperty(b,"__esModule",{value:!0}),b})({})})(y),y.fetch.ponyfill=!0,delete y.fetch.polyfill;var p=y;t=p.fetch,t.default=p.fetch,t.fetch=p.fetch,t.Headers=p.Headers,t.Request=p.Request,t.Response=p.Response,n.exports=t})(G,G.exports);var Ne=G.exports;const Y=pe(Ne),He=n=>JSON.stringify(n,(t,a)=>typeof a=="bigint"?a.toString()+"n":a),qe=n=>{const t=/([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g,a=n.replace(t,'$1"$2n"$3');return JSON.parse(a,(y,p)=>typeof p=="string"&&p.match(/^\d+n$/)?BigInt(p.substring(0,p.length-1)):p)};function Je(n){if(typeof n!="string")throw new Error(`Cannot safe json parse value of type ${typeof n}`);try{return qe(n)}catch{return n}}function Z(n){return typeof n=="string"?n:He(n)||""}const $e={Accept:"application/json","Content-Type":"application/json"},Ve="POST",ee={headers:$e,method:Ve},te=10;class tt{constructor(t){if(this.url=t,this.events=new oe.EventEmitter,this.isAvailable=!1,this.registering=!1,!K(t))throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);this.url=t}get connected(){return this.isAvailable}get connecting(){return this.registering}on(t,a){this.events.on(t,a)}once(t,a){this.events.once(t,a)}off(t,a){this.events.off(t,a)}removeListener(t,a){this.events.removeListener(t,a)}async open(t=this.url){await this.register(t)}async close(){if(!this.isAvailable)throw new Error("Connection already closed");this.onClose()}async send(t,a){this.isAvailable||await this.register();try{const y=Z(t),h=await(await Y(this.url,Object.assign(Object.assign({},ee),{body:y}))).json();this.onPayload({data:h})}catch(y){this.onError(t.id,y)}}async register(t=this.url){if(!K(t))throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);if(this.registering){const a=this.events.getMaxListeners();return(this.events.listenerCount("register_error")>=a||this.events.listenerCount("open")>=a)&&this.events.setMaxListeners(a+1),new Promise((y,p)=>{this.events.once("register_error",h=>{this.resetMaxListeners(),p(h)}),this.events.once("open",()=>{if(this.resetMaxListeners(),typeof this.isAvailable>"u")return p(new Error("HTTP connection is missing or invalid"));y()})})}this.url=t,this.registering=!0;try{const a=Z({id:1,jsonrpc:"2.0",method:"test",params:[]});await Y(t,Object.assign(Object.assign({},ee),{body:a})),this.onOpen()}catch(a){const y=this.parseError(a);throw this.events.emit("register_error",y),this.onClose(),y}}onOpen(){this.isAvailable=!0,this.registering=!1,this.events.emit("open")}onClose(){this.isAvailable=!1,this.registering=!1,this.events.emit("close")}onPayload(t){if(typeof t.data>"u")return;const a=typeof t.data=="string"?Je(t.data):t.data;this.events.emit("payload",a)}onError(t,a){const y=this.parseError(a),p=y.message||y.toString(),h=De(t,p);this.events.emit("payload",h)}parseError(t,a=this.url){return Re(t,a,"HTTP")}resetMaxListeners(){this.events.getMaxListeners()>te&&this.events.setMaxListeners(te)}}var rt=n=>encodeURIComponent(n).replace(/[!'()*]/g,t=>`%${t.charCodeAt(0).toString(16).toUpperCase()}`),de="%[a-f0-9]{2}",re=new RegExp("("+de+")|([^%]+?)","gi"),ne=new RegExp("("+de+")+","gi");function X(n,t){try{return[decodeURIComponent(n.join(""))]}catch{}if(n.length===1)return n;t=t||1;var a=n.slice(0,t),y=n.slice(t);return Array.prototype.concat.call([],X(a),X(y))}function Ge(n){try{return decodeURIComponent(n)}catch{for(var t=n.match(re)||[],a=1;a<t.length;a++)n=X(t,a).join(""),t=n.match(re)||[];return n}}function Xe(n){for(var t={"%FE%FF":"��","%FF%FE":"��"},a=ne.exec(n);a;){try{t[a[0]]=decodeURIComponent(a[0])}catch{var y=Ge(a[0]);y!==a[0]&&(t[a[0]]=y)}a=ne.exec(n)}t["%C2"]="�";for(var p=Object.keys(t),h=0;h<p.length;h++){var b=p[h];n=n.replace(new RegExp(b,"g"),t[b])}return n}var nt=function(n){if(typeof n!="string")throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof n+"`");try{return n=n.replace(/\+/g," "),decodeURIComponent(n)}catch{return Xe(n)}},ot=(n,t)=>{if(!(typeof n=="string"&&typeof t=="string"))throw new TypeError("Expected the arguments to be of type `string`");if(t==="")return[n];const a=n.indexOf(t);return a===-1?[n]:[n.slice(0,a),n.slice(a+t.length)]};export{tt as H,Qe as I,et as J,rt as a,Z as b,Oe as c,nt as d,Ye as e,De as f,Je as g,Re as h,Ke as i,Ze as j,We as k,Me as l,he as m,Le as n,je as o,ce as p,ot as s};
