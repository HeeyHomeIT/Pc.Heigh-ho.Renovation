/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-01-22 */
define(["app","base64","cookie"],function(a){!function(){var b={init:function(){b.initEvent()},initEvent:function(){var a=this;a.initNavigationSelectEvent(),a.searchBoxClickEvent(),a.myHeeyHomeEvent(),a.getUserDataEvent()},initNavigationSelectEvent:function(){var a=$("#header").parents("div"),b=a.attr("id");"index_header"!=b&&$("#"+b).find("#menuNav").remove()},searchBoxClickEvent:function(){$("#c_search_text").on({focus:function(){var a=$(this),b=a.attr("attr-placeholder");a.val()==b&&a.val(""),$(".c_searchpop").show()},blur:function(){var a=$(this),b=a.attr("attr-placeholder");""==a.val()&&a.val(b),$(".c_searchpop").hide()}})},myHeeyHomeEvent:function(){$("#c_myhh").hover(function(){$(this).children("a").addClass("item_hover_180"),$(this).children("div").css("height","112px"),$(this).addClass("open")},function(){$(this).children("a").removeClass("item_hover_180"),$(this).children("div").css("height","0px"),$(this).removeClass("open")})},getUserDataEvent:function(){var a=$.cookie("userName"),b=$.cookie("userType"),c=$("#topLogin").html(),d=$(".userinfo p").html();if(null!=a&&""!=a){if(1==$.base64.decode(b)){var e='<a class="user_information" rel="nofollow" href="center.html#/center" >'+unescape($.base64.decode(a))+'</a><span>，您好 </span><span class="exit">退出</span>',f='<a class="uinfo" href="center.html#/center"><span>'+unescape($.base64.decode(a))+"</span></a>",g='<span><a rel="nofollow" href="center.html#/center/morder">我的订单</a><a rel="nofollow" href="center.html#/center/mcollection">我的收藏</a></span><span><a rel="nofollow" href="center.html#/center/mdata">我的信息</a><a rel="nofollow" href="center.html#/center/setting">安全中心</a></span>';$("#c_news a").attr("href","center.html#/center/msgcenter")}else if(2==$.base64.decode(b)){var e='<a class="user_information" rel="nofollow" href="master.html#/master" >'+unescape($.base64.decode(a))+'</a><span>，您好 </span><span class="exit">退出</span>',f='<a class="uinfo" href="master.html#/master"><span>'+unescape($.base64.decode(a))+"</span></a>",g='<span><a rel="nofollow" href="master.html#/master/morder">我的订单</a><a rel="nofollow" href="master.html#/master/mteam">我的团队</a></span><span><a rel="nofollow" href="master.html#/master/mdata">我的信息</a><a rel="nofollow" href="master.html#/master/mwallet">我的钱包</a></span>';$("#c_news a").attr("href","master.html#/master/msginfo")}cloneHtmlHendler.loginClone(e,f,g),$(".exit").on("click",function(){cloneHtmlHendler.loginClone(c,d),$.cookie("userId",null,{expires:-1,path:"/"}),$.cookie("userName",null,{expires:-1,path:"/"}),$.cookie("userType",null,{expires:-1,path:"/"}),window.location.href="index.html"})}}};cloneHtmlHendler={loginClone:function(a,b,c){$("#topLogin").empty().append(a),$(".userinfo p").empty().append(b),$(".myinfo").html(c)}},a.headerWrapHandler=function(){b.init()}}()});