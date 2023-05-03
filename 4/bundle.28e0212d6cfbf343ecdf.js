(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",l="week",o="month",d="quarter",c="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,o),r=n-s<0,a=e.clone().add(i+(r?-1:1),o);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:o,y:c,w:l,d:a,D:u,h:r,m:s,s:i,ms:n,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",g={};g[y]=v;var b=function(t){return t instanceof D},$=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var l=e.name;g[l]=e,s=l}return!i&&s&&(y=s),s||!i&&y},M=function(t,e){if(b(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},E=_;E.l=$,E.i=b,E.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function v(t){this.$L=$(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(E.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return E},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return E.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,d=!!E.u(e)||e,p=E.p(t),f=function(t,e){var i=E.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return d?i:i.endOf(a)},h=function(t,e){return E.w(n.toDate()[t].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case c:return d?f(1,0):f(31,11);case o:return d?f(1,m):f(0,m+1);case l:var g=this.$locale().weekStart||0,b=(v<g?v+7:v)-g;return f(d?_-b:_+(6-b),m);case a:case u:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var l,d=E.p(t),p="set"+(this.$u?"UTC":""),f=(l={},l[a]=p+"Date",l[u]=p+"Date",l[o]=p+"Month",l[c]=p+"FullYear",l[r]=p+"Hours",l[s]=p+"Minutes",l[i]=p+"Seconds",l[n]=p+"Milliseconds",l)[d],h=d===a?this.$D+(e-this.$W):e;if(d===o||d===c){var v=this.clone().set(u,1);v.$d[f](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[E.p(t)]()},m.add=function(n,d){var u,p=this;n=Number(n);var f=E.p(d),h=function(t){var e=M(p);return E.w(e.date(e.date()+Math.round(t*n)),p)};if(f===o)return this.set(o,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===a)return h(1);if(f===l)return h(7);var v=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[f]||1,m=this.$d.getTime()+n*v;return E.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=E.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,d=n.months,c=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return E.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:E.s(l+1,2,"0"),MMM:c(n.monthsShort,l,d,3),MMMM:c(d,l),D:this.$D,DD:E.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,o,2),ddd:c(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:E.s(r,2,"0"),h:u(1),hh:u(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:E.s(a,2,"0"),s:String(this.$s),ss:E.s(this.$s,2,"0"),SSS:E.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,p){var f,h=E.p(u),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,y=E.m(this,v);return y=(f={},f[c]=y/12,f[o]=y,f[d]=y/3,f[l]=(_-m)/6048e5,f[a]=(_-m)/864e5,f[r]=_/e,f[s]=_/t,f[i]=_/1e3,f)[h]||_,p?y:E.a(y)},m.daysInMonth=function(){return this.endOf(o).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=$(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return E.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),w=D.prototype;return M.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",o],["$y",c],["$D",u]].forEach((function(t){w[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,D,M),t.$i=!0),M},M.locale=$,M.isDayjs=b,M.unix=function(t){return M(1e3*t)},M.en=g[y],M.Ls=g,M.p={},M}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t={BEFOREBEGIN:"beforebegin",AFTERBEGIN:"afterbegin",BEFOREEND:"beforeend",AFTEREND:"afterend"};function e(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function i(e,n){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.BEFOREEND;n.insertAdjacentElement(i,e.getElement())}class s{getTemplate(){return'<div class="trip-main__trip-controls  trip-controls">\n      <div class="trip-controls__filters">\n        <h2 class="visually-hidden">Filter events</h2>\n        <form class="trip-filters" action="#" method="get">\n          <div class="trip-filters__filter">\n            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n          </div>\n\n          <div class="trip-filters__filter">\n            <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n            <label class="trip-filters__filter-label" for="filter-future">Future</label>\n          </div>\n\n          <div class="trip-filters__filter">\n            <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n            <label class="trip-filters__filter-label" for="filter-present">Present</label>\n          </div>\n\n          <div class="trip-filters__filter">\n            <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n            <label class="trip-filters__filter-label" for="filter-past">Past</label>\n          </div>\n\n          <button class="visually-hidden" type="submit">Accept filter</button>\n        </form>\n      </div>\n    </div>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class a{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class l{getTemplate(){return'<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>New event</button>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var o=n(484),d=n.n(o);const c=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],u={eventStartEndDate:"DD/MM/YY HH:mm",eventStartEndTime:"HH:mm",startDate:"YYYY[-]MM[-]DD",eventDate:"MMM[ ]DD",durationFormat:"DD[D ]HH[H ]mm[M]"};function p(t){return t[Math.floor(Math.random()*t.length)]}function f(t){return Math.floor(Math.random()*t)}function h(t,e){return t?d()(t).format(u[e]):""}class v{constructor(t){let{point:e,offersAvailable:n,city:i}=t;this.point=e,this.offersAvailable=n,this.city=i}getTemplate(){return function(t,e,n){const{basePrice:i,dateFrom:s,dateTo:r,offers:a,type:l}=t,{name:o,description:d}=n,u=h(s,"eventStartEndDate"),p=h(r,"eventStartEndDate");return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${l}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${c.map((t=>`<div class="event__type-item">\n      <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n      <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${t.charAt(0).toUpperCase().concat(t.slice(1))}</label>\n      </div>`)).join("")}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${l}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${o}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              <option value="Amsterdam"></option>\n              <option value="Geneva"></option>\n              <option value="Chamonix"></option>\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${u}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${p}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${i}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Delete</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </header>\n        <section class="event__details">\n          <section class="event__section  event__section--offers">\n            <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n            <div class="event__available-offers">\n            ${f=e,f.map((t=>function(t){const e=a.includes(t.id)?"checked":"";return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${l}-${t.id}" type="checkbox" name="event-offer-${l}" ${e}>\n        <label class="event__offer-label" for="event-offer-${l}-${t.id}">\n          <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t.price}</span>\n        </label>\n      </div>`}(t))).join("")}\n            </div>\n          </section>\n\n          <section class="event__section  event__section--destination">\n            <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n            <p class="event__destination-description">${d}</p>\n          </section>\n        </section>\n      </form>\n    </li>`;var f}(this.point,this.offersAvailable,this.city)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class m{constructor(t){let{point:e,offersArray:n,city:i}=t;this.point=e,this.offersArray=n,this.city=i}getTemplate(){return function(t,e,n){const{basePrice:i,dateFrom:s,dateTo:r,isFavorite:a,type:l}=t,{name:o}=n,c=h(s,"eventStartEndDate"),p=h(r,"eventStartEndDate"),f=h(s,"eventStartEndTime"),v=h(r,"eventStartEndTime"),m=(_=r,y=s,d()(d()(_).diff(y)).format(u.durationFormat));var _,y;const g=a?"--active":"";return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${h(s,"startDate")}">${h(s,"eventDate")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${l}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${l} ${o}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${c}">${f}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${p}">${v}</time>\n          </p>\n          <p class="event__duration">${m}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${i}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${b=e,b.map((t=>`<li class="event__offer">\n          <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t.price}</span>\n        </li>`)).join("")}\n        </ul>\n        <button class="event__favorite-btn event__favorite-btn${g}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var b}(this.point,this.offersArray,this.city)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class _{getTemplate(){return'<ul class="trip-events__list">\n    </ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const y=[{id:"1",basePrice:f(5e3),dateFrom:"2019-07-10T22:11:56.845Z",dateTo:"2019-07-10T23:11:13.375Z",destination:"3Gen",isFavorite:!1,type:p(c),offers:["1","2"]},{id:"2",basePrice:f(5e3),dateFrom:"2019-07-11T11:22:13.375Z",dateTo:"2019-07-11T12:22:25.375Z",destination:"1Ams",isFavorite:!0,type:p(c),offers:["1"]},{id:"3",basePrice:f(5e3),dateFrom:"2019-07-12T11:33:25.375Z",dateTo:"2019-07-12T12:33:15.375Z",destination:"2Cham",isFavorite:!1,type:p(c),offers:["2"]},{id:"4",basePrice:f(5e3),dateFrom:"2019-07-13T09:44:15.375Z",dateTo:"2019-07-13T10:44:13.375Z",destination:"3Gen",isFavorite:!0,type:p(c),offers:["1"]}];function g(){return p(y)}const b=[{type:"taxi",offers:[{id:"1",title:"Upgrade taxi one",price:f(200)},{id:"2",title:"Upgrade taxi two",price:f(200)}]},{type:"bus",offers:[{id:"1",title:"Upgrade bus one",price:f(200)},{id:"2",title:"Upgrade bus two",price:f(200)}]},{type:"train",offers:[{id:"1",title:"Upgrade train one",price:f(200)},{id:"2",title:"Upgrade train two",price:f(200)}]},{type:"ship",offers:[{id:"1",title:"Upgrade ship one",price:f(200)},{id:"2",title:"Upgrade ship two",price:f(200)}]},{type:"drive",offers:[{id:"1",title:"Upgrade drive one",price:f(200)},{id:"2",title:"Upgrade drive two",price:f(200)}]},{type:"flight",offers:[{id:"1",title:"Upgrade flight one",price:f(200)},{id:"2",title:"Upgrade flight two",price:f(200)}]},{type:"check-in",offers:[{id:"1",title:"Upgrade check-in one",price:f(200)},{id:"2",title:"Upgrade check-in two",price:f(200)}]},{type:"sightseeing",offers:[{id:"1",title:"Upgrade sightseeing one",price:f(200)},{id:"2",title:"Upgrade sightseeing two",price:f(200)}]},{type:"restaurant",offers:[{id:"1",title:"Upgrade restaurant one",price:f(200)},{id:"2",title:"Upgrade restaurant two",price:f(200)}]}],$=[{id:"1Ams",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",name:"Amsterdam",pictures:[{src:"https://loremflickr.com/320/240/Amsterdam",description:"City at night"},{src:"https://loremflickr.com/320/240/Amsterdam",description:"City at daylight"}]},{id:"2Cham",description:"Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",name:"Chamonix",pictures:[{src:"https://loremflickr.com/320/240/Chamonix",description:"City at night"},{src:"https://loremflickr.com/320/240/Chamonix",description:"City at daylight"}]},{id:"3Gen",description:"Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.",name:"Geneva",pictures:[{src:"https://loremflickr.com/320/240/Geneva",description:"City at night"},{src:"https://loremflickr.com/320/240/Geneva",description:"City at daylight"}]}],M=document.querySelector(".trip-main"),E=document.querySelector(".trip-events"),D=new class{points=Array.from({length:3},g);getTripEvents(){return this.points}},w=new class{editionPoint=g();getPointEdition(){return this.editionPoint}},T=new class{allOffers=function(){return b}();getOffersOfType(t){return this.allOffers.find((e=>e.type===t)).offers}findOffer(t,e){return this.getOffersOfType(t).find((t=>t.id===e))}},O=new class{allDestinations=function(){return $}();findDestination(t){return this.allDestinations.find((e=>e.id===t))}},S=new class{tripList=new _;constructor(t){let{tripMain:e,tripEvents:n,tripEventsModel:i,offerModel:s,destinationModel:r,pointEditionModel:a}=t;this.tripMain=e,this.tripEvents=n,this.tripEventsModel=i,this.offerModel=s,this.destinationModel=r,this.pointEditionModel=a}getPointDestination(t){const e=t.destination;return this.destinationModel.findDestination(e)}getPointPickedOffers(t){const e=t.type,n=t.offers,i=[];return n.map((t=>i.push(this.offerModel.findOffer(e,t)))),i}getPointAvailableOffers(t){const e=t.type;return this.offerModel.getOffersOfType(e)}init(){this.tripPoints=[...this.tripEventsModel.getTripEvents()],this.pointEdition=this.pointEditionModel.getPointEdition(),i(new a,this.tripMain),i(new s,this.tripMain),i(new l,this.tripMain),i(this.tripList,this.tripEvents),i(new r,this.tripList.getElement(),t.BEFOREBEGIN),i(new v({point:this.pointEdition,offersAvailable:this.getPointAvailableOffers(this.pointEdition),city:this.getPointDestination(this.pointEdition)}),this.tripList.getElement(),t.AFTERBEGIN);for(let t=0;t<this.tripPoints.length;t++)i(new m({point:this.tripPoints[t],offersArray:this.getPointPickedOffers(this.tripPoints[t]),city:this.getPointDestination(this.tripPoints[t])}),this.tripList.getElement())}}({tripMain:M,tripEvents:E,tripEventsModel:D,offerModel:T,destinationModel:O,pointEditionModel:w});S.init()})()})();
//# sourceMappingURL=bundle.28e0212d6cfbf343ecdf.js.map