/**
 * ͼ����Ϣ����
 *
 * 
 */
(function(win) {

	// �����Ѵ���
	if (typeof(win.Tuli) == 'object') {
		return;
	}

	/* ��Ϣ�ص��������� */
	var callBackObj = {}
	//var apiUrl = "http://mm.yunfan.com/api/proxy.html";
	apiUrl = "http://www.aa.com/proxy.html";
	
	/* ��json����תΪ�ַ��� */
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
	 * @param string msgStr ��Ϣjson������ַ�������ʵ����Ҫ����'msgtype'���ֶ�,��: '{msgtype:"checkOrder",userid:501}'
	 */
	var tuliProxy = function(msgStr) {
		// ������������������ص� iframe, �� iframe ��Ϊͼ���Ĵ���ҳ����ʵ����Ϣ֪ͨ
		var doc = document,
			ifmId = 'tuliProxy',
			ifm = null,
			// ���� hash ֵ  
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
	 * ��������ʽ��֪ͨ��Tuli
	 *
	 * @param string msgType  ��Ϣ����
	 * @param obj paramsObj ����,��json����ʽ������ʽ��:{id:1,name:'aa'}
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
	 * ��֪ͨ��Tuli
	 *
	 * @param int stat      ���ͣ�(0:ע�� 1:��¼ 2:֧�� 3:�ǳ�)
	 * @param obj paramsObj ����,��json����ʽ������ʽ��:{id:1,name:'aa'}
	 */
	var sendNotice = function(stat, paramsObj) {
		var typeArr = ['register', 'login', 'pay', 'logout', 'follow', 'unfollow', 'setifm'],
			msgType = typeArr[stat];
		sendTo(msgType, paramsObj);
	}

	// �������
	win.baofeng = {

		/* ------------------- Tuli���õĽӿ� ------------------ */
		// ע����Ϣ����ص����(Tuli����)
		init: function(callbackObj) {
			callBackObj = callbackObj;
		},

		// ִ�лص�(��������)
		execCallback: function(type, obj) {
			// ��������Ӱ���������̵�ִ��
			var func = callBackObj[type];
			try {
				func(obj);
			} catch (err) {
				if (typeof(console) == 'object') {
					console.log('�����¼�����:' + type + ' ��ӦԴ��:' + func.toString());
				}
			}
		},

		/* ------------------- ���������õĽӿ� ------------------ */
		/**
		 * ���´��ڷ�ʽע��Tuli�ʺ�
		 *
		 * @return void
		 */
		register: function(paramsObj) {
			sendNotice(0,paramsObj);
		},

		/**
		 * ������¼��
		 *
		 * @param obj paramsObj ����,��json����ʽ������ʽ��:{id:1,name:'aa'} ��Щ��������ԭ���� GET ��������ʽ����
		 * @return void
		 */
		login: function(paramsObj) {
			sendNotice(1, paramsObj);
		},

		/**
		 * �˳�
		 *
		 * @return void
		 */
		logout: function(paramsObj) {
			sendNotice(3, paramsObj);
		},

		/**
		 * ֪ͨTuli����֧��
		 *
		 * @param obj paramsObj ����,��json����ʽ������ʽ��:{id:1,name:'aa'}
		 * @return void
		 */
		pay: function(paramsObj) {
			sendNotice(2, paramsObj);
		},

		
		/**
		 * [ description]
		 * @param   follow_id  ����ID
		 *			follow_avatar     ����ͷ��
		 * 			follow_nickname  �����ǳ� 
		 *			follow_room      ��������
		 * @return {[type]}           [description]
		 */
		follow:function(paramsObj){
			sendNotice(4, paramsObj);
		},

		unfollow: function(paramsObj) {
			sendNotice(5, paramsObj);
		},
		/**
		 * �����κ�֪ͨ
		 *
		 * @param string msgType ��Ϣ����,��֧�� "setifm":���ñ������iframe��CSS����
		 * @param obj paramsObj ����,��json����ʽ������ʽ��:{height:'100px',width:'50px'}
		 * @return void
		 */
		send: function(msgType, paramsObj) {
			sendTo(msgType, paramsObj);
		}
	}
})(window);