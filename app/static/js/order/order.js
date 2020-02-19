$( function() {
	/* ======== 在 订单列表页面 点击订单 进入订单页面 ======== */
	$("#bsOrders_page").on('click', '.bsOrders_orderCard', function(e) {
		let orderId = $(this).attr('id').split('-')[1];
		let order = getOrderFromOrders(orderId);
		bsOrderShow(order)
	})


	/* =============== 在订单详情页中点击显示操作 按钮 =========== */
	$("#bsOrder_page").on('click', '.bsOrder_optionShow', function(e) {
		$(".bsOrder_optionShow").hide();
		$(".bsOrder_optionHide").show();
		
		$(".bsOrder_optionPage").show();
	})
	/* =============== 在订单详情页中点击隐藏操作 按钮 =========== */
	$("#bsOrder_page").on('click', '.bsOrder_optionHide', function(e) {
		$(".bsOrder_optionHide").hide();
		$(".bsOrder_optionShow").show();
		
		$(".bsOrder_optionPage").hide();
	})



	/* ======== 在 订单详情页面 点击删除按钮 删除订单 ======== */
	$("#bsOrder_page").on('click', '.bsOrder_delBtn', function(e) {
		let target = $(e.target);
		let orderId = target.data('id');
		$.ajax({
			type: "GET",
			url: '/orderDelSts?orderId='+orderId,
			success: function(results) {
				if(results.success == 1) {
					ajaxGetOrders();
					bsOrdersShow(orders)
				} else {
					alert(results.info);
				}
			}
		});
	})


	/* ======== 在 订单详情页面 点击复制按钮 复制订单 ======== */
	$("#bsOrder_page").on('click', '.bsOrder_copyOrder', function(e) {
		let target = $(e.target);
		let orderId = target.data('id');
		let order = getOrderFromOrders(orderId);

		ordfirs = JSON.parse(JSON.stringify(order.ordfirs));
		
		$(".page").hide();
		$("#orderAddPage").show();
		$("#headUserInfo").hide();
		$("#headPdFilter").show();
		$("#headPdCode").focus();

		$(".orderTop").removeClass('bg-success');
		$("#orderHome-topBtn").addClass("bg-success");

		if(order.cter){
			decideCter(order.cter._id, order.cter.nome)
		} else {
			decideCter('', '散客');
		}
		ordfirsShow();
	})
	
	/* ======== 在 订单详情页面 点击更新按钮 更新订单 ======== */
	$("#bsOrder_page").on('click', '.bsOrder_upOrder', function(e) {
		let target = $(e.target);
		let orderId = target.data('id');
		let order = getOrderFromOrders(orderId);

		ordfirs = JSON.parse(JSON.stringify(order.ordfirs));

		$(".page").hide();
		$("#orderAddPage").show();
		$("#headUserInfo").hide();
		$("#headPdFilter").show();
		$("#headPdCode").focus();
		
		$(".orderTop").removeClass('bg-success');
		$("#orderHome-topBtn").addClass("bg-success");

		if(order.cter){
			decideCter(order.cter._id, order.cter.nome)
		} else {
			decideCter('', '散客');
		}
		$("#form_orderId").val(order._id)
		ordfirsShow();
	})

	$("#bsOrder_page").on('click', '.printTicket', function(e) {
		let target = $(e.target);
		let orderId = target.data('id');
		$.ajax({
			type: 'GET',
			url: '/bsOrderTicketing?orderId=' + orderId + '&newTicket=1'
		})
		.done(function(results) {
			if(results.success === 1) {
				alert("正在打印")
			} else if(results.success === 0) {
				alert(results.info)
			}
		})
	})
});