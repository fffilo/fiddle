$(document).ready(function() {
	window.app.ui.result.children('label')
		.on('click', function(event) {
			var html = window.app.ui.codearea.html.getValue();
			html = html.replace(/(^|\s)(<\/head>)/, '<style>\n' + window.app.ui.codearea.css.getValue() + '</style>\n' + '$1$2')
			html = html.replace(/(^|\s)(<\/head>)/, '<script>\n' + window.app.ui.codearea.js.getValue() + '</script>\n' + '$1$2')

			var iframe  = window.app.ui.result.children('iframe').get(0);
			var content = iframe.contentWindow.document.open('text/html');
			content.write(html);
			content.close();
		});
});
