let Err = require('../../aaIndex/err');

let Cter = require('../../../../models/client/cter');
let Order = require('../../../../models/client/order');

let _ = require('underscore');

exports.bsCters = function(req, res) {
	let crUser = req.session.crUser;

	Cter.find({'firm': crUser.firm,})
	.sort({'vip': -1})
	.exec(function(err, cters) {
		if(err) {
			console.log(err);
			info = "bsCters, Cter.find, Error！";
			Err.usError(req, res, info);
		} else {
			res.render('./user/bser/cter/list', {
				title : '订单管理',
				crUser: crUser,

				cters: cters
			});
		}
	})
}

exports.bsCter = function(req, res) {
	let crUser = req.session.crUser;
	let cterId = req.params.cterId;

	Cter.findOne({'firm': crUser.firm, '_id': cterId})
	.exec(function(err, cter) {
		if(err) {
			console.log(err);
			info = "bsCters, Cter.find, Error！";
			Err.usError(req, res, info);
		} else {
			res.render('./user/bser/cter/detail', {
				title : '订单管理',
				crUser: crUser,

				cter: cter
			});
		}
	})
}

exports.bsCterDelAjax = function(req, res) {
	let crUser = req.session.crUser;

	let id = req.query.id;
	Cter.findOne({_id: id}, function(err, object){ if(err) {
		res.json({success: 0, info: "bsCterDelAjax, Cter.findOne, Error"})
	} else if(!object){
		res.json({success: 0, info: "此客户已经被删除"})
	} else if(object.firm != crUser.firm){
		res.json({success: 0, info: "操作错误,请联系管理员! bsCterDelAjax, object.firm != crUser.firm"})
	} else {
		if(object.orders && object.orders.length > 0) {
			res.json({success: 0, info: "此客户还有订单,不可以删除"})
		} else {
			Cter.deleteOne({_id: object._id}, function(err, objRm) { if(err) {
				res.json({success: 0, info: "bsCterDelAjax, Cter.deleteOne,Error!"})
			} else {
				res.json({success: 1})
			} })
		}
	} })
}




exports.bsCterUpd = function(req, res) {
	let crUser = req.session.crUser;
	let obj = req.body.obj
	if(obj.code) obj.code= obj.code.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	if(obj.nome) obj.nome= obj.nome.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	if(obj.vip) obj.vip = parseInt(obj.vip);
	Cter.findOne({_id: obj._id, 'firm': crUser.firm})
	.exec(function(err, object) {
		if(err) {
			info = "bser CterUpd, Cter.findOne, Error!";
			res.json({success: 0, info: info});
		} else if(!object) {
			info = "deleted! refresh Page!";
			res.json({success: 0, info: info});
		} else {
			Cter.findOne({'nome': obj.nome, 'firm': crUser.firm})
			.where('_id').ne(obj._id)
			.exec(function(err, cterSm) {
				if(err) {
					info = "bser CterUpd, Cter.findOne, Error!";
					res.json({success: 0, info: info});
				} else if(cterSm) {
					info = "已经有了此名字！";
					res.json({success: 0, info: info});
				} else {
					let _object
					_object = _.extend(object, obj)
					_object.save(function(err, objSave){
						if(err) console.log(err);
						res.json({success: 1, cter: objSave});
					})
				}
			})
		} 
	})
}



exports.bsCterNew = function(req, res) {
	let crUser = req.session.crUser;
	let obj = req.body.obj

	if(obj.nome) obj.nome = obj.nome.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	if(obj.code) {
		obj.code= obj.code.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	}
	if(obj.iva) obj.iva= obj.iva.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();

	obj.firm = crUser.firm;
	if(!obj.nome) {
		info = "请输入客户名字";
		res.json({success: 0, info: info})
	} else {
		Cter.findOne({'firm': crUser.firm, nome: obj.nome}, function(err, objSm) {
			if(err) {
				info = "bsCterNew, Cter.findOne, Error!";
				res.json({success: 0, info: info})
			} else if(objSm) {
				info = "已经有了此名字, 请换个名字！";
				res.json({success: 0, info: info})
			} else {
				let _cter = new Cter(obj);
				_cter.save(function(err, cterSave) { if(err) {
					info = "bsCterNew, _cter.save, Error!";
					res.json({success: 0, info: info})
				} else {
					res.json({success: 1, cter: cterSave})
				} })
			}
		})
	}
}


exports.bsCterIsAjax = function(req, res) {
	let crUser = req.session.crUser;
	let keytype = req.query.keytype
	let keyword = req.query.keyword
	keyword = String(keyword).replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	Cter.findOne({
		'firm': crUser.firm,
		[keytype]: keyword
	})
	.exec(function(err, object){
		if(err) {
			res.json({success: 0, info: "bsCterIsAjax, Cter.findOne, Error!"});
		} else if(object){
			res.json({ success: 1, object: object})
		} else {
			res.json({success: 0})
		}
	})
}


exports.bsCtersObtAjax = function(req, res) {
	let crUser = req.session.crUser;
	let keytype = req.query.keytype
	let keyword = ' x '
	if(req.query.keyword) {
		keyword = String(req.query.keyword);
		keyword = keyword.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	}

	let keywordReg = new RegExp(keyword + '.*');
	Cter.find({
		'firm': crUser.firm,
		$or:[
			{'code': {'$in': keywordReg}},
			{'nome': {'$in': keywordReg}},
		]
	})
	.limit(5)
	.exec(function(err, cters){
		if(err) {
			res.json({success: 0, info: "bs获取客户列表时，数据库查找错误, 请联系管理员"});
		} else if(!cters){
			res.json({success: 0, info: "bs 获取客户列表错误, 请联系管理员"})
		} else {
			Cter.findOne({
				'firm': crUser.firm,
				$or: [
					{'code': keyword},
					{'nome': keyword},
				]
			})
			.exec(function(err, cter) {
				if(err) {
					console.log(err);
					res.json({success: 0, info: "bs获取客户列表时，数据库查找错误, 请联系管理员"});
				} else if(!cter) {
					res.json({ success: 1, cters: cters})
				} else {
					// console.log(cter)
					res.json({success: 2, cter: cter, cters: cters})
				}
			})
		}
	})
}