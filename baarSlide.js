function baarSlider()
{
	this.images = null;
	this.currentImage = null;
	this.selector = null;

	// this is just an empty gif
	this.loadingImage = 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==';

	this.init = function(){

		this.images = $(this.selector);

		$('#baarslide_slider').append($('<img alt="placeholder" src="' + this.loadingImage + '"/>'));

		var baarSlider = this;

		this.images.click(function(e){
			e.preventDefault();
			baarSlider.openSlide($(this));
		});

		$('#baarslide_navigation_prev').click(function(e){
			baarSlider.showPreviousImage();
		});

		$('#baarslide_navigation_next').click(function(e){
			baarSlider.showNextImage();
		});

		$('#baarslide_navigation_close').click(function(e){
			baarSlider.closeGallery();
		});
		
		$('#baarslide_navigation_info').click(function(e){
			baarSlider.showInfo();
		});

		$("#baarslide_slider").touchwipe({
			wipeLeft: function() { baarSlider.showNextImage(); },
			wipeRight: function() { baarSlider.showPreviousImage(); },
			wipeUp: function() {},
			wipeDown: function() {},
			min_move_x: 10,
			min_move_y: 10,
			preventDefaultEvents: true
		});

		$(document).keydown(function(e) {
			switch(e.which) {
				case 37: // left
					baarSlider.showPreviousImage();
					break;
				case 38: // up
					baarSlider.showPreviousImage();
					break;
				case 39: // right
					baarSlider.showNextImage();
					break;
				case 40: // down
					baarSlider.showNextImage();
					break;
				case 27: // esc
					baarSlider.closeGallery();
					break;

				default: return; 
			}
			e.preventDefault(); // prevent the default action
		});

	}

	this.hasPreviousImage = function () {
		return this.currentImage.prev().length > 0;
	}

	this.hasNextImage = function () {
		return this.currentImage.next().length > 0;
	}

	this.showNextImage = function () {
		if (this.hasNextImage()) {
			this.openSlide(this.currentImage.next());
		}
	}

	this.showPreviousImage = function () {
		if (this.hasPreviousImage()){
			this.openSlide(this.currentImage.prev());
		}
	}

	this.showInfo = function()
	{
		if (this.hasInfo())
		{
            alert(this.currentImage.find('span.info').text());
		}
	}

	this.hasInfo = function()
	{
        return this.currentImage.find('span.info').length > 0;
	}

	this.closeGallery = function()
	{
		this.setLoadingImage();

		$("#baarslide_overlay").hide();
	}

	this.setLoadingImage = function()
	{
		$('#baarslide_overlay #baarslide_slider img').attr('src', this.loadingImage);
	}

	this.openSlide = function(currentImage)
	{
		this.currentImage = currentImage;

		$("#baarslide_overlay").show();

		/* use the href attribute from the link as src for the slide img */
		$('#baarslide_overlay #baarslide_slider img').attr('src', currentImage.attr('href'));

		/* default styles for the navigation */
		$("#baarslide_navigation_next").css({'opacity':1, 'cursor': 'pointer'});
		$("#baarslide_navigation_prev").css({'opacity':1, 'cursor': 'pointer'});
		$("#baarslide_navigation_info").css({'opacity':1, 'cursor': 'pointer'});

		/* last image is loaded */
		if (!this.hasNextImage()) {
			$("#baarslide_navigation_next").css({'opacity':0.5, 'cursor': 'default'});
		}

		/* first image is loaded */
		if (!this.hasPreviousImage()) {
			$("#baarslide_navigation_prev").css({'opacity':0.5, 'cursor': 'default'});
		}

		/* current image has info */
        if (!this.hasInfo()) {
            $("#baarslide_navigation_info").css({'opacity':0.0, 'cursor': 'default'});
        }
	}
}

$( document ).ready(function() {
	baarSlider = new baarSlider();
	baarSlider.selector = '#image-gallery div a';
	baarSlider.init();
});
