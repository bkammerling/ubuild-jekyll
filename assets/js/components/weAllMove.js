var filterObj = {
  need: '',
  city: '',
  country: ''
}

$(document).ready(function() {

  cityArray.unshift({id: "", text: ""});
  countryArray.unshift({id: "", text: ""});
  for (let [key, value] of Object.entries(countryObject)) {
    countryObject[key].unshift({id: "", text: ""});
  };
  console.log(countryObject);

  $("#citySelect").select2({
    allowClear: true,
    minimumResultsForSearch: 15,
    placeholder: "City"
  });
  $("#countrySelect").select2({
    allowClear: true,
    minimumResultsForSearch: 15,
    placeholder: "Country"
  });
  $("#needSelect").select2({
    allowClear: true,
    minimumResultsForSearch: 15,
    placeholder: "Need"
  });


  $('.we-select2').on("change", function (e) {
    console.log("change");
    filterObj[e.target.name] = e.target.value;
    filterList();

    if(e.target.name == 'country' && e.target.value && !$("#citySelect").val()) {
      $("#citySelect").select2('destroy').empty().select2({
        data: countryObject[e.target.value],
        allowClear: true,
        minimumResultsForSearch: 15,
        placeholder: "City"
      });
    } else if(e.target.name == 'country' && !e.target.value) {
      $("#citySelect").select2('destroy').empty().select2({
        data: cityArray,
        allowClear: true,
        minimumResultsForSearch: 15,
        placeholder: "City"
      });
    }

    if(e.target.name == 'city' && e.target.value) {
      var countryToSelect;
      for (let [key, value] of Object.entries(countryObject)) {
        console.log(key, value);
        var result = value.filter(item => {
          return item.text == e.target.value
        })
        if(result.length >= 1) countryToSelect = key;
      }
      console.log(countryToSelect);
      $("#countrySelect").val(countryToSelect);
      $("#countrySelect").trigger('change');
    } else if(e.target.name == 'city' && !e.target.value) {
      $("#countrySelect").val(null).trigger('change');
    }

  });

  function filterList() {
    console.log(filterObj);
    $(`.weallmove-card:not(:contains(${filterObj.need}):contains(${filterObj.city}):contains(${filterObj.country}))`).addClass('card-hidden');
    $(`.weallmove-card:contains(${filterObj.need}):contains(${filterObj.city}):contains(${filterObj.country})`).removeClass('card-hidden');
    $('.current-showing').text($('.weallmove-card:not(.card-hidden)').length);
    if($('.weallmove-card:not(.card-hidden)').length == 0) {
      $('.noshow-feedback').removeClass('hide');
    } else {
      $('.noshow-feedback').addClass('hide');
    }
  }

});
