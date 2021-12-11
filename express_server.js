// Express server is the logic. The programme who communicate with all files inn application. 
/*
SETUP
FUNCTIONS
VARIABLES
*/

// APP CONFIG
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

// for us to be able to use POST
const bodyParser = require("body-parser");
const { text } = require("body-parser");
const { application } = require("express")
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");

// functions
const { urlsForUser } = require('.helpers');

/////////////////////

// const urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };

// variables

const urlDatabase = {};
const users = {};


///////////////////////////////////////////
/*
ROUTING
*/

// root - GET
// Redirects to /urls if logged in, or to /login

app.get("/", (req, res) => {
  if (req.session.userID) {
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
});

// urls index page - GET
// show urls that belong to the user, if they are logged in
// must use urslforUser function
app.get("/urls", (req, res) => {
  const userID = req.session.userID;
  const userUrls = urlsForUser(userID, urlDatabase);
  const templateVars = { urls: userUrls, user: users[userID] };

  if (!userID) {
    res.statusCode = 401;
  }
  res.render("urls_index", templateVars);
});

 // **************** 
 
app.get("/hello", (req, res) => {
  const templateVars = { greeting: 'Hello World!' };
  res.render("hello_world", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL:urlDatabase[req.params.shortURL]};
  res.render("urls_show", templateVars);
});

// generated the short url

const generateRandomString = function() {
  let randomString = "";
  for (let i = 0; i < 6; i++) {
    const randomCharCode = Math.floor(Math.random() * 26 + 97);
    const randomChar = String.fromCharCode(randomCharCode);
    randomString += randomChar;
  }
  return randomString;
};

app.post("/urls" , (req, res)  => {
  const shortURL = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
  // res.redirect(`/urls/${shortURL}`);
});
// Delete longURL when delete button is submitted
app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect(`/urls`);
});
//  from this point


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});