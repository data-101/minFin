"use strict";(self.webpackChunkminFin=self.webpackChunkminFin||[]).push([[2937],{2937:function(n,t,i){i.r(t),i.d(t,{ion_ripple_effect:function(){return r}});var e=i(9388),a=i(5785),o=i(7923),r=function(){function n(n){(0,a.r)(this,n),this.type="bounded"}return n.prototype.addRipple=function(n,t){return(0,e.mG)(this,void 0,void 0,(function(){var i=this;return(0,e.Jh)(this,(function(e){return[2,new Promise((function(e){(0,a.f)((function(){var o=i.el.getBoundingClientRect(),r=o.width,l=o.height,m=Math.sqrt(r*r+l*l),u=Math.max(l,r),d=i.unbounded?u:m+c,p=Math.floor(u*f),b=d/p,h=n-o.left,y=t-o.top;i.unbounded&&(h=.5*r,y=.5*l);var w=h-.5*p,k=y-.5*p,v=.5*r-h,g=.5*l-y;(0,a.c)((function(){var n=document.createElement("div");n.classList.add("ripple-effect");var t=n.style;t.top=k+"px",t.left=w+"px",t.width=t.height=p+"px",t.setProperty("--final-scale","".concat(b)),t.setProperty("--translate-end","".concat(v,"px, ").concat(g,"px")),(i.el.shadowRoot||i.el).appendChild(n),setTimeout((function(){e((function(){s(n)}))}),325)}))}))}))]}))}))},Object.defineProperty(n.prototype,"unbounded",{get:function(){return"unbounded"===this.type},enumerable:!1,configurable:!0}),n.prototype.render=function(){var n,t=(0,o.b)(this);return(0,a.h)(a.H,{role:"presentation",class:(n={},n[t]=!0,n.unbounded=this.unbounded,n)})},Object.defineProperty(n.prototype,"el",{get:function(){return(0,a.i)(this)},enumerable:!1,configurable:!0}),n}(),s=function(n){n.classList.add("fade-out"),setTimeout((function(){n.remove()}),200)},c=10,f=.5;r.style=":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}:host(.unbounded){contain:layout size style}.ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;will-change:transform, opacity;pointer-events:none}.fade-out{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1));-webkit-animation:150ms fadeOutAnimation forwards;animation:150ms fadeOutAnimation forwards}@-webkit-keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@-webkit-keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@-webkit-keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}@keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}"}}]);
//# sourceMappingURL=2937.7274e212.chunk.js.map