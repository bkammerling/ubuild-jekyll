/* Pull job list from Greenhouse and add filters etc */
var jobs = {
  filters: {
    location: '',
    departments: ''
  },
  init: function() {
    var currentJobsHtml;
    var urlParams = new URLSearchParams(window.location.search);
    var teamParam = urlParams.get('team');
    if(teamParam) {
      jobs.filters.departments = teamParam;
      $(".job-filter select.team-select").val(teamParam);
    }
    $.ajax({
      method: "GET",
      url: "https://boards-api.greenhouse.io/v1/boards/wunder/jobs?content=true"
    }).done(function (data) {
      jobs.jobArray = data.jobs;
      jobs.setupDropdowns();
      var filteredJobs = jobs.filterJobs();
      jobs.buildJobsList(filteredJobs)
    }).fail(function(error) {
      var errorMessageHTML = '<p>Could not connect with job board. Find our open positions <a href="https://boards.greenhouse.io/wunder/" target="_blank">here</a>.</p>';
      $(".job-list__listing").append(errorMessageHTML);
    });

    $(".job-filter select").change(function() {
      var filterType = $(this).data('type');
      jobs.filters[filterType] = $(this).val();
      var filteredJobs = jobs.filterJobs();
      jobs.buildJobsList(filteredJobs);
    });

  },
  buildJobsList: function(jobData = this.jobArray) {
    this.clear();
    var jobHTML = this.makeHTML(jobData);
    $(".job-list__listing").append(jobHTML);
  },
  jobArray: null,
  makeHTML: function(jobData = this.jobArray) {
    console.log(jobData);
    if(jobData.length < 1) return '<p>😳 Sorry, no positions currently available.</p>';
    var sortedJobs = jobData;
    var singleHTML = $(".job-list__item").clone().removeClass('hidden');
    var jobListHTML = "";
    for(var i = 0; i < sortedJobs.length; i++) {
      var job = sortedJobs[i];
      singleHTML.find(".job-title").text(job.title);
      if(job.departments[0].name == 'Analytics') {
        var jobCategory = 'Data';
      } else {
        jobCategory = job.departments[0].name;
      }
      singleHTML.find(".job-category").text(jobCategory);
      singleHTML.find(".job-title").attr('href', job.absolute_url);
      var location = job.location.name.indexOf("Wunder") == -1 ? job.location.name : job.location.name.replace("Wunder ", "").replace("Mobility ", "");
      singleHTML.find(".job-location").text(location);
      var content = $('<textarea />').html(job.content).text();
      if(content.split('</h3>').length > 2) content = content.split('</h3>')[1];

      singleHTML.find(".job-excerpt").text(this.strip(content).substring(0, 300)+"...");
      jobListHTML += singleHTML.wrap('<p/>').parent().html()

    } // end of for loop
    return jobListHTML;
  },
  filterJobs: function() {
    var filteredJobs = this.jobArray.filter(function(item) {
        //if(jobs.filters[key] == '') continue;
        if(item.departments[0].name.toLowerCase().indexOf(jobs.filters.departments) !== -1 && item.location.name.toLowerCase().indexOf(jobs.filters.location) !== -1) return true;
    });
    return filteredJobs;
  },
  setupDropdowns: function() {
    var locationDropdown = $(".job-list .location-select");
    this.jobArray.forEach(function(item) {
      var gotit = false;
      locationDropdown.children('option').each(function() {
        if($(this).val().toLowerCase() == item.location.name.toLowerCase()) gotit = true;
      });
      if(!gotit) {
        locationDropdown.append($('<option>', {
            value: item.location.name.toLowerCase(),
            text: item.location.name
        }));
      }
      //if(locationDropdown.children('option').value().toLowerCase()item.location.name)
    })
  },
  clear: function() {
    $(".job-list__listing .job-list__item:not(.hidden), .job-list__listing > p").remove();
  },
  strip: function(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
};

jobs.init();
