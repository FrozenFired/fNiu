let Err = require('../../aaIndex/err');
let Conf = require('../../../../conf');

let Pdfir = require('../../../models/material/pdfir');


exports.usPdfirsAjax = (req, res) => {
	let crUser = req.session.crUser;
	let crCter = req.session.crCter;
	let firm = req.session.firm;
	if(crCter) {
		firm = crCter.firm;
	} else if(crUser) {
		firm = crUser.firm;
	}

	let page = 1;
	if(req.query.page && !isNaN(parseInt(req.query.page))) {
		page = parseInt(req.query.page);
	}
	let pagesize = 24;
	if(req.query.pagesize && !isNaN(parseInt(req.query.pagesize))) {
		pagesize = parseInt(req.query.pagesize);
	}
	let skip = (page-1)*pagesize;

	let nomeSymb = '$ne';
	let nomeCond = 'rander[a`a。=]';
	if(req.query.nome) {
		nomeSymb = '$eq';
		nomeCond = req.query.nome;
	}

	let keySymb = '$ne';
	let keyReg = 'rander[a`a。=]';
	if(req.query.keyword) {
		keySymb = '$in';
		keyReg = String(req.query.keyword);
		keyReg = keyReg.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
		keyReg = new RegExp(keyReg + '.*');
	}

	let rmcdSymb = '$ne';
	let rmcdConb = -1;
	if(crCter) {
		rmcdSymb = '$gt';
		rmcdConb = 0;
	}
	if(req.query.rmcd && !isNaN(parseInt(req.query.rmcd))) {
		rmcdSymb = '$eq';
		rmcdConb = parseInt(req.query.rmcd)

		if(crCter && rmcdConb == 0) {
			rmcdSymb = '$gt';
		}
	}

	let param = {
		firm: firm._id,
		rmcd: {[rmcdSymb]: rmcdConb},

		'nome': {[nomeSymb]: nomeCond},
		$or:[
			{'code': {[keySymb]: keyReg}},
			{'nome': {[keySymb]: keyReg}},
		]
	}
	Pdfir.countDocuments(param, (err, count) => {
		if(err) {
			info = "bser PdfirsAjax, Pdfir.countDocuments(), Error!";
			Err.jsonErr(req, res, info);
		} else {
			Pdfir.find(param)
			.skip(skip).limit(pagesize)
			.sort({'rmcd': -1, 'weight': -1, 'upAt': -1})
			.exec((err, pdfirs) => {
				if(err) {
					info = "cter PdfirsAjax, Pdfir.find(), Error!";
					Err.jsonErr(req, res, info);
				} else {
					// console.log(page)
					// console.log(count)
					let isMore = 1;
					if(page*pagesize >= count) isMore = 0;
					res.json({
						status: 1,
						msg: '',
						data: {
							pdfirs,
							count,
							page,
							isMore,
						}
					});
				}
			})
		}
	})
}