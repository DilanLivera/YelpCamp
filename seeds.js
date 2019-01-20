const mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment");

function seedDB(){
    let data = [
                    {
                        name: "Morgan Conservation Park", 
                        image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
                        description: "There are so many places to camp along the River Murray, and each one provides a different aspect to this waterway. Morgan Conservation Park is no exception. Located around 150km from Adelaide, this Park run by National Parks SA is a great place for a weekend away without having to travel too far."
                    },
                    {
                        name: "Western KI Caravan Park", 
                        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                        description: "We do not normally camp at caravan parks as we like to experience more isolated and private locations, but we had a need for hot showers and to do some much needed washing of clothes. We investigated the camping locations in the Western part of the Island, and decided that this caravan park would best suit our needs – all the above facilities plus easy and close access to Flinders Chase National Park (just under 10 mins drive away)."
                    },
                    {
                        name: "The Grampians - Mount Stapylton", 
                        image: "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                        description: "Mt Stapylton campground is the campground closest to Horsham, and located within the beautiful Northern Grampians. After spending time near Halls Gap, this area was noticeably drier, and the surroundings less lush."
                    }    
                ]
    
    //remove all the campgrounds
    Campground.remove({}, (err) => {
        if(err){
            console.log("Oops, something went wrong!!!");
            console.log(err);
        } else {
            console.log("All campgrounds are removed.");
            //add campgrounds
/*             data.forEach((seedCampground) => {
                Campground.create(seedCampground, (err, campground) => {
                    if(err){
                        console.log("Oops, something went wrong!!!");
                        console.log(err);
                    } else {
                        console.log("Campground added.");
                     //create a comment and add to the campground
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet.",
                                author: "Homer"
                            },(err, comment) => {
                                if(err){
                                    console.log("Oops, something went wrong.");
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Creates new comment.")
                                }
                            }
                        );
                    }
                });
            });*/
        }
    });
}

module.exports = seedDB;