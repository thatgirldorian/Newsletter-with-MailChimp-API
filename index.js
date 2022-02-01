//require the important modules that

const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

//create new express app
const app = express()
app.use(bodyParser.urlencoded({ extended: true}))
const port = 3000

//render our static files for css and images
app.use(express.static("public"));

//send form data to server
app.post('/', function(req, res) {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    let data = {
        members: [
            { 
                email_address: email,
                status: "subscribed",
                merge_fields: { 
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    // 
    let jsonData = JSON.stringify(data)
    const url = "https://us14.api.mailchimp.com/3.0/lists/2ae3b2a67"
    const options = {
        method: "POST",
        auth: "debbie:be374f7f6e4a36edb087bb02509cadf2-us14"
    }

    //create our request to an external servers
    const request = https.request(url, options, function(response) {
        response.on('data', function(data) {
            // console.log(JSON.parse(data))

            //create logic for having a success or failure page
        if(response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html')
        }
        })
    })

    request.write(jsonData)
    request.end()
})

//render our signup page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')

}) 


//set up port and log a message to show that port 3000 is running
app.listen(port, () => {
    console.log(`Hey Debbie, your new server is listening on port ${port}`)

})

// api key
// be374f7f6e4a36edb087bb02509cadf2-us14

// audience id
// 