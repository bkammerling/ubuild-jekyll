
//set animation timing
var animationDelay = 2500,
	//loading bar effect
	barAnimationDelay = 3800,
	barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
	//letters effect
	lettersDelay = 50,
	//type effect
	typeLettersDelay = 150,
	selectionDuration = 500,
	typeAnimationDelay = selectionDuration + 800,
	//clip effect
	revealDuration = 600,
	revealAnimationDelay = 1500;

initHeadline();

function initHeadline() {
	//initialise headline animation
	animateHeadline($('.cd-headline'));
}
function animateHeadline($headlines) {
  var duration = animationDelay;
  $headlines.each(function(){
    var headline = $(this);
    if(headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (!headline.hasClass('type') ) {
				//assign to .cd-words-wrapper the width of its longest word
				var words = headline.find('.cd-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
			};
    //trigger animation
    setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
  });
}

function switchWord($oldWord, $newWord) {
	$oldWord.removeClass('is-visible').addClass('is-hidden');
	$newWord.removeClass('is-hidden').addClass('is-visible');
}

function hideWord($word) {
		var nextWord = takeNext($word);

    if($word.parents('.cd-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
    } else {
      switchWord($word, nextWord);
      setTimeout(function(){ hideWord(nextWord) }, animationDelay);
    }

}
function takeNext($word) {
	return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}
