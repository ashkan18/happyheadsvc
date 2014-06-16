var HappyHead = (function(document, window, $) {

	var _hh = {};

	_hh.init = function() {
		console.log('init');
		console.log($('.inbox'));

		//window.addEventListener('push', function(e) { _pushCallback(e); });

	},

	_hh.initIndexPage = function() {
		setTimeout(function() {
			document.location = 'inbox.html'

		}, 2000);

		console.log('add push');
		console.log(window);

	},


	_hh.initMsgPage = function() {
		console.log('msg init');
		progressJs(".progress-bar").start().autoIncrease(2, 100).onbeforeend(function() {
			console.log('progress end');
		});

		// callback not working settimout replacement
		setTimeout(function() {
			console.log('show button');
			$(".msg-cell").css('height','0px');
			$(".msg-cell").css('padding','0px');
			$(".msg-cell").css('opacity','0');
			$(".sending").css('height','50px');
			$(".sending").css('opacity','1');
			$('.message .camera').css('opacity','1');
			progressJs(".progress-bar").start().set(1).autoIncrease(2, 100).onbeforeend(function() {
				console.log('progress end');
			});

		}, 5000);


		//progressJs.onbeforeend(function() {
		//	console.log('progress end');
		//})
		
	}
/*
	_hh.pushCallback = function(page, e) {
		console.log('push callback');

		console.log(e);
		if(page=='inbox') {
			setTimeout(function() {
				_hh.initMsgPage();

			}, 2000);
		}
	}
*/

	return _hh;


})(document, window, Zepto);


//HappyHead.init();