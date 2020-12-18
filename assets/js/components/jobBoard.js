/* Pull job list from Lever and add filters etc */
var jobs = {
  jobArray: [],
  // we had filters on the old (Greenhouse) job board - if they come back, check repo 12/2020 for old code
  init: function() {
    $.ajax({
      method: "GET",
      url: "https://api.lever.co/v0/postings/wundermobility?mode=json"
    }).done(function (data) {
      //data.sort((a, b) => a.text.localeCompare(b.text)) --- Already comes sorted alphabetically
      jobs.jobArray = data;
      jobs.buildJobsList(data);
    }).fail(function(error) {
      var errorMessageHTML = '<p>😳 Could not connect with job board. You can also find our open positions on our <a href="https://api.lever.co/wundermobility" target="_blank">lever job board</a>.</p>';
      $(".job-list__list").append(errorMessageHTML);
    });
  },
  buildJobsList: function(jobData = this.jobArray) {
    // $("#jobs_scroll-link").append(` (${jobData.length})`) -- i thought it would be cool to show the # of open positions at the top, designers did not :(
    var jobHTML = this.makeHTML(jobData);
    $(".job-list__list").append(jobHTML);
  },
  makeHTML: function(jobData = this.jobArray) {    
    if(jobData.length < 1) return '<p>😳 Sorry, no positions currently available.</p>';
    var singleHTML = $(".job-list__item").clone().removeClass('hidden');
    var jobListHTML = "";
    for(var i = 0; i < jobData.length; i++) {
      var job = jobData[i];
      singleHTML.find(".job-title").html(job.text);
      singleHTML.find(".job-link").attr('href', job.hostedUrl);
      singleHTML.find(".job-location").html(`<ion-icon name="navigate"></ion-icon> ${job.categories.location}`)
      singleHTML.find(".job-team").html(`<ion-icon name="people"></ion-icon> ${job.categories.department} - ${job.categories.team}`)
      jobListHTML += singleHTML.wrap('<p/>').parent().html()
    } // end of for loop
    return jobListHTML;
  }
};

jobs.init();

/*
if(pageref == 'careers') {
  // get the sticky element
  const stickyElm = document.getElementById('scroll-nav');

  const observer = new IntersectionObserver(intersect, 
    {
      root: document.getElementById('main-section'),
      rootMargin: '-100px 0px -1px 0px',
      threshold: [1],
    }
  );  
  observer.observe(stickyElm);

  function intersect([e]) {
    console.log(e);
    if(e.intersectionRatio == 1 && e.isIntersecting) e.target.classList.add('isSticky')
    else e.target.classList.remove('isSticky')
  }
}

*/