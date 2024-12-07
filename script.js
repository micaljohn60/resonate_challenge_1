const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function encodeToShortCode(number) {
    let shortCode = '';
    const base = CHAR_SET.length;

    do {
        shortCode = CHAR_SET[number % base] + shortCode;
        number = Math.floor(number / base);
    } while (number > 0);

    return shortCode;
}

function decodeFromShortCode(shortCode) {
    const base = CHAR_SET.length;
    let number = 0;

    for (let i = 0; i < shortCode.length; i++) {
        number = number * base + CHAR_SET.indexOf(shortCode[i]);
    }

    return number;
}


// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
    // Logic goes here
    const combinedId = storeId * 100000 + transactionId; // Store ID padded to 5 digits
    return encodeToShortCode(combinedId);
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
    // Logic goes here

    const combinedId = decodeFromShortCode(shortCode);

    const storeId = Math.floor(combinedId / 100000);
    const transactionId = combinedId % 100000;

    return {
        storeId: storeId,
        shopDate: new Date(), // Assume the code is for today
        transactionId: transactionId,
    };

    // return {
    //     storeId: 0, // store id goes here,
    //     shopDate: new Date(), // the date the customer shopped,
    //     transactionId: 0, // transaction id goes here
    // };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}