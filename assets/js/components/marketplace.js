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

function formSubmit(e) {
  e.preventDefault();
  $(e.target).attr("disabled", true);
  var $form = $(e.target).closest("form");
  if(form.htmlValidityCheck($form) && form.customValidityChecks($form)) {
    console.log('form clean');
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
  console.log(token);
  var $form = $("#captchaResponse").parents("form");
  $('#captchaResponse').val(token);
  form.submit($form);
}



$(document).ready(function() {

  form.initializeSelect2('.select2-init');

  $('#partnerModal').on('shown.bs.modal', function (e) {
    $('#extension-interest').select2({
      placeholder: "Pick an extension from the list"
    });
  })

  $("form .conditional-trigger").on('change', function(e) {

  });
  $('input:radio[name="customer"]').change(function() {
    if ($(this).val() == 'customerNo') {
      $('.conditional-hide').fadeIn(100);
    } else {
      $('.conditional-hide').fadeOut(100);
    }
  });


});
