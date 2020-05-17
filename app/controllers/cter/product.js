let Err = require('../aaIndex/err');

let Pdfir = require('../../models/material/pdfir');
let Nome = require('../../models/material/nome');
let Ordfir = require('../../models/client/ordfir');

exports.products = function(req, res) {
	let crCter = req.session.crCter;
	let proNomes = req.session.proNomes;
	let keyword = req.query.keyword;
	let pdnome = req.query.pdnome;
	let keywordReg = new RegExp(keyword + '.*');
	if(pdnome && pdnome.length>0) keyword = pdnome;

	let limit = 120;

	Pdfir.find({
		'firm': crCter.firm,
		$or:[
			{'code': {'$in': keywordReg}},
			{'nome': {'$in': keywordReg}},
			{'nome': pdnome},
		]
	})
	.sort({'ctAt': -1})
	.limit(limit)
	.exec(function(err, pdfirs) {
		if(err) {
			console.log(err);
			info = "cter products Pdfir.find, Error!"
			Err.usError(req, res, info);
		} else {
			res.render('./cter/product/list', {
				title : '产品列表',
				crCter: crCter,
				proNomes: proNomes,

				pdfirs: pdfirs,
				keyword: keyword
			});
		}
	})
}

exports.pdnomes = function(req, res) {
	let crCter = req.session.crCter;
	let proNomes = req.session.proNomes;

	Nome.find({
		'firm': crCter.firm,
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
				proNomes: proNomes,

				nomes: nomes,
			});
		}
	})
}

exports.ctGetPdfirs = function(req, res) {
	let crCter = req.session.crCter;
	let proNomes = req.session.proNomes;

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
	let proNomes = req.session.proNomes;

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