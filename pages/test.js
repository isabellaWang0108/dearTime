const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: "5ae8faa2",
    apiSecret: "O7gIZrtj1GsltaeL"
})


const from = '13852403539'
const to = '19083916750'
const text = 'A text message sent using the Nexmo SMS API'

nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
}) 
