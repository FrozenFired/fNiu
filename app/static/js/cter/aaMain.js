let headPdCode = '';

let pdfirs = new Array();
let cters = new Array();

let orders = new Array();
let isOrdersLoad = false;

/* == 加载产品 == */
let ajaxGetpdfirs = function() {
	$.ajax({
		type: "GET",
		url: '/ctGetPdfirs',
		success: function(results) {
			if(results.success == 1) {
				pdfirs = results.pdfirs;	// 重新加载 pdfirs 数据
				$("#loading").hide();
				$("#loaded").show();
				allPdfirsShow();
			} else {
				alert(results.info);
			}
		}
	});
}
ajaxGetpdfirs();

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