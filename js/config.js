// to do - replace cookie with local storage (if supported)
// save html,js,css code to local storage (if supported)

window.app        = window.app || {}
window.app.config = {
	initTimeout: 500,
	handler: {
		horizontal: {
			left: 2,
			right: 2
		},
		vertical: 2
	},
	codearea: {
		html: '<!doctype html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="UTF-8" />\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />\n\t\t<meta name="robots" content="noindex, nofollow" />\n\t\t<title>New HTML5 document</title>\n\t\t<scr' + 'ipt src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></scr' + 'ipt>\n\t\t<scr' + 'ipt src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></scr' + 'ipt>\n\t\t<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/smoothness/jquery-ui.css" />\n\t</head>\n\t<body>\n\t\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, sequi, error tempora sed dolores ipsum dolore autem inventore doloremque modi deserunt hic suscipit necessitatibus natus placeat veritatis consectetur saepe quo.</p>\n\t\t<p>Facere, placeat, dignissimos, voluptatem et enim quam beatae magnam autem sed iusto molestiae quo repellat perferendis veritatis illo aliquid totam nihil nesciunt dolorem minus quasi repellendus dolor animi aliquam voluptatibus.</p>\n\t\t<p>Possimus, laborum, quas, architecto, eaque consectetur nihil saepe inventore fuga illo vel beatae impedit aliquam blanditiis natus laboriosam omnis commodi dolorum ad quibusdam enim eius eos numquam aliquid ut repudiandae.</p>\n\t\t<p>Velit, at, minus, vitae minima officia quasi pariatur voluptate explicabo reprehenderit laborum quas blanditiis dicta necessitatibus placeat labore doloremque repudiandae nesciunt deleniti ut quis! Provident, hic repellendus ullam ipsam autem?</p>\n\t</body>\n</html>\n',
		css: 'body { margin: 24px; padding: 0; }\n',
		js: ';(function($) {\n\t$(document).ready(function(event) {\n\t\t\/\/do something here\n\t});\n\n\t$(window).load(function(event) {\n\t\t\/\/do something here\n\t});\n\n})(jQuery);'
	}
}

window.app.config = $.extend({}, window.app.config, {
	_read: function(name) {
		var arr = document.cookie.split(';');

		for (var i = 0; i < arr.length; i += 1) {
			var cookie = arr[i].replace(/^ /g, '');
			var match  = cookie.match(new RegExp('^' + name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\=(.+)$'));

			if (match && match[1]) {
				return match[1];
			}
		}

		return null;
	},
	_create: function(name, value, days) {
		var expires = '';

		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

			expires = '; expires=' + date.toGMTString();
		}

		document.cookie = name + '=' + value + expires + '; path=/';
	},
	_delete: function(name) {
		window.app.cookies.create(name, '', -1);
	}
});

$(document).ready(function() {
	var handler;
	try {
		handler = window.app.config._read('fiddle.handler');
		handler = $.parseJSON(handler);
	}
	catch(e) {
		handler = window.app.config.handler;
	}

	window.app.config.handler = $.extend({}, window.app.config.handler, handler);
});
