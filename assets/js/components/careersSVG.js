
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
