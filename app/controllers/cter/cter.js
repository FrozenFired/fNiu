let Err = require('../aaIndex/err');

let Cter = require('../../models/client/cter');

exports.cter = function(req, res) {
	let crCter = req.session.crCter;
	res.render('./cter/index/index', {
		title: '客户',
		crCter : crCter,
	})
}