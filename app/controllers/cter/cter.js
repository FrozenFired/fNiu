let Err = require('../aaIndex/err');

let Cter = require('../../models/client/cter');
let Pdfir = require('../../models/material/pdfir');

exports.cter = function(req, res) {
	let crCter = req.session.crCter;
	
	Pdfir.find({
		'firm': crCter.firm,
	})
	.limit(20)
	.exec(function(err, pdfirs) {
		if(err) {
			info = "bser pdfirs, pdfir find, Error！";
			Err.usError(req, res, info);
		} else {
			res.render('./cter/index/index', {
				title: '首页',
				crCter : crCter,
				pdfirs: pdfirs,
			})
		}
	})
}

exports.ctCter = function(req, res) {
	let crCter = req.session.crCter;
	res.render('./cter/index/cter', {
		title: '个人中心',
		crCter : crCter,
	})
}