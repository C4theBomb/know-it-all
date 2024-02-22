const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const orgRouter = require("./routes/orgRouter");

const app = express();

if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/org", orgRouter);

app.use(express.static(path.join(__dirname, "public/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/build/index.html"));
});

app.use((req, res, next) => {
    next(createError(404));
});

module.exports = app;
