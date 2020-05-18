let Err = require('../aaIndex/err');

let Firm = require('../../models/login/firm');
let Cter = require('../../models/client/cter');
let Pdfir = require('../../models/material/pdfir');

exports.cter = function(req, res) {
	let crCter = req.session.crCter;
	let proNomes = req.session.proNomes;
	Pdfir.find({
		'firm': crCter.firm,
	})
	.limit(20)
	.exec(function(err, pdfirs) {
		if(err) {
			info = "bser pdfirs, pdfir find, Error！";
			Err.usError(req, res, info);
		} else {
			Firm.findOne({_id: crCter.firm}, function(err, firm) {
				if(err) console.log(err);

				res.render('./cter/index/index', {
					title: '首页',
					crCter,
					proNomes,
					pdfirs,
					firm
				})
			})
		}
	})
}

exports.ctCter = function(req, res) {
	let crCter = req.session.crCter;
	let proNomes = req.session.proNomes;
	res.render('./cter/index/cter', {
		title: '个人中心',
		crCter,
		proNomes,
	})
}