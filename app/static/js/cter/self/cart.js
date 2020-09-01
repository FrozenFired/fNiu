$(function() {
	$(".quotIpt").blur(function(e) {
		let quot = parseInt($(this).val())
		let target = $(e.target);
		let id = target.data('id')
		let color = target.data('color')
		let size = target.data('size')
		console.log(color)
	})
})