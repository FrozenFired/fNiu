let Err = require('../aaIndex/err');

let Cter = require('../../models/client/cter');

exports.cter = function(req, res) {
	let crCter = req.session.crCter;
	res.render('./cter/index/index', {
		title: '客户',
		crCter : crCter,
	})
}

exports.ctCter = function(req, res) {
	let crCter = req.session.crCter;
	res.render('./cter/index/cter', {
		title: '个人中心',
		crCter : crCter,
	})
}