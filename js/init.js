$(window).load(function() {
	var timeout = window.app.config.initTimeout || 500;

	window.app.ui.result.children('label')
		.trigger('click');

	window.app.ui.wrapper
		.css('display', 'none')
		.css('visibility', 'visible')
		.fadeIn(timeout);
	window.app.ui.ajax
		.fadeOut(timeout);
});
