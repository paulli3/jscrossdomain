//Array.prototype.forEach=function(cb){if(typeof cb!='function'){throw new TypeError()};for(var i=0;i!=this.length;++i){cb.call(this,i,this[i])}};
//Object.prototype.forEach=function(cb){for(var i in this){if(this.hasOwnProperty(i) && typeof cb=='function')cb(i,this[i])}}
/*
 * ��Ҫ����
 * CONFIG = {
		MEDIA : '',
		IMGDIR : '/imgs/',
		'SITEURL' : '',
}
IMGDIR = CONFIG.IMGDIR;
��������

 */
 CONFIG = {
		MEDIA : '',
		IMGDIR : '/imgs/',
		'SITEURL' : '',
}


var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
browserVersion({'ie':'msie','firefox':'','chrome':'','opera':'','safari':'','mozilla':'','webkit':'','maxthon':'','qq':'qqbrowser','rv':'rv'});
if(BROWSER.safari || BROWSER.rv) {
	BROWSER.firefox = true;
}
var MessageJS = {
	'sysError500' : 'system Error',	
	'wating' : 'loading...',
	'confirm' : 'OK',
	'cancel' : 'Cancel',
	'notice' : 'Notice',
	'close' : 'close',
	'rediect' : ' seconds...'	
};
BROWSER.opera = BROWSER.opera ? opera.version() : 0;
function browserVersion(types) {
	var other = 1;
	for(i in types) {
		var v = types[i] ? types[i] : i;
		if(USERAGENT.indexOf(v) != -1) {
			var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
			var matches = re.exec(USERAGENT);
			var ver = matches != null ? matches[2] : 0;
			other = ver !== 0 && v != 'mozilla' ? 0 : other;
		}else {
			var ver = 0;
		}
		eval('BROWSER.' + i + '= ver');
	}
	BROWSER.other = other;
}

var CSSLOADED = [];
var JSLOADED = [];


;(function(OKW){
	if (OKW == undefined)
	{
		OKW = window._OPT = {
				apiCache : {},
				extend : function(name,n,override){
					var o=this;
					if (o[name] != undefined)return o;
					o[name] = {};
				   for(var p in n)if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))o[name][p]=n[p];
				   return o;
				},
				forEach : function(arr,cb){
					if (Object.prototype.toString.call(arr) == "[object Object]")
					{
						for(var i in arr){if(arr.hasOwnProperty(i) && typeof cb=='function')cb(i,arr[i])}
					}
					else if (Object.prototype.toString.call(arr) == "[object Array]")
					{
						if(typeof cb!='function'){throw new TypeError()};for(var i=0;i!=arr.length;++i){cb(i,arr[i])}
					}
				},
				api : function(action,cb,data,type,overWriteCache,debug)
				{
					if (action[0]=="/"){action=action.substring(1);}
					if (action[action.length-1]=="/"){action=action.substring(0,action.length-1);}
					type = type==undefined ? 'get' : type;
					overWriteCache = overWriteCache == undefined ? 0 : 1;
					debug = debug == undefined ? 0 : 1;
					var arr = action.split("/");
					var dataStr = '';

					if (data != undefined)
					{
						_OPT.forEach(data,function(k,v){
							dataStr += k+"="+v+"|";
						});
					}
					
					var cacheKey = action+type+dataStr;
					
					var cb1 = function(ret){
						if (OKW.apiCache[cacheKey] == undefined || overWriteCache)
						{	
							OKW.apiCache[cacheKey] = ret;
						}
						try{
							eval("ret = "+ret);
						}catch(e){};
						
						cb(ret);
					}
					if (OKW.apiCache[cacheKey] != undefined && overWriteCache==0)
					{
						cb1(OKW.apiCache[cacheKey]);return;
					}

					data['inajax']=1;	
					 $.ajax({
						type : type,
						data:data,
						url : +(arr[0]!=undefined ? arr[0] : data['c'])+"/"+(arr[1]!=undefined ? arr[1] : data['a']),
						dataType : 'text',
						success : cb1
					 });
				}
			};
	}
})(window._OPT);

/**
 * ��̬����css��js
 * 
 * ���� /js/extend.js ��ִ������ĺ��� extend_fun, �������'a','b'     function extend_fun(a,b){alert(a);alert(b);}
 * 	_OPT.load.F("fun",['a','b']);  
 * ���ش�js
 * _OPT.load.appendscript("http://web.kuaiwan.com/themes/js/jquery-1.4.3.min.js");		
 * ���ı�����Ϊ�����е�js
 * _OPT.load.evalscript("<script>alert(1)</script>");	
 * ����css �ַ���������������� ��������������
 * _OPT.load.evalcss("body{background:red}");
 * ����css�ļ�
 * _OPT.load.appendcss("http://xxx.css"); 
 * */
_OPT.extend('load',(function(){return{JSLOADED:[],evalscripts:[],VERHASH:'1',JSPATH:CONFIG.MEDIA+"/js",defaultJS:'extend',in_array:function(needle,haystack){if(typeof needle=='string'||typeof needle=='number'){for(var i in haystack){if(haystack[i]==needle){return true}}};return false},D:function(id){return!id?null:document.getElementById(id)},evalscript:function(s){if(s.indexOf('<script')==-1)return s;var p=/<script[^\>]*?>([^\x00]*?)<\/script>/ig;var arr=[];while(arr=p.exec(s)){var p1=/<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;var arr1=[];arr1=p1.exec(arr[0]);if(arr1){this.appendscript(arr1[1],'',arr1[2],arr1[3])}else{p1=/<script(.*?)>([^\x00]+?)<\/script>/i;arr1=p1.exec(arr[0]);this.appendscript('',arr1[2],arr1[1].indexOf('reload=')!=-1)}};return s},hash:function(string,length){var length=length?length:32;var start=0;var i=0;var result='';filllen=length-string.length%length;for(i=0;i<filllen;i++){string+="0"}while(start<string.length){result=this.stringxor(result,string.substr(start,length));start+=length};return result},stringxor:function(s1,s2){var s='';var hash='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';var max=Math.max(s1.length,s2.length);for(var i=0;i<max;i++){var k=s1.charCodeAt(i)^s2.charCodeAt(i);s+=hash.charAt(k%52)};return s},appendscript:function(src,text,reload,charset){var id=this.hash(src+text);if(!reload&&this.in_array(id,this.evalscripts))return;if(reload&&this.D(id)){this.D(id).parentNode.removeChild(this.D(id))};this.evalscripts.push(id);var scriptNode=document.createElement("script");scriptNode.type="text/javascript";scriptNode.id=id;scriptNode.charset=charset?charset:(document.all?document.charset:document.characterSet);try{if(src){scriptNode.src=src;scriptNode.onloadDone=false;scriptNode.onload=function(){scriptNode.onloadDone=true;_OPT.load.JSLOADED[src]=1};scriptNode.onreadystatechange=function(){if((scriptNode.readyState=='loaded'||scriptNode.readyState=='complete')&&!scriptNode.onloadDone){scriptNode.onloadDone=true;_OPT.load.JSLOADED[src]=1}}}else if(text){scriptNode.text=text};document.getElementsByTagName('head')[0].appendChild(scriptNode)}catch(e){}},F:function(func,args,fileName,path,debug){if(typeof mod==undefined){return false};if(path==undefined||typeof path==undefined){path=this.JSPATH};if(fileName==undefined||typeof fileName==undefined){fileName=this.defaultJS};var pre=fileName.toString().toLocaleLowerCase();var run=function(){var argc=args.length,s='';for(i=0;i<argc;i++){s+=',args['+i+']'};eval('var check = typeof '+pre+'_'+func+' == \'function\'');if(debug)console.log('var check = typeof '+pre+'_'+func+' == \'function\'');if(check){eval(pre+'_'+func+'('+s.substr(1)+')');if(debug)console.log(pre+'_'+func+'('+s.substr(1)+')')}else{setTimeout(function(){checkrun()},50)}};var checkrun=function(){if(_OPT.load.JSLOADED[src]){run()}else{setTimeout(function(){checkrun()},50)}};src=this.JSPATH+"/"+fileName+".js?"+this.VERHASH;if(!this.JSLOADED[src]){this.appendscript(src)};checkrun()},appendcss:function(href){var ls=document.getElementsByTagName("link");for(i=0;i<ls.length;i++){if(ls[i].href&&ls[i].href.indexOf(href)!=-1)return ls[i]};s=document.createElement("link");s.rel="stylesheet";s.type="text/css";s.href=href;s.disabled=false;document.getElementsByTagName("head")[0].appendChild(s)},evalcss:function(css){if(!-[1,]){css=css.replace(/opacity:\s*(\d?\.\d+)/g,function($,$1){$1=parseFloat($1)*100;if($1<0||$1>100)return"";return"filter:alpha(opacity="+$1+");"})};css+="\n";var doc=document,head=doc.getElementsByTagName("head")[0],styles=head.getElementsByTagName("style"),style,media;if(styles.length==0){if(doc.createStyleSheet){doc.createStyleSheet()}else{style=doc.createElement('style');style.setAttribute("type","text/css");head.insertBefore(style,null)}};style=styles[0];media=style.getAttribute("media");if(media===null&&!/screen/i.test(media)){style.setAttribute("media","all")};if(style.styleSheet){style.styleSheet.cssText+=css}else if(doc.getBoxObjectFor){style.innerHTML+=css}else{style.appendChild(doc.createTextNode(css))}}}})());


/**
 * ģ��alert������
 * @param msg		string	��������
 * @param title		string	������Ϣ
 * @param button	json	��ť�������Լ���ť����󴥷���ʱ��
 * @param timeout	int		��ʱ�ر�ʱ��
 * @param width		int		��������
 * @param height	int		������߶�
 */
function showMsg(msg,title,button,timeout,width,height){_OPT.load.F('showmsg',arguments,'jqueryui');}
/**
 * ҳ�浯��
 * @param div		html Ԫ�صı�ǩ ���� ��id
 * @param title		��ʾ��Ϣ�ı���
 * @param param
 */
function dialog(id,param){_OPT.load.F('dialog',arguments,'jqueryui');}
function dialogContent(id,html){_OPT.load.F('dialogChangeContent',arguments,'jqueryui');}


_OPT.extend('ui',(function($,OPT){
	return {
		JSMENU : {
			'active' : [],
			'timer' : [],
			'drag' : [],
			'layer' : 0,
			'zIndex' : {'win':200,'menu':300,'dialog':400,'prompt':500},
			'float' : '',

		},
		EXTRAFUNC : {showmenu:[]}, 
		EXTRASTR : '',


		getEvent : function (){
			if(document.all) return window.event;
			func = this.getEvent.caller;
			while(func != null) {
				var arg0 = func.arguments[0];
				if (arg0) {
					if((arg0.constructor  == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
						return arg0;
					}
				}
				func=func.caller;
			}
			return null;
		},
		D : function(id){
			return $.D(id);
		},
		doane : function(event, preventDefault, stopPropagation){
			var preventDefault = isUndefined(preventDefault) ? 1 : preventDefault;
			var stopPropagation = isUndefined(stopPropagation) ? 1 : stopPropagation;
			e = event ? event : window.event;
			if(!e) {e = this.getEvent();}
			if(!e) {return null;}
			if(preventDefault) {
				if(e.preventDefault) {e.preventDefault();} else {e.returnValue = false;}
			}
			if(stopPropagation) {
				if(e.stopPropagation) {e.stopPropagation();} else {e.cancelBubble = true;}
			}
			return e;
		},
		setMenuPosition : function setMenuPosition(showid, menuid, pos) {
			var D = this.D;
			if (typeof showid == 'object'){
				var showObj = D(showid['ctrlid']);
			}else{
				var showObj = D(showid);
			}
			
			var menuObj = menuid ? D(menuid) : D(showid + '_menu');
			pos=pos.toString();
			if(isUndefined(pos) || !pos) pos = '43';
			var basePoint = parseInt(pos.substr(0, 1));
			var direction = parseInt(pos.substr(1, 1));
			var absolute = parseInt(pos.substr(2, 1));
			var important = pos.indexOf('!') != -1 ? 1 : 0;
			var sxy = 0, sx = 0, sy = 0, sw = 0, sh = 0, ml = 0, mt = 0, mw = 0, mcw = 0, mh = 0, mch = 0, bpl = 0, bpt = 0;
			if(!menuObj || (basePoint > 0 && !showObj)) return;
			if(showObj) {
				sxy = fetchOffset(showObj);
				sx = sxy['left'];
				sy = sxy['top'];
				sw = showObj.offsetWidth;
				sh = showObj.offsetHeight;
			}
			mw = menuObj.offsetWidth;
			mcw = menuObj.clientWidth;
			mh = menuObj.offsetHeight;
			mch = menuObj.clientHeight;

			switch(basePoint) {
				case 1:
					bpl = sx;
					bpt = sy;
					break;
				case 2:
					bpl = sx + sw;
					bpt = sy;
					break;
				case 3:
					bpl = sx + sw;
					bpt = sy + sh;
					break;
				case 4:
					bpl = sx;
					bpt = sy + sh;
					break;
			}
			switch(direction) {
				case 0:
					menuObj.style.left = (document.body.clientWidth - menuObj.clientWidth) / 2 + 'px';
					mt = (document.documentElement.clientHeight - menuObj.clientHeight) / 2;
					break;
				case 1:
					ml = bpl - mw;
					mt = bpt - mh;
					break;
				case 2:
					ml = bpl;
					mt = bpt - mh;
					break;
				case 3:
					ml = bpl;
					mt = bpt;
					break;
				case 4:
					ml = bpl - mw;
					mt = bpt;
					break;
			}
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			if(!important) {
				if(in_array(direction, [1, 4]) && ml < 0) {
					ml = bpl;
					if(in_array(basePoint, [1, 4])) ml += sw;
				} else if(ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {
					ml = bpl - mw;
					if(in_array(basePoint, [2, 3])) {
						ml -= sw;
					} else if(basePoint == 4) {
						ml += sw;
					}
				}
				if(in_array(direction, [1, 2]) && mt < 0) {
					mt = bpt;
					if(in_array(basePoint, [1, 2])) mt += sh;
				} else if(mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {
					mt = bpt - mh;
					if(in_array(basePoint, [3, 4])) mt -= sh;
				}
			}
			if(pos.substr(0, 3) == '210') {
				ml += 69 - sw / 2;
				mt -= 5;
				if(showObj.tagName == 'TEXTAREA') {
					ml -= sw / 2;
					mt += sh / 2;
				}
			}
			if(direction == 0 || menuObj.scrolly) {
				if(BROWSER.ie && BROWSER.ie < 7) {
					if(direction == 0) mt += scrollTop;
				} else {
					if(menuObj.scrolly) mt -= scrollTop;
					menuObj.style.position = absolute==1 ? 'absolute' : 'fixed';
				}
			}

			if(ml) menuObj.style.left = ml + 'px';
			if(mt) menuObj.style.top = mt + 'px';
			if(direction == 0 && BROWSER.ie && !document.documentElement.clientHeight) {
				menuObj.style.position = 'absolute';
				menuObj.style.top = (document.body.clientHeight - menuObj.clientHeight) / 2 + 'px';
			}
			if(menuObj.style.clip && !BROWSER.opera) {
				menuObj.style.clip = 'rect(auto, auto, auto, auto)';
			}
		},
		
		hideMenu : function (attr, mtype) {
			var JSMENU = this.JSMENU;
			attr = isUndefined(attr) ? '' : attr;
			mtype = isUndefined(mtype) ? 'menu' : mtype;
			
			if(attr == '') {
				for(var i = 1; i <= this.JSMENU['layer']; i++) {
					hideMenu(i, mtype);
				}
				return;
			} else if(typeof attr == 'number') {
				for(var j in this.JSMENU['active'][attr]) {
					hideMenu(this.JSMENU['active'][attr][j], mtype);
				}
				return;
			}else if(typeof attr == 'string') {
				var menuObj = $.D(attr);
				if(!menuObj || (mtype && menuObj.mtype != mtype)) return;
				var ctrlObj = '', ctrlclass = '';
				if((ctrlObj = $.D(menuObj.getAttribute('ctrlid'))) && (ctrlclass = menuObj.getAttribute('ctrlclass'))) {
					var reg = new RegExp(' ' + ctrlclass);
					ctrlObj.className = ctrlObj.className.replace(reg, '');
				}
				clearTimeout(this.JSMENU['timer'][attr]);
				var hide = function() {
					if(menuObj.cache) {
						if(menuObj.style.visibility != 'hidden') {
							menuObj.style.display = 'none';
							if(menuObj.cover) $.D(attr + '_cover').style.display="none";
						}
					}else {
						menuObj.parentNode.removeChild(menuObj);
						if(menuObj.cover) $.D(attr + '_cover').parentNode.removeChild($.D(attr + '_cover'));
					}
					var tmp = [];
					
					for(var k in JSMENU['active'][menuObj.layer]) {
						if(attr != JSMENU['active'][menuObj.layer][k]) tmp.push(JSMENU['active'][menuObj.layer][k]);
					}
					JSMENU['active'][menuObj.layer] = tmp;
				};
				if(menuObj.fade) {
					var O = 100;
					var fadeOut = function(O) {
						if(O == 0) {
							clearTimeout(fadeOutTimer);
							hide();
							return;
						}
						menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
						menuObj.style.opacity = O / 100;
						O -= 20;
						var fadeOutTimer = setTimeout(function () {
							fadeOut(O);
						}, 40);
					};
					fadeOut(O);
				} else {
					hide();
				}
			}
		},
		
		showMenu : function (v) {
			var JSMENU = this.JSMENU;
			var ctrlid = isUndefined(v['ctrlid']) ? v : v['ctrlid'];
			var showid = isUndefined(v['showid']) ? ctrlid : v['showid'];
			var menuid = isUndefined(v['menuid']) ? showid + '_menu' : v['menuid'];
			if (typeof ctrlid=='string'){
				var ctrlObj = $.D(ctrlid);
			}
			var menuObj = $.D(menuid);
			if(!menuObj) return;
			var mtype = isUndefined(v['mtype']) ? 'menu' : v['mtype'];
			var evt = isUndefined(v['evt']) ? 'mouseover' : v['evt'];
			var pos = isUndefined(v['pos']) ? '43' : v['pos'];
			var layer = isUndefined(v['layer']) ? 1 : v['layer'];
			var duration = isUndefined(v['duration']) ? 2 : v['duration'];
			var timeout = isUndefined(v['timeout']) ? 250 : v['timeout'];
			var maxh = isUndefined(v['maxh']) ? 600 : v['maxh'];
			var cache = isUndefined(v['cache']) ? 1 : v['cache'];
			var drag = isUndefined(v['drag']) ? '' : v['drag'];
			var dragobj = drag && $("#"+drag).get(0) ? $("#"+drag).get(0) : menuObj;
			var fade = isUndefined(v['fade']) ? 0 : v['fade'];
			var cover = isUndefined(v['cover']) ? 0 : v['cover'];
			var zindex = isUndefined(v['zindex']) ? JSMENU['zIndex']['menu'] : v['zindex'];
			var ctrlclass = isUndefined(v['ctrlclass']) ? '' : v['ctrlclass'];
			var winhandlekey = isUndefined(v['win']) ? '' : v['win'];
			if(winhandlekey && ctrlObj && !ctrlObj.getAttribute('fwin')) {
				ctrlObj.setAttribute('fwin', winhandlekey);
			}
			zindex = cover ? zindex + 500 : zindex;
			if(typeof this.JSMENU['active'][layer] == 'undefined') {
				this.JSMENU['active'][layer] = [];
			}

			for(i in this.EXTRAFUNC['showmenu']) {
				try {
					eval(this.EXTRAFUNC['showmenu'][i] + '()');
				} catch(e) {}
			}
			
			if(evt == 'click' && in_array(menuid, this.JSMENU['active'][layer]) && mtype != 'win') {
				this.hideMenu(menuid, mtype);
				return;
			}
			if(mtype == 'menu') {
				this.hideMenu(layer, mtype);
			}
			
			
			if(ctrlObj) {
			
				if(!ctrlObj.getAttribute('initialized')) {
					ctrlObj.setAttribute('initialized', true);
					ctrlObj.unselectable = true;
					ctrlObj.outfunc = typeof ctrlObj.onmouseout == 'function' ? ctrlObj.onmouseout : null;
					ctrlObj.onmouseout = function() {
						if(this.outfunc) this.outfunc();
						if(duration < 3 && !JSMENU['timer'][menuid]) {
							JSMENU['timer'][menuid] = setTimeout(function () {
								this.hideMenu(menuid, mtype);
							}, timeout);
						}
					};

					ctrlObj.overfunc = typeof ctrlObj.onmouseover == 'function' ? ctrlObj.onmouseover : null;
					ctrlObj.onmouseover = function(e) {
						OPT.ui.doane(e);
						if(this.overfunc) this.overfunc();
						if(evt == 'click') {
							clearTimeout(JSMENU['timer'][menuid]);
							JSMENU['timer'][menuid] = null;
						} else {
							for(var i in JSMENU['timer']) {
								if(JSMENU['timer'][i]) {
									clearTimeout(JSMENU['timer'][i]);
									JSMENU['timer'][i] = null;
								}
							}
						}
					};
				}
			}
			
			if(!menuObj.getAttribute('initialized')) {
				menuObj.setAttribute('initialized', true);
				menuObj.ctrlkey = ctrlid;
				menuObj.mtype = mtype;
				menuObj.layer = layer;
				menuObj.cover = cover;
				if(ctrlObj && ctrlObj.getAttribute('fwin')) {menuObj.scrolly = true;}
				menuObj.style.position = 'absolute';
				menuObj.style.zIndex = zindex + layer;
				menuObj.onclick = function(e) {
					return OPT.ui.doane(e, 0, 1);
				};
				
				if(duration < 3) {
					if(duration > 1) {
						menuObj.onmouseover = function() {
							clearTimeout(JSMENU['timer'][menuid]);
							JSMENU['timer'][menuid] = null;
						};
					}
					if(duration != 1) {
						menuObj.onmouseout = function() {
							JSMENU['timer'][menuid] = setTimeout(function () {
								hideMenu(menuid, mtype);
							}, timeout);
						};
					}
				}
				
				if(cover) {
					var coverObj = document.createElement('div');
					coverObj.id = menuid + '_cover';
					coverObj.style.position = 'absolute';
					coverObj.style.zIndex = menuObj.style.zIndex - 1;
					coverObj.style.left = coverObj.style.top = '0px';
					coverObj.style.width = '100%';
					coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
					coverObj.style.backgroundColor = '#000';
					coverObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)';
					coverObj.style.opacity = 0.5;
					coverObj.onclick = function () {hideMenu();};
					document.body.appendChild(coverObj);
					_attachEvent(window, 'load', function () {
						coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
					}, document);
				}
			}
			if(drag) {
				dragobj.style.cursor = 'move';
				dragobj.onmousedown = function(event) {try{this.dragMenu(menuObj, event, 1);}catch(e){}};
			}

			if(cover) $.D(menuid + '_cover').style.display = '';
			if(fade) {
				var O = 0;
				var fadeIn = function(O) {
					if(O > 100) {
						clearTimeout(fadeInTimer);
						return;
					}
					menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
					menuObj.style.opacity = O / 100;
					O += 20;
					var fadeInTimer = setTimeout(function () {
						fadeIn(O);
					}, 40);
				};
				fadeIn(O);
				menuObj.fade = true;
			} else {
				menuObj.fade = false;
			}
			menuObj.style.display = '';
			if(ctrlObj && ctrlclass) {
				ctrlObj.className += ' ' + ctrlclass;
				menuObj.setAttribute('ctrlid', ctrlid);
				menuObj.setAttribute('ctrlclass', ctrlclass);
			}
			
			if(pos != '*') {
				this.setMenuPosition(showid, menuid, pos);
			}
			
			if(BROWSER.ie && BROWSER.ie < 7 && winhandlekey && $('fwin_' + winhandlekey)) {
				$.D(menuid).style.left = (parseInt($(menuid).style.left) - parseInt($('#fwin_' + winhandlekey).style.left)) + 'px';
				$.D(menuid).style.top = (parseInt($(menuid).style.top) - parseInt($('#fwin_' + winhandlekey).style.top)) + 'px';
			}
			if(maxh && menuObj.scrollHeight > maxh) {
				menuObj.style.height = maxh + 'px';
				if(BROWSER.opera) {
					menuObj.style.overflow = 'auto';
				} else {
					menuObj.style.overflowY = 'auto';
				}
			}

			if(!duration) {
				setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
			}

			if(!in_array(menuid, this.JSMENU['active'][layer])) this.JSMENU['active'][layer].push(menuid);
			menuObj.cache = cache;
			if(layer > this.JSMENU['layer']) {
				this.JSMENU['layer'] = layer;
			}
		//	var hasshow = function(ele) {
		//		while(ele.parentNode && ((typeof(ele['currentStyle']) === 'undefined') ? window.getComputedStyle(ele,null) : ele['currentStyle'])['display'] !== 'none') {
		//			ele = ele.parentNode;
		//		}
		//		if(ele === document) {
		//			return true;
		//		} else {
		//			return false;
		//		}
		//	};
		//	if(!menuObj.getAttribute('disautofocus')) {
		//		try{
		//			var focused = false;
		//			var tags = ['input', 'select', 'textarea', 'button', 'a'];
		//			for(var i = 0; i < tags.length; i++) {
		//				var _all = menuObj.getElementsByTagName(tags[i]);
		//				if(_all.length) {
		//					for(j = 0; j < _all.length; j++) {
		//						if((!_all[j]['type'] || _all[j]['type'] != 'hidden') && hasshow(_all[j])) {
		//							_all[j].className += ' hidefocus';
		//							_all[j].focus();
		//							focused = true;
		//							var cobj = _all[j];
		//							_attachEvent(_all[j], 'blur', function (){cobj.className = trim(cobj.className.replace(' hidefocus', ''));});
		//							break;
		//						}
		//					}
		//				}
		//				if(focused) {
		//					break;
		//				}
		//			}
		//		} catch (e) {
		//		}
		//	}
		},
		
		delayShowST : null,
		delayShow : function delayShow(ctrlObj, call, time) {
			if(typeof ctrlObj == 'object') {
				var ctrlid = ctrlObj.id;
				call = call || function () {showMenu(ctrlid);};
			}
			var time = isUndefined(time) ? 500 : time;
			delayShowST = setTimeout(function () {
				if(typeof call == 'function') {
					call();
				} else {
					eval(call);
				}
			}, time);
			if(!ctrlObj.delayinit) {
				_attachEvent(ctrlObj, 'mouseout', function() {clearTimeout(delayShowST);});
				ctrlObj.delayinit = 1;
			}
		},
		
		dragMenuDisabled : false,
		
		dragMenu : function (menuObj, e, op) {
			e = e ? e : window.event;
			if(op == 1) {
				if(dragMenuDisabled || in_array(e.target ? e.target.tagName : e.srcElement.tagName, ['TEXTAREA', 'INPUT', 'BUTTON', 'SELECT'])) {
					return;
				}
				JSMENU['drag'] = [e.clientX, e.clientY];
				JSMENU['drag'][2] = parseInt(menuObj.style.left);
				JSMENU['drag'][3] = parseInt(menuObj.style.top);
				document.onmousemove = function(e) {try{dragMenu(menuObj, e, 2);}catch(err){}};
				document.onmouseup = function(e) {try{dragMenu(menuObj, e, 3);}catch(err){}};
				doane(e);
			}else if(op == 2 && JSMENU['drag'][0]) {
				var menudragnow = [e.clientX, e.clientY];
				menuObj.style.left = (JSMENU['drag'][2] + menudragnow[0] - JSMENU['drag'][0]) + 'px';
				menuObj.style.top = (JSMENU['drag'][3] + menudragnow[1] - JSMENU['drag'][1]) + 'px';
				menuObj.removeAttribute('top_');menuObj.removeAttribute('left_');
				doane(e);
			}else if(op == 3) {
				JSMENU['drag'] = [];
				document.onmousemove = null;
				document.onmouseup = null;
			}
		},
		
		
	}
})(_OPT.load,window._OPT));

function hideMenu(attr, mtype)
{
	_OPT.ui.hideMenu(attr, mtype);
}

//_OPT.extend('ui',(function($,OPT){return {}})(_OPT.load,window._OPT));
_OPT.extend('request',(function($,OPT){return {
	Ajax : function (recvType, waitId) {

		var aj = new Object();

		aj.loading = MessageJS.wating;
		aj.recvType = recvType ? recvType : 'XML';
		aj.waitId = waitId ? $("#"+waitId).get(0) : null;

		aj.resultHandle = null;
		aj.sendString = '';
		aj.targetUrl = '';

		aj.setLoading = function(loading) {
			if(typeof loading !== 'undefined' && loading !== null) aj.loading = loading;
		};

		aj.setRecvType = function(recvtype) {
			aj.recvType = recvtype;
		};

		aj.setWaitId = function(waitid) {
			aj.waitId = typeof waitid == 'object' ? waitid : $.D(waitid);
		};

		aj.createXMLHttpRequest = function() {
			var request = false;
			if(window.XMLHttpRequest) {
				request = new XMLHttpRequest();
				if(request.overrideMimeType) {
					request.overrideMimeType('text/xml');
				}
			} else if(window.ActiveXObject) {
				var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
				for(var i=0; i<versions.length; i++) {
					try {
						request = new ActiveXObject(versions[i]);
						if(request) {
							return request;
						}
					} catch(e) {}
				}
			}
			return request;
		};

		aj.XMLHttpRequest = aj.createXMLHttpRequest();
		aj.showLoading = function() {
			if(aj.waitId && (aj.XMLHttpRequest.readyState != 4 || aj.XMLHttpRequest.status != 200)) {
				aj.waitId.style.display = '';
				aj.waitId.innerHTML = '<span><img src="' + CONFIG.IMGDIR + '/loading.gif" class="vm"> ' + aj.loading + '</span>';
			}
		};

		aj.processHandle = function() {
			if(aj.XMLHttpRequest.readyState == 4 && aj.XMLHttpRequest.status == 200) {
				if(aj.waitId) {
					aj.waitId.style.display = 'none';
				}
				if(aj.recvType == 'HTML') {
					aj.resultHandle(aj.XMLHttpRequest.responseText, aj);
				} else if(aj.recvType == 'XML') {
					if(!aj.XMLHttpRequest.responseXML || !aj.XMLHttpRequest.responseXML.lastChild || aj.XMLHttpRequest.responseXML.lastChild.localName == 'parsererror') {
						aj.resultHandle('<a href="' + aj.targetUrl + '" target="_blank" style="color:red">'+MessageJS.sysError500+'</a>' , aj);
					} else {
						aj.resultHandle(aj.XMLHttpRequest.responseXML.lastChild.firstChild.nodeValue, aj);
					}
				} else if(aj.recvType == 'JSON') {
					var s = null;
					try {
						s = (new Function("return ("+aj.XMLHttpRequest.responseText+")"))();
					} catch (e) {
						s = null;
					}
					aj.resultHandle(s, aj);
				}
			}
		};

		aj.get = function(targetUrl, resultHandle) {
			//targetUrl = hostconvert(targetUrl);
			setTimeout(function(){aj.showLoading()}, 250);
			aj.targetUrl = targetUrl;
			aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
			aj.resultHandle = resultHandle;
			var attackevasive = isUndefined(attackevasive) ? 0 : attackevasive;
			if(window.XMLHttpRequest) {
				aj.XMLHttpRequest.open('GET', aj.targetUrl);
				aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				aj.XMLHttpRequest.send(null);
			} else {
				aj.XMLHttpRequest.open("GET", targetUrl, true);
				aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				aj.XMLHttpRequest.send();
			}
		};
		aj.post = function(targetUrl, sendString, resultHandle) {
			//targetUrl = hostconvert(targetUrl);
			setTimeout(function(){aj.showLoading()}, 250);
			aj.targetUrl = targetUrl;
			aj.sendString = sendString;
			aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
			aj.resultHandle = resultHandle;
			aj.XMLHttpRequest.open('POST', targetUrl);
			aj.XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			aj.XMLHttpRequest.send(aj.sendString);
		};
		aj.getJSON = function(targetUrl, resultHandle) {
			aj.setRecvType('JSON');
			aj.get(targetUrl+'&ajaxdata=json', resultHandle);
		};
		aj.getHTML = function(targetUrl, resultHandle) {
			aj.setRecvType('HTML');
			aj.get(targetUrl+'&ajaxdata=html', resultHandle);
		};
		return aj;
	},
	
	ajaxget : function (url, showid, waitid, loading, display, recall) {
		var Ajax = OPT.request.Ajax;
		waitid = typeof waitid == 'undefined' || waitid === null ? showid : waitid;
		var x = new Ajax();
		x.setLoading(loading);
		x.setWaitId(waitid);
		x.display = typeof display == 'undefined' || display == null ? '' : display;
		x.showId = $.D(showid);

		if(url.substr(strlen(url) - 1) == '#') {
			url = url.substr(0, strlen(url) - 1);
			x.autogoto = 1;
		}
		if (url.indexOf('?')==-1)url = url + "?";
		var url = url + '&inajax=2&ajaxtarget=' + showid;
		x.get(url, function(s, x) {
			var evaled = false;
			if(s.indexOf('ajaxerror') != -1) {
				_OPT.load.evalscript(s);
				evaled = true;
			}
			if(!evaled && (typeof ajaxerror == 'undefined' || !ajaxerror)) {
				if(x.showId) {
					x.showId.style.display = x.display;
					OPT.request.ajaxinnerhtml(x.showId, s);
					OPT.request.ajaxupdateevents(x.showId);
					if(x.autogoto) scroll(0, x.showId.offsetTop);
				}
			}

			ajaxerror = null;
			if(recall && typeof recall == 'function') {
				recall();
			} else if(recall) {
				eval(recall);
			}
			if(!evaled) _OPT.load.evalscript(s);
		});
	},
	
	ajaxupdateevents : function (obj, tagName) {
		tagName = tagName ? tagName : 'A';
		var objs = obj.getElementsByTagName(tagName);
		for(k in objs) {
			var o = objs[k];
			OPT.request.ajaxupdateevent(o);
		}
	},
	
	ajaxinnerhtml : function (showid, s) {
		if(showid.tagName != 'TBODY') {
			showid.innerHTML = s;
		} else {
			while(showid.firstChild) {
				showid.firstChild.parentNode.removeChild(showid.firstChild);
			}
			var div1 = document.createElement('DIV');
			div1.id = showid.id+'_div';
			div1.innerHTML = '<table><tbody id="'+showid.id+'_tbody">'+s+'</tbody></table>';
			document.body.appendChild(div1);
			var trs = div1.getElementsByTagName('TR');
			var l = trs.length;
			for(var i=0; i<l; i++) {
				showid.appendChild(trs[0]);
			}
			var inputs = div1.getElementsByTagName('INPUT');
			var l = inputs.length;
			for(var i=0; i<l; i++) {
				showid.appendChild(inputs[0]);
			}
			div1.parentNode.removeChild(div1);
		}
	},
	
	
	ajaxupdateevent : function (o) {
		if(typeof o == 'object' && o.getAttribute) {
			if(o.getAttribute('ajaxtarget')) {
				if(!o.id) o.id = Math.random();
				var ajaxevent = o.getAttribute('ajaxevent') ? o.getAttribute('ajaxevent') : 'click';
				var ajaxurl = o.getAttribute('ajaxurl') ? o.getAttribute('ajaxurl') : o.href;
				_attachEvent(o, ajaxevent, newfunction('ajaxget', ajaxurl, o.getAttribute('ajaxtarget'), o.getAttribute('ajaxwaitid'), o.getAttribute('ajaxloading'), o.getAttribute('ajaxdisplay')));
				if(o.getAttribute('ajaxfunc')) {
					o.getAttribute('ajaxfunc').match(/(\w+)\((.+?)\)/);
					_attachEvent(o, ajaxevent, newfunction(RegExp.$1, RegExp.$2));
				}
			}
		}
	},
	
	ajaxpost : function (formid, showid, waitid, showidclass, submitbtn, recall) {
		var waitid = typeof waitid == 'undefined' || waitid === null ? showid : (waitid !== '' ? waitid : '');
		var showidclass = !showidclass ? '' : showidclass;
		var ajaxframeid = 'ajaxframe';
		var ajaxframe = $("#"+ajaxframeid).get(0);
		var curform = $("#"+formid).get(0);
		var formtarget = curform.target;

		var handleResult = function() {
			var s = '';
			var evaled = false;

			showloading('none');
			try {
				s = $("#"+ajaxframeid).get(0).contentWindow.document.XMLDocument.text;
			} catch(e) {
				try {
					s = $("#"+ajaxframeid).get(0).contentWindow.document.documentElement.firstChild.wholeText;
				} catch(e) {
					try {
						s = $("#"+ajaxframeid).get(0).contentWindow.document.documentElement.firstChild.nodeValue;
					} catch(e) {
						s = MessageJS.sysError500;
					}
				}
			}
			if(s != '' && s.indexOf('ajaxerror') != -1) {
				_OPT.load.evalscript(s);
				evaled = true;
			}
			if(showidclass) {
				if(showidclass != 'onerror') {
					$("#"+showid).get(0).className = showidclass;
				} else {
					showError(s);
					ajaxerror = true;
				}
			}
			if(submitbtn) {
				submitbtn.disabled = false;
			}
			if(!evaled && showid &&(typeof ajaxerror == 'undefined' || !ajaxerror)) {
				ajaxinnerhtml($("#"+showid).get(0), s);
			}
			ajaxerror = null;
			if(curform) curform.target = formtarget;
			if(typeof recall == 'function') {
				recall();
			} else {
				eval(recall);
			}
			if(!evaled) _OPT.load.evalscript(s);
			ajaxframe.loading = 0;
			if(!BROWSER.firefox || BROWSER.safari) {
				$(ajaxframe.parentNode).remove();
			} else {
				setTimeout(
					function(){
						$(ajaxframe.parentNode).remove();
					},
					100
				);
			}
		};
		if(!ajaxframe) {
			var div = document.createElement('div');
			div.style.display = 'none';
			div.innerHTML = '<iframe name="' + ajaxframeid + '" id="' + ajaxframeid + '" loading="1"></iframe>';
			$('body').append(div);
			ajaxframe = $("#"+ajaxframeid).get(0);
		} else if(ajaxframe.loading) {
			return false;
		}
		jQuery(ajaxframe).bind("load",handleResult);
		showloading();
		curform.target = ajaxframeid;
		var action = curform.getAttribute('action');
		if (action.indexOf('?')==-1){action = action + "?";} else {action = action + "&";}
		action = action + "inajax=2"
		curform.action = action.replace(/inajax\=2/g, '')+'inajax=2';
		curform.submit();
		if(submitbtn) {
			submitbtn.disabled = true;
		}
		doane();
		return false;
	},
	ajaxmenu : function (ctrlObj, timeout, cache, duration, pos, recall, idclass, contentclass) {
		if(!ctrlObj.getAttribute('mid')) {
			var ctrlid = ctrlObj.id;
			if(!ctrlid) {
				ctrlObj.id = 'ajaxid_' + Math.random();
			}
		} else {
			var ctrlid = ctrlObj.getAttribute('mid');
			if(!ctrlObj.id) {
				ctrlObj.id = 'ajaxid_' + Math.random();
			}
		}
		var menuid = ctrlid + '_menu';
		var menu = $("#"+menuid).get(0);
		if(isUndefined(timeout)) timeout = 3000;
		if(isUndefined(cache)) cache = 1;
		if(isUndefined(pos)) pos = '43';
		if(isUndefined(duration)) duration = timeout > 0 ? 0 : 3;
		if(isUndefined(idclass)) idclass = 'p_pop';
		if(isUndefined(contentclass)) contentclass = 'p_opt';
		var func = function() {
			showMenu({'ctrlid':ctrlObj.id,'menuid':menuid,'duration':duration,'timeout':timeout,'pos':pos,'cache':cache,'layer':2});
			if(typeof recall == 'function') {
				recall();
			} else {
				eval(recall);
			}
		};

		if(menu) {
			if(menu.style.display == '') {
				hideMenu(menuid);
			} else {
				func();
			}
		} else {
			menu = document.createElement('div');
			menu.id = menuid;
			menu.style.display = 'none';
			menu.className = idclass;
			menu.innerHTML = '<div class="' + contentclass + '" id="' + menuid + '_content"></div>';
			$('body').append(menu);
			var url = (!isUndefined(ctrlObj.attributes['shref']) ? ctrlObj.attributes['shref'].value : (!isUndefined(ctrlObj.href) ? ctrlObj.href : ctrlObj.attributes['href'].value));
			url += (url.indexOf('?') != -1 ? '&' :'?') + 'ajaxmenu=1';
			ajaxget(url, menuid + '_content', 'ajaxwaitid', '', '', func);
		}
		doane();
	},
	showWindow : function (k, url, mode, cache, menuv) {
		var D = $.D;
		mode = isUndefined(mode) ? 'get' : mode;
		cache = isUndefined(cache) ? 1 : cache;
		var menuid = 'fwin_' + k;
		var menuObj = D(menuid);
		var drag = null;
		var loadingst = null;
		var hidedom = '';
		var ajaxget = this.ajaxget;
		var ajaxpost = this.ajaxpost;
		var Ajax = this.Ajax;
		
		var fetchContent = function() {
			if(mode == 'get') {
				menuObj.url = url;
				url += (url.search(/\?/) > 0 ? '&' : '?') + 'infloat=yes&handlekey=' + k;
				url += cache == -1 ? '&t='+(+ new Date()) : '';
				if(BROWSER.ie &&  url.indexOf('referer=') < 0) {
					url = url + '&referer=' + encodeURIComponent(location);
				}
				ajaxget(url, 'fwin_content_' + k, null, '', '', function() {initMenu();show();});
			} else if(mode == 'post') {
				menuObj.act = $(url).action;
				ajaxpost(url, 'fwin_content_' + k, '', '', '', function() {initMenu();show();});
			}
			if(parseInt(BROWSER.ie) != 6) {
				loadingst = setTimeout(function() {}, 500);
			}
		};
		var initMenu = function() {
			clearTimeout(loadingst);
			var objs = menuObj.getElementsByTagName('*');
			var fctrlidinit = false;
			for(var i = 0; i < objs.length; i++) {
				if(objs[i].id) {
					objs[i].setAttribute('fwin', k);
				}
				if(objs[i].className == 'flbc') {
					objs[i].href="javascript:hideWindow('"+k+"');";
				}
				if(objs[i].className == 'flb' && !fctrlidinit) {
					if(!objs[i].id) objs[i].id = 'fctrl_' + k;
					drag = objs[i].id;
					fctrlidinit = true;
				}
			}
		};
		
		var show = function() {
			hideMenu('fwin_dialog', 'dialog');
			v = {'mtype':'win','menuid':menuid,'duration':3,'pos':'00','zindex':OPT.ui.JSMENU['zIndex']['win'],'drag':typeof drag == null ? '' : drag,'cache':cache};
			for(k in menuv) {
				v[k] = menuv[k];
			}
			OPT.ui.showMenu(v);
		};

		if(!menuObj) {
			menuObj = document.createElement('div');
			menuObj.id = menuid;
			menuObj.className = 'fwinmask';
			menuObj.style.display = 'none';
			document.body.appendChild(menuObj);
			evt = ' style="cursor:move" onmousedown="dragMenu($(\'#' + menuid + '\').get(0), event, 1)" ondblclick="hideWindow(\'' + k + '\')"';
			if(!BROWSER.ie) {
				hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
			}
			menuObj.innerHTML = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"' + evt + '></td><td class="t_r"></td></tr><tr><td class="m_l"' + evt + '></td><td class="m_c" id="fwin_content_' + k + '">'
				+ '</td><td class="m_r"' + evt + '></td></tr><tr><td class="b_l"></td><td class="b_c"' + evt + '></td><td class="b_r"></td></tr></table>';
			if(mode == 'html') {
				$.D('fwin_content_' + k).innerHTML = url;
				initMenu();
				show();
			} else {
				fetchContent();
			}
		} else if((mode == 'get' && (url != menuObj.url || cache != 1)) || (mode == 'post' && $(url).action != menuObj.act)) {
			fetchContent();
		} else {
			show();
		}
		OPT.ui.doane();
	},
	hideWindow : function (k, all, clear) {
		all = isUndefined(all) ? 1 : all;
		clear = isUndefined(clear) ? 1 : clear;
		hideMenu('fwin_' + k, 'win');
		if(clear && $('fwin_' + k)) {
			$('#fwin_' + k).remove();
		}
		if(all) {
			hideMenu();
		}
	},
	showDialogST : null,
	showDialog : function (msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
		clearTimeout(this.showDialogST);
		cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;
		leftmsg = isUndefined(leftmsg) ? '' : leftmsg;
		mode = in_array(mode, ['confirm', 'notice', 'info', 'right']) ? mode : 'alert';
		var menuid = 'fwin_dialog';
		var menuObj = $.D(menuid);
		var showconfirm = 1;
		confirmtxtdefault = MessageJS.confirm;
		closetime = isUndefined(closetime) ? '' : closetime;
		closefunc = function () {
			if(typeof func == 'function') func();
			else eval(func);
			hideMenu(menuid, 'dialog');
		};
		if(closetime) {
			showPrompt(null, null, '<i>' + msg + '</i>', closetime * 1000, 'popuptext');
			return;
		}
		locationtime = isUndefined(locationtime) ? '' : locationtime;
		if(locationtime) {
			leftmsg = locationtime + MessageJS.rediect;
			showDialogST = setTimeout(closefunc, locationtime * 1000);
			showconfirm = 0;
		}
		confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault;
		canceltxt = canceltxt ? canceltxt : MessageJS.cancel;

		if(menuObj) hideMenu('fwin_dialog', 'dialog');
		menuObj = document.createElement('div');
		menuObj.style.display = 'none';
		menuObj.className = 'fwinmask';
		menuObj.id = menuid;
		document.body.appendChild(menuObj);
		var hidedom = '';
		if(!BROWSER.ie) {
			hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
		}
		var s = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>';
		s += t ? t : MessageJS.notice;
		s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="hideMenu(\'' + menuid + '\', \'dialog\')" title="'+MessageJS.close+'">'+MessageJS.close+'</a></span></h3>';
		if(mode == 'info') {
			s += msg ? msg : '';
		} else {
			s += '<div class="c altw"><div class="' + (mode == 'alert' ? 'alert_error' : (mode == 'right' ? 'alert_right' : 'alert_info')) + '"><p>' + msg + '</p></div></div>';
			s += '<p class="o pns">' + (leftmsg ? '<span class="z xg1">' + leftmsg + '</span>' : '') + (showconfirm ? '<button id="fwin_dialog_submit" value="true" class="pn pnc"><strong>'+confirmtxt+'</strong></button>' : '');
			s += mode == 'confirm' ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')"><strong>'+canceltxt+'</strong></button>' : '';
			s += '</p>';
		}
		s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';
		menuObj.innerHTML = s;
		if($.D('fwin_dialog_submit')) $.D('fwin_dialog_submit').onclick = function() {
			if(typeof func == 'function') func();
			else eval(func);
			hideMenu(menuid, 'dialog');
		};
		if($.D("fwin_dialog_cancel")) {
			$.D("fwin_dialog_cancel").onclick = function() {
				if(typeof funccancel == 'function') funccancel();
				else eval(funccancel);
				hideMenu(menuid, 'dialog');
			};
			$.D('fwin_dialog_close').onclick = $.D('fwin_dialog_close').onclick;
		}
		OPT.ui.showMenu({'mtype':'dialog','menuid':menuid,'duration':3,'pos':'00','zindex':OPT.ui.JSMENU['zIndex']['dialog'],'cache':0,'cover':cover});
		try {
			$.D('fwin_dialog_submit').focus();
		} catch(e) {}
	}
}})(_OPT.load,window._OPT));

function delayShow(ctrlObj, call, time)
{
	_OPT.ui.delayShow(ctrlObj, call, time);
}
function showMenu(v)
{
	_OPT.ui.showMenu(v);
}

function getCurrentStyle(obj, cssproperty, csspropertyNS) {
	if(obj.style[cssproperty]){
		return obj.style[cssproperty];
	}
	if (obj.currentStyle) {
		return obj.currentStyle[cssproperty];
	} else if (document.defaultView.getComputedStyle(obj, null)) {
		var currentStyle = document.defaultView.getComputedStyle(obj, null);
		var value = currentStyle.getPropertyValue(csspropertyNS);
		if(!value){
			value = currentStyle[cssproperty];
		}
		return value;
	} else if (window.getComputedStyle) {
		var currentStyle = window.getComputedStyle(obj, "");
		return currentStyle.getPropertyValue(csspropertyNS);
	}
}
function fetchOffset(obj, mode) {
	var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;

	if(obj.getBoundingClientRect && !mode) {
		var rect = obj.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		if(document.documentElement.dir == 'rtl') {
			scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
		}
		left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
		top_offset = rect.top + scrollTop - document.documentElement.clientTop;
	}
	if(left_offset <= 0 || top_offset <= 0) {
		left_offset = obj.offsetLeft;
		top_offset = obj.offsetTop;
		while((obj = obj.offsetParent) != null) {
			position = getCurrentStyle(obj, 'position', 'position');
			if(position == 'relative') {
				continue;
			}
			left_offset += obj.offsetLeft;
			top_offset += obj.offsetTop;
		}
	}
	return {'left' : left_offset, 'top' : top_offset};
}
function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}
function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}

function getHost(url) {
	var host = "null";
	if(typeof url == "undefined"|| null == url) {
		url = window.location.href;
	}
	var regex = /^\w+\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match) {
		host = match[1];
	}
	return host;
}

function hostconvert(url) {
	if(!url.match(/^https?:\/\//)) url = CONFIG.SITEURL + url;
	var url_host = getHost(url);
	var cur_host = getHost().toLowerCase();
	if(url_host && cur_host != url_host) {
		url = url.replace(url_host, cur_host);
	}
	return url;
}






function showloading(display, waiting) {
	var display = display ? display : 'block';
	var waiting = waiting ? waiting : MessageJS.wating;
	$('#ajaxwaitid').html(waiting);
	$('#ajaxwaitid').get(0).style.display = display;
}

function _attachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if(eventobj.attachEvent) {
		obj.attachEvent('on' + evt, func);
	}
}

function _detachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.removeEventListener) {
		obj.removeEventListener(evt, func, false);
	} else if(eventobj.detachEvent) {
		obj.detachEvent('on' + evt, func);
	}
}


var showDialogST = null;
/**
 * @param msg			��Ϣ����
 * @param mode			ģʽ��������ȷ������info
 * @param t				����
 * @param func			���еĺ���
 * @param cover			���ֲ�
 * @param funccancel	ȡ������
 * @param leftmsg		
 * @param confirmtxt	��ťȷ��
 * @param canceltxt		��ťȡ��
 * @param closetime		tips��ʾģʽ
 * @param locationtime	��ʱ��ת
 */
function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
	_OPT.request.showDialog(arguments);
}

function showTip(ctrlobj) {
	_OPT.load.F('showTip', arguments,'showmessage');
}

function showPrompt(ctrlid, evt, msg, timeout, classname) {
	_OPT.load.F('showPrompt', arguments,'showmessage');
}



/*
 * ================================================================================================================
 * ================================================================================================================
 * ================================================================================================================
 * ================================================================================================================
 * ================================================================================================================
 */
function showWindow(k, url, mode, cache, menuv) {
	_OPT.request.showWindow(k, url, mode, cache, menuv);
}
function hideWindow(k, all, clear) {
	_OPT.request.hideWindow(k, all, clear);
}
function trim(str) {
	return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

function strlen(str) {
	return (BROWSER.ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}
function mb_cutstr(str, maxlen, dot) {
	var len = 0;
	var ret = '';
	var dot = !dot ? '...' : dot;
	maxlen = maxlen - dot.length;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
		if(len > maxlen) {
			ret += dot;
			break;
		}
		ret += str.substr(i, 1);
	}
	return ret;
}
function mb_strlen(str) {
	var len = 0;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
	}
	return len;
}
//showMsg('xxxx');

function beatfulFrom(selector){_OPT.load.F('exec',arguments,'jquery_ezmark_min');}
function jquerySelect(selector){_OPT.load.F('init',arguments,'jquery_select_min');}
function datepicker(selector){_OPT.load.F('datepicker',arguments,'jquery_date_min');}
function zoom(obj, zimg, nocover, pn, showexif){_OPT.load.F('zoom',arguments,'zoom');}


function showlogin()
{
	_OPT.load.F('exec',arguments,'baofenglogin');
}