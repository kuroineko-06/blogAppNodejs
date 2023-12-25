const mongoose = require('mongoose');
const featuredpostSchema = mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            require: true,
        },
    },

    {
        timestamps: true,
    });

module.exports = mongoose.model('FeaturedPost', featuredpostSchema);