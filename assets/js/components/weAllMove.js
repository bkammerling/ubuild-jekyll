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

});
