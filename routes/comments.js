const express    = require("express"),
      router     = express.Router({ mergeParams: true }), /* mergerParams will merge params from the campgrounds and comments together. */
      Comment    = require("../models/comment"),
      Campground = require("../models/campground"),
      middlewear = require("../middlewear");
      
//NEW route
router.get("/new", middlewear.isLoggedIn, (req, res) => {
    //find the campground
    Campground.findById(req.params.id, (err, foundCampgorund) => {
        if(err){
            req.flash("error", "Oops, something went wrong wile getting the campground");
            res.redirect("back");
        } else {
            //show add new comment for the found campground
            res.render("comments/new", { campground: foundCampgorund });
        }
    });
});

//CREATE route
router.post("/", middlewear.isLoggedIn, (req, res) => {
    //find the campground
    Campground.findById(req.params.id, (err, foundCampgorund) => {
        if(err){
            req.flash("error", "Oops, something went wrong wile getting the campground");
            res.redirect("/campgrounds/" + foundCampgorund._id);
        } else {
            //create a comment and add to the found campground
            Comment.create(req.body.comment, (err, createdComment) => {
                if(err){
                    req.flash("error", "Oops, something went wrong wile creating the comment");
                    res.redirect("/campgrounds/" + foundCampgorund._id);
                } else {
                    //add username and id to comment
                    createdComment.author.id = req.user._id;
                    createdComment.author.username = req.user.username;
                    //save comment
                    createdComment.save();
                    //add comments to the campground
                    foundCampgorund.comments.push(createdComment);
                    //save the campground
                    foundCampgorund.save();
                    req.flash("success", "Comment addedd success fully to " + foundCampgorund.name);
                    res.redirect("/campgrounds/" + foundCampgorund._id);
                }
            });
        }
    });
});

//EDIT route
router.get("/:comment_id/edit", middlewear.checkCommentOwnership, (req, res) => {
    //find the campground of the comment
    Campground.findById(req.params.id, (err, foundCampgorund) => {
        if(err){
            req.flash("error", "Oops, something went wrong wile getting the campground");
            res.redirect("back");
        } else {
            //find the comment
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if(err){
                    req.flash("error", "Oops, something went wrong wile getting the comment");
                    res.redirect("back")
                } else {
                    res.render("comments/edit", { campground: foundCampgorund, comment: foundComment });
                }
            });
        }
    });
});

//UPDATE route
router.put("/:comment_id", middlewear.checkCommentOwnership, (req, res) => {
    //find the comment and update
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            req.flash("error", "Oops, something went wrong wile updating the comment");
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE route
router.delete("/:comment_id", middlewear.checkCommentOwnership, (req, res) => {
    //find the specific comment and delete
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err){
            req.flash("error", "Oops, something went wrong wile deleting the comment");
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted successfully");
            res.redirect("back");
        }
    });
});

module.exports = router;