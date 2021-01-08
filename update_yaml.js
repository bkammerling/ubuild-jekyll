console.log('Script running');
// use online yaml -> JSON converter to get JSON of website data
var json = require('./convertcsv.json'); //(with path)
var operators = json;

/*
for(var operator of operators) {
  var services = operator.services.filter(service => service.service.length > 2);
  operator.services = services;
}
console.log(JSON.stringify(json));
*/

for(var item of operators) {
  // turn individual listed fields into an array
  item.services = [];
  item.services.push({ service: item.service_1, service_notes: item.service_1_notes })
  if(item.service_2) item.services.push({ service: item.service_2, service_notes: item.service_2_notes })
  if(item.service_3) item.services.push({ service: item.service_3, service_notes: item.service_3_notes })
  // delete all the individual fields that we no longer need
  delete item.service_1;
  delete item.service_1_notes;
  delete item.service_2;
  delete item.service_2_notes;
  delete item.service_3;
  delete item.service_3_notes;
}
// log the JSON so we can use an online JSON -> yaml converter
console.log(JSON.stringify(json));
