let Err = require('../aaIndex/err');

let Pdfir = require('../../models/material/pdfir');
let Orc = require('../../models/client/orc');
let Orcpd = require('../../models/client/orcpd');

exports.ctOrcNewAjax = function(req, res) {
	let crCter = req.session.crCter;
	let obj = req.body.obj;
	obj.firm = crCter.firm;
	obj.cter = crCter._id;
	Orc.findOne({_id: obj.orc, firm: crCter.firm}, function(err, orc) {
		if(err) {
			console.log(err);
			info = "cter Orc NewAjax, Orc.findOne, Error!"
			res.json({success: 0, info})
		} else if(!orc) {
			info = "请刷新重试, !orc, Please reflesh!"
			res.json({success: 0, info})
		} else {
			Pdfir.findOne({_id: obj.pdfir, firm: crCter.firm}, function(err, pdfir) {
				if(err) {
					console.log(err);
					info = "cter Orc NewAjax, Pdfir.findOne, Error!"
					res.json({success: 0, info})
				} else if(!pdfir) {
					info = "请刷新重试, !pdfir, Please reflesh!"
					res.json({success: 0, info})
				} else if(parseInt(pdfir.price) != parseInt(obj.price)) {
					info = "操作错误, 不能私自修改"
					res.json({success: 0, info})
				} else {
					// console.log(obj)
					// for(let i=0; i<obj.colors.length; i++) {
					// 	console.log(obj.colors[i])
					// }
					let _orcpd = new Orcpd(obj);
					orc.orcpds.unshift(_orcpd._id);
					orc.save(function(err, orcSave) {
						if(err) {
							console.log(err);
							info = "cter Orc NewAjax, orc.save, Error!"
							res.json({success: 0, info})
						} else {
							_orcpd.save(function(err, orcpdSave) {
								if(err) {
									console.log(err);
									info = "cter Orc NewAjax, _orcpd.save, Error!"
									res.json({success: 0, info})
								} else {
									res.json({success: 1})
								}
							})
						}
					})
				}
			})
		}
	})
}
