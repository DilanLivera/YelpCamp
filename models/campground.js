const mongoose = require("mongoose");

//schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    cost: Number,
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
    author:{
            id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
            },
            username: String
    }        
});

//compile schema in to a model
const Campground = mongoose.model("Campground", campgroundSchema);

//export the model
module.exports = Campground;