function cancelEvent(e){if(!e)var e=window.event;(e.preventDefault)?e.preventDefault():e.returnValue=false;}


function getEventTarget(e){if(!e)var e=window.event;return (e.target&&e.target.nodeType==3)?e.target.parentNode:(e.target)?e.target:e.srcElement;}


function supportsSVG(){
//Old FF 3.5 and Safari 3 versions have a very poor svg support
//http://www.w3.org/TR/SVG11/feature#Image Defeat FF 3.5 only
//http://www.w3.org/TR/SVG11/feature#Animation Defeat Saf 3 but also returns false in IE9
//http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute Defeat Saf 3 but also returns false in Chrome and safari4
//http://www.w3.org/TR/SVG11/feature#Text Defeat Saf 3 but also returns false in FF and safari4
if(!document.createElementNS||!document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect)return false;
if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"))return false;
if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute","1.1")&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Animation","1.1")&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Text","1.1"))return false;
return true;
}


function getStyle(a,b){
if(window.getComputedStyle)return document.defaultView.getComputedStyle(a,null).getPropertyValue(b);
var n=b.indexOf('-');
if(n!==-1)b=b.substr(0,n)+b.substr(n+1,1).toUpperCase()+b.substr(n+2);
return a.currentStyle[b];
}


function getWidth(a){
var w=getStyle(a,'width');
if(w.indexOf('px')!==-1)return parseInt(w.replace('px',''));
var p=[getStyle(a,'padding-top'),getStyle(a,'padding-right'),getStyle(a,'padding-bottom'),getStyle(a,'padding-left')];
for(var i=0;i<4;i++){
	if(p[i].indexOf('px')!==-1)p[i]=parseInt(p[i]);
	else p[i]=0;
}
return Math.max(0,a.offsetWidth-p[1]-p[3]);
}


function getHeight(a){
var h=getStyle(a,'height');
if(h.indexOf('px')!==-1)return parseInt(h.replace('px',''));
var p=[getStyle(a,'padding-top'),getStyle(a,'padding-right'),getStyle(a,'padding-bottom'),getStyle(a,'padding-left')];
for(var i=0;i<4;i++){
	if(p[i].indexOf('px')!==-1)p[i]=parseInt(p[i]);
	else p[i]=0;
}
return Math.max(0,a.offsetHeight-p[0]-p[2]);
}


function svgfallback(){
if(supportsSVG())return;  
for(var i=0,nd=document.getElementsByTagName('*'),n=nd.length;i<n;i++){
	if(nd[i].nodeName=='IMG'&&/.*\.svg$/.test(nd[i].src))nd[i].src=nd[i].src.slice(0,-3)+'png';
	if(/\.svg/.test(getStyle(nd[i],'background-image')))nd[i].style.backgroundImage=getStyle(nd[i],'background-image').replace('.svg','.png');
	if(/\.svg/.test(getStyle(nd[i],'background')))nd[i].style.background=getStyle(nd[i],'background').replace('.svg','.png');
}
}


function walletshow(e){
var t=getEventTarget(e);
while(t.getAttribute('data-id')===null||t.getAttribute('data-id')=='')t=t.parentNode;
var d=t.getElementsByTagName('DIV')[0];
var s=document.getElementById(t.getAttribute('data-id')).getElementsByTagName('DIV')[0];
d.getElementsByTagName('H2')[0].innerHTML=s.getElementsByTagName('H2')[0].innerHTML;
d.getElementsByTagName('SPAN')[0].innerHTML=s.getElementsByTagName('SPAN')[0].innerHTML;
d.getElementsByTagName('P')[0].innerHTML=s.getElementsByTagName('P')[0].innerHTML;
d.getElementsByTagName('P')[1].getElementsByTagName('A')[0].innerHTML=s.getElementsByTagName('P')[1].getElementsByTagName('A')[0].innerHTML;
d.getElementsByTagName('P')[1].getElementsByTagName('A')[0].href=s.getElementsByTagName('P')[1].getElementsByTagName('A')[0].href;
d.getElementsByTagName('P')[1].getElementsByTagName('A')[0].onclick='';
d.className='';
//Workaround for browsers that don't handle re-rendering class styles and svg (they have backgroundImage hardcoded in HTML)
for(var ii=0,nn=d.childNodes.length;ii<nn;ii++){if(d.childNodes[ii].nodeType==1&&d.childNodes[ii].style.backgroundImage!='')d.childNodes[ii].style.backgroundImage=d.childNodes[ii].style.backgroundImage.replace('bubblewarn','bubble').replace('bubbleinfo','bubble');}
for(var ii=0,as=d.parentNode.getElementsByTagName('A'),nn=as.length;ii<nn;ii++){if(as[ii].parentNode==d.parentNode){var dd=as[ii];break;}}
for(var ii=0,as=s.parentNode.getElementsByTagName('A'),nn=as.length;ii<nn;ii++){if(as[ii].parentNode==s.parentNode){var ss=as[ii];break;}}
dd.innerHTML=ss.innerHTML;
cancelEvent(e);
}


function mobileshow(e){
if(document.getElementById('menusimple')){
var mm=document.getElementById('menusimple');
var ml=document.getElementById('langselect');
var t=document.getElementById('menumobile');
if(mm.style.display=='block'){mm.style.display='';ml.style.display='';}
else{mm.style.display='block';ml.style.display='inline-block';}
t.parentNode.removeChild(t);
cancelEvent(e);
}
else{
//Will be deprecated when all translation will use the new menu
var mm=document.getElementById('menu');
var mf=document.getElementById('menufor');
var ml=document.getElementById('langselect');
var t=document.getElementById('menumobile');
if(mf.style.display=='block'){mf.style.display='';mm.style.display='';ml.style.display='';}
else{mf.style.display='block';mm.style.display='block';ml.style.display='inline-block';}
t.parentNode.removeChild(t);
cancelEvent(e);
}
}


function mobilehover(e){
//Add a delay before hidding menu for mobiles to prevent accidental clicks
var t=getEventTarget(e);
while(t.nodeName!='LI'||!t.parentNode.id)t=t.parentNode;
var p=t.getElementsByTagName('UL')[0];
p.className='hover';
setTimeout(function(){
for(var i=0,nd=t.parentNode.getElementsByTagName('UL'),n=nd.length;i<n;i++){
	if(nd[i]==p)continue;
	nd[i].className='';
}
},1);
cancelEvent(e);
}


function boxshow(e){
var p=t=getEventTarget(e);
while(p.nodeName!='DIV')p=p.parentNode;
var sh=getHeight(p);
for(var i=0,nds=p.childNodes,n=nds.length;i<n;i++)if(nds[i].nodeType==1)nds[i].style.display='block';
t.removeAttribute('href');
t.onclick='';
var dh=getHeight(p);
p.style.height=sh+'px';
setTimeout(function(){
	p.style.transition='height 400ms ease-out';
	p.style.MozTransition='height 400ms ease-out';
	p.style.WebkitTransition='height 400ms ease-out';
	setTimeout(function(){p.style.height=dh+'px';},20);
},20);
cancelEvent(e);
}


function faqshow(e){
var p=t=getEventTarget(e);
while(p.nodeType!=1||p.nodeName!='DIV')p=p.nextSibling;
var pp=p.cloneNode(true);
pp.style.visibility='hidden';
pp.style.height='auto';
p.parentNode.appendChild(pp);
var nhe=getHeight(pp);
pp.parentNode.removeChild(pp);
if(p.style.height!='0px'&&p.style.height!='')p.style.height='0px';
else p.style.height=nhe+'px';
cancelEvent(e);
}


function materialshow(e){
var p=t=getEventTarget(e);
while(p.nodeType!=1||p.nodeName!='DIV')p=p.previousSibling;
var pp=p.cloneNode(true);
pp.style.visibility='hidden';
pp.style.height='auto';
p.parentNode.appendChild(pp);
var nhe=getHeight(pp);
pp.parentNode.removeChild(pp);
if(p.style.height!='0px'&&p.style.height!='')p.style.height='0px';
else p.style.height=nhe+'px';
t.style.display='none';
cancelEvent(e);
}


function disclaimershow(e){
var p=t=getEventTarget(e);
while(p.nodeType!=1||p.nodeName!='P')p=p.parentNode;
p=p.nextSibling;
while(p.nodeType!=1||p.nodeName!='P')p=p.nextSibling;
p.style.height='auto';
var nhe=getHeight(p);
p.style.height='0px';
p.style.height=(nhe+10)+'px';
t.parentNode.removeChild(t);
cancelEvent(e);
}


function librariesShow(e){
var p=t=getEventTarget(e);
while(p.nodeType!=1||p.nodeName!='UL')p=p.parentNode;
var sh=getHeight(p);
for(var i=0,nds=p.getElementsByTagName('LI'),n=nds.length;i<n;i++)nds[i].style.display='list-item';
t.parentNode.parentNode.removeChild(t.parentNode);
var dh=getHeight(p);
p.style.height=sh+'px';
setTimeout(function(){
	p.style.transition='height 400ms ease-out';
	p.style.MozTransition='height 400ms ease-out';
	p.style.WebkitTransition='height 400ms ease-out';
	setTimeout(function(){p.style.height=dh+'px';},20);
},20);
cancelEvent(e);
}


function freenodeShow(e){
document.getElementById('chatbox').innerHTML='<iframe style=width:98%;min-width:400px;height:600px src="http://webchat.freenode.net/?channels=bitcoin-dev" />';
cancelEvent(e);
}
