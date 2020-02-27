let Err = require('../../aaIndex/err');

let Order = require('../../../models/client/order');

exports.ptAutoTk = function(req, res, next) {
	let crUser = req.session.crUser;
	// 第一步 找到需要打印的订单
	Order.find({'firm': crUser.firm})
	.where('ticketing').eq(true)
	.populate('firm')
	.populate('cter')
	.populate({path: 'ordfirs', populate: {path: 'pdfir'}})
	.sort({"ctAt": 1})
	.exec(function(err, printings) { if(err) {
		info = "pt自动打印时, 数据库错误, 请联系管理员";
		Err.wsError(req, res, info);
	} else {
		// console.log(printings)
		// 如果找到打印的订单
		if(printings.length > 0) {
			req.body.object = printings[0];
			next();
		} 

		// 如果没有找到打印的订单
		else {
			// 第二步 查找最新订单
			Order.find({'firm': crUser.firm})
			.populate('firm')
			.populate('cter')
			.populate({path: 'ordfirs', populate: {path: 'pdfir'}})
			.sort({"ctAt": -1})
			.limit(1)
			.exec(function(err, objects) { if(err) {
				info = "pt自动打印时, 数据库错误, 请联系管理员";
				Err.wsError(req, res, info);
			} else {
				// 如果找到最新订单
				if(objects.length > 0) {
					req.body.object = objects[0];
					next();
				} 
				// 如果没有订单
				else {
					info = "您还没有订单， 请先添加订单";
					Err.wsError(req, res, info);
				}
			} })
		}
	} })
}
exports.ptTicket = function(req, res) {
	let object = req.body.object;
	res.render('./user/pter/ticket/autoPrint', {
		title: '小票打印',
		crUser: req.session.crUser,
		firm: object.firm,
		order: object,
	});
}

exports.ptChangeTicket = function(req, res) {
	let id = req.query.id
	let newTicket = req.query.newTicket;
	Order.findOne({_id: id}, function(err, object){
		if(err) console.log(err);
		if(object){
			object.ticketing = parseInt(newTicket);
			object.save(function(err,objSave) {
				if(err) console.log(err);
				res.json({success: 1, info: "已经更改"});
			})
		} else {
			res.json({success: 0, info: "已被删除，按F5刷新页面查看"});
		}
	})
}