const Prod = require('../controllers/user/ajax/prod');

const MdRole = require('../middle/middleRole');

const multipart = require('connect-multiparty');
const postForm = multipart();

module.exports = function(app){
	/* =================================== Prod =================================== */
	app.get('/usPdfirsAjax', Prod.usPdfirsAjax)

	/* ===================== 状态更改 ===================== */
	// app.get('/usInquotStatusAjax', MdRole.userIsLogin, Status.usInquotStatusAjax)

	// /* =================================== Comment =================================== */
	// app.get('/usCommentsAjax', MdRole.userIsLogin, Comment.usCommentsAjax);
	// app.post('/usCommentNewAjax', MdRole.userIsLogin, postForm, Comment.usCommentNewAjax);
	// app.post('/usCommentReplyAjax', MdRole.userIsLogin, postForm, Comment.usCommentReplyAjax);
};