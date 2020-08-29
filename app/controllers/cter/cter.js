let Err = require('../aaIndex/err');

let Firm = require('../../models/login/firm');
let Cter = require('../../models/client/cter');
let Pdfir = require('../../models/material/pdfir');

exports.cter = function(req, res) {
	let crCter = req.session.crCter;
	let firm = req.session.firm;
	if(crCter) frim = crCter.firm;

	res.render('./cter/index/index', {
		title: '首页',
		crCter,
		firm
	})
}

exports.ctCter = function(req, res) {
	let crCter = req.session.crCter;
	res.render('./cter/index/cter', {
		title: '个人中心',
		crCter,
	})
}