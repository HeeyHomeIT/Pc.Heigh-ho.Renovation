/*! Pc.Heigh-ho.Renovation-1.0.0.js 2017-03-22 */
define(["app"],function(a){!function(){var b={init:function(){b.initEvent()},initEvent:function(){var a=this;a.initSuceessPayEvent()},initSuceessPayEvent:function(){var a=0,b=getUrlParamHandler.getUrlParam("total"),c=getUrlParamHandler.getUrlParam("order_id"),d=getUrlParamHandler.getUrlParam("pay_step"),e=getUrlParamHandler.getUrlParam("pay_time"),f=getUrlParamHandler.getUrlParam("order_pay_step_id"),g=0;if($("#Jpay").html(b),$("#JorderId").html(c),$("#JpayStep").html(d),$("#JpayTime").html(e),6==parseInt(f)||7==parseInt(f)||8==parseInt(f)||9==parseInt(f)){switch(parseInt(f)){case 6:a=1;break;case 7:a=3;break;case 8:a=4;break;case 9:a=5}$("#Jview").attr("href","reservation.html#/materiallist?pos="+c+"&material_type="+a)}else{switch(parseInt(f)){case 2:g=18;break;case 3:g=5;break;case 4:g=9;break;case 5:g=13;break;case 10:g=17}$("#Jview").attr("href","reservation.html#/advancelist?pos="+c+"&order_step_type="+g)}}};getUrlParamHandler={getUrlParam:function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),c=window.location.hash.split("?")[1].match(b);return null!=c?decodeURI(c[2]):null}},a.successPayWrapHandler=function(){b.init()}}()});