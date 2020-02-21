let Err = require('../aaIndex/err')

let MdPicture = require('../../../middle/middlePicture');
let Conf = require('../../../../conf');

let Pdfir = require('../../../models/material/pdfir');

let _ = require('underscore');

exports.bsPdfirs = function(req, res) {
	let crUser = req.session.crUser;
	// let limit = 50;
	// if(req.query.limit) limit = parseInt(req.query.limit);

	let sortBy = 'upAt';
	if(req.query.sortBy) sortBy = req.query.sortBy;
	let sortVal = -1;
	if(req.query.sortVal) sortVal = req.query.sortVal;

	let isPhoto = -1;
	let symPhoto = '$ne';
	let keyPhoto = 'xxx.jpg';
	if(req.query.isPhoto) isPhoto = parseInt(req.query.isPhoto);
	// console.log(isPhoto)
	if(isPhoto == 1) {
		symPhoto = '$eq';
		keyPhoto = '/upload/product/1.jpg';
	} else if(isPhoto == 2) {
		symPhoto = '$ne';
		keyPhoto = '/upload/product/1.jpg';
	}

	Pdfir.find({
		'firm': crUser.firm,
		'photo': {[symPhoto]: keyPhoto}
	})
	.sort({[sortBy]: sortVal})
	// .limit(limit)
	.exec(function(err, pdfirs) {
		if(err) {
			info = "bser pdfirs, pdfir find, Error！";
			Err.usError(req, res, info);
		} else {
			res.render('./user/bser/product/list', {
				title : '模特记录',
				crUser: crUser,

				pdfirs: pdfirs,
			});
		}
	})
}
exports.bsPdfirsAjax = function(req, res) {
	let crUser = req.session.crUser;
	let limit = 10;
	let code = req.query.code;
	let keywordReg = new RegExp(code + '.*');
	Pdfir.find({
		'firm': crUser.firm,
		'code': {'$in': keywordReg}
	})
	.sort({'upAt': -1})
	.limit(limit)
	.exec(function(err, pdfirs) {
		if(err) {
			info = "bser pdfirs, pdfir find, Error！";
			res.json({success: 0, info: info})
		} else {
			res.json({success: 1, pdfirs: pdfirs})
		}
	})
}


exports.bspdfir = function(req, res) {
	let crUser = req.session.crUser;
	
	let id = req.params.id;

	Pdfir.findOne({
		'firm': crUser.firm,
		'_id': id
	})
	.exec(function(err, pdfir) {
		if(err) {
			info = "bser pdfir, pdfir findOne, Error！";
			Err.usError(req, res, info);
		} else if(!pdfir) {
			info = "没有找到此模特, 请刷新重试"
		} else {
			res.render('./user/bser/product/detail', {
				title : '模特记录',
				crUser: crUser,

				pdfir: pdfir,
			});
		}
	})
}


exports.bspdfirAdd = function(req, res) {
	let crUser = req.session.crUser;

	res.render('./user/bser/product/add', {
		title : '添加模特',
		crUser: crUser,
	});
}


exports.bsPdfirNew = function(req, res) {
	let crUser = req.session.crUser;
	let obj = req.body.obj;
	obj.code = obj.code.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	obj.nome = obj.nome.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	obj.firm = crUser.firm;
	obj.creater = crUser._id;
	/* ================= 数字转化 =================== */
	if(obj.price) {
		obj.price = parseFloat(obj.price);
	} else {
		obj.price = 0;
	}
	if(obj.cost) {
		obj.cost = parseFloat(obj.cost);
	} else {
		obj.cost = 0;
	}
	/* ================= 数字转化 =================== */


	if(!obj.code || isNaN(obj.price) || isNaN(obj.cost)) {
		info = "数据输入有误！";
		Err.usError(req, res, info);
	} else {
		// console.log(obj)

		/* =========== 公司不能出现同一个型号的模特 ============= */
		Pdfir.findOne({code: obj.code, 'firm': crUser.firm})
		.exec(function(err, pdfirSame) {
			if(err) {
				console.log(err);
				info = "bsProductNew, Pdfir.findOne, Error!";
				Err.usError(req, res, info);
			} else if(pdfirSame) {
				info = "此产品号已经存在，请重新填写";
				Err.usError(req, res, info);
			} else {
				let _pdfir = new Pdfir(obj);	// 创建pdfir
				_pdfir.save(function(err, pdfirSave) {
					if(err) {
						console.log(err);
						info = "添加新产品时，数据库保存出错, 请联系管理员";
						Err.usError(req, res, info);
					} else {
						res.redirect('/bser')
					}
				})
			}
		})
	}
}



exports.bsPdfirUpd = function(req, res, next) {
	let crUser = req.session.crUser;
	let obj = req.body.obj;
	if(obj.price) obj.price = parseFloat(obj.price);
	if(obj.cost) obj.cost = parseFloat(obj.cost);
	if(obj.stock) obj.stock = parseInt(obj.stock);
	if(obj.sales) obj.sales = parseInt(obj.sales);
	Pdfir.findOne({_id: obj._id}, function(err, pdfir) {
		if(err) {
			console.log(err);
			info = "bsProductUpd, Pdfir.findOne, Error！";
			Err.usError(req, res, info);
		} else if(!pdfir) {
			info = "数据库中没有此模特, 刷新查看";
			Err.usError(req, res, info);
		} else {
			let _pdfir = _.extend(pdfir, obj)
			_pdfir.save(function(err, pdfirSave) {
				if(err) {
					console.log(err);
					info = "bsProductUpd, _pdfir.save, Error！";
					Err.usError(req, res, info);
				} else {
					res.redirect('/bser')
				}
			})
		}
	})
}




exports.bsProdFilter = function(req, res, next) {
	let crUser = req.session.crUser;
	let id = req.params.id;
	Pdfir.findOne({_id: id, 'firm': crUser.firm})
	.populate({path: 'pdsecs', populate: {path: 'pdthds', populate: [
		{path: 'ordthds'}, {path: 'hordthds'},
		{path: 'macthds'},
		{path: 'tinthds'},
		{path: 'pdsez'},
	]}})
	.populate({path: 'pdsezs', populate: [
		{path: 'pdthds', populate: [
			{path: 'ordthds'}, {path: 'hordthds'},
			{path: 'macthds'},
			{path: 'tinthds'},
			{path: 'pdsez'},
		]},
		{path: 'macsezs'},
	]})
	.populate({path: 'ordfirs', populate: [
		{path: 'order'},
		{path: 'ordsecs', populate: {path: 'ordthds'}}
	]})
	// .populate({path: 'hordfirs', populate: [
	// 	{path: 'order'},
	// 	{path: 'ordsecs', populate: {path: 'ordthds'}}
	// ]})
	.populate({path: 'macfirs', populate: [
		{path: 'machin'},
		{path: 'macsecs', populate: {path: 'macthds'}}
	]})
	.populate({path: 'tinfirs', populate: [
		{path: 'tinhin'},
		{path: 'tinsecs', populate: {path: 'tinthds'}}
	]})
	.exec(function(err, pdfir) {
		if(err) {
			console.log(err);
			info = "查看产品信息时，数据库查找出错, 请联系管理员";
			Err.usError(req, res, info);
		} else if(!pdfir) {
			info = "此产品已经被删除";
			Err.usError(req, res, info);
		} else {
			// console.log(pdfir.pdsezs[0])
			req.body.pdfir = pdfir;
			next();
		}
	})
}





exports.bsPdfirDel = function(req, res) {
	let crUser = req.session.crUser;
	let id = req.params.id;
	Pdfir.findOne({_id: id, 'firm': crUser.firm})
	.exec(function(err, pdfir){
		if(err) {
			console.log(err);
			info = "bsPdfirDel, Pdfir.findOne, Error！";
			Err.usError(req, res, info);
		} else if(!pdfir) {
			info = "此产品已经被删除, 请刷新查看!";
			Err.usError(req, res, info);
		} else {
			let orgPhoto = pdfir.photo;
			MdPicture.deleteOldPhoto(orgPhoto, Conf.photoPath.proPhoto);
			Pdfir.deleteOne({_id: pdfir._id}, function(err, objRm) {
				if(err) {
					info = "bsPdfirDel, Pdfir.findOne, Error!";
					Err.usError(req, res, info);
				} else {
					res.redirect('/bsPdfirs');
				}
			})
		}
	})
}