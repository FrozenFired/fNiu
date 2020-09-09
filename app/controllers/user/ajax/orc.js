let Err = require('../../aaIndex/err');
let Conf = require('../../../../conf');

let Orc = require('../../../models/client/orc');

exports.usOrcsAjax = (req, res) => {
	let crUser = req.session.crUser;
	let crCter = req.session.crCter;
	if(!crCter && !crUser) {
		res.redirect('/login')
	} else {
		let firm;

		let cterSymb;
		let cterCond;

		if(crUser) {
			firm = crUser.firm;
			cterSymb = '$ne';
			cterCond = null;
			if(req.query.cter) {
				cterSymb = '$eq';
				cterCond = req.query.cter;
			}
		} else if(crCter) {
			firm = crCter.firm;
			cterSymb = '$eq';
			cterCond = crCter._id;
		}

		let page = 1;
		if(req.query.page && !isNaN(parseInt(req.query.page))) {
			page = parseInt(req.query.page);
		}
		let pagesize = 12;
		if(req.query.pagesize && !isNaN(parseInt(req.query.pagesize))) {
			pagesize = parseInt(req.query.pagesize);
		}
		let skip = (page-1)*pagesize;

		let keySymb = '$ne';
		let keyReg = 'rander[a`a。=]';
		if(req.query.keyword) {
			keySymb = '$in';
			keyReg = String(req.query.keyword);
			keyReg = keyReg.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
			keyReg = new RegExp(keyReg + '.*');
		}
		
		let statusSymb;
		let statusCond;
		statusSymb = '$ne';
		statusCond = 1;
		if(req.query.status) {
			statusSymb = '$eq';
			statusCond = req.query.status;
		}

		let param = {
			firm: firm,
			'status': {[statusSymb]: statusCond},
			'cter': {[cterSymb]: cterCond},
			'code': {[keySymb]: keyReg},
		}
		Orc.countDocuments(param, (err, count) => {
			if(err) {
				info = "bser OrcsAjax, Orc.countDocuments(), Error!";
				Err.jsonErr(req, res, info);
			} else {
				Orc.find(param)
				.populate('firm')
				.populate('cter')
				// .populate({path: 'orcpd', populate: {path: 'pdfir'}})
				.skip(skip).limit(pagesize)
				.sort({'ctAt': -1})
				.exec((err, orcs) => {
					if(err) {
						info = "cter OrcsAjax, Orc.find(), Error!";
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
								orcs,
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
}