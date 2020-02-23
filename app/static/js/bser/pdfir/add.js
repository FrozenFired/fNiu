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

			document.getElementById('crtImg').src = "/imgs/createPicture.jpg";
			$("#crtImg").addClass("rounded-circle")
			$("#bsProdNew").attr('action', '/bsPdfirNew');
			$("#objId").val('')
			$("#iptNome").val('')
			$("#iptMaterial").val('')
			$("#iptPrice").val('')
			$("#iptCost").val(0)
			$("#iptStock").show();
			$("#iptStockPlus").val(0);
			$("#iptStockPlus").hide();
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
					$("#crtImg").removeClass("rounded-circle")
					$("#bsProdNew").attr('action', '/bsPdfirUpd');
					$("#objId").val(pdfir._id)
					$("#iptNome").val(pdfir.nome)
					$("#iptMaterial").val(pdfir.material)
					$("#iptPrice").val(pdfir.price)
					$("#iptCost").val(pdfir.cost)
					$("#iptStock").hide();
					$("#iptStockPlus").show();
				} else {
					document.getElementById('crtImg').src = "/imgs/createPicture.jpg";
					$("#crtImg").addClass("rounded-circle")
					$("#bsProdNew").attr('action', '/bsPdfirNew');
					$("#objId").val('')
					$("#iptNome").val('')
					$("#iptMaterial").val('')
					$("#iptPrice").val('')
					$("#iptCost").val(0)
					$("#iptStock").show();
					$("#iptStockPlus").val(0);
					$("#iptStockPlus").hide();

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