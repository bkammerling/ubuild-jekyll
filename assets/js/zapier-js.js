/* Intelligent Inbound Lead Flow JS */

var owner, language, stakeholders = [], pipedriveProductId;
// first get deal owner and assign language
if(inputData.region == "FR") {
  owner = "ludovic.ciannarella@wundermobility.com";
  language = "FR"
  if(country == "Belgium") {
    language = "EN";
  }
} else if(inputData.region == "DE") {
  owner = "jan.kluetsch@wundermobility.com";
  language = "DE";
} else if(inputData.region == "US") {
  if(inputData.subject == "Wunder Fleet") {
    owner = "nick.diprima@wundermobility.com";
  } else if(inputData.subject != "Wunder Fleet") {
    owner = "hieu.le@wundermobility.com";
  }
  language = "EN";
} else if(inputData.region == "LATAM") {
  owner = "daniel.romero@wundermobility.com";
  language = "ES";
} else if(inputData.region == "EN") {
  if(inputData.subject == "Wunder Fleet") {
    if(inputData.mql >= 16) {
      owner = "jan.kluetsch@wundermobility.com";
      //owner = "yannick.hippolyte@wundermobility.com";
    } else {
      owner = "daniel.romero@wundermobility.com";
      //owner = "yannick.hippolyte@wundermobility.com";
    }
    language = "EN";
  } else if(inputData.subject == "Wunder Carpool") {
    owner = "purnima.kumar@wundermobility.com";
  } else if(inputData.subject == "Wunder Shuttle") {
    owner = "purnima.kumar@wundermobility.com";
  }
} else {
  owner = "daniel.romero@wundermobility.com";
}
if(inputData.subject == "Wunder Carpool" && inputData.region != "US") {
  owner = "purnima.kumar@wundermobility.com";
} else if(inputData.subject == "Wunder Shuttle" && inputData.region != "US") {
  owner = "purnima.kumar@wundermobility.com";
}

// build stakeholder list per product
stakeholders.push(owner);
if(inputData.subject == "Wunder Fleet") {
  pipedriveProductId = 12;
  stakeholders.push("tobias.langwieler@wundermobility.com");
  stakeholders.push("yannick.hippolyte@wundermobility.com");
} else if(inputData.subject == "Wunder Carpool") {
  pipedriveProductId = 11;
  stakeholders.push("samuel.baker@wundermobility.com");
  stakeholders.push("philipp.wenger@wundermobility.com");
  stakeholders.push("frits.timmermans@wundermobility.com");
  stakeholders.push("amity.wu@wundermobility.com");
} else {
  pipedriveProductId = 13;
  stakeholders.push("samuel.baker@wundermobility.com");
  stakeholders.push("ioana.freise@wundermobility.com");
  stakeholders.push("jwani.tranquilino@wundermobility.com");
  stakeholders.push("jimena.rivas@wundermobility.com");
}

output = [{pipedrive_owner: owner, comm_language: language, team_stakeholders: stakeholders, pipedriveProductId: pipedriveProductId}];

/* END OF INTELLIGENT LEAD FLOW WEBSITE */



/* Intelligent LinkedIn Lead Flow */
var owner, language, stakeholders = [], region;
var deRegion = ["Germany", "Austria", "Liechtenstein", "Switzerland"];
var usRegion = ["United States", "Canada"];
var frRegion = ["France", "Belgium", "DRC", "Republic of the Congo", "Côte d'Ivoire", "Madagascar", "Cameroon", "Burkina Faso", "Niger", "Mali", "Senegal", "Haiti", "Benin"];
var latamRegion = ["Dominican Republic", "Cuba", "Argentina", "Bolivia", "Chile", "Colombia", "Ecuador", "Paraguay", "Peru", "Uruguay", "Venezuela", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Mexico", "Nicaragua", "Panama", "Spain"];

if(deRegion.indexOf(inputData.country) != -1) {
  region = "DE";
} else if(usRegion.indexOf(inputData.country) != -1) {
  region = "US";
} else if(frRegion.indexOf(inputData.country) != -1) {
  region = "EN";
  // FR
} else if(latamRegion.indexOf(inputData.country) != -1) {
  region = "EN";
  // LATAM
} else {
  region = "EN";
}

// first get deal owner and assign language
if(region == "FR") {
  owner = "ludovic.ciannarella@wundermobility.com";
  language = "FR"
  if(inputData.country == "Belgium") {
    language = "EN";
  }
} else if(region == "DE") {
  owner = "jan.kluetsch@wundermobility.com";
  language = "DE";
} else if(region == "US") {
  if(inputData.subject == "Wunder Fleet") {
    owner = "nick.diprima@wundermobility.com";
  } else if(inputData.subject != "Wunder Fleet") {
  owner = "hieu.le@wundermobility.com";
  }
  language = "EN";
} else if(region == "LATAM") {
  owner = "daniel.romero@wundermobility.com";
  language = "ES";
} else if(region == "EN") {
  if(inputData.subject == "Wunder Fleet") {
    if(mql >= 14) {
      //owner = "jan.kluetsch@wundermobility.com";
      owner = "yannick.hippolyte@wundermobility.com";
    } else {
      //owner = "daniel.romero@wundermobility.com";
      owner = "yannick.hippolyte@wundermobility.com";
    }
    language = "EN";
  } else if(inputData.subject == "Wunder Carpool") {
    owner = "amity.wu@wundermobility.com";
  } else if(inputData.subject == "Wunder Shuttle") {
    owner = "jwani.tranquilino@wundermobility.com";
  }
} else {
  owner = "daniel.romero@wundermobility.com";
}
if(inputData.subject == "Wunder Carpool" && region != "US") {
  owner = "amity.wu@wundermobility.com";
} else if(inputData.subject == "Wunder Shuttle" && region != "US") {
  owner = "jwani.tranquilino@wundermobility.com";
}

// build stakeholder list per product
stakeholders.push(owner);
if(inputData.subject == "Wunder Fleet") {
  stakeholders.push("tobias.langwieler@wundermobility.com");
  stakeholders.push("yannick.hippolyte@wundermobility.com");
} else if(inputData.subject == "Wunder Carpool") {
  stakeholders.push("samuel.baker@wundermobility.com");
  stakeholders.push("philipp.wenger@wundermobility.com");
  stakeholders.push("joao.cury@wundermobility.com");
  stakeholders.push("frits.timmermans@wundermobility.com");
  stakeholders.push("thies.gruening@wundermobility.com");
  stakeholders.push("amity.wu@wundermobility.com");
} else {
  stakeholders.push("samuel.baker@wundermobility.com");
  stakeholders.push("ioana.freise@wundermobility.com");
  stakeholders.push("jwani.tranquilino@wundermobility.com");
  stakeholders.push("john.moura@wundermobility.com");
  stakeholders.push("jimena.rivas@wundermobility.com");
}

output = [{pipedrive_owner: owner, comm_language: language, team_stakeholders: stakeholders, region: region}];



/*
Mailchimp B2B interest groups
{
	"interests": [
		{
			"category_id": "3bf283be69",
			"list_id": "0ba0a2cc79",
			"id": "499388a2f3",
			"name": "Wunder Fleet",
			"subscriber_count": "237",
			"display_order": 6,
			"_links": [
				{
					"rel": "self",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/499388a2f3",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json"
				},
				{
					"rel": "parent",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/CollectionResponse.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/CollectionLinks/Lists/Interests.json"
				},
				{
					"rel": "update",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/499388a2f3",
					"method": "PATCH",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/PATCH.json"
				},
				{
					"rel": "delete",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/499388a2f3",
					"method": "DELETE"
				}
			]
		},
		{
			"category_id": "3bf283be69",
			"list_id": "0ba0a2cc79",
			"id": "da19b738e8",
			"name": "Wunder Carpool",
			"subscriber_count": "59",
			"display_order": 7,
			"_links": [
				{
					"rel": "self",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/da19b738e8",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json"
				},
				{
					"rel": "parent",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/CollectionResponse.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/CollectionLinks/Lists/Interests.json"
				},
				{
					"rel": "update",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/da19b738e8",
					"method": "PATCH",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/PATCH.json"
				},
				{
					"rel": "delete",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/da19b738e8",
					"method": "DELETE"
				}
			]
		},
		{
			"category_id": "3bf283be69",
			"list_id": "0ba0a2cc79",
			"id": "77ce6c8f87",
			"name": "Wunder Shuttle",
			"subscriber_count": "30",
			"display_order": 8,
			"_links": [
				{
					"rel": "self",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/77ce6c8f87",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json"
				},
				{
					"rel": "parent",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/CollectionResponse.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/CollectionLinks/Lists/Interests.json"
				},
				{
					"rel": "update",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/77ce6c8f87",
					"method": "PATCH",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/PATCH.json"
				},
				{
					"rel": "delete",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/77ce6c8f87",
					"method": "DELETE"
				}
			]
		},
		{
			"category_id": "3bf283be69",
			"list_id": "0ba0a2cc79",
			"id": "1e6df52b91",
			"name": "Mobility Events",
			"subscriber_count": "890",
			"display_order": 9,
			"_links": [
				{
					"rel": "self",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/1e6df52b91",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json"
				},
				{
					"rel": "parent",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/CollectionResponse.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/CollectionLinks/Lists/Interests.json"
				},
				{
					"rel": "update",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/1e6df52b91",
					"method": "PATCH",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/PATCH.json"
				},
				{
					"rel": "delete",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/1e6df52b91",
					"method": "DELETE"
				}
			]
		},
		{
			"category_id": "3bf283be69",
			"list_id": "0ba0a2cc79",
			"id": "dccdd2f719",
			"name": "Mobility News",
			"subscriber_count": "312",
			"display_order": 10,
			"_links": [
				{
					"rel": "self",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/dccdd2f719",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json"
				},
				{
					"rel": "parent",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/CollectionResponse.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/CollectionLinks/Lists/Interests.json"
				},
				{
					"rel": "update",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/dccdd2f719",
					"method": "PATCH",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/PATCH.json"
				},
				{
					"rel": "delete",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/dccdd2f719",
					"method": "DELETE"
				}
			]
		},
		{
			"category_id": "3bf283be69",
			"list_id": "0ba0a2cc79",
			"id": "5d0813d9d2",
			"name": "General Mobility",
			"subscriber_count": "1226",
			"display_order": 11,
			"_links": [
				{
					"rel": "self",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/5d0813d9d2",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json"
				},
				{
					"rel": "parent",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests",
					"method": "GET",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/CollectionResponse.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/CollectionLinks/Lists/Interests.json"
				},
				{
					"rel": "update",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/5d0813d9d2",
					"method": "PATCH",
					"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json",
					"schema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/PATCH.json"
				},
				{
					"rel": "delete",
					"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests/5d0813d9d2",
					"method": "DELETE"
				}
			]
		}
	],
	"list_id": "0ba0a2cc79",
	"category_id": "3bf283be69",
	"total_items": 6,
	"_links": [
		{
			"rel": "self",
			"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests",
			"method": "GET",
			"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/CollectionResponse.json",
			"schema": "https://us3.api.mailchimp.com/schema/3.0/CollectionLinks/Lists/Interests.json"
		},
		{
			"rel": "parent",
			"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69",
			"method": "GET",
			"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/InterestCategories/Response.json"
		},
		{
			"rel": "create",
			"href": "https://us3.api.mailchimp.com/3.0/lists/0ba0a2cc79/interest-categories/3bf283be69/interests",
			"method": "POST",
			"targetSchema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/Response.json",
			"schema": "https://us3.api.mailchimp.com/schema/3.0/Definitions/Lists/Interests/POST.json"
		}
	]
}
*/
