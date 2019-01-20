const Comment    = require("../models/comment"),
      Campground = require("../models/campground");

let middlewearObj = {};

//middlewear to check if the user logged in and if the user is authorize to edit update and delete a campground
middlewearObj.checkCommentOwnership =   function (req, res, next){
                                            //if user logged in?
                                            if(req.isAuthenticated()){
                                                Comment.findById(req.params.comment_id, (err, foundComment) => {
                                                    if(err || !foundComment){
                                                        req.flash("error", "Oops, something went wrong while finding the comment!!!");
                                                        res.redirect("back");
                                                    } else {
                                                        //does user own the comment?
                                                        if(foundComment.author.id.equals(req.user._id)){
                                                            //show the edit or delete the comment page
                                                            next();
                                                        } else {
                                                            //otherwise redirect
                                                            req.flash("error", "Sorry. You are not authorize.");
                                                            res.redirect("back");
                                                        }
                                                    }
                                                });
                                            } else {
                                                //otherwise redirect
                                                req.flash("error", "Please Login first.");
                                                res.redirect("back");
                                            }
                                        };
                                        
//middlewear to check if logged in user has the authorization to edit update and delete a campground
middlewearObj.checkCampgroundOwnership =   function (req, res, next){
                                            //if user logged in?
                                            if(req.isAuthenticated()){
                                                Campground.findById(req.params.id, (err, foundCampground) => {
                                                    if(err || !foundCampground){
                                                        req.flash("error", "Oops, something went wrong while finding the campground!!!");
                                                        res.redirect("back");
                                                    } else {
                                                        //does user own the campground?                
                                                        if(foundCampground.author.id.equals(req.user._id)){
                                                            //show the edit campground page
                                                            next();  
                                                        } else {
                                                            //otherwise redirect
                                                            req.flash("error", "Sorry. You are not authorize.");
                                                            res.redirect("back");
                                                        }
                                                    }
                                                });        
                                            } else {
                                                //if not redirect
                                                req.flash("error", "Please Login first.");
                                                res.render("login");
                                            }
                                        };

//middlewear to check if user is loged in
middlewearObj.isLoggedIn =  function (req, res, next){
                                if(req.isAuthenticated()){
                                    return next();
                                }
                                req.flash("error", "Please Login First!");
                                res.redirect("/login");
                            };

module.exports = middlewearObj;