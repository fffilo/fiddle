$(document).ready(function() {
	var _fix_gutter = function() {
		$('.CodeMirror-gutters').each(function() {
			$(this).css('min-height', $(this).parent().height() + 'px');
		});
	}

	var _set_config = function() {
		var handler = window.app.ui.handler.vertical
			.add(window.app.ui.handler.horizontal.left)
			.add(window.app.ui.handler.horizontal.right)

		$(handler).each(function() {
			var direction = $(this).hasClass('horizontal') ? 'horizontal' : 'vertical';
			var size      = direction == 'horizontal' ? 'Height' : 'Width';

			var value0 = $(this).parent()[size.toLowerCase()]() - ($(this)['outer' + size]());
			var value1 = $(this).parent().children('.column,.container').first()['outer' + size]();
			var value2 = $(this).parent().children('.column,.container').last()['outer' + size]();

			value1 = value1 / value0 * 100;
			value2 = 100 - value1;

			if ($(this).hasClass('horizontal') && $(this).parent().hasClass('left'))    window.app.config.handler.horizontal.left  = Math.round(100 / (value1 / 100)) / 100;
			if ($(this).hasClass('horizontal') && $(this).parent().hasClass('right'))   window.app.config.handler.horizontal.right = Math.round(100 / (value1 / 100)) / 100;
			if ($(this).hasClass('vertical')   && $(this).parent().hasClass('wrapper')) window.app.config.handler.vertical         = Math.round(100 / (value1 / 100)) / 100;
		});

		window.app.config._create('fiddle.handler', JSON.stringify(window.app.config.handler), 365);
	}

	var _mousedown = function(event) {
		if (event.which == 1) {
			var element = {
				current : $(this),
				first   : $(this).parent().children('.column,.container').first(),
				last    : $(this).parent().children('.column,.container').last()
			}

			var data = {
				element: $(this),
				direction: $(this).hasClass('horizontal') ? 'horizontal' : 'vertical',
				position: {
					left: $(this).position().left,
					top: $(this).position().top
				},
				offset: {
					left: $(this).offset().left,
					top: $(this).offset().top
				},
				start: {
					left: event.pageX,
					top: event.pageY
				},
				move: {
					left: event.pageX,
					top: event.pageY
				},
				resize: [
					{
						element: element.first,
						position: {
							left: element.first.position().left,
							top: element.first.position().top
						},
						offset: {
							left: element.first.offset().left,
							top: element.first.offset().top
						},
						size: {
							width: element.first.width(),
							height: element.first.height()
						},
						sizeOuter: {
							width: element.first.outerWidth(),
							height: element.first.outerHeight()
						},
						sizeMin: {
							width: element.first.css('min-width').replace(/px/, '') * 1,
							height: element.first.css('min-height').replace(/px/, '') * 1,
						},
						sizeMax: {
							width: element.first.css('max-width').replace(/px/, '') * 1,
							height: element.first.css('max-height').replace(/px/, '') * 1,
						}
					},
					{
						element: element.last,
						position: {
							left: element.last.position().left,
							top: element.last.position().top
						},
						offset: {
							left: element.last.offset().left,
							top: element.last.offset().top
						},
						size: {
							width: element.last.width(),
							height: element.last.height()
						},
						sizeOuter: {
							width: element.last.outerWidth(),
							height: element.last.outerHeight()
						},
						sizeMin: {
							width: element.last.css('min-width').replace(/px/, '') * 1,
							height: element.last.css('min-height').replace(/px/, '') * 1,
						},
						sizeMax: {
							width: element.last.css('max-width').replace(/px/, '') * 1,
							height: element.last.css('max-height').replace(/px/, '') * 1,
						}
					}
				],
				ratio: false
			}

			var size   = data.direction == 'horizontal' ? 'Height' : 'Width';
			var value1 = data.resize[0].element['outer' + size]();
			var value2 = data.element.parent()[size.toLowerCase()]() - value1 - data.element['outer' + size]();

			data.resize[0].element['outer' + size](value1);
			data.resize[1].element['outer' + size](value2);

			$(document)
				.data('fiddle.resize', data)
				.on('mousemove', _mousemove)
				.on('mouseup', _mouseup);

			$('html')
				.removeClass('fiddle-resize')
				.removeClass('fiddle-resize-vertical')
				.removeClass('fiddle-resize-horizontal')
				.addClass('fiddle-resize')
				.addClass('fiddle-resize-' + data.direction);

			//_set_config();
			//_fix_gutter();
		}
	}

	var _mousemove = function(event) {
		var data  = $(document).data('fiddle.resize');

		data.move = {
			left: event.pageX,
			top: event.pageY
		}

		var size     = data.direction == 'horizontal' ? 'Height' : 'Width';
		var position = data.direction == 'horizontal' ? 'top'    : 'left';
		var shift    = data.start[position] - data.move[position];

		var value1 = data.resize[0].size[size.toLowerCase()] - shift;
		if ( ! isNaN(data.resize[0].sizeMin[size.toLowerCase()]) && value1 < data.resize[0].sizeMin[size.toLowerCase()]) {
			value1 = data.resize[0].sizeMin[size.toLowerCase()];
		}

		var value2 = data.element.parent()[size.toLowerCase()]() - value1 - data.element['outer' + size]();
		if ( ! isNaN(data.resize[1].sizeMin[size.toLowerCase()]) && value2 < data.resize[1].sizeMin[size.toLowerCase()]) {
			value2 = data.resize[0].sizeMin[size.toLowerCase()];
			value1 = data.element.parent()[size.toLowerCase()]() - value2 - data.element['outer' + size]();
		}

		data.resize[0].element['outer' + size](value1);
		data.resize[1].element['outer' + size](value2);

		_fix_gutter();
	}

	var _mouseup = function(event) {
		var data = $(document).data('fiddle.resize');

		var size   = data.direction == 'horizontal' ? 'Height' : 'Width';
		var value0 = data.element.parent()[size.toLowerCase()]() - (data.element['outer' + size]());
		var value1 = data.resize[0].element['outer' + size]();
		var value2 = data.resize[1].element['outer' + size]();

		value1 = value1 / value0 * 100;
		value2 = 100 - value1;

		data.element.data('fiddle-ratio', Math.round(100 / (value1 / 100)) / 100);

		_set_config();
		_fix_gutter();

		$(document)
			.removeData('fiddle.resize')
			.unbind('mousemove')
			.unbind('mouseup');

			$('html')
				.removeClass('fiddle-resize')
				.removeClass('fiddle-resize-vertical')
				.removeClass('fiddle-resize-horizontal');
	}

	var _resize = function(event) {
		var handler = window.app.ui.handler.vertical
			.add(window.app.ui.handler.horizontal.left)
			.add(window.app.ui.handler.horizontal.right)

		$(handler).each(function() {
			var element = {
				current : $(this),
				first   : $(this).parent().children('.column,.container').first(),
				last    : $(this).parent().children('.column,.container').last()
			}

			var direction = $(element.current).hasClass('horizontal') ? 'horizontal' : 'vertical';
			var size      = direction == 'horizontal' ? 'Height' : 'Width';

			var min1      = element.first.css('min-width').replace(/px/, '') * 1;
			var min2      = element.last.css('min-width').replace(/px/, '') * 1;

			var value0 = $(element.current).parent()[size.toLowerCase()]() - $(element.current)['outer' + size]();
			var value1 = 100 / ($(element.current).data('fiddle-ratio') || 2);
			var value2 = 100 / ($(element.current).data('fiddle-ratio') || 2);

			value1 = (value1 / 100) * value0;
			if ( ! isNaN(min1) && value1 < min1) {
				value1 = min1;
			}

			value2 = value0 - value1;
			if ( ! isNaN(min2) && value2 < min2) {
				value2 = min2
				value1 = value0 - value2;
			}

			element.first['outer' + size](value1);
			element.last['outer' + size](value2);

		});

		//_set_config();
		_fix_gutter();
	}

	window.app.ui.handler.horizontal.left.on('mousedown', _mousedown);
	window.app.ui.handler.horizontal.right.on('mousedown', _mousedown);
	window.app.ui.handler.vertical.on('mousedown', _mousedown);

	window.app.ui.handler.horizontal.left.data('fiddle-ratio', window.app.config.handler.horizontal.left || 2);
	window.app.ui.handler.horizontal.right.data('fiddle-ratio', window.app.config.handler.horizontal.right || 2);
	window.app.ui.handler.vertical.data('fiddle-ratio', window.app.config.handler.vertical || 2);

	$(window)
		.on('resize', _resize)
		.trigger('resize');
});

$(window).load(function() {
	$(window)
		.trigger('resize');
});
