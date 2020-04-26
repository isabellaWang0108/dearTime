// Client ID and API key from the Developer Console
var CLIENT_ID = '998695225334-aaiipl2o5b7cfrv8ckcnlgg178g3pmsi.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDRiwxncwtOHgblmwfGUY6B3maQlm3NFCI';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
const Nexmo = require('nexmo');
/**
 *  On load, called to load the auth2 library and API client library.
 */
$(document).ready(function() {
    $("#number").inputmask({ "mask": "(999) 999-9999" });
});

const nexmo = new Nexmo({
    apiKey: "5ae8faa2",
    apiSecret: "O7gIZrtj1GsltaeL"
})


const from = '13852403539'
const to = '19083916750'
const text = 'A text message sent using the Nexmo SMS API'



function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('authorize_button', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}



function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
        $("#allTheSignUp").css("display", "none");
        $("#signOut").css("z-index", "4");
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

    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}
/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}
/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */


function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        $(".date").html(" <div class='bullet'></div>" + "The Upcoming Events: ");
        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                var address = event.location;
                var time = moment(event.start.dateTime).format("L") + ' ' +
                    moment(event.start.dateTime).format("LT");
                if (!when) {
                    time = moment(event.start.dateTime).format("L") + ' ' +
                        moment(event.start.dateTime).format("LT");

                }
                var eventt = $("<div>");
                eventt.attr("class", "event")
                    .html("<h4 class='eventTitle'>" + event.summary + "</h4>" +
                        "<p class='address'>" + address + "</p>" +
                        "<p class='arrivalTimeClass'>" + "arrival time: " + "<bold class='arrivalTime'>" + time + "</bold>" + "</p>" +
                        "<p class='minutesBeforeClass'>" + "arrive" + "<input type='text' class='minuteBefore' value='" + $('#preferredTime').val() + "'>mins ahead</p>");
                $("#container-for-content").append(eventt);


            }
        } else {
            $(".date").text('No upcoming events found.');

        }
    });

    $("#siteSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".event").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

$("#signout_button").on("click", function() {
    window.location = "../index.html"
})