/* ZAPIER INTELLIGENT GETFORM FLOW */

var owner, language, languageOptionId = 312, stakeholders = [], pipedriveProductId, tags = "", randomNum = Math.random();
language = inputData.siteLanguage;

// first get deal owner and assign language - based on DR's flow https://miro.com/app/board/o9J_kvfhcUU=/
if(inputData.subject == "Wunder Carpool") {
  // Carpool goes to Lauren
  owner = "lauren.ashcroft@wundermobility.com";
  tags = tags == "" ? "375" : tags + ", 375"; //add field sales deal tag
} else if(inputData.subject == "Wunder City") {
  // City leads go to Ioana
  owner = "ioana.freise@wundermobility.com";
} else if(inputData.subject == "Wunder Fleet" || inputData.subject == "Wunder Rent" || inputData.subject == "Wunder Shuttle" || inputData.subject == "Wunder Vehicles" || inputData.subject == "Wunder Park" ) {
  // All other products (not gen. enquiry / events)
  if(inputData.region == "US" || inputData.region == "ES") {
    // All NAM / LATAM leads go to christian
    owner = "christian.herrera@wundermobility.com";
    tags = tags == "" ? "370" : tags + ", 370"; //add US sales deal tag
  } else {
    if(inputData.companyType == "Setting up") {
      tags = tags == "" ? "374" : tags + ", 374"; //add inside sales deal tag
      if(inputData.region == "DE") {
        // all DACH businesses in setting up go to Jan
        owner = "jan.kluetsch@wundermobility.com";
      } else {
        owner = randomNum >= 0.5 ? "daniel.romero@wundermobility.com" : "luisa.rodrigues@wundermobility.com";
      }
    } else if(inputData.companyType == "Already running" || inputData.companyType == "Interested internal") {
      owner = "lauren.ashcroft@wundermobility.com";
      tags = tags == "" ? "375" : tags + ", 375"; //add field sales deal tag
    } else {
      // only option is 'Other'
      owner = randomNum >= 0.5 ? "daniel.romero@wundermobility.com" : "luisa.rodrigues@wundermobility.com";
      tags = tags == "" ? "318" : tags + ", 318"; //add inside sales deal tag
    }
  }
} else if(inputData.subject == "General enquiry") {
  owner = "julia.walker@wundermobility.com";
  tags = tags == "" ? "375" : tags + ", 375"; //add field sales deal tag
} else if(inputData.subject == "Press") {
  owner = "pia.benthien@wundermobility.com";
} else {
  // no subject data or subject not in above if statements
  owner = randomNum >= 0.5 ? "daniel.romero@wundermobility.com" : "luisa.rodrigues@wundermobility.com";
}

var rVTypeArr = [{"label":"Kick Scooters","id":49},{"label":"Mopeds","id":50},{"label":"Three Wheelers","id":51},{"label":"Cars","id":52},{"label":"Bikes","id":53},{"label":"Motorcycles","id":280},{"label":"Trucks","id":281},{"label":"Vans","id":282}];
var tagsArr = [{"label":"SD Highlight","id":288},{"label":"Key Account","id":126},{"label":"Partnership","id":128},{"label":"Financing","id":129},{"label":"Tools","id":289},{"label":"General Enquiry","id":318},{"label":"Hardware","id":320},{"label":"US Sales","id":370},{"label":"Inside Sales","id":374},{"label":"Field Sales","id":375},{"label":"Enterprise Sales","id":376},{"label":"KEAZ","id":379}]

var myVType;
if(typeof inputData.rVType == 'undefined') {
  myVType = '';
} else {
  myVType = inputData.rVType;
}

var vObj = rVTypeArr.filter(function(item) {
  return myVType.includes(item.label);
});
var vTypeString = "";
for(var i = 0; i < vObj.length; i++) {
  vTypeString += vObj[i]["id"];
  if(i!==vObj.length-1) vTypeString += ",";
}

// build stakeholder list per product
stakeholders.push(owner);
if(inputData.subject == "Wunder Fleet") {
  pipedriveProductId = 12;
} else if(inputData.subject == "Wunder Carpool") {
  pipedriveProductId = 11;
  stakeholders.push("philipp.wenger@wundermobility.com");
  stakeholders.push("frits.timmermans@wundermobility.com");
} else if(inputData.subject == "Wunder Shuttle") {
  pipedriveProductId = 13;
  stakeholders.push("lorenzo.fossati@wundermobility.com");
} else if(inputData.subject == "Wunder Park") {
  pipedriveProductId = 248;
} else if(inputData.subject == "Wunder City") {
  pipedriveProductId = 244;
} else if(inputData.subject == "Wunder Rent") {
  pipedriveProductId = 83;
} else if(inputData.subject == "Wunder Vehicles") {
  tags = tags == "" ? "320" : tags + ", 320"; //add hardware deal tag
  // no vehicles pipedrive product ID as we only add it when vehicles team in contact with them.
} else {
  pipedriveProductId = 201; //partnership tag for unknown subjects
  stakeholders.push("ben.kammerling@wundermobility.com");
}

output = [{pipedrive_owner: owner, comm_language: language, languageOption: languageOptionId, team_stakeholders: stakeholders, pipedriveProductId: pipedriveProductId, vType: vTypeString, dTags: tags}];

/* END OF INTELLIGENT GETFORM FLOW */
