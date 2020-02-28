let Err = require('../aaIndex/err');

let Pdfir = require('../../models/material/pdfir');

exports.ctGetPdfirs = function(req, res) {
	let crCter = req.session.crCter;
	Pdfir.find({'firm': crCter.firm})
	.sort({'upAt': -1})
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