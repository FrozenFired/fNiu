let Err = require('../aaIndex/err')

let User = require('../../../models/login/user')
let Firm = require('../../../models/login/firm')
let _ = require('underscore')



exports.bsUserUpd = function(req, res) {
	let obj = req.body.obj
	if(obj.code) {
		obj.code = obj.code.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	}
	if(obj.cd) {
		obj.cd = obj.cd.replace(/(\s*$)/g, "").replace( /^\s*/, '').toUpperCase();
	}
	User.findOne({_id: obj._id}, function(err, user) {
		if(err) {
			info = "bser UserUpd, User Findone Error!";
			Err.usError(req, res, info);
		} else if(!user) {
			info = "此用户已经被删除";
			Err.usError(req, res, info);
		} else {
			if(obj.pwd || obj.pwd == "") {
				usUser_changePwd(req, res, obj, user);
			} else if(obj.code && obj.code != user.code) {
				usUser_changeCode(req, res, obj, user);
			} else {
				usUser_save(req, res, obj, user);
			}
		}
	})
}
let bcrypt = require('bcryptjs');
let usUser_changePwd = function(req, res, obj, user) {
	let crUser = req.session.crUser;
	if(crUser._id == user._id) {
		obj.pw = obj.pw.replace(/(\s*$)/g, "").replace( /^\s*/, '')
		bcrypt.compare(obj.pw, user.pwd, function(err, isMatch) {
			if(err) console.log(err);
			if(!isMatch) {
				info = "原密码错误，请重新操作";
				Err.usError(req, res, info);
			}
			else {
				usUser_save(req, res, obj, user);
			}
		});
	} else if(user.role != 1) {
		usUser_save(req, res, obj, user);
	} else {
		info = "您无权修改此人密码";
		res.json({success: 0, info: info})
	}
}
let usUser_changeCode = function(req, res, obj, user) {
	User.findOne({code: obj.code})
	.where('_id').ne(obj._id)
	.exec(function(err, objSame) {
		if(err) {
			info = "bser User ChangeCode, User Findone Error!";
			Err.usError(req, res, info);
		} else if(objSame) {
			info = "此用户名已经存在";
			Err.usError(req, res, info);
		} else {
			usUser_save(req, res, obj, user);
		}
	})
}
let usUser_save = function(req, res, obj, user) {
	let _user = _.extend(user, obj)
	_user.save(function(err, userSave) {
		if(err) {
			info = "bser User_Save, User Save Error!"
			Err.usError(req, res, info);
		} else {
			if(req.session.crUser._id == userSave._id) {
				req.session.crUser = userSave;
			}
			res.redirect('/bsUser/'+userSave._id)
		}
	})
}


exports.bsUsers = function(req, res) {
	let crUser = req.session.crUser;
	
	User.find({'firm': crUser.firm})
	.exec(function(err, users) {
		if(err) {
			info = "bser Users, User Find Error!";
			Err.usError(req, res, info);
		} else {
			res.render('./user/bser/index/users', {
				title: '成员列表',
				crUser: crUser,

				users: users
			})
		}
	})
}

exports.bsUser = function(req, res) {
	let crUser = req.session.crUser;
	let userId = req.params.userId;
	User.findOne({_id: userId, firm: crUser.firm})
	.exec(function(err, user) {
		if(err) {
			info = "bser User, User FindOne Error!";
			Err.usError(req, res, info);
		} else if(!user) {
			info = "此帐号已经被删除";
			Err.wsError(req, res, info);
		} else {
			res.render('./user/bser/index/user', {
				title: '成员信息',
				crUser: crUser,

				user: user
			})
		}
	})
}










exports.bsFirm = function(req, res) {
	let crUser = req.session.crUser;
	
	Firm.findOne({'_id': crUser.firm})
	.exec(function(err, firm) {
		if(err) {
			info = "bser firm, Firm Find Error!";
			Err.usError(req, res, info);
		} else if(!firm) {
			info = "公司信息出现错误，联系管理员";
			Err.wsError(req, res, info);
		} else {
			res.render('./user/bser/index/firm', {
				title: '公司信息',
				crUser: crUser,

				firm: firm
			})
		}
	})
}

exports.bsFirmUpd = function(req, res) {
	let obj = req.body.obj;
	Firm.findOne({_id: obj._id}, function(err, firm) {
		if(err) {
			console.log(err);
			info = "bsFirmUpd, Firm.findOne, Error!";
			Err.usError(req, res, info);
		} else if(!firm) {
			info = "公司信息被删除, 请联系管理员";
			Err.usError(req, res, info);
		} else {
			let _firm = _.extend(firm, obj);
			_firm.save(function(err, firmSave) {
				if(err) {
					info = "修改公司信息时，数据库保存错误 请联系管理员";
					Err.usError(req, res, info);
				} else {
					res.redirect('/bsFirm')
				}
			});
		}
	});
}