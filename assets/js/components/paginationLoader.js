$('#pagination-loadmore').click((e) => {
  // stop the button loading whatever url is in it's href
  e.preventDefault();
  var htmlParent = $("[data-pagination='clone']").first();
  // get the data dynamically with jquery ajax
  $.get( e.target.href, function( data ) {
    data.pages.map(item => {
      var $element = htmlParent.clone();
      for (const [key, value] of Object.entries(item)) {
        if(key == 'image') {
          $element.find(`[data-pagination='${key}']`).attr('src', value);
          $element.find(`[data-pagination='${key}']`).attr('srcset', value);
        } else if(key == 'url' || key == 'link') {
          $element.find(`[data-pagination='${key}']`).attr('href', value);
        } else {
          $element.find(`[data-pagination='${key}']`).text(value);
        }
      }
      htmlParent.parent().append($element);
    })
    if(data.next) {
      e.target.href = data.next;
    } else {
      e.target.style.display = 'none';
    }
  });

})