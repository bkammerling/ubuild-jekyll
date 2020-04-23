var filterObj = {
  need: '',
  city: '',
  country: ''
}

function compare( a, b ) {
  if ( a.text < b.text ) return -1;
  if ( a.text > b.text ) return 1;
  return 0;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var weallmoveForm = {
  submit: function(contactForm) {
    var postURL = contactForm.attr('action');
    var data = weallmoveForm.serializeObject(contactForm);
    var capitalizedName = data.name.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
      return txtVal.toUpperCase();
    });
    data.name = capitalizedName;
    data.referrer = document.referrer;

    //console.log(data);
    //$("#form-submit").attr("disabled", false);

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
      setTimeout(function(){ contactForm.find(".form-feedback").addClass('hidden'); }, 4000);
      contactForm.trigger("reset");
      contactForm.find('.form-group').removeClass('focused').removeClass('valid');
      $("#form-submit").attr("disabled", false);
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
    var hidden = $form.find('.form-group:hidden input');
    hidden.each(function() {
      indexed_array[$(this).attr('name')] = "";
    })
    return indexed_array;
  },
  htmlValidityCheck: function($form) {
    $form[0].checkValidity();
    return $form[0].reportValidity();
  }
};

function weallmoveFormSubmit(e) {
  e.preventDefault();
  $(e.target).attr("disabled", true);
  var $form = $(e.target).closest("form");
  if(weallmoveForm.htmlValidityCheck($form)) {
    console.log('form clean');
    grecaptcha.ready(function() {
      grecaptcha.execute("6LeHSagUAAAAACPB5JfFS9ihSEbW-PJHqbBjlDgR", {action: "submission"}).then(function(token) {
        recaptchaSubmit(token, $form);
      });
    });
  } else {
    console.log('form NOT clean');
    $(e.target).attr("disabled", false);
  }
}

function recaptchaSubmit(token, $form) {
  $form.find("input[name='g-recaptcha-response']").val(token);
  weallmoveForm.submit($form);
}


$(document).ready(function() {

  cityArray.unshift({id: "", text: ""});
  cityArray = cityArray.filter(function(item, index) {
    return item.text.toLowerCase() != "all cities"
  })
  cityArray.sort(compare);
  countryArray.unshift({id: "", text: ""});
  countryArray.sort(compare);
  for (let [key, value] of Object.entries(countryObject)) {
    // add empty option to each country so placeholder works on select2
    countryObject[key].unshift({id: "", text: ""});
    // remove All cities selection
    countryObject[key] = countryObject[key].filter(function(item, index) {
      return item.text.toLowerCase() != "all cities"
    })
  };
  console.log(countryObject);

  $("#countrySelect").select2({
    data: countryArray,
    allowClear: true,
    minimumResultsForSearch: 15,
    placeholder: "Country"
  });
  $("#citySelect").select2({
    data: cityArray,
    allowClear: true,
    minimumResultsForSearch: 15,
    placeholder: "City"
  });
  $("#needSelect").select2({
    allowClear: true,
    minimumResultsForSearch: 15,
    placeholder: "Need"
  });


  $('.we-select2').on("change", function (e) {
    if(e.target.value) {
      console.log('FilterBy_'+e.target.name);
      dataLayer.push({
        'event': 'WeAllMove-Filter',
        'eventCategory': 'WeAllMove',
        'eventAction': 'FilterBy_'+e.target.name,
        'eventLabel': e.target.value
      });
    }
    filterObj[e.target.name] = e.target.value;
    filterList();
  });

  $('#countrySelect').on("change", function(e) {
    var selectedCity = $("#citySelect").val();
    if(e.target.value) {
      if(selectedCity) {
        // is city selected - check if it's in the country that's been selected
        var selectedCountryArray = countryObject[e.target.value];
        var result = selectedCountryArray.filter(item => {
          return item.text == selectedCity
        })
        // if city selected is in country that's been selected, don't do anything!
        if(result.length >= 1) return;
      }
      // is country that has been selected same as city
      var theseCities = [...new Set(countryObject[e.target.value].map(item => item.text))];;
      //console.log(theseCities)
      $("#citySelect").select2('destroy').empty().select2({
        data: theseCities.sort(),
        allowClear: true,
        minimumResultsForSearch: 15,
        placeholder: "City"
      });
      $("#citySelect").trigger('change');
      $("#citySelect").removeAttr('disabled');
    } else {
      // country field was cleared
      if(!selectedCity) {
        $("#citySelect").select2('destroy').empty().select2({
          data: cityArray,
          allowClear: true,
          minimumResultsForSearch: 15,
          placeholder: "City"
        });
        $("#citySelect").prop('disabled', true);
      }
    }
  });


  function filterList() {
    console.log(filterObj);
    if($('html').scrollTop() >= $("#filter-intro").offset().top+$("#filter-intro").height()+150) {
      $('html').scrollTop($("#filter-intro").offset().top+$("#filter-intro").height()+150);
    }

    $(`.weallmove-card:not(:contains(${filterObj.need}):contains(${filterObj.city}):contains(${filterObj.country}))`).addClass('card-hidden');
    $(`.weallmove-card:contains(${filterObj.need}):contains(${filterObj.city}):contains(${filterObj.country})`).removeClass('card-hidden');
    $(`.weallmove-card:contains(${filterObj.need}):contains(${filterObj.country}):contains('All cities')`).removeClass('card-hidden');

    $('.current-showing').text($('.weallmove-card:not(.card-hidden)').length);

    if($('.weallmove-card:not(.card-hidden)').length == 0) {
      $('.noshow-feedback').removeClass('hide');
    } else {
      $('.noshow-feedback').addClass('hide');
    }

    if(filterObj.city) {
      var firstWord = filterObj.city.replace(/ .*/,'');
      console.log(firstWord);
      $(".city-promo").hide();
      $(`.city-promo.${firstWord.toLowerCase()}`).show();
    }
  }


  $('#interestedModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var newSubject = button.data('subject'); // Extract info from data-* attributes
    var type = button.data('type'); // Extract info from data-* attributes
    var modal = $(this);
    modal.find(`.${type}`).removeClass('hidden').siblings().addClass('hidden');
    modal.find('.modal-title').text(newSubject);
    modal.find("input[name='subject']").val(newSubject);
  })

});
