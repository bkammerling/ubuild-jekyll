var twitterModule = {
  init: function() {
    var url = "https://spreadsheets.google.com/feeds/list/1t7ByLgFqVxmg4ZD2GLKpOEdT0IzyOrth7mwL2AJqVpE/od6/public/values?alt=json";
    $.get( url, function( data ) {
      var rows = data.feed.entry;
      twitterModule.data = rows;
      twitterModule.buildFeed();
    });
    $('.social-ticker__nav span').click(function() {
      if($(this).hasClass('active')) return;
      var socialRow = $(this).parents('.social-ticker').find('.social-ticker__row');
      socialRow.toggleClass('moved');
      $(this).addClass('active').siblings().removeClass('active');
    });
    $(".social-ticker__row").scroll(function(e) {
      twitterModule.scroll(e.target);
    });
    twitterModule.scroll($(".social-ticker__row"));
  },
  data: [],
  buildFeed: function(posts = this.data) {
    var feedHTML = this.makeHTML(posts)
    $(".social-ticker__row").append(feedHTML);
    //console.log($('.post-text').html());
    var postTexts = $('.post-text');
    //console.log(postTexts);
  },
  makeHTML: function(posts = this.data) {
    if(posts.length < 1) return "<p>😳 Sorry, couldn't find our social posts.</p>";
    var singleHTML = $(".social-ticker__post").clone().removeClass('hidden');
    var postListHTML = "";
    for(var i = 0; i < posts.length; i++) {
      var post = posts[i];
      var tempHTML = singleHTML.clone();
      tempHTML.find(".post-date").text(post.gsx$createdat.$t);
      var regex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
      var postText = post.gsx$text.$t;
      postText = postText.linkify();
      if(postText.length > 260) postText = postText.slice(0,250) + "...";
      tempHTML.find(".post-text").html(postText);
      tempHTML.find(".post-image").attr('src', post.gsx$image.$t);
      tempHTML.find(".post-link").attr('href', post.gsx$link.$t).html('<small class="d-block">View on ' + twitterModule.capitalize(post.gsx$network.$t) + '</small>');
      tempHTML.addClass(post.gsx$network.$t);
      if(post.gsx$image.$t.length < 2) tempHTML.find(".post-image").remove();
      postListHTML += tempHTML.wrap('<p/>').parent().html();
    } // end of for loop
    return postListHTML;
  },
  capitalize: function(string) {
   if(typeof string==undefined) return;
   var firstLetter = string[0] || string.charAt(0);
   return firstLetter ? firstLetter.toUpperCase() + string.slice(1) : '';
 },
 scroll: function(target) {
   var width = $(target).outerWidth() + $(target).outerWidth() * 0.15; // size of pseudoelement appended to end of row
   var left = $(target).scrollLeft();
   var perc = (left * 100) / width;
   $('.bottombar-overlay').css('width', perc+"%");
 }

}

if(pageref == "blog") {
  twitterModule.init();
}

if(!String.linkify) {
  String.prototype.linkify = function() {
    // http://, https://, ftp://
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
    // www. sans http:// or https://
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    // Email addresses
    var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
    return this
      .replace(urlPattern, '<a href="$&">$&</a>')
      .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
      .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
  };
}
