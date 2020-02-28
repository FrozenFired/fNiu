// ordfirs = JSON.parse(JSON.stringify(order.ordfirs));
/* ======== 显示选择的产品 ======== */
let appendPdfirs = function(selPdfirs) {
	let elem = '';
	for(let i=0; i<selPdfirs.length; i++) {
		if(i == 60) break;
		let selPd = selPdfirs[i];
		elem += '<div class="row p-2 mt-2 border bg-light selPdCard" id="selPdCard-'+selPd._id+'">'
			elem += '<div class="col-4">'
				elem += '<div class="row">'
					elem += '<h4 class="col-12">'+ selPd.code+ '</h4>';
				elem += '</div>';
				elem += '<div class="row">'
					elem += '<img class="foto-showImg" src="' + selPd.photo +'" ';
					elem += 'width="100%" ';
					elem += 'style="max-width:100px;max-height:100px;"'
					elem += ' alt="'+selPd.code+'" />';
				elem += '</div>';
			elem += '</div>';

			elem += '<div class="col-8">'
				elem += '<div class="row">'
					elem += '<h5 class="col-12">'+ selPd.nome+ '</h5>';
				elem += '</div>';
				// elem += '<div class="row mt-1">'
				// 	elem += '<div class="col-6">库存: ' + selPd.stock + '</div>';
				// 	elem += '<div class="col-6 text-right">销量: ' + selPd.sales + '</div>';
				// 	// elem += '<div class="col-6 text-warning"> 原价:'+ selPd.price + ' €</div>';
				// elem += '</div>';

				elem += '<div class="row mt-2">'
					elem += '<h5 class="col-6 pt-2">价格: '
							elem += selPd.price 
					elem += ' €</h5>'
				elem += '</div>';
			elem += '</div>';

		elem += '</div>';
	}
	return elem;
}
let allPdfirsShow = function() {
	let elem = '<div class="allPdfirs_class">'
	
	elem += appendPdfirs(pdfirs)
	elem += '</div>';
	
	$(".allPdfirs_class").remove();
	$("#allPdfirs").append(elem);
}