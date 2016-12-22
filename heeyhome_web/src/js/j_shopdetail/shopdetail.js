/**
 * 闭包
 * 店铺详情
 * tangj
 */
(function() {

	/**
	 * 需要require的公共方法或组件
	 */
	var HHIT_SHOPDETAILAPP = angular.module('heeyhomeApp');

	var SHOPDATAURL = "http://hyu2387760001.my3w.com/shopinfo"; // 店铺详情信息接口
	var TECHNICSURL = "http://hyu2387760001.my3w.com/personal/myshop/technics"; // 显示店铺工艺列表信息接口
	var SUCCESSURL = "http://hyu2387760001.my3w.com/myworkcase"; // 显示工长添加的案例列表信息接口
	var WORKSURL = "http://hyu2387760001.my3w.com/myworkers"; // 工人列表信息接口
	var WORKINFOURL = "http://hyu2387760001.my3w.com/myworkers/workerinfo"; // 工人详细信息接口
	
	var worksObj = {};

	/*定义一个类*/
	var shopDetailWrap = {
		/**
		 * 入口方法
		 */
		init: function() {
			shopDetailWrap.initEvent();
		},
		initEvent: function() {
			var self = this;
			/* 我要的工人信息初始化*/
			self.initMWorkInfoEvent();
			/* 页面店铺信息初始化数据 */
			self.initShopDataEvent();
			/* 页面店铺工艺初始化数据*/
			self.initTechnicsDataEvent();
			/* 页面工人初始化数据*/
			self.initWorksDataEvent();
			/* 页面成功案例初始化数据*/
			//			self.initSuccessCaseDataEvent();
			/* 图片滚动效果 */
			//			self.initPictureScrollEvent();
			/* 楼层导航事件 */
			self.initFloorNavEvent();
			/* 点击加入购物车抛物线曲线功能*/
			self.initClickAddEvent();
			/* 我要的工人点击事件*/
			self.initMWworkClickEvent();
			/* 我要的工人删除事件*/
			self.initDeleteMworkEvent();

		},
		/**
		 * 图片滚动效果
		 */
		initPictureScrollEvent: function() {
			// 工种点击工人图片轮播
			$(".wrapper_box").slide({
				titCell: "",
				mainCell: ".wrapper_ul ul",
				autoPage: true,
				effect: "leftLoop",
				autoPlay: false,
				vis: 4
			});
			// 工长店铺图片轮播
			$(".picBtnTop").slide({
				mainCell: ".bd ul",
				effect: "fade",
				autoPlay: true,
				triggerTime: 4
			});

		},
		/**
		 * 楼层导航事件
		 */
		initFloorNavEvent: function() {
			var items = $('.same_class');
			$(".tabUl li").click(function() {
				//				$(".tabUl").css('position', 'fixed');
				$(".tabUl").addClass("fixed");
			});
			$(".tabUl li ").click(function(e) {
				e.stopPropagation();
				var x = $(this).index();
				var divTop = items.eq(x).offset().top;
				$("html,body").stop().animate({
					scrollTop: divTop
				}, 10);
			});
			$(window).scroll(function() {
				var scrollTop = $(document).scrollTop();
				var oTabUl = $('#tabUl');
				var curId = '';
				if(scrollTop >= oTabUl.offset().top) {
					//					$('.tabUl').css('position', 'fixed');
					$(".tabUl").addClass("fixed");
				} else {
					//					$('.tabUl').css('position', 'static');
					$(".tabUl").removeClass("fixed");
				}

				items.each(function() {
					var m = $(this); //定义变量，获取当前类
					var itemsTop = m.offset().top; //定义变量，获取当前类的top偏移量
					if(scrollTop > itemsTop - 100) {
						curId = "&" + m.attr("id");
					} else {
						return false;
					}

				});

				//给相应的楼层设置cur,取消其他楼层的cur
				var curLink = oTabUl.find(".tab_active");
				if(curId && curLink.find('a').attr("tab") != curId) {
					oTabUl.find("[tab= '" + curId + "']").parent().addClass("tab_active");
					curLink.removeClass("tab_active");
				}
			});

		},
		/**
		 * 我要的工人信息初始化数据 
		 */
		initMWorkInfoEvent: function(){
			var self = this;
			var _wObj = JSON.parse(sessionStorage.getItem("wObj"));
			// 判断sessionStorage里面有没有值，如果有值那么赋值到全局变量中去并且进行初始化我要的工人信息模块数据
			if(_wObj!=null && _wObj != undefined){
				// 进行初始化我要的工人信息模块数据
				var jslength=0;
				for(var js2 in _wObj){
					jslength++;
				}
				$(".h-bd").text(jslength);
				$.each(_wObj, function(i,v) {
					worksObj[i] = {
						ucateid:0, // 工种类别
						shopName:'',
						resList: []
					}
					worksObj[i].resList.push(v.resList[0]);
					worksObj[i].ucateid = v.ucateid;
					worksObj[i].shopName = v.shopName;
					$(".selectItemContent").append(self.spliceConFrameEvent(v.ucateid,v.shopName));
				 	$("#cata"+v.ucateid+" .needclist").append(self.spliceWdataEvent(v.ucateid,i,v.resList[0]));
				});
			}
		},
		/**
		 * 页面店铺信息初始化数据 
		 */
		initShopDataEvent: function() {
			var self = this;
			var shopId = getUrlParamHandler.getUrlParam('pos');
			var sc = spliceShopDetailContHandler;
			$.ajax({
				url: SHOPDATAURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					shop_id: shopId
				},
				success: function(data) {
					$(".hd ul").append(sc.spliceHdPictureEvent(data.data));
					$(".bd ul").append(sc.spliceBdPictureEvent(data.data));
					$(".scontent").append(sc.spliceShopInfoEvent(data.data));
					$(".manager_introduce").append(sc.spliceManagerInfoEvent(data.data));
					$(".work_experience ul").append(sc.spliceBeInfoEvent(data.data));
					$(".decoration_history ul").append(sc.spliceDhInfoEvent(data.data));
					self.initSuccessCaseDataEvent(data.data.shopper_id);
					self.initPictureScrollEvent();
				},
				error: function(data) {}
			});
		},
		/**
		 * 页面店铺工艺初始化数据
		 */
		initTechnicsDataEvent: function() {
			var sc = spliceShopDetailContHandler;
			var shopId = getUrlParamHandler.getUrlParam('pos');
			$.ajax({
				url: TECHNICSURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					shop_id: shopId
				},
				success: function(data) {
					$(".process_content").append(sc.spliceGyInfoEvent(data.data));
				},
				error: function(data) {}
			});
		},
		/**
		 * 页面成功案例初始化数据
		 * @param {Object} shopperId 工长ID
		 */
		initSuccessCaseDataEvent: function(shopperId) {
			var sc = spliceShopDetailContHandler;
			$.ajax({
				url: SUCCESSURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					foreman_id: shopperId
				},
				success: function(data) {
					$("#sd_hexgrid").append(sc.spliceCgInfoEvent(data.data));
				},
				error: function(data) {}
			});
		},
		/**
		 * 页面工人初始化数据
		 */
		initWorksDataEvent: function() {
			var self = this;
			var shopId = getUrlParamHandler.getUrlParam('pos');
			console.log(shopId)
			var sc = spliceShopDetailContHandler;
			$.ajax({
				url: WORKSURL,
				type: "GET",
				async: true,
				dataType: 'jsonp',
				data: {
					shop_id: shopId
				},
				success: function(data) {
					console.log(data);
					$("#water_electrician .wrapper_ul ul").append(sc.spliceGrInfoEvent(data.data.eleworker)); //水电工
					$("#water_electrician ").append(sc.spliceHidePicEvent(data.data.eleworker)); //水电工隐藏图片
					$("#bricklayer .wrapper_ul ul").append(sc.spliceGrInfoEvent(data.data.brickworker)); //瓦工
					$("#bricklayer ").append(sc.spliceHidePicEvent(data.data.brickworker)); //瓦工隐藏图片
					$("#woodworking .wrapper_ul ul").append(sc.spliceGrInfoEvent(data.data.woodworker)); //木工
					$("#woodworking ").append(sc.spliceHidePicEvent(data.data.woodworker)); //木工隐藏图片
					$("#painter .wrapper_ul ul").append(sc.spliceGrInfoEvent(data.data.paintworker)); //油漆工
					$("#painter ").append(sc.spliceHidePicEvent(data.data.paintworker)); //油漆工隐藏图片
				},
				error: function(data) {}
			});
		},
		/**
		 * 点击加入购物车抛物线曲线功能
		 */
		initClickAddEvent:function(){
			var self = this;
			$(document).on("click",".btnCart",function(){
				var uid = $(this).data("uid");
				self.initParabolaAnimationEvent(uid);
			})
		},
		/**
		 * 抛物线运动动画
		 * @param {Object} uid 当前工人的ID名
		 */
		initParabolaAnimationEvent:function(uid){
			var self = this;
			// 元素以及其他一些变量
			var eleFlyElement = document.querySelector("#flyItem"+uid),
				eleShopCart = document.querySelector("#shopCart"),
				ucateid = $("#flyItem"+uid).data("cate"),
				uinfo = $("#flyItem"+uid).data("info"),
				shopName = $(".shop_name h2").text(); // 工人的相关信息

			var numberItem = 0;
			// 抛物线运动
			// 判断worksObj是否为空
			if(JSON.stringify(worksObj) == "{}") { 
			 	$(".selectItemContent").append(self.spliceConFrameEvent(ucateid,shopName));
			 	$("#cata"+ucateid+" .needclist").append(self.spliceWdataEvent(ucateid,uid,uinfo));
			}else{
				var tempArr = [];
				$.each(worksObj, function(i,v) {
					tempArr.push(v.ucateid);
				});
				if($.inArray(ucateid, tempArr)+1){ // 工种类型存在
					if($.inArray(uid, Object.keys(worksObj))+1){ // 添加的用户存在
						alert("该用户已经添加在你的购物车里了，请不要重复添加");
						return;
					}
					$("#cata"+ucateid+" .needclist").append(self.spliceWdataEvent(ucateid,uid,uinfo));
				}else{ //不存在
					$(".selectItemContent").append(self.spliceConFrameEvent(ucateid,shopName));
					$("#cata"+ucateid+" .needclist").append(self.spliceWdataEvent(ucateid,uid,uinfo));
				}
			}

			var myParabola = funParabola(eleFlyElement, eleShopCart, {
				speed: 400, //抛物线速度
				curvature: 0.0008, //控制抛物线弧度
				complete: function() {
					eleFlyElement.style.visibility = "hidden";
					var len = parseInt($(".h-bd").text());
					eleShopCart.querySelector("div.h-bd").innerHTML = ++len;
				}
			});
			
			// 绑定点击事件

			if(eleFlyElement && eleShopCart) {
				// 滚动大小
				var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
					scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
				eleFlyElement.style.left = event.clientX + scrollLeft + "px";
				eleFlyElement.style.top = event.clientY + scrollTop + "px";
				eleFlyElement.style.visibility = "visible";

				// 需要重定位

				myParabola.position().move();
				
				worksObj[uid] = {
					ucateid:0, // 工种类别
					shopName:'',
					resList: []
				}
				worksObj[uid].resList.push(uinfo);
				worksObj[uid].ucateid = ucateid;
				worksObj[uid].shopName = shopName;
	//			worksObj.push(a);
				
				sessionStorage.wObj = JSON.stringify(worksObj); // 存储到session里面
				// 页面一条一条插入数据
				
				 
//				var x = sessionStorage.wObj;
//				console.log(JSON.parse(x))
			}
		},
		/**
		 * 我要的工人点击事件
		 */
		initMWworkClickEvent:function(){
			$(document).on("click",".mwwork",function(){
				
				$("#J_SelectedItems").toggle();
				
				if($(this).hasClass("item_hover_180")){
    				$(this).removeClass("item_hover_180");
    			}else{
    				$(this).addClass("item_hover_180");
    			}
			});
		},
		/**
		 * 我要的工人点击删除事件
		 */
		initDeleteMworkEvent:function(){
			$(document).on("click",".needclose",function(){
				alert($(this).parents(".needclist").children("div").length);
				var _wObj = JSON.parse(sessionStorage.getItem("wObj"));
				var id = $(this).parent().data("nid");
				delete _wObj[id];//删除属性
				var jslength=0;
				for(var js2 in _wObj){
					jslength++;
				}
				$(".h-bd").text(jslength);
				$.each(_wObj, function(i,v) {
					worksObj = {};
					worksObj[i] = {
						ucateid:0, // 工种类别
						shopName:'',
						resList: []
					}
					worksObj[i].resList.push(v.resList[0]);
					worksObj[i].ucateid = v.ucateid;
					worksObj[i].shopName = v.shopName;
				});
				sessionStorage.wObj = JSON.stringify(_wObj);
				if($(this).parents(".needclist").children("div").length == 1){
					$(this).parents(".needcont").remove();
				}else {
					$(this).parent().remove();
				}
			});
		},
		/**
		 * 拼接我要的工人内容框架
		 * @param {Object} ucateid 工人类型
		 */
		spliceConFrameEvent:function(ucateid,shopName){
//			var shopName = $(".shop_name h2").text();
			var cateName = '';
			switch(ucateid) {
				case 1:
				 	cateName = "杂工";
					break;
				case 2:
				 	cateName = "水电工";
					break;
				case 3:
					cateName = "瓦工";
					break;
				case 4:
				 	cateName = "木工";
					break;
				case 5:
					cateName = "油漆工";
					break;
			}
			var str = '<div id="cata'+ucateid+'" class="needcont"><div class="needheader"><div class="needtitle"><em><img src="css/img/icon-sdg.png"></em>';
			str += '<span title="'+shopName+'">'+shopName+"-"+cateName+'</span></div></div><div class="needclist"></div></div>';
			return str;
		},
		/**
		 * 拼接我要的工人详细内容框架
		 * @param {Object} ucateid 工人类型
		 * @param {Object} uid 工人id 
		 * @param {Object} uinfo 工人信息
		 */
		spliceWdataEvent:function(ucateid,uid,uinfo){
			var str = '<div data-nid="'+uid+'" data-ntype="'+ucateid+'"><div class="needpic"><img src="http://hyu2387760001.my3w.com/' + uinfo.img + '"></div><div class="needname">';
			str += '<span>'+uinfo.name+'</span><span>'+uinfo.city+'</span></div><div class="needmoney">'+uinfo.cp+'元/平方米</div><a class="needclose"></a></div>'
			return str;
		}
	};

	getUrlParamHandler = {
		/**
		 * 获取url中的参数
		 * @param {Object} name
		 */
		getUrlParam: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.hash.split("?")[1].match(reg); //匹配目标参数
			if(r != null) return unescape(r[2]);
			return null; //返回参数值
		}
	};
	/**
	 * 拼接内容
	 */
	spliceShopDetailContHandler = {
		/**
		 * 店铺小照片轮播图
		 * @param {Object} value 对象
		 */
		spliceHdPictureEvent: function(value) {
			var vrStr = '';
			$.each(value.shop_imgs, function(i, v) {
				vrStr += '<li><img src="http://hyu2387760001.my3w.com/' + v.shop_img + '" /></li>';
			});
			return vrStr;
		},
		/**
		 * 店铺大照片轮播图
		 * @param {Object} value 对象
		 */
		spliceBdPictureEvent: function(value) {
			var vrStr = '';
			$.each(value.shop_imgs, function(i, v) {
				vrStr += '<li><div class="bg"></div><div class="pic"><img src="http://hyu2387760001.my3w.com/' + v.shop_img + '" /></div><div class="title"><a href="">效果图1</a></div></li>';
			});
			return vrStr;
		},
		/**
		 * 店铺信息
		 * @param {Object} value 对象
		 */
		spliceShopInfoEvent: function(value) {
			var vrStr = '<div class="shop_name"><h2>' + value.shop_name + '</h2>';
			$.each(value.authentication, function(i, v) {
				vrStr += '<img src="http://hyu2387760001.my3w.com/' + v + '">';
			});
			vrStr += '</div><div class="signature"><h3>' + value.shop_describe + '</h3></div>';
			vrStr += '<div class="shop_introduce"><p><img src="css/img/icon-location.png">' + value.shop_address + '</p><p class="service_area">服务范围:&nbsp;';
			$.each(value.servicearea, function(i, v) {
				vrStr += '<span>' + v + '</span>';
			});
			vrStr += '<input type="button" value="查看地图"></p><div class="good_form clearfix"><p class="good_style">擅长风格:</p>';
			$.each(value.servicetag, function(i, v) {
				vrStr += '<span>' + v + '</span>';
			});
			vrStr += '</div></div><div class="shop_assess clearfix"><div><p>工程质量</p><p><span>' + value.shop_score.projectquality + '</span>分</p></div><div><p>服务态度</p><p><span>' + value.shop_score.serviceattitude + '</span>分</p></div><div><p>综合评价</p><p><span>' + value.shop_score.overallmerit + '</span>分</p></div></div>';
			return vrStr;
		},
		/**
		 * 店长信息 
		 * @param {Object} value 对象
		 */
		spliceManagerInfoEvent: function(value) {
			var vrStr = '<div class="icon_head"><img src="http://hyu2387760001.my3w.com/' + value.shopper_info.portrait_img + '"></div>';
			vrStr += '<div class="manager_detail"><div><span>姓名</span><span>' + value.shopper_info.foremaninfo_realname + '</span></div><div><span>籍贯</span><span>' + value.shopper_info.home_province + value.shopper_info.home_city + '</span></div><div><span>施工团队</span><span>' + value.shop_workernum + '人</span></div><div><span>工龄</span><span>' + value.shopper_info.worktime + '年</span></div><div><span>开店时间</span><span>' + value.opentime + '</span></div><div><span>接单数</span><span>' + value.shopper_info.ordernum + '</span></div></div>';
			return vrStr;
		},
		/**
		 * 从业经历
		 * @param {Object} value 对象
		 */
		spliceBeInfoEvent: function(value) {
			var vrStr = '';
			$.each(value.shopper_info.experience, function(i, v) {
				vrStr += '<li>' + v + '</li>';
			});
			return vrStr;
		},
		/**
		 * 装修小区
		 * @param {Object} value 对象
		 */
		spliceDhInfoEvent: function(value) {
			var vrStr = '';
			$.each(value.shopper_info.decoratedareas, function(i, v) {
				vrStr += '<li>' + v + '</li>';
			});
			return vrStr;
		},
		/**
		 * 本店工艺
		 * @param {Object} value 对象
		 */
		spliceGyInfoEvent: function(value) {
			var vrStr = '';
			var shopId = getUrlParamHandler.getUrlParam('pos');
			$.each(value, function(i, v) {
				if(v.img.length != 0) {
					vrStr += '<div class="process_box"><a rel="nofollow" href="album.html?ams=' + shopId + '&voe=' + v.technics_id + '" target="_blank" ><img src="http://hyu2387760001.my3w.com/' + v.img[0].technics_img + '"><div class="btntc"><i></i><p title=' + v.technics_text + '><em>' + v.technics_text + '</em></p></div></a></div>';
				}

			});
			return vrStr;
		},
		/**
		 * 成功案例
		 * @param {Object} value 对象
		 */
		spliceCgInfoEvent: function(value) {
			var vrStr = '';
			$.each(value, function(i, v) {
				if(v.img.length != 0) {
					vrStr += '<li class="sd_hexli" data-type="' + v.type + '" ><a><div><img src="http://hyu2387760001.my3w.com/' + v.img[0].case_img + '"><div class="sd_title"><span class="sd_area">' + v.area + '㎡</span><span>' + v.housetype + '&middot;' + v.style + '</span></div>';
					vrStr += '<div class="sd_stips"><span><em class="cr_icon_location"></em>' + v.address + '</span><span >施工时间</span><span style="padding: 0px;margin-top: -5px;">' + v.timelong + '</span><div><em class="cr_icon_look"></em><span>' + v.scan_num + '</span>';
					vrStr += '<em class="cr_icon_love"></em><span>' + v.like_num + '</span></div></div></div></a></li>';
				}
			});
			return vrStr;
		},
		/**
		 * 工人信息
		 * @param {Object} value 对象
		 */
		spliceGrInfoEvent: function(value) {
			var vrStr = '';
			$.each(value, function(i, v) {
				vrStr += '<li><div class="sliderworker_item"><p class="masklayer btnCart" data-uid="'+v.userid+'" >添加</p><div class="workertext"><em class="workerimg"><img src="http://hyu2387760001.my3w.com/' + v.portrait_img + '"></em>';
				vrStr += '<p class="workername"><span>' + v.name + '</span><span class="english">DongDaWei</span></p><p class="workerinfo"><span>' + (v.sex == 1 ? "男" : "女") + '</span><span>' + v.age + '岁</span><span>' + v.birthplace + '</span>';
				vrStr += '<p class="workermoney"><em>200</em>元<span>&nbsp;/&nbsp;天</span></p><p class="workerother"><span>从业时间&nbsp;&nbsp;<em>' + v.worktime + '</em>年</span><span>订单数&nbsp;&nbsp;<em>150</em></span>';
				vrStr += '</p></div></div></li>';
			});
			return vrStr;
		},
		/**
		 * 各个工种的隐藏图片
		 * @param {Object} value 对象
		 */
		spliceHidePicEvent:function(value){
			var vrStr = '';
			$.each(value, function(i, v) {
				var obj = {"img":v.portrait_img,"name":v.name,"city":v.birthplace,"cp":300,"shopId":v.shopid};
				vrStr += '<div id="flyItem'+v.userid+'" class="fly_item" data-cate="'+v.cate_id+'" data-info='+JSON.stringify(obj)+'  ><img src="http://hyu2387760001.my3w.com/' + v.portrait_img + '" width="40" height="40"></div>';
			});
			return vrStr;
		}
	}

	//入口方法调用 代码只能从这里执行
	HHIT_SHOPDETAILAPP.controller('shopDetailCtrl', ['$scope', '$http', function($scope, $http) {
		shopDetailWrap.init();
	}]);
})();