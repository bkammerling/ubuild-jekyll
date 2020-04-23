console.log('Script running');
var json = require('./weallmove.json'); //(with path)
var operators = json.operators;
for(var operator of operators) {
  var services = operator.services.filter(service => service.service.length > 2);
  operator.services = services;
}
console.log(JSON.stringify(json));
/*
for(var value of operators) {
  value.services = [];
  value.services.push({ service: value.service_1, service_notes: value.service_1_notes })
  if(value.service_2) value.services.push({ service: value.service_2, service_notes: value.service_2_notes })
  value.services.push({ service: value.service_3, service_notes: value.service_3_notes })
  delete value.service_1;
  delete value.service_1_notes;
  delete value.service_2;
  delete value.service_2_notes;
  delete value.service_3;
  delete value.service_3_notes;
}
console.log(JSON.stringify(json));
*/
