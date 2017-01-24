define(['app'], function(app) {
	
	(function() {
		/*定义一个类*/
		var successPayWrap = {
			/**
			 * 入口方法
			 */
			init: function() {
				successPayWrap.initEvent();
			},
			initEvent: function() {
				var self = this;
				/* 初始化支付成功页面 */
				self.initSuceessPayEvent();
			},
			/**
			 * 初始化支付成功页面
			 */
			initSuceessPayEvent:function(){
				var total = getUrlParamHandler.getUrlParam("total"); // 金额
				var orderId = getUrlParamHandler.getUrlParam("order_id"); // 订单id
				var payStep = getUrlParamHandler.getUrlParam("pay_step"); // 支付类型
				var payTime = getUrlParamHandler.getUrlParam("pay_time"); // 支付时间
				$("#Jpay").html(total);
				$("#JorderId").html(orderId);
				$("#JpayStep").html(payStep);
				$("#JpayTime").html(payTime);
				/* 查看订单 */
				$("#Jview").attr("href","/advancelist?pos="+orderId)
			}					
		};
		
		getUrlParamHandler = {
	        /**
	         * 获取url中的参数
	         * @param {Object} name
	         */
	        getUrlParam: function (name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	            var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
	            if (r != null) return decodeURI(r[2]);
	            return null; //返回参数值
	        }
	    };
		//入口方法调用 代码只能从这里执行
		app.successPayWrapHandler = function() {
			successPayWrap.init();
		}
	})();
});