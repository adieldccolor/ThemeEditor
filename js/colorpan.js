(function(e,t,n){function c(e,t,n){var r=[];for(var i=0;i<e.length;i++){var s=e[i];if(s){var o=tinycolor(s);var a=o.toHsl().l<.5?"sp-thumb-el sp-thumb-dark":"sp-thumb-el sp-thumb-light";a+=tinycolor.equals(t,s)?" sp-thumb-active":"";var f=u?"background-color:"+o.toRgbString():"filter:"+o.toFilter();r.push('<span title="'+o.toRgbString()+'" data-color="'+o.toRgbString()+'" class="'+a+'"><span class="sp-thumb-inner" style="'+f+';" /></span>')}else{var l="sp-clear-display";r.push('<span title="No Color Selected" data-color="" style="background-color:transparent;" class="'+l+'"></span>')}}return"<div class='sp-cf "+n+"'>"+r.join("")+"</div>"}function h(){for(var e=0;e<s.length;e++){if(s[e]){s[e].hide()}}}function p(e,n){var i=t.extend({},r,e);i.callbacks={move:y(i.move,n),change:y(i.change,n),show:y(i.show,n),hide:y(i.hide,n),beforeShow:y(i.beforeShow,n)};return i}function d(r,d){function Tt(){if(m.showPaletteOnly){m.showPalette=true}if(m.palette){I=m.palette.slice(0);q=t.isArray(I[0])?I:[I];R={};for(var e=0;e<q.length;e++){for(var n=0;n<q[e].length;n++){var r=tinycolor(q[e][n]).toRgbString();R[r]=true}}}G.toggleClass("sp-flat",y);G.toggleClass("sp-input-disabled",!m.showInput);G.toggleClass("sp-alpha-enabled",m.showAlpha);G.toggleClass("sp-clear-enabled",xt);G.toggleClass("sp-buttons-disabled",!m.showButtons);G.toggleClass("sp-palette-disabled",!m.showPalette);G.toggleClass("sp-palette-only",m.showPaletteOnly);G.toggleClass("sp-initial-disabled",!m.showInitial);G.addClass(m.className);Xt()}function Nt(){function n(e){if(e.data&&e.data.ignore){Ft(t(this).data("color"));Rt()}else{Ft(t(this).data("color"));Rt();Wt(true);Bt()}return false}if(o){G.find("*:not(input)").attr("unselectable","on")}Tt();if(pt){K.after(dt).hide()}if(!xt){ft.hide()}if(y){K.after(G).hide()}else{var e=m.appendTo==="parent"?K.parent():t(m.appendTo);if(e.length!==1){e=t("body")}e.append(G)}Ct();vt.bind("click.spectrum touchstart.spectrum",function(e){if(!Q){Pt()}e.stopPropagation();if(!t(e.target).is("input")){e.preventDefault()}});if(K.is(":disabled")||m.disabled===true){Kt()}G.click(g);st.change(Dt);st.bind("paste",function(){setTimeout(Dt,1)});st.keydown(function(e){if(e.keyCode==13){Dt()}});at.text(m.cancelText);at.bind("click.spectrum",function(e){e.stopPropagation();e.preventDefault();Bt("cancel")});ft.attr("title",m.clearText);ft.bind("click.spectrum",function(e){e.stopPropagation();e.preventDefault();St=true;Rt();if(y){Wt(true)}});lt.text(m.chooseText);lt.bind("click.spectrum",function(e){e.stopPropagation();e.preventDefault();if(qt()){Wt(true);Bt()}});b(rt,function(e,t,n){F=e/_;St=false;if(n.shiftKey){F=Math.round(F*10)/10}Rt()},Mt,_t);b(et,function(e,t){H=parseFloat(t/O);St=false;if(!m.showAlpha){F=1}Rt()},Mt,_t);b(Y,function(e,t,n){if(!n.shiftKey){X=null}else if(!X){var r=B*k;var i=L-j*L;var s=Math.abs(e-r)>Math.abs(t-i);X=s?"x":"y"}var o=!X||X==="x";var u=!X||X==="y";if(o){B=parseFloat(e/k)}if(u){j=parseFloat((L-t)/L)}St=false;if(!m.showAlpha){F=1}Rt()},Mt,_t);if(!!gt){Ft(gt);Ut();wt=bt||tinycolor(gt).format;kt(gt)}else{Ut()}if(y){Ht()}var r=o?"mousedown.spectrum":"click.spectrum touchstart.spectrum";ot.delegate(".sp-thumb-el",r,n);ut.delegate(".sp-thumb-el:nth-child(1)",r,{ignore:true},n)}function Ct(){if(S&&e.localStorage){try{var n=e.localStorage[S].split(",#");if(n.length>1){delete e.localStorage[S];t.each(n,function(e,t){kt(t)})}}catch(r){}try{U=e.localStorage[S].split(";")}catch(r){}}}function kt(n){if(E){var r=tinycolor(n).toRgbString();if(!R[r]&&t.inArray(r,U)===-1){U.push(r);while(U.length>z){U.shift()}}if(S&&e.localStorage){try{e.localStorage[S]=U.join(";")}catch(i){}}}}function Lt(){var e=[];if(m.showPalette){for(i=0;i<U.length;i++){var t=tinycolor(U[i]).toRgbString();if(!R[t]){e.push(U[i])}}}return e.reverse().slice(0,m.maxSelectionSize)}function At(){var e=It();var n=t.map(q,function(t,n){return c(t,e,"sp-palette-row sp-palette-row-"+n)});Ct();if(U){n.push(c(Lt(),e,"sp-palette-row sp-palette-row-selection"))}ot.html(n.join(""))}function Ot(){if(m.showInitial){var e=yt;var t=It();ut.html(c([e,t],t,"sp-palette-row-initial"))}}function Mt(){if(L<=0||k<=0||O<=0){Xt()}G.addClass(W);X=null;K.trigger("dragstart.spectrum",[It()])}function _t(){G.removeClass(W);K.trigger("dragstop.spectrum",[It()])}function Dt(){var e=st.val();if((e===null||e==="")&&xt){Ft(null);Wt(true)}else{var t=tinycolor(e);if(t.ok){Ft(t);Wt(true)}else{st.addClass("sp-validation-error")}}}function Pt(){if(C){Bt()}else{Ht()}}function Ht(){var n=t.Event("beforeShow.spectrum");if(C){Xt();return}K.trigger(n,[It()]);if(T.beforeShow(It())===false||n.isDefaultPrevented()){return}h();C=true;t(V).bind("click.spectrum",Bt);t(e).bind("resize.spectrum",N);dt.addClass("sp-active");G.removeClass("sp-hidden");Xt();Ut();yt=It();Ot();T.show(yt);K.trigger("show.spectrum",[yt])}function Bt(n){if(n&&n.type=="click"&&n.button==2){return}if(!C||y){return}C=false;t(V).unbind("click.spectrum",Bt);t(e).unbind("resize.spectrum",N);dt.removeClass("sp-active");G.addClass("sp-hidden");var r=!tinycolor.equals(It(),yt);if(r){if(Et&&n!=="cancel"){Wt(true)}else{jt()}}T.hide(It());K.trigger("hide.spectrum",[It()])}function jt(){Ft(yt,true)}function Ft(e,t){if(tinycolor.equals(e,It())){Ut();return}var n,r;if(!e&&xt){St=true}else{St=false;n=tinycolor(e);r=n.toHsv();H=r.h%360/360;B=r.s;j=r.v;F=r.a}Ut();if(n&&n.ok&&!t){wt=bt||n.format}}function It(e){e=e||{};if(xt&&St){return null}return tinycolor.fromRatio({h:H,s:B,v:j,a:Math.round(F*100)/100},{format:e.format||wt})}function qt(){return!st.hasClass("sp-validation-error")}function Rt(){Ut();T.move(It());K.trigger("move.spectrum",[It()])}function Ut(){st.removeClass("sp-validation-error");zt();var e=tinycolor.fromRatio({h:H,s:1,v:1});Y.css("background-color",e.toHexString());var t=wt;if(F<1&&!(F===0&&t==="name")){if(t==="hex"||t==="hex3"||t==="hex6"||t==="name"){t="rgb"}}var n=It({format:t}),r="";mt.removeClass("sp-clear-display");mt.css("background-color","transparent");if(!n&&xt){mt.addClass("sp-clear-display")}else{var i=n.toHexString(),s=n.toRgbString();if(u||n.alpha===1){mt.css("background-color",s)}else{mt.css("background-color","transparent");mt.css("filter",n.toFilter())}if(m.showAlpha){var a=n.toRgb();a.a=0;var f=tinycolor(a).toRgbString();var l="linear-gradient(left, "+f+", "+i+")";if(o){nt.css("filter",tinycolor(f).toFilter({gradientType:1},i))}else{nt.css("background","-webkit-"+l);nt.css("background","-moz-"+l);nt.css("background","-ms-"+l);nt.css("background","linear-gradient(to right, "+f+", "+i+")")}}r=n.toString(t)}if(m.showInput){st.val(r)}if(m.showPalette){At()}Ot()}function zt(){var e=B;var t=j;if(xt&&St){it.hide();tt.hide();Z.hide()}else{it.show();tt.show();Z.show();var n=e*k;var r=L-t*L;n=Math.max(-A,Math.min(k-A,n-A));r=Math.max(-A,Math.min(L-A,r-A));Z.css({top:r+"px",left:n+"px"});var i=F*_;it.css({left:i-D/2+"px"});var s=H*O;tt.css({top:s-P+"px"})}}function Wt(e){var t=It(),n="",r=!tinycolor.equals(t,yt);if(t){n=t.toString(wt);kt(t)}if(ct){K.val(n)}yt=t;if(e&&r){T.change(t);K.trigger("change",[t])}}function Xt(){k=Y.width();L=Y.height();A=Z.height();M=et.width();O=et.height();P=tt.height();_=rt.width();D=it.width();if(!y){G.css("position","absolute");G.offset(v(G,vt))}zt();if(m.showPalette){At()}K.trigger("reflow.spectrum")}function Vt(){K.show();vt.unbind("click.spectrum touchstart.spectrum");G.remove();dt.remove();s[Qt.id]=null}function $t(e,r){if(e===n){return t.extend({},m)}if(r===n){return m[e]}m[e]=r;Tt()}function Jt(){Q=false;K.attr("disabled",false);vt.removeClass("sp-disabled")}function Kt(){Bt();Q=true;K.attr("disabled",true);vt.addClass("sp-disabled")}var m=p(d,r),y=m.flat,E=m.showSelectionPalette,S=m.localStorageKey,x=m.theme,T=m.callbacks,N=w(Xt,10),C=false,k=0,L=0,A=0,O=0,M=0,_=0,D=0,P=0,H=0,B=0,j=0,F=1,I=[],q=[],R={},U=m.selectionPalette.slice(0),z=m.maxSelectionSize,W="sp-dragging",X=null;var V=r.ownerDocument,J=V.body,K=t(r),Q=false,G=t(l,V).addClass(x),Y=G.find(".sp-color"),Z=G.find(".sp-dragger"),et=G.find(".sp-hue"),tt=G.find(".sp-slider"),nt=G.find(".sp-alpha-inner"),rt=G.find(".sp-alpha"),it=G.find(".sp-alpha-handle"),st=G.find(".sp-input"),ot=G.find(".sp-palette"),ut=G.find(".sp-initial"),at=G.find(".sp-cancel"),ft=G.find(".sp-clear"),lt=G.find(".sp-choose"),ct=K.is("input"),ht=ct&&a&&K.attr("type")==="color",pt=ct&&!y,dt=pt?t(f).addClass(x).addClass(m.className):t([]),vt=pt?dt:K,mt=dt.find(".sp-preview-inner"),gt=m.color||ct&&K.val(),yt=false,bt=m.preferredFormat,wt=bt,Et=!m.showButtons||m.clickoutFiresChange,St=!gt,xt=m.allowEmpty&&!ht;Nt();var Qt={show:Ht,hide:Bt,toggle:Pt,reflow:Xt,option:$t,enable:Jt,disable:Kt,set:function(e){Ft(e);Wt()},get:It,destroy:Vt,container:G};Qt.id=s.push(Qt)-1;return Qt}function v(e,n){var r=0;var i=e.outerWidth();var s=e.outerHeight();var o=n.outerHeight();var u=e[0].ownerDocument;var a=u.documentElement;var f=a.clientWidth+t(u).scrollLeft();var l=a.clientHeight+t(u).scrollTop();var c=n.offset();c.top+=o;c.left-=Math.min(c.left,c.left+i>f&&f>i?Math.abs(c.left+i-f):0);c.top-=Math.min(c.top,c.top+s>l&&l>s?Math.abs(s+o-r):r);return c}function m(){}function g(e){e.stopPropagation()}function y(e,t){var n=Array.prototype.slice;var r=n.call(arguments,2);return function(){return e.apply(t,r.concat(n.call(arguments)))}}function b(n,r,i,s){function d(e){if(e.stopPropagation){e.stopPropagation()}if(e.preventDefault){e.preventDefault()}e.returnValue=false}function v(e){if(a){if(o&&document.documentMode<9&&!e.button){return g()}var t=e.originalEvent.touches;var i=t?t[0].pageX:e.pageX;var s=t?t[0].pageY:e.pageY;var u=Math.max(0,Math.min(i-f.left,c));var p=Math.max(0,Math.min(s-f.top,l));if(h){d(e)}r.apply(n,[u,p,e])}}function m(e){var r=e.which?e.which==3:e.button==2;var s=e.originalEvent.touches;if(!r&&!a){if(i.apply(n,arguments)!==false){a=true;l=t(n).height();c=t(n).width();f=t(n).offset();t(u).bind(p);t(u.body).addClass("sp-dragging");if(!h){v(e)}d(e)}}}function g(){if(a){t(u).unbind(p);t(u.body).removeClass("sp-dragging");s.apply(n,arguments)}a=false}r=r||function(){};i=i||function(){};s=s||function(){};var u=n.ownerDocument||document;var a=false;var f={};var l=0;var c=0;var h="ontouchstart"in e;var p={};p["selectstart"]=d;p["dragstart"]=d;p["touchmove mousemove"]=v;p["touchend mouseup"]=g;t(n).bind("touchstart mousedown",m)}function w(e,t,n){var r;return function(){var i=this,s=arguments;var o=function(){r=null;e.apply(i,s)};if(n)clearTimeout(r);if(n||!r)r=setTimeout(o,t)}}function E(){if(e.console){if(Function.prototype.bind)E=Function.prototype.bind.call(console.log,console);else E=function(){Function.prototype.apply.call(console.log,console,arguments)};E.apply(this,arguments)}}var r={beforeShow:m,move:m,change:m,show:m,hide:m,color:false,flat:false,showInput:false,allowEmpty:false,showButtons:true,clickoutFiresChange:false,showInitial:false,showPalette:false,showPaletteOnly:false,showSelectionPalette:true,localStorageKey:false,appendTo:"body",maxSelectionSize:7,cancelText:"cancel",chooseText:"choose",clearText:"Clear Color Selection",preferredFormat:false,className:"",showAlpha:false,theme:"sp-light",palette:[["#ffffff","#000000","#ff0000","#ff8000","#ffff00","#008000","#0000ff","#4b0082","#9400d3"]],selectionPalette:[],disabled:false},s=[],o=!!/msie/i.exec(e.navigator.userAgent),u=function(){function e(e,t){return!!~(""+e).indexOf(t)}var t=document.createElement("div");var n=t.style;n.cssText="background-color:rgba(0,0,0,.5)";return e(n.backgroundColor,"rgba")||e(n.backgroundColor,"hsla")}(),a=function(){var e=t("<input type='color' value='!' />")[0];return e.type==="color"&&e.value!=="!"}(),f=["<div class='sp-replacer'>","<div class='sp-preview'><div class='sp-preview-inner'></div></div>","<div class='sp-dd'>&#9660;</div>","</div>"].join(""),l=function(){var e="";if(o){for(var t=1;t<=6;t++){e+="<div class='sp-"+t+"'></div>"}}return["<div class='sp-container sp-hidden'>","<div class='sp-palette-container'>","<div class='sp-palette sp-thumb sp-cf'></div>","</div>","<div class='sp-picker-container'>","<div class='sp-top sp-cf'>","<div class='sp-fill'></div>","<div class='sp-top-inner'>","<div class='sp-color'>","<div class='sp-sat'>","<div class='sp-val'>","<div class='sp-dragger'></div>","</div>","</div>","</div>","<div class='sp-clear sp-clear-display'>","</div>","<div class='sp-hue'>","<div class='sp-slider'></div>",e,"</div>","</div>","<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>","</div>","<div class='sp-input-container sp-cf'>","<input class='sp-input' type='text' spellcheck='false'  />","</div>","<div class='sp-initial sp-thumb sp-cf'></div>","<div class='sp-button-container sp-cf'>","<a class='sp-cancel' href='#'></a>","<button class='sp-choose'></button>","</div>","</div>","</div>"].join("")}();var S="spectrum.id";t.fn.spectrum=function(e,n){if(typeof e=="string"){var r=this;var i=Array.prototype.slice.call(arguments,1);this.each(function(){var n=s[t(this).data(S)];if(n){var o=n[e];if(!o){throw new Error("Spectrum: no such method: '"+e+"'")}if(e=="get"){r=n.get()}else if(e=="container"){r=n.container}else if(e=="option"){r=n.option.apply(n,i)}else if(e=="destroy"){n.destroy();t(this).removeData(S)}else{o.apply(n,i)}}});return r}return this.spectrum("destroy").each(function(){var n=t.extend({},e,t(this).data());var r=d(this,n);t(this).data(S,r.id)})};t.fn.spectrum.load=true;t.fn.spectrum.loadOpts={};t.fn.spectrum.draggable=b;t.fn.spectrum.defaults=r;t.spectrum={};t.spectrum.localization={};t.spectrum.palettes={};t.fn.spectrum.processNativeColorInputs=function(){if(!a){t("input[type=color]").spectrum({preferredFormat:"hex6"})}};(function(){function f(e,t){e=e?e:"";t=t||{};if(typeof e=="object"&&e.hasOwnProperty("_tc_id")){return e}var n=l(e);var i=n.r,o=n.g,u=n.b,a=n.a,c=s(100*a)/100,p=t.format||n.format;if(i<1){i=s(i)}if(o<1){o=s(o)}if(u<1){u=s(u)}return{ok:n.ok,format:p,_tc_id:r++,alpha:a,getAlpha:function(){return a},setAlpha:function(e){a=E(e);c=s(100*a)/100},toHsv:function(){var e=d(i,o,u);return{h:e.h*360,s:e.s,v:e.v,a:a}},toHsvString:function(){var e=d(i,o,u);var t=s(e.h*360),n=s(e.s*100),r=s(e.v*100);return a==1?"hsv("+t+", "+n+"%, "+r+"%)":"hsva("+t+", "+n+"%, "+r+"%, "+c+")"},toHsl:function(){var e=h(i,o,u);return{h:e.h*360,s:e.s,l:e.l,a:a}},toHslString:function(){var e=h(i,o,u);var t=s(e.h*360),n=s(e.s*100),r=s(e.l*100);return a==1?"hsl("+t+", "+n+"%, "+r+"%)":"hsla("+t+", "+n+"%, "+r+"%, "+c+")"},toHex:function(e){return m(i,o,u,e)},toHexString:function(e){return"#"+this.toHex(e)},toHex8:function(){return g(i,o,u,a)},toHex8String:function(){return"#"+this.toHex8()},toRgb:function(){return{r:s(i),g:s(o),b:s(u),a:a}},toRgbString:function(){return a==1?"rgb("+s(i)+", "+s(o)+", "+s(u)+")":"rgba("+s(i)+", "+s(o)+", "+s(u)+", "+c+")"},toPercentageRgb:function(){return{r:s(S(i,255)*100)+"%",g:s(S(o,255)*100)+"%",b:s(S(u,255)*100)+"%",a:a}},toPercentageRgbString:function(){return a==1?"rgb("+s(S(i,255)*100)+"%, "+s(S(o,255)*100)+"%, "+s(S(u,255)*100)+"%)":"rgba("+s(S(i,255)*100)+"%, "+s(S(o,255)*100)+"%, "+s(S(u,255)*100)+"%, "+c+")"},toName:function(){if(a===0){return"transparent"}return b[m(i,o,u,true)]||false},toFilter:function(e){var n="#"+g(i,o,u,a);var r=n;var s=t&&t.gradientType?"GradientType = 1, ":"";if(e){var l=f(e);r=l.toHex8String()}return"progid:DXImageTransform.Microsoft.gradient("+s+"startColorstr="+n+",endColorstr="+r+")"},toString:function(e){var t=!!e;e=e||this.format;var n=false;var r=!t&&a<1&&a>0;var i=r&&(e==="hex"||e==="hex6"||e==="hex3"||e==="name");if(e==="rgb"){n=this.toRgbString()}if(e==="prgb"){n=this.toPercentageRgbString()}if(e==="hex"||e==="hex6"){n=this.toHexString()}if(e==="hex3"){n=this.toHexString(true)}if(e==="hex8"){n=this.toHex8String()}if(e==="name"){n=this.toName()}if(e==="hsl"){n=this.toHslString()}if(e==="hsv"){n=this.toHsvString()}if(i){return this.toRgbString()}return n||this.toHexString()}}}function l(e){var t={r:0,g:0,b:0};var n=1;var r=false;var i=false;if(typeof e=="string"){e=_(e)}if(typeof e=="object"){if(e.hasOwnProperty("r")&&e.hasOwnProperty("g")&&e.hasOwnProperty("b")){t=c(e.r,e.g,e.b);r=true;i=String(e.r).substr(-1)==="%"?"prgb":"rgb"}else if(e.hasOwnProperty("h")&&e.hasOwnProperty("s")&&e.hasOwnProperty("v")){e.s=L(e.s);e.v=L(e.v);t=v(e.h,e.s,e.v);r=true;i="hsv"}else if(e.hasOwnProperty("h")&&e.hasOwnProperty("s")&&e.hasOwnProperty("l")){e.s=L(e.s);e.l=L(e.l);t=p(e.h,e.s,e.l);r=true;i="hsl"}if(e.hasOwnProperty("a")){n=e.a}}n=E(n);return{ok:r,format:e.format||i,r:o(255,u(t.r,0)),g:o(255,u(t.g,0)),b:o(255,u(t.b,0)),a:n}}function c(e,t,n){return{r:S(e,255)*255,g:S(t,255)*255,b:S(n,255)*255}}function h(e,t,n){e=S(e,255);t=S(t,255);n=S(n,255);var r=u(e,t,n),i=o(e,t,n);var s,a,f=(r+i)/2;if(r==i){s=a=0}else{var l=r-i;a=f>.5?l/(2-r-i):l/(r+i);switch(r){case e:s=(t-n)/l+(t<n?6:0);break;case t:s=(n-e)/l+2;break;case n:s=(e-t)/l+4;break}s/=6}return{h:s,s:a,l:f}}function p(e,t,n){function o(e,t,n){if(n<0)n+=1;if(n>1)n-=1;if(n<1/6)return e+(t-e)*6*n;if(n<1/2)return t;if(n<2/3)return e+(t-e)*(2/3-n)*6;return e}var r,i,s;e=S(e,360);t=S(t,100);n=S(n,100);if(t===0){r=i=s=n}else{var u=n<.5?n*(1+t):n+t-n*t;var a=2*n-u;r=o(a,u,e+1/3);i=o(a,u,e);s=o(a,u,e-1/3)}return{r:r*255,g:i*255,b:s*255}}function d(e,t,n){e=S(e,255);t=S(t,255);n=S(n,255);var r=u(e,t,n),i=o(e,t,n);var s,a,f=r;var l=r-i;a=r===0?0:l/r;if(r==i){s=0}else{switch(r){case e:s=(t-n)/l+(t<n?6:0);break;case t:s=(n-e)/l+2;break;case n:s=(e-t)/l+4;break}s/=6}return{h:s,s:a,v:f}}function v(e,t,n){e=S(e,360)*6;t=S(t,100);n=S(n,100);var r=i.floor(e),s=e-r,o=n*(1-t),u=n*(1-s*t),a=n*(1-(1-s)*t),f=r%6,l=[n,u,o,o,a,n][f],c=[a,n,n,u,o,o][f],h=[o,o,a,n,n,u][f];return{r:l*255,g:c*255,b:h*255}}function m(e,t,n,r){var i=[k(s(e).toString(16)),k(s(t).toString(16)),k(s(n).toString(16))];if(r&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)){return i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)}return i.join("")}function g(e,t,n,r){var i=[k(A(r)),k(s(e).toString(16)),k(s(t).toString(16)),k(s(n).toString(16))];return i.join("")}function w(e){var t={};for(var n in e){if(e.hasOwnProperty(n)){t[e[n]]=n}}return t}function E(e){e=parseFloat(e);if(isNaN(e)||e<0||e>1){e=1}return e}function S(e,t){if(N(e)){e="100%"}var n=C(e);e=o(t,u(0,parseFloat(e)));if(n){e=parseInt(e*t,10)/100}if(i.abs(e-t)<1e-6){return 1}return e%t/parseFloat(t)}function x(e){return o(1,u(0,e))}function T(e){return parseInt(e,16)}function N(e){return typeof e=="string"&&e.indexOf(".")!=-1&&parseFloat(e)===1}function C(e){return typeof e==="string"&&e.indexOf("%")!=-1}function k(e){return e.length==1?"0"+e:""+e}function L(e){if(e<=1){e=e*100+"%"}return e}function A(e){return Math.round(parseFloat(e)*255).toString(16)}function O(e){return T(e)/255}function _(e){e=e.replace(t,"").replace(n,"").toLowerCase();var r=false;if(y[e]){e=y[e];r=true}else if(e=="transparent"){return{r:0,g:0,b:0,a:0,format:"name"}}var i;if(i=M.rgb.exec(e)){return{r:i[1],g:i[2],b:i[3]}}if(i=M.rgba.exec(e)){return{r:i[1],g:i[2],b:i[3],a:i[4]}}if(i=M.hsl.exec(e)){return{h:i[1],s:i[2],l:i[3]}}if(i=M.hsla.exec(e)){return{h:i[1],s:i[2],l:i[3],a:i[4]}}if(i=M.hsv.exec(e)){return{h:i[1],s:i[2],v:i[3]}}if(i=M.hex8.exec(e)){return{a:O(i[1]),r:T(i[2]),g:T(i[3]),b:T(i[4]),format:r?"name":"hex8"}}if(i=M.hex6.exec(e)){return{r:T(i[1]),g:T(i[2]),b:T(i[3]),format:r?"name":"hex"}}if(i=M.hex3.exec(e)){return{r:T(i[1]+""+i[1]),g:T(i[2]+""+i[2]),b:T(i[3]+""+i[3]),format:r?"name":"hex"}}return false}var t=/^[\s,#]+/,n=/\s+$/,r=0,i=Math,s=i.round,o=i.min,u=i.max,a=i.random;f.fromRatio=function(e,t){if(typeof e=="object"){var n={};for(var r in e){if(e.hasOwnProperty(r)){if(r==="a"){n[r]=e[r]}else{n[r]=L(e[r])}}}e=n}return f(e,t)};f.equals=function(e,t){if(!e||!t){return false}return f(e).toRgbString()==f(t).toRgbString()};f.random=function(){return f.fromRatio({r:a(),g:a(),b:a()})};f.desaturate=function(e,t){t=t===0?0:t||10;var n=f(e).toHsl();n.s-=t/100;n.s=x(n.s);return f(n)};f.saturate=function(e,t){t=t===0?0:t||10;var n=f(e).toHsl();n.s+=t/100;n.s=x(n.s);return f(n)};f.greyscale=function(e){return f.desaturate(e,100)};f.lighten=function(e,t){t=t===0?0:t||10;var n=f(e).toHsl();n.l+=t/100;n.l=x(n.l);return f(n)};f.darken=function(e,t){t=t===0?0:t||10;var n=f(e).toHsl();n.l-=t/100;n.l=x(n.l);return f(n)};f.complement=function(e){var t=f(e).toHsl();t.h=(t.h+180)%360;return f(t)};f.triad=function(e){var t=f(e).toHsl();var n=t.h;return[f(e),f({h:(n+120)%360,s:t.s,l:t.l}),f({h:(n+240)%360,s:t.s,l:t.l})]};f.tetrad=function(e){var t=f(e).toHsl();var n=t.h;return[f(e),f({h:(n+90)%360,s:t.s,l:t.l}),f({h:(n+180)%360,s:t.s,l:t.l}),f({h:(n+270)%360,s:t.s,l:t.l})]};f.splitcomplement=function(e){var t=f(e).toHsl();var n=t.h;return[f(e),f({h:(n+72)%360,s:t.s,l:t.l}),f({h:(n+216)%360,s:t.s,l:t.l})]};f.analogous=function(e,t,n){t=t||6;n=n||30;var r=f(e).toHsl();var i=360/n;var s=[f(e)];for(r.h=(r.h-(i*t>>1)+720)%360;--t;){r.h=(r.h+i)%360;s.push(f(r))}return s};f.monochromatic=function(e,t){t=t||6;var n=f(e).toHsv();var r=n.h,i=n.s,s=n.v;var o=[];var u=1/t;while(t--){o.push(f({h:r,s:i,v:s}));s=(s+u)%1}return o};f.readability=function(e,t){var n=f(e).toRgb();var r=f(t).toRgb();var i=(n.r*299+n.g*587+n.b*114)/1e3;var s=(r.r*299+r.g*587+r.b*114)/1e3;var o=Math.max(n.r,r.r)-Math.min(n.r,r.r)+Math.max(n.g,r.g)-Math.min(n.g,r.g)+Math.max(n.b,r.b)-Math.min(n.b,r.b);return{brightness:Math.abs(i-s),color:o}};f.readable=function(e,t){var n=f.readability(e,t);return n.brightness>125&&n.color>500};f.mostReadable=function(e,t){var n=null;var r=0;var i=false;for(var s=0;s<t.length;s++){var o=f.readability(e,t[s]);var u=o.brightness>125&&o.color>500;var a=3*(o.brightness/125)+o.color/500;if(u&&!i||u&&i&&a>r||!u&&!i&&a>r){i=u;r=a;n=f(t[s])}}return n};var y=f.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};var b=f.hexNames=w(y);var M=function(){var e="[-\\+]?\\d+%?";var t="[-\\+]?\\d*\\.\\d+%?";var n="(?:"+t+")|(?:"+e+")";var r="[\\s|\\(]+("+n+")[,|\\s]+("+n+")[,|\\s]+("+n+")\\s*\\)?";var i="[\\s|\\(]+("+n+")[,|\\s]+("+n+")[,|\\s]+("+n+")[,|\\s]+("+n+")\\s*\\)?";return{rgb:new RegExp("rgb"+r),rgba:new RegExp("rgba"+i),hsl:new RegExp("hsl"+r),hsla:new RegExp("hsla"+i),hsv:new RegExp("hsv"+r),hex3:/^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex8:/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();e.tinycolor=f})();t(function(){if(t.fn.spectrum.load){t.fn.spectrum.processNativeColorInputs()}})})(window,jQuery)

var colorpan = null, style = null, $body = $('body'), $head = $('head'), panState = null, settings = null, preStyle = null, less, initHeight = null;

$body.css({opacity:0.0});

if(typeof String.prototype.setBaseColor !== 'function') {
  String.prototype.setBaseColor = function() {
  	colorpan.setBaseColor(this);
    return "Color " + this + " setted as base color."; 
  }
}

function darken(color, p){
color = new less.tree.Color(color.replace(/\#/g,''));
return less.tree.functions.darken(color, {value: p}).toCSS();
}
function lighten(colorL, p){
colorL = colorL.replace(/\#/g,'');
colorL = new less.tree.Color(colorL);
return less.tree.functions.lighten(colorL, {value: p}).toCSS();
}
function desaturate(colorD, p){
colorD = new less.tree.Color(colorD.replace(/\#/g,''));
return less.tree.functions.desaturate(colorD, {value: p}).toCSS();
}

function highlight(element){
	TweenMax.to(element, 0.5, {boxShadow: '0px 3px 10px rgba(0,0,0,0.8) ', opacity: 0.2, repeat: 1, yoyo: true});
}





/*settings = {
	advanced: false,
	baseColor: '#2483E9',
	mainMenuColor: "",
	mainMenuColor_hover: "",
	row_featured_icon_bg: "",
	row_featured_color: "",
	row_featured_icon_color: "",
	row_featured_center_bg: "",
	h1_color: "",
	h2_color: "",
	h3_color: "",
	theme_btn_color: "",
	theme_btn_bg: "",
	theme_btn_bg_hover: "",
	theme_btnSecondary_bg_hover: "",
	theme_btnNoBtn_bg_hover: "",
	masthead_bg: "",
	subnav_bg: "",
	baseColor_darkenVariation: "",
	stylesheet: '',
	content_id: 50
}
@baseColor: #0069AA; 
@mainMenuColor: #777;
@mainMenuColor_hover: @baseColor_darkenVariation;
@h1_color: @baseColor;
@h2_color: desaturate(darken(@baseColor, 10%), 30%);
@h3_color:desaturate(darken(@baseColor, 5%), 20%);
@masthead_bg: desaturate(darken(@baseColor, 10%), 40%);
@subnav_bg: desaturate(darken(@baseColor, 30%), 40%);
@baseColor_darkenVariation: desaturate(darken(@baseColor, 10%), 40%);
*/

settings = {
    advanced: false,
    baseColor: '#2483E9',
    mainMenuColor: "",
    mainMenuColor_hover: "",
    h1_color: "",
    h2_color: "",
    h3_color: "",
    masthead_bg: "",
    subnav_bg: "",
    baseColor_darkenVariation: "",
    stylesheet: '',
    content_id: 50
};


colorpan = {};
colorpan.createPan = function(){
	var pan_pill = '<div class="pan-color-gen-pill builder-collapse" title="Theme Options">Theme Builder</div>';
	var pan = '<div class="options-pane" id="options-pane">'
			+ '<div class="btn-options"><div class="col-md-6 col-sm-8 col-xs-12 btn-group">'
			+ '<a href="javascript:;" class="btn btn-default builder-collapse">Cancel</a>'
			+ '<a href="javascript:;" class="btn btn-default save-btn">Save</a>'
			+ '</div><div class="col-md-4 col-sm-4 col-xs-12 col-md-offset-2 btn-group">'
			+ '<a href="javascript:;" class="btn btn-default advanced-btn">Advanced</a>'
			// + '<a href="javascript:;" class="btn btn-default" id="full-sc"><span class="glyphicon glyphicon-resize-full"></span>&nbsp;</a>'
			+ '</div><div class="clearfix"></div></div>'
			+ '<div class="opt-cube"><div class="col-md-12 simple-opt">'
			+ '<h2>Color Scheme</h2>'
			+ '<div class="col-md-3 col-sm-4 col-xs-12"><label for="baseColor">BASE COLOR</label> &nbsp;'
			+ '<input type="text" id="baseColor" value="' + settings.baseColor + '" /></div>'
			+ '</div> <!-- end of first row -->' //end of first row
			+ '<div class="col-md-12 advanced-opt">'
			+ '<h2>Advanced</h2>'
			+ '<div class="col-md-3 col-sm-4 col-xm-12"><label for="mainMenuColor" >MENU TEXT COLOR</label>&nbsp;<input type="text" id="mainMenuColor" class="genColor" data-color-var="mainMenuColor"></div>'
			+ '<div class="col-md-3 col-sm-4 col-xm-12"><label for="mainMenuColor_hover" >MENU TEXT COLOR HOVER</label>&nbsp;<input type="text" id="mainMenuColor_hover" class="genColor" data-color-var="mainMenuColor_hover"></div>'
			+ '<div classs="col-md-6 col-sm-4 col-xs-12"></div><div class="clearfix"></div><br>'
			+ '<div class="col-md-3 col-sm-4 col-xm-12"><label for="h_oneColor">Header 1 Text Color</label>&nbsp;<input type="text" id="h_oneColor" class="genColor" data-color-var="h1_color"></div>'
			+ '<div class="col-md-3 col-sm-4 col-xm-12"><label for="h_twoColor">Header 2 Text Color</label>&nbsp;<input type="text" id="h_twoColor" class="genColor" data-color-var="h2_color"></div>'
			+ '<div class="col-md-3 col-sm-4 col-xm-12"><label for="h_threeColor">Header 3 Text Color</label>&nbsp;<input type="text" id="h_threeColor" class="genColor" data-color-var="h3_color"></div>'
			+ '<div class="clearfix"></div><br>'
			+ '<div class="col-md-3 col-sm-4 col-xm-12"><label for="masthead_bg">MastHead Background</label>&nbsp;<input type="text" id="masthead_bg" class="genColor" data-color-var="masthead_bg"></div>'
			+ '<div class="col-md-3 col-sm-4 col-xm-12"><label for="subnav_bg">Subnavigation Background</label>&nbsp;<input type="text" id="subnav_bg" class="genColor" data-color-var="subnav_bg"></div>'
			+ '<div class="col-md-3 col-sm-4 col-xm-12"><label for="baseColor_darkenVariation">Footer Background</label>&nbsp;<input type="text" id="baseColor_darkenVariation" class="genColor" data-color-var="baseColor_darkenVariation"></div>'
			+'</div></div>'
			+'</div>';
	$body.append(pan_pill + pan);
	$body.append('<div class="themebuilder__fakepanel" style="height: 50px"></div>');
}
colorpan.panStyleSheet = {
	styleStart: function(){
		var styles = '<style rel="stylesheet" type="text/css">'
		+ '/* **************  **** THEME PANEL STYLES ****  **************** */';
		return styles;
	},
	styleCompile: function(){
		style = this.styleStart() + style + '</style>';
		$head.append(style);
		return style;
	},
	addStyle: function(styles){
		style += styles;
		return style;
	}
}
colorpan.setBaseColor = function(color){
	less.modifyVars({'@baseColor': color});
	settings.baseColor = color;

    //modify vars based on baseColor
	settings.h1_color = color;
	settings.h2_color = desaturate(darken(color, 40), 50);
	settings.h3_color = color;
	settings.masthead_bg = desaturate(darken(color, 40), 50);
	settings.subnav_bg = desaturate(darken(color, 30), 50);
	settings.baseColor_darkenVariation = desaturate(darken(color, 30), 50);
	settings.mainMenuColor_hover = settings.baseColor_darkenVariation;

	$('.genColor').each(function(){
		var _var = $(this).attr('data-color-var');
		$(this).spectrum("set", settings[_var]);
	});
}

colorpan.changeVariable = function(variable, value){
	// var _lessVariable = '@' + variable;
	// eval("less.modifyVars({'"+_lessVariable+"': '"+value+"'})");
	settings[variable] = value;

	//change all variables to not lose the actual coloring
	less.modifyVars({
		'@baseColor': settings.baseColor,
		'@mainMenuColor': settings.mainMenuColor,
		'@mainMenuColor_hover': settings.mainMenuColor_hover,
		'@h1_color': settings.h1_color,
		'@h2_color': settings.h2_color,
		'@h3_color': settings.h3_color,
		'@masthead_bg': settings.masthead_bg,
		'@subnav_bg': settings.subnav_bg,
		'@baseColor_darkenVariation': settings.baseColor_darkenVariation
	});

  
	return variable + " changed to " + value;
}

colorpan.save = function(){
	var css = $('style[id*="less:"]').last().html();
	settings.stylesheet = css;
	var conf = JSON.stringify(settings);
	if(ellie!=null){
		var isSent = ellie.sendData(conf, path + 'saveContent.aspx?cid='+settings.content_id);
	}else{
		console.log('Ellie is not defined');
		return false;
	}
}

colorpan.get = function(){
	if(less!=null){
		if(ellie!=null){
			preStyle = ellie.getCRMStyle(ajax_path + "pid=" + settings.content_id);
		}
	}else{
		if(ellie!=null){
			if(ellie.Collection.get('stylesheet')!="null"){
			    colorpan.loadStyle(ellie.Collection.get('stylesheet'));
			}else{
				preStyle = ellie.getCRMStyle(ajax_path + "pid=" + settings.content_id);
			}
		}
	}
}

colorpan.loadStyle = function(data){
	
	if(data==null || data=="" || data==" " || data.length<10 || data.indexOf('lorem')>-1){
		$head.append('<link href="' + path + 'css/style.css" rel="stylesheet">');
	}else{
		preStyle = jQuery.parseJSON(data);
		console.log(preStyle);
		if(less!=null){
		 $('link[rel="stylesheet/less"]').before('<style>'+preStyle.stylesheet+'</style>');
		} else {
			$('style,link').last().after('<style>'+preStyle.stylesheet+'</style>');
		}

		if(less!=null){


			$('#baseColor').spectrum("set", preStyle.baseColor);
			settings = preStyle;
			$('.genColor').each(function(){
				var _var = $(this).attr('data-color-var');
				$(this).spectrum("set", preStyle[_var]);
			});

			if(preStyle.advanced==true || preStyle.advanced=="true"){
				colorpan.changeVariable('baseColor', preStyle.baseColor);
				$('.advanced-btn').click();
			}else{
				colorpan.setBaseColor(preStyle.baseColor);
			}



		}
	}



	$('.loadingState').hide();
	$body.animate({opacity: 1}, 500);
}

function resizePane() {
    var $pane = $('.options-pane'),
        $fake = $('.themebuilder__fakepanel');
    $fake.css({ height: $pane.outerHeight() });
}

var delayTime = 0;
function resizePaneDelayed() {
    clearTimeout(delayTime);

    delayTime = setTimeout(function () {
        resizePane();
    }, 100);
}


colorpan.handleEvents = function(){
    this.get();

    resizePaneDelayed();


	if(less!=null){



		$('#baseColor').spectrum({
		    showInput: true,
		    showAlpha: true,
		    showPalette: true,
		    clickoutFiresChange: true,
		    preferredFormat: "hex",
		    showInitial: true,
		    palette: [
		        ['rgb(182, 205, 143)', 'rgb(143, 189, 67)', 'rgb(97, 175, 58)'],
		        ['rgb(236, 125, 125)', 'rgb(225, 86, 86)', 'rgb(225, 50, 50)'],
		        ['rgb(147, 173, 237)', 'rgb(113, 146, 228)', 'rgb(68, 110, 211)'],
		        ['rgb(205, 181, 143)', 'rgb(205, 167, 106)', 'rgb(198, 146, 63)']
		    ],
		    change: function(color) {
			    var newColor = color.toString(); // #ff0000
			    newColor.setBaseColor();
			    console.log(newColor.setBaseColor());
			}
		}).on("dragstop.spectrum", function(e, color) {
		    var newColor = color.toString(); // #ff0000
			    newColor.setBaseColor();
		});


		$('.genColor').each(function(_index, _obj){
			var _var = $(this).attr('data-color-var');
			var _color = settings[_var];
			$(this).spectrum({
			    showInput: true,
			    showAlpha: true,
			    showPalette: true,
			    clickoutFiresChange: true,
			    preferredFormat: "hex",
			    showInitial: true,
			    palette: [
			        ['rgb(182, 205, 143)', 'rgb(143, 189, 67)', 'rgb(97, 175, 58)'],
			        ['rgb(236, 125, 125)', 'rgb(225, 86, 86)', 'rgb(225, 50, 50)'],
			        ['rgb(147, 173, 237)', 'rgb(113, 146, 228)', 'rgb(68, 110, 211)'],
			        ['rgb(205, 181, 143)', 'rgb(205, 167, 106)', 'rgb(198, 146, 63)']
			    ],
			    change: function(color) {
				    var newColor = color.toString();
				    colorpan.changeVariable(_var, newColor);
				}
			}).on("dragstop.spectrum", function(e, color) {
			    var newColor = color.toString();
				    colorpan.changeVariable(_var, newColor);
			}).spectrum("set", _color);
		});

		$body.on('click', '.builder-collapse', function(){
			if(panState){
				$('.pan-color-gen-pill').removeClass('active');
				TweenLite.to([$('.pan-color-gen-pill')], 0.5, {marginLeft: '-2px'});
				TweenLite.to($('.options-pane'), 0.5, {bottom: '-100%'});
				panState = false;
			}else{
				TweenLite.to([$('.pan-color-gen-pill')], 0.5, {marginLeft: '-100%'});
				$('.pan-color-gen-pill').addClass('active');
				TweenLite.to($('.options-pane'), 0.5, {bottom: 0});
				panState = true;
			}
		}).on('click', '.save-btn', function(){
			colorpan.save();
		}).on('click', '.advanced-btn', function(){
			if($(this).hasClass('active')) settings.advanced = true;
			else settings.advanced = false;
			$(this).toggleClass('active');
			$('.opt-cube').toggleClass('advanced');
			// if(parseInt($('#options-pane').css('height'))==window.innerHeight){}else{
			// 	$('#options-pane').css('height', 'auto');
			// }
			settings.advanced = settings.advanced ? false : true;

			resizePaneDelayed();
		}).on('click', '#full-sc', function(){
			if(parseInt($('#options-pane').css('height'))==window.innerHeight){
				TweenMax.to($('#options-pane'), 0.5, {minHeight: initHeight, height: '0'});
				$(this).removeClass('active');
			}else{
				initHeight = $('#options-pane').css('height');
				TweenMax.to($('#options-pane'), 0.5, {height: '100%'});
				$(this).addClass('active');
			}
		});

		TweenLite.to([$('.pan-color-gen-pill')], 0.5, {marginLeft: '-100%'});
		$('.pan-color-gen-pill').addClass('active');
		TweenLite.to($('.options-pane'), 0.5, {bottom: 0});
		panState = true;


	}




}








var ellie = {};
ellie.sendData = function (data, url, callback) {
    var cData = null;

    cData = { "content": data };
    console.log("Update content");


    $.ajax({
        url: url,
        data: cData,
        type: 'POST',
        success: function (resA) {
           
            if (typeof callback != "undefined" && typeof callback == "function") {
                callback(resA);
            }
            
            // console.log(cData);
            // console.log(resA);
        }
    });
}

ellie.getCRMStyle = function (data_load) {
    
    $.ajax({
        url: data_load,
        success: function (res) {
            // res = decodeURIComponent(res);
            // res = jQuery.parseJSON(res);
            // console.log(res);
            colorpan.loadStyle(res);
            ellie.Collection.create('stylesheet', res);
        }
    });
}

var alphabetCollections = [];
ellie.Collection = {
    create: function (name, data) {
        alphabetCollections[name] = data;
    },
    get: function (name) {
        return alphabetCollections[name] != undefined ? alphabetCollections[name] : "null";
    }
};



$(document).on('ready', function(){

if(less!=null){

colorpan.createPan();
/* **************** styles ******************* */

style = '.sp-container{position:absolute;top:0;left:0;display:inline-block;*display:inline;*zoom:1;z-index:9999994;overflow:hidden}.sp-container.sp-flat{position:relative}.sp-container,.sp-container *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.sp-top{position:relative;width:100%;display:inline-block}.sp-top-inner{position:absolute;top:0;left:0;bottom:0;right:0}.sp-color{position:absolute;top:0;left:0;bottom:0;right:20%}.sp-hue{position:absolute;top:0;right:0;bottom:0;left:84%;height:100%}.sp-clear-enabled .sp-hue{top:33px;height:77.5%}.sp-fill{padding-top:80%}.sp-sat,.sp-val{position:absolute;top:0;left:0;right:0;bottom:0}.sp-alpha-enabled .sp-top{margin-bottom:18px}.sp-alpha-enabled .sp-alpha{display:block}.sp-alpha-handle{position:absolute;top:-4px;bottom:-4px;width:6px;left:50%;cursor:pointer;border:1px solid #000;background:#fff;opacity:.8}.sp-alpha{display:none;bottom:-14px;right:0;left:0;height:8px}.sp-alpha-inner{border:solid 1px #333}.sp-clear{display:none}.sp-clear.sp-clear-display{background-position:center}.sp-clear-enabled .sp-clear{display:block;position:absolute;top:0;right:0;bottom:0;left:84%;height:28px}.sp-alpha,.sp-alpha-handle,.sp-clear,.sp-container,.sp-container button,.sp-container.sp-dragging .sp-input,.sp-dragger,.sp-preview,.sp-replacer,.sp-slider{-webkit-user-select:none;-moz-user-select:-moz-none;-o-user-select:none;user-select:none}.sp-container.sp-buttons-disabled .sp-button-container,.sp-container.sp-input-disabled .sp-input-container,.sp-initial-disabled .sp-initial,.sp-palette-disabled .sp-palette-container,.sp-palette-only .sp-picker-container{display:none}.sp-sat{background-image:-webkit-gradient(linear,0 0,100% 0,from(#FFF),to(rgba(204,154,129,0)));background-image:-webkit-linear-gradient(left,#FFF,rgba(204,154,129,0));background-image:-moz-linear-gradient(left,#fff,rgba(204,154,129,0));background-image:-o-linear-gradient(left,#fff,rgba(204,154,129,0));background-image:-ms-linear-gradient(left,#fff,rgba(204,154,129,0));background-image:linear-gradient(to right,#fff,rgba(204,154,129,0));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr=#FFFFFFFF, endColorstr=#00CC9A81)";filter:progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr=\'#FFFFFFFF\', endColorstr=\'#00CC9A81\')}.sp-val{background-image:-webkit-gradient(linear,0 100%,0 0,from(#000),to(rgba(204,154,129,0)));background-image:-webkit-linear-gradient(bottom,#000,rgba(204,154,129,0));background-image:-moz-linear-gradient(bottom,#000,rgba(204,154,129,0));background-image:-o-linear-gradient(bottom,#000,rgba(204,154,129,0));background-image:-ms-linear-gradient(bottom,#000,rgba(204,154,129,0));background-image:linear-gradient(to top,#000,rgba(204,154,129,0));-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#00CC9A81, endColorstr=#FF000000)";filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#00CC9A81\', endColorstr=\'#FF000000\')}.sp-hue{background:-moz-linear-gradient(top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);background:-ms-linear-gradient(top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);background:-o-linear-gradient(top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);background:-webkit-gradient(linear,left top,left bottom,from(red),color-stop(0.17,#ff0),color-stop(0.5,#0f0),color-stop(0.5,#0ff),color-stop(0.67,#00f),color-stop(0.83,#f0f),to(red));background:-webkit-linear-gradient(top,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}.sp-1{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ff0000\', endColorstr=\'#ffff00\')}.sp-2{height:16%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffff00\', endColorstr=\'#00ff00\')}.sp-3{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#00ff00\', endColorstr=\'#00ffff\')}.sp-4{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#00ffff\', endColorstr=\'#0000ff\')}.sp-5{height:16%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#0000ff\', endColorstr=\'#ff00ff\')}.sp-6{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ff00ff\', endColorstr=\'#ff0000\')}.sp-hidden{display:none!important}.sp-cf:after,.sp-cf:before{content:"";display:table}.sp-cf:after{clear:both}.sp-cf{*zoom:1}@media (max-device-width:480px){.sp-color{right:40%}.sp-hue{left:63%}.sp-fill{padding-top:60%}}.sp-dragger{border-radius:5px;height:5px;width:5px;border:1px solid #fff;background:#000;cursor:pointer;position:absolute;top:0;left:0}.sp-slider{position:absolute;top:0;cursor:pointer;height:3px;left:-1px;right:-1px;border:1px solid #000;background:#fff;opacity:.8}.sp-container{border-radius:0;background-color:#ECECEC;border:solid 1px #f0c49B;padding:0}.sp-clear,.sp-color,.sp-container,.sp-container button,.sp-container input,.sp-hue{font:400 12px "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Verdana,sans-serif;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}.sp-top{margin-bottom:3px}.sp-clear,.sp-color,.sp-hue{border:solid 1px #666}.sp-input-container{float:right;width:100px;margin-bottom:4px}.sp-initial-disabled .sp-input-container{width:100%}.sp-input{font-size:12px!important;border:1px inset;padding:4px 5px;margin:0;width:100%;background:0 0;border-radius:3px;color:#222}.sp-input:focus{border:1px solid orange}.sp-input.sp-validation-error{border:1px solid red;background:#fdd}.sp-palette-container,.sp-picker-container{float:left;position:relative;padding:10px;padding-bottom:300px;margin-bottom:-290px}.sp-picker-container{width:172px;border-left:solid 1px #fff}.sp-palette-container{border-right:solid 1px #ccc}.sp-palette .sp-thumb-el{display:block;position:relative;float:left;cursor:pointer}.sp-palette .sp-thumb-el.sp-thumb-active,.sp-palette .sp-thumb-el:hover{border-color:orange}.sp-initial{float:left;border:solid 1px #333}.sp-initial span{width:30px;height:25px;border:none;display:block;float:left;margin:0}.sp-initial .sp-clear-display{background-position:center}.sp-button-container{float:right}.sp-replacer{margin: 0;overflow: hidden;cursor: pointer;padding: 4px;display: inline-block;border: solid 1px #2E2B28;background: #383E47;color: #292929;vertical-align: middle;border-radius: 4px;box-shadow: 0px 1px 0px #464646, 0px -1px 0px #000;}.sp-replacer.sp-active,.sp-replacer:hover{border-color:#F0C49B;color:#111}.sp-replacer.sp-disabled{cursor:default;border-color:silver;color:silver}.sp-dd{padding:2px 0;height:16px;line-height:16px;float:left;font-size:10px}.sp-preview{width: 20px;height: 20px;border: solid 1px #2E2E2E;margin-right: 5px;float: left;z-index: 0;box-shadow: 0px 1px 0px #575757, inset 0px 1px 1px #000;border-radius: 50%}.sp-palette{*width:220px;max-width:220px}.sp-palette .sp-thumb-el{width:16px;height:16px;margin:2px 1px;border:solid 1px #d0d0d0}.sp-container{padding-bottom:0}.sp-container button{background-color:#eee;background-image:-webkit-linear-gradient(top,#eee,#ccc);background-image:-moz-linear-gradient(top,#eee,#ccc);background-image:-ms-linear-gradient(top,#eee,#ccc);background-image:-o-linear-gradient(top,#eee,#ccc);background-image:linear-gradient(to bottom,#eee,#ccc);border:1px solid #ccc;border-bottom:1px solid #bbb;border-radius:3px;color:#333;font-size:14px;line-height:1;padding:5px 4px;text-align:center;text-shadow:0 1px 0 #eee;vertical-align:middle}.sp-container button:hover{background-color:#ddd;background-image:-webkit-linear-gradient(top,#ddd,#bbb);background-image:-moz-linear-gradient(top,#ddd,#bbb);background-image:-ms-linear-gradient(top,#ddd,#bbb);background-image:-o-linear-gradient(top,#ddd,#bbb);background-image:linear-gradient(to bottom,#ddd,#bbb);border:1px solid #bbb;border-bottom:1px solid #999;cursor:pointer;text-shadow:0 1px 0 #ddd}.sp-container button:active{border:1px solid #aaa;border-bottom:1px solid #888;-webkit-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;-moz-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;-ms-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;-o-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee}.sp-cancel{font-size:11px;color:#d93f3f!important;margin:0;padding:2px;margin-right:5px;vertical-align:middle;text-decoration:none}.sp-cancel:hover{color:#d93f3f!important;text-decoration:underline}.sp-palette span.sp-thumb-active,.sp-palette span:hover{border-color:#000}.sp-alpha,.sp-preview,.sp-thumb-el{position:relative;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)}.sp-preview-inner{border-radius: 50%;box-shadow: inset 0px 1px 1px #000;}.sp-alpha-inner,.sp-preview-inner,.sp-thumb-inner{display: block;position: absolute;top: 0;left: 0;bottom: 0;right: 0;}.sp-palette .sp-thumb-inner{background-position:50% 50%;background-repeat:no-repeat}.sp-palette .sp-thumb-light.sp-thumb-active .sp-thumb-inner{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIVJREFUeNpiYBhsgJFMffxAXABlN5JruT4Q3wfi/0DsT64h8UD8HmpIPCWG/KemIfOJCUB+Aoacx6EGBZyHBqI+WsDCwuQ9mhxeg2A210Ntfo8klk9sOMijaURm7yc1UP2RNCMbKE9ODK1HM6iegYLkfx8pligC9lCD7KmRof0ZhjQACDAAceovrtpVBRkAAAAASUVORK5CYII=)}.sp-palette .sp-thumb-dark.sp-thumb-active .sp-thumb-inner{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAMdJREFUOE+tkgsNwzAMRMugEAahEAahEAZhEAqlEAZhEAohEAYh81X2dIm8fKpEspLGvudPOsUYpxE2BIJCroJmEW9qJ+MKaBFhEMNabSy9oIcIPwrB+afvAUFoK4H0tMaQ3XtlrggDhOVVMuT4E5MMG0FBbCEYzjYT7OxLEvIHQLY2zWwQ3D+9luyOQTfKDiFD3iUIfPk8VqrKjgAiSfGFPecrg6HN6m/iBcwiDAo7WiBeawa+Kwh7tZoSCGLMqwlSAzVDhoK+6vH4G0P5wdkAAAAASUVORK5CYII=)}.sp-clear-display{background-repeat:no-repeat;background-position:center;background-image:url(data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAJmZmZ2dnZ6enqKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq/Hx8fLy8vT09PX19ff39/j4+Pn5+fr6+vv7+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAUABQAAAihAP9FoPCvoMGDBy08+EdhQAIJCCMybCDAAYUEARBAlFiQQoMABQhKUJBxY0SPICEYHBnggEmDKAuoPMjS5cGYMxHW3IiT478JJA8M/CjTZ0GgLRekNGpwAsYABHIypcAgQMsITDtWJYBR6NSqMico9cqR6tKfY7GeBCuVwlipDNmefAtTrkSzB1RaIAoXodsABiZAEFB06gIBWC1mLVgBa0AAOw==)}';

style += '.pan-color-gen-pill{background-color: #4268AC;position: fixed;left: 0px;bottom: 20%;width: 20%;max-width: 115px;padding: 15px 0px;text-align: center;border-radius: 0px 4px 4px 0px;border: 2px solid #000;color:#fff;border-left: 0px;text-transform: uppercase;font: 8pt/12pt Arial bold;cursor: pointer;z-index:99999}.pan-color-gen-pill:hover{background-color:#477DB8}.pan-color-gen-pill.active,.pan-color-gen-pill.active:hover{z-index: 999999;background-color: #f2f2f2;color: #000;}.options-pane{position: fixed;width: 100%;min-height: 100px;bottom: -100%;left: -180px;background-color: #30363e;padding: 10px;border: none;opacity: 1;z-index: 99999;color: #fff;opacity: 1;height: auto;top: auto;left: 0px;}.btn-options{position:relative;z-index:1;background-color: #1f70a8;margin: -10px -10px 10px;padding: 10px;}.btn-options .btn-default{color: #606F7E;background-color: #fff;border-color: transparent;box-shadow: 0px -1px 1px #394450;}.advanced-opt{height:0px;overflow:hidden;opacity:0;filter:alpha(opacity=0);-webkit-transform-origin: 50% 0 0;-moz-transform-origin: 50% 0 0;-ms-transform-origin: 50% 0 0;-o-transform-origin: 50% 0 0;transform-origin: 50% 0 0;-webkit-transform: rotateX(90deg);-moz-transform: rotateX(90deg);-ms-transform: rotateX(90deg);-o-transform: rotateX(90deg);transform: rotateX(90deg);-webkit-transition: .5s;-moz-transition: .5s;-o-transition: .5s;transition: .5s;-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;-o-transform-style: preserve-3d;transform-style: preserve-3d;}.opt-cube{-webkit-transition: .5s;-moz-transition: .5s;-o-transition: .5s;transition: .5s;-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;-o-transform-style: preserve-3d;transform-style: preserve-3d;-webkit-transform-origin: 50% 50% -22.5px;-moz-transform-origin: 50% 50% -22.5px;-ms-transform-origin: 50% 50% -22.5px;-o-transform-origin: 50% 50% -22.5px;transform-origin: 50% 50% -22.5px;}.simple-opt{height:auto;overflow:hidden;opacity:1;filter:alpha(opacity=100);-webkit-transition: .5s;-moz-transition: .5s;-o-transition: .5s;transition: .5s;-webkit-transform-style: preserve-3d;-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;-o-transform-style: preserve-3d;transform-style: preserve-3d;-webkit-transform-origin: 50% 50% -22.5px;-moz-transform-origin: 50% 50% -22.5px;-ms-transform-origin: 50% 50% -22.5px;-o-transform-origin: 50% 50% -22.5px;transform-origin: 50% 50% -22.5px;}.opt-cube.advanced .simple-opt{height:0px;opacity:0;filter:alpha(opacity=0);-webkit-transform: rotateX(90deg);-moz-transform: rotateX(90deg);-ms-transform: rotateX(90deg);-o-transform: rotateX(90deg);transform: rotateX(90deg);}.opt-cube.advanced .advanced-opt{height:auto;opacity:1;filter:alpha(opacity=100);-webkit-transform: rotateX(0deg);-moz-transform: rotateX(0deg);-ms-transform: rotateX(0deg);-o-transform: rotateX(0deg);transform: rotateX(0deg);}.options-pane h2{font-size: 11pt;line-height: 16pt;color: #B3B3B3;border-bottom: 1px solid #202020;box-shadow: 0px 1px 0px #505050;text-shadow: 0px 1px 0px #363636;font-weight: normal;text-transform: uppercase;}.options-pane:hover{opacity:1;}.options-pane label{width:80%;text-transform:uppercase;}';
	+ '';

colorpan.panStyleSheet.addStyle(style);
colorpan.panStyleSheet.styleCompile();
/* **************** styles ******************* */

}

colorpan.handleEvents();
});