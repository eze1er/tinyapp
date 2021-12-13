const { append } = require("express/lib/response");
const { getUserByEmail, generateRandomString, urlsForUser } = require("./helpers");

const COOKIE_NAME = 'user_id';

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send("Missing email or password. Please <a>href='register'</a>try again");
  }
  if (getUserByEmail(email)) {
    return res.status(400).send("Email already exist. Please <a>href='/register'</a>try again");
  }
  // Happy Path; create a new user
  const id = generateRandomString(6);
  const user = { id, email, password };
  users[id] = user;

  res.cookie(COOKIE_NAME, id);
  res.redirect("/urls");

});
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = getUserByEmail(email);
  if (!user || user.password != password) {
    return res.status(400).send("Invalid credentials. Please <a href='/login'>try again</a>");
  }
  // Happy Path
  res.cookie(COOKIE_NAME, user.id);
  res.redirect("/urls");

})

app.get("/urls", (req, res) => {
  const id = req.cookies[COOKIE_NAME];
  const user = users[id];
  if (!user) {
    return res.status(400).send("You must <first. href='/login'>first.</a>");
  }
  const urls = urlsForUser(id);

  const templateVars = { urls, user: null };
  res.render("urls_index", templateVars);
})
