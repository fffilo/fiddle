window.app    = window.app    || {}
window.app.ui = window.app.ui || {}

$(document).ready(function() {
	window.app.ui = {
		wrapper: $('.wrapper'),
		ajax: $('.ajax'),
		handler: {
			horizontal: {
				left: $('.column.left').children('.handler.horizontal'),
				right: $('.column.right').children('.handler.horizontal')
			},
			vertical: $('.handler.vertical'),
		},
		codearea: {
			html: false,
			css: false,
			js: false
		},
		result: $('.container.result')
	}
});
