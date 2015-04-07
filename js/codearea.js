window.app    = window.app    || {}
window.app.ui = window.app.ui || {}

$(window).load(function() {
	window.app.ui.codearea = {
		html: CodeMirror($('.codearea.html').get(0), {
			lineNumbers: true,
			value: window.app.config.codearea.html,
			mode:  'text/html'
		}),
		css: CodeMirror($('.codearea.css').get(0), {
			lineNumbers: true,
			value: window.app.config.codearea.css,
			mode:  'css'
		}),
		js: CodeMirror($('.codearea.js').get(0), {
			lineNumbers: true,
			value: window.app.config.codearea.js,
			mode:  'javascript'
		})
	}
});
