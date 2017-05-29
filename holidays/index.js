var Holidays = require('date-holidays');
var fs = require('fs');
var path = require('path');
var hd = new Holidays('HU');

for(var i = 2016; i < 2050; i++) {
  const holidays = hd.getHolidays(i);
  fs.writeFileSync(path.join(__dirname, 'holidays_' + i + '.json'), JSON.stringify(holidays));
}