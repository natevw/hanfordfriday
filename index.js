/* THE CALENDAR (and algorithm) */
// …via http://www.gsa.gov/portal/mediaId/175839/fileName/2014_GSA_Payroll_Calendar.action
//      …via http://www.gsa.gov/portal/content/102507
//           …via http://hanfordfriday.blogspot.com/2012/04/how-to-tell-if-it-is-hanford-friday-off.html

/*
From <https://web.archive.org/web/20140602015923/http://hanfordfriday.blogspot.com/> —

> Go to http://www.gsa.gov/portal/content/102507 and click on the calendar for the year for which you want to know whether it is or was a Hanford Friday off.
>
> If the Friday is a EFT Pay Day (it will have a purple hexagon surrounding the date if so) it is a Hanford Friday off.

Note also <http://www.tri-cityherald.com/news/local/hanford/article32196675.html> — not many contractors following anymore?
*/


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
    2015: {
         1: [2,16,30],
         2: [13,27],
         3: [13,27],
         4: [10,24],
         5: [8,22],
         6: [5,19],
         7: [3,17,31],
         8: [14,28],
         9: [11,25],
        10: [9,23],
        11: [6,20],
        12: [4,18]
    },
    2016: {
         1: [15,29],
         2: [12,26],
         3: [11,25],
         4: [8,22],
         5: [6,20],
         6: [3,17],
         7: [1,15,29],
         8: [12,26],
         9: [9,23],
        10: [7,21],
        11: [4,18],
        12: [2,16,30]
    },
    2017: {
         1: [13,27],
         2: [10,24],
         3: [10,24],
         4: [7,21],
         5: [5,19],
         6: [2,16,30],
         7: [14,28],
         8: [11,25],
         9: [8,22],
        10: [6,20],
        11: [3,17],
        12: [1,15,29]
    },
    2018: {
         1: [12,26],
         2: [9,23],
         3: [9,23],
         4: [6,20],
         5: [4,18],
         6: [1,15,29],
         7: [13,27],
         8: [10,24],
         9: [7,21],
        10: [5,19],
        11: [2,16,30],
        12: [14,28]
    },
    2019: {
         1: [11,25],
         2: [8,22],
         3: [8,22],
         4: [5,19],
         5: [3,17,31],
         6: [14,28],
         7: [12,26],
         8: [9,23],
         9: [6,20],
        10: [4,18],
        11: [1,15,29],
        12: [13,27]
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
