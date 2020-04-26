const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: "5ae8faa2",
    apiSecret: "O7gIZrtj1GsltaeL"
})
const from = '13852403539';
var travelTime;
// fetch data from the google calendar and creates a set timeout function that has the time left till notification is sent.
//CALL CREATE MSG FOR EACH EVENT WITH FOR LOOP IN OUR FUNCTION
function createMsg(origin, destination, year, month, hour, day, minute, preferredTimeBefore, arrive) {

    route(origin, destination)


    var now = moment(); //exact time right now
    var eventTime = moment().year(year).month(month).date(day).hour(hour).minute(minute); // 6/18/2019 11:53am

    //calc here
    var notificationTime = eventTime.subtract(travelTime, "minutes").subtract(preferredTimeBefore, "minutes"); //subracts time it takes to arrive
    // get the actual time that we will execute the time AND THIS IS THE TIME U SEND THE TEXT
    var timeLeftTillText = notificationTime.diff(now, "seconds") * 100;

    // this is our default virtual number

    // set message receiver
    var to = '...';
    // make the text dynamic
    var linkInText = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination;
    var text = 'Hello, this is Dear Time. Thanks for subscribing us. We will help you to get to your place on time. Click here to see the route: ' + linkInText;

    setTimeout(function() {
        sendMessage(to, text)
    }, timeLeftTillText);

}


// send text
function sendMessage(to, text) {

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

};

// route calculation time
function route(origin, destination) {
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&key=AIzaSyBN7LY1mgo8xNyiqviHoMbxTnrT4whKLXM",
        method: "GET"
    }).then(function(response) {

        travelTime = response.routes[0].legs[0].duration.text;
    })
}