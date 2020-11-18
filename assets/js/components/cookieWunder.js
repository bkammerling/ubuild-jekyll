// by default, marketing / analytics ads are turned off
var WC_analytics = false;
var WC_marketing = false;
// increase this number when your cookie policy has changed, this will show the popup to all users again
var WC_versionNumber = 0.01;
var WC_popup;

document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  WC_getCookieConsent()
});

// helper function to get the value of a cookie
function WC_getCookie( name ) {
	var name = name+"=";
	var decodedCookie = decodeURIComponent( document.cookie );
	var cookies = decodedCookie.split( ';' );
	for( var i = 0 ; i < cookies.length ; ++i )
	{
		var c = cookies[i];
		while ( c.charAt(0) == ' ' ) {
			c = c.substring(1);
		}
		if ( c.indexOf(name) == 0 ) {
			return c.substring( name.length , c.length );
		}
	}
	return "";
}

function WC_getCookieConsent( forceShow ) {
	var consent = WC_getCookie( "WC_accepted_v"+WC_versionNumber );
	if ( consent != "true" || forceShow ) {
		// if the consent form hasn't been shown to the user, show it
		WC_showPopup();
	} else  {
    var analytics = WC_getCookie( "WC_analytics" );
    var marketing = WC_getCookie( "WC_marketing" );
    WC_analytics = analytics;
    WC_marketing = marketing;
		// renew the cookies so frequent users don't get the popup all the time
		WC_setCookies( analytics, marketing );
	}
}

function WC_showPopup() {
  WC_popup = document.createElement( "div" );
  WC_popup.id = "WC_popup";
  WC_popup.innerHTML = `
  <div class="container-fluid px-sm-5">
    <div class="card w-shadow flex-lg-row">
      <div class="card-header p-4 text-center text-md-left">
        <div class="d-lg-flex flex-column justify-content-between h-100">
          <div>
            <h4 class="headline-regular mb-1">Cookies Notice</h4>
            <p>We use cookies to ensure website functionality and for analytical and marketing purposes.</p>
          </div>
          <div class="mt-4 row d-none d-lg-flex">
            <div class="col">
              <button onclick="WC_AcceptAll()" class="btn btn-dark btn-block">Accept All</button>
            </div>
            <div class="col">
              <button onclick="WC_confirmSelection()" id="" class="btn btn-outline-dark btn-block">Accept Selected</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-xl-4">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="requiredCookies" checked disabled>
              <label class="custom-control-label font-weight-bold" for="requiredCookies">Required Cookies</label>
              <p class="mb-3 mt-2">Ensure the proper functionality of the website.</p>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" onchange="handleChange()" class="custom-control-input" id="analyticsCookies">
              <label class="custom-control-label font-weight-bold" for="analyticsCookies">Analytical Cookies</label>
              <p class="mb-3 mt-2">Anonymously track your interactions on the website.</p>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" onchange="handleChange()" class="custom-control-input" id="marketingCookies">
              <label class="custom-control-label font-weight-bold" for="marketingCookies">Marketing Cookies</label>
              <p class="mb-3 mt-2">Help us tailor our ads to your browsing habits. This information may be shared with third parties.</p>
            </div>
          </div>
        </div>
        <p class="my-4" style="line-height:1.3"><small>Read more about cookies, the cookies we use, their duration and how to recognize them in our <a href="https://wundermobility.com/privacy#5-cookies">Cookies Policy</a>.</small></p>
        <div class="mt-4 row d-lg-none">
          <div class="col">
            <button onclick="WC_AcceptAll()" class="btn btn-dark btn-block">Accept All</button>
          </div>
          <div class="col">
            <button onclick="WC_confirmSelection()" id="button-acceptSelected" class="btn btn-outline-dark btn-block">Accept Required</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  document.body.appendChild( WC_popup );
	// check if a personalized ad cookie exists and if so use its value
	var analytics = WC_getCookie( "WC_analytics" );
	if ( analytics == "true" ) document.getElementById("analyticsCookies").checked = true;
  else document.getElementById("analyticsCookies").checked = false;
  var marketing = WC_getCookie( "WC_marketing" );
	if ( marketing == "true" ) document.getElementById("marketingCookies").checked = true;
  else document.getElementById("marketingCookies").checked = false;
  handleChange();
}

function handleChange() {
  document.getElementById('button-acceptSelected').textContent = (document.getElementById("analyticsCookies").checked || document.getElementById("marketingCookies").checked) ? 'Accept Selected' : 'Accept Required';
}


function WC_AcceptAll() {
  document.getElementById("analyticsCookies").checked = true;
  document.getElementById("marketingCookies").checked = true;
  WC_confirmSelection();
}


function WC_confirmSelection() {
  var analytics = document.getElementById("analyticsCookies").checked;
  var marketing = document.getElementById("marketingCookies").checked;
	
	WC_setCookies( analytics, marketing );
	
	// remove the popup
  WC_popup.parentElement.removeChild( WC_popup );

  var action = window.location.href.indexOf('privacy') == -1 ? "Cookie Set" : "Cookie Update";
  dataLayer.push({
    'event': 'cookieupdate',
    'eventCategory': 'Cookies',
    'eventAction': action,
    'eventLabel': `WC_analytics=${analytics},WC_marketing=${marketing}`
  });
}


function WC_setCookies( analytics, marketing ) {
  var expires = new Date();
  expires.setMonth( expires.getMonth() + 1 );
  
  WC_analytics = analytics;
  document.cookie = `WC_analytics=${analytics}; path=/; expires=${expires.toGMTString()};`;

  WC_marketing = marketing;
  document.cookie = `WC_marketing=${marketing}; path=/; expires=${expires.toGMTString()}; `;
  
  // save that the popup has been seen and accepted
  document.cookie = `WC_accepted_v${WC_versionNumber}=true; path=/; expires=${expires.toGMTString()};`;
}