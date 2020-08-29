$(function() {
	$(".cAdd").click(function(e) {
		$(".colorDel").hide();
		$("#newColor").toggle();
	})
	$("#newColorSub").click(function(e) {
		let id = $("#pdfirId").val();
		let color = $("#newColorIpt").val().replace(/\s+/g,"").toUpperCase();
		// console.log(color)

		let form = $("#newColor");
		let data = form.serialize();
		$.ajax({
			type: "POST",
			url: '/bsPdAjaxNewColor',
			data: data,
			success: function(results) {
				if(results.success == 1) {
					let elem = "";
					elem += '<div class="row mt-3" id="rowColor-'+color+'">'
						elem += '<div class="col-10">'
							elem += color
						elem += '</div>'
						elem += '<div class="col-2">'
							elem += '<button class="colorDel btn btn-danger" type="button" '
							elem += 'data-id='+id+' data-color='+color+' style="display:none"> -'
						elem += '</div>'
					elem += '</div>'
					$(".colorsElem").prepend(elem)
					$("#newColorIpt").val('')
					$("#newColor").hide();
				} else {
					alert(results.info);
				}
			}
		});
	})

	$(".cDel").click(function(e) {
		$("#newColor").hide();
		$(".colorDel").toggle();
	})
	$(".colorDel").click(function(e) {
		let target = $(e.target);
		let id = target.data('id');
		let color = target.data('color');
		$.ajax({
			type: "GET",
			url: '/bsPdAjaxDelColor?id='+id+'&color='+color,
			success: function(results) {
				if(results.success == 1) {
					$("#rowColor-"+color).remove();
				} else {
					alert(2)
					// alert(results.info);
				}
			}
		});
	})

	$(".sAdd").click(function(e) {
		let id = $("#pdfirId").val();

		let target = $(e.target);
		let size = target.data('size');
		$.ajax({
			type: "GET",
			url: '/bsPdAjaxNewSize?id='+id+'&size='+size,
			success: function(results) {
				if(results.success == 1) {
					let newSize = results.newSize;
					if(newSize) {
						let elem = "";
						elem += '<div class="col-2 mt-3" id="colSize-'+newSize+'">'
							elem += newSize;
						elem += '</div>'
						if(size == "l") {
							$(".sizeElem").prepend(elem)
						} else {
							$(".sizeElem").append(elem)
						}
					}
				} else {
					alert(results.info);
				}
			}
		});
	})
	$(".sDel").click(function(e) {
		let id = $("#pdfirId").val();

		let target = $(e.target);
		let size = target.data('size');
		$.ajax({
			type: "GET",
			url: '/bsPdAjaxDelSize?id='+id+'&size='+size,
			success: function(results) {
				if(results.success == 1) {
					let delSize = results.delSize;
					if(delSize) {
						$("#colSize-"+delSize).remove();
					}
				} else {
					alert(results.info);
				}
			}
		});
	})
})