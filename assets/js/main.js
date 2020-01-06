AOS.init({
  // Global settings:
  duration: 600,
  once: true,
  disable: 'mobile',
  startEvent: 'load'
});

window.addEventListener('load', function() {
  AOS.refresh();
});

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

var videoPlayer;
$(document).ready(function() {
  videoPlayer = {
    player: null,
    init: function() {
      this.player = new Plyr('#player', {
        controls: ['play','progress','volume','fullscreen'],
        clickToPlay: true,
        hideControls: true,
        resetOnEnd: true,
        fullscreen: { enabled: true, fallback: 'force', iosNative: true }
      });
      this.player.on('ready', event => {
        if($(".filmmodal").length == 0) {
          this.player.toggleControls(false);
          //console.log('true');
        } else {
          $("#player").css('pointerEvents', 'auto');
          console.log('false');
        }
      });
      this.player.on('ended', event => {
        this.player.restart();
      });
      $("#video-btn, .plyr__custom-starter").click(function() {
        videoPlayer.startPlay();
        $("#player").css('pointerEvents', 'auto');
        $(this).fadeOut();
        localStorage.setItem('lastVideo', pagetitle);
        localStorage.setItem('lastVideoTime', new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',',''));
      });
    },
    startPlay: function() {
      if($(".filmmodal").length == 0) {
        this.player.toggleControls();
      }
      this.player.play();
    }
  }
  videoPlayer.init();
});


var slider = {
  init: function(target, config) {
    $(target).slick(config);
    $(".picture-slider__menu-image").click(function(){
      $(target).slick('slickGoTo', $(this).index());
    });
    $(target).on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $(".picture-slider__menu-image:nth-child("+(nextSlide+1)+")").addClass('current').siblings().removeClass('current');
    });
  }
};
if(pageref == 'culture') {
  slider.init(".picture-slider", {
    dots: false,
    lazyLoad: 'ondemand',
    prevArrow:
      '<span class="slider__arrow slider__arrow--prev"><img src="/uploads/global/arrow-left.svg" alt="Prev"/></span>',
    nextArrow:
      '<span class="slider__arrow slider__arrow--next"><img src="/uploads/global/arrow-right.svg" alt="Next"/></span>'
  });
}

var menu = {
  submenu: $(".nav-full"),
  init: function() {
    var btn = $(".header__hamburger");
    //var menu = $(".navbar-nav");
    var navlink = $("body:not(.careers) .navbar-nav .nav-link");
    var hideBtn = $(".nav-full__overlay");
    this.toggleMenu(btn, this.submenu);
    this.showMenu(navlink, this.submenu);
    this.hideSetup(hideBtn, this.submenu);
  },

  toggleMenu: function(target, submenu) {
    target.on("click", function(e) {
      submenu.toggleClass("is-active");
      target.toggleClass("is-active");
      $(".navbar-nav").toggleClass("is-active");
      $('.nav-item.is-active').removeClass('is-active');
      //(e.target).addClass("is-active").siblings().removeClass("is-active");
      $('body').toggleClass('mobmenu-active');

    });
  },

  showMenu: function(target, submenu) {
    target.on("click", function(e) {
      e.preventDefault();
      var clickedLink = $(e.target);
      if(clickedLink.parent().hasClass("is-active")) {
        menu.hideMenu(clickedLink.parent(), menu.submenu);
      } else {
        submenu.addClass("is-active");
        $(".navbar-nav").addClass("is-active");
        clickedLink.parent().addClass("is-active").siblings().removeClass("is-active");
        var identifier = clickedLink.data('target');
        $("#" + identifier).addClass('is-active').siblings().removeClass('is-active');
        $(".header__hamburger").addClass("is-active");;
      }
    });
  },

  hideSetup: function(target, submenu) {
    target.on("click", function(e) {
      menu.hideMenu(target, submenu);
    });
  },

  hideMenu: function(target, submenu) {
    if(target) target.removeClass("is-active");
    $('.nav-item').removeClass("is-active");
    submenu.removeClass("is-active");
    $(".header__hamburger").removeClass("is-active");
    $(".navbar-nav").removeClass("is-active");
  }
};

menu.init();


var myLazyLoad = new LazyLoad({
    elements_selector: "img[data-src]",
    callback_load: function () {
      AOS.refresh();
    }
});
var myLazyLoad2 = new LazyLoad({
    elements_selector: ".lazy"
});


var form = {
  init: function() {
    $('input, textarea, select').focus(function(){
      if($(this).parents('.form-group')) {
        $(this).parents('.form-group').addClass('focused');
      }
    });
    $('input, textarea').keyup(function(){
      var inputValue = $(this).val();
      if ( inputValue == "" ) {
        $(this).removeClass('filled');
        //$(this).parents('.form-group').removeClass('focused');
      } else {
        $(this).addClass('filled');
        if($(this)[0].checkValidity()) {
          $(this).parents('.form-group').removeClass('invalid').addClass('valid');
        } else {
          $(this).parents('.form-group').removeClass('valid').addClass('invalid');
        }
      }
    });
    $('input, textarea').blur(function(){
      var inputValue = $(this).val();
      if ( inputValue == "" ) {
        $(this).parents('.form-group').removeClass('focused');
      }
    });
  },

  submit: function(contactForm) {
    var postURL = contactForm.attr('action');
    //console.log(contactForm.serialize());
    var data = form.serializeObject(contactForm);
    var label = form.conversionLabels[data.subject];

    /* WMS subject / conversion label stuff removed 02/12/19 - must add back with event forms */

    // Google tag 'formSubmitted' conversion event for "Google Ad Conversion" + analytics B2BLead event
    dataLayer.push({ 'event': 'formSubmitted', 'formSubject': data.subject, 'conversionLabel': label });

    if(localStorage.getItem('lastBlog')) {
      data.lastBlog = localStorage.getItem('lastBlog');
      data.lastBlogTime = localStorage.getItem('lastBlogTime');
    }
    if(localStorage.getItem('lastVideo')) {
      data.lastVideo = localStorage.getItem('lastVideo');
      data.lastVideoTime = localStorage.getItem('lastVideoTime');
    }
    var capitalizedName = data.name.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
      return txtVal.toUpperCase();
    });
    data.name = capitalizedName;
    //console.log(data);

    $.ajax({
      url: postURL,
      method: "POST",
      data: data,
      dataType: "json",
      headers: {
        "Accept": "application/json"
      }
    }).done(function (data) {
      contactForm.find(".form-feedback").removeClass('hidden');
      contactForm.trigger("reset");
      contactForm.find('.form-group').removeClass('focused').removeClass('valid');
      $('.select2-init').select2('destroy');
      form.initializeSelect2('.select2-init');
      $("#form-submit").attr("disabled", false);
      console.log('ajax done success', data);
    }).fail(function (error) {
      console.log(error);
      contactForm.find(".form-feedback").removeClass('hidden').text('There was a problem sending your message, please try again or ping us an email at ben.kammerling@wundermobility.com.');
      $("#form-submit").attr("disabled", false);
    });


  },

  serializeObject: function($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function(n, i){
        if(indexed_array[n['name']]) {
          indexed_array[n['name']] = indexed_array[n['name']] + ", " + n['value'];
        } else {
          indexed_array[n['name']] = n['value'];
        }
    });
    // Add non-selected select elements with empty values
    var hidden = $("#main-contact").find('.form-group:hidden select:not(#subject-field), .form-group:hidden input');
    hidden.each(function() {
      if($(this).attr('name') != 'subject') {
        indexed_array[$(this).attr('name')] = "";
      }
    })
    return indexed_array;
  },

  initializeSelect2: function(selector) {
    $(selector).select2({
      minimumResultsForSearch: Infinity,
      placeholder: $(this).attr("placeholder")
    });
    $(selector).on('select2:select', function (e) {
      $(this).siblings('.select2').addClass('selected');
    });
  },

  htmlValidityCheck: function($form) {
    $form[0].checkValidity();
    return $form[0].reportValidity();
  },
  customValidityChecks: function($form) {
    if($form.parents('.modal').length > 0) return true;
    $form.find(".select2:visible.selected").popover('dispose');
    if($form.find(".select2:visible:not(.selected)").length > 0) {
      console.log('incomplete select2');
      $form.find(".select2:visible:not(.selected)").popover({
        content: "Please make a selection",
      }).popover('show');
      return false;
    } else {
      return true;
    }
  },
  conversionLabels: {
    'Wunder Fleet': 'CBdyCIeLx5YBELDQutED',
    'Wunder Carpool': 'xgvvCOfR46QBELDQutED',
    'Wunder Shuttle': 'L0ZiCNDV46QBELDQutED',
    'Wunder Park': 'OgV9CMG_3qQBELDQutED',
    'Wunder Rent': '-Xc_CKWC7KQBELDQutED',
    'Wunder City': '0hWZCJeJ7KQBELDQutED',
    'WMS': 'NvWgCNzV46QBELDQutED'
  }
};

form.init();

function formSubmit(e) {
  e.preventDefault();
  $(e.target).attr("disabled", true);
  var $form = $(e.target).closest("form");
  if(form.htmlValidityCheck($form) && form.customValidityChecks($form)) {
    console.log('form clean');
    //form.submit($form);
    grecaptcha.ready(function() {
      grecaptcha.execute("6LeHSagUAAAAACPB5JfFS9ihSEbW-PJHqbBjlDgR", {action: "submission"}).then(function(token) {
        recaptchaSubmit(token);
      });
    });
  } else {
    console.log('form NOT clean');
    $(e.target).attr("disabled", false);
  }
}

function recaptchaSubmit(token) {
  //console.log(token);
  var $form = $("#captchaResponse").parents("form");
  $('#captchaResponse').val(token);
  form.submit($form);
}

/* Pull job list from Greenhouse and add filters etc */

var jobs = {
  filters: {
    location: '',
    departments: ''
  },
  init: function() {
    var currentJobsHtml;
    var urlParams = new URLSearchParams(window.location.search);
    var teamParam = urlParams.get('team');
    if(teamParam) {
      jobs.filters.departments = teamParam;
      $(".job-filter select.team-select").val(teamParam);
    }
    $.ajax({
      method: "GET",
      url: "https://boards-api.greenhouse.io/v1/boards/wunder/jobs?content=true"
    }).done(function (data) {
      jobs.jobArray = data.jobs;
      jobs.setupDropdowns();
      var filteredJobs = jobs.filterJobs();
      jobs.buildJobsList(filteredJobs)
    }).fail(function(error) {
      var errorMessageHTML = '<p>Could not connect with job board. Find our open positions <a href="https://boards.greenhouse.io/wunder/" target="_blank">here</a>.</p>';
      $(".job-list__listing").append(errorMessageHTML);
    });

    $(".job-filter select").change(function() {
      var filterType = $(this).data('type');
      jobs.filters[filterType] = $(this).val();
      var filteredJobs = jobs.filterJobs();
      jobs.buildJobsList(filteredJobs);
    });

  },
  buildJobsList: function(jobData = this.jobArray) {
    this.clear();
    var jobHTML = this.makeHTML(jobData);
    $(".job-list__listing").append(jobHTML);
  },
  jobArray: null,
  makeHTML: function(jobData = this.jobArray) {
    console.log(jobData);
    if(jobData.length < 1) return '<p>😳 Sorry, no positions currently available.</p>';
    var sortedJobs = jobData;
    var singleHTML = $(".job-list__item").clone().removeClass('hidden');
    var jobListHTML = "";
    for(var i = 0; i < sortedJobs.length; i++) {
      var job = sortedJobs[i];
      singleHTML.find(".job-title").text(job.title);
      if(job.departments[0].name == 'Analytics') {
        var jobCategory = 'Data';
      } else {
        jobCategory = job.departments[0].name;
      }
      singleHTML.find(".job-category").text(jobCategory);
      singleHTML.find(".job-title").attr('href', job.absolute_url);
      var location = job.location.name.indexOf("Wunder") == -1 ? job.location.name : job.location.name.replace("Wunder ", "").replace("Mobility ", "");
      singleHTML.find(".job-location").text(location);
      var content = $('<textarea />').html(job.content).text();
      if(content.split('</h3>').length > 2) content = content.split('</h3>')[1];

      singleHTML.find(".job-excerpt").text(this.strip(content).substring(0, 300)+"...");
      jobListHTML += singleHTML.wrap('<p/>').parent().html()

    } // end of for loop
    return jobListHTML;
  },
  filterJobs: function() {
    var filteredJobs = this.jobArray.filter(function(item) {
        //if(jobs.filters[key] == '') continue;
        if(item.departments[0].name.toLowerCase().indexOf(jobs.filters.departments) !== -1 && item.location.name.toLowerCase().indexOf(jobs.filters.location) !== -1) return true;
    });
    return filteredJobs;
  },
  setupDropdowns: function() {
    var locationDropdown = $(".job-list .location-select");
    this.jobArray.forEach(function(item) {
      var gotit = false;
      locationDropdown.children('option').each(function() {
        if($(this).val().toLowerCase() == item.location.name.toLowerCase()) gotit = true;
      });
      if(!gotit) {
        locationDropdown.append($('<option>', {
            value: item.location.name.toLowerCase(),
            text: item.location.name
        }));
      }
      //if(locationDropdown.children('option').value().toLowerCase()item.location.name)
    })
  },
  clear: function() {
    $(".job-list__listing .job-list__item:not(.hidden), .job-list__listing > p").remove();
  },
  strip: function(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
};
if(pageref == "jobs") jobs.init();


var accordion = {
  init: function() {
    // class 'accordion-title' not found 27/11/19
    $('.accordion-title').click(function() {
      $(this).parent().find('.accordion-content').slideToggle()
      $(this).toggleClass('active');
      if($(this).text() == 'Show more') {
        $(this).text('Show less')
      } else if($(this).text() == 'Show less') {
        $(this).text('Show more');
      }
    });
    $('.horizontal-accordion ion-icon, .horizontal-accordion .card').click(function(e) {
      var $card = $(this).closest('.card');
      $card.siblings().removeClass('expand');
      $card.addClass('expand');
    });
    $('.photo-accordion .collapsible').click(function(e) {
      var $card = $(this);
      $card.siblings().removeClass('show');
      $card.addClass('show');
    });
  }
}
accordion.init();


var maxItems = {
  init: function() {
    var classes = $('.max-items').attr('class').split(" ");
    console.log(classes);
    var ourClass = classes.filter((aClass)=>{
      if(aClass.indexOf('max--') != -1) return aClass;
    });
    var lastItem = ourClass[0].split('max--')[1];
    $('.max-items').children().slice(lastItem).wrapAll("<div class='accordion-content'></div>");
    $('.accordion-content').after("<a class='text-center accordion-title max-showmore'>Show more</a><hr class='light'>")
    accordion.init();
  }
}
if($(".max-items").length>0) maxItems.init();


var contentDropdown = {
  init: function() {
    $(".content-dropdown .content-dropdown__opener a, .content-dropdown .content-dropdown__link").click(function(e) {
      $(e.target).parents(".content-dropdown").toggleClass("active").find(".content-dropdown__content").slideToggle();
    })
  }
}
if($(".content-dropdown").length>0) contentDropdown.init();


var diversityMap = {
  init: function() {
    $(".diversity svg").click(function(evt) {
      diversityMap.onclick(evt);
    });

    $("#AR,#AU,#BA,#BG,#BR,#CA,#CD,#CN,#CO,#DE,#EG,#ES,#FR,#GB,#GT,#HN,#IT,#IN,#IR,#JP,#KR,#KZ,#LC,#MA,#MX,#NG,#NL,#PA,#PL,#PH,#PK,#PT,#PY,#RO,#RS,#RU,#SG,#SV,#SY,#TH,#TN,#TR,#TW,#TZ,#UA,#US,#VE,#ZA").hover(function() {
      $('.maptooltip').show();
      $('.maptooltip').text($(this).attr('title'));
    }, function() {
      $('.maptooltip').hide();
    })

    var tooltip = $('.maptooltip')[0];
    document.addEventListener('mousemove', fn, false);
    function fn(e) {
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
    }
  },

  onclick: function(evt) {
    var scaleAmount = 1.8;
    var $svg = $(".diversity svg")
    var x = evt.pageX - $svg.offset().left;
    var y = evt.pageY - $svg.offset().top;
    var centerX = $svg.width() / 2;
    var centerY = $svg.height() / 2;

    $svg.toggleClass('big');

    var transformX = centerX-(x);
    var transformY = centerY-(y);
    var newCss = 'translate(' + transformX + 'px ,' + transformY + 'px) scale(' + scaleAmount + ')'
    console.log(newCss);


    if($svg.css('transform').length > 5) {
      $svg.css('transform', 'none');
    } else {
      console.log('smaller');
      $svg.css('transform', newCss);
    }
  }

}
if(pageref == "culture") diversityMap.init();


var benefits = {
  init: function() {

    $(".cls-109, .grayoverlay, svg #map").hover(function() {
      $(".benefits svg").removeClass().addClass($(this).data('id'));
      $(".benefitstooltip").addClass("mouseover");
      $('.benefitstooltip').html($(this).data('title').toUpperCase());
    }, function() {
      $(".benefitstooltip").removeClass("mouseover");
      $(".benefits svg").removeClass();
    });

    var tooltip = $('.benefitstooltip')[0];
    $(".benefits svg").hover(function() {
        document.addEventListener('mousemove', fn, false);
    }, function() {
      document.removeEventListener('mousemove', fn, false);
    });

    function fn(e) {
      tooltip.style.left = e.pageX + 'px';
      tooltip.style.top = e.pageY - 80 + 'px';
    }
  }
}
if(pageref == "perks") benefits.init();


var scroller = {
  header: $("nav.absolute-header:not(.navbar-narrow)"),
  menuCta: $(".menu-item-cta"),
  init: function() {
    var raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
    var $window = $(window);
    if(pageref == "rent") {
      this.initPath();
      var pathRect = scroller.path.getBoundingClientRect();
    }
    var lastScrollTop = $window.scrollTop();
    if(raf) {
      loop();
      scroller.scroll(lastScrollTop, pathRect);
    }
    function loop() {
      var scrollTop = $window.scrollTop();
      if(pageref == "rent") var pathRect = scroller.path.getBoundingClientRect();
      if (lastScrollTop === scrollTop) {
        raf(loop);
        return;
      } else {
        lastScrollTop = scrollTop;
        // fire scroll function if scrolls vertically
        scroller.scroll(lastScrollTop, pathRect);
        raf(loop);
      }
    }
  },
  initPath: function() {
    this.path = $("#connecting-path")[0];
    this.pathLength = this.path.getTotalLength();
    // Make very long dashes (the length of the path itself)
    this.path.style.strokeDasharray = this.pathLength + ' ' + this.pathLength;
    // Offset the dashes so the it appears hidden entirely
    this.path.style.strokeDashoffset = this.pathLength;
  },
  scroll: function(lastScrollTop, rect) {
    if (lastScrollTop >= 100) {
      //scroller.header.addClass("navbar-narrow");
    } else {
      //scroller.header.removeClass("navbar-narrow");
    };
    if (lastScrollTop >= 460) {
      //scroller.menuCta.addClass('bg-from-below');
    } else {
      //scroller.menuCta.removeClass('bg-from-below');
    }
    if(pageref == "rent") {
      //if (scroll <= 600) $(".video-banner").css('backgroundPosition', "center "+scroll/6+"px");
      var path = scroller.path;
      // What % down is it?
      var scrollPercentage = (rect.top-(document.documentElement.clientHeight/2))*-1 / rect.height;
      // Length to offset the dashes
      var drawLength = scroller.pathLength * scrollPercentage;
      // Draw in reverse
      path.style.strokeDashoffset = scroller.pathLength - drawLength;
      // When complete, remove the dash array, otherwise shape isn't quite sharp
     // Accounts for fuzzy math
      if (scrollPercentage >= 0.99) {
        path.style.strokeDasharray = "none";
      } else {
        path.style.strokeDasharray = scroller.pathLength + ' ' + scroller.pathLength;
      }
    }

  }
}
scroller.init();



var googleMap = {
  map: null,
  lat: parseFloat($("#map").data("lat")),
  lng: parseFloat($("#map").data("lng")),
  init: function() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.lat, lng: this.lng},
      zoom: 13,
      disableDefaultUI: true,
      styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#d6d6d6"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","stylers":[{"lightness":80}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"},{"lightness":55}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"weight":1.5}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]
    });
    this.addMarkers()
  },
  addMarkers: function() {
    var marker = new google.maps.Marker({
      position: {lat: this.lat, lng: this.lng},
      map: this.map,
      icon: "uploads/global/ellipse.png"
    });
  }

}
function initMap() {
  googleMap.init();
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};

function setupIp() {
  // run from footer script onload event
  $.get("https://ipapi.co/"+ myip +"/json/", function(response) {
    var userCountry = response.country_name;
    $("#user-country").val(userCountry);
    var userRegion;
    var deRegion = ["Germany", "Austria", "Liechtenstein", "Switzerland"];
    var usRegion = ["United States", "Canada"];
    var frRegion = ["France", "Belgium", "DRC", "Republic of the Congo", "Côte d'Ivoire", "Madagascar", "Cameroon", "Burkina Faso", "Niger", "Mali", "Senegal", "Haiti", "Benin"];
    var latamRegion = ["Dominican Republic", "Cuba", "Argentina", "Bolivia", "Chile", "Colombia", "Ecuador", "Paraguay", "Peru", "Uruguay", "Venezuela", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Mexico", "Nicaragua", "Panama", "Spain"];
    if(deRegion.indexOf(userCountry) != -1) {
      userRegion = "DE";
    } else if(usRegion.indexOf(userCountry) != -1) {
      userRegion = "US";
    } else if(frRegion.indexOf(userCountry) != -1) {
      userRegion = "EN";
    } else if(latamRegion.indexOf(userCountry) != -1) {
      userRegion = "ES";
    } else {
      userRegion = "EN";
    }
    $("#user-region").val(userRegion);
  });
}


/* Set up JS listeners etc. that need to be initiated after document load */

$(document).ready(function() {
  // Set form fields with any URL parameters (from Google Adwords of LinkedIn etc.)
  if(localStorage.getItem('utm_data')) {
    var utm_data = JSON.parse(localStorage.getItem('utm_data'));
    if(utm_data.utm_medium.indexOf("cpc") != -1 && utm_data.utm_source.indexOf("google") != -1) {
      utm_data.utm_medium = "Google Ads";
      utm_data.utm_source = "google";
    }
    if(utm_data.utm_medium == "cpc" && utm_data.utm_source == "google") utm_data.utm_medium = "Google Ads";
    // Trying to fix a bug [25/11/19] that sends us the full url as source
    if(utm_data.utm_source.indexOf('utm_medium=cpc') != -1 && utm_data.utm_source.indexOf('utm_source=google') != -1) {
      utm_data.utm_source = "google";
      utm_data.utm_medium = "Google Ads";
    }
    if(getUrlParameter('utm_source')) {
      // Set these next 4 values with the new data from the current URL (so we have last click data)
      utm_data.utm_campaign = getUrlParameter('utm_campaign');
      utm_data.campaign_id = getUrlParameter('campaign');
      utm_data.adgroup_id = getUrlParameter('adgroup');
      utm_data.title_id = getUrlParameter('title');
    }
    localStorage.setItem('utm_data', JSON.stringify(utm_data));
    assignUTMParams();
  } else if(getUrlParameter('utm_source')) {
    utm_data = {
      utm_source: getUrlParameter('utm_source'),
      utm_medium: getUrlParameter('utm_medium'),
      utm_campaign: getUrlParameter('utm_campaign'),
      utm_term: getUrlParameter('utm_term'),
      campaign_id: getUrlParameter('campaign'),
      adgroup_id: getUrlParameter('adgroup'),
      title_id: getUrlParameter('title'),
      first_visit: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',','')
    }
    if(utm_data.utm_medium == 'cpc') utm_data.utm_medium = "Google Ads";
    if(utm_data.utm_source == 'bing') utm_data.utm_medium = "Microsoft Ads";
    if(utm_data.utm_source == 'linkedin') utm_data.utm_medium = "LinkedIn Ads";
    localStorage.setItem('utm_data', JSON.stringify(utm_data));
    assignUTMParams();
  } else {
    utm_data = {
      utm_source: document.referrer != "" ? document.referrer : 'direct',
      utm_medium: 'Organic',
      utm_campaign: '',
      utm_term: '',
      campaign_id: '',
      adgroup_id: '',
      title_id: '',
      first_visit: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',','')
    }
    localStorage.setItem('utm_data', JSON.stringify(utm_data));
    assignUTMParams();
  }
  function assignUTMParams() {
    Object.keys(utm_data).forEach(function(key) {
      $("#"+key).val(utm_data[key]);
    })
  }

  form.initializeSelect2('.select2-init');

  $("form .conditional-trigger").on('change', function(e) {
    var $optionSelection = $(this).prop("tagName") == 'SELECT' ? $("option:selected", this) : $(this);
    var selection = $optionSelection.data('target');
    var direction = $optionSelection.data('direction');
    // show/hide our conditional inputs and mark them as requried / not-required
    direction == 'up' ? $(selection).slideUp(function() { console.log($(":input:hidden", "form .collapse")); $(":input:hidden", "form .collapse").prop('required', false) }) : $(selection).slideDown(function() { $(":input:visible", "form .collapse").prop('required', true) });

  });

  $('.select-wrapper.multiple select').on('select2:opening select2:closing', function( event ) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
  });

  if(pageref == "home") {
    if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      if(hash == 'section-contact') {
        $('#formModal').modal('show');
      }
    }
  }
  if(pageref == "summit") {
    if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      if(hash == 'apply') {
        $('#summitModal').modal('show');
        $('#summitModal').find('.modal-title').text('Apply to Attend WMS 19');
        $('#summitModal').find('.modal-body #subject-field').val('Apply to Attend WMS 19');
      }
    }
  }

  if(document.URL.indexOf("/blog/")!= -1) {
    localStorage.setItem('lastBlog', pagetitle);
    localStorage.setItem('lastBlogTime', new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',',''));
  }

  $('#summitModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var subject = button.data('subject') // Extract info from data-* attributes
    var modal = $(this);
    modal.find('.modal-title').text('Apply to ' + subject);
    modal.find('.modal-body #subject-field').val('Apply to ' + subject);
  });

  $('#filmModal').on('hidden.bs.modal', function (e) {
    videoPlayer.player.pause();
    $(".video-banner video").get(0).play();
  }).on('show.bs.modal', function (e) {
    videoPlayer.player.play();
    $(".video-banner video").get(0).pause();
  });

  $('[data-toggle="tooltip"]').tooltip();
  var options = {
    fallbackPlacement: ['bottom'],
    flip: 'bottom',
  };
  // popover used for speaker bios as of sep2019
  $('[data-toggle="popover"]').popover(options);
  $('[data-toggle="lightbox"]').click(function(event) {
      event.preventDefault();
      $(this).ekkoLightbox();
  });

  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href="https://www.wundermobility.com/#section-contact"]')
  .click(function(event) {
    // On-page links
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    var topOffset = 250;
    if(this.hash.indexOf('contact')!= -1) {
      topOffset = -200;
    }
    // Does a scroll target exist?
    if (target.length) {
      event.preventDefault();
      // Only prevent default if animation is actually gonna happen
      $('html, body').animate({
        scrollTop: target.offset().top - topOffset
      }, 600, function() {
        grecaptcha.ready(function() {
          grecaptcha.execute("6LeHSagUAAAAACPB5JfFS9ihSEbW-PJHqbBjlDgR", {action: "scrollclick"})
        });
        // Callback after animation
      });
      var eventTarget = $(event.target);
      if(eventTarget.data('input')){
        var inputTarget = $('#'+eventTarget.data('input'));
        inputTarget.val(eventTarget.data('value')).siblings('.select2').addClass('selected')
        inputTarget.trigger('change.select2').trigger('change');;
      }
    }

  });

  var hpScrollerWidth = $(".home-quotes .mob-scroll").width();
  $(".home-quotes .mob-scroll").scrollLeft( hpScrollerWidth/2 );


});
