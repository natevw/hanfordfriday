var lib = require("./index.js"),
    debug = true;

function assertAnswer(date, answer) {
    var dst = true,     // just assume all tests in DST for now
        fullDate = date + ((dst) ? "T07:00:00Z" : "T08:00:00Z"),
        status = lib.statusForTime(Date.parse(fullDate));
    if (status.info === answer) {
        assertAnswer.stats.passed += 1;
        console.log("Correct answer for", date);
    } else {
        assertAnswer.stats.failed += 1;
        console.error("Incorrect answer for", date);
        if (debug) {
            console.log("\n");
            console.log("Expected", answer, "but got", status.info);
            console.log(new Date(status.prev));
            console.log("->", fullDate);
            console.log(new Date(status.next));
            console.log("\n");
        }
    }
}
assertAnswer.stats = {
    passed: 0,
    failed: 0
};

assertAnswer("2014-03-28", 'today');
assertAnswer("2014-03-29", 'recent');
assertAnswer("2014-03-30", 'recent');
assertAnswer("2014-03-31", 'pending');
assertAnswer("2014-04-01", 'pending');
assertAnswer("2014-04-06", 'pending');
assertAnswer("2014-04-07", 'near');
assertAnswer("2014-04-10", 'near');
assertAnswer("2014-04-11", 'today');
assertAnswer("2020-01-01", 'unknown');
console.log("\nResult: "+assertAnswer.stats.passed+" passed, "+assertAnswer.stats.failed+" failed.");
if (assertAnswer.stats.failed) process.exit(-1);