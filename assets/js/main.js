var vh10 = $(window).height() * 0.15;
AOS.init({
  // Global settings:
  duration: 1400,
  offset: vh10,
  once: true,
  disable: 'mobile',
  startEvent: 'load'
});

window.addEventListener('load', function() {
  AOS.refresh();
});

var centerOffset = function(element) {
  var topOffset = ($(window).height() / 2) - ($(element).height() / 1.3)
  $(element).css('top', topOffset);
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
    var navlink = $("body .navbar-nav .nav-link");
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

var formHistory = [];
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
    if($(".summit #modal-form #subject-field, .autotech-events #modal-form #subject-field").length) {
      var subject = 'WMS';
      label = form.conversionLabels[subject];
      data.subject = $("form #subject-field").val();
    }
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
    }).done(function (response) {
      contactForm.find(".form-feedback").removeClass('hidden');
      contactForm.trigger("reset");
      contactForm.find('.form-group').removeClass('focused').removeClass('valid');
      $('.select2-init').select2('destroy');
      form.initializeSelect2('.select2-init');
      $("#form-submit").attr("disabled", false);
      formHistory.push("sent");
      // Google tag 'formSubmitted' conversion event for "Google Ad Conversion" + analytics B2BLead event
      dataLayer.push({ 'event': 'formSubmitted', 'formSubject': data.subject, 'conversionLabel': label });
      //console.log('ajax done success', response);
    }).fail(function (error) {
      console.log(error);
      contactForm.find(".form-feedback").removeClass('hidden').text('There was a problem sending your message, please try again or ping us an email at marketing@wundermobility.com.');
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
      formHistory.push($(this).attr('name'));
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


if($("input[type='range']").length) {
  $("input[type='range']").on('input',function() {
    var percent = $(this).val() / $(this).attr('max') * 100;
    $(this).css('background', 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF ' + percent + '%, #ffffff90 ' + percent + '%, #ffffff90 100%)');
    $('.range-label').css('left', 'calc(' + percent + '% - 30px)').text(numberWithCommas($(this).val()));
    var co2saved = $(this).val() * 0.375 * 1.553;
    $('.co2-saved h3').text(numberWithCommas(Math.round(co2saved)));
    $('.trees-planted h3').text(numberWithCommas(Math.round(co2saved / 0.0218)));
    $('.parking-saved h3').text(numberWithCommas(Math.round($(this).val() * 0.375)));
  });

  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}

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
    var frRegion = ["France", "Belgium", "DRC", "Republic of the Congo", "Côte d'Ivoire", "Madagascar", "Cameroon", "Burkina Faso", "Niger", "Mali", "Senegal", "Benin"];
    var latamRegion = ["Dominican Republic", "Cuba", "Argentina", "Bolivia", "Chile", "Colombia", "Ecuador", "Paraguay", "Peru", "Uruguay", "Venezuela", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Mexico", "Nicaragua", "Panama", "Brazil", "Guadeloupe", "French Guiana", "Haiti"];
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

  if(pageref == "home" || pageref == "about") {
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
  .not('[href*="pill"]')
  .not('[href="https://www.wundermobility.com/#section-contact"]')
  .click(function(event) {
    // On-page links
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    var topOffset = 250;
    if(this.hash.indexOf('contact')!= -1 && pageref != "shuttle") {
      topOffset = -100;
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


  function loopVideo() {
    setTimeout(function(){
      $('.loopedvideo.jsdelay').each(function() {
        $(this).get(0).play();
      })
      loopVideo();
    }, 2000);
  }
  loopVideo();


  if($("form#main-contact").length >= 1) {
    // set up event for when a form field is filled but the form is not sent - used with GMT
    window.addEventListener('beforeunload', function() {
      dataLayer.push({
    	  event: 'beforeunload'
    	});
      if (formHistory.length) {
        dataLayer.push({
          'event' : 'formInteraction',
          'eventCategory' : 'Form Interaction',
          'eventAction' : formHistory.join(' > ')
        });
      }
    });
    var formSelector = 'form#main-contact';
    var attribute = 'name';
    document.querySelector(formSelector).addEventListener('change', function(e) {
      var vieldName = e['target'].getAttribute(attribute);
      //console.log('form changed: ' + vieldName)
      //dataLayer.push({ 'event': 'fieldFilled', 'eventAction': vieldName });
      formHistory.push(vieldName);
      //console.log(formHistory);
    });
  }

});
