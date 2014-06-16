var HappyHead = (function(document, $) {

	var _hh = {};

	_hh.init = function() {
		console.log('init');
		console.log($('.inbox'));

	},

	_hh.initIndexPage = function() {
		setTimeout(function() {
			document.location = 'inbox.html'

		}, 2000);
	},


	_hh.initMsgPage = function() {
		console.log('msg init');
		progressJs(".progress-bar").start().autoIncrease(5, 100).onbeforeend(function() {
			console.log('progress end');
		});

		// callback not working settimout replacement
		setTimeout(function() {
			console.log('show button');

		}, 2000);

		//progressJs.onbeforeend(function() {
		//	console.log('progress end');
		//})
		
	}


	return _hh;


})(document, Zepto);


//HappyHead.init();