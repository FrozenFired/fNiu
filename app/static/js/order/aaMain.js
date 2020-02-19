let Conf = JSON.parse($("#Conf").val());
let headPdCode = '';
let schCterCode = '';

let pdfirs = new Array();
let cters = new Array();

let orders = new Array();
let isOrdersLoad = false;

/* == 加载产品 == */
let ajaxGetpdfirs = function() {
	$.ajax({
		type: "GET",
		url: '/getPdfirs',
		success: function(results) {
			if(results.success == 1) {
				pdfirs = results.pdfirs;	// 重新加载 pdfirs 数据
			} else {
				alert(results.info);
			}
		}
	});
}
ajaxGetpdfirs();

/* ===== 从后台获取客户列表 ===== */
let ajaxGetCters = function() {
	$.ajax({
		type: "GET",
		url: '/getCters',
		success: function(results) {
			if(results.success == 1) {
				cters = results.cters;	// 获取 cters 数据
				// bsCtersPage();			// 界面显示 cters
			} else {
				alert(results.info);
			}
		}
	});
}
ajaxGetCters();

/* ======== 从产品列表中找出 产品目标 ======== */
let getPdfirFromPdfirs = function(pdfirId) {
	let selPdfir = null;
	for (let i=0; i<pdfirs.length; i++) {
		if(pdfirs[i]._id == pdfirId) {
			selPdfir = pdfirs[i];
			break;
		}
	}
	return selPdfir;
}

/* ======== 从客户列表中找出 客户目标 ======== */
let getCterFromCters = function(cterId) {
	let selCter = null;
	for (let i = 0; i < cters.length; i++) {
		if(cters[i]._id == cterId) {
			selCter = cters[i];
			break;
		}
	}
	return selCter;
}


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