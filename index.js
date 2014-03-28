/* THE CALENDAR (and algorithm) */
// …via http://www.gsa.gov/portal/mediaId/175839/fileName/2014_GSA_Payroll_Calendar.action
//      …via http://www.gsa.gov/portal/content/102507
//           …via http://hanfordfriday.blogspot.com/2012/04/how-to-tell-if-it-is-hanford-friday-off.html

var HANFORD_FRIDAYS = {     // TODO: use the ICS file instead of manual transcription each year?
    2014: {
         1: [3,17,31],
         2: [14,28],
         3: [14,28],
         4: [11,25],
         5: [9,23],
         6: [6,20],
         7: [4,18],
         8: [1,15,29],
         9: [12,26],
        10: [10,24],
        11: [7,21],
        12: [5,19]
    },
}, DAY_DURATION = 24*60*60e3;

var fridates = [];
Object.keys(HANFORD_FRIDAYS).forEach(function (year) {
    Object.keys(HANFORD_FRIDAYS[year]).forEach(function (month) {
        HANFORD_FRIDAYS[year][month].forEach(function (day) {
            var d = new Date(year, month-1, day);
            fridates.push(d.getTime());
        });
    });
});

exports.statusForTime = function (now) {
    var idx = 0, len = fridates.length;
    while (idx < len && now >= fridates[idx]) ++idx;     // TODO: bisect
    
    var info = 'unknown',
        prev = fridates[idx-1],
        next = fridates[idx];
    if (now < prev+DAY_DURATION) info = 'today';
    else if (now < prev+3*DAY_DURATION) info = 'recent';
    else if (now+5*DAY_DURATION > next) info = 'near';
    else if (next) info = 'pending';
    return {info:info, prev:prev, next:next};
};
