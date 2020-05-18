$('#commerceModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var content = button.data('content') // Extract info from data-* attributes
  $(this).find('.modal-body').load(content, function() {
    $('.carousel').carousel({
      interval: false
    })
  });
})

$('.simple-radio-group').on('change', 'input', function() {
  var filterValue = $(this).attr('data-filter');
  $("#catalog-list").find(`.catalog-item__wrapper`).removeClass("hidden").removeClass("featured");
  $("#catalog-list").find(`.catalog-item__wrapper:not(${filterValue})`).addClass("hidden");
});
