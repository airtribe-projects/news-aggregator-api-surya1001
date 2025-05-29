const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    preferences: {
        categories: [String],
        languages: [String]
    },
    readArticles: [String],
    favoriteArticles: [String]
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);