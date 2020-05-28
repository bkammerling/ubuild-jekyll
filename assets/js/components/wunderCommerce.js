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

function modalContactClicked() {
  console.log(event);
  var message = $(event.target).data('message');
  var target = $(event.target.hash);
  $('#commerceModal').modal('hide');
  $('#message').val(message);
  $('#message').parent().addClass('valid focused');
  event.preventDefault();
  // Only prevent default if animation is actually gonna happen
  $('html, body').animate({
    scrollTop: target.offset().top
  }, 600, function() {
    // Callback after animation
  });
}
