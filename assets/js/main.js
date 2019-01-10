AOS.init();

var videoPlayer = {
  player: null,
  init: function() {
    player = new Plyr('#player', {
      controls: ['play','progress','volume'],
      clickToPlay: false,
      hideControls: true,
      resetOnEnd: true
    });
    player.on('ready', event => {
      player.toggleControls(false);
      player.poster = "/img/careers/hrvideo-poster3.png";
      player.loadVideo();
    });
    player.on('ended', event => {
      player.restart();
    });
    $("#video-btn").click(function() {
      videoPlayer.startPlay();
      $("#player").css('pointerEvents', 'auto');
      $(this).fadeOut();
    });
  },
  startPlay: function() {
    player.toggleControls();
    player.play();
  }
}
videoPlayer.init();



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

var menu = {
  init: function() {
    var btn = $(".header__icon");
    var menu = $(".header__nav");
    var languageBtn = $("#js-language");
    var solutionsBtn = $("#js-solutions");
    var eventsBtn = $("#js-events");
    var appBtn = $("#js-app");
    this.activeItem();
    this.toggleMenu(btn, menu);
    this.dropdown(languageBtn);
    this.dropdown(solutionsBtn);
    this.dropdown(eventsBtn);
    this.dropdown(appBtn);
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

slider.init(".simple-slider", {
  dots: true,
  lazyLoad: 'ondemand',
  prevArrow:
    '<span class="slider__arrow slider__arrow--prev"><img src="/img/slider-arrow.svg" alt="Prev"/></span>',
  nextArrow:
    '<span class="slider__arrow slider__arrow--next"><img src="/img/slider-arrow.svg" alt="Next"/></span>',
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          adaptiveHeight: true
        }
      }
    ]
});

slider.init("body:not(.careers) .picture-slider", {
  dots: true,
  lazyLoad: 'ondemand',
  prevArrow:
    '<span class="slider__arrow slider__arrow--prev"><img src="/img/slider-arrow.svg" alt="Prev"/></span>',
  nextArrow:
    '<span class="slider__arrow slider__arrow--next"><img src="/img/slider-arrow.svg" alt="Next"/></span>'
});

slider.init(".careers .picture-slider", {
  dots: false,
  lazyLoad: 'ondemand',
  prevArrow:
    '<span class="slider__arrow slider__arrow--prev"><img src="/img/careers/arrow-left.svg" alt="Prev"/></span>',
  nextArrow:
    '<span class="slider__arrow slider__arrow--next"><img src="/img/careers/arrow-right.svg" alt="Next"/></span>'
});

menu.init();

var lazyLoadingImages = function () {
  [].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = function() {
      img.removeAttribute('data-src');
    };
  });
}

lazyLoadingImages();

var form = {
  init: function() {
    $("#form-submit").click(function(event)  {
      if(!$('form#main-contact')[0].reportValidity()) return false;
      const name = $("input#name").val();
      const email = $("input#email").val();
      const formSubject = $("select#subject").val();
      var body = "This message was sent from a contact form on wunder.org." + '\n\n',
          subject = formSubject + " - Message from Wunder.org";
      $("form#main-contact").find("input[name], select[name], textarea[name]").each(function (index, node) {
        body += node.name.toUpperCase() + '\n' + node.value + '\n\n';
      });

      form.submit(subject, body, name, email, subject);
    });
  },

  submit: function(subject, body, name, email) {
    var submitBtn = $("#form-submit");
    submitBtn.attr("disabled", true);
    var awsURL = "https://1bnwg71zz1.execute-api.us-west-2.amazonaws.com/production/submit";

    $.ajax({
      method: "POST",
      url: awsURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "subject":subject,
        "body":body,
        "name": name,
        "fromEmail": email
      })
    }).done(function (data) {
      $(".form-feedback").removeClass('invisible');
      $('form#main-contact').trigger("reset");
      console.log(data);
      submitBtn.attr("disabled", false);
    }).fail(function (error) {
      $(".form-feedback").removeClass('invisible').text('There was a problem sending your message, please try again or send an email to support@wunder.org.');
    });
  }

};

form.init();

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

  sortByDepartment: function(array) {
    array.sort(function(a,b) {
      var depA = a.departments[0].name;
      var depB = b.departments[0].name;
      if (depA < depB) return -1;
      if (depA > depB) return 1;
      return 0;
    });
    return array;
  },

  strip: function(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
};

if($("body").data("menu") == 2 && $("body").hasClass('careers')) jobs.init();


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
  }
}

if($("body").data("menu") == 6) accordion.init();


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


var diversityMap = {
  init: function() {
    $(".diversity svg").click(function(evt) {
      diversityMap.onclick(evt);
    });

    $("#AR,#AU,#BA,#BE,#BG,#BR,#CA,#CN,#CO,#CZ,#DE,#EG,#ES,#FR,#GB,#HN,#IN,#IR,#KR,#KZ,#LC,#MX,#NL,#PA,#PL,#PH,#PT,#PY,#RO,#RS,#RU,#SG,#SV,#TH,#TN,#TR,#TW,#TZ,#UA,#US,#ZA").hover(function() {
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
if($("body").data("menu") == 0) diversityMap.init();


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
  header: $(".absolute-header"),
  init: function() {
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 100) {
        //clearHeader, not clearheader - caps H
        scroller.header.addClass("darkHeader");
      } else {
        scroller.header.removeClass("darkHeader");
      };
      //if (scroll <= 600) $(".video-banner").css('backgroundPosition', "center "+scroll/6+"px");

    });
  }
}
scroller.init();
