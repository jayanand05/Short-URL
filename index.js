const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const URL = require("./models/url");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = 8001;

connectMongoDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("URL not found");
  }
  res.redirect(entry.redirectURL);
});

app.listen(8001, () => console.log(`Server started at port ${PORT}`));
