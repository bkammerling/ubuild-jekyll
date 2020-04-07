var filterObj = {
  need: '',
  city: '',
  country: ''
}

$(document).ready(function() {

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
  });

  function filterList() {
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
