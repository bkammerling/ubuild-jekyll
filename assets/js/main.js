AOS.init({
  // Global settings:
  duration: 600,
  once: true
});

var videoPlayer = {
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
      if(!$("body").hasClass("home")) {
        this.player.toggleControls(false);
      } else {
        $("#player").css('pointerEvents', 'auto');
      }
    });
    this.player.on('ended', event => {
      this.player.restart();
    });
    $("#video-btn").click(function() {
      videoPlayer.startPlay();
      $("#player").css('pointerEvents', 'auto');
      $(this).fadeOut();
    });
  },
  startPlay: function() {
    if(!$("body").hasClass("home")) this.player.toggleControls();
    this.player.play();
  }
}
videoPlayer.init();

/* SVG ANIMATIONS (IF ANY) */
var animation = {
  init: function() {
    this.setAnim("product-anim", '/assets/animdata/data.json');
    this.setAnim("london-anim", "/assets/animdata/cities/London/data.json");
    this.setAnim("manila-anim", "/assets/animdata/cities/Manila/data.json");
    this.setAnim("auckland-anim", "/assets/animdata/cities/Auckland/data.json");
    this.setAnim("rio-anim", "/assets/animdata/cities/Rio/data.json");
    this.setAnim("atlanta-anim", "/assets/animdata/cities/Atlanta/data.json");
    //this.anim.addEventListener('onLoopComplete', animation.doLoopComplete);
  },
  setAnim: function(id, jsonFile) {
    if(document.getElementById(id) == null) return false;
    this.anim = bodymovin.loadAnimation({
      container: document.getElementById(id),
      renderer: 'canvas',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        clearCanvas: true
      },
      loop: false,
      autoplay: true,
      path: jsonFile // the path to the animation json
    });
    this.anim.setSpeed(0.7);
  },
  currentDirection: 1,
  doLoopComplete: function(e) {
    console.log('yo');
    anim.setDirection(e.direction*-1);
    anim.addEventListener('onLoopComplete', this.doLoopComplete);
  }
};
if($(".animated-svg").length) animation.init();



var slider = {
  init: function(target, config) {
    $(target).slick(config);
    //$('.slick-current').prev().addClass('left');
    //$('.slick-current').next().addClass('right');
    $(".picture-slider__menu-image").click(function(){
      $(target).slick('slickGoTo', $(this).index());
    });
    $(target).on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $(".picture-slider__menu-image:nth-child("+(nextSlide+1)+")").addClass('current').siblings().removeClass('current');
      /* following left/right lines were for an old phone-slider that never really worked
      $('.slick-slide').removeClass('left right');
      $(".slick-slide:nth-child("+(nextSlide)+")").addClass('left');
      $(".slick-slide:nth-child("+(nextSlide+2)+")").addClass('right');
      */
    });
  }
};

slider.init(".picture-slider", {
  dots: false,
  lazyLoad: 'ondemand',
  prevArrow:
    '<span class="slider__arrow slider__arrow--prev"><img src="/uploads/global/arrow-left.svg" alt="Prev"/></span>',
  nextArrow:
    '<span class="slider__arrow slider__arrow--next"><img src="/uploads/global/arrow-right.svg" alt="Next"/></span>'
});
/*
slider.init(".phone-slider", {
  dots: true,
  lazyLoad: 'ondemand',
  arrows: false,
  slidesToShow: 1,
  infinite: false,
  speed: 500,
  variableWidth: true
});
*/

var menu = {
  init: function() {
    var btn = $(".header__hamburger");
    var menu = $(".header__nav");
    this.activeItem();
    this.toggleMenu(btn, menu);
  },

  activeItem: function () {
    var activeIndex = $('body').data('menu');
    var activeSubIndex = $('body').data('submenu');
    var mainItems = $('.header__nav > li');
    var subItems = $('.header__nav-subitem li');

    try {
      if (activeSubIndex || activeSubIndex === 0) {
        activeSubIndex = activeSubIndex.toString();
      }
    } catch(e) {
      console.log(e);
    }

    $(mainItems[activeIndex]).addClass('current');
    if (activeSubIndex && activeSubIndex.length > 0) {
      $(subItems[activeSubIndex]).addClass('is-active');
    }
  },

  toggleMenu: function(target, menu) {
    target.on("click", function() {
      menu.toggleClass("active");
      target.toggleClass("is-active");
    });
  },

  dropdown: function(btn) {
    btn.on("click", function() {
      $(this).toggleClass("is-active");
      $(this).siblings().removeClass("is-active");
    });

    $("main").on("click", function() {
      btn.removeClass("is-active");
    });
  }
};

menu.init();


var myLazyLoad = new LazyLoad({
    elements_selector: "img[data-src]"
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
    $('input, textarea').blur(function(){
      var inputValue = $(this).val();
      if ( inputValue == "" ) {
        $(this).removeClass('filled');
        $(this).parents('.form-group').removeClass('focused');
      } else {
        $(this).addClass('filled');
        if($(this)[0].checkValidity()) {
          $(this).parents('.form-group').removeClass('invalid').addClass('valid');
        } else {
          $(this).parents('.form-group').removeClass('valid').addClass('invalid');
        }
      }
    });

  },

  submit: function(contactForm) {
    var postURL = contactForm.attr('action');
    $("#form-submit").attr("disabled", true);
    var data = form.serializeObject(contactForm);
    // add subject for summit related messages
    if($(".modal-body #subject-field").length) {
      data.subject = $("form #subject-field").val();
    } else {
      // Google tag 'formSubmitted' conversion event for "Google Ad Conversion"
      dataLayer.push({'event': 'formSubmitted', 'formSubject': data.subject});
    }
    delete data.firstname;
    //console.log(data);

    $.ajax({
      url: postURL,
      method: "POST",
      data: data,
      dataType: "json"
    }).done(function (data) {
      contactForm.find(".form-feedback").removeClass('hidden');
      contactForm.trigger("reset");
      contactForm.find('.form-group').removeClass('focused').removeClass('valid');
      $('.select2-init').select2('destroy');
      form.initializeSelect2('.select2-init');
      $("#form-submit").attr("disabled", false);
      console.log(data);
    }).fail(function (error) {
      console.log(error);
      contactForm.find(".form-feedback").removeClass('hidden').text('There was a problem sending your message, please try again or send an email to support@wunder.org.');
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
    var hidden = $("#main-contact").find('.form-group:hidden select');
    hidden.each(function() {
      indexed_array[$(this).attr('name')] = "";
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
    // Honeypot check
    if($("#recipient-firstname").val().length != 0) return false;
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
  }

};

form.init();

function formSubmit(e) {
  e.preventDefault();
  var $form = $(e.target).closest("form");
  if(form.htmlValidityCheck($form) && form.customValidityChecks($form)) form.submit($form);
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
      if(content.split('</h3>').length >= 3) content = content.split('</h3>')[2];

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
if(pagetitle == "Jobs") jobs.init();


var accordion = {
  init: function() {
    $('.accordion-title').click(function() {
      $(this).parent().find('.accordion-content').slideToggle()
      $(this).toggleClass('active');
      if($(this).text() == 'Show more') {
        $(this).text('Show less')
      } else if($(this).text() == 'Show less') {
        $(this).text('Show more');
      }
    });
    $('.horizontal-accordion ion-icon, .horizontal-accordion .card-closed-display').click(function(e) {
      var $card = $(this).closest('.card');
      $card.siblings().removeClass('expand');
      $card.addClass('expand');
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
    $(".content-dropdown .content-dropdown__opener a").click(function() {
      $(this).parents().find(".content-dropdown").toggleClass("active").find(".content-dropdown__content").slideToggle();
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
if(pagetitle == "Culture") diversityMap.init();


var benefits = {
  init: function() {

    $(".cls-109, .grayoverlay, svg #map").hover(function() {
      $(".benefits svg").removeClass().addClass($(this).data('id'));
      $(".benefitstooltip").addClass("mouseover");
      $('.benefitstooltip').text($(this).data('title').toUpperCase());
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
if(pagetitle == "Careers") benefits.init();


var scroller = {
  header: $("nav.absolute-header"),
  menuCta: $(".menu-item-cta"),
  init: function() {
    var raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame;
    var $window = $(window);
    var lastScrollTop = $window.scrollTop();
    if(raf) {
      loop();
      scroller.scroll(lastScrollTop);
    }
    function loop() {
      var scrollTop = $window.scrollTop();
      if (lastScrollTop === scrollTop) {
        raf(loop);
        return;
      } else {
        lastScrollTop = scrollTop;
        // fire scroll function if scrolls vertically
        scroller.scroll(lastScrollTop);
        raf(loop);
      }
    }
  },
  scroll: function(lastScrollTop) {
    if (lastScrollTop >= 100) {
      scroller.header.addClass("navbar-narrow");
    } else {
      scroller.header.removeClass("navbar-narrow");
    };
    if (lastScrollTop >= 460) {
      scroller.menuCta.addClass('bg-from-below');
    } else {
      scroller.menuCta.removeClass('bg-from-below');
    }
    //if (scroll <= 600) $(".video-banner").css('backgroundPosition', "center "+scroll/6+"px");
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
      userRegion = "EN";
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
    assignUTMParams();
  } else if(getUrlParameter('utm_source')) {
    utm_data = {
      utm_source: getUrlParameter('utm_source'),
      utm_medium: getUrlParameter('utm_medium'),
      utm_campaign: getUrlParameter('utm_campaign'),
      utm_campaigngroup: getUrlParameter('utm_campaigngroup')
    }
    if(utm_data.utm_medium == 'cpc') utm_data.utm_medium = "Google Ads";
    localStorage.setItem('utm_data', JSON.stringify(utm_data));
    assignUTMParams();
  } else {
    utm_data = {
      utm_source: document.referrer != "" ? document.referrer : 'direct',
      utm_medium: 'Organic',
      utm_campaign: '',
      utm_campaigngroup: ''
    }
    localStorage.setItem('utm_data', JSON.stringify(utm_data));
    assignUTMParams();
  }
  function assignUTMParams() {
    $("#utm_source").val(utm_data.utm_source);
    $("#utm_medium").val(utm_data.utm_medium);
    $("#utm_campaign").val(utm_data.utm_campaign);
    $("#utm_campaigngroup").val(utm_data.utm_campaigngroup);
  }

  form.initializeSelect2('.select2-init');

  $("select#subject-field").on('change', function(e) {
    var $optionSelected = $("option:selected", this);
    var selection = $optionSelected.data('id');
    //console.log(selection);
    if($("form .extra-form").is(":visible")) {
      $("form .extra-form").slideUp(function() {
          showExtraForm();
      });
    } else {
      showExtraForm();
    }
    selection == 'support' ? $("#form-submit").attr("disabled", true) : $("#form-submit").attr("disabled", false);
    function showExtraForm() {
      $("form .extra-form ."+selection).show();
      $("form .extra-form ."+selection).find('select').prop('required', true);
      $("form .extra-form > div:not(."+selection+")").hide();
      $("form .extra-form > div:not(."+selection+")").find('select').prop('required', false);
      $("form .extra-form").slideDown();
    }
    /*
    if(selection == "Wunder City") {
      $("#company-field").val("Your City *");
    } else {
      $("#company-field").val("Your Company *");
    }
    */
  });

  $('.select-wrapper.multiple select').on('select2:opening select2:closing', function( event ) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
  });

  if(pagetitle == "Fleet" || pagetitle == "Shuttle" || pagetitle == "Carpool") {
    $("select#subject-field").val("Wunder "+pagetitle).siblings('.select2').addClass('selected');
    $('select#subject-field').trigger('change.select2').trigger('change');
  }
  if(pagetitle == "Wunder City") {
    $("select#subject-field").val("Wunder City").siblings('.select2').addClass('selected');
    $('select#subject-field').trigger('change.select2').trigger('change');
  }
  if(pagetitle == "Summit") {
    if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      if(hash == 'apply') {
        $('#summitModal').modal('show');
        $('#summitModal').find('.modal-title').text('Apply to Attend WMS 19');
        $('#summitModal').find('.modal-body #subject-field').val('Apply to Attend WMS 19');
      }
    }
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
  }).on('show.bs.modal', function (e) {
    videoPlayer.player.play();
  });

  $('[data-toggle="tooltip"]').tooltip();

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
    event.preventDefault();
    // On-page links
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      var topOffset = 250;
      if(this.hash.indexOf('contact')!= -1) {
        topOffset = -200;
      }
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - topOffset
        }, 600, function() {
          // Callback after animation
        });
    }
  });


});
