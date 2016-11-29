define(['app','jquery'],function(app){
	app.directive('myHeader',function(){
		return{
			templateUrl:"view/common/_header.html"
		};
	});
	app.directive('myFliter',function(){
		return{
			templateUrl:"view/common/_fliter.html"
		};
	});
	app.directive('myForeshop',function(){
		return{
			templateUrl:"view/v_foreman_shop/foreman_shop.html"
		};
	});
	app.directive('myPagenumber',function(){
		return{
			templateUrl:"view/common/_pagenumber.html"
		};
	});
	app.directive('myFooter',function(){
		return{
			templateUrl:"view/common/_footer.html"
		};
	});
	require(['js/j_foreshop/foreshop','js/j_common/fliter'],function(){});
	//require(['js/j_common/fliter'],function(){});
});