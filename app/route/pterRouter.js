let Ticket = require('../controllers/user/pter/ticket')

let MdRole = require('../middle/middleRole');

module.exports = function(app){
	app.get('/pter', MdRole.pterIsLogin, Ticket.pter);

	// Ticket     --------------------------------------------------------------------
	app.get('/ptTicket', MdRole.pterIsLogin, Ticket.ptAutoTk, Ticket.ptTicket)
	app.get('/ptChangeTicket', MdRole.pterIsLogin, Ticket.ptChangeTicket)// 为了打印后刷新用的
};