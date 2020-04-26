// var firebaseConfig = {
//     apiKey: "AIzaSyBN7LY1mgo8xNyiqviHoMbxTnrT4whKLXM",
//     authDomain: "project-1-b691a.firebaseapp.com",
//     databaseURL: "https://project-1-b691a.firebaseio.com",
//     projectId: "project-1-b691a",
//     storageBucket: "project-1-b691a.appspot.com",
//     messagingSenderId: "904494310957",
//     appId: "1:904494310957:web:f844b97c354d9a11"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// var database = firebase.database();

$(document).ready(function() {
    //SEARCH BAR
    $("#siteSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".eventsInDate tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
// fetch data from the calenderin file calendar from firebase
    var title=database.calendar.summary;
    var location=database.calendar.location;
    var date=database.calendar.start.date;
    var arrivalTime=database.calendar.start.dateTime;
// fetch data from user input info
    var timeAhead=database.users.prefT;

    
    
    // <h4 class="eventTitle">Park</h4>
    var eventTitle=$("h4");
        eventTitle.attr("class","eventTitle")
                  .text(title);

  //<p class="address"> 000 east 00 street, NY, dnjsnkjdnskmccsc </p>              
    var eventAddress=$("p");
        eventAddress.attr("class","address")
                .text(location);



//     <p class="arrivalTimeClass">arrival time:
//     <bold class="arrivalTime">3pm</bold>
    // </p>                              
    var eventTime=$("p");
        eventTime.attr("class","arrivalTimeClass")
                 .html("arrival time: <bold class='arrivalTime'>"+arrivalTime+"</bold>");
                 
//* <p class="minutesBeforeClass">arrive<input type="text" class="minuteBefore" value="5">mins ahead</p> */}
      
    var minutesBefore=$("p");
        minutesBefore.html("arrive"+ "<input type='text' class='minuteBefore' value=" +timeAhead+ ">"+"mins ahead");
// the event block
    var blockForEvent=$("td");
        blockForEvent.attr("class","event")
                     .append(eventTitle)
                     .append(eventAddress)
                     .append(eventTime)
                     .append(minutesBefore);

    var EventBlock=$("tr");
        EventBlock.append(blockForEvent);


//    the date block     
    var   blockForDate=$("h5");
                          

});