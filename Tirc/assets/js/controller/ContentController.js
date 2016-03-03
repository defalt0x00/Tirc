/* namespace */
var controller = controller || {};

controller.ContentController = (function(){
	function ContentController( container ){
		this._container = $(container);
		this._logoFolder = 'assets/img/canais/';
		this._data = [];
		this.load( this.pipeline );
		this._mediaController = new controller.MediaController('.media-content');
	}

	ContentController.prototype.load = function(callback){
		var self = this;
		$.ajax({
			url: "./assets/json/media.json",
		}).done(function(response) {
			self._data = response
			callback(self);
		});
	}

	ContentController.prototype.pipeline = function(self){
		self.buildChannels();
		self.attatchEvents();
	}

	ContentController.prototype.buildChannels = function(){
		var channels = this._data.channels;
		for(var i = 0; i < channels.length; i++){
			var type = channels[i].type,
				name = channels[i].name,
				logo = channels[i].logo,
				url = channels[i].url;

			var _item = $('<li/>');
			var _link = $('<a/>').attr({
				'href': 'javascript:void(0);',
				'data-type': type,
				'data-name': name,
				'data-url': url,
			});
			var _img = $('<img/>').attr({
				'src': this._logoFolder + logo,
				'alt': name
			});

			var _text = $('<span/>').text(name);

			_link.append(_img, _text);
			_item.append(_link);

			this._container.append(_item);
		}
	}

	ContentController.prototype.attatchEvents = function(){
		var self = this;
		$('.channels-list a').on('click', function(e){
            e.preventDefault();
            var _el = $(e.currentTarget),
                url = _el.data('url');
            self._mediaController.change('m3u8', url);  
        });
	}

	return ContentController;
})();