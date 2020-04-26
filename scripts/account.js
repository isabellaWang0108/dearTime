var firebaseConfig = {
    apiKey: "AIzaSyDRiwxncwtOHgblmwfGUY6B3maQlm3NFCI",
    authDomain: "deartime-61c5a.firebaseapp.com",
    databaseURL: "https://deartime-61c5a.firebaseio.com",
    projectId: "deartime-61c5a",
    storageBucket: "deartime-61c5a.appspot.com",
    messagingSenderId: "998695225334",
    appId: "1:998695225334:web:034a85753378a81496e9d7",
    measurementId: "G-228EFNF4QL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var uid;
var user;

$("#next").on("click",function(){
    $("#allTheSignUp").css("z-index","5");
})
// phone number formatting



//sign up on click
$("#googleCalendar").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        alert("Failed to sign up...");

        // let user know what's the problem
        $(".errorMessage").text(error);
    });
});


$("#signOut").on("click", function() {
    firebase.auth().signOut().catch(function(error) {
        alert("failed to sign out")
    });

});

//DONT TOUCH THIS FUNCTION, ITS BUILT ON STICKS T^T
var trueOnce = false;
firebase.auth().onAuthStateChanged(person => {
    console.log(window.location);
    //SIGN UP AND AUTO LOG IN
    if (person && window.location.href.includes("signUp")) {
        var call = false;
        if ($('#callChecked').is(':checked')) {
            call = true;
        }
        var pref = $("#preferredTime").val();
        if (pref === '')
            pref = 15
        database.ref('users/').push({
            uid: person.uid,
            name: $("#name").val(),
            number: $("#number").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            prefT: pref,
            text: true,
            call: call
                //insert google calender stuff to save
        });
        // window.location = 'innerPage.html';
    }
    //STOP INFINITE LOOP
    else if (window.location.href.includes("signUp")) {
        return;
    }
    //SIGNED IN AND ON INNER PAGE
    else if (person && !window.location.href.includes("innerPage")) {
        window.location = 'innerPage.html';
    }
    //POPULATE DATA HERE
    else if (person && !trueOnce) {
        trueOnce = true;
        user = person
        uid = person.uid

    }
    //STOP SIGN OUT INFINITE LOOP
    else if (!window.location.href.includes("signIn")) {
        window.location = 'signIn.html'
    }
});