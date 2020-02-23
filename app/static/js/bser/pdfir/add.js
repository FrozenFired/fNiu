$(function() {
	$("#crtImg").click(function(e) {
		$("#uploadPhoto").click();
	})
	$("#uploadPhoto").change(function(e) {
		var f = document.getElementById('uploadPhoto').files[0];
		var src = window.URL.createObjectURL(f);
		document.getElementById('crtImg').src = src;
		$("#crtImg").removeClass("rounded-circle")
	})

	$("#iptCode").blur(function(e) {
		let code = $("#iptCode").val().replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
		if(code.length < 2) {
			$("#optCode").text("请输入编号, 至少两个编号");
			$("#optCode").show();
		} else {
			let codeUrI = encodeURIComponent(code)
			$.ajax({
				type: 'GET',
				url: '/bsPdAjaxCode?code=' + codeUrI
			})
			.done(function(results) {
				if(results.success === 1) {
					let pdfir = results.pdfir;
					document.getElementById('crtImg').src = pdfir.photo;
					$("#bsProdNew").attr('action', '/bsPdfirUpd');
					$("#objId").val(pdfir._id)
					$("#iptNome").val(pdfir.nome)
					$("#iptMaterial").val(pdfir.material)
					$("#iptPrice").val(pdfir.price)
					$("#iptCost").val(pdfir.cost)
					$("#iptStock").val(pdfir.stock)
				} else {
					$("#optCode").hide();
				}
			})
		}
	})
	$("#iptPrice").blur(function(e) {
		let price = $(this).val();
		if(!isFloat(price)) {
			$("#optPrice").show();
		} else {
			$("#optPrice").hide();
		}
	})
	$("#iptCost").blur(function(e) {
		let cost = $(this).val();
		if(!isFloat(cost)) {
			$("#optCost").show();
		} else {
			$("#optCost").hide();
		}
	})
	$("#bsProdNew").submit(function(e) {
		let code = $("#iptCode").val().replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
		let price = $("#iptPrice").val();
		let cost = $("#cost").val();
		if(code.length < 2) {
			$("#optCode").text("请输入编号, 至少两个编号");
			$("#optCode").show();
			e.preventDefault();
		} else if(!isFloat(price)) {
			$("#optPrice").show();
			e.preventDefault();
		} else if(!isFloat(cost)) {
			$("#optCost").show();
			e.preventDefault();
		}
	})
})