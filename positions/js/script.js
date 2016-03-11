/* Author: Andrey Miskov */
$(document).ready(function(){
$(".position__card").each( function() {
  var rNum = (Math.random()*10)-2;
  $(this).css( {
    '-webkit-transform': 'rotate('+rNum+'2deg)',
    '-moz-transform': 'rotate('+rNum+'2deg)',
  } );
});
});

$('.position__link_active').fancybox({
	helpers:{
		overlay:{
			speedIn: 1000,
			speedOut: 100,
			opacity:0.6
		}
	},
	beforeShow: function() {
		$('.fancybox-wrap').css('visibility','hidden');
		// Title animation
		var $title = $(this.element).children('.position__title');
		$title
			.animate({
				'top': '10px'
				}, 150)
			.animate({
				'top': '0'
			}, 150);
	},
	afterShow:function () {
		// Card animation
		flipCardFace($(this.element).children('.position__card'));
		$('body').css('overflow','hidden');
	},
	beforeClose: function() {
		// Card return
		flipCardBack($(this.element).children('.position__card'));
		$('body').css('overflow','auto');
	}
});

function flipCardFace($card) {
	// Temporary #id for clonned card
	$card.attr('id', 'cloneShowed');

	var $cardClone = $card.clone();
	$cardClone
		.addClass('position__card_clone')
		.attr('id', 'cloneCard')
		.css({
			'top' : $card.offset().top - $(window).scrollTop() + 'px',
			'left': $card.offset().left + 'px'
		});

	$('body').append($cardClone);
	$cardClone.children('img')
		.animate({
			'width': 0,
			'height': '324px'
		}, 200, function(){
			$(this).
				attr('src', 'img/' + $card.data('card') + '.png')
				.animate({
					'width': '217px'
				}, 200);
		});
	$cardClone.animate({
		'top': $('.fancybox-wrap').offset().top - $(window).scrollTop() + 20 + 'px',
		'left': $('.fancybox-wrap').offset().left + 20 + 'px'
	}, 300, function(){
		$('.fancybox-wrap .clonned-card').html($cardClone);
	});

	$('.fancybox-wrap')
		.css({
			'opacity':0,
			'visibility':'visible'
		})
		.animate({
			'opacity':'1'
		}, 300);
}

function flipCardBack() {
	var $cardClone = $('.fancybox-wrap .clonned-card .position__card');
	$cardClone.css({
		'top': $cardClone.offset().top - $(window).scrollTop() + 'px',
		'left': $cardClone.offset().left + 'px'
	});
	$('body').append($cardClone);

	var $origCard = $('#cloneShowed');

	$cardClone.children('img').animate({
		'width': 0
	}, 100, function(){
			$(this).
				attr('src', 'img/card_back.png')
				.animate({
					'width': '154px',
					'height': '229px'
				}, 100);
	});

	$cardClone.animate({
		'top': $origCard.offset().top - $(window).scrollTop() + 'px',
		'left': $origCard.offset().left + 'px'
	}, 300, function(){
		$origCard.attr('id', false);
		$cardClone.remove();
	});

}

function flipCard($card) {
	var currentClass, newClass,
		curLinkClass, newLinkClass;

	var $origCard = $card;

	$card = $card.clone();

	$origCard.parent().prepend($card);

	// Current card state and new card state
	if ($card.hasClass('position__card_back')) {
		currentClass = 'position__card_back';
		newClass = 'position__card_front';

		curLinkClass = 'position__link_active';
		newLinkClass = 'position__link_off';
	}
	else {
		currentClass = 'position__card_front';
		newClass = 'position__card_back';

		curLinkClass = 'position__link_off';
		newLinkClass = 'position__link_active';
	}

	// Turn card
	var cardOffset = $card.offset();
	var pointL = $('.fancybox-wrap').offset().left;
	var pointT = $('.fancybox-wrap').offset().top;

	console.log(pointT);

	var kTop = (cardOffset.top > pointT) ? -1 : 1;

	$card
		.animate({
			'top':20 + (cardOffset.top - pointT) * kTop + 'px',
			'left':  pointL - cardOffset.left + 20 + 'px',
			'width':0
		}, 300, function () {
			$card
				.removeClass(currentClass)
				.addClass(newClass)
				.animate({'width':'213px' }, 100);
			$('.fancybox-wrap').css({
				'opacity':0,
				'visibility':'visible'
			})
				.animate({
					'opacity':'1'
				})
		});
	$card.parent('a')
		.removeClass(curLinkClass)
		.addClass(newLinkClass);
}



/*
	function flipCard($card) {
	var currentClass, newClass,
		curLinkClass, newLinkClass;

	// Current card state and new card state
	if ($card.hasClass('position__card_back')) {
		currentClass = 'position__card_back';
		newClass = 'position__card_front';

		curLinkClass = 'position__link_active';
		newLinkClass = 'position__link_off';
	}
	else {
		currentClass = 'position__card_front';
		newClass = 'position__card_back';

		curLinkClass = 'position__link_off';
		newLinkClass = 'position__link_active';
	}

	// Turn card
	var cardOffset = $card.offset();
	var pointL = $('.fancybox-wrap').offset().left;
	var pointT = $('.fancybox-wrap').offset().top;

	console.log(pointT);

	var kTop = (cardOffset.top > pointT) ? -1 : 1;

	$card
		.animate({
			'top':20 + (cardOffset.top - pointT) * kTop + 'px',
			'left':  pointL - cardOffset.left + 20 + 'px',
			'width':0
		}, 300, function () {
			$card
				.removeClass(currentClass)
				.addClass(newClass)
				.animate({'width':'213px' }, 100);
			$('.fancybox-wrap').css({
				'opacity':0,
				'visibility':'visible'
			})
				.animate({
					'opacity':'1'
				})
		});
	$card.parent('a')
		.removeClass(curLinkClass)
		.addClass(newLinkClass);
}
	*/


/**
 * Images preloader
 * @param arrayOfImages
 *
 * // Usage:
preload([
 'img/imageName.jpg',
 'img/anotherOne.jpg',
 'img/blahblahblah.jpg'
 ]);
 */
function preload(arrayOfImages) {
//    $('body').append('<div id="preloadImgs"/>');
    $(arrayOfImages).each(function () {
//        $('#preloadImgs').append('<img src="'+this+'"/>');
        $('<img/>')[0].src = this;
    });
}

function insertQuote(){
	var quotes = [
		'No Hookers, just black jack',
		'Lorem ipsum dolor sit amet',
		'Just Dutch it!'
	];
	return quotes[Math.floor(Math.random() * quotes.length)];
}