var resObj = {};
var roomPlanObj = {};
var COUNTURL = 'http://hyu2387760001.my3w.com/costcalculator/count'; // 成本计算器接口

var heeyhomeCal = {
	init: function() {
		var self = this;
        self.areaInputChangeEvent();
        self.sumbitCalEvent();
    },
    /**
     * 请输入您的户型面积input事件
     */
    areaInputChangeEvent:function() {
    	var self = this;
    	$(".c_area").on({
    		"focus":function() {
    			var _this = $(this);
    			var _placeholder = _this.attr("attr-placeholder");
    			if(_this.val() == _placeholder) {
        			_this.val("");
        		}
    			$(".areadiv").children("label").removeClass("whether").parent(".areadiv").removeClass("itemClickError");
    		},
    		"blur":function() {
    			var _this = $(this);
    			var _placeholder = _this.attr("attr-placeholder");
    			var msgText; // 提示文本信息
    			if(_this.val() == '') {
        			_this.val(_placeholder);
        		}
    			msgText = self.errorMsgEvent(_this.val());
    			if(msgText != "true") {
    				// 显示错误信息
    				$(".areadiv").children("label").text(msgText).addClass("whether").parent(".areadiv").addClass("itemClickError");
    				// 设置状态
    				self.flowStatusEvent($(".cal1").data("type"),0);
    			}else {
    				// 设置状态
    				self.flowStatusEvent($(".cal1").data("type"),1);
    				// 数据正确，几室几厅几卫div置为亮
    				self.styleAddOrRemoveEvent($(".housediv"),1);
					// 移除绑定事件click
					$(".housediv div").off("click");
					// 移除 delegate绑定
					$(".housediv ul").off();
					// 户型选择事件
					self.houseSelectEvent();
    			}
    		}
    	});
    },
    /**
     * 户型选择
     */
    houseSelectEvent: function() {
    	var self = this;
    	var roomNumber; // 房间数
    	var titleStr; // 房间安排DIV标题
    	var num; // 数量
    	$(".housediv div").on("click",function(e) {
    		e.stopPropagation();
    		// 户型选择的选择框旁边小三角切换、选择文本显示和隐藏
    		self.triangleArrowChangeEvent($(this),0);
    	});
    	// 为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数
    	$(".housediv ul").delegate("li","click",function(){
    		num = $(this).text();
    		$(this).parent().prev().text(num);
    		// 如果当前选择的是房间
    		if($(this).parent().parent().hasClass("room")){
    			// 得到房间安排div标题文本显示到页面
				titleStr = self.changeTitleEvent(parseInt(num));
				$(".cal2 p").addClass("col_eec988").html(titleStr);
				// 初始化下拉列表框事件
				self.comboboxInitEvent($(".roomsdiv div"),$(".roomsdiv ul"),$(".s4,.s5"));
				// 如果只有一间卧室那就是主卧
				if(parseInt(num) == 1) {
					// 如果只有一间卧室，那么次卧、儿童房、父母房、衣帽间、书房置灰 并且不能选择点击
					self.styleAddOrRemoveEvent($(".roomsdiv"),0);
					// 设置状态
    				self.flowStatusEvent($(".cal2").data("type"),1);
					// 移除绑定事件click
					$(".roomsdiv div").off("click");
					// 移除绑定事件delegate
					$(".roomsdiv ul").off();
					$(".mainarea_list li a").off("click");
					// 主要位置的选择模块点亮
					self.styleAddOrRemoveEvent($(".cal3"),2);
					// 设置状态
    				self.flowStatusEvent($(".cal3").data("type"),1);
					self.roommainlyEvent();
				}else {
					// 次卧、儿童房、父母房、衣帽间、书房置亮并且可以点击
					self.styleAddOrRemoveEvent($(".roomsdiv"),1);

					// 设置状态
    				self.flowStatusEvent($(".cal2").data("type"),0);
    				self.flowStatusEvent($(".cal3").data("type"),0);
					// 移除绑定事件click
					$(".roomsdiv div").off("click");
					// 移除绑定事件delegate
					$(".roomsdiv ul").off();
					// 房间安排计划事件
					self.roomPlanEvent(parseInt(num)-1);
				}
    		}
    	});
    	// 关闭下拉框和三角形置为初始状态事件
    	self.closeDropBoxEvent($(".housediv div"),$(".housediv ul"),0);
    },
    /**
     * 房间安排计划事件
     * @param {Object} roomNumber 房间数
     */
    roomPlanEvent: function(roomNumber) {
    	var self = this;
    	var flag = false;
    	// 为房间安排模块添加下拉列表框
    	self.appendLiStrEvent($(".roomsdiv div"),$(".roomsdiv ul"),roomNumber);
    	$(".roomsdiv div").on("click",function(e) {
    		e.stopPropagation();
    		self.styleAddOrRemoveEvent($(".cal3"),2);
    		// 户型选择的选择框旁边小三角切换、选择文本显示和隐藏
    		self.triangleArrowChangeEvent($(this),0);
    		// 衣帽间和书房选择 0:没有选择(默认为0) 1：代表选择
			if($(this).hasClass("s4") || $(this).hasClass("s5")) {
				if($(this).hasClass("clickselect")){
					$(this).removeClass("clickselect");
					$(this).attr("data-select",0);
				}else{
					$(this).addClass("clickselect");
					$(this).attr("data-select",1);
				}
				flag = true;
				$(".roomsdiv").children("label").removeClass("whether");
				self.roomsPlanStatusEvent($(this).data("name"),$(this).attr("id"),parseInt($(this).attr("data-select")),$(this).data("info"));
			}
			$(".roomsdiv").children("label").removeClass("whether");
			self.roomOperationEvent(flag,roomNumber,$(this));
			flag = false;
    	});
    	// 为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数
    	$(".roomsdiv ul").delegate("li","click",function(){
    		flag = true;
    		// 得到当前点击的数量
    		num = $(this).text();
    		// 页面呈现选中的数量
    		$(this).parent().siblings().find("em").text(num);
    		// 把当前的点击的房间名字和房间数量放入全局对象中(先放入选中的LI的值，[不放data-select的值是因为为了还原])
    		self.roomsPlanStatusEvent($(this).parent().parent().data("name"),$(this).parent().parent().attr("id"),parseInt(num),$(this).parent().parent().data("info"));
    	});
    	// 关闭下拉框和三角形置为初始状态事件
    	self.closeDropBoxEvent($(".roomsdiv div"),$(".roomsdiv ul"),0);
    },
    /**
     * 房间操作
     * @param {Object} flag 标志位 ：false表示不能判断 true表示可以判断
     * @param {Object} roomNumber 只能安排的房间数
     * @param {Object} element 当前元素
     */
    roomOperationEvent:function(flag,roomNumber,element){
    	var self = this;
    	var sum = 0;
    	if(flag){
			// 循环全局对象求合
    		$.each(roomPlanObj, function(i,v) {
    			sum += parseInt(roomPlanObj[i].count);
    		});
    		if(sum == roomNumber){
    			$(".roomsdiv div").addClass("okhover");
    			$(".roomsdiv").removeClass("col_eec988").children("div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ");
    			$.each(roomPlanObj, function(i,v) {
    				if(roomPlanObj[i].count != 0){
    					$('#'+roomPlanObj[i].roomId).addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
    				}
	    		});
	    		if(element.hasClass("s4")||element.hasClass("s5")){

	    		}else {
	    			// 把它插入到data-select中
	    			element.attr("data-select",parseInt(element.find("em").text()));
	    		}
    		}else if(sum < roomNumber){
    			$(".roomsdiv div").removeClass("okhover");
    			// 如果sum小于roomNumber，选择框全亮
    			if(sum < roomNumber){
    				$(".roomsdiv").addClass("col_eec988").children("div").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ");
    			}
    			if(element.hasClass("s4")||element.hasClass("s5")){
//	    			element.attr("data-select",parseInt(element.find("em").text()));	
	    		}else{
	    			// 把它插入到data-select中
	    			element.attr("data-select",parseInt(element.find("em").text()));
	    		}
    		}else if(sum > roomNumber){
    			// 显示错误信息
				$(".roomsdiv").children("label").text("最多只能安排"+roomNumber+"个房间").addClass("whether");
				// 添加hover样式
				$(".roomsdiv div").addClass("okhover");
    			if(element.hasClass("s4")||element.hasClass("s5")){
    				if(element.hasClass("clickselect")){
						element.removeClass("clickselect");
						element.attr("data-select",0);
					}
    			}else {
    				// 还原选中的数字 从data-select中得到
    				element.find("em").text(parseInt(element.attr("data-select")));
    			}
    			$.each(roomPlanObj, function(i,v) {
    				if(roomPlanObj[i].roomId == element.attr("id")){
    					roomPlanObj[i].count = parseInt(element.attr("data-select"));
    				}
	    		});
    		}
			self.contentStrEvent(roomPlanObj);

    	}
    },
    /**
     * 错误文本
     *
	 * @param {Object} val 户型面积
	 * @return message 错误信息
     */
	errorMsgEvent:function(val) {
		var NUM_70 = 70, NUM_160 = 160;
		var message = "";

		if (val < NUM_70 || val > NUM_160) {
            message = "小于70㎡或大于160㎡请咨询客服";
        }else {
        	message = "true";
        }

		return message;
	},
	/**
	 * 为相关的元素添加或删除样式
	 *
	 * @param {Object} element 需要添加样式的元素
	 * @param {Object} type 0:删除 1：添加
	 */
	styleAddOrRemoveEvent:function(element,type) {
		var _element = element;
		var _type = type;
		if(_type == 1){
			// 添加颜色
			_element.addClass("col_eec988").children("div").addClass("col_eec988").addClass("border_eec988").addClass("after_eec988 ").css("cursor","pointer");
		}else if(_type == 0) {
			// 删除颜色
			_element.removeClass("col_eec988").children("div").removeClass("col_eec988").removeClass("border_eec988").removeClass("after_eec988 ").css("cursor","not-allowed");
		}else if(_type == 2 || _type == 3 || _type == 6){
			_element.addClass("col_eec988").find("dl").addClass("col_eec988").addClass("after_eec988 ");
			_element.find("em").addClass("clickit");
			if(_type == 2){
				$(".mainarea_list").css("cursor","pointer");
			}else if(_type == 3){
				$(".otherroom_list").css("cursor","pointer");
			}else if(_type == 6){
				$(".other_list").css("cursor","pointer");
			}

		}else if(_type == 4 || _type == 5 || _type == 7){
			_element.removeClass("col_eec988").find("dl").removeClass("col_eec988").removeClass("after_eec988 ");
			_element.find("em").removeClass("clickit");
			if(_type == 4){
				$(".mainarea_list").css("cursor","not-allowed");
			}else if(_type == 5){
				$(".otherroom_list").css("cursor","not-allowed");
			}else if(_type == 7){
				$(".other_list").css("cursor","not-allowed");
			}
		}

	},
	/**
	 * 根据不同的房间数改变安排房间DIV的标题
	 * @param {Object} num 房间数
	 * @return _titleText 标题文本
	 */
	changeTitleEvent:function(num) {
		var _titleText;
    	switch (num) {
            case 1:
                _titleText = "您只有一间主卧&nbsp&nbsp请继续往下填写";
                break;
            case 2:
                _titleText = "除了主卧以外其余一间房间怎么安排";
                break;
            case 3:
                _titleText = "除了主卧以外其余两间房间怎么安排";
                break;
            case 4:
                _titleText = "除了主卧以外其余三间房间怎么安排";
                break;
        }
    	return _titleText;
	},
	/**
	 * 三角型箭头的改变、选择文本显示和隐藏
	 * @param {Object} element 当前元素
	 * @param {Object} sign 标志
	 */
	triangleArrowChangeEvent: function(element,sign) {
		// 户型选择的选择框旁边小三角切换
		var _element = element;
		if(_element.hasClass("item_hover_180")){
			_element.removeClass("item_hover_180");
		}else{
			_element.addClass("item_hover_180")
		}
		if(sign == 0){
			// 选择文本显示和隐藏
			_element.find("ul").slideToggle('300');
			_element.siblings().removeClass("item_hover_180").find("ul").slideUp('300');
		}else if(sign == 1){
			//选择文本显示和隐藏
			_element.parent().parent().children("div").toggle();
			_element.parent().parent().siblings().find("dl").removeClass("item_hover_180");
			_element.parent().parent().siblings().find("div.filter_nav").hide()
		}

	},
	/**
	 * 流程状态
	 * @param {Object} typeName 当前元素的data-type
	 * @param {Object} status 状态 0  不正常，1 正常
	 */
	flowStatusEvent: function(typeName,status) {
		var _typeName = typeName;
		var _status = status;
		resObj[_typeName] = {
			status: _status
		}
	},
	/**
	 * 房间安排状态
	 * @param {Object} roomName 房间名字
	 * @param {Object} roomId 房间的id名
	 * @param {Object} count 房间数量
	 * @param {Object} info 内容
	 */
	roomsPlanStatusEvent: function(roomName,roomId,count,info) {
		var _roomName = roomName;
		var _roomId = roomId;
		var _count = count;
		var _info = info;
		roomPlanObj[_roomName] = {
			roomId : _roomId,
			count : _count,
			info : _info
		}
	},
	/**
	 * 关闭下拉框和三角形置为初始状态
	 * @param {Object} squareElement 三角形元素
	 * @param {Object} listElement 下拉框元素
	 * @param {Object} flag 标志位
	 */
	closeDropBoxEvent: function(squareElement,listElement,flag) {
		var _squareElement = squareElement;
		var _listElement = listElement;
		$(document).on("click",function(){
    		if(_squareElement.hasClass("item_hover_180")){
    			_squareElement.removeClass("item_hover_180");
    		}
    		if(flag == 0){
    			_listElement.slideUp('300');
    		}else if(flag == 1){
    			_listElement.hide();
    		}
    	});
	},
	/**
	 * 添加下拉列表框
	 * @param {Object} divElement 当前元素div
	 * @param {Object} ulElement 当前元素ul
	 * @param {Object} count 房间个数
	 */
	appendLiStrEvent: function(divElement,ulElement,count) {
		var liStr="";
		ulElement.removeClass("clearli");
		// 清空li列表
		divElement.find("li").remove();
		for(var i = 0 ;i <= count ;i++){
    		liStr += "<li>"+i+"</li>"
    	}
		// 追加li列表
		divElement.find("ul").append(liStr);
	},
	/**
	 * 初始化下拉列表框
	 * @param {Object} divElement 当前元素div
	 * @param {Object} ulElement 当前元素ul
	 * @param {Object} el $(".s4,.s5")
	 */
	comboboxInitEvent: function(divElement,ulElement,el) {
		var self = this;
		// 清空卧室选择模块下拉列表
		ulElement.slideUp('300');
		ulElement.addClass("clearli").find("li").remove();
		// 还原下拉箭头
		if(divElement.hasClass("item_hover_180")||divElement.hasClass("clickselect")){
			divElement.removeClass("item_hover_180");
		}
		// 次卧、儿童房、父母房置为0间
    	divElement.find("em").text(0);
    	// 清除选中衣帽间和选中书房并置为0
    	el.removeClass("clickselect");
		divElement.attr("data-select",0);
		$.each(roomPlanObj, function(i,v) {
			$(".mainarea_list li.room"+roomPlanObj[i].info.ln).remove();
		});
		self.styleAddOrRemoveEvent($(".cal3"),4);
		self.styleAddOrRemoveEvent($(".cal4"),5);
		self.styleAddOrRemoveEvent($(".cal5"),7);
		$(".roomsdiv").children("label").removeClass("whether").text("");
		$(".mainarea_list li a").off("click");
		$(".otherroom_list li a").off("click");
		$(".other_list li a").off("click");
		// 还原下拉箭头
		$(".mainarea_list li a").find("dl").removeClass("item_hover_180");
		$(".otherroom_list li a").find("dl").removeClass("item_hover_180");
		$(".other_list li a").find("dl").removeClass("item_hover_180");
		$(".other_list li a").removeClass("clickselect")
		$(".mainarea_list li").find("div.filter_nav").hide();
		$(".otherroom_list li").find("div.filter_nav").hide();
		$(".other_list li").find("div.filter_nav").hide();
		$(".cal6 input").removeClass("col_eec988").removeClass("border_eec988").css("cursor","not-allowed");
		$(".roomsdiv div").removeClass("okhover");
		// 全局变量清空
		roomPlanObj = {};
	},
	/**
	 * 内容文本
	 * @param {Object} obj roomPlanObj
	 */
	contentStrEvent: function(obj) {
		var self = this;
		var strLi;
		$.each(obj, function(i,v) {
			$(".mainarea_list li.room"+obj[i].info.ln).remove();
			if(obj[i].count != 0){
				strLi = '<li class="room'+obj[i].info.ln+'">'
					+ '		<a class="item'+obj[i].info.ln+'"> '
					+ '			<em></em> '
					+ '			<dl class="item_hover_0 col_eec988 after_eec988">'+obj[i].info.cname+'</dl> '
					+ '		</a> '
					+ '		<div class="filter_nav '+obj[i].info.cstyle+' display"> '
					+ '			<i class="sprite"></i> '
					+ '			<div class="filter_mod"> '
					+ '				<div class="filter_item"> '
					+ '					<label class="item_title" data-name="ground" >地面处理方式：</label> '
					+ '					<div class="item_mod"> '
					+ '						<a class="cit" rel="nofollow" data-val="smdb" >实木地板</a> '
					+ '						<a rel="nofollow" data-val="qhfhdb" >强化复合地板</a> '
					+ '						<a rel="nofollow" data-val="cz" >铺设瓷砖</a> '
					+ '					</div> '
					+ '				</div> ';
				if(i == "ymj" || i == "cw" || i == "etf" || i == "fmf"){
					strLi += '		<div class="filter_item"> '
						+ '				<label class="item_title" data-name="wardrobe" >衣柜制作方式：</label> '
						+ '				<div class="item_mod"> '
						+ '					<a class="cit" rel="nofollow" data-val="true" >木工制作衣柜</a> '
						+ '					<a rel="nofollow" data-val="false" >自行购买衣柜</a> '
						+ '				</div> '
						+ '			</div> ';
				}
				strLi += '			<div class="filter_item"> '
					+ '					<label class="item_title" data-name="ceiling" >木工制作吊顶：</label> '
					+ '					<div class="item_mod"> '
					+ '						<a class="cit" rel="nofollow" data-val="true" >需要</a> '
					+ '						<a rel="nofollow" data-val="false" >不需要</a> '
					+ '					</div>	'
					+ '				</div> '
					+ '				<div class="filter_item"> '
					+ '					<label class="item_title" data-name="wallpaper" >墙面铺贴墙纸：</label> '
					+ '					<div class="item_mod"> '
					+ '						<a class="cit" rel="nofollow" data-val="true" >需要</a> '
					+ '						<a rel="nofollow" data-val="false" >不需要</a> '
					+ '					</div>	'
					+ '				</div> '
					+ '				<div class="filter_item"> '
					+ '					<label class="item_title" data-name="window" >有无飘窗结构：</label> '
					+ '					<div class="item_mod"> '
					+ '						<a class="cit" rel="nofollow" data-val="true" >有飘窗</a> '
					+ '						<a rel="nofollow" data-val="false" >没有飘窗</a> '
					+ '					</div>	'
					+ '				</div> ';
				if(i == "sf" || i == "etf"){
					strLi += '		<div class="filter_item"> '
						+ '				<label class="item_title" data-name="tatami" >榻榻米的制作：</label> '
						+ '				<div class="item_mod"> '
						+ '					<a class="cit" rel="nofollow" data-val="true" >木工制作榻榻米</a> '
						+ '					<a rel="nofollow" data-val="false" >自行购买榻榻米</a> '
						+ '				</div> '
						+ '			</div> ';
				}
				if(i == "sf"){
					strLi += '		<div class="filter_item"> '
						+ '				<label class="item_title" data-name="bookcase" >书桌书柜选择：</label> '
						+ '				<div class="item_mod"> '
						+ '					<a class="cit" rel="nofollow" data-val="true" >木工制作简易书桌书柜</a> '
						+ '					<a rel="nofollow" data-val="false" >购买成品书桌书柜</a> '
						+ '				</div> '
						+ '			</div> ';
				}
				if(i == "etf"){
					strLi += '		<div class="filter_item"> '
						+ '				<label class="item_title" data-name="desk" >书桌书架选择：</label> '
						+ '				<div class="item_mod"> '
						+ '					<a class="cit" rel="nofollow" data-val="true" >木工制作简易书桌书架</a> '
						+ '					<a rel="nofollow" data-val="false" >购买成品书桌书架</a> '
						+ '				</div> '
						+ '			</div> ';
				}
				strLi += '		</div> '
					+ '		</div> '
					+ '	</li> ';
				$(".mainarea_list").append(strLi);
			}
		});
		$(".mainarea_list li a").off("click");
		self.roommainlyEvent();
	},
	/**
	 * 主要的位置选择
	 */
	roommainlyEvent:function() {
		var self = this;
		$(".mainarea_list li a").on("click",function(e){
			e.stopPropagation();
			// 户型选择的选择框旁边小三角切换、选择文本显示和隐藏
    		self.triangleArrowChangeEvent($(this).find("dl"),1);
    		// 次要位置模块点亮
			self.styleAddOrRemoveEvent($(".cal4"),3);
			$(".otherroom_list li a").off("click")
			self.otherSelectEvent();
		});
       	self.roomConfigureSelectEvent();
       	// 关闭下拉框和三角形置为初始状态事件
    	self.closeDropBoxEvent($(".mainarea_list li a dl"),$(".mainarea_list li>div"),1);
	},
	/**
	 * 客餐厅、阳台、厨房选择配置
	 */
	otherSelectEvent: function(){
		var self = this;
		$(".otherroom_list li a").on("click",function(e){
    		e.stopPropagation();
    		// 户型选择的选择框旁边小三角切换、选择文本显示和隐藏
    		self.triangleArrowChangeEvent($(this).find("dl"),1);

    		self.styleAddOrRemoveEvent($(".cal5"),6);
    		$(".other_list li a").off("click");
    		self.houseCharacteristicEvent();
    	});
    	self.roomConfigureSelectEvent();
    	// 关闭下拉框和三角形置为初始状态事件
    	self.closeDropBoxEvent($(".otherroom_list li a dl"),$(".otherroom_list li>div"),1);
	},
	/**
	 * 房屋特性
	 */
	houseCharacteristicEvent: function(){
		var self = this;
		$(".other_list li a").on("click",function(e){
    		e.stopPropagation();
    		// 户型选择的选择框旁边小三角切换、选择文本显示和隐藏
    		self.triangleArrowChangeEvent($(this).find("dl"),1);
    		if($(this).hasClass("otherclick")){
    			if($(this).hasClass("clickselect")){
    				$(this).removeClass("clickselect");
    				$(this).attr("data-select","true");
    			}else{
    				$(this).addClass("clickselect");
    				$(this).attr("data-select","false");
    			}
    		}
    		self.styleAddOrRemoveEvent($(".cal5"),6);
    		$(".cal6 input").addClass("col_eec988").addClass("border_eec988").css("cursor","pointer");
    	});

    	self.roomConfigureSelectEvent();
    	// 关闭下拉框和三角形置为初始状态事件
    	self.closeDropBoxEvent($(".other_list li a dl"),$(".other_list li>div"),1);
	},
	/**
	 * 房间的相关配置选择
	 */
	roomConfigureSelectEvent:function(){
		$(".filter_item a").on("click",function(){
			$(this).addClass("cit").siblings().removeClass("cit");
    	});

    	$(".filter_nav i").on("click", function() {
            $(this).parents(".filter_nav").hide();
            var _em = $(this).parents(".filter_nav").siblings().find("dl");
            if(_em.hasClass("item_hover_180")){
            	_em.removeClass("item_hover_180");
            }
       	});
	},
	/**
	 * 提交计算结果
	 */
	sumbitCalEvent:function(){
		var self = this;
		$(document).on("click",".nowcal",function(){
			if($(this).hasClass("border_eec988")&&$(this).hasClass("col_eec988")){
				var calObj = {};
				var room_distribution = {};
				var floorObj = {};
				calObj.city = $("#Jcity").text() +'市'; // 城市
				calObj.area = $("#c_area").val(); // 面积
				calObj.room_num = $(".room span").text(); // 房间数
				calObj.parlor_num = $(".parlor span").text(); // 客厅数
				calObj.bathroom_num = $(".bathroom span").text(); // 卫生间数
				calObj.balcony_num = $(".balcony span").text(); // 阳台数
				room_distribution["master"] = 1; //次卧数量
				room_distribution["second"] = $("#s1").data("select"); //次卧数量
				room_distribution["child"] = $("#s2").data("select"); //儿童房数量
				room_distribution["parent"] = $("#s3").data("select"); //父母房数量
				room_distribution["cloakroom"] = $("#s4").data("select"); //衣帽间数量
				room_distribution["study"] = $("#s5").data("select"); //书房数量
				calObj.room_distribution = room_distribution;
				calObj.master_distribution = self.initGetCalDataEvent($(".room0 .filter_item")); // 主卧参数
				if($("#s1").data("select") !=0){
					calObj.second_distribution = self.initGetCalDataEvent($(".room1 .filter_item")); // 次卧参数
				}
				if($("#s2").data("select") !=0){
					calObj.child_distribution = self.initGetCalDataEvent($(".room2 .filter_item")); // 儿童房参数
				}
				if($("#s3").data("select") !=0){
					calObj.parent_distribution = self.initGetCalDataEvent($(".room3 .filter_item")); // 父母房参数
				}
				if($("#s4").data("select") !=0){
					calObj.cloakroom_distribution = self.initGetCalDataEvent($(".room4 .filter_item")); // 衣帽间参数
				}
				if($("#s5").data("select") !=0){
					calObj.study_distribution = self.initGetCalDataEvent($(".room5 .filter_item")); // 书房参数
				}
				calObj.parlor_distribution = self.initGetCalDataEvent($(".otherroom0 .filter_item")); // 客餐厅参数
				calObj.balcony_distribution = self.initGetCalDataEvent($(".otherroom1 .filter_item")); // 阳台参数
				calObj.kitchen_distribution = self.initGetCalDataEvent($(".otherroom2 .filter_item")); // 厨房参数
				floorObj = self.initGetCalDataEvent($(".other0 .filter_item")); // 厨房参数
				// 判断是否选择了有电梯
				if(floorObj.isElevator == 0){ // 如果有电梯，那么直接赋值0给后台
					calObj.floor = floorObj.isElevator; // 楼层数参数
				}else if(floorObj.isElevator == -1){ // 如果无电梯
					calObj.floor = floorObj.floor; // 楼层数参数
				}
				calObj.wall = $("#other1").attr("data-select"); // 墙体改造
				calObj.ground_sank = $("#other2").attr("data-select"); // 卫生间地面下沉
				$.ajax({
					url: COUNTURL,
					type: "GET",
					async: true,
					dataType: 'jsonp',
					data: {
						calculator_json: JSON.stringify(calObj)
					},
					beforeSend:function(){
						$("#loading").removeClass("display");
					},
					success: function(data) {
						if(data.code == 000){
							var costObj = {};
							costObj.gzrg = data.data.gzrg; // 工长人工费用
							costObj.sdrg = data.data.sdrg; // 水电人工费用
							costObj.wgrg = data.data.wgrg; // 瓦工人工费用
	                        costObj.mgrg = data.data.mgrg; // 木工人工费用
	                       	costObj.yqgrg = data.data.yqgrg; // 油漆工人工费用
	                        costObj.zgrg = data.data.zgrg; // 杂工人工费用
	                        costObj.rgzj = data.data.rgzj; // 人工总价费用
	                      	costObj.zdsdcl = data.data.zdsdcl; // 中端水电材料费用
	                      	costObj.gdsdcl = data.data.gdsdcl; // 高端水电材料费用
	                        costObj.wgfc = data.data.wgfc; // 瓦工辅材费用
	                        costObj.mgfc = data.data.mgfc; // 木工辅材费用
	                        costObj.yqcl = data.data.yqcl; // 油漆材料费用
	                        costObj.czdd = data.data.czdd; // 瓷砖低端费用
	                        costObj.czgd = data.data.czgd; // 瓷砖高端费用
	                        costObj.bc = data.data.bc; // 板材费用
	                        costObj.dls = data.data.dls; // 大理石费用
	                        costObj.db = data.data.db; // 地板费用
	                        costObj.mm = data.data.mm; // 木门费用
	                        costObj.cfym = data.data.cfym; // 厨房移门费用
	                       	costObj.lyfym = data.data.lyfym; // 淋浴移门费用
	                       	costObj.ygym = data.data.ygym; // 衣柜移门费用
	                       	costObj.jcdd = data.data.jcdd; // 集成吊顶费用
	                      	costObj.cgsys = data.data.cgsys; // 橱柜石英石费用
	                      	costObj.zxzj = data.data.zxzj; // 装修总价
	                        sessionStorage.payJson = JSON.stringify(costObj);
	                        var url = "calresult.html#/calresult";
							window.location.href = url + "?cs="+calObj.city+"&mj="+calObj.area+"&fj="+calObj.room_num+"&kt="+calObj.parlor_num+"&wsj="+calObj.bathroom_num+"&yt="+calObj.balcony_num;
						}else if(data.code == 200){
							layer.alert(data.msg);
						}
						
                        
					},complete:function(){
						$("#loading").addClass("display");
					},error: function(data) {}
				});
			}
		});
	},
	initGetCalDataEvent:function(element){
		var dataObj = {};
		$.each(element, function(i,elem) {
			dataObj[$(elem).find("label").data("name")] = $(elem).find("div.item_mod a.cit").data("val");
		});
		return dataObj;
	}
}

$(function() {
	var HHIT_CENTERAPP = angular.module('heeyhomeApp');
	HHIT_CENTERAPP.controller('calCtrl', ['$scope', '$http', function($scope, $http) {
		heeyhomeCal.init()
	}]);

})