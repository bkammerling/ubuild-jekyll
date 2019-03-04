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
    console.log(animation.anim);
  },
  setAnim: function(id, jsonFile) {
    if(document.getElementById(id) == null) return false;
    this.anim = bodymovin.loadAnimation({
      container: document.getElementById(id),
      renderer: 'svg',
      loop: true,
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
    $(".picture-slider__menu-image").click(function(){
      $(target).slick('slickGoTo', $(this).index());
    });
    $(target).on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $(".picture-slider__menu-image:nth-child("+(nextSlide+1)+")").addClass('current').siblings().removeClass('current');
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


var menu = {
  init: function() {
    var btn = $(".header__hamburger");
    var menu = $(".header__nav");
    //var languageBtn = $("#js-language");
    //var solutionsBtn = $("#js-solutions");
    //var eventsBtn = $("#js-events");
    //var appBtn = $("#js-app");
    this.activeItem();
    this.toggleMenu(btn, menu);
    //this.dropdown(languageBtn);
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
    //console.log('in submit to ' + postURL);
    $("#form-submit").attr("disabled", true);
    var data = form.serializeObject(contactForm);
    //data.subject = $("form #subject-field").val();
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
    });

  },

  serializeObject: function($form){
    var unindexed_array = $form.serializeArray();
    console.log(unindexed_array);
    var indexed_array = {};
    $.map(unindexed_array, function(n, i){
        if(indexed_array[n['name']]) {
          indexed_array[n['name']] = indexed_array[n['name']] + ", " + n['value'];
        } else {
          indexed_array[n['name']] = n['value'];
        }
    });
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
      console.log('incomeplete select2');
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
      var location = job.location.name.indexOf("Wunder") == -1 ? job.location.name : job.location.name.replace("Wunder ", "");
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

    $("#AR,#AU,#BA,#BE,#BG,#BR,#CA,#CN,#CO,#CZ,#DE,#EG,#ES,#FR,#GB,#HN,#IT,#IN,#IR,#JP,#KR,#KZ,#LC,#MX,#NL,#PA,#PL,#PH,#PT,#PY,#RO,#RS,#RU,#SG,#SV,#TH,#TN,#TR,#TW,#TZ,#UA,#US,#ZA").hover(function() {
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



/* Set up JS listeners etc. that need to be initiated after document load */

$(document).ready(function() {
  var referrer = document.referrer != "" ? document.referrer : 'direct';
  $("#primary-source").val(referrer);
  $.get("https://ipapi.co/"+ myip +"/json/", function(response) {
    var userCountry = response.country_name;
    $("#user-country").val(userCountry);
  });

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
      $("form .extra-form > div:not(."+selection+")").hide();
      $("form .extra-form").slideDown();
    }
  });

  $('#carpool-interest').on('select2:opening select2:closing', function( event ) {
    var $searchfield = $(this).parent().find('.select2-search__field');
    $searchfield.prop('disabled', true);
  });

  if(pagetitle == "Fleet" || pagetitle == "Shuttle" || pagetitle == "Carpool") {
    $("select#subject-field").val("Wunder "+pagetitle).siblings('.select2').addClass('selected');
    $('select#subject-field').trigger('change.select2').trigger('change');
  }
  if(pagetitle == "Home") {
    $("select#subject-field").val("General enquiry").siblings('.select2').addClass('selected');
    $('select#subject-field').trigger('change.select2').trigger('change');
  }

  $('#summitModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var subject = button.data('subject') // Extract info from data-* attributes
    var modal = $(this);
    modal.find('.modal-title').text('Apply to ' + subject + ' WMS 2019');
    modal.find('.modal-body #subject-field').val('Apply to ' + subject + ' WMS 2019');
  });

  $('#filmModal').on('hidden.bs.modal', function (e) {
    videoPlayer.player.pause();
  }).on('show.bs.modal', function (e) {
    videoPlayer.player.play();
  });

  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
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
