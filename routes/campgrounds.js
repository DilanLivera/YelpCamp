const express    = require("express"),
      router     = express.Router(),
      Campground = require("../models/campground"),
      expressSanitizer = require("express-sanitizer"),
      middlewear = require("../middlewear");

router.use(expressSanitizer());

//INDEX - show all campgrounds
router.get("/", (req, res) => {
    //get all the campgrounds from the database
    Campground.find({}, (err, allCampgrounds) => {
       if(err) {
           console.log("Oops, something went wrong!!!");
           console.log(err);
       } else {
           //show all the campgrounds
           res.render("campgrounds/index", {campgrounds: allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middlewear.isLoggedIn, (req, res) => {
    //get name, image url and description form and add campgrounds and sanitize
    const name        = req.sanitize(req.body.name),
          imageURL    = req.sanitize(req.body.image),
          cost        = req.sanitize(req.body.cost),
          description = req.sanitize(req.body.description),
          author      = {
                            id: req.user._id,
                            username: req.user.username
                        }
          
    let newCampground = { name: name, image: imageURL, cost: cost, description: description, author: author };
    
    //add new campground to the database
    Campground.create(newCampground, (err, returnedCampground) => {
        if(err){
            req.flash("error", "Oops, Something went wrong while creating the campground.");
            res.redirect("back");
        } else {
            //show all the campgrounds
            req.flash("sucess", "Campground added successfully.");
            res.redirect("/campgrounds");
        }        
    });
});

//NEW - show form to create new campground
router.get("/new", middlewear.isLoggedIn, (req, res) => {
   res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            req.flash("error", "Oops, soemething went wrong while getting the campground");
            res.redirect("back");
        } else {
            //render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

//EDIT - show form to edit campground after checking the authorization of the user
router.get("/:id/edit",middlewear.checkCampgroundOwnership, (req, res) => {
    //find the campground
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            req.flash("error", "Oops, something went wrong while getting the campground");
            res.redirect("back");
        } else {
            //show the edit campground page
            res.render("campgrounds/edit", { campground: foundCampground });
        }
    });
});

//UPDATE - update the campground from edit form
router.put("/:id", middlewear.checkCampgroundOwnership, (req, res) => {
    //sanitize the campground
    req.body.campground.name = req.sanitize(req.body.campground.name);
    req.body.campground.image = req.sanitize(req.body.campground.image);
    req.body.campground.cost = req.sanitize(req.body.campground.cost);
    req.body.campground.description = req.sanitize(req.body.campground.description);
    
    //find the campground from the collection and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            req.flash("error", "Oops, something went wrong while updating the campground");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground updated successfully");
            res.redirect(`/campgrounds/${updatedCampground._id}`);
        }
    });
});

//DESTROY - delete a campground
router.delete("/:id", middlewear.checkCampgroundOwnership, (req, res) => {
    //find the campground and delete
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            req.flash("error", "Oops, something went wrong while deleting the campground");
            res.redirect("back");
        } else {
            req.flash("success", "Campground deleted successfully");            
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;