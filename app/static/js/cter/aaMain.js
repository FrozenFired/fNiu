let headPdCode = '';

let cters = new Array();

let pdfirs = new Array();
let pdSaleAll = null;
let pdRcmds = null; // 推荐产品

// let pdSaleYear = null;
// let pdSaleQuater = null;
// let pdSaleMonth = null;
// let ordfirs = null;

let orders = new Array();
let isOrdersLoad = false;

/* ============ 加载产品 =========== */
let ajaxGetPdfirs = function() {
	$.ajax({
		type: "GET",
		url: '/ctGetPdfirs',
		success: function(results) {
			if(results.success == 1) {
				pdfirs = results.pdfirs;	// 重新加载 pdfirs 数据
				$("#loading").hide();
				$("#loaded").show();
				pdfirsShow(pdfirs);
			} else {
				alert(results.info);
			}
		}
	});
}
ajaxGetPdfirs();

// /* ============ 加载销量 =========== */
// let ajaxGetOrdfirs = function() {
// 	$.ajax({
// 		type: "GET",
// 		url: '/ctGetOrdfirs',
// 		success: function(results) {
// 			if(results.success == 1) {
// 				ordfirs = results.ordfirs;	// 重新加载 ordfirs 数据
// 				console.log(ordfirs.length)
// 				$("#loaded").addClass("text-info")
// 			} else {
// 				alert(results.info);
// 			}
// 		}
// 	});
// }
// ajaxGetOrdfirs();

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