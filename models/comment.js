const mongoose = require("mongoose");

//create comment schema
const commentSchema = new mongoose.Schema({
        text: String,
        createdAt: { type: Date, default: Date.now },
        author:{
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Comment"
                },
                username: String
        }
});

//compile scheman in to comment model
const commentModel = mongoose.model("Comment", commentSchema);

//export the model
module.exports = commentModel;