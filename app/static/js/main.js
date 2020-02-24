/* ============= 页面滚动 三级导航事件 ============= */
let p=0, t=0;
$(window).scroll(function(event){
	p=$(this).scrollTop();
	if(t<p){
		$(".scrollDownHide").hide();
		$(".scrollDownShow").show();
	} else if(t>p){
		$(".scrollDownHide").show();
		$(".scrollDownShow").hide();
	}
	setTimeout(function(){ t = p ; },0)
});
/* ============= 页面滚动 三级导航事件 ============= */



let isFloat = function(num) {
	if(num.length == 0){
		return false
	} else {			
		let nums = num.split('.')
		if(nums.length > 2){
			return false
		} else {
			let n0 = nums[0]
			if(nums.length == 1){
				if(isNaN(n0)) {
					return false
				} else {
					return true
				}
			} else {
				let n1 = nums[1]
				if(isNaN(n0)) {
					return false
				} else {
					if(n1 && isNaN(n1)) {
						return false
					} else {
						return true
					}
				}
				
			}
			
		}
	}
}

window.onload=function () {
document.addEventListener('touchstart',function (event) {
if(event.touches.length>1){
event.preventDefault();
}
});
var lastTouchEnd=0;
document.addEventListener('touchend',function (event) {
	var now=(new Date()).getTime();
	if(now-lastTouchEnd<=300){
		event.preventDefault();
	}
	lastTouchEnd=now;
},false);

document.addEventListener('gesturestart', function (event) {
	event.preventDefault();
});
}