// require dotenv to loads environment variables 
require('dotenv').config();

const express        = require("express"),
      app            = express(),
      bodyparser     = require("body-parser"),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      User           = require("./models/user"),
      /*seedDB         = require("./seeds"),*/
      methodOverride = require("method-override"),
      flash          = require("connect-flash");
      
//requiring routes      
const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes      = require("./routes/index");
      
const URL = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";
      
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
mongoose.connect(URL, {useNewUrlParser: true});
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); //needs to come before passport configuration

//configure passport
app.use(require("express-session")({
    secret: "Rusty is still the cutest dog in the wold!!!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//create a middlewear to pass in to every route, this way we dont have to pass a user object to every route
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//tell our app to use these three routes. This needs to come after previous app.use();
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//seed the database
//seedDB(); 

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Now Serving - YelpCamp");
});