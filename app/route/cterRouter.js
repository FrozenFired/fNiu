let Index = require('../controllers/aaIndex/index');

let Cter = require('../controllers/cter/cter');

let Product = require('../controllers/cter/product');

let Orc = require('../controllers/cter/orc');
// let Cter = require('../controllers/cter/cter/order/cter');
// let Ordfir = require('../controllers/cter/cter/order/ordfir');


let MdBcrypt = require('../middle/middleBcrypt');
let MdRole = require('../middle/middleRole');
let MdPicture = require('../middle/middlePicture');
let MdExcel = require('../middle/middleExcel');

let multipart = require('connect-multiparty');
let postForm = multipart();

module.exports = function(app){
	app.get('/cter', Cter.cter);
	/* =================================== Cter =================================== */
	app.get('/ctMyself', Cter.ctCter)
	// app.post('/ctCterUpdInfo', MdRole.cterIsLogin, postForm, Cter.ctCterUpd)
	// app.post('/ctCterUpdPwd', MdRole.cterIsLogin, postForm, MdBcrypt.rqBcrypt, Cter.ctCterUpd)


	/* ======================================== product ======================================== */
	app.get('/products', Product.products);
	app.get('/product/:id', Product.product);

	app.get('/pdnomes', Product.pdnomes);
	/* ======================================== nome ======================================== */
	

	/* ======================================== order ======================================== */
	app.post('/ctOrcNewAjax', MdRole.cterIsLogin, postForm, Orc.ctOrcNewAjax);
	// app.get('/ctOrderDel', MdRole.cterIsLogin, Order.ctOrderDel)

	// app.get('/ctOrders', MdRole.cterIsLogin, Order.ctOrders);
	// app.get('/ctOrdersAjax', MdRole.cterIsLogin, Order.ctOrdersAjax);
	// app.get('/ctOrdHis', MdRole.cterIsLogin, Order.ctOrdHis);
	// app.post('/ctOrdChangeSts', MdRole.cterIsLogin, postForm, Order.ctOrdChangeSts);
	// app.get('/ctOrderTicketing', MdRole.userIsLogin, Order.ctOrderTicketing);
	/* ----------- ordfir 根据 pd 或者 客户 查看销量 ----------- */
	// app.get('/ctOrdfirsPd', MdRole.cterIsLogin, Ordfir.ctOrdfirsPd);
	// app.get('/ctOrdfirsCt', MdRole.cterIsLogin, Ordfir.ctOrdfirsCt);
	// app.get('/ctOrdfirsCter', MdRole.cterIsLogin, Ordfir.ctOrdfirsCter);
};