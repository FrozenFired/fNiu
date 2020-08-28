let Err = require('../aaIndex/err');

let Pdfir = require('../../models/material/pdfir');
let Nome = require('../../models/material/nome');
let Ordfir = require('../../models/client/ordfir');

exports.products = function(req, res) {
	let crCter = req.session.crCter;
	let firm = req.session.firm;
	let keyword = req.query.keyword;

	res.render('./cter/product/list', {
		title : '产品列表',
		crCter,
		keyword,
	});
}

exports.product = function(req, res) {
	let crCter = req.session.crCter;
	let firm = req.session.firm;
	if(crCter) firm = crCter.firm;
	let id = req.params.id;

	Pdfir.findOne({_id: id})
	.exec(function(err, pdfir) {
		if(err) {
			console.log(err);
			info = "cter product Pdfir.findone, Error!"
			Err.usError(req, res, info);
		} else if(!pdfir) {
			info = "没有找到产品, 请刷新重试"
			Err.usError(req, res, info);
		} else {
			// console.log(pdfir)
			res.render('./cter/product/detail', {
				title : '产品信息',
				crCter,
				pdfir,
			});
		}
	})
}

exports.pdnomes = function(req, res) {
	let crCter = req.session.crCter;
	let firm = req.session.firm;
	if(crCter) firm = crCter.firm;

	Nome.find({
		'firm': firm,
	})
	.sort({'status': -1})
	.exec(function(err, nomes) {
		if(err) {
			console.log(err);
			info = "cter pdnomes Nome.find, Error!"
			Err.usError(req, res, info);
		} else {
			res.render('./cter/product/pdnomes', {
				title : '产品分类列表',
				crCter: crCter,

				nomes: nomes,
			});
		}
	})
}

exports.ctGetPdfirs = function(req, res) {
	let crCter = req.session.crCter;

	Pdfir.find({'firm': crCter.firm})
	.sort({'ctAt': -1})
	.exec(function(err, pdfirs) {
		if(err) {
			console.log(err);
			info = "cter pdfir find, Error!"
			res.json({success: 0, info: info})
		} else {
			res.json({success: 1, pdfirs: pdfirs})
		}
	})
}

exports.ctGetOrdfirs = function(req, res) {
	let crCter = req.session.crCter;

	let symAtFm = "$gte";
	let symAtTo = "$lte";
	let condAtFm = new Date(new Date().setHours(0, 0, 0, 0));
	let condAtTo = new Date(new Date().setHours(23, 59, 59, 999))
	if(req.query.atFm && req.query.atFm.length == 10){
		condAtFm = new Date(req.query.atFm).setHours(0,0,0,0);
	}
	if(req.query.atTo && req.query.atTo.length == 10){
		condAtTo = new Date(req.query.atTo).setHours(23,59,59,999);
	}

	Ordfir.find({
		'firm': crCter.firm,
		'ctAt': {[symAtFm]: condAtFm, [symAtTo]: condAtTo}
	})
	.sort({'ctAt': -1})
	.exec(function(err, ordfirs) {
		if(err) {
			console.log(err);
			info = "cter pdfir find, Error!"
			res.json({success: 0, info: info})
		} else {
			res.json({success: 1, ordfirs: ordfirs})
		}
	})
}