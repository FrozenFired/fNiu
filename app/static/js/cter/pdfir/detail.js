$(function() {
	var totQuotFunc = function() {
		let quot = 0;
		$(".iptsty").each(function(index,elem) {
			let tquot = parseInt($(this).val());
			if(!isNaN(tquot)) {
				quot += tquot;
			}
		})
		$("#quotSapn").text(quot)
	}
	totQuotFunc();

	$(".iptsty").focus(function(e) {
		let val = $(this).val();
		if(val == 0) {
			$(this).val('')
		}
	})
	$(".iptsty").blur(function(e) {
		let val = $(this).val();
		if(!val || val.length == 0) {
			$(this).val(0)
		}
		
		totQuotFunc();
	})

	$("#cartFormSub").click(function(e) {
		let form = $("#cartForm");
		let data = form.serialize();
		$.ajax({
			type: "POST",
			url: '/bsCterUpdLogin',
			data: data,
			success: function(results) {
				if(results.success == 1) {
					location.reload();
				} else {
					alert(results.info);
				}
			}
		});
	})
})