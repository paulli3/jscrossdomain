/**
 * 图丽消息服务
 *
 * 
 */
(function(win) {

	// 对象已存在
	if (typeof(win.Tuli) == 'object') {
		return;
	}

	/* 消息回调对象数组 */
	var callBackObj = {}
	//var apiUrl = "http://mm.yunfan.com/api/proxy.html";
	apiUrl = "http://www.aa.com/proxy.html";
	
	/* 将json对象转为字符串 */
	var jsonToStr = function(json) {
		if (typeof(json) != 'object') {
			return 'null';
		}
		var str = '{',
			spr = '';
		for (var k in json) {
			str += spr + k + ':' + '"' + json[k] + '"';
			spr = ',';
		}
		str += '}';
		return str;
	}

	/**
	 * 
	 *
	 * @param string msgStr 消息json对象的字符串，其实必需要定义'msgtype'的字段,如: '{msgtype:"checkOrder",userid:501}'
	 */
	var tuliProxy = function(msgStr) {
		// 如果不存在则生成隐藏的 iframe, 将 iframe 设为图丽的代理页面来实现消息通知
		var doc = document,
			ifmId = 'tuliProxy',
			ifm = null,
			// 设置 hash 值  
			ifmurl = apiUrl + '#' + (new Date()).getTime() + encodeURIComponent(msgStr);
		if ((ifm = doc.getElementById(ifmId)) == null) {
			var ifm = doc.createElement('iframe');
			ifm.id = ifmId;
			ifm.style.display = 'none';
			ifm.src = ifmurl;
			doc.body.appendChild(ifm);
		} else {
			ifm.src = ifmurl;
		}
	}

	/**
	 * 发任意形式的通知给Tuli
	 *
	 * @param string msgType  消息类型
	 * @param obj paramsObj 参数,以json对象方式传，格式如:{id:1,name:'aa'}
	 */
	var sendTo = function(msgType, paramsObj) {
		paramsObj || (paramsObj = {});
		var paramStr = jsonToStr(paramsObj),
			msgStr = '{msgtype:"' + msgType + '",params:' + paramStr + '}';
		if (typeof(console) == 'object') {
			console.log(paramStr)
		}
		tuliProxy(msgStr);
	}

	/**
	 * 发通知给Tuli
	 *
	 * @param int stat      类型：(0:注册 1:登录 2:支付 3:登出)
	 * @param obj paramsObj 参数,以json对象方式传，格式如:{id:1,name:'aa'}
	 */
	var sendNotice = function(stat, paramsObj) {
		var typeArr = ['register', 'login', 'pay', 'logout', 'follow', 'unfollow', 'setifm'],
			msgType = typeArr[stat];
		sendTo(msgType, paramsObj);
	}

	// 定义对象
	win.baofeng = {

		/* ------------------- Tuli调用的接口 ------------------ */
		// 注册消息处理回调句柄(Tuli调用)
		init: function(callbackObj) {
			callBackObj = callbackObj;
		},

		// 执行回调(代理会调用)
		execCallback: function(type, obj) {
			// 避免错误而影响其它过程的执行
			var func = callBackObj[type];
			try {
				func(obj);
			} catch (err) {
				if (typeof(console) == 'object') {
					console.log('出错事件类型:' + type + ' 对应源码:' + func.toString());
				}
			}
		},

		/* ------------------- 第三方调用的接口 ------------------ */
		/**
		 * 以新窗口方式注册Tuli帐号
		 *
		 * @return void
		 */
		register: function(paramsObj) {
			sendNotice(0,paramsObj);
		},

		/**
		 * 弹出登录框
		 *
		 * @param obj paramsObj 参数,以json对象方式传，格式如:{id:1,name:'aa'} 这些参数都会原样以 GET 参数的形式返回
		 * @return void
		 */
		login: function(paramsObj) {
			sendNotice(1, paramsObj);
		},

		/**
		 * 退出
		 *
		 * @return void
		 */
		logout: function(paramsObj) {
			sendNotice(3, paramsObj);
		},

		/**
		 * 通知Tuli进行支付
		 *
		 * @param obj paramsObj 参数,以json对象方式传，格式如:{id:1,name:'aa'}
		 * @return void
		 */
		pay: function(paramsObj) {
			sendNotice(2, paramsObj);
		},

		
		/**
		 * [ description]
		 * @param   follow_id  主播ID
		 *			follow_avatar     主播头像
		 * 			follow_nickname  主播昵称 
		 *			follow_room      主播房间
		 * @return {[type]}           [description]
		 */
		follow:function(paramsObj){
			sendNotice(4, paramsObj);
		},

		unfollow: function(paramsObj) {
			sendNotice(5, paramsObj);
		},
		/**
		 * 发送任何通知
		 *
		 * @param string msgType 消息类型,暂支持 "setifm":设置被引入的iframe的CSS属性
		 * @param obj paramsObj 参数,以json对象方式传，格式如:{height:'100px',width:'50px'}
		 * @return void
		 */
		send: function(msgType, paramsObj) {
			sendTo(msgType, paramsObj);
		}
	}
})(window);