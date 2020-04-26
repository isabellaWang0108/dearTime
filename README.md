# dearTime
This is a horror story of over engineering on the UX experimentation on How to get a chronically late-friend on time. We spent the entire week developing a product trying to validate our idea, but the answer to our question doesn't even need a high tech solution.

## demo
Since we use Google Auth to fetch personal data from Google Calendar, app can no longer fully function due to changing Google's privacy policies.The Google auth is being disabled. But you can watch the video record of what we made!
(click on image to watch the video)

[![Recorded demo]( https://wangx733.github.io/dearTime/images/dearTimeDisplay.jpg)](https://youtu.be/UAfmD_vbJrU)

## Problem statement
The inspiration for this project is from the always-late classmates at Bootcamp.Sometimes it is annoying to have a teammate being late to discussion in the morning, so my team and I came up with this idea that how to make our chronically late friend on time for class
![personas](https://wangx733.github.io/dearTime/images/persona.jpg)


## Testing point
There are some common excuses that:' the train is late ', ' my clock didn't ring ', ' there is a traffic jam ', etcThus, we come up with a plan that makes all the above excuses non-sense: a loud notification will be sent to our late friend based on real-time calculation of the traffic and their location.
![value proposition](https://wangx733.github.io/dearTime/images/value.png)

## Over engineering
My team was excited about the idea and we started right away. We are three full stack engineers excited about making: prototype, authentication, calendar events, real-time traffic, location fetch. There it is the complete flow ! This is a video record of what we made. We jumped into development right away without thinking too much.
![value proposition](https://wangx733.github.io/dearTime/images/userFlow.png)

However, problems occur later that in turns out to be our flow is very complex and requires way more time than we thought. In addition, we are stuck on some hard engineering problems. For example:

how do we calculate the precise time for one to get to their destination on time? We could start to check traffic and length needed every 10 seconds before the event based on the average time it takes to get there, but it is expensive and bad for extreme cases. 

What if the traffic gets worse and worse, the time required to get to the destination endlessly increases ?

What if the call of data starts after the minimum time needed to get to the destination due to some bad situations like roadblock, car accidents? 

There are just too many situations and variables to think about that an engineer can spend whole week, even months or years on it

```javascript
var travelTime;
// fetch data from the google calendar and creates a set timeout function that has the time left till notification is sent.
//CALL CREATE MSG FOR EACH EVENT WITH FOR LOOP IN OUR FUNCTION
function createMsg(origin, destination, year, month, hour, day, minute, preferredTimeBefore, arrive) {

    route(origin, destination)

    var now = moment(); //exact time right now
    var eventTime = moment().year(year).month(month).date(day).hour(hour).minute(minute); // 6/18/2019 11:53am

    //calc here
    var notificationTime = eventTime.subtract(travelTime, "minutes").subtract(preferredTimeBefore, "minutes"); //subtracts time it takes to arrive
    // get the actual time that we will execute the time AND THIS IS THE TIME U SEND THE TEXT
    var timeLeftTillText = notificationTime.diff(now, "seconds") * 100;

    // this is our default virtual number
    // set message receiver
    var to = '...';
    // make the text dynamic
    var linkInText = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "& destination=" + destination;
    var text = 'Hello, this is Dear Time. Thanks for subscribing to us. We will help you to get to your place on time. Click here to see the route: ' + linkInText;

    setTimeout(function() {
        sendMessage(to, text)
    }, timeLeftTillText);

}

```

It was frustrating to realize the tiny possibility to achieve our engineering goal, but also a good chance to re-evaluate our plan and what is actually necessary.

## Proper engineering
After a prudent re-evaluation, we realized that most of our engineering plans are not necessary to test our assumption.The most efficient way to test doesn't even have to involve engineering. Since our testing targets are our classmates, we already know when and where they need to arrive, also their location. What we need to do is barely give them a call or text in advance based on our 'human calculation'.So we did it. We kept calling our always-late-friend in turns for the whole week.
![Experimentation result](https://wangx733.github.io/dearTime/images/callSchedule.svg)

## Experiment result
Well, unlike movies, there is always an up after the down. Reality is different. After our a week's call, we realize that neither powerful notification or calculation of traffic or time can help solving the problem of getting chronically late friends on timeThe pain point is neight incapability of calculation nor power of notification.Sometimes there are some problems that technology just can't help. From our experiment,we always get answers when we call, so they must have the realization of time. We also briefly included some traffic information on call, so the person should know about traffic and estimated length to get to the place as well. However, 4 out of 5 days our friend is still late. The reasons we hear for being late are 'I couldn't find my show', 'I rode on the wrong way', 'I need to feed my dog. Of course we are not really mad at our friend, but just try to figure out a solution. It turns out to be that there may not be a direct solution to the problem but the improvement of time management overall and the will to get somewhere on time

