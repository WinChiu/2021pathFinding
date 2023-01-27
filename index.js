const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use("/", express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/test.html');
});

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname));

  // Hande SPA
  app.use(/.*/, (req, res) => {
    res.sendFile(__dirname + "/test.html");
  }); // Refer to any route at all
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
