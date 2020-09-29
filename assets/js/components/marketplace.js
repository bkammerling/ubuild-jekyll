var form = {
  init: function() {
    var recaptchaLoaded = false;
    $('input, textarea, select').focus(function(){
      if(!recaptchaLoaded) {
        recaptchaLoaded = true;
        var head = document.getElementsByTagName('head')[0];
    		var script = document.createElement('script');
    		script.type = 'text/javascript';
    		script.src = 'https://www.google.com/recaptcha/api.js?render=6LeHSagUAAAAACPB5JfFS9ihSEbW-PJHqbBjlDgR';
    		head.appendChild(script);
      }
      if($(this).parents('.form-group')) {
        $(this).parents('.form-group').addClass('focused');
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
    var data = form.serializeObject(contactForm);
    var capitalizedName = data.name.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
      return txtVal.toUpperCase();
    });
    data.name = capitalizedName;
    console.log(data);

    $.ajax({
      url: postURL,
      method: "POST",
      data: data,
      dataType: "json",
      headers: {
        "Accept": "application/json"
      }
    }).done(function (response) {
      $("#contactModal, #partnerModal").addClass('success');
      $("#form-submit").attr("disabled", false);
      contactForm.removeClass('sending');
      /*
      $("#modal-form").slideUp(400);
      $("#modalheader").removeClass('bg-dark').addClass('bg-success');
      $('#mkt-formtitle').text("Thanks for reaching out");
      $('#mkt-formintro').text("Your message has been sent successfully. We’ll get back to you in no time.");
      */
      // Google tag 'formSubmitted' conversion event
      dataLayer.push({ 'event': 'formSubmitted', 'eventAction': 'Submit success', 'eventLabel': data.subject });
    }).fail(function (error) {
      console.log(error);
      contactForm.removeClass('sending');
      $("#modalheader").removeClass('bg-dark').addClass('bg-danger');
      $('#mkt-formtitle').text("Message failed to send");
      $('#mkt-formintro').text("Your message failed to send. You can try again or reach out to moritz.dreger@wundermobility.com.");
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
    return indexed_array;
  },
  initializeSelect2: function(selector) {
    $(selector).select2({
      minimumResultsForSearch: Infinity
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

function mktplaceSubmit(e) {
  e.preventDefault();
  $(e.target).attr("disabled", true);
  var $form = $(e.target).closest("form");
  if(form.htmlValidityCheck($form) && form.customValidityChecks($form)) {
    console.log('form clean');
    grecaptcha.execute("6LeHSagUAAAAACPB5JfFS9ihSEbW-PJHqbBjlDgR", {action: "submission"}).then(function(token) {
      recaptchaSubmit(token);
    }).catch(function(e) {
      console.log(e);
      $("#modalheader").removeClass('bg-dark').addClass('bg-danger');
      $('#mkt-formtitle').text("Message failed to send");
      $('#mkt-formintro').text("Your message failed to send because of a reCaptcha issue. You can try again or reach out to moritz.dreger@wundermobility.com.");
      $("#form-submit").attr("disabled", false);
    });
  } else {
    console.log('form NOT clean');
    $(e.target).attr("disabled", false);
  }
}

function recaptchaSubmit(token) {
  console.log(token);
  var $form = $("#captchaResponse").parents("form");
  $('#captchaResponse').val(token);
  $form.addClass('sending');
  form.submit($form);
}



$(document).ready(function() {

  form.initializeSelect2('.select2-init');

  $('#partnerModal').on('shown.bs.modal', function (e) {

    // send event to GA
  });
  $('#contactModal').on('shown.bs.modal', function (e) {
    $('#extension-interest').select2({
      placeholder: "Pick an extension from the list",
      minimumResultsForSearch: Infinity
    }).trigger('select2:select');
    // send event to GA
  })

  $('input:radio[name="customer"]').change(function() {
    if ($(this).val() == 'customerNo') {
      $('.conditional-hide').fadeIn(100).find('input').attr('required', true);
    } else {
      $('.conditional-hide').fadeOut(100).find('input').attr('required', false);
    }
  });

  $('[data-toggle="lightbox"]').click(function(event) {
      event.preventDefault();
      $(this).ekkoLightbox({
        alwaysShowClose: true,
        leftArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#141414"/>
        </svg>`,
        rightArrow: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#141414"/>
        </svg>`,
        onShown: function() {
          $('.ekko-lightbox button.close').html('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#141414"/></svg>');
        },
      });
  });



  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href*="pill"]')
  .click(function(event) {
    // On-page links
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    var topOffset = 0;
    // Does a scroll target exist?
    if (target.length) {
      event.preventDefault();
      // Only prevent default if animation is actually gonna happen
      $('html, body').animate({
        scrollTop: target.offset().top - topOffset
      }, 600, function() {
        // Callback after animation
      });
    }

  });

  var categoriesObj = {
    all: ['Analytics and Monitoring','Integrations (API)','Customer Engagement','CRM','Operations Improvement','Fleet Maintenance','Utilization Improvement'],
    engageCusomter: ['Customer Engagement','CRM'],
    optimizeFleet: ['Integrations (API)','Operations Improvement'],
    improveMaintenance: ['Fleet Maintenance'],
    analyzePerformance: ['Analytics and Monitoring','Utilization Improvement']
  }

  $('input[name="categories"]').click(function() {
    var categoryArray = categoriesObj[$(this).attr('id')];
    console.log(categoryArray);
    $('.app-box__container').each(function() {
      $(this).show();
      if(categoryArray.indexOf($(this).data('category')) == -1) {
        $(this).hide();
      }
    })
  });


});
