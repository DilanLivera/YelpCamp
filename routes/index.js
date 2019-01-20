const express    = require("express"),
      router     = express.Router(),
      User       = require("../models/user"),
      passport   = require("passport");

//root route
router.get("/", (req, res) => {
    res.render("landing")
});

/* ========= AUTHENTICATION ROUTES =========*/
//register GET route
router.get("/register", (req, res) => {
    res.render("register");
});

//register POST route
router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username});
    //register the user and redirect to campgrounds page
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds")
        });
    });
});

//login GET route
router.get("/login", (req, res) => {
    res.render("login");
});

//login POST route
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res) => {
});

//logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Thanks for visiting. See you soon...");
    res.redirect("/campgrounds");
});

module.exports = router;