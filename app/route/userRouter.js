let Index = require('../controllers/user/aaIndex/index');

let User = require('../controllers/user/bser/user');

let OdProd = require('../controllers/user/order/product');
let OdCter = require('../controllers/user/order/cter');
let Ord = require('../controllers/user/order/order');

let Product = require('../controllers/user/bser/product');
let Prod = require('../controllers/user/bser/prod');

let Cter = require('../controllers/user/bser/order/cter');
let Order = require('../controllers/user/bser/order/order');
let Ordfir = require('../controllers/user/bser/order/ordfir');


let MdBcrypt = require('../middle/middleBcrypt');
let MdRole = require('../middle/middleRole');
let MdPicture = require('../middle/middlePicture');
let MdExcel = require('../middle/middleExcel');

let multipart = require('connect-multiparty');
let postForm = multipart();

module.exports = function(app){
	/* ================================ Index ================================ */
	app.get('/order', MdRole.userIsLogin, Index.order);

	app.get('/getPdfirs', MdRole.userIsLogin, OdProd.getPdfirs)
	app.get('/getCters', MdRole.userIsLogin, OdCter.getCters)

	/* =========================== order =========================== */
	app.post('/orderNew', postForm, Ord.orderNew);		// 不要角色判断，因为自动退出
	app.get('/orderDelSts', MdRole.userIsLogin, Ord.orderDelSts);
	// app.get('/orderDel', MdRole.userIsLogin, Ord.orderDel);
	app.get('/getOrders', MdRole.userIsLogin, Ord.getOrders);
	/* -------- 从order中添加新产品和新客户 -------- */
	app.post('/ordAddPdfir', MdRole.userIsLogin, postForm, Ord.ordAddPdfir);
	app.post('/ordAddCter', MdRole.userIsLogin, postForm, Ord.ordAddCter);
	





	app.get('/bser', MdRole.bserIsLogin, Index.bser);
	/* =================================== User =================================== */
	app.get('/bsUsers', MdRole.bserIsLogin, User.bsUsers)
	app.get('/bsUser/:userId', MdRole.bserIsLogin, User.bsUser)
	app.post('/bsUserUpdInfo', MdRole.bserIsLogin, postForm, User.bsUserUpd)
	app.post('/bsUserUpdPwd', MdRole.bserIsLogin, postForm, MdBcrypt.rqBcrypt, User.bsUserUpd)

	app.get('/bsFirm', MdRole.bserIsLogin, User.bsFirm)
	app.post('/bsFirmUpd', MdRole.bserIsLogin, postForm, User.bsFirmUpd);
	/* =================================== Firm =================================== */

	/* ======================================== product ======================================== */
	app.get('/bsPdfirs', MdRole.bserIsLogin, Product.bsPdfirs);
	app.get('/bsPdfirsAjax', MdRole.bserIsLogin, Product.bsPdfirsAjax);
	app.get('/bspdfirAdd', MdRole.bserIsLogin, Product.bspdfirAdd);
	app.post('/bsPdfirNew', MdRole.bserIsLogin, postForm, MdPicture.addNewPhoto, Product.bsPdfirNew);
	app.get('/bspdfir/:id', MdRole.bserIsLogin, Product.bspdfir);

	app.post('/bsPdfirUpd', MdRole.bserIsLogin, postForm, MdPicture.addNewPhoto, Product.bsPdfirUpd);
	app.get('/bsPdfirDel/:id', MdRole.bserIsLogin, Product.bsPdfirDel)

	app.get('/bsPdAjaxCode', MdRole.bserIsLogin, Product.bsPdAjaxCode);
	

	/* =================================== cter =================================== */
	app.get('/bsCters', MdRole.bserIsLogin, Cter.bsCters)
	app.get('/bsCter/:cterId', MdRole.bserIsLogin, Cter.bsCter)
	app.delete('/bsCterDelAjax', MdRole.bserIsLogin, Cter.bsCterDelAjax)
	
	app.post('/bsCterUpd', MdRole.bserIsLogin, postForm, Cter.bsCterUpd)

	app.post('/bsCterNew', MdRole.bserIsLogin, postForm, Cter.bsCterNew)

	app.get('/bsCterIsAjax', MdRole.bserIsLogin, Cter.bsCterIsAjax)
	app.get('/bsCtersObtAjax', MdRole.bserIsLogin, Cter.bsCtersObtAjax)

	/* ======================================== order ======================================== */
	app.post('/bsOrderNew', MdRole.bserIsLogin, postForm, Order.bsOrderNew);
	app.get('/bsOrderDel', MdRole.bserIsLogin, Order.bsOrderDel)

	app.get('/bsOrders', MdRole.bserIsLogin, Order.bsOrders);
	app.get('/bsOrdersAjax', MdRole.bserIsLogin, Order.bsOrdersAjax);
	// app.get('/bsOrdHis', MdRole.bserIsLogin, Order.bsOrdHis);
	// app.post('/bsOrdChangeSts', MdRole.bserIsLogin, postForm, Order.bsOrdChangeSts);
	app.get('/bsOrderTicketing', MdRole.userIsLogin, Order.bsOrderTicketing);
	/* ----------- ordfir 根据 pd 或者 客户 查看销量 ----------- */
	app.get('/bsOrdfirsPd', MdRole.bserIsLogin, Ordfir.bsOrdfirsPd);
	app.get('/bsOrdfirsCt', MdRole.bserIsLogin, Ordfir.bsOrdfirsCt);
	app.get('/bsOrdfirsCter', MdRole.bserIsLogin, Ordfir.bsOrdfirsCter);
};