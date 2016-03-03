/* namespace */
var controller = controller || {};

controller.MediaController = (function(){
	function MediaController( container ){
		this._container = $(container);
		this._source = "http://fast.player.liquidplatform.com/pApiv2/embed/1f9a5d00db56b3c3020b6ac3dd693e12?streamName=acerpTvEscolaABR&autoStart=true&alternateLive=";
	}

	MediaController.prototype.change = function( type, url ){
		switch (type) {
    		case "m3u8":
        		this.changeIframeUrl(url);
        		break;
		}
	}

	MediaController.prototype.changeIframeUrl = function(url){
		this._container.find('iframe').attr({
			'src': this._source + url
		});
	}

	return MediaController;
})();
