//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  encoded: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  var firstname = req.body.fName;
  var lastname = req.body.lName;
  var email = req.body.Email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  };
  var jsondata = JSON.stringify(data);
  var option = {
    url: "https://us4.api.mailchimp.com/3.0/lists/f4585522aa",
    method: "POST",
    headers: {
      "Authorization": "aryan123 ff6a9cf45f688884f55591994b403b2d-us4"
    },
    body: jsondata
  };
  request(option, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/sucess.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});
app.post("/failure", function(req, res) {
  res.redirect("/");
});
app.listen(3000, function() {
  console.log("Server at port 3000");
});
//ff6a9cf45f688884f55591994b403b2d-us4
//f4585522aa
